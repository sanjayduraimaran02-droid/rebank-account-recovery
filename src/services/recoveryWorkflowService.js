const crypto = require('crypto');
const { get, all, run, transaction } = require('../db/database');
const { mockBankAdapter } = require('./bankIntegration/MockBankAdapter');
const { recordAudit } = require('../middleware/auditLogger');

// State transition rules
const ALLOWED_TRANSITIONS = {
  SUBMITTED: ['UNDER_REVIEW'],
  UNDER_REVIEW: ['INFO_REQUESTED', 'REVIEWED_PENDING_APPROVAL', 'REJECTED'],
  INFO_REQUESTED: ['UNDER_REVIEW'],
  REVIEWED_PENDING_APPROVAL: ['RESTORED', 'REJECTED'],
  RESTORED: [],
  REJECTED: []
};

/**
 * Generates an official unique recovery ticket reference number
 */
function generateReferenceNumber() {
  const year = new Date().getFullYear();
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `REB-${year}-${rand}`;
}

/**
 * Creates a new customer recovery application
 */
async function createRecoveryRequest({ customerId, accountId, restrictionId, categoryCode, customerExplanation, sourceOfFunds, contactConfirmed, consentSigned }) {
  // Validate restriction belongs to account
  const restriction = get(
    'SELECT * FROM account_restrictions WHERE id = ? AND account_id = ? AND is_active = 1',
    [restrictionId, accountId]
  );

  if (!restriction) {
    const err = new Error('No active account restriction matches the submitted application');
    err.status = 400;
    throw err;
  }

  // Prevent duplicate open requests for the same account restriction
  const existingOpen = get(
    `SELECT id, reference_number, status FROM recovery_requests 
     WHERE account_id = ? AND restriction_id = ? AND status NOT IN ('RESTORED', 'REJECTED')`,
    [accountId, restrictionId]
  );

  if (existingOpen) {
    const err = new Error(`An active recovery application (${existingOpen.reference_number}) is already in progress with status: ${existingOpen.status}`);
    err.status = 409;
    err.details = { existingReferenceNumber: existingOpen.reference_number, status: existingOpen.status };
    throw err;
  }

  const id = 'req-' + crypto.randomUUID();
  const referenceNumber = generateReferenceNumber();
  const now = new Date().toISOString();

  // Priority determination based on restriction severity
  let priority = 'MEDIUM';
  if (restriction.severity === 'CRITICAL') priority = 'CRITICAL';
  if (restriction.severity === 'HIGH') priority = 'HIGH';
  if (restriction.severity === 'LOW') priority = 'LOW';

  const newRequest = transaction(({ run }) => {
    run(
      `INSERT INTO recovery_requests (
        id, reference_number, customer_id, account_id, restriction_id, category_code,
        status, priority, customer_explanation, source_of_funds, contact_confirmed,
        consent_signed, submitted_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, 'SUBMITTED', ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        referenceNumber,
        customerId,
        accountId,
        restrictionId,
        categoryCode || restriction.restriction_code,
        priority,
        customerExplanation || 'Customer initiated recovery submission',
        sourceOfFunds || null,
        contactConfirmed ? 1 : 0,
        consentSigned ? 1 : 0,
        now,
        now
      ]
    );

    // Initial status history
    run(
      `INSERT INTO request_status_histories (id, recovery_request_id, previous_status, new_status, actor_role, notes, created_at)
       VALUES (?, ?, NULL, 'SUBMITTED', 'CUSTOMER', 'Recovery application submitted with digital evidence.', ?)`,
      ['hist-' + crypto.randomUUID(), id, now]
    );

    // Customer notification
    const user = get('SELECT user_id FROM customer_profiles WHERE id = ?', [customerId]);
    if (user) {
      run(
        `INSERT INTO notifications (id, user_id, title, message, type, read_status, delivery_channel, created_at)
         VALUES (?, ?, ?, ?, 'INFO', 0, 'IN_APP', ?)`,
        [
          'notif-' + crypto.randomUUID(),
          user.user_id,
          'Recovery Application Submitted',
          `Your recovery request ${referenceNumber} has been received and queued for compliance review.`,
          now
        ]
      );
    }

    return get('SELECT * FROM recovery_requests WHERE id = ?', [id]);
  });

  recordAudit({
    actorId: null,
    actorRole: 'CUSTOMER',
    action: 'RECOVERY_REQUEST_SUBMITTED',
    entityType: 'RECOVERY_REQUEST',
    entityId: id,
    details: { referenceNumber, accountId, categoryCode }
  });

  return newRequest;
}

/**
 * Transitions request state with strict validation and Four-Eyes enforcement
 */
async function transitionRequestState({ requestId, newStatus, actorId, actorRole, notes, decisionType, riskScore, idempotencyKey }) {
  const request = get('SELECT * FROM recovery_requests WHERE id = ?', [requestId]);
  if (!request) {
    const err = new Error('Recovery request not found');
    err.status = 404;
    throw err;
  }

  const currentStatus = request.status;
  const allowed = ALLOWED_TRANSITIONS[currentStatus] || [];
  if (!allowed.includes(newStatus)) {
    const err = new Error(`Invalid state transition: Cannot transition from '${currentStatus}' to '${newStatus}'. Allowed: [${allowed.join(', ')}]`);
    err.status = 400;
    throw err;
  }

  // Four-Eyes Principle validation:
  // If moving to RESTORED (Approval), the actor cannot be the assignedReviewerId
  if (newStatus === 'RESTORED') {
    if (actorRole !== 'APPROVER' && actorRole !== 'ADMIN') {
      const err = new Error('Only authorized Bank Approvers (Checker) can approve and release holds');
      err.status = 403;
      throw err;
    }

    if (request.assigned_reviewer_id && request.assigned_reviewer_id === actorId) {
      const err = new Error('Four-Eyes Principle Violation: The officer who completed the Maker review cannot authorize and approve the case.');
      err.status = 403;
      err.code = 'FOUR_EYES_VIOLATION';
      throw err;
    }
  }

  const now = new Date().toISOString();
  let cbsTransactionRef = null;

  // Execute Core Banking System hold release if approving/restoring
  if (newStatus === 'RESTORED') {
    const account = get('SELECT cbs_account_ref FROM account_references WHERE id = ?', [request.account_id]);
    const cbsRef = account ? account.cbs_account_ref : 'CBS-ACC-UNKNOWN';

    // Call MockBankAdapter to execute release
    const cbsResponse = await mockBankAdapter.releaseAccountHold(
      cbsRef,
      request.category_code,
      {
        approverId: actorId,
        makerId: request.assigned_reviewer_id,
        idempotencyKey: idempotencyKey || `unfreeze-${requestId}`,
        legalRef: request.reference_number
      }
    );

    cbsTransactionRef = cbsResponse.cbsTransactionRef;
  }

  transaction(({ run }) => {
    let updateFields = `status = ?, updated_at = ?`;
    let updateParams = [newStatus, now];

    if (newStatus === 'UNDER_REVIEW' && actorRole === 'REVIEWER') {
      updateFields += `, assigned_reviewer_id = ?`;
      updateParams.push(actorId);
    }

    if (newStatus === 'RESTORED') {
      updateFields += `, assigned_approver_id = ?, cbs_transaction_ref = ?, resolved_at = ?`;
      updateParams.push(actorId, cbsTransactionRef, now);

      // Deactivate account restriction and restore account status to ACTIVE
      run(
        `UPDATE account_restrictions SET is_active = 0, resolved_at = ?, updated_at = ? WHERE id = ?`,
        [now, now, request.restriction_id]
      );
      run(
        `UPDATE account_references SET status = 'ACTIVE', updated_at = ? WHERE id = ?`,
        [now, request.account_id]
      );
    }

    if (newStatus === 'REJECTED') {
      updateFields += `, resolved_at = ?`;
      updateParams.push(now);
    }

    updateParams.push(requestId);
    run(`UPDATE recovery_requests SET ${updateFields} WHERE id = ?`, updateParams);

    // Record status history
    run(
      `INSERT INTO request_status_histories (id, recovery_request_id, previous_status, new_status, changed_by_user_id, actor_role, notes, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      ['hist-' + crypto.randomUUID(), requestId, currentStatus, newStatus, actorId, actorRole, notes || `State changed to ${newStatus}`, now]
    );

    // Record review decision if provided
    if (decisionType) {
      run(
        `INSERT INTO review_decisions (id, recovery_request_id, reviewer_id, decision_type, notes, risk_score, four_eyes_validation_passed, created_at)
         VALUES (?, ?, ?, ?, ?, ?, 1, ?)`,
        ['dec-' + crypto.randomUUID(), requestId, actorId, decisionType, notes || null, riskScore || null, now]
      );
    }

    // Notify customer
    const user = get('SELECT user_id FROM customer_profiles WHERE id = ?', [request.customer_id]);
    if (user) {
      let notifTitle = `Update on Request ${request.reference_number}`;
      let notifMsg = `Your recovery request status changed to ${newStatus}.`;

      if (newStatus === 'RESTORED') {
        notifTitle = 'Account Hold Released!';
        notifMsg = `Great news! Restriction on your account has been lifted by Bank Compliance. CBS Reference: ${cbsTransactionRef}.`;
      } else if (newStatus === 'INFO_REQUESTED') {
        notifTitle = 'Action Required: Additional Information Requested';
        notifMsg = `Compliance Reviewer requested further documentation: ${notes || 'Please provide updated documents'}.`;
      } else if (newStatus === 'REJECTED') {
        notifTitle = 'Recovery Request Rejected';
        notifMsg = `Your recovery request has been rejected. Reason: ${notes || 'Compliance criteria not met'}.`;
      }

      run(
        `INSERT INTO notifications (id, user_id, title, message, type, read_status, delivery_channel, created_at)
         VALUES (?, ?, ?, ?, ?, 0, 'IN_APP', ?)`,
        ['notif-' + crypto.randomUUID(), user.user_id, notifTitle, notifMsg, newStatus === 'RESTORED' ? 'SUCCESS' : 'INFO', now]
      );
    }
  });

  recordAudit({
    actorId,
    actorRole,
    action: `RECOVERY_TRANSITION_${newStatus}`,
    entityType: 'RECOVERY_REQUEST',
    entityId: requestId,
    details: { previousStatus: currentStatus, newStatus, cbsTransactionRef, notes }
  });

  return get('SELECT * FROM recovery_requests WHERE id = ?', [requestId]);
}

/**
 * Retrieves full details of a recovery request, including history, documents, and decisions
 */
function getRequestDetails(requestId) {
  const req = get('SELECT * FROM recovery_requests WHERE id = ?', [requestId]);
  if (!req) return null;

  const history = all(
    `SELECT h.*, u.full_name as changed_by_name 
     FROM request_status_histories h
     LEFT JOIN users u ON h.changed_by_user_id = u.id
     WHERE h.recovery_request_id = ? 
     ORDER BY h.created_at ASC`,
    [requestId]
  );

  const documents = all('SELECT * FROM documents WHERE recovery_request_id = ? ORDER BY created_at ASC', [requestId]);
  const decisions = all(
    `SELECT d.*, u.full_name as reviewer_name, u.role as reviewer_role
     FROM review_decisions d
     JOIN users u ON d.reviewer_id = u.id
     WHERE d.recovery_request_id = ?
     ORDER BY d.created_at ASC`,
    [requestId]
  );

  const account = get('SELECT * FROM account_references WHERE id = ?', [req.account_id]);
  const restriction = get('SELECT * FROM account_restrictions WHERE id = ?', [req.restriction_id]);
  const profile = get('SELECT * FROM customer_profiles WHERE id = ?', [req.customer_id]);
  const customerUser = profile ? get('SELECT id, email, full_name, phone FROM users WHERE id = ?', [profile.user_id]) : null;

  let expectedNextStep = 'Awaiting initial triage by L1 Operations Analyst.';
  let resubmissionInstructions = null;
  let missingDocuments = [];

  if (req.status === 'SUBMITTED') {
    expectedNextStep = 'Your recovery application has been received and is queued for Maker review.';
  } else if (req.status === 'UNDER_REVIEW') {
    expectedNextStep = 'L1 Compliance Analyst is inspecting your submitted evidence against core records.';
  } else if (req.status === 'INFO_REQUESTED') {
    expectedNextStep = 'Action Required: Bank Compliance requested additional documentation.';
    const lastDecision = decisions.filter(d => d.decision_type === 'REQUEST_MORE_INFO').pop();
    resubmissionInstructions = lastDecision ? lastDecision.notes : 'Please submit updated identification or residential documentation.';
    missingDocuments = ['Clarified Identification or Proof of Address'];
  } else if (req.status === 'REVIEWED_PENDING_APPROVAL') {
    expectedNextStep = 'Maker review completed. Awaiting final dual-control sign-off from L2 Checker.';
  } else if (req.status === 'RESTORED') {
    expectedNextStep = 'Case resolved. Core Banking restriction hold released and account is active.';
  } else if (req.status === 'REJECTED') {
    expectedNextStep = 'Application rejected. Customer advised to schedule branch appointment.';
  }

  return {
    ...req,
    customer: customerUser ? { ...customerUser, ...profile } : null,
    account,
    restriction: restriction ? {
      ...restriction,
      checklist: restriction.resolution_checklist ? JSON.parse(restriction.resolution_checklist) : []
    } : null,
    history,
    documents: documents.map(d => ({
      ...d,
      ocrData: d.ocr_extracted_data ? JSON.parse(d.ocr_extracted_data) : null
    })),
    decisions,
    expectedNextStep,
    resubmissionInstructions,
    missingDocuments
  };
}

module.exports = {
  createRecoveryRequest,
  transitionRequestState,
  getRequestDetails,
  generateReferenceNumber,
  ALLOWED_TRANSITIONS
};
