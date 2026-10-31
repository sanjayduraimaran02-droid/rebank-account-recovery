const jwt = require('jsonwebtoken');
const { get } = require('../db/database');

const JWT_SECRET = process.env.JWT_SECRET || 'rebank_super_secure_jwt_secret_token_2026_xyz_production_ready';

/**
 * Verifies JWT token from Authorization header (Bearer <token>)
 */
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication token required in Authorization header'
      }
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = get('SELECT id, email, role, full_name, phone, mfa_enabled FROM users WHERE id = ?', [decoded.userId]);
    if (!user) {
      return res.status(401).json({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: 'The user session is no longer valid'
        }
      });
    }

    req.user = {
      ...user,
      fullName: user.full_name,
      mfaEnabled: !!user.mfa_enabled
    };

    // If customer, also attach customer profile
    if (user.role === 'CUSTOMER') {
      const profile = get('SELECT id, customer_number, kyc_status, risk_rating FROM customer_profiles WHERE user_id = ?', [user.id]);
      req.customerProfile = profile ? {
        ...profile,
        customerNumber: profile.customer_number,
        kycStatus: profile.kyc_status,
        riskRating: profile.risk_rating
      } : null;
    }

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      error: {
        code: 'INVALID_TOKEN',
        message: 'Invalid or expired session token',
        details: err.message
      }
    });
  }
}

/**
 * Enforces Role-Based Access Control (RBAC)
 * @param {string[]} allowedRoles Array of roles (e.g. ['REVIEWER', 'APPROVER', 'ADMIN'])
 */
function requireRole(allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Authentication required' }
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: `Access denied. Requires one of roles: ${allowedRoles.join(', ')}`
        }
      });
    }

    next();
  };
}

/**
 * Enforces Account Ownership (IDOR Prevention)
 * Ensures customer can only access their own accounts
 */
function requireAccountOwner(req, res, next) {
  const accountId = req.params.accountId || req.body.accountId || req.params.id;
  if (!accountId) {
    return res.status(400).json({
      success: false,
      error: { code: 'MISSING_PARAM', message: 'Account ID parameter required' }
    });
  }

  // Staff can bypass ownership checks
  if (['REVIEWER', 'APPROVER', 'ADMIN', 'FRAUD_ANALYST'].includes(req.user.role)) {
    return next();
  }

  if (!req.customerProfile) {
    return res.status(403).json({
      success: false,
      error: { code: 'FORBIDDEN', message: 'No customer profile linked to user' }
    });
  }

  const account = get('SELECT id, customer_id FROM account_references WHERE id = ?', [accountId]);
  if (!account) {
    return res.status(404).json({
      success: false,
      error: { code: 'ACCOUNT_NOT_FOUND', message: 'Bank account reference not found' }
    });
  }

  if (account.customer_id !== req.customerProfile.id) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN_IDOR_PREVENTED',
        message: 'Access forbidden: you do not hold ownership of this account'
      }
    });
  }

  req.targetAccount = account;
  next();
}

/**
 * Enforces Recovery Request Ownership (IDOR Prevention)
 */
function requireRequestOwnerOrStaff(req, res, next) {
  const requestId = req.params.id || req.body.recoveryRequestId;
  if (!requestId) {
    return res.status(400).json({
      success: false,
      error: { code: 'MISSING_PARAM', message: 'Recovery Request ID required' }
    });
  }

  const recoveryRequest = get('SELECT * FROM recovery_requests WHERE id = ?', [requestId]);
  if (!recoveryRequest) {
    return res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Recovery request ticket not found' }
    });
  }

  if (['REVIEWER', 'APPROVER', 'ADMIN'].includes(req.user.role)) {
    req.recoveryRequest = recoveryRequest;
    return next();
  }

  if (!req.customerProfile || recoveryRequest.customer_id !== req.customerProfile.id) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN_IDOR_PREVENTED',
        message: 'Access forbidden: you are not authorized to view or modify this recovery ticket'
      }
    });
  }

  req.recoveryRequest = recoveryRequest;
  next();
}

module.exports = {
  authenticate,
  requireRole,
  requireAccountOwner,
  requireRequestOwnerOrStaff,
  JWT_SECRET
};
