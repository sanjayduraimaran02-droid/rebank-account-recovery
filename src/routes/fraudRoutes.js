const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../middleware/auth');
const {
  getFraudAlerts,
  getFraudAlertById,
  acknowledgeAlert,
  assignAlert,
  investigateAlert,
  escalateAlert,
  closeAlert,
  getFraudRules,
  toggleRule,
  getFraudStats
} = require('../services/fraudService');

// All fraud routes require authentication and staff/analyst roles
router.use(authenticate);
router.use(requireRole(['FRAUD_ANALYST', 'REVIEWER', 'APPROVER', 'ADMIN']));

/**
 * List fraud alerts with filtering and pagination
 */
router.get('/alerts', (req, res, next) => {
  try {
    const { status, severity, search, limit, offset } = req.query;
    const alerts = getFraudAlerts({ status, severity, search, limit, offset });
    res.json({
      success: true,
      data: alerts
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Get statistical summary for fraud monitoring dashboard
 */
router.get('/stats', (req, res, next) => {
  try {
    const stats = getFraudStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Get detailed alert by ID
 */
router.get('/alerts/:id', (req, res, next) => {
  try {
    const alert = getFraudAlertById(req.params.id);
    if (!alert) {
      return res.status(404).json({
        success: false,
        error: { code: 'NOT_FOUND', message: 'Fraud alert record not found' }
      });
    }

    res.json({
      success: true,
      data: alert
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Acknowledge alert
 */
router.post('/alerts/:id/acknowledge', (req, res, next) => {
  try {
    const updated = acknowledgeAlert(req.params.id, req.user.id, req.user.full_name);
    res.json({
      success: true,
      message: 'Fraud alert acknowledged and assigned to triage',
      data: updated
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Assign alert
 */
router.post('/alerts/:id/assign', (req, res, next) => {
  try {
    const { assignedToId } = req.body;
    if (!assignedToId) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_PARAM', message: 'Target analyst ID required' }
      });
    }
    const updated = assignAlert(req.params.id, req.user.id, assignedToId);
    res.json({
      success: true,
      message: 'Fraud alert assigned successfully',
      data: updated
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Record investigation notes
 */
router.post('/alerts/:id/investigate', (req, res, next) => {
  try {
    const { notes } = req.body;
    const updated = investigateAlert(req.params.id, req.user.id, notes);
    res.json({
      success: true,
      message: 'Investigation progress and compliance notes recorded',
      data: updated
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Escalate alert to senior risk committee
 */
router.post('/alerts/:id/escalate', (req, res, next) => {
  try {
    const { notes } = req.body;
    const updated = escalateAlert(req.params.id, req.user.id, notes);
    res.json({
      success: true,
      message: 'Alert escalated to Senior Fraud Committee',
      data: updated
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Close alert with disposition
 */
router.post('/alerts/:id/close', (req, res, next) => {
  try {
    const { disposition, notes } = req.body;
    if (!disposition) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_PARAM', message: 'Resolution disposition required (e.g. FALSE_POSITIVE, CONFIRMED_FRAUD_PREVENTED, CUSTOMER_VERIFIED)' }
      });
    }

    const updated = closeAlert(req.params.id, req.user.id, disposition, notes);
    res.json({
      success: true,
      message: `Alert closed with disposition: ${disposition}`,
      data: updated
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Get configurable rules
 */
router.get('/rules', (req, res, next) => {
  try {
    const rules = getFraudRules();
    res.json({
      success: true,
      data: rules
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Toggle rule
 */
router.post('/rules/:id/toggle', (req, res, next) => {
  try {
    const updated = toggleRule(req.params.id, req.user.id);
    res.json({
      success: true,
      message: `Rule ${updated.rule_code} status updated to ${updated.is_enabled ? 'ENABLED' : 'DISABLED'}`,
      data: updated
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
