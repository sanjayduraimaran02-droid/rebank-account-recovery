const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { getCustomerConsents, recordCustomerConsent, getPrivacyPolicy } = require('../services/privacyService');

/**
 * Public: Get privacy policy and data governance declarations
 */
router.get('/policy', (req, res) => {
  const policy = getPrivacyPolicy();
  res.json({
    success: true,
    data: policy
  });
});

/**
 * Authenticated customer: Get consent history
 */
router.get('/consents', authenticate, (req, res, next) => {
  try {
    if (!req.customerProfile) {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Only customer accounts maintain consent records' }
      });
    }

    const consents = getCustomerConsents(req.customerProfile.id);
    res.json({
      success: true,
      data: consents
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Authenticated customer: Update or grant consent
 */
router.post('/consents', authenticate, (req, res, next) => {
  try {
    if (!req.customerProfile) {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Only customer accounts can record consents' }
      });
    }

    const { consentType, consentVersion, granted } = req.body;
    if (!consentType) {
      return res.status(400).json({
        success: false,
        error: { code: 'MISSING_PARAM', message: 'Consent type parameter required' }
      });
    }

    const recorded = recordCustomerConsent(req.customerProfile.id, {
      consentType,
      consentVersion,
      granted: granted !== undefined ? Boolean(granted) : true,
      ipAddress: req.ip || '127.0.0.1',
      userAgent: req.headers['user-agent'] || 'Browser'
    });

    res.status(201).json({
      success: true,
      message: 'Privacy consent preference recorded successfully',
      data: recorded
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
