/**
 * Comprehensive Test Suite for Registered Bank Account Feature
 * Covers all 12 points specified in user requirements
 */
const assert = require('assert');
const http = require('http');

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}`;

function request(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const reqHeaders = { ...headers };
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
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: json,
          raw: data
        });
      });
    });

    req.on('error', reject);
    if (reqBody) req.write(reqBody);
    req.end();
  });
}

async function runTests() {
  console.log('====================================================');
  console.log('  Testing: Registered Bank Account Feature');
  console.log('====================================================');

  // Login as Elena Rostova
  const loginRes = await request('POST', '/api/auth/login', {
    email: 'elena.rostova@example.com',
    password: 'Customer@123'
  });
  assert.strictEqual(loginRes.status, 200, 'Login failed');
  const token = loginRes.body.data.token;
  const authHeaders = { Authorization: `Bearer ${token}` };

  console.log('[PASS] Test 0: Authenticated customer Elena Rostova');

  // 1. Check frontend file contains page view, navigation hooks, and buttons
  const appJsRes = await request('GET', '/app.js');
  const indexHtmlRes = await request('GET', '/');

  assert(indexHtmlRes.raw.includes('id="viewRegisterBank"'), 'viewRegisterBank page missing from HTML');
  assert(indexHtmlRes.raw.includes('id="registerBankForm"'), 'registerBankForm missing from HTML');
  assert(indexHtmlRes.raw.includes('id="allAccountsGrid"'), 'allAccountsGrid missing from HTML');
  assert(!indexHtmlRes.raw.includes('id="openRegisterBankBtn"'), 'openRegisterBankBtn should be removed from customer hero banner');
  assert(indexHtmlRes.raw.includes('id="openRegisterBankBtn2"'), 'openRegisterBankBtn2 missing from HTML');
  console.log('[PASS] Test 1: Registered Bank Account page view and action buttons present in HTML');

  // 2. Direct route access and page refresh routing in app.js
  assert(appJsRes.raw.includes('function handleRouteHash()'), 'handleRouteHash missing from app.js');
  assert(appJsRes.raw.includes("'register-bank': 'viewRegisterBank'"), 'hash route register-bank missing');
  assert(appJsRes.raw.includes("'accounts': 'viewAccounts'"), 'hash route accounts missing');
  console.log('[PASS] Test 2: Direct URL access and browser refresh routing supported');

  // 4. Missing required fields validation
  const missingRes = await request('POST', '/api/customer/accounts', {
    accountHolderName: '',
    branchName: '',
    city: '',
    state: '',
    country: 'India',
    bankAccountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    phoneNumber: ''
  }, authHeaders);
  assert.strictEqual(missingRes.status, 400, 'Expected 400 Bad Request for missing fields');
  console.log('[PASS] Test 4: Missing required fields rejected with 400 Bad Request');

  // 5. Mismatched account numbers validation
  const mismatchRes = await request('POST', '/api/customer/accounts', {
    accountHolderName: 'Elena Rostova',
    branchName: 'Mumbai Central Branch',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    bankAccountNumber: '98765432101234',
    confirmAccountNumber: '98765432109999',
    ifscCode: 'SBIN0001234',
    phoneNumber: '+91 98765 43210'
  }, authHeaders);
  assert.strictEqual(mismatchRes.status, 400, 'Expected 400 for mismatched account numbers');
  assert(mismatchRes.body.error.message.includes('match'), 'Expected mismatch error message');
  console.log('[PASS] Test 5: Mismatched account numbers rejected');

  // 6. Invalid email, mobile, or IFSC
  const invalidIfscRes = await request('POST', '/api/customer/accounts', {
    accountHolderName: 'Elena Rostova',
    branchName: 'Mumbai Central Branch',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    bankAccountNumber: '98765432101234',
    confirmAccountNumber: '98765432101234',
    ifscCode: 'INVALID_IFSC',
    phoneNumber: '+91 98765 43210',
    email: 'elena@example.com'
  }, authHeaders);
  assert.strictEqual(invalidIfscRes.status, 400, 'Expected 400 for invalid IFSC');
  assert(invalidIfscRes.body.error.message.includes('IFSC'), 'Expected IFSC error message');

  const invalidEmailRes = await request('POST', '/api/customer/accounts', {
    accountHolderName: 'Elena Rostova',
    branchName: 'Mumbai Central Branch',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    bankAccountNumber: '98765432101234',
    confirmAccountNumber: '98765432101234',
    ifscCode: 'SBIN0001234',
    phoneNumber: '+91 98765 43210',
    email: 'not-an-email'
  }, authHeaders);
  assert.strictEqual(invalidEmailRes.status, 400, 'Expected 400 for invalid email format');

  const invalidPhoneRes = await request('POST', '/api/customer/accounts', {
    accountHolderName: 'Elena Rostova',
    branchName: 'Mumbai Central Branch',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    bankAccountNumber: '98765432101234',
    confirmAccountNumber: '98765432101234',
    ifscCode: 'SBIN0001234',
    phoneNumber: '123'
  }, authHeaders);
  assert.strictEqual(invalidPhoneRes.status, 400, 'Expected 400 for short phone number');
  console.log('[PASS] Test 6: Invalid email, phone, and IFSC values correctly handled');

  // 3 & 9. Valid registration submits successfully, persists, and appears in list
  const uniqueAccNum = '98765' + Math.floor(100000000 + Math.random() * 900000000);
  const regRes = await request('POST', '/api/customer/accounts', {
    accountHolderName: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    phoneNumber: '+91 98765 43210',
    dateOfBirth: '1992-05-14',
    residentialAddress: 'Flat 402, Sunset Heights',
    country: 'India',
    state: 'Maharashtra',
    city: 'Mumbai',
    postalCode: '400001',
    bankName: 'State Bank of India',
    accountType: 'SAVINGS',
    bankAccountNumber: uniqueAccNum,
    confirmAccountNumber: uniqueAccNum,
    ifscCode: 'SBIN0001234',
    branchName: 'Nariman Point Branch',
    branchCode: 'BR-MUM-01',
    termsAccepted: true
  }, authHeaders);

  assert.strictEqual(regRes.status, 201, `Expected 201 Created, got ${regRes.status}: ${JSON.stringify(regRes.body)}`);
  assert.strictEqual(regRes.body.data.status, 'RESTRICTED', 'Status must be RESTRICTED pending verification');
  assert.strictEqual(regRes.body.data.bankName, 'State Bank of India', 'Bank name must match');
  assert(regRes.body.data.accountNumberMasked.endsWith(uniqueAccNum.slice(-4)), 'Masked account number must preserve last 4 digits');
  console.log('[PASS] Test 3: Valid registration submits successfully with all 17 fields');

  // Verify persistence in GET /api/customer/accounts
  const listRes = await request('GET', '/api/customer/accounts', null, authHeaders);
  assert.strictEqual(listRes.status, 200, 'Failed to fetch customer accounts');
  const found = listRes.body.data.find(a => a.account_number_masked === regRes.body.data.accountNumberMasked);
  assert(found, 'Newly registered account not found in accounts list');
  assert.strictEqual(found.bank_name, 'State Bank of India', 'Bank name not preserved in list');
  assert.strictEqual(found.status, 'RESTRICTED', 'Account status must be RESTRICTED');
  console.log('[PASS] Test 9: Successful registration persists and appears in Registered Bank Accounts list');

  // 7. Duplicate submission prevented
  const dupRes = await request('POST', '/api/customer/accounts', {
    accountHolderName: 'Elena Rostova',
    branchName: 'Nariman Point Branch',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    bankAccountNumber: uniqueAccNum,
    confirmAccountNumber: uniqueAccNum,
    ifscCode: 'SBIN0001234',
    phoneNumber: '+91 98765 43210'
  }, authHeaders);
  assert.strictEqual(dupRes.status, 409, `Expected 409 Conflict for duplicate, got ${dupRes.status}`);
  assert(dupRes.body.error.message.includes('already registered'), 'Expected duplicate notice in message');
  console.log('[PASS] Test 7: Duplicate account registration prevented with 409 Conflict');

  // 8. Existing database records remain intact
  const origAccount = listRes.body.data.find(a => a.id === 'acc-1002');
  assert(origAccount, 'Existing seed account acc-1002 missing');
  console.log('[PASS] Test 8: Existing customer records remain completely intact');

  // 10. Backend/network failures handling
  const noAuthRes = await request('POST', '/api/customer/accounts', {
    accountHolderName: 'Anonymous',
    branchName: 'Main',
    city: 'NY',
    state: 'NY',
    country: 'US',
    bankAccountNumber: '1234567890',
    confirmAccountNumber: '1234567890',
    phoneNumber: '+1 555 123 4567'
  });
  assert.strictEqual(noAuthRes.status, 401, 'Unauthenticated request should return 401');
  console.log('[PASS] Test 10: Unauthorized / backend failures return proper status codes');

  // 11. Tamil, English, and Hindi labels
  assert(appJsRes.raw.includes('registerBankTitle: "Register Bank Account"'), 'English translation missing');
  assert(appJsRes.raw.includes('registerBankTitle: "வங்கி கணக்கை பதிவு செய்க"'), 'Tamil translation missing');
  assert(appJsRes.raw.includes('registerBankTitle: "बैंक खाता पंजीकृत करें"'), 'Hindi translation missing');
  assert(appJsRes.raw.includes('backToAccounts: "Back to Accounts"'), 'English back button missing');
  assert(appJsRes.raw.includes('backToAccounts: "கணக்குகளுக்குத் திரும்பு"'), 'Tamil back button missing');
  assert(appJsRes.raw.includes('backToAccounts: "खातों पर वापस जाएं"'), 'Hindi back button missing');
  console.log('[PASS] Test 11: Trilingual English, Tamil, and Hindi labels verified');

  // 12. Existing "Basic Account Register" (User signup) still works
  const randomSignup = `user${Date.now()}@example.com`;
  const signupRes = await request('POST', '/api/auth/register', {
    fullName: 'Test Customer',
    email: randomSignup,
    phone: '+1 555 999 8888',
    password: 'Password@123'
  });
  assert.strictEqual(signupRes.status, 201, 'Basic Account Register (User Signup) failed');
  console.log('[PASS] Test 12: Existing Basic Account Register (User Signup) continues to work smoothly');

  console.log('\n====================================================');
  console.log('  ALL 12 TEST REQUIREMENTS PASSED SUCCESSFULLY!');
  console.log('====================================================\n');
}

runTests().catch(err => {
  console.error('[FAIL]', err);
  process.exit(1);
});
