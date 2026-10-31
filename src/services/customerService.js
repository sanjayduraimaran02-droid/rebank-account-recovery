const crypto = require('crypto');
const { get, run, transaction } = require('../db/database');
const { recordAudit } = require('../middleware/auditLogger');

/**
 * Register a new bank account for a customer
 * Strictly adheres to field order, Indian IFSC rules, masking security, and unverified status principles.
 */
async function registerBankAccount({
  customerId,
  accountHolderName,
  branchName,
  city,
  state,
  country,
  bankAccountNumber,
  confirmAccountNumber,
  ifscCode,
  phoneNumber,
  email,
  bankName,
  accountType,
  postalCode,
  residentialAddress,
  dateOfBirth,
  branchCode,
  termsAccepted
}) {
  // 1. Account Holder Name
  if (!accountHolderName || typeof accountHolderName !== 'string' || accountHolderName.trim().length < 2) {
    const err = new Error('Account Holder Name is required (minimum 2 characters)');
    err.status = 400;
    throw err;
  }

  // 2. Branch Name
  if (!branchName || typeof branchName !== 'string' || branchName.trim().length < 2) {
    const err = new Error('Branch Name is required (minimum 2 characters)');
    err.status = 400;
    throw err;
  }

  // 3. City
  if (!city || typeof city !== 'string' || city.trim().length < 2) {
    const err = new Error('City is required');
    err.status = 400;
    throw err;
  }

  // 4. State
  if (!state || typeof state !== 'string' || state.trim().length < 2) {
    const err = new Error('State is required');
    err.status = 400;
    throw err;
  }

  // 5. Country
  if (!country || typeof country !== 'string' || !country.trim()) {
    const err = new Error('Country is required');
    err.status = 400;
    throw err;
  }

  const cleanCountry = country.trim();
  const isIndia = /^(india|in)$/i.test(cleanCountry);

  // 6. Bank Account Number & 7. Confirm Account Number
  if (!bankAccountNumber || typeof bankAccountNumber !== 'string' || bankAccountNumber.trim().length < 6) {
    const err = new Error('Bank Account Number is required (minimum 6 digits)');
    err.status = 400;
    throw err;
  }

  if (!confirmAccountNumber || typeof confirmAccountNumber !== 'string') {
    const err = new Error('Please confirm your Bank Account Number');
    err.status = 400;
    throw err;
  }

  if (bankAccountNumber.trim() !== confirmAccountNumber.trim()) {
    const err = new Error('Bank account number and confirm account number do not match');
    err.status = 400;
    throw err;
  }

  // 8. IFSC Code (Strictly required and formatted when country is India)
  const cleanIfsc = ifscCode ? ifscCode.trim().toUpperCase() : null;
  if (isIndia) {
    if (!cleanIfsc) {
      const err = new Error('IFSC Code is required when Country is India');
      err.status = 400;
      throw err;
    }
    // Indian banking IFSC format: 4 letters, '0', 6 alphanumeric characters
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (!ifscRegex.test(cleanIfsc)) {
      const err = new Error('Invalid IFSC Code format for India (e.g. SBIN0001234: 4 letters, zero, 6 alphanumeric)');
      err.status = 400;
      throw err;
    }
  }

  // 9. Phone Number
  const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;
  const digitsOnly = (phoneNumber || '').replace(/[^0-9]/g, '');
  if (!phoneNumber || typeof phoneNumber !== 'string' || digitsOnly.length < 10 || !phoneRegex.test(phoneNumber.trim())) {
    const err = new Error('A valid Phone Number is required (minimum 10 digits)');
    err.status = 400;
    throw err;
  }

  // 10. Email validation (if provided)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && (typeof email !== 'string' || !emailRegex.test(email.trim()))) {
    const err = new Error('A valid Email Address is required');
    err.status = 400;
    throw err;
  }

  // 11. Terms and Consent
  if (termsAccepted !== undefined && (termsAccepted === false || termsAccepted === 'false' || termsAccepted === 0)) {
    const err = new Error('You must accept the terms and account verification consent to proceed');
    err.status = 400;
    throw err;
  }

  // Security: Immediately mask account number — NEVER store or log raw account numbers
  const rawClean = bankAccountNumber.trim();
  const last4 = rawClean.slice(-4);
  const accountNumberMasked = `•••• •••• •••• ${last4}`;

  // Verify customer profile exists
  const profile = get('SELECT id, user_id FROM customer_profiles WHERE id = ?', [customerId]);
  if (!profile) {
    const err = new Error('Customer profile not found');
    err.status = 404;
    throw err;
  }

  // Duplicate Check: Prevent duplicate registration of the same masked account under the customer
  const existing = get(
    'SELECT id FROM account_references WHERE customer_id = ? AND account_number_masked = ? AND branch_name = ?',
    [customerId, accountNumberMasked, branchName.trim()]
  );
  if (existing) {
    const err = new Error('This bank account is already registered under your customer profile.');
    err.status = 409;
    err.code = 'ACCOUNT_ALREADY_EXISTS';
    throw err;
  }

  const accountId = 'acc-' + crypto.randomUUID();
  const cbsAccountRef = `CBS-ACC-${Math.floor(1000 + Math.random() * 9000)}`;
  const restrictionId = 'rst-' + crypto.randomUUID();
  const now = new Date().toISOString();

  // Resolved metadata values
  const cleanBankName = (bankName && bankName.trim()) || (cleanIfsc && cleanIfsc.startsWith('SBIN') ? 'State Bank of India' : (cleanIfsc && cleanIfsc.startsWith('HDFC') ? 'HDFC Bank' : 'ReBank Federal'));
  const cleanAccountType = (accountType && ['SAVINGS', 'CHECKING', 'BUSINESS'].includes(accountType.trim().toUpperCase())) ? accountType.trim().toUpperCase() : 'SAVINGS';
  const cleanEmail = email ? email.trim() : null;
  const cleanPostalCode = postalCode ? postalCode.trim() : null;
  const cleanAddress = residentialAddress ? residentialAddress.trim() : null;
  const cleanDob = dateOfBirth ? dateOfBirth.trim() : null;
  const cleanBranchCode = branchCode ? branchCode.trim() : `BR-${city.trim().toUpperCase().slice(0, 3)}-01`;

  // In accordance with Requirement 8, newly registered accounts are NOT claimed to be verified or unblocked.
  // They start in RESTRICTED status awaiting identity verification / bank integration unblocking.
  transaction(({ run }) => {
    run(
      `INSERT INTO account_references (
        id, customer_id, account_holder_name, branch_name, city, state, country,
        account_number_masked, ifsc_code, phone_number, account_type, currency,
        balance, status, branch_code, cbs_account_ref, bank_name, email,
        postal_code, residential_address, date_of_birth, terms_accepted,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'USD', 2500.00, 'RESTRICTED', ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)`,
      [
        accountId,
        customerId,
        accountHolderName.trim(),
        branchName.trim(),
        city.trim(),
        state.trim(),
        cleanCountry,
        accountNumberMasked,
        cleanIfsc,
        phoneNumber.trim(),
        cleanAccountType,
        cleanBranchCode,
        cbsAccountRef,
        cleanBankName,
        cleanEmail,
        cleanPostalCode,
        cleanAddress,
        cleanDob,
        now,
        now
      ]
    );

    // Initial restriction requiring unblocking / verification assistance
    run(
      `INSERT INTO account_restrictions (
        id, account_id, restriction_code, severity, description, impacted_services,
        resolution_checklist, statutory_authority, applied_at, is_active, created_at, updated_at
      ) VALUES (?, ?, 'KYC_EXPIRED', 'MEDIUM', 'Newly registered account pending identity/KYC unblocking verification.',
        'DEBITS_LOCKED,TRANSFERS_PAUSED', ?, 'Simulated Banking Clearing Authority', ?, 1, ?, ?)`,
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
  });

  // Audit log — sanitized details strictly excluding full account number
  recordAudit({
    actorId: profile.user_id,
    actorRole: 'CUSTOMER',
    action: 'BANK_ACCOUNT_REGISTERED',
    entityType: 'ACCOUNT',
    entityId: accountId,
    details: {
      customerId,
      accountNumberMasked,
      bankName: cleanBankName,
      accountHolderName: accountHolderName.trim(),
      branchName: branchName.trim(),
      city: city.trim(),
      state: state.trim(),
      country: cleanCountry,
      ifscCode: cleanIfsc,
      status: 'RESTRICTED'
    }
  });

  return {
    id: accountId,
    customerId,
    bankName: cleanBankName,
    accountHolderName: accountHolderName.trim(),
    branchName: branchName.trim(),
    city: city.trim(),
    state: state.trim(),
    country: cleanCountry,
    accountNumberMasked,
    ifscCode: cleanIfsc,
    phoneNumber: phoneNumber.trim(),
    accountType: cleanAccountType,
    currency: 'USD',
    balance: 2500.00,
    status: 'RESTRICTED',
    cbsAccountRef,
    verificationNotice: 'Account registered in RESTRICTED status. Digital unblocking and verification required before debits are enabled.',
    createdAt: now
  };
}

module.exports = {
  registerBankAccount
};
