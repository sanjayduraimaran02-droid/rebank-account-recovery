const http = require('http');
const { app } = require('../src/server');
const { get } = require('../src/db/database');
const { seed } = require('../src/db/seed');

const PORT = process.env.PORT || 3000;
let localServer = null;

function ensureServer() {
  return new Promise((resolve) => {
    const testReq = http.request(`http://localhost:${PORT}/api/health`, { timeout: 1000 }, (res) => {
      resolve(false); // Server already running
    });
    testReq.on('error', () => {
      console.log(`[Audit Setup] Starting local ReBank server listener on port ${PORT}...`);
      localServer = app.listen(PORT, () => {
        resolve(true); // Started locally
      });
    });
    testReq.end();
  });
}

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const headers = {
      'x-test-runner': 'rebank-internal-audit',
      'x-rebank-test': 'true',
      ...(options.headers || {})
    };
    const req = http.request(`http://localhost:${PORT}${path}`, { ...options, headers }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(data); } catch (e) {}
        resolve({ status: res.statusCode, headers: res.headers, body: data, json });
      });
    });
    req.on('error', reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function run() {
  console.log('--- SYSTEMATIC BACKEND ENDPOINT AUDIT ---');
  let failures = 0;

  // 0. Ensure server is running
  await ensureServer();

  // Ensure deterministic test environment with seeded test accounts
  const acc1002 = get("SELECT status FROM account_references WHERE id = 'acc-1002'");
  if (!acc1002 || acc1002.status !== 'RESTRICTED') {
    console.log('[Audit Setup] Initializing clean test fixtures via seed()...');
    await seed();
  }

  // 1. Health & Docs
  const h = await request('/api/health');
  const hPass = h.status === 200 && h.json?.status === 'HEALTHY';
  console.log('/api/health:', h.status, hPass ? 'PASS' : 'FAIL');
  if (!hPass) failures++;

  const ready = await request('/api/ready');
  const readyPass = ready.status === 200 && ready.json?.status === 'READY';
  console.log('/api/ready:', ready.status, readyPass ? 'PASS' : 'FAIL');
  if (!readyPass) failures++;

  const docs = await request('/api/docs');
  const docsPass = docs.status === 200 && Boolean(docs.json?.openapi);
  console.log('/api/docs:', docs.status, docsPass ? 'PASS' : 'FAIL');
  if (!docsPass) failures++;

  // 2. Authentication & Authorization Security Checks (Documented Rules)
  // Verify unauthenticated access to protected customer endpoint returns 401
  const unauthCustomer = await request('/api/customer/accounts');
  const unauthCustPass = unauthCustomer.status === 401;
  console.log('Unauthenticated access /api/customer/accounts (expected 401):', unauthCustomer.status, unauthCustPass ? 'PASS' : 'FAIL');
  if (!unauthCustPass) failures++;

  // Verify unauthenticated access to protected admin queue returns 401
  const unauthAdmin = await request('/api/admin/queue/reviewer');
  const unauthAdminPass = unauthAdmin.status === 401;
  console.log('Unauthenticated access /api/admin/queue/reviewer (expected 401):', unauthAdmin.status, unauthAdminPass ? 'PASS' : 'FAIL');
  if (!unauthAdminPass) failures++;

  // 3. Customer Auth - login as Elena Rostova
  const loginRes = await request('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'elena.rostova@example.com', password: 'Customer@123' })
  });
  const elenaToken = loginRes.json?.data?.token;
  const loginPass = loginRes.status === 200 && Boolean(elenaToken);
  console.log('Customer Login (Elena):', loginRes.status, loginPass ? 'PASS' : 'FAIL');
  if (!loginPass) {
    failures++;
    console.log('   Customer login error details:', loginRes.json);
  }

  // 4. Role-Based Access Control (RBAC) - Elena (CUSTOMER) attempting admin route must return 403
  if (elenaToken) {
    const rbacRes = await request('/api/admin/queue/reviewer', {
      headers: { 'Authorization': `Bearer ${elenaToken}` }
    });
    const rbacPass = rbacRes.status === 403;
    console.log('Customer accessing /api/admin/queue/reviewer (expected 403):', rbacRes.status, rbacPass ? 'PASS' : 'FAIL');
    if (!rbacPass) failures++;
  }

  // 5. Customer accounts
  const accRes = await request('/api/customer/accounts', {
    headers: { 'Authorization': `Bearer ${elenaToken}` }
  });
  const accList = accRes.json?.data || accRes.json;
  const accPass = accRes.status === 200 && Array.isArray(accList) && accList.length > 0;
  console.log('GET /api/customer/accounts:', accRes.status, accPass ? 'PASS' : 'FAIL');
  if (!accPass) failures++;
  const elenaAcc = Array.isArray(accList) ? accList[0] : null;

  // 6. Customer restriction diagnosis
  if (elenaAcc) {
    const diagRes = await request(`/api/customer/restriction/${elenaAcc.id}`, {
      headers: { 'Authorization': `Bearer ${elenaToken}` }
    });
    const diagData = diagRes.json?.data || diagRes.json;
    const diagPass = diagRes.status === 200 && Boolean(diagData?.hasRestriction);
    console.log(`GET /api/customer/restriction/${elenaAcc.id}:`, diagRes.status, diagPass ? 'PASS' : 'FAIL');
    if (!diagPass) failures++;
  }

  // 7. Customer my-requests
  const reqRes = await request('/api/recovery/my-requests', {
    headers: { 'Authorization': `Bearer ${elenaToken}` }
  });
  const reqList = reqRes.json?.data || reqRes.json;
  const reqPass = reqRes.status === 200 && Array.isArray(reqList);
  console.log('GET /api/recovery/my-requests:', reqRes.status, reqPass ? 'PASS' : 'FAIL');
  if (!reqPass) failures++;

  // 8. Notifications
  const notifRes = await request('/api/notifications', {
    headers: { 'Authorization': `Bearer ${elenaToken}` }
  });
  const notifList = notifRes.json?.data || notifRes.json;
  const notifPass = notifRes.status === 200 && Array.isArray(notifList);
  console.log('GET /api/notifications:', notifRes.status, notifPass ? 'PASS' : 'FAIL');
  if (!notifPass) failures++;

  // 9. Privacy consents
  const consentRes = await request('/api/privacy/consents', {
    headers: { 'Authorization': `Bearer ${elenaToken}` }
  });
  const consentData = consentRes.json?.data || consentRes.json;
  const consentPass = consentRes.status === 200 && Array.isArray(consentData?.consents || consentData);
  console.log('GET /api/privacy/consents:', consentRes.status, consentPass ? 'PASS' : 'FAIL');
  if (!consentPass) failures++;

  // 10. Complaints
  const compRes = await request('/api/complaints/my', {
    headers: { 'Authorization': `Bearer ${elenaToken}` }
  });
  const compList = compRes.json?.data || compRes.json;
  const compPass = compRes.status === 200 && Array.isArray(compList);
  console.log('GET /api/complaints/my:', compRes.status, compPass ? 'PASS' : 'FAIL');
  if (!compPass) failures++;

  // 11. Staff Auth - Reviewer (Maker)
  const reviewerLogin = await request('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'reviewer@rebank.internal', password: 'Reviewer@123' })
  });
  const reviewerToken = reviewerLogin.json?.data?.token;
  const reviewerPass = reviewerLogin.status === 200 && Boolean(reviewerToken);
  console.log('Staff Login (Reviewer):', reviewerLogin.status, reviewerPass ? 'PASS' : 'FAIL');
  if (!reviewerPass) {
    failures++;
    console.log('   Reviewer login error details:', reviewerLogin.json);
  }

  // 12. Reviewer cases
  const casesRes = await request('/api/admin/queue/reviewer', {
    headers: { 'Authorization': `Bearer ${reviewerToken}` }
  });
  const casesList = casesRes.json?.data || casesRes.json;
  const casesPass = casesRes.status === 200 && Array.isArray(casesList);
  console.log('GET /api/admin/queue/reviewer:', casesRes.status, casesPass ? 'PASS' : 'FAIL');
  if (!casesPass) failures++;

  // 13. Staff Auth - Approver (Checker)
  const approverLogin = await request('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'approver@rebank.internal', password: 'Approver@123' })
  });
  const approverToken = approverLogin.json?.data?.token;
  const approverPass = approverLogin.status === 200 && Boolean(approverToken);
  console.log('Staff Login (Approver):', approverLogin.status, approverPass ? 'PASS' : 'FAIL');
  if (!approverPass) {
    failures++;
    console.log('   Approver login error details:', approverLogin.json);
  }

  // 14. Approver queue
  const approverQueue = await request('/api/admin/queue/approver', {
    headers: { 'Authorization': `Bearer ${approverToken}` }
  });
  const approverList = approverQueue.json?.data || approverQueue.json;
  const approverQueuePass = approverQueue.status === 200 && Array.isArray(approverList);
  console.log('GET /api/admin/queue/approver:', approverQueue.status, approverQueuePass ? 'PASS' : 'FAIL');
  if (!approverQueuePass) failures++;

  // 15. Staff Auth - Fraud Analyst
  const analystLogin = await request('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'fraud.analyst@rebank.internal', password: 'Analyst@123' })
  });
  const analystToken = analystLogin.json?.data?.token;
  const analystPass = analystLogin.status === 200 && Boolean(analystToken);
  console.log('Staff Login (Fraud Analyst):', analystLogin.status, analystPass ? 'PASS' : 'FAIL');
  if (!analystPass) {
    failures++;
    console.log('   Fraud Analyst login error details:', analystLogin.json);
  }

  // 16. Fraud alerts
  const alertsRes = await request('/api/fraud/alerts', {
    headers: { 'Authorization': `Bearer ${analystToken}` }
  });
  const alertsData = alertsRes.json?.data || alertsRes.json;
  const alertsPass = alertsRes.status === 200 && Array.isArray(alertsData?.alerts || alertsData);
  console.log('GET /api/fraud/alerts:', alertsRes.status, alertsPass ? 'PASS' : 'FAIL');
  if (!alertsPass) failures++;

  // 17. Reports summary
  const reportsRes = await request('/api/admin/reports/summary', {
    headers: { 'Authorization': `Bearer ${reviewerToken}` }
  });
  const reportsData = reportsRes.json?.data || reportsRes.json;
  const reportsPass = reportsRes.status === 200 && Boolean(reportsData?.totalCases !== undefined);
  console.log('GET /api/admin/reports/summary:', reportsRes.status, reportsPass ? 'PASS' : 'FAIL');
  if (!reportsPass) failures++;

  // 18. Audit events (Approver or Admin role)
  const auditRes = await request('/api/admin/audit-logs', {
    headers: { 'Authorization': `Bearer ${approverToken}` }
  });
  const auditData = auditRes.json?.data || auditRes.json;
  const auditPass = auditRes.status === 200 && Array.isArray(auditData);
  console.log('GET /api/admin/audit-logs (APPROVER):', auditRes.status, auditPass ? 'PASS' : 'FAIL');
  if (!auditPass) failures++;

  // 19. Chat suggested questions
  const chatQRes = await request('/api/chat/suggested-questions?language=en');
  const chatQPass = chatQRes.status === 200 && Array.isArray(chatQRes.json?.data?.questions) && chatQRes.json?.data?.questions.length > 0;
  console.log('GET /api/chat/suggested-questions:', chatQRes.status, chatQPass ? 'PASS' : 'FAIL');
  if (!chatQPass) failures++;

  // 20. Chat interactive message processing
  const chatMsgRes = await request('/api/chat/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${elenaToken}`
    },
    body: JSON.stringify({ message: 'Why is my account locked?', language: 'en' })
  });
  const chatMsgPass = chatMsgRes.status === 200 && chatMsgRes.json?.data?.success && Boolean(chatMsgRes.json?.data?.reply);
  console.log('POST /api/chat/message:', chatMsgRes.status, chatMsgPass ? 'PASS' : 'FAIL');
  if (!chatMsgPass) failures++;

  if (localServer) {
    localServer.close();
  }

  console.log('\n--- FINAL AUDIT RESULT ---');
  console.log('Total endpoint test failures:', failures);
  process.exit(failures > 0 ? 1 : 0);
}

run().catch(e => {
  if (localServer) localServer.close();
  console.error('Audit crashed:', e);
  process.exit(1);
});
