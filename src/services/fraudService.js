const crypto = require('crypto');
const { get, all, run, transaction } = require('../db/database');
const { recordAudit } = require('../middleware/auditLogger');

/**
 * Valid alert workflow states
 */
const VALID_ALERT_STATUSES = ['NEW', 'ACKNOWLEDGED', 'INVESTIGATING', 'ESCALATED', 'CLOSED'];

/**
 * Valid resolution dispositions
 */
const VALID_DISPOSITIONS = [
  'FALSE_POSITIVE',
  'CONFIRMED_FRAUD_PREVENTED',
  'CUSTOMER_VERIFIED',
  'ADMIN_OVERRIDE'
];

/**
 * List fraud alerts with filtering, search, and pagination
 */
function getFraudAlerts({ status, severity, search, limit = 50, offset = 0 } = {}) {
  let query = `
    SELECT fa.*,
           ar.account_number_masked, ar.account_type, ar.balance,
           cp.customer_number, u.full_name as customer_name, u.email as customer_email,
           an.full_name as assigned_analyst_name
    FROM fraud_alerts fa
    JOIN account_references ar ON fa.account_id = ar.id
    JOIN customer_profiles cp ON fa.customer_id = cp.id
    JOIN users u ON cp.user_id = u.id
    LEFT JOIN users an ON fa.assigned_analyst_id = an.id
    WHERE 1=1
  `;
  const params = [];

  if (status) {
    query += ` AND fa.status = ?`;
    params.push(status);
  }

  if (severity) {
    query += ` AND fa.severity = ?`;
    params.push(severity);
  }

  if (search) {
    query += ` AND (fa.alert_code LIKE ? OR u.full_name LIKE ? OR ar.account_number_masked LIKE ? OR fa.alert_type LIKE ?)`;
    const term = `%${search}%`;
    params.push(term, term, term, term);
  }

  query += ` ORDER BY 
    CASE fa.severity 
      WHEN 'CRITICAL' THEN 1 
      WHEN 'HIGH' THEN 2 
      WHEN 'MEDIUM' THEN 3 
      ELSE 4 
    END ASC, 
    fa.created_at DESC 
    LIMIT ? OFFSET ?`;
  params.push(Number(limit), Number(offset));

  const rows = all(query, params);

  return rows.map(r => ({
    ...r,
    reasons: r.reasons ? JSON.parse(r.reasons) : []
  }));
}

/**
 * Get detailed fraud alert with anomaly telemetry
 */
function getFraudAlertById(alertId) {
  const alert = get(
    `SELECT fa.*,
            ar.account_number_masked, ar.account_type, ar.balance, ar.cbs_account_ref,
            cp.customer_number, cp.risk_rating, u.full_name as customer_name, u.email as customer_email, u.phone as customer_phone,
            an.full_name as assigned_analyst_name
     FROM fraud_alerts fa
     JOIN account_references ar ON fa.account_id = ar.id
     JOIN customer_profiles cp ON fa.customer_id = cp.id
     JOIN users u ON cp.user_id = u.id
     LEFT JOIN users an ON fa.assigned_analyst_id = an.id
     WHERE fa.id = ?`,
    [alertId]
  );

  if (!alert) return null;

  return {
    ...alert,
    reasons: alert.reasons ? JSON.parse(alert.reasons) : [],
    disclaimer: 'Risk scores are informational decision-support indicators for human compliance investigation, not conclusive proof of fraudulent intent.'
  };
}

/**
 * Acknowledge a fraud alert
 */
function acknowledgeAlert(alertId, analystId, analystName) {
  const alert = get('SELECT * FROM fraud_alerts WHERE id = ?', [alertId]);
  if (!alert) {
    const err = new Error('Fraud alert not found');
    err.status = 404;
    throw err;
  }

  const now = new Date().toISOString();
  run(
    `UPDATE fraud_alerts 
     SET status = 'ACKNOWLEDGED', assigned_analyst_id = COALESCE(assigned_analyst_id, ?), updated_at = ?
     WHERE id = ?`,
    [analystId, now, alertId]
  );

  recordAudit({
    actorId: analystId,
    actorRole: 'FRAUD_ANALYST',
    action: 'FRAUD_ALERT_ACKNOWLEDGED',
    entityType: 'FRAUD_ALERT',
    entityId: alertId,
    details: { alertCode: alert.alert_code, analystName }
  });

  return getFraudAlertById(alertId);
}

/**
 * Assign alert to a specific analyst
 */
function assignAlert(alertId, actorId, targetAnalystId) {
  const alert = get('SELECT * FROM fraud_alerts WHERE id = ?', [alertId]);
  if (!alert) {
    const err = new Error('Fraud alert not found');
    err.status = 404;
    throw err;
  }

  const targetAnalyst = get('SELECT full_name FROM users WHERE id = ?', [targetAnalystId]);
  const now = new Date().toISOString();

  run(
    `UPDATE fraud_alerts 
     SET assigned_analyst_id = ?, updated_at = ?
     WHERE id = ?`,
    [targetAnalystId, now, alertId]
  );

  recordAudit({
    actorId,
    actorRole: 'FRAUD_ANALYST',
    action: 'FRAUD_ALERT_ASSIGNED',
    entityType: 'FRAUD_ALERT',
    entityId: alertId,
    details: { alertCode: alert.alert_code, assignedTo: targetAnalyst?.full_name || targetAnalystId }
  });

  return getFraudAlertById(alertId);
}

/**
 * Advance alert to investigating state
 */
function investigateAlert(alertId, analystId, notes) {
  const alert = get('SELECT * FROM fraud_alerts WHERE id = ?', [alertId]);
  if (!alert) {
    const err = new Error('Fraud alert not found');
    err.status = 404;
    throw err;
  }

  const now = new Date().toISOString();
  const existingNotes = alert.investigation_notes ? alert.investigation_notes + '\n---\n' : '';
  const newNotes = existingNotes + `[${now.slice(0, 19)}] Investigation note: ${notes || 'Analyst commenced review'}`;

  run(
    `UPDATE fraud_alerts 
     SET status = 'INVESTIGATING', investigation_notes = ?, assigned_analyst_id = COALESCE(assigned_analyst_id, ?), updated_at = ?
     WHERE id = ?`,
    [newNotes, analystId, now, alertId]
  );

  recordAudit({
    actorId: analystId,
    actorRole: 'FRAUD_ANALYST',
    action: 'FRAUD_ALERT_INVESTIGATING',
    entityType: 'FRAUD_ALERT',
    entityId: alertId,
    details: { alertCode: alert.alert_code, notes }
  });

  return getFraudAlertById(alertId);
}

/**
 * Escalate fraud alert to senior risk committee
 */
function escalateAlert(alertId, analystId, notes) {
  const alert = get('SELECT * FROM fraud_alerts WHERE id = ?', [alertId]);
  if (!alert) {
    const err = new Error('Fraud alert not found');
    err.status = 404;
    throw err;
  }

  const now = new Date().toISOString();
  const existingNotes = alert.investigation_notes ? alert.investigation_notes + '\n---\n' : '';
  const newNotes = existingNotes + `[${now.slice(0, 19)}] ESCALATED: ${notes || 'Escalated to Senior Fraud Risk Committee'}`;

  run(
    `UPDATE fraud_alerts 
     SET status = 'ESCALATED', investigation_notes = ?, updated_at = ?
     WHERE id = ?`,
    [newNotes, now, alertId]
  );

  recordAudit({
    actorId: analystId,
    actorRole: 'FRAUD_ANALYST',
    action: 'FRAUD_ALERT_ESCALATED',
    entityType: 'FRAUD_ALERT',
    entityId: alertId,
    details: { alertCode: alert.alert_code, escalationReason: notes }
  });

  return getFraudAlertById(alertId);
}

/**
 * Close fraud alert with definitive disposition
 */
function closeAlert(alertId, analystId, disposition, notes) {
  const alert = get('SELECT * FROM fraud_alerts WHERE id = ?', [alertId]);
  if (!alert) {
    const err = new Error('Fraud alert not found');
    err.status = 404;
    throw err;
  }

  if (!VALID_DISPOSITIONS.includes(disposition)) {
    const err = new Error(`Invalid disposition. Allowed: ${VALID_DISPOSITIONS.join(', ')}`);
    err.status = 400;
    throw err;
  }

  const now = new Date().toISOString();
  const existingNotes = alert.investigation_notes ? alert.investigation_notes + '\n---\n' : '';
  const newNotes = existingNotes + `[${now.slice(0, 19)}] CLOSED (${disposition}): ${notes || 'Case closed by analyst'}`;

  run(
    `UPDATE fraud_alerts 
     SET status = 'CLOSED', resolution_disposition = ?, investigation_notes = ?, updated_at = ?
     WHERE id = ?`,
    [disposition, newNotes, now, alertId]
  );

  recordAudit({
    actorId: analystId,
    actorRole: 'FRAUD_ANALYST',
    action: 'FRAUD_ALERT_CLOSED',
    entityType: 'FRAUD_ALERT',
    entityId: alertId,
    details: { alertCode: alert.alert_code, disposition, notes }
  });

  return getFraudAlertById(alertId);
}

/**
 * Get all configurable fraud detection rules
 */
function getFraudRules() {
  return all('SELECT * FROM fraud_rules ORDER BY severity DESC, name ASC');
}

/**
 * Toggle a fraud detection rule on/off
 */
function toggleRule(ruleId, actorId) {
  const rule = get('SELECT * FROM fraud_rules WHERE id = ?', [ruleId]);
  if (!rule) {
    const err = new Error('Fraud rule not found');
    err.status = 404;
    throw err;
  }

  const newStatus = rule.is_enabled ? 0 : 1;
  const now = new Date().toISOString();

  run('UPDATE fraud_rules SET is_enabled = ?, updated_at = ? WHERE id = ?', [newStatus, now, ruleId]);

  recordAudit({
    actorId,
    actorRole: 'FRAUD_ANALYST',
    action: 'FRAUD_RULE_TOGGLED',
    entityType: 'FRAUD_RULE',
    entityId: ruleId,
    details: { ruleCode: rule.rule_code, isEnabled: Boolean(newStatus) }
  });

  return get('SELECT * FROM fraud_rules WHERE id = ?', [ruleId]);
}

/**
 * Statistical summary for fraud dashboard
 */
function getFraudStats() {
  const totalAlerts = get('SELECT COUNT(*) as count FROM fraud_alerts')?.count || 0;
  const openAlerts = get("SELECT COUNT(*) as count FROM fraud_alerts WHERE status IN ('NEW', 'ACKNOWLEDGED', 'INVESTIGATING', 'ESCALATED')")?.count || 0;
  const criticalCount = get("SELECT COUNT(*) as count FROM fraud_alerts WHERE severity = 'CRITICAL' AND status != 'CLOSED'")?.count || 0;
  const highCount = get("SELECT COUNT(*) as count FROM fraud_alerts WHERE severity = 'HIGH' AND status != 'CLOSED'")?.count || 0;
  const closedCount = get("SELECT COUNT(*) as count FROM fraud_alerts WHERE status = 'CLOSED'")?.count || 0;
  const avgRisk = get("SELECT AVG(risk_score) as avg FROM fraud_alerts WHERE status != 'CLOSED'")?.avg || 0;

  return {
    totalAlerts,
    openAlerts,
    criticalCount,
    highCount,
    closedCount,
    averageOpenRiskScore: Math.round(avgRisk),
    activeRulesCount: get('SELECT COUNT(*) as count FROM fraud_rules WHERE is_enabled = 1')?.count || 0
  };
}

module.exports = {
  getFraudAlerts,
  getFraudAlertById,
  acknowledgeAlert,
  assignAlert,
  investigateAlert,
  escalateAlert,
  closeAlert,
  getFraudRules,
  toggleRule,
  getFraudStats,
  VALID_ALERT_STATUSES,
  VALID_DISPOSITIONS
};
