const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../middleware/auth');
const { fileComplaint, escalateComplaint, getCustomerComplaints, getAllComplaints } = require('../services/complaintService');

router.use(authenticate);

/**
 * File new grievance / complaint (Customer)
 */
router.post('/', (req, res, next) => {
  try {
    if (!req.customerProfile) {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Only customer accounts can file grievances' }
      });
    }

    const { subject, category, description, recoveryRequestId } = req.body;
    const complaint = fileComplaint({
      customerId: req.customerProfile.id,
      recoveryRequestId,
      subject,
      category,
      description
    });

    res.status(201).json({
      success: true,
      message: 'Complaint registered and assigned to grievance handling desk',
      data: complaint
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Get customer's grievances
 */
router.get('/my', (req, res) => {
  if (!req.customerProfile) {
    return res.status(403).json({
      success: false,
      error: { code: 'FORBIDDEN', message: 'User has no customer profile' }
    });
  }

  const list = getCustomerComplaints(req.customerProfile.id);
  res.json({
    success: true,
    data: list
  });
});

/**
 * Get all complaints (Staff queue)
 */
router.get('/all', requireRole(['REVIEWER', 'APPROVER', 'ADMIN']), (req, res) => {
  const list = getAllComplaints();
  res.json({
    success: true,
    data: list
  });
});

/**
 * Escalate complaint to higher tier
 */
router.post('/:id/escalate', (req, res, next) => {
  try {
    const { reason } = req.body;
    const updated = escalateComplaint(req.params.id, reason, req.user.id, req.user.role);
    res.json({
      success: true,
      message: 'Complaint successfully escalated',
      data: updated
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
