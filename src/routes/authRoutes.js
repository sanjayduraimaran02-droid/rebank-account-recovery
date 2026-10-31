const express = require('express');
const router = express.Router();
const { registerCustomer, loginUser, generateMfaOtp, verifyMfaOtp } = require('../services/authService');
const { authenticate } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');
const { all } = require('../db/database');

/**
 * Public: Get demo users for instant switching/testing
 */
router.get('/demo-users', (req, res) => {
  const users = [
    { email: 'elena.rostova@example.com', role: 'CUSTOMER', description: 'Customer (KYC Expired hold on $5,800.50 Savings)', password: 'Customer@123' },
    { email: 'john.doe@example.com', role: 'CUSTOMER', description: 'Customer (Dormant account hold, ready for L2 sign-off)', password: 'Customer@123' },
    { email: 'marcus.vance@example.com', role: 'CUSTOMER', description: 'Customer (AML Suspicious Transaction hold on $84k)', password: 'Customer@123' },
    { email: 'reviewer@rebank.internal', role: 'REVIEWER', description: 'Bank Reviewer (Maker / L1 Compliance Officer)', password: 'Reviewer@123' },
    { email: 'approver@rebank.internal', role: 'APPROVER', description: 'Bank Approver (Checker / L2 Dual Control Manager)', password: 'Approver@123' },
    { email: 'fraud.analyst@rebank.internal', role: 'FRAUD_ANALYST', description: 'Fraud Analyst (Risk triage & investigation)', password: 'Analyst@123' },
    { email: 'admin@rebank.internal', role: 'ADMIN', description: 'System Administrator (Audit logs & CBS Telemetry)', password: 'Admin@123' }
  ];
  res.json({ success: true, data: users });
});

/**
 * Register new customer
 */
router.post('/register', authLimiter, async (req, res, next) => {
  try {
    const { email, password, fullName, phone, address, dateOfBirth } = req.body;
    const result = await registerCustomer({ email, password, fullName, phone, address, dateOfBirth });
    res.status(201).json({
      success: true,
      message: 'Customer registration successful',
      data: result
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Login user
 */
router.post('/login', authLimiter, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });
    res.json({
      success: true,
      message: 'Login successful',
      data: result
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Get current authenticated user
 */
router.get('/me', authenticate, (req, res) => {
  res.json({
    success: true,
    data: {
      user: req.user,
      customerProfile: req.customerProfile || null
    }
  });
});

/**
 * Generate simulated MFA OTP
 */
router.post('/mfa/generate', authenticate, (req, res) => {
  const code = generateMfaOtp(req.user.id);
  res.json({
    success: true,
    message: 'Simulated 6-digit MFA OTP dispatched to registered device',
    data: {
      code, // Displayed in demo mode for test convenience
      expiresInSeconds: 600
    }
  });
});

/**
 * Verify MFA OTP
 */
router.post('/mfa/verify', authenticate, (req, res) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, error: { code: 'MISSING_CODE', message: 'OTP code required' } });
  }

  const isValid = verifyMfaOtp(req.user.id, code);
  if (!isValid) {
    return res.status(400).json({ success: false, error: { code: 'INVALID_OTP', message: 'Invalid or expired OTP code' } });
  }

  res.json({
    success: true,
    message: 'MFA verification confirmed successfully'
  });
});

module.exports = router;
