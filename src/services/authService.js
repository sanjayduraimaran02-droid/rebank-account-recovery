const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { get, run, transaction } = require('../db/database');
const { JWT_SECRET } = require('../middleware/auth');
const { recordAudit } = require('../middleware/auditLogger');

// In-memory MFA OTP storage for demo (10 minute expiry)
const mfaOtps = new Map();

/**
 * Register a new customer
 */
async function registerCustomer({ email, password, fullName, phone, address, dateOfBirth }) {
  // 1. Validate Full Legal Name
  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    const err = new Error('Full legal name is required (minimum 2 characters)');
    err.status = 400;
    throw err;
  }

  // 2. Validate Phone Number (minimum 10 digits)
  const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;
  const digitsOnly = (phone || '').replace(/[^0-9]/g, '');
  if (!phone || typeof phone !== 'string' || digitsOnly.length < 10 || !phoneRegex.test(phone.trim())) {
    const err = new Error('A valid mobile phone number is required (minimum 10 digits)');
    err.status = 400;
    throw err;
  }

  // 3. Validate Email Address format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    const err = new Error('A valid email address is required');
    err.status = 400;
    throw err;
  }

  // 4. Validate Password length
  if (!password || typeof password !== 'string' || password.length < 8) {
    const err = new Error('Password must be at least 8 characters long');
    err.status = 400;
    throw err;
  }

  // Check if email already exists
  const existing = get('SELECT id FROM users WHERE email = ?', [email.toLowerCase().trim()]);
  if (existing) {
    const err = new Error('A user with this email address already exists. Please sign in instead.');
    err.status = 409;
    err.code = 'USER_ALREADY_EXISTS';
    throw err;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const userId = 'usr-' + crypto.randomUUID();
  const profileId = 'prof-' + crypto.randomUUID();
  const customerNumber = 'CUST-' + Math.floor(100000 + Math.random() * 900000);
  const now = new Date().toISOString();

  // New demo account with KYC_EXPIRED restriction to allow immediate testing
  const accountId = 'acc-' + crypto.randomUUID();
  const rawAccNum = Math.floor(1000 + Math.random() * 9000).toString();
  const maskedAccNum = `•••• •••• •••• ${rawAccNum}`;
  const cbsAccountRef = `CBS-ACC-${rawAccNum}`;

  const restrictionId = 'rst-' + crypto.randomUUID();

  transaction(({ run }) => {
    // Insert user
    run(
      `INSERT INTO users (id, email, password_hash, role, full_name, phone, mfa_enabled, created_at, updated_at)
       VALUES (?, ?, ?, 'CUSTOMER', ?, ?, 0, ?, ?)`,
      [userId, email.toLowerCase().trim(), passwordHash, fullName, phone || null, now, now]
    );

    // Insert customer profile
    run(
      `INSERT INTO customer_profiles (id, user_id, customer_number, address, date_of_birth, risk_rating, nationality, kyc_status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, 'LOW', 'US', 'EXPIRED', ?, ?)`,
      [profileId, userId, customerNumber, address || 'Default Address', dateOfBirth || '1990-01-01', now, now]
    );

    // Insert initial demo account
    run(
      `INSERT INTO account_references (id, customer_id, account_number_masked, account_type, currency, balance, status, branch_code, cbs_account_ref, created_at, updated_at)
       VALUES (?, ?, ?, 'SAVINGS', 'USD', 3500.00, 'RESTRICTED', 'BR-CENTRAL-01', ?, ?, ?)`,
      [accountId, profileId, maskedAccNum, cbsAccountRef, now, now]
    );

    // Insert demo restriction
    run(
      `INSERT INTO account_restrictions (id, account_id, restriction_code, severity, description, impacted_services, resolution_checklist, statutory_authority, applied_at, is_active, created_at, updated_at)
       VALUES (?, ?, 'KYC_EXPIRED', 'MEDIUM', 'Statutory periodic KYC refresh cycle expired. Outbound debits paused.', 'DEBITS_LOCKED,TRANSFERS_PAUSED', ?, 'Financial Consumer Protection Bureau', ?, 1, ?, ?)`,
      [
        restrictionId,
        accountId,
        JSON.stringify([
          'Upload valid Government ID (Passport, National ID, or Driving License)',
          'Upload Proof of Residential Address (< 90 days)',
          'Perform Biometric Liveness Face Check'
        ]),
        now,
        now,
        now
      ]
    );

    // Welcome notification
    run(
      `INSERT INTO notifications (id, user_id, title, message, type, read_status, delivery_channel, created_at)
       VALUES (?, ?, 'Welcome to ReBank', 'Your account has been created. Complete your KYC refresh to unlock all banking features.', 'INFO', 0, 'IN_APP', ?)`,
      ['notif-' + crypto.randomUUID(), userId, now]
    );
  });

  const token = jwt.sign({ userId, email, role: 'CUSTOMER' }, JWT_SECRET, { expiresIn: '24h' });

  recordAudit({
    actorId: userId,
    actorRole: 'CUSTOMER',
    action: 'AUTH_REGISTER',
    entityType: 'USER',
    entityId: userId,
    details: { email, customerNumber }
  });

  return {
    token,
    user: {
      id: userId,
      email,
      role: 'CUSTOMER',
      fullName,
      phone
    },
    customerProfile: {
      id: profileId,
      customerNumber,
      kycStatus: 'EXPIRED'
    }
  };
}

/**
 * Authenticate user by email & password
 */
async function loginUser({ email, password }) {
  if (!email || !password) {
    const err = new Error('Email and password are required');
    err.status = 400;
    throw err;
  }

  const user = get('SELECT * FROM users WHERE email = ?', [email.toLowerCase().trim()]);
  if (!user) {
    const err = new Error('Invalid email or password');
    err.status = 401;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    const err = new Error('Invalid email or password');
    err.status = 401;
    throw err;
  }

  let customerProfile = null;
  if (user.role === 'CUSTOMER') {
    customerProfile = get('SELECT * FROM customer_profiles WHERE user_id = ?', [user.id]);
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  recordAudit({
    actorId: user.id,
    actorRole: user.role,
    action: 'AUTH_LOGIN_SUCCESS',
    entityType: 'USER',
    entityId: user.id,
    details: { email: user.email, role: user.role }
  });

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.full_name,
      phone: user.phone,
      mfaEnabled: Boolean(user.mfa_enabled)
    },
    customerProfile
  };
}

/**
 * Generates an MFA OTP code (simulated SMS / Authenticator)
 */
function generateMfaOtp(userId) {
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  mfaOtps.set(userId, {
    code,
    expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
  });
  return code;
}

/**
 * Verifies an MFA OTP code
 */
function verifyMfaOtp(userId, inputCode) {
  const record = mfaOtps.get(userId);
  if (!record) return false;
  if (Date.now() > record.expiresAt) {
    mfaOtps.delete(userId);
    return false;
  }
  const isValid = record.code === inputCode.trim();
  if (isValid) {
    mfaOtps.delete(userId);
  }
  return isValid;
}

module.exports = {
  registerCustomer,
  loginUser,
  generateMfaOtp,
  verifyMfaOtp
};
