const { get, all, run } = require('../db/database');
const crypto = require('crypto');
const { recordAudit } = require('../middleware/auditLogger');

/**
 * File a customer grievance / complaint
 */
function fileComplaint({ customerId, recoveryRequestId, subject, category, description }) {
  if (!subject || !description) {
    const err = new Error('Subject and description are required for filing a complaint');
    err.status = 400;
    throw err;
  }

  const id = 'comp-' + crypto.randomUUID();
  const now = new Date().toISOString();

  run(
    `INSERT INTO complaints (id, customer_id, recovery_request_id, subject, category, description, status, escalation_tier, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, 'OPEN', 1, ?, ?)`,
    [id, customerId, recoveryRequestId || null, subject, category || 'GENERAL_INQUIRY', description, now, now]
  );

  recordAudit({
    actorId: null,
    actorRole: 'CUSTOMER',
    action: 'COMPLAINT_FILED',
    entityType: 'COMPLAINT',
    entityId: id,
    details: { subject, category, recoveryRequestId }
  });

  return get('SELECT * FROM complaints WHERE id = ?', [id]);
}

/**
 * Escalates an existing complaint to next tier
 */
function escalateComplaint(complaintId, reason, actorId, actorRole) {
  const comp = get('SELECT * FROM complaints WHERE id = ?', [complaintId]);
  if (!comp) {
    const err = new Error('Complaint not found');
    err.status = 404;
    throw err;
  }

  const newTier = Math.min((comp.escalation_tier || 1) + 1, 3);
  const now = new Date().toISOString();

  run(
    `UPDATE complaints SET escalation_tier = ?, status = 'ESCALATED', resolution_notes = ?, updated_at = ?
     WHERE id = ?`,
    [newTier, `Escalated to Tier ${newTier}: ${reason || 'Customer requested expedited managerial review'}`, now, complaintId]
  );

  recordAudit({
    actorId,
    actorRole,
    action: `COMPLAINT_ESCALATED_TIER_${newTier}`,
    entityType: 'COMPLAINT',
    entityId: complaintId,
    details: { previousTier: comp.escalation_tier, newTier, reason }
  });

  return get('SELECT * FROM complaints WHERE id = ?', [complaintId]);
}

/**
 * Retrieves complaints for customer
 */
function getCustomerComplaints(customerId) {
  return all(
    'SELECT * FROM complaints WHERE customer_id = ? ORDER BY created_at DESC',
    [customerId]
  );
}

/**
 * Retrieves all complaints for staff review
 */
function getAllComplaints() {
  return all(
    `SELECT c.*, cp.customer_number, u.full_name as customer_name, u.email as customer_email
     FROM complaints c
     JOIN customer_profiles cp ON c.customer_id = cp.id
     JOIN users u ON cp.user_id = u.id
     ORDER BY c.escalation_tier DESC, c.created_at DESC`
  );
}

module.exports = {
  fileComplaint,
  escalateComplaint,
  getCustomerComplaints,
  getAllComplaints
};
