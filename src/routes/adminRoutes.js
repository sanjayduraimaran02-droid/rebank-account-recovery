const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../middleware/auth');
const { transitionRequestState, getRequestDetails } = require('../services/recoveryWorkflowService');
const { getAuditLogs } = require('../services/auditService');
const { mockBankAdapter } = require('../services/bankIntegration/MockBankAdapter');
const { seed } = require('../db/seed');
const { all, get } = require('../db/database');

// All admin routes require authentication and staff role
router.use(authenticate);

/**
 * Reviewer (Maker / L1) Queue
 */
router.get('/queue/reviewer', requireRole(['REVIEWER', 'ADMIN']), (req, res) => {
  const cases = all(
    `SELECT r.*, a.account_number_masked, a.account_type, a.balance,
            cp.customer_number, u.full_name as customer_name, u.email as customer_email,
            ar.restriction_code, ar.severity,
            rev.full_name as assigned_reviewer_name
     FROM recovery_requests r
     JOIN customer_profiles cp ON r.customer_id = cp.id
     JOIN users u ON cp.user_id = u.id
     JOIN account_references a ON r.account_id = a.id
     JOIN account_restrictions ar ON r.restriction_id = ar.id
     LEFT JOIN users rev ON r.assigned_reviewer_id = rev.id
     WHERE r.status IN ('SUBMITTED', 'UNDER_REVIEW', 'INFO_REQUESTED')
     ORDER BY 
       CASE r.priority 
         WHEN 'CRITICAL' THEN 1 
         WHEN 'HIGH' THEN 2 
         WHEN 'MEDIUM' THEN 3 
         ELSE 4 
       END ASC, 
       r.submitted_at ASC`
  );

  res.json({
    success: true,
    data: cases
  });
});

/**
 * Approver (Checker / L2) Queue
 */
router.get('/queue/approver', requireRole(['APPROVER', 'ADMIN']), (req, res) => {
  const cases = all(
    `SELECT r.*, a.account_number_masked, a.account_type, a.balance,
            cp.customer_number, u.full_name as customer_name, u.email as customer_email,
            ar.restriction_code, ar.severity,
            rev.full_name as assigned_reviewer_name
     FROM recovery_requests r
     JOIN customer_profiles cp ON r.customer_id = cp.id
     JOIN users u ON cp.user_id = u.id
     JOIN account_references a ON r.account_id = a.id
     JOIN account_restrictions ar ON r.restriction_id = ar.id
     LEFT JOIN users rev ON r.assigned_reviewer_id = rev.id
     WHERE r.status = 'REVIEWED_PENDING_APPROVAL'
     ORDER BY r.updated_at ASC`
  );

  res.json({
    success: true,
    data: cases
  });
});

/**
 * Reviewer Claims a case from the queue
 */
router.post('/case/:id/claim', requireRole(['REVIEWER', 'ADMIN']), async (req, res, next) => {
  try {
    const updated = await transitionRequestState({
      requestId: req.params.id,
      newStatus: 'UNDER_REVIEW',
      actorId: req.user.id,
      actorRole: 'REVIEWER',
      notes: `Case claimed by L1 Officer: ${req.user.full_name}`
    });

    res.json({
      success: true,
      message: 'Case claimed successfully for review',
      data: updated
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Reviewer (Maker) Records Decision:
 * Actions: RECOMMEND_APPROVAL (moves to REVIEWED_PENDING_APPROVAL), REQUEST_MORE_INFO, REJECT
 */
router.post('/case/:id/review', requireRole(['REVIEWER', 'ADMIN']), async (req, res, next) => {
  try {
    const { action, notes, riskScore } = req.body;
    let targetStatus;

    if (action === 'RECOMMEND_APPROVAL') {
      targetStatus = 'REVIEWED_PENDING_APPROVAL';
    } else if (action === 'REQUEST_MORE_INFO') {
      targetStatus = 'INFO_REQUESTED';
    } else if (action === 'REJECT') {
      targetStatus = 'REJECTED';
    } else {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_ACTION', message: 'Action must be one of: RECOMMEND_APPROVAL, REQUEST_MORE_INFO, REJECT' }
      });
    }

    const updated = await transitionRequestState({
      requestId: req.params.id,
      newStatus: targetStatus,
      actorId: req.user.id,
      actorRole: 'REVIEWER',
      notes: notes || `Maker decision: ${action}`,
      decisionType: action,
      riskScore: riskScore ? parseInt(riskScore, 10) : 20
    });

    res.json({
      success: true,
      message: `Review decision '${action}' recorded successfully`,
      data: updated
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Approver (Checker) Authorizes and Executes CBS Hold Release
 * Enforces Four-Eyes Principle: approverId != assignedReviewerId
 */
router.post('/case/:id/authorize', requireRole(['APPROVER', 'ADMIN']), async (req, res, next) => {
  try {
    const { action = 'APPROVE_AND_UNFREEZE', notes, idempotencyKey } = req.body;

    let targetStatus;
    if (action === 'APPROVE_AND_UNFREEZE' || action === 'APPROVE') {
      targetStatus = 'RESTORED';
    } else if (action === 'REJECT') {
      targetStatus = 'REJECTED';
    } else {
      return res.status(400).json({
        success: false,
        error: { code: 'INVALID_ACTION', message: 'Action must be APPROVE_AND_UNFREEZE or REJECT' }
      });
    }

    const updated = await transitionRequestState({
      requestId: req.params.id,
      newStatus: targetStatus,
      actorId: req.user.id,
      actorRole: 'APPROVER',
      notes: notes || `Checker authorization: ${action}`,
      decisionType: action,
      idempotencyKey
    });

    res.json({
      success: true,
      message: targetStatus === 'RESTORED' 
        ? 'Dual-control authorization confirmed. Core Banking System hold successfully released.' 
        : 'Request rejected by Approver',
      data: updated
    });
  } catch (err) {
    next(err);
  }
});

/**
 * System Audit Log Stream
 */
router.get('/audit-logs', requireRole(['ADMIN', 'APPROVER']), (req, res) => {
  const { limit = 100, offset = 0, actorRole, action, entityType } = req.query;
  const logs = getAuditLogs({ limit, offset, actorRole, action, entityType });
  res.json({
    success: true,
    data: logs
  });
});

/**
 * Core Banking System Telemetry & Configuration
 */
router.get('/cbs-status', requireRole(['ADMIN', 'APPROVER', 'REVIEWER']), (req, res) => {
  res.json({
    success: true,
    data: {
      connectedCore: 'SIMULATED_FINACLE_CORE_V11',
      status: 'HEALTHY',
      latencyMs: mockBankAdapter.latencyMs,
      failRate: mockBankAdapter.failRate,
      productionBankingActionsEnabled: mockBankAdapter.isProductionAuthorized(),
      telemetry: mockBankAdapter.getTelemetry()
    }
  });
});

/**
 * Configure CBS latency and simulated fault rates
 */
router.post('/cbs-config', requireRole(['ADMIN']), (req, res) => {
  const { latencyMs, failRate } = req.body;
  if (typeof latencyMs === 'number') mockBankAdapter.setLatency(latencyMs);
  if (typeof failRate === 'number') mockBankAdapter.setFailRate(failRate);

  res.json({
    success: true,
    message: 'CBS adapter simulation configuration updated',
    data: {
      latencyMs: mockBankAdapter.latencyMs,
      failRate: mockBankAdapter.failRate
    }
  });
});

/**
 * Executive and Operational Reports Summary
 */
router.get('/reports/summary', requireRole(['ADMIN', 'APPROVER', 'REVIEWER', 'FRAUD_ANALYST']), (req, res, next) => {
  try {
    const totalCases = get('SELECT COUNT(*) as count FROM recovery_requests')?.count || 0;
    const statusCounts = all('SELECT status, COUNT(*) as count FROM recovery_requests GROUP BY status');
    const byStatus = {};
    for (const sc of statusCounts) {
      byStatus[sc.status] = sc.count;
    }

    const pendingMaker = (byStatus.SUBMITTED || 0) + (byStatus.UNDER_REVIEW || 0) + (byStatus.INFO_REQUESTED || 0);
    const pendingChecker = byStatus.REVIEWED_PENDING_APPROVAL || 0;
    const totalRestored = byStatus.RESTORED || 0;
    const totalActiveHolds = get('SELECT COUNT(*) as count FROM account_restrictions WHERE is_active = 1')?.count || 0;

    // Fraud alerts summary
    const fraudStats = get(`SELECT COUNT(*) as total, SUM(CASE WHEN status != 'CLOSED' THEN 1 ELSE 0 END) as openAlerts FROM fraud_alerts`) || { total: 0, openAlerts: 0 };

    res.json({
      success: true,
      data: {
        totalCases,
        byStatus,
        pendingMakerReviews: pendingMaker,
        pendingCheckerApprovals: pendingChecker,
        totalRestoredAccounts: totalRestored,
        totalActiveRestrictions: totalActiveHolds,
        avgTurnaroundHours: 3.2,
        fraudAlertsTotal: fraudStats.total || 0,
        fraudAlertsOpen: fraudStats.openAlerts || 0,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Export non-sensitive compliance and recovery reports (JSON or CSV)
 */
router.get('/reports/export', requireRole(['ADMIN', 'APPROVER']), (req, res, next) => {
  try {
    const { type = 'cases', format = 'json' } = req.query;

    let data = [];
    if (type === 'cases') {
      data = all(
        `SELECT r.reference_number, r.category_code, r.status, r.priority,
                r.submitted_at, r.resolved_at, r.cbs_transaction_ref,
                a.account_number_masked, a.account_type,
                cp.customer_number
         FROM recovery_requests r
         JOIN account_references a ON r.account_id = a.id
         JOIN customer_profiles cp ON r.customer_id = cp.id
         ORDER BY r.submitted_at DESC`
      );
    } else if (type === 'fraud') {
      data = all(
        `SELECT alert_code, alert_type, severity, risk_score, status, resolution_disposition, created_at
         FROM fraud_alerts
         ORDER BY created_at DESC`
      );
    }

    if (format === 'csv') {
      if (data.length === 0) {
        res.setHeader('Content-Type', 'text/csv');
        return res.send('No records found');
      }
      const headers = Object.keys(data[0]).join(',');
      const rows = data.map(row => Object.values(row).map(v => `"${v || ''}"`).join(','));
      const csv = [headers, ...rows].join('\n');
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename=rebank_${type}_report_${Date.now()}.csv`);
      return res.send(csv);
    }

    res.json({
      success: true,
      reportType: type,
      recordCount: data.length,
      data
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
