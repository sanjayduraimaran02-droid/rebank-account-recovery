const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { authenticate, requireRole, requireAccountOwner } = require('../middleware/auth');
const { getCustomerAccounts, evaluateEligibility, getAllLockReasons } = require('../services/restrictionService');
const { registerBankAccount } = require('../services/customerService');
const { get, all, run, transaction } = require('../db/database');

// All customer routes require authentication and CUSTOMER or ADMIN role
router.use(authenticate);

/**
 * Customer lock reasons & unlock guides
 */
router.get('/lock-reasons', (req, res) => {
  const reasons = getAllLockReasons();
  res.json({
    success: true,
    data: reasons,
    count: reasons.length
  });
});

/**
 * Get customer profile with user details
 */
router.get('/profile', (req, res) => {
  if (!req.customerProfile) {
    return res.status(403).json({
      success: false,
      error: { code: 'FORBIDDEN', message: 'User is not linked to a customer profile' }
    });
  }

  const profile = get(
    `SELECT u.id as user_id, u.email, u.full_name, u.phone, u.role,
            p.id as customer_id, p.customer_number, p.address, p.date_of_birth, p.kyc_status, p.risk_rating
     FROM users u
     JOIN customer_profiles p ON p.user_id = u.id
     WHERE p.id = ?`,
    [req.customerProfile.id]
  );

  if (!profile) {
    return res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Customer profile not found' }
    });
  }

  res.json({
    success: true,
    data: profile
  });
});

/**
 * Update editable profile details
 */
router.put('/profile', (req, res) => {
  if (!req.customerProfile) {
    return res.status(403).json({
      success: false,
      error: { code: 'FORBIDDEN', message: 'User is not linked to a customer profile' }
    });
  }

  const { fullName, phone, address } = req.body;
  const now = new Date().toISOString();

  if (fullName || phone) {
    run(
      `UPDATE users SET full_name = COALESCE(?, full_name), phone = COALESCE(?, phone), updated_at = ? WHERE id = ?`,
      [fullName || null, phone || null, now, req.user.id]
    );
  }

  if (address) {
    run(
      `UPDATE customer_profiles SET address = ?, updated_at = ? WHERE id = ?`,
      [address, now, req.customerProfile.id]
    );
  }

  res.json({
    success: true,
    message: 'Profile successfully updated',
    data: {
      fullName: fullName || req.user.full_name,
      phone: phone || req.user.phone,
      address
    }
  });
});

/**
 * Register a new bank account
 */
router.post('/accounts', async (req, res, next) => {
  try {
    if (!req.customerProfile) {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'User is not linked to a customer profile' }
      });
    }

    const {
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
    } = req.body;

    const account = await registerBankAccount({
      customerId: req.customerProfile.id,
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
    });

    res.status(201).json({
      success: true,
      message: 'Bank account successfully registered in RESTRICTED status awaiting verification',
      data: account
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Get all accounts owned by the authenticated customer
 */
router.get('/accounts', (req, res) => {
  if (!req.customerProfile) {
    return res.status(403).json({
      success: false,
      error: { code: 'FORBIDDEN', message: 'User is not linked to a customer record' }
    });
  }

  const accounts = getCustomerAccounts(req.customerProfile.id);
  res.json({
    success: true,
    data: accounts
  });
});

/**
 * Get partner banks catalog
 */
router.get('/banks', (req, res) => {
  const banks = all("SELECT * FROM banks_catalog WHERE status = 'ACTIVE' ORDER BY bank_name ASC");
  res.json({
    success: true,
    data: banks
  });
});

/**
 * Get customer cards
 */
router.get('/cards', (req, res) => {
  if (!req.customerProfile) {
    return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'No customer profile' } });
  }

  const cards = all('SELECT * FROM cards WHERE customer_id = ? ORDER BY created_at DESC', [req.customerProfile.id]);
  res.json({
    success: true,
    data: cards
  });
});

/**
 * Toggle card settings (online, international, freeze)
 */
router.post('/cards/toggle', (req, res) => {
  if (!req.customerProfile) {
    return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'No customer profile' } });
  }

  const { cardId, field, value } = req.body;
  const card = get('SELECT * FROM cards WHERE id = ? AND customer_id = ?', [cardId, req.customerProfile.id]);
  if (!card) {
    return res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Card not found' } });
  }

  if (field === 'is_online_enabled') {
    run('UPDATE cards SET is_online_enabled = ? WHERE id = ?', [value ? 1 : 0, cardId]);
  } else if (field === 'is_international_enabled') {
    run('UPDATE cards SET is_international_enabled = ? WHERE id = ?', [value ? 1 : 0, cardId]);
  } else if (field === 'status') {
    const newStatus = value === 'FROZEN' ? 'FROZEN' : 'ACTIVE';
    run('UPDATE cards SET status = ? WHERE id = ?', [newStatus, cardId]);
  } else {
    return res.status(400).json({ success: false, error: { code: 'INVALID_FIELD', message: 'Invalid toggle field' } });
  }

  const updatedCard = get('SELECT * FROM cards WHERE id = ?', [cardId]);
  res.json({
    success: true,
    message: 'Card settings updated successfully',
    data: updatedCard
  });
});

/**
 * Get customer deposits
 */
router.get('/deposits', (req, res) => {
  if (!req.customerProfile) {
    return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'No customer profile' } });
  }

  const deposits = all('SELECT * FROM deposits WHERE customer_id = ? ORDER BY created_at DESC', [req.customerProfile.id]);
  res.json({
    success: true,
    data: deposits
  });
});

/**
 * Open a new deposit
 */
router.post('/deposits', (req, res) => {
  if (!req.customerProfile) {
    return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'No customer profile' } });
  }

  const { accountId, depositType, principalAmount, tenureMonths } = req.body;
  const numPrincipal = parseFloat(principalAmount);
  const numTenure = parseInt(tenureMonths, 10);

  if (!numPrincipal || numPrincipal < 500) {
    return res.status(400).json({ success: false, error: { code: 'INVALID_AMOUNT', message: 'Minimum deposit is $500.00' } });
  }

  if (!numTenure || numTenure < 3) {
    return res.status(400).json({ success: false, error: { code: 'INVALID_TENURE', message: 'Minimum tenure is 3 months' } });
  }

  // Find account
  const account = get('SELECT * FROM account_references WHERE id = ? AND customer_id = ?', [accountId, req.customerProfile.id]);
  if (!account) {
    return res.status(404).json({ success: false, error: { code: 'ACCOUNT_NOT_FOUND', message: 'Account not found' } });
  }

  const interestRate = numTenure >= 24 ? 7.10 : (numTenure >= 12 ? 6.85 : 5.50);
  const maturityAmount = +(numPrincipal * (1 + (interestRate / 100) * (numTenure / 12))).toFixed(2);
  const now = new Date();
  const startDate = now.toISOString().split('T')[0];
  const maturityDateObj = new Date(now);
  maturityDateObj.setMonth(maturityDateObj.getMonth() + numTenure);
  const maturityDate = maturityDateObj.toISOString().split('T')[0];
  const depositId = `dep-${Date.now()}`;

  run(
    `INSERT INTO deposits (id, customer_id, account_id, deposit_type, principal_amount, interest_rate, tenure_months, maturity_amount, start_date, maturity_date, status, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'ACTIVE', ?)`,
    [depositId, req.customerProfile.id, account.id, depositType || 'FIXED_DEPOSIT', numPrincipal, interestRate, numTenure, maturityAmount, startDate, maturityDate, now.toISOString()]
  );

  const newDeposit = get('SELECT * FROM deposits WHERE id = ?', [depositId]);
  res.status(201).json({
    success: true,
    message: 'Deposit account opened successfully',
    data: newDeposit
  });
});

/**
 * Get customer transactions with filtering
 */
router.get('/transactions', (req, res) => {
  if (!req.customerProfile) {
    return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'No customer profile' } });
  }

  const { accountId, search, type, limit = 50, offset = 0 } = req.query;
  const accounts = getCustomerAccounts(req.customerProfile.id);
  const accountIds = accounts.map(a => a.id);

  if (accountIds.length === 0) {
    return res.json({ success: true, data: [] });
  }

  let sql = `SELECT t.*, a.account_number_masked as account_number, a.account_type
             FROM transactions t
             JOIN account_references a ON a.id = t.account_id
             WHERE t.account_id IN (${accountIds.map(() => '?').join(',')})`;
  const params = [...accountIds];

  if (accountId && accountIds.includes(accountId)) {
    sql += ` AND t.account_id = ?`;
    params.push(accountId);
  }

  if (type) {
    sql += ` AND t.transaction_type = ?`;
    params.push(type);
  }

  if (search) {
    sql += ` AND (t.description LIKE ? OR t.recipient_name LIKE ? OR t.reference_number LIKE ?)`;
    const searchParam = `%${search}%`;
    params.push(searchParam, searchParam, searchParam);
  }

  sql += ` ORDER BY t.created_at DESC LIMIT ? OFFSET ?`;
  params.push(parseInt(limit, 10), parseInt(offset, 10));

  const transactions = all(sql, params);
  res.json({
    success: true,
    data: transactions
  });
});

/**
 * Bank Transfer (with simulation / pre-check support)
 */
router.post('/transfer', (req, res) => {
  if (!req.customerProfile) {
    return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'No customer profile' } });
  }

  const {
    accountId,
    sourceAccountId,
    recipientName,
    recipientAccount,
    confirmRecipientAccount,
    ifscCode,
    bankName,
    branchName,
    branchCode,
    amount,
    remarks,
    simulate
  } = req.body;

  const targetAccountId = accountId || sourceAccountId;

  const numAmount = parseFloat(amount);
  if (!numAmount || numAmount <= 0) {
    return res.status(400).json({ success: false, error: { code: 'INVALID_AMOUNT', message: 'Transfer amount must be greater than zero' } });
  }

  if (!recipientName || !recipientAccount) {
    return res.status(400).json({ success: false, error: { code: 'MISSING_PAYEE', message: 'Recipient name and account number are required' } });
  }

  if (confirmRecipientAccount && recipientAccount !== confirmRecipientAccount) {
    return res.status(400).json({ success: false, error: { code: 'ACCOUNT_MISMATCH', message: 'Recipient account number and confirmation do not match' } });
  }

  // Find sender account
  const account = targetAccountId
    ? get('SELECT * FROM account_references WHERE id = ? AND customer_id = ?', [targetAccountId, req.customerProfile.id])
    : get('SELECT * FROM account_references WHERE customer_id = ? LIMIT 1', [req.customerProfile.id]);

  if (!account) {
    return res.status(404).json({ success: false, error: { code: 'ACCOUNT_NOT_FOUND', message: 'Sender account not found' } });
  }

  // Check restriction status
  const activeRestriction = get('SELECT * FROM account_restrictions WHERE account_id = ? AND is_active = 1', [account.id]);
  const isRestricted = account.status === 'RESTRICTED' || !!activeRestriction;

  // Verify recipient status in database / sandbox
  const recipientClean = (recipientAccount || '').trim();
  const recipientLast4 = recipientClean.slice(-4);
  const foundRecipient = get(
    'SELECT * FROM account_references WHERE account_number_masked LIKE ? OR cbs_account_ref = ? LIMIT 1',
    [`%${recipientLast4}`, recipientClean]
  );

  let recipientRestricted = false;
  let recipientRestrictedReason = '';
  if (foundRecipient) {
    const rstRecipient = get('SELECT * FROM account_restrictions WHERE account_id = ? AND is_active = 1 LIMIT 1', [foundRecipient.id]);
    if (foundRecipient.status === 'RESTRICTED' || foundRecipient.status === 'FROZEN' || !!rstRecipient) {
      recipientRestricted = true;
      recipientRestrictedReason = `Recipient account (${foundRecipient.account_number_masked}) is currently under regulatory lock or frozen hold. Inbound transfers are paused.`;
    }
  } else if (
    (recipientName && /locked|blocked|restricted|freeze|fraud/i.test(recipientName)) ||
    (recipientAccount && /locked|blocked|restricted|freeze|fraud/i.test(recipientAccount))
  ) {
    recipientRestricted = true;
    recipientRestrictedReason = 'Recipient status check: Account appears to be flagged or locked. Inbound transfers cannot be completed.';
  }

  // Calculate risk analysis
  let riskScore = 10;
  const warnings = [];

  if (isRestricted) {
    riskScore = 88;
    warnings.push('Sender account is currently under security restriction. Fund transfers are blocked until verification is completed.');
  }

  if (recipientRestricted) {
    riskScore = Math.max(riskScore, 92);
    warnings.push(recipientRestrictedReason);
  }

  if (numAmount > 5000) {
    riskScore += 20;
    warnings.push('High value transaction: verify recipient credentials carefully.');
  }

  if (account.balance < numAmount) {
    warnings.push('Insufficient account balance to cover transfer amount.');
  }

  // Dry-run / Pre-confirmation simulation
  if (simulate) {
    const simData = {
      riskScore,
      riskLevel: riskScore >= 70 ? 'HIGH' : (riskScore >= 30 ? 'MEDIUM' : 'LOW'),
      canProceed: !isRestricted && !recipientRestricted && account.balance >= numAmount,
      warnings,
      details: {
        senderAccount: account.account_number_masked,
        senderBalance: account.balance,
        recipientName,
        recipientAccount,
        bankName: bankName || 'Partner Bank',
        ifscCode: ifscCode || 'REBK0001',
        branchName: branchName || 'Main Branch',
        amount: numAmount,
        estimatedFee: 0.00
      }
    };
    return res.json({
      success: true,
      simulate: true,
      data: simData,
      ...simData
    });
  }

  // Live execution
  if (isRestricted) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'ACCOUNT_RESTRICTED',
        message: 'Your account is temporarily locked for security. Outgoing transfers are paused until you complete Account Recovery.'
      }
    });
  }

  if (recipientRestricted) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'RECIPIENT_RESTRICTED',
        message: recipientRestrictedReason || 'Transfer blocked: The recipient account is restricted or locked. Inbound funds cannot be settled.'
      }
    });
  }

  if (account.balance < numAmount) {
    return res.status(400).json({
      success: false,
      error: { code: 'INSUFFICIENT_FUNDS', message: 'Insufficient balance to complete transfer' }
    });
  }

  // Execute transfer in transaction
  const refNum = `TXN-${Date.now().toString().slice(-8)}`;
  const txnId = `txn-${Date.now()}`;
  const now = new Date().toISOString();

  run('UPDATE account_references SET balance = balance - ?, updated_at = ? WHERE id = ?', [numAmount, now, account.id]);
  run(
    `INSERT INTO transactions (id, account_id, transaction_type, amount, currency, direction, description, recipient_name, recipient_account, reference_number, status, risk_score, created_at)
     VALUES (?, ?, 'TRANSFER', ?, 'USD', 'DEBIT', ?, ?, ?, ?, 'COMPLETED', ?, ?)`,
    [txnId, account.id, numAmount, remarks || `Transfer to ${recipientName}`, recipientName, recipientAccount, refNum, riskScore, now]
  );

  const updatedAccount = get('SELECT * FROM account_references WHERE id = ?', [account.id]);
  const newTxn = get('SELECT * FROM transactions WHERE id = ?', [txnId]);

  res.json({
    success: true,
    message: 'Transfer completed successfully',
    data: {
      transaction: newTxn,
      senderAccount: updatedAccount.account_number_masked,
      newBalance: updatedAccount.balance,
      referenceNumber: refNum
    }
  });
});

/**
 * Scan & Pay
 */
router.post('/scan-pay', (req, res) => {
  if (!req.customerProfile) {
    return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'No customer profile' } });
  }

  const { accountId, recipientCode, amount, notes, simulate } = req.body;
  const numAmount = parseFloat(amount);

  if (!numAmount || numAmount <= 0) {
    return res.status(400).json({ success: false, error: { code: 'INVALID_AMOUNT', message: 'Valid payment amount required' } });
  }

  const account = accountId
    ? get('SELECT * FROM account_references WHERE id = ? AND customer_id = ?', [accountId, req.customerProfile.id])
    : get('SELECT * FROM account_references WHERE customer_id = ? LIMIT 1', [req.customerProfile.id]);

  if (!account) {
    return res.status(404).json({ success: false, error: { code: 'ACCOUNT_NOT_FOUND', message: 'Account not found' } });
  }

  const activeRestriction = get('SELECT * FROM account_restrictions WHERE account_id = ? AND is_active = 1', [account.id]);
  const isRestricted = account.status === 'RESTRICTED' || !!activeRestriction;

  if (simulate) {
    return res.json({
      success: true,
      simulate: true,
      riskScore: isRestricted ? 80 : 12,
      riskLevel: isRestricted ? 'HIGH' : 'LOW',
      canProceed: !isRestricted && account.balance >= numAmount,
      warnings: isRestricted ? ['Account restricted. QR Scan & Pay is paused until verification.'] : []
    });
  }

  if (isRestricted) {
    return res.status(403).json({
      success: false,
      error: { code: 'ACCOUNT_RESTRICTED', message: 'Account is restricted. Scan & Pay is temporarily unavailable.' }
    });
  }

  if (account.balance < numAmount) {
    return res.status(400).json({ success: false, error: { code: 'INSUFFICIENT_FUNDS', message: 'Insufficient funds' } });
  }

  const refNum = `QR-${Date.now().toString().slice(-8)}`;
  const txnId = `txn-${Date.now()}`;
  const now = new Date().toISOString();

  run('UPDATE account_references SET balance = balance - ?, updated_at = ? WHERE id = ?', [numAmount, now, account.id]);
  run(
    `INSERT INTO transactions (id, account_id, transaction_type, amount, currency, direction, description, recipient_name, recipient_account, reference_number, status, risk_score, created_at)
     VALUES (?, ?, 'SCAN_PAY', ?, 'USD', 'DEBIT', ?, ?, ?, ?, 'COMPLETED', 10, ?)`,
    [txnId, account.id, numAmount, notes || `QR Payment to ${recipientCode}`, recipientCode, recipientCode, refNum, now]
  );

  const updatedAccount = get('SELECT * FROM account_references WHERE id = ?', [account.id]);
  res.json({
    success: true,
    message: 'QR Payment successful',
    data: {
      referenceNumber: refNum,
      amount: numAmount,
      recipient: recipientCode,
      newBalance: updatedAccount.balance
    }
  });
});

/**
 * Bill Payments (Electricity, Mobile, DTH/Cable, Internet, Water)
 */
router.post('/bill-pay', (req, res) => {
  if (!req.customerProfile) {
    return res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'No customer profile' } });
  }

  const { accountId, category, billerName, consumerNumber, amount, simulate } = req.body;
  const numAmount = parseFloat(amount);

  if (!numAmount || numAmount <= 0) {
    return res.status(400).json({ success: false, error: { code: 'INVALID_AMOUNT', message: 'Valid bill amount required' } });
  }

  const account = accountId
    ? get('SELECT * FROM account_references WHERE id = ? AND customer_id = ?', [accountId, req.customerProfile.id])
    : get('SELECT * FROM account_references WHERE customer_id = ? LIMIT 1', [req.customerProfile.id]);

  if (!account) {
    return res.status(404).json({ success: false, error: { code: 'ACCOUNT_NOT_FOUND', message: 'Account not found' } });
  }

  const activeRestriction = get('SELECT * FROM account_restrictions WHERE account_id = ? AND is_active = 1', [account.id]);
  const isRestricted = account.status === 'RESTRICTED' || !!activeRestriction;

  if (simulate) {
    return res.json({
      success: true,
      simulate: true,
      riskScore: isRestricted ? 65 : 8,
      riskLevel: isRestricted ? 'HIGH' : 'LOW',
      canProceed: !isRestricted && account.balance >= numAmount,
      warnings: isRestricted ? ['Account restricted. Utility bill payments paused until recovery is approved.'] : []
    });
  }

  if (isRestricted) {
    return res.status(403).json({
      success: false,
      error: { code: 'ACCOUNT_RESTRICTED', message: 'Account is restricted. Utility bill payments paused.' }
    });
  }

  if (account.balance < numAmount) {
    return res.status(400).json({ success: false, error: { code: 'INSUFFICIENT_FUNDS', message: 'Insufficient funds' } });
  }

  const refNum = `BILL-${Date.now().toString().slice(-8)}`;
  const txnId = `txn-${Date.now()}`;
  const now = new Date().toISOString();

  run('UPDATE account_references SET balance = balance - ?, updated_at = ? WHERE id = ?', [numAmount, now, account.id]);
  run(
    `INSERT INTO transactions (id, account_id, transaction_type, amount, currency, direction, description, recipient_name, recipient_account, reference_number, status, risk_score, created_at)
     VALUES (?, ?, 'BILL_PAY', ?, 'USD', 'DEBIT', ?, ?, ?, ?, 'COMPLETED', 5, ?)`,
    [txnId, account.id, numAmount, `${category || 'Utility'} Bill - ${billerName}`, billerName, consumerNumber, refNum, now]
  );

  const updatedAccount = get('SELECT * FROM account_references WHERE id = ?', [account.id]);
  res.json({
    success: true,
    message: 'Bill payment processed successfully',
    data: {
      referenceNumber: refNum,
      billerName,
      consumerNumber,
      amount: numAmount,
      newBalance: updatedAccount.balance
    }
  });
});

/**
 * Get single account details (with IDOR check)
 */
router.get('/accounts/:accountId', requireAccountOwner, (req, res) => {
  const account = get('SELECT * FROM account_references WHERE id = ?', [req.params.accountId]);
  const restriction = get('SELECT * FROM account_restrictions WHERE account_id = ? AND is_active = 1', [req.params.accountId]);

  res.json({
    success: true,
    data: {
      account,
      activeRestriction: restriction ? {
        ...restriction,
        checklist: restriction.resolution_checklist ? JSON.parse(restriction.resolution_checklist) : []
      } : null
    }
  });
});

/**
 * Get restriction diagnostics & recovery eligibility for an account (with IDOR check)
 */
router.get('/restriction/:accountId', requireAccountOwner, (req, res, next) => {
  try {
    const eligibility = evaluateEligibility(req.params.accountId);
    res.json({
      success: true,
      data: eligibility
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
