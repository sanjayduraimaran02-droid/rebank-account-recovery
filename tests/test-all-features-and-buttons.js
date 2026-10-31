const assert = require('assert');
const http = require('http');
const { get, all } = require('../src/db/database');
const { seed } = require('../src/db/seed');

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

function request(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqHeaders = {
      'x-test-runner': 'rebank-internal-audit',
      'x-rebank-test': 'true',
      ...headers
    };
    let reqBody = null;

    if (body) {
      reqBody = typeof body === 'string' ? body : JSON.stringify(body);
      reqHeaders['Content-Type'] = 'application/json';
      reqHeaders['Content-Length'] = Buffer.byteLength(reqBody);
    }

    const req = http.request({
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: reqHeaders
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(data); } catch (e) {}
        resolve({ status: res.statusCode, headers: res.headers, body: json || data });
      });
    });

    req.on('error', reject);
    if (reqBody) req.write(reqBody);
    req.end();
  });
}

async function runFeatureSuite() {
  console.log('====================================================');
  console.log('  REBANK — COMPREHENSIVE 24-FEATURE VERIFICATION SUITE');
  console.log('====================================================\n');

  // Ensure fresh seed
  console.log('[Setup] Ensuring clean database fixtures...');
  await seed();

  let passed = 0;
  let total = 0;

  async function check(name, fn) {
    total++;
    try {
      await fn();
      console.log(`[PASS] (${total}/24) Feature: ${name}`);
      passed++;
    } catch (err) {
      console.error(`[FAIL] (${total}/24) Feature: ${name}`);
      console.error(`       Error: ${err.message}`);
      throw err;
    }
  }

  // 1. Health check & Server Status
  await check('API Health & System Readiness', async () => {
    const res = await request('GET', '/api/health');
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.body.status, 'HEALTHY');
  });

  // 2. Authentication & Demo Role Switching
  let elenaToken = '';
  await check('Customer & Multi-Role Authentication', async () => {
    const login = await request('POST', '/api/auth/login', {
      email: 'elena.rostova@example.com',
      password: 'Customer@123'
    });
    assert.strictEqual(login.status, 200);
    assert.ok(login.body.data?.token);
    elenaToken = login.body.data.token;
  });

  // 3. Feature 1: Dashboard (My Home) & Accounts Display
  let elenaAccountId = '';
  await check('Dashboard — My Home & Account Details', async () => {
    const res = await request('GET', '/api/customer/accounts', null, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.body.data));
    assert.ok(res.body.data.length > 0);
    elenaAccountId = res.body.data[0].id;
    assert.strictEqual(typeof res.body.data[0].balance, 'number');
  });

  // 4. Feature 2: Customer Profile (View & Edit)
  await check('Customer Profile — View & Update with DB Persistence', async () => {
    const getRes = await request('GET', '/api/customer/profile', null, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(getRes.status, 200);
    assert.ok(getRes.body.data?.full_name);

    const updateRes = await request('PUT', '/api/customer/profile', {
      fullName: 'Elena Rostova Updated',
      phone: '+1 (555) 234-9999',
      address: '742 Evergreen Terrace, Suite 101'
    }, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(updateRes.status, 200);

    const dbCheck = get('SELECT full_name, phone FROM users WHERE id = ?', ['usr-customer-1002']);
    assert.strictEqual(dbCheck.full_name, 'Elena Rostova Updated');
  });

  // 5. Feature 3: Register Bank Account (17 Fields & Validation)
  await check('Register Bank Account — 17 Fields, Validation & Persistence', async () => {
    // Missing fields validation
    const invalidRes = await request('POST', '/api/customer/accounts', {
      accountHolderName: ''
    }, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(invalidRes.status, 400);

    // Valid 17-field registration
    const validRes = await request('POST', '/api/customer/accounts', {
      accountHolderName: 'Elena Rostova',
      branchName: 'Main International Branch',
      city: 'Metropolis',
      state: 'New York',
      country: 'United States',
      bankAccountNumber: '987654321098',
      confirmAccountNumber: '987654321098',
      phoneNumber: '+1 (555) 234-9999',
      email: 'elena.rostova@example.com',
      bankName: 'ReBank Commercial US',
      accountType: 'CHECKING',
      postalCode: '10001',
      residentialAddress: '742 Evergreen Terrace',
      dateOfBirth: '1992-05-14',
      branchCode: 'BR-US-01',
      termsAccepted: true
    }, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(validRes.status, 201);
    assert.strictEqual(validRes.body.data?.status, 'RESTRICTED');

    // Duplicate rejection
    const dupRes = await request('POST', '/api/customer/accounts', {
      accountHolderName: 'Elena Rostova',
      branchName: 'Main International Branch',
      city: 'Metropolis',
      state: 'New York',
      country: 'United States',
      bankAccountNumber: '987654321098',
      confirmAccountNumber: '987654321098',
      phoneNumber: '+1 (555) 234-9999',
      email: 'elena.rostova@example.com',
      bankName: 'ReBank Commercial US',
      accountType: 'CHECKING',
      postalCode: '10001',
      termsAccepted: true
    }, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(dupRes.status, 409);
  });

  // 6. Feature 4: All Accounts
  await check('All Accounts — Retrieval & Balance Verification', async () => {
    const res = await request('GET', '/api/customer/accounts', null, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(res.status, 200);
    assert.ok(res.body.data.length >= 2);
  });

  // 7. Feature 5: All Banks (Partner Network)
  await check('All Banks — Institutional Clearing Catalog', async () => {
    const res = await request('GET', '/api/customer/banks', null, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(res.status, 200);
    assert.ok(Array.isArray(res.body.data));
    assert.ok(res.body.data.length >= 5);
  });

  // 8. Feature 6: Bank Transfer & Hold Enforcement
  await check('Bank Transfer — Safety Interception on Restricted Account', async () => {
    const transferRes = await request('POST', '/api/customer/transfer', {
      accountId: elenaAccountId,
      recipientName: 'Robert Vance',
      recipientAccount: '998877665544',
      amount: 450.00,
      simulate: false
    }, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(transferRes.status, 403);
    assert.strictEqual(transferRes.body.error?.code, 'ACCOUNT_RESTRICTED');
  });

  // 9. Feature 7: Simulate Transfer (Risk Analysis & Warnings)
  await check('Simulate Transfer — Real-Time Telemetry & Risk Scoring', async () => {
    const simRes = await request('POST', '/api/customer/transfer', {
      accountId: elenaAccountId,
      recipientName: 'Robert Vance',
      recipientAccount: '998877665544',
      amount: 450.00,
      simulate: true
    }, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(simRes.status, 200);
    assert.ok(simRes.body.data.riskScore !== undefined);
    assert.ok(Array.isArray(simRes.body.data.warnings));
  });

  // 10. Feature 8: Bill Payments (Electricity, Mobile, DTH, Water, Internet)
  await check('Bill Payments — Restricted Account Guardrail & Validation', async () => {
    const billRes = await request('POST', '/api/customer/bill-pay', {
      accountId: elenaAccountId,
      billerName: 'PowerGrid Corp',
      category: 'Electricity',
      consumerNumber: 'ELEC-90210',
      amount: 125.50
    }, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(billRes.status, 403);
    assert.strictEqual(billRes.body.error?.code, 'ACCOUNT_RESTRICTED');
  });

  // 11. Feature 9: Bank Deposits (Term Deposits & Calculator)
  await check('Bank Deposits — View Term Deposits & Open New Deposit', async () => {
    const listRes = await request('GET', '/api/customer/deposits', null, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(listRes.status, 200);
    assert.ok(Array.isArray(listRes.body.data));

    const createRes = await request('POST', '/api/customer/deposits', {
      accountId: elenaAccountId,
      depositType: 'FIXED_DEPOSIT',
      principalAmount: 5000,
      tenureMonths: 12
    }, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(createRes.status, 201);
    assert.strictEqual(createRes.body.data?.status, 'ACTIVE');
  });

  // 12. Feature 10: Cards (Display, Controls & Freeze Toggle)
  await check('Cards — Controls, Online & Freeze Status Toggle', async () => {
    const cardsRes = await request('GET', '/api/customer/cards', null, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(cardsRes.status, 200);
    assert.ok(Array.isArray(cardsRes.body.data));
    assert.ok(cardsRes.body.data.length > 0);
    const cardId = cardsRes.body.data[0].id;

    // Toggle card freeze status
    const toggleRes = await request('POST', '/api/customer/cards/toggle', {
      cardId,
      field: 'status',
      value: 'FROZEN'
    }, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(toggleRes.status, 200);

    const dbCard = get('SELECT status FROM cards WHERE id = ?', [cardId]);
    assert.strictEqual(dbCard.status, 'FROZEN');
  });

  // 13. Feature 11: Account Statement (History, Search, Filters & CSV)
  await check('Account Statement — Transaction History & Query Filters', async () => {
    const stmtRes = await request('GET', '/api/customer/transactions', null, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(stmtRes.status, 200);
    assert.ok(Array.isArray(stmtRes.body.data));
    assert.ok(stmtRes.body.data.length > 0);

    // Test search filter
    const searchRes = await request('GET', '/api/customer/transactions?search=Direct', null, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(searchRes.status, 200);
  });

  // 14. Feature 12: Scan & Pay (QR Point-of-Sale Settlement)
  await check('Scan & Pay — QR Settlement & Restricted Guardrail', async () => {
    const qrRes = await request('POST', '/api/customer/scan-pay', {
      recipientCode: 'UPI-ARTISAN@REBK',
      amount: 24.80,
      notes: 'Cafe Espresso Table 4'
    }, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(qrRes.status, 403);
    assert.strictEqual(qrRes.body.error?.code, 'ACCOUNT_RESTRICTED');
  });

  // 15. Feature 13: Pay Anyone (P2P Wire Transfer Flow)
  await check('Pay Anyone — P2P Beneficiary Transfer Validation', async () => {
    const p2pRes = await request('POST', '/api/customer/transfer', {
      accountId: elenaAccountId,
      recipientName: 'Alice Smith',
      recipientAccount: '1122334455',
      amount: 50.00,
      simulate: false
    }, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(p2pRes.status, 403);
  });

  // 16. Feature 14: DTH / Cable Payments
  await check('DTH / Cable — Specialized Biller Settlement', async () => {
    const dthRes = await request('POST', '/api/customer/bill-pay', {
      accountId: elenaAccountId,
      billerName: 'DishTV HD Satellite',
      category: 'DTH',
      consumerNumber: 'DTH-SUBSCRIBER-1029',
      amount: 45.00
    }, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(dthRes.status, 403);
  });

  // 17. Feature 15: Recovery Hub (Diagnosis, 4-Stage Workflow & IDOR)
  await check('Recovery Hub — Restriction Diagnosis & Ticket Lifecycle', async () => {
    const diagRes = await request('GET', `/api/customer/restriction/${elenaAccountId}`, null, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(diagRes.status, 200);
    assert.strictEqual(diagRes.body.data?.hasRestriction, true);
    const restrictionId = diagRes.body.data?.restrictionId;

    const submitRes = await request('POST', '/api/recovery/submit', {
      accountId: elenaAccountId,
      restrictionId,
      categoryCode: 'KYC_PERIODIC_REFRESH',
      customerExplanation: 'Uploaded updated passport and biometric selfie.',
      contactConfirmed: true,
      consentSigned: true
    }, { Authorization: `Bearer ${elenaToken}` });
    if (submitRes.status !== 201) console.log('submitRes error:', submitRes.body);
    assert.strictEqual(submitRes.status, 201);
    assert.ok(submitRes.body.data?.reference_number || submitRes.body.data?.referenceNumber);

    const myReqs = await request('GET', '/api/recovery/my-requests', null, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(myReqs.status, 200);
    assert.ok(myReqs.body.data.length > 0);
  });

  // 18. Feature 16: AI Assistant (Context-Aware Multi-Language Chatbot)
  await check('AI Assistant — Suggested Questions & Trilingual Replies', async () => {
    const qRes = await request('GET', '/api/chat/suggested-questions?language=en');
    assert.strictEqual(qRes.status, 200);
    assert.ok(qRes.body.data?.questions.length > 0);

    const msgRes = await request('POST', '/api/chat/message', {
      message: 'Why is my account locked?',
      language: 'en'
    }, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(msgRes.status, 200);
    assert.ok(msgRes.body.data?.reply);
    assert.strictEqual(msgRes.body.data.reply.includes('password'), false); // No credential leak
  });

  // 19. Feature 17: Contact Care / Help Center & Grievances
  await check('Contact Care / Help Center — Grievance Submission & Escalation', async () => {
    const fileRes = await request('POST', '/api/complaints', {
      subject: 'Inquiry on KYC Turnaround Time',
      category: 'ACCOUNT_RESTRICTION',
      description: 'Submitted documents 2 hours ago. Awaiting L2 signoff.'
    }, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(fileRes.status, 201);
    const complaintId = fileRes.body.data?.id;
    assert.ok(complaintId);

    const myComp = await request('GET', '/api/complaints/my', null, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(myComp.status, 200);
    assert.ok(myComp.body.data.some(c => c.id === complaintId));
  });

  // 20. Feature 18: Privacy & Consents (GDPR / ISO 27001 Preferences)
  await check('Privacy & Consents — Consent Catalog & Preference Persistence', async () => {
    const consentsRes = await request('GET', '/api/privacy/consents', null, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(consentsRes.status, 200);
    assert.ok(consentsRes.body.data?.length > 0);

    const updateConsent = await request('POST', '/api/privacy/consents', {
      consentType: 'CREDIT_BUREAU_INQUIRY',
      granted: true
    }, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(updateConsent.status, 201);

    const dbConsent = get('SELECT granted FROM customer_consents WHERE consent_type = ?', ['CREDIT_BUREAU_INQUIRY']);
    assert.strictEqual(dbConsent.granted, 1);
  });

  // 21. Feature 19: Notifications (Security Alerts & Mark All Read)
  await check('Notifications — Retrieval & Read-All Mutation', async () => {
    const notifRes = await request('GET', '/api/notifications', null, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(notifRes.status, 200);
    assert.ok(Array.isArray(notifRes.body.data));

    const markRes = await request('POST', '/api/notifications/read-all', null, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(markRes.status, 200);
  });

  // 22. Feature 20 & 21: Trilingual Localization & Mobile View Mode
  await check('Trilingual Localization & Mobile Viewport Mode', async () => {
    const fs = require('fs');
    const html = fs.readFileSync('public/index.html', 'utf8');
    const appJs = fs.readFileSync('public/app.js', 'utf8');

    // Verify language switcher buttons exist
    assert.ok(html.includes('data-lang="ta"'));
    assert.ok(html.includes('data-lang="en"'));
    assert.ok(html.includes('data-lang="hi"'));

    // Verify mobile toggle button and smartphone frame exist
    assert.ok(html.includes('id="mobileToggleBtn"'));
    assert.ok(html.includes('id="phoneFrame"'));
    assert.ok(appJs.includes('mobileToggleBtn'));
    assert.ok(appJs.includes('isMobileMode'));
  });

  // 23. Feature 22 & 23: Staff Multi-Role Workflows & Logout
  await check('Staff Workflows (Maker-Checker RBAC, Fraud Center) & Logout', async () => {
    // Reviewer login
    const revLogin = await request('POST', '/api/auth/login', {
      email: 'reviewer@rebank.internal',
      password: 'Reviewer@123'
    });
    assert.strictEqual(revLogin.status, 200);
    const revToken = revLogin.body.data.token;

    // Reviewer queue
    const queue = await request('GET', '/api/admin/queue/reviewer', null, { Authorization: `Bearer ${revToken}` });
    assert.strictEqual(queue.status, 200);

    // Approver login
    const appLogin = await request('POST', '/api/auth/login', {
      email: 'approver@rebank.internal',
      password: 'Approver@123'
    });
    assert.strictEqual(appLogin.status, 200);
    const appToken = appLogin.body.data.token;

    // Approver queue
    const appQueue = await request('GET', '/api/admin/queue/approver', null, { Authorization: `Bearer ${appToken}` });
    assert.strictEqual(appQueue.status, 200);

    // Fraud Analyst login
    const faLogin = await request('POST', '/api/auth/login', {
      email: 'fraud.analyst@rebank.internal',
      password: 'Analyst@123'
    });
    assert.strictEqual(faLogin.status, 200);
    const faToken = faLogin.body.data.token;

    const faAlerts = await request('GET', '/api/fraud/alerts', null, { Authorization: `Bearer ${faToken}` });
    assert.strictEqual(faAlerts.status, 200);

    // RBAC customer block check
    const rbacBlock = await request('GET', '/api/admin/queue/reviewer', null, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(rbacBlock.status, 403);
  });

  // 24. Feature 24: Real Bank Account Lock Reasons & Resolution Encyclopedia
  await check('Bank Account Lock Reasons & Resolution Encyclopedia — Public & Customer Endpoints, UI & Trilingual Guides', async () => {
    // 1. Public API Endpoint
    const publicRes = await request('GET', '/api/lock-reasons');
    assert.strictEqual(publicRes.status, 200);
    assert.ok(Array.isArray(publicRes.body.data));
    assert.strictEqual(publicRes.body.data.length, 8);

    const codes = publicRes.body.data.map(r => r.code);
    assert.ok(codes.includes('KYC_EXPIRED'));
    assert.ok(codes.includes('DORMANT_INACTIVE'));
    assert.ok(codes.includes('AML_SUSPICIOUS_TXN'));
    assert.ok(codes.includes('SECURITY_COMPROMISED'));
    assert.ok(codes.includes('CYBER_POLICE_FREEZE'));
    assert.ok(codes.includes('COURT_ATTACHMENT_LIEN'));
    assert.ok(codes.includes('OVERDRAFT_LIEN_HOLD'));
    assert.ok(codes.includes('EMERGENCY_PANIC_LOCK'));

    // Check mandatory fields on each lock reason
    for (const r of publicRes.body.data) {
      assert.ok(r.code);
      assert.ok(r.title);
      assert.ok(r.titleTa, `Missing titleTa for ${r.code}`);
      assert.ok(r.titleHi, `Missing titleHi for ${r.code}`);
      assert.ok(r.regulatoryMandate, `Missing regulatoryMandate for ${r.code}`);
      assert.ok(r.operationsMatrix);
      assert.strictEqual(typeof r.operationsMatrix.debitsAllowed, 'boolean');
      assert.strictEqual(typeof r.operationsMatrix.creditsAllowed, 'boolean');
      assert.ok(Array.isArray(r.remediationSteps));
      assert.ok(r.remediationSteps.length > 0);
      assert.ok(Array.isArray(r.requiredDocuments));
      assert.ok(typeof r.slaHours === 'number');
    }

    // 2. Authenticated Customer Endpoint
    const custRes = await request('GET', '/api/customer/lock-reasons', null, { Authorization: `Bearer ${elenaToken}` });
    assert.strictEqual(custRes.status, 200);
    assert.strictEqual(custRes.body.data.length, 8);

    // 3. Frontend Architecture & DOM Bindings
    const fs = require('fs');
    const html = fs.readFileSync('public/index.html', 'utf8');
    const appJs = fs.readFileSync('public/app.js', 'utf8');

    assert.ok(html.includes('id="viewLockReasons"'), 'Missing viewLockReasons');
    assert.ok(html.includes('id="navItemLockReasons"'), 'Missing navItemLockReasons');
    assert.ok(html.includes('id="actionLockReasons"'), 'Missing actionLockReasons');
    assert.ok(html.includes('id="lockReasonsGrid"'), 'Missing lockReasonsGrid');
    assert.ok(html.includes('id="lockReasonsSearchInput"'), 'Missing lockReasonsSearchInput');
    assert.ok(html.includes('id="diagnosticSymptomSelect"'), 'Missing diagnosticSymptomSelect');
    assert.ok(html.includes('id="authLockGuideBanner"'), 'Missing authLockGuideBanner');
    assert.ok(html.includes('id="openPublicLockReasonsBtn"'), 'Missing openPublicLockReasonsBtn');

    assert.ok(appJs.includes('loadLockReasonsView'), 'Missing loadLockReasonsView in app.js');
    assert.ok(appJs.includes('initLockReasons'), 'Missing initLockReasons in app.js');
    assert.ok(appJs.includes('startUnlockForReason'), 'Missing startUnlockForReason in app.js');
    assert.ok(appJs.includes('openPublicLockReasons'), 'Missing openPublicLockReasons in app.js');
  });

  console.log('\n====================================================');
  console.log(`  ALL ${passed} OF ${total} FEATURES VERIFIED & PASSING!`);
  console.log('====================================================\n');
}

runFeatureSuite().catch(err => {
  console.error('\nSuite failure:', err);
  process.exit(1);
});
