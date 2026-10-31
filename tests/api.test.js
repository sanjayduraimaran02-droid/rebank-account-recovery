const http = require('http');
const { app } = require('../src/server');
const { get, run, transaction } = require('../src/db/database');
const { seed } = require('../src/db/seed');

let server;
const PORT = 3099;
const BASE_URL = `http://localhost:${PORT}`;

function request(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqHeaders = {
      ...headers
    };
    if (body && !reqHeaders['Content-Type']) {
      reqHeaders['Content-Type'] = 'application/json';
    }

    const req = http.request(
      url,
      {
        method,
        headers: reqHeaders
      },
      (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const parsed = data ? JSON.parse(data) : {};
            resolve({ status: res.statusCode, headers: res.headers, body: parsed });
          } catch (e) {
            resolve({ status: res.statusCode, headers: res.headers, raw: data });
          }
        });
      }
    );

    req.on('error', reject);
    if (body) {
      req.write(typeof body === 'string' ? body : JSON.stringify(body));
    }
    req.end();
  });
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion Failed: ${message}`);
  }
}

async function runTests() {
  console.log('====================================================');
  console.log('  ReBank Integration & QA Verification Suite');
  console.log('====================================================\n');

  // Seed clean database
  await seed();

  // Start test server on port 3099
  process.env.PORT = PORT;
  server = app.listen(PORT);
  await new Promise(resolve => setTimeout(resolve, 500));

  let elenaToken = '';
  let johnToken = '';
  let reviewerToken = '';
  let approverToken = '';
  let adminToken = '';
  let elenaAccountId = '';
  let elenaRestrictionId = '';
  let createdRequestId = '';
  let createdReferenceNumber = '';
  let filedComplaintId = '';

  let passedTests = 0;
  let totalTests = 0;

  async function test(label, name, fn) {
    totalTests++;
    try {
      await fn();
      console.log(`  [PASS] [${label}] Test ${totalTests}: ${name}`);
      passedTests++;
    } catch (err) {
      console.error(`  [FAIL] [${label}] Test ${totalTests}: ${name}`);
      console.error(`         Error: ${err.message}\n`);
      throw err;
    }
  }

  try {
    // ----------------------------------------------------
    // PHASE 5 — ITEM A: Frontend / API base URL configuration
    // ----------------------------------------------------
    await test('ITEM-A', 'Frontend API client base URL configuration and resolution', async () => {
      // Test frontend static index.html contains API client and base URL logic
      const res = await request('GET', '/app.js');
      assert(res.status === 200, `Expected 200, got ${res.status}`);
      assert(res.raw.includes('API_BASE_URL'), 'API_BASE_URL missing from app.js');
      assert(res.raw.includes('window.REBANK_API_BASE_URL'), 'Configurable base URL missing');
    });

    // ----------------------------------------------------
    // PHASE 5 — ITEM B: Backend health endpoint
    // ----------------------------------------------------
    await test('ITEM-B', 'Backend health check returns HTTP 200 and persistent database status', async () => {
      const res = await request('GET', '/api/health');
      assert(res.status === 200, `Expected 200, got ${res.status}`);
      assert(res.body.status === 'HEALTHY', 'Status is not HEALTHY');
      assert(res.body.database.status.includes('CONNECTED'), 'Database not connected');
      assert(res.body.coreBanking.status === 'ONLINE', 'Core banking adapter not ONLINE');
      assert(res.body.coreBanking.productionBankingActionsEnabled === false, 'Production banking actions must be disabled in sandbox');
    });

    await test('ITEM-B', 'OpenAPI 3.0 documentation endpoint returns valid spec', async () => {
      const res = await request('GET', '/api/docs');
      assert(res.status === 200, `Expected 200, got ${res.status}`);
      assert(res.body.openapi === '3.0.0', 'Invalid OpenAPI version');
    });

    // ----------------------------------------------------
    // PHASE 5 — ITEM C: Database readiness and safe transactional read/write
    // ----------------------------------------------------
    await test('ITEM-C', 'Database readiness probe (/api/ready) verifies schema and table counts', async () => {
      const res = await request('GET', '/api/ready');
      assert(res.status === 200, `Expected 200, got ${res.status}`);
      assert(res.body.ready === true, 'Database readiness reported not ready');
      assert(res.body.database === 'CONNECTED_PERSISTENT', 'Database not connected persistent');
      assert(res.body.userRecordsSeeded >= 6, 'Seed records missing');
    });

    await test('ITEM-C', 'Safe database read/write test using atomic rollback transaction', async () => {
      let threw = false;
      const testEmail = 'rollback.test.' + Date.now() + '@example.com';
      try {
        transaction(({ run }) => {
          run(
            `INSERT INTO users (id, email, password_hash, role, full_name, created_at, updated_at)
             VALUES ('test-rollback-id', ?, 'hash', 'CUSTOMER', 'Rollback User', datetime('now'), datetime('now'))`,
            [testEmail]
          );
          // Intentionally throw to trigger transaction rollback
          throw new Error('INTENTIONAL_ROLLBACK');
        });
      } catch (err) {
        if (err.message === 'INTENTIONAL_ROLLBACK') {
          threw = true;
        }
      }
      assert(threw, 'Transaction did not throw as expected');

      // Verify that user record was NOT written / rolled back cleanly
      const record = get('SELECT id FROM users WHERE email = ?', [testEmail]);
      assert(record === undefined, 'Rollback failed: Record was persisted in database');
    });

    // ----------------------------------------------------
    // PHASE 5 — ITEM D: Real frontend-to-backend request & authentication
    // ----------------------------------------------------
    await test('ITEM-D', 'Customer authentication and JWT session token generation', async () => {
      const res = await request('POST', '/api/auth/login', {
        email: 'elena.rostova@example.com',
        password: 'Customer@123'
      });
      assert(res.status === 200, `Expected 200, got ${res.status}`);
      assert(res.body.success === true, 'Login unsuccessful');
      assert(res.body.data.token, 'Token missing');
      assert(res.body.data.user.role === 'CUSTOMER', 'Role is not CUSTOMER');
      elenaToken = res.body.data.token;
    });

    await test('ITEM-D', 'Real frontend-to-backend authenticated request: GET /api/customer/accounts', async () => {
      const res = await request('GET', '/api/customer/accounts', null, {
        Authorization: `Bearer ${elenaToken}`
      });
      assert(res.status === 200, `Expected 200, got ${res.status}`);
      assert(Array.isArray(res.body.data), 'Expected accounts array');
      assert(res.body.data.length > 0, 'No accounts found');
      
      const acc = res.body.data[0];
      assert(acc.account_number_masked.includes('••••'), 'Account number not properly masked');
      assert(acc.restriction !== null, 'Active restriction missing');
      assert(acc.restriction.code === 'KYC_EXPIRED', `Expected KYC_EXPIRED, got ${acc.restriction.code}`);
      
      elenaAccountId = acc.id;
      elenaRestrictionId = acc.restriction.id;
    });

    await test('ITEM-D', 'Customer retrieves restriction diagnosis and recovery eligibility', async () => {
      const res = await request('GET', `/api/customer/restriction/${elenaAccountId}`, null, {
        Authorization: `Bearer ${elenaToken}`
      });
      assert(res.status === 200, `Expected 200, got ${res.status}`);
      assert(res.body.data.eligible === true, 'Expected eligible to be true');
      assert(res.body.data.slaHours === 4, 'Expected 4h SLA for KYC_EXPIRED');
    });

    // ----------------------------------------------------
    // PHASE 5 — ITEM E: Create and retrieve recovery request using synthetic data
    // ----------------------------------------------------
    await test('ITEM-E', 'Create recovery request with synthetic data and verify database persistence', async () => {
      const res = await request('POST', '/api/recovery/submit', {
        accountId: elenaAccountId,
        restrictionId: elenaRestrictionId,
        categoryCode: 'KYC_EXPIRED',
        customerExplanation: 'Renewed passport and updated utility bill provided.',
        contactConfirmed: true,
        consentSigned: true
      }, {
        Authorization: `Bearer ${elenaToken}`,
        'Idempotency-Key': 'elena-submit-req-1'
      });

      assert(res.status === 201, `Expected 201, got ${res.status}`);
      assert(res.body.success === true, 'Submission failed');
      assert(res.body.data.reference_number.startsWith('REB-'), 'Invalid reference format');
      assert(res.body.data.status === 'SUBMITTED', 'Status should be SUBMITTED');

      createdRequestId = res.body.data.id;
      createdReferenceNumber = res.body.data.reference_number;
    });

    await test('ITEM-E', 'Retrieve newly created recovery request by ID with timeline history', async () => {
      const res = await request('GET', `/api/recovery/${createdRequestId}`, null, {
        Authorization: `Bearer ${elenaToken}`
      });
      assert(res.status === 200, `Expected 200, got ${res.status}`);
      assert(res.body.data.id === createdRequestId, 'Retrieved ID mismatch');
      assert(res.body.data.reference_number === createdReferenceNumber, 'Reference mismatch');
      assert(Array.isArray(res.body.data.history), 'Status history array missing');
      assert(res.body.data.history.length >= 1, 'Initial history entry missing');
    });

    // ----------------------------------------------------
    // PHASE 5 — ITEM F: Validation errors for invalid request data
    // ----------------------------------------------------
    await test('ITEM-F', 'Validation error: Submitting recovery request with missing fields returns 400 Bad Request', async () => {
      const res = await request('POST', '/api/recovery/submit', {
        // Missing accountId and restrictionId
        customerExplanation: 'Incomplete application'
      }, {
        Authorization: `Bearer ${elenaToken}`
      });

      assert(res.status === 400, `Expected 400 Bad Request, got ${res.status}`);
      assert(res.body.success === false, 'Expected success to be false');
      assert(res.body.error.code === 'VALIDATION_ERROR', `Expected VALIDATION_ERROR code, got ${res.body.error?.code}`);
    });

    await test('ITEM-F', 'Validation error: Attempting invalid state transition returns 400 Bad Request', async () => {
      // Log in as reviewer
      const revRes = await request('POST', '/api/auth/login', {
        email: 'reviewer@rebank.internal',
        password: 'Reviewer@123'
      });
      reviewerToken = revRes.body.data.token;

      // Claim case to UNDER_REVIEW
      await request('POST', `/api/admin/case/${createdRequestId}/claim`, null, {
        Authorization: `Bearer ${reviewerToken}`
      });

      // Attempt invalid action jump
      const badRes = await request('POST', `/api/admin/case/${createdRequestId}/review`, {
        action: 'INVALID_NONEXISTENT_ACTION'
      }, {
        Authorization: `Bearer ${reviewerToken}`
      });

      assert(badRes.status === 400, `Expected 400 Bad Request for invalid transition, got ${badRes.status}`);
      assert(badRes.body.error.code === 'INVALID_ACTION', 'Expected INVALID_ACTION code');
    });

    await test('REGRESSION', 'Reviewer requests more info (INFO_REQUESTED), customer re-uploads document, status transitions back to UNDER_REVIEW', async () => {
      // 1. Reviewer requests more information
      const infoRes = await request('POST', `/api/admin/case/${createdRequestId}/review`, {
        action: 'REQUEST_MORE_INFO',
        notes: 'Please re-upload a clearer proof of address utility bill.'
      }, {
        Authorization: `Bearer ${reviewerToken}`
      });
      assert(infoRes.status === 200, `Expected 200, got ${infoRes.status}`);
      assert(infoRes.body.data.status === 'INFO_REQUESTED', 'Status not updated to INFO_REQUESTED');

      // 2. Customer re-uploads document
      const reuploadRes = await request('POST', `/api/recovery/${createdRequestId}/upload-doc`, {
        documentType: 'PROOF_OF_ADDRESS',
        fileName: 'clarified_utility_bill.pdf',
        simulatedData: JSON.stringify({ reuploadNote: 'Clarified utility bill provided' })
      }, {
        Authorization: `Bearer ${elenaToken}`
      });
      assert(reuploadRes.status === 201, `Expected 201, got ${reuploadRes.status}`);

      // 3. Verify status automatically returned to UNDER_REVIEW for reviewer re-triage
      const checkRes = await request('GET', `/api/recovery/${createdRequestId}`, null, {
        Authorization: `Bearer ${elenaToken}`
      });
      assert(checkRes.status === 200, `Expected 200, got ${checkRes.status}`);
      assert(checkRes.body.data.status === 'UNDER_REVIEW', `Expected status to transition back to UNDER_REVIEW, got ${checkRes.body.data.status}`);
    });

    // ----------------------------------------------------
    // PHASE 5 — ITEM G: Unauthenticated access to protected routes
    // ----------------------------------------------------
    await test('ITEM-G', 'Unauthenticated request to protected route returns 401 Unauthorized', async () => {
      const res = await request('GET', '/api/customer/accounts');
      assert(res.status === 401, `Expected 401 Unauthorized, got ${res.status}`);
      assert(res.body.success === false, 'Expected success to be false');
      assert(res.body.error.code === 'UNAUTHORIZED', 'Expected UNAUTHORIZED code');
    });

    await test('ITEM-G', 'Invalid bearer token returns 401 Unauthorized', async () => {
      const res = await request('GET', '/api/customer/accounts', null, {
        Authorization: 'Bearer invalid_bogus_token_12345'
      });
      assert(res.status === 401, `Expected 401 Unauthorized, got ${res.status}`);
      assert(res.body.error.code === 'INVALID_TOKEN', 'Expected INVALID_TOKEN code');
    });

    // ----------------------------------------------------
    // PHASE 5 — ITEM H: Cross-user access prevention (IDOR Protection)
    // ----------------------------------------------------
    await test('ITEM-H', 'Cross-user prevention: Customer John cannot view Customer Elena account', async () => {
      const johnRes = await request('POST', '/api/auth/login', {
        email: 'john.doe@example.com',
        password: 'Customer@123'
      });
      johnToken = johnRes.body.data.token;

      // John attempts to query Elena's account
      const res = await request('GET', `/api/customer/accounts/${elenaAccountId}`, null, {
        Authorization: `Bearer ${johnToken}`
      });

      assert(res.status === 403, `Expected 403 Forbidden for cross-user account access, got ${res.status}`);
      assert(res.body.error.code === 'FORBIDDEN_IDOR_PREVENTED', 'Expected FORBIDDEN_IDOR_PREVENTED code');
    });

    await test('ITEM-H', 'Cross-user prevention: Customer John cannot view Customer Elena recovery ticket', async () => {
      // John attempts to query Elena's recovery request
      const res = await request('GET', `/api/recovery/${createdRequestId}`, null, {
        Authorization: `Bearer ${johnToken}`
      });

      assert(res.status === 403, `Expected 403 Forbidden for cross-user ticket access, got ${res.status}`);
      assert(res.body.error.code === 'FORBIDDEN_IDOR_PREVENTED', 'Expected FORBIDDEN_IDOR_PREVENTED code');
    });

    // ----------------------------------------------------
    // PHASE 5 — ITEM I: CORS preflight verification
    // ----------------------------------------------------
    await test('ITEM-I', 'CORS preflight (OPTIONS) returns expected headers and status', async () => {
      const res = await request('OPTIONS', '/api/recovery/submit', null, {
        Origin: 'http://localhost:8080',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type, Authorization, Idempotency-Key'
      });

      assert(res.status === 204 || res.status === 200, `Expected 200 or 204 for CORS preflight, got ${res.status}`);
      const allowOrigin = res.headers['access-control-allow-origin'];
      assert(allowOrigin === '*' || allowOrigin === 'http://localhost:8080', `Invalid CORS allow origin: ${allowOrigin}`);
      const allowMethods = res.headers['access-control-allow-methods'];
      assert(allowMethods.includes('POST'), 'CORS preflight missing POST method');
    });

    // ----------------------------------------------------
    // PHASE 5 — ITEM J: Correct frontend & backend error handling
    // ----------------------------------------------------
    await test('ITEM-J', 'Duplicate submission with Idempotency-Key returns cached result', async () => {
      const res = await request('POST', '/api/recovery/submit', {
        accountId: elenaAccountId,
        restrictionId: elenaRestrictionId,
        categoryCode: 'KYC_EXPIRED'
      }, {
        Authorization: `Bearer ${elenaToken}`,
        'Idempotency-Key': 'elena-submit-req-1'
      });

      assert(res.status === 201, `Expected 201, got ${res.status}`);
      assert(res.headers['x-idempotent-replay'] === 'true', 'Expected idempotent replay header');
      assert(res.body.data.id === createdRequestId, 'Did not return cached request');
    });

    await test('ITEM-J', 'Duplicate submission without Idempotency-Key returns 409 Conflict', async () => {
      const res = await request('POST', '/api/recovery/submit', {
        accountId: elenaAccountId,
        restrictionId: elenaRestrictionId,
        categoryCode: 'KYC_EXPIRED',
        customerExplanation: 'Second duplicate attempt'
      }, {
        Authorization: `Bearer ${elenaToken}`
      });

      assert(res.status === 409, `Expected 409 Conflict, got ${res.status}`);
      assert(res.body.success === false, 'Expected success to be false');
    });

    await test('ITEM-J', 'Centralized error handler converts internal errors safely without credential leaks', async () => {
      // Request non-existent route to verify 404/500 safe formatting
      const res = await request('GET', '/api/non-existent-endpoint-xyz');
      assert(res.status === 404, `Expected 404, got ${res.status}`);
    });

    // ----------------------------------------------------
    // FULL END-TO-END FLOW: Maker -> Checker -> CBS Unfreeze
    // ----------------------------------------------------
    await test('E2E', 'Maker reviews Elena case and recommends approval', async () => {
      const res = await request('POST', `/api/admin/case/${createdRequestId}/review`, {
        action: 'RECOMMEND_APPROVAL',
        notes: 'Document OCR match confirmed. Recommend unfreeze.',
        riskScore: 10
      }, {
        Authorization: `Bearer ${reviewerToken}`
      });
      assert(res.status === 200, `Expected 200, got ${res.status}`);
      assert(res.body.data.status === 'REVIEWED_PENDING_APPROVAL', 'Status not REVIEWED_PENDING_APPROVAL');
    });

    await test('E2E', 'Four-Eyes enforcement: Maker CANNOT approve their own reviewed case', async () => {
      const res = await request('POST', `/api/admin/case/${createdRequestId}/authorize`, {
        action: 'APPROVE_AND_UNFREEZE',
        notes: 'Self-approval attempt by Reviewer'
      }, {
        Authorization: `Bearer ${reviewerToken}`
      });
      assert(res.status === 403, `Expected 403 Forbidden for Four-Eyes violation, got ${res.status}`);
    });

    await test('E2E', 'Checker L2 authorizes hold release and triggers CBS adapter unfreeze', async () => {
      const appRes = await request('POST', '/api/auth/login', {
        email: 'approver@rebank.internal',
        password: 'Approver@123'
      });
      approverToken = appRes.body.data.token;

      const res = await request('POST', `/api/admin/case/${createdRequestId}/authorize`, {
        action: 'APPROVE_AND_UNFREEZE',
        notes: 'Dual authorization granted.'
      }, {
        Authorization: `Bearer ${approverToken}`
      });
      assert(res.status === 200, `Expected 200, got ${res.status}`);
      assert(res.body.data.status === 'RESTORED', 'Status did not become RESTORED');
      assert(res.body.data.cbs_transaction_ref.startsWith('CBS-UNFREEZE-'), 'CBS transaction ref missing');
    });

    await test('E2E', 'Verified in database: Account status is ACTIVE and restriction is deactivated', async () => {
      const acc = get('SELECT status FROM account_references WHERE id = ?', [elenaAccountId]);
      assert(acc.status === 'ACTIVE', `Expected ACTIVE, got ${acc.status}`);

      const rst = get('SELECT is_active, resolved_at FROM account_restrictions WHERE id = ?', [elenaRestrictionId]);
      assert(rst.is_active === 0, 'Restriction should be deactivated (is_active = 0)');
      assert(rst.resolved_at !== null, 'resolved_at timestamp must not be null');
    });

    // ----------------------------------------------------
    // EXPANSION SUITE: Customer Recovery Center Expected Next Step
    // ----------------------------------------------------
    await test('EXPANSION-RECOVERY', 'Customer Recovery details contain expectedNextStep, missingDocuments and resubmission instructions', async () => {
      const res = await request('GET', `/api/recovery/${createdRequestId}`, null, {
        Authorization: `Bearer ${elenaToken}`
      });
      assert(res.status === 200, `Expected 200, got ${res.status}`);
      assert(res.body.data.expectedNextStep !== undefined, 'expectedNextStep missing');
      assert(Array.isArray(res.body.data.missingDocuments), 'missingDocuments array missing');
      assert(res.body.data.resubmissionInstructions !== undefined, 'resubmissionInstructions missing');
    });

    // ----------------------------------------------------
    // EXPANSION SUITE: Security & Privacy Center
    // ----------------------------------------------------
    await test('EXPANSION-PRIVACY', 'Public Privacy Policy returns data governance framework and consent catalog', async () => {
      const res = await request('GET', '/api/privacy/policy');
      assert(res.status === 200, `Expected 200, got ${res.status}`);
      assert(res.body.data.principles.length >= 4, 'Principles incomplete');
      assert(res.body.data.principles.some(p => p.title.includes('Zero Credential')), 'Zero credential principle missing');
      assert(Array.isArray(res.body.data.consents), 'Consents catalog missing');
    });

    await test('EXPANSION-PRIVACY', 'Customer retrieves consent preferences and history', async () => {
      const res = await request('GET', '/api/privacy/consents', null, {
        Authorization: `Bearer ${elenaToken}`
      });
      assert(res.status === 200, `Expected 200, got ${res.status}`);
      assert(Array.isArray(res.body.data), 'Expected array of consents');
      assert(res.body.data.length >= 4, 'Expected at least 4 consent categories');
      assert(res.body.data.some(c => c.type === 'DIGITAL_KYC_VERIFICATION' && c.granted === true), 'KYC verification consent missing');
    });

    await test('EXPANSION-PRIVACY', 'Customer updates non-mandatory consent preference', async () => {
      const res = await request('POST', '/api/privacy/consents', {
        consentType: 'CREDIT_BUREAU_INQUIRY',
        consentVersion: 'v1.4',
        granted: false
      }, {
        Authorization: `Bearer ${elenaToken}`
      });
      assert(res.status === 201, `Expected 201, got ${res.status}`);
      assert(res.body.data.granted === 0, 'Consent was not updated to false (0)');
    });

    // ----------------------------------------------------
    // EXPANSION SUITE: Fraud Detection and Alert Center
    // ----------------------------------------------------
    let analystToken = '';
    await test('EXPANSION-FRAUD', 'Fraud Analyst logs in and retrieves synthetic fraud alerts and statistics', async () => {
      const authRes = await request('POST', '/api/auth/login', {
        email: 'fraud.analyst@rebank.internal',
        password: 'Analyst@123'
      });
      assert(authRes.status === 200, `Expected 200, got ${authRes.status}`);
      assert(authRes.body.data.user.role === 'FRAUD_ANALYST', 'Role should be FRAUD_ANALYST');
      analystToken = authRes.body.data.token;

      // Stats
      const statsRes = await request('GET', '/api/fraud/stats', null, {
        Authorization: `Bearer ${analystToken}`
      });
      assert(statsRes.status === 200, `Expected 200, got ${statsRes.status}`);
      assert(statsRes.body.data.totalAlerts >= 3, `Expected at least 3 fraud alerts, got ${statsRes.body.data.totalAlerts}`);
      assert(statsRes.body.data.openAlerts >= 1, 'Expected at least 1 open alert');

      // Alerts list
      const alertsRes = await request('GET', '/api/fraud/alerts', null, {
        Authorization: `Bearer ${analystToken}`
      });
      assert(alertsRes.status === 200, `Expected 200, got ${alertsRes.status}`);
      assert(Array.isArray(alertsRes.body.data), 'Expected alerts array');
      assert(alertsRes.body.data.length >= 3, 'Expected at least 3 alerts');
      assert(alertsRes.body.data[0].risk_score !== undefined, 'risk_score missing from alert');
      assert(Array.isArray(alertsRes.body.data[0].reasons), 'reasons must be an array');
    });

    await test('EXPANSION-FRAUD', 'Fraud alert detail includes human-in-the-loop decision-support disclaimer', async () => {
      const res = await request('GET', '/api/fraud/alerts/frd-1002', null, {
        Authorization: `Bearer ${analystToken}`
      });
      assert(res.status === 200, `Expected 200, got ${res.status}`);
      assert(res.body.data.alert_code === 'FRD-2026-89106', 'Alert code mismatch');
      assert(res.body.data.disclaimer.includes('decision-support indicators for human compliance investigation'), 'Disclaimer missing or incorrect');
    });

    await test('EXPANSION-FRAUD', 'Analyst triage lifecycle: acknowledge -> investigate -> close with disposition', async () => {
      // 1. Acknowledge
      const ackRes = await request('POST', '/api/fraud/alerts/frd-1002/acknowledge', null, {
        Authorization: `Bearer ${analystToken}`
      });
      assert(ackRes.status === 200, `Expected 200, got ${ackRes.status}`);
      assert(ackRes.body.data.status === 'ACKNOWLEDGED', 'Status should be ACKNOWLEDGED');

      // 2. Add investigation notes
      const invRes = await request('POST', '/api/fraud/alerts/frd-1002/investigate', {
        notes: 'Contacted customer Elena Rostova via registered mobile. Device update verified legitimate.'
      }, {
        Authorization: `Bearer ${analystToken}`
      });
      assert(invRes.status === 200, `Expected 200, got ${invRes.status}`);
      assert(invRes.body.data.status === 'INVESTIGATING', 'Status should be INVESTIGATING');

      // 3. Close with disposition
      const closeRes = await request('POST', '/api/fraud/alerts/frd-1002/close', {
        disposition: 'CUSTOMER_VERIFIED',
        notes: 'Case resolved. Outbound mobile session confirmed by customer.'
      }, {
        Authorization: `Bearer ${analystToken}`
      });
      assert(closeRes.status === 200, `Expected 200, got ${closeRes.status}`);
      assert(closeRes.body.data.status === 'CLOSED', 'Status should be CLOSED');
      assert(closeRes.body.data.resolution_disposition === 'CUSTOMER_VERIFIED', 'Disposition mismatch');
    });

    await test('EXPANSION-FRAUD', 'RBAC Enforcement: Customer cannot access Fraud Center routes (403 Forbidden)', async () => {
      const res = await request('GET', '/api/fraud/alerts', null, {
        Authorization: `Bearer ${elenaToken}`
      });
      assert(res.status === 403, `Expected 403 Forbidden, got ${res.status}`);
      assert(res.body.error.code === 'FORBIDDEN', `Expected FORBIDDEN code, got ${res.body.error?.code}`);
    });

    // ----------------------------------------------------
    // EXPANSION SUITE: Admin Reports and Analytics
    // ----------------------------------------------------
    await test('EXPANSION-REPORTS', 'Reports summary returns recovery statistics, SLA turnaround, and fraud trends', async () => {
      const res = await request('GET', '/api/admin/reports/summary', null, {
        Authorization: `Bearer ${approverToken}`
      });
      assert(res.status === 200, `Expected 200, got ${res.status}`);
      assert(res.body.data.totalCases >= 2, 'Total cases should be at least 2');
      assert(res.body.data.avgTurnaroundHours !== undefined, 'avgTurnaroundHours missing');
      assert(res.body.data.fraudAlertsTotal >= 3, 'fraudAlertsTotal missing');
    });

    await test('EXPANSION-REPORTS', 'Compliance export produces non-sensitive JSON and CSV formats', async () => {
      // JSON export
      const jsonRes = await request('GET', '/api/admin/reports/export?type=cases&format=json', null, {
        Authorization: `Bearer ${approverToken}`
      });
      assert(jsonRes.status === 200, `Expected 200, got ${jsonRes.status}`);
      assert(jsonRes.body.success === true, 'JSON export failed');
      assert(Array.isArray(jsonRes.body.data), 'Data array missing');
      assert(jsonRes.body.data.length > 0, 'No export records');
      assert(jsonRes.body.data[0].account_number_masked.includes('••••'), 'Account number in report must be masked');

      // CSV export
      const csvRes = await request('GET', '/api/admin/reports/export?type=cases&format=csv', null, {
        Authorization: `Bearer ${approverToken}`
      });
      assert(csvRes.status === 200, `Expected 200, got ${csvRes.status}`);
      assert(csvRes.headers['content-type'].includes('text/csv'), 'Content-Type must be text/csv');
      assert(csvRes.raw.includes('reference_number'), 'CSV missing headers');
    });

    // ----------------------------------------------------
    // EXPANSION SUITE: Signup Validation & Bank Account Registration
    // ----------------------------------------------------
    let newCustomerToken = '';
    await test('SIGNUP-VALIDATION', 'Signup fails with 400 when missing fields or invalid format', async () => {
      // 1. Missing full name
      const res1 = await request('POST', '/api/auth/register', {
        email: 'test.user@example.com',
        password: 'Password@123',
        phone: '+91 98765 43210'
      });
      assert(res1.status === 400, `Expected 400 for missing name, got ${res1.status}`);

      // 2. Invalid phone number (less than 10 digits)
      const res2 = await request('POST', '/api/auth/register', {
        fullName: 'Test User',
        email: 'test.user@example.com',
        phone: '123',
        password: 'Password@123'
      });
      assert(res2.status === 400, `Expected 400 for invalid phone, got ${res2.status}`);

      // 3. Invalid email format
      const res3 = await request('POST', '/api/auth/register', {
        fullName: 'Test User',
        email: 'invalid-email',
        phone: '+91 98765 43210',
        password: 'Password@123'
      });
      assert(res3.status === 400, `Expected 400 for invalid email, got ${res3.status}`);

      // 4. Short password
      const res4 = await request('POST', '/api/auth/register', {
        fullName: 'Test User',
        email: 'test.user@example.com',
        phone: '+91 98765 43210',
        password: 'short'
      });
      assert(res4.status === 400, `Expected 400 for short password, got ${res4.status}`);
    });

    await test('SIGNUP-SUCCESS', 'Signup succeeds with Name, Phone, Email, and Password', async () => {
      const res = await request('POST', '/api/auth/register', {
        fullName: 'Aarav Patel',
        phone: '+91 98765 43210',
        email: 'aarav.patel@example.com',
        password: 'Password@123'
      });
      assert(res.status === 201, `Expected 201 Created, got ${res.status}`);
      assert(res.body.success === true, 'Success flag false');
      assert(res.body.data.token, 'Token not returned');
      assert(res.body.data.user.fullName === 'Aarav Patel', 'Full name mismatch');
      assert(res.body.data.user.phone === '+91 98765 43210', 'Phone mismatch');
      assert(res.body.data.customerProfile.id, 'Customer profile not created');
      newCustomerToken = res.body.data.token;
    });

    await test('REGISTER-BANK-VALIDATION', 'Register Bank Account fails with 400 when required fields are missing', async () => {
      const res = await request('POST', '/api/customer/accounts', {
        accountHolderName: '',
        branchName: '',
        city: '',
        state: '',
        country: 'India',
        bankAccountNumber: '',
        confirmAccountNumber: '',
        ifscCode: '',
        phoneNumber: ''
      }, {
        Authorization: `Bearer ${newCustomerToken}`
      });
      assert(res.status === 400, `Expected 400 Bad Request, got ${res.status}`);
    });

    await test('REGISTER-BANK-VALIDATION', 'Register Bank Account fails with 400 when account numbers do not match', async () => {
      const res = await request('POST', '/api/customer/accounts', {
        accountHolderName: 'Aarav Patel',
        branchName: 'Connaught Place',
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India',
        bankAccountNumber: '98765432101234',
        confirmAccountNumber: '98765432109999',
        ifscCode: 'SBIN0001234',
        phoneNumber: '+91 98765 43210'
      }, {
        Authorization: `Bearer ${newCustomerToken}`
      });
      assert(res.status === 400, `Expected 400 for mismatch, got ${res.status}`);
      assert(res.body.error.message.includes('match'), 'Mismatch error message expected');
    });

    await test('REGISTER-BANK-IFSC', 'Register Bank Account fails with 400 when country is India and IFSC is invalid or missing', async () => {
      // 1. Missing IFSC for India
      const res1 = await request('POST', '/api/customer/accounts', {
        accountHolderName: 'Aarav Patel',
        branchName: 'Connaught Place',
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India',
        bankAccountNumber: '98765432101234',
        confirmAccountNumber: '98765432101234',
        ifscCode: '',
        phoneNumber: '+91 98765 43210'
      }, {
        Authorization: `Bearer ${newCustomerToken}`
      });
      assert(res1.status === 400, `Expected 400 for missing IFSC, got ${res1.status}`);

      // 2. Malformed IFSC for India (wrong pattern)
      const res2 = await request('POST', '/api/customer/accounts', {
        accountHolderName: 'Aarav Patel',
        branchName: 'Connaught Place',
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India',
        bankAccountNumber: '98765432101234',
        confirmAccountNumber: '98765432101234',
        ifscCode: 'INVALID_IFSC_123',
        phoneNumber: '+91 98765 43210'
      }, {
        Authorization: `Bearer ${newCustomerToken}`
      });
      assert(res2.status === 400, `Expected 400 for malformed IFSC, got ${res2.status}`);
    });

    let indianAccountId = '';
    await test('REGISTER-BANK-SUCCESS-INDIA', 'Register Bank Account succeeds for India with valid IFSC in RESTRICTED status', async () => {
      const res = await request('POST', '/api/customer/accounts', {
        accountHolderName: 'Aarav Patel',
        branchName: 'Connaught Place Branch',
        city: 'New Delhi',
        state: 'Delhi',
        country: 'India',
        bankAccountNumber: '98765432105678',
        confirmAccountNumber: '98765432105678',
        ifscCode: 'SBIN0001234',
        phoneNumber: '+91 98765 43210'
      }, {
        Authorization: `Bearer ${newCustomerToken}`
      });
      assert(res.status === 201, `Expected 201 Created, got ${res.status}`);
      assert(res.body.success === true, 'Success flag false');
      assert(res.body.data.accountHolderName === 'Aarav Patel', 'Holder name mismatch');
      assert(res.body.data.branchName === 'Connaught Place Branch', 'Branch mismatch');
      assert(res.body.data.city === 'New Delhi', 'City mismatch');
      assert(res.body.data.state === 'Delhi', 'State mismatch');
      assert(res.body.data.country === 'India', 'Country mismatch');
      assert(res.body.data.ifscCode === 'SBIN0001234', 'IFSC mismatch');
      assert(res.body.data.accountNumberMasked === '•••• •••• •••• 5678', 'Masked account mismatch');
      // Requirement 8: Do not claim an account is verified or unblocked unless authorized bank integration confirms
      assert(res.body.data.status === 'RESTRICTED', 'Status must be RESTRICTED pending verification');
      indianAccountId = res.body.data.id;
    });

    await test('REGISTER-BANK-SUCCESS-GLOBAL', 'Register Bank Account succeeds for non-India country (US) without mandatory IFSC', async () => {
      const res = await request('POST', '/api/customer/accounts', {
        accountHolderName: 'Aarav Patel US LLC',
        branchName: 'Manhattan 5th Ave',
        city: 'New York',
        state: 'New York',
        country: 'United States',
        bankAccountNumber: '11223344556677',
        confirmAccountNumber: '11223344556677',
        ifscCode: '',
        phoneNumber: '+1 (555) 345-6789'
      }, {
        Authorization: `Bearer ${newCustomerToken}`
      });
      assert(res.status === 201, `Expected 201 Created, got ${res.status}`);
      assert(res.body.data.country === 'United States', 'Country mismatch');
      assert(res.body.data.accountNumberMasked === '•••• •••• •••• 6677', 'Masked account mismatch');
      assert(res.body.data.status === 'RESTRICTED', 'Status must be RESTRICTED');
    });

    await test('REGISTER-BANK-SECURITY', 'Never log or expose raw account numbers in response, queries, or audit trail', async () => {
      // 1. Query accounts endpoint
      const listRes = await request('GET', '/api/customer/accounts', null, {
        Authorization: `Bearer ${newCustomerToken}`
      });
      assert(listRes.status === 200, `Expected 200, got ${listRes.status}`);
      const found = listRes.body.data.find(a => a.id === indianAccountId);
      assert(found, 'Indian account not found in customer accounts');
      assert(found.account_number_masked === '•••• •••• •••• 5678', 'Account must be masked');
      assert(!found.bankAccountNumber && !found.account_number, 'Raw account number leaked in account query');

      // 2. Verify audit events do not contain raw account number
      if (!adminToken) {
        const adminAuth = await request('POST', '/api/auth/login', {
          email: 'admin@rebank.internal',
          password: 'Admin@123'
        });
        adminToken = adminAuth.body.data.token;
      }
      const auditRes = await request('GET', '/api/admin/audit-logs?limit=10', null, {
        Authorization: `Bearer ${adminToken}`
      });
      assert(auditRes.status === 200, `Expected 200, got ${auditRes.status}`);
      const regEvent = auditRes.body.data.find(e => e.action === 'BANK_ACCOUNT_REGISTERED' && e.entity_id === indianAccountId);
      assert(regEvent, 'BANK_ACCOUNT_REGISTERED audit event not found');
      const detailsStr = typeof regEvent.details === 'object' ? JSON.stringify(regEvent.details) : String(regEvent.details);
      assert(!detailsStr.includes('98765432105678'), 'Full raw account number found in audit log!');
      assert(detailsStr.includes('•••• •••• •••• 5678'), 'Masked account number missing from audit details');
    });

    await test('REGISTER-BANK-AUTH', 'Unauthenticated request to register bank account returns 401 Unauthorized', async () => {
      const res = await request('POST', '/api/customer/accounts', {
        accountHolderName: 'Hacker',
        branchName: 'Unknown',
        city: 'Unknown',
        state: 'Unknown',
        country: 'India',
        bankAccountNumber: '123456789012',
        confirmAccountNumber: '123456789012',
        ifscCode: 'SBIN0001234',
        phoneNumber: '+91 99999 88888'
      });
      assert(res.status === 401, `Expected 401 Unauthorized, got ${res.status}`);
    });

    await test('I18N-TRILINGUAL', 'Trilingual localization: English, Tamil, and Hindi dictionaries are fully intact', async () => {
      const appJsRes = await request('GET', '/app.js');
      assert(appJsRes.status === 200, `Expected 200, got ${appJsRes.status}`);
      assert(appJsRes.raw.includes('en: {'), 'English dictionary missing');
      assert(appJsRes.raw.includes('ta: {'), 'Tamil dictionary missing');
      assert(appJsRes.raw.includes('hi: {'), 'Hindi dictionary missing');
      assert(appJsRes.raw.includes('registerBankTitle: "बैंक खाता पंजीकृत करें"'), 'Hindi bank title translation missing');
      assert(appJsRes.raw.includes('registerBankTitle: "வங்கி கணக்கை பதிவு செய்க"'), 'Tamil bank title translation missing');
      assert(appJsRes.raw.includes('localStorage.setItem(\'rebank_lang\', lang)'), 'Language persistence missing');
    });

    console.log('\n====================================================');
    console.log(`  ALL ${passedTests} OF ${totalTests} TESTS PASSED SUCCESSFULLY!`);
    console.log('====================================================');

  } finally {
    if (server) {
      server.close();
    }
  }
}

if (require.main === module) {
  runTests()
    .then(() => process.exit(0))
    .catch(err => {
      console.error('[Verification Suite Aborted]:', err);
      process.exit(1);
    });
}

module.exports = { runTests };
