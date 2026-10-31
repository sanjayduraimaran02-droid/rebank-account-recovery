const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { get } = require('../db/database');
const { processChatbotMessage, getSuggestedQuestions } = require('../services/chatService');

const JWT_SECRET = process.env.JWT_SECRET || 'rebank_super_secure_jwt_secret_token_2026_xyz_production_ready';

// Optional auth middleware
function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = get('SELECT id, email, role, full_name, phone, mfa_enabled FROM users WHERE id = ?', [decoded.userId]);
      if (user) {
        req.user = {
          ...user,
          fullName: user.full_name,
          mfaEnabled: !!user.mfa_enabled
        };
        if (user.role === 'CUSTOMER') {
          const profile = get('SELECT id, customer_number, kyc_status, risk_rating FROM customer_profiles WHERE user_id = ?', [user.id]);
          if (profile) {
            req.customerProfile = {
              ...profile,
              customerNumber: profile.customer_number,
              kycStatus: profile.kyc_status,
              riskRating: profile.risk_rating
            };
          }
        }
      }
    } catch (e) {
      // Token expired or invalid, continue as guest
    }
  }
  next();
}

router.use(optionalAuth);

/**
 * POST /api/chat/message
 * Interactive intelligent bank staff chatbot response
 */
router.post('/message', async (req, res, next) => {
  try {
    const { message, language, accountId } = req.body;
    const result = await processChatbotMessage({
      message,
      language: language || 'en',
      user: req.user,
      customerProfile: req.customerProfile,
      accountId
    });

    res.json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/chat/suggested-questions
 */
router.get('/suggested-questions', (req, res) => {
  const language = req.query.language || 'en';
  const questions = getSuggestedQuestions(language);
  res.json({
    success: true,
    data: { questions }
  });
});

module.exports = router;
