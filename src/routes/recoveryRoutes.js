const express = require('express');
const router = express.Router();
const { authenticate, requireRequestOwnerOrStaff } = require('../middleware/auth');
const { idempotencyMiddleware } = require('../middleware/idempotency');
const { createRecoveryRequest, getRequestDetails, transitionRequestState } = require('../services/recoveryWorkflowService');
const { upload, recordDocumentMetadata, simulateOcrAnalysis } = require('../services/documentService');
const { get, all } = require('../db/database');

router.use(authenticate);

/**
 * Submit new recovery application
 */
router.post('/submit', idempotencyMiddleware, async (req, res, next) => {
  try {
    if (!req.customerProfile) {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Only customer accounts can submit recovery applications' }
      });
    }

    const {
      accountId,
      restrictionId,
      categoryCode,
      customerExplanation,
      sourceOfFunds,
      contactConfirmed,
      consentSigned
    } = req.body;

    if (!accountId || !restrictionId) {
      return res.status(400).json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'Account ID and Restriction ID are required' }
      });
    }

    // IDOR Protection: Verify account belongs to customer
    const account = get('SELECT id, customer_id FROM account_references WHERE id = ?', [accountId]);
    if (!account || account.customer_id !== req.customerProfile.id) {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN_IDOR', message: 'You are not authorized to initiate recovery for this account' }
      });
    }

    const newRequest = await createRecoveryRequest({
      customerId: req.customerProfile.id,
      accountId,
      restrictionId,
      categoryCode,
      customerExplanation,
      sourceOfFunds,
      contactConfirmed: Boolean(contactConfirmed),
      consentSigned: Boolean(consentSigned)
    });

    res.status(201).json({
      success: true,
      message: 'Recovery application submitted successfully',
      data: newRequest
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Get all recovery requests for the authenticated customer
 */
router.get('/my-requests', (req, res) => {
  if (!req.customerProfile) {
    return res.status(403).json({
      success: false,
      error: { code: 'FORBIDDEN', message: 'Only customer accounts have recovery applications' }
    });
  }

  const requests = all(
    `SELECT id FROM recovery_requests
     WHERE customer_id = ?
     ORDER BY submitted_at DESC`,
    [req.customerProfile.id]
  );

  const enriched = requests.map(r => getRequestDetails(r.id)).filter(Boolean);

  res.json({
    success: true,
    data: enriched
  });
});

/**
 * Get detailed view of specific recovery ticket (with IDOR check)
 */
router.get('/:id', requireRequestOwnerOrStaff, (req, res) => {
  const details = getRequestDetails(req.params.id);
  if (!details) {
    return res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Recovery ticket not found' }
    });
  }

  res.json({
    success: true,
    data: details
  });
});

/**
 * Upload document or evidence for recovery ticket
 */
router.post('/:id/upload-doc', requireRequestOwnerOrStaff, upload.single('document'), async (req, res, next) => {
  try {
    const recoveryRequestId = req.params.id;
    const documentType = req.body.documentType || 'GOVT_ID';

    // Support both real uploaded file and simulated file upload
    let file = req.file;
    if (!file) {
      // Create synthetic fallback file if upload was simulated via json/mock
      const mockName = req.body.fileName || `${documentType.toLowerCase()}_sample.jpg`;
      file = {
        originalname: mockName,
        mimetype: 'image/jpeg',
        size: 320000,
        path: `uploads/${mockName}`
      };
    }

    const recorded = recordDocumentMetadata({
      recoveryRequestId,
      documentType,
      file,
      simulatedData: req.body.simulatedData ? JSON.parse(req.body.simulatedData) : null
    });

    // If ticket was in INFO_REQUESTED status, automatically return it to UNDER_REVIEW for reviewer re-inspection
    if (req.recoveryRequest && req.recoveryRequest.status === 'INFO_REQUESTED') {
      await transitionRequestState({
        requestId: recoveryRequestId,
        newStatus: 'UNDER_REVIEW',
        actorId: req.user.id,
        actorRole: req.user.role,
        notes: 'Customer provided requested additional documentation.'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Document uploaded and analyzed with automated OCR / Biometric scoring',
      data: {
        ...recorded,
        ocrData: recorded.ocr_extracted_data ? JSON.parse(recorded.ocr_extracted_data) : null
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
