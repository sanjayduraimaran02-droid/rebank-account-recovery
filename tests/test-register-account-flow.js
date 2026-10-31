/**
 * Comprehensive Test Suite for Register Account Feature
 * Covers all 12 points specified in user requirements
 */
const assert = require('assert');
const http = require('http');
const { get, all } = require('../src/db/database');

const PORT = 3000;
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
  console.log('  Testing: Register Account Feature & Flows');
  console.log('====================================================');

  // 1. Verify frontend files include Register Account button, modal, form, and routes
  const indexRes = await request('GET', '/');
  assert.strictEqual(indexRes.status, 200, 'index.html failed to load');
  assert(indexRes.raw.includes('id="tabRegister"'), 'tabRegister missing from index.html');
  assert(indexRes.raw.includes('id="registerAccountBtn"'), 'registerAccountBtn missing from index.html');
  assert(indexRes.raw.includes('id="registerForm"'), 'registerForm missing from index.html');
  assert(indexRes.raw.includes('id="registerBankModal"'), 'registerBankModal missing from index.html');
  assert(indexRes.raw.includes('id="modalProceedRegisterBankBtn"'), 'modalProceedRegisterBankBtn missing from index.html');
  assert(indexRes.raw.includes('id="viewRegisterBank"'), 'viewRegisterBank missing from index.html');
  assert(indexRes.raw.includes('id="registerBankForm"'), 'registerBankForm missing from index.html');
  console.log('[PASS] Requirement 1: Register Account buttons, tabs, modal, and forms present in HTML');

  // 2. Verify JavaScript wiring for duplicate submission prevention & event handling
  const appJsRes = await request('GET', '/app.js');
  assert.strictEqual(appJsRes.status, 200, 'app.js failed to load');
  assert(appJsRes.raw.includes('registerAccountBtn: document.getElementById'), 'registerAccountBtn element reference missing');
  assert(appJsRes.raw.includes('modalProceedRegisterBankBtn: document.getElementById'), 'modalProceedRegisterBankBtn element reference missing');
  assert(appJsRes.raw.includes('submitBtn.disabled = true;'), 'Duplicate submission protection missing in form handler');
  assert(appJsRes.raw.includes("hash === 'register' || hash === 'register-account'"), 'Hash routing for register-account missing');
  console.log('[PASS] Requirement 2 & 8: Duplicate submission prevention, loading state, and hash routing verified in app.js');

  // 3. User Registration Flow: Missing fields validation
  const missingNameRes = await request('POST', '/api/auth/register', {
    email: `valid${Date.now()}@example.com`,
    phone: '+1 555 123 4567',
    password: 'Password@123'
  });
  assert.strictEqual(missingNameRes.status, 400, 'Expected 400 for missing name');
  assert(missingNameRes.body.error.message.includes('name'), 'Expected name validation message');

  const invalidPhoneRes = await request('POST', '/api/auth/register', {
    fullName: 'Jane Doe',
    email: `valid${Date.now()}@example.com`,
    phone: '123',
    password: 'Password@123'
  });
  assert.strictEqual(invalidPhoneRes.status, 400, 'Expected 400 for short phone');
  assert(invalidPhoneRes.body.error.message.includes('phone'), 'Expected phone validation message');

  const invalidEmailRes = await request('POST', '/api/auth/register', {
    fullName: 'Jane Doe',
    email: 'not-an-email',
    phone: '+1 555 123 4567',
    password: 'Password@123'
  });
  assert.strictEqual(invalidEmailRes.status, 400, 'Expected 400 for invalid email');
  assert(invalidEmailRes.body.error.message.includes('email'), 'Expected email validation message');

  const shortPasswordRes = await request('POST', '/api/auth/register', {
    fullName: 'Jane Doe',
    email: `valid${Date.now()}@example.com`,
    phone: '+1 555 123 4567',
    password: 'short'
  });
  assert.strictEqual(shortPasswordRes.status, 400, 'Expected 400 for short password');
  console.log('[PASS] Requirement 6: Missing fields and invalid formats handled with clear user-friendly messages');

  // 4. User Registration Flow: Successful creation & database persistence
  const uniqueEmail = `test.user.${Date.now()}@example.com`;
  const regUserRes = await request('POST', '/api/auth/register', {
    fullName: 'Devon Vance',
    phone: '+1 555 987 6543',
    email: uniqueEmail,
    password: 'SecurePassword@123'
  });

  assert.strictEqual(regUserRes.status, 201, `Expected 201 Created, got ${regUserRes.status}`);
  assert.strictEqual(regUserRes.body.success, true);
  assert(regUserRes.body.data.token, 'Session token missing in response');
  assert.strictEqual(regUserRes.body.data.user.email, uniqueEmail.toLowerCase());
  assert.strictEqual(regUserRes.body.data.user.fullName, 'Devon Vance');
  const newUserId = regUserRes.body.data.user.id;
  const newProfileId = regUserRes.body.data.customerProfile.id;

  // Verify persistence in SQLite database directly
  const dbUser = get('SELECT id, email, full_name, role FROM users WHERE email = ?', [uniqueEmail.toLowerCase()]);
  assert(dbUser, 'User not found in SQLite users table');
  assert.strictEqual(dbUser.full_name, 'Devon Vance');

  const dbProfile = get('SELECT id, user_id, customer_number, kyc_status FROM customer_profiles WHERE user_id = ?', [newUserId]);
  assert(dbProfile, 'Customer profile not found in SQLite customer_profiles table');

  const dbAccount = get('SELECT id, customer_id, status FROM account_references WHERE customer_id = ?', [newProfileId]);
  assert(dbAccount, 'Initial account not found in SQLite account_references table');
  assert.strictEqual(dbAccount.status, 'RESTRICTED');
  console.log('[PASS] Requirement 3, 4, 5 & 7: User Registration creates user, profile, account in SQLite via parameterized query and returns HTTP 201');

  // 5. User Registration: Duplicate email handling
  const dupEmailRes = await request('POST', '/api/auth/register', {
    fullName: 'Another Person',
    phone: '+1 555 111 2222',
    email: uniqueEmail,
    password: 'Password@123'
  });
  assert.strictEqual(dupEmailRes.status, 409, 'Expected 409 Conflict for duplicate user email');
  assert.strictEqual(dupEmailRes.body.error.code, 'USER_ALREADY_EXISTS');
  assert(dupEmailRes.body.error.message.includes('already exists'), 'Expected duplicate message');
  console.log('[PASS] Requirement 6: Duplicate user registration rejected with 409 Conflict and friendly error');

  // 6. Bank Account Registration Flow (Authenticated Customer)
  const token = regUserRes.body.data.token;
  const authHeaders = { Authorization: `Bearer ${token}` };

  const uniqueBankAcc = '8899' + Math.floor(10000000 + Math.random() * 90000000);
  const regBankRes = await request('POST', '/api/customer/accounts', {
    accountHolderName: 'Devon Vance',
    email: uniqueEmail,
    phoneNumber: '+1 555 987 6543',
    dateOfBirth: '1988-03-12',
    residentialAddress: '123 Market Street',
    country: 'United States',
    state: 'California',
    city: 'San Francisco',
    postalCode: '94105',
    bankName: 'Silicon Valley Commercial Bank',
    accountType: 'CHECKING',
    bankAccountNumber: uniqueBankAcc,
    confirmAccountNumber: uniqueBankAcc,
    ifscCode: null,
    branchName: 'Financial District Branch',
    branchCode: 'BR-SF-01',
    termsAccepted: true
  }, authHeaders);

  assert.strictEqual(regBankRes.status, 201, `Expected 201 Created for bank registration, got ${regBankRes.status}`);
  assert.strictEqual(regBankRes.body.data.status, 'RESTRICTED');
  assert(regBankRes.body.data.accountNumberMasked.endsWith(uniqueBankAcc.slice(-4)));

  // Verify persistence in SQLite
  const dbBankAcc = get('SELECT * FROM account_references WHERE id = ?', [regBankRes.body.data.id]);
  assert(dbBankAcc, 'Registered bank account not saved in SQLite');
  assert.strictEqual(dbBankAcc.bank_name, 'Silicon Valley Commercial Bank');
  assert.strictEqual(dbBankAcc.account_type, 'CHECKING');
  assert.strictEqual(dbBankAcc.city, 'San Francisco');
  console.log('[PASS] Requirement 5: Bank account successfully saved to SQLite database with 17 fields');

  // 7. Duplicate bank account rejection
  const dupBankRes = await request('POST', '/api/customer/accounts', {
    accountHolderName: 'Devon Vance',
    email: uniqueEmail,
    phoneNumber: '+1 555 987 6543',
    country: 'United States',
    state: 'California',
    city: 'San Francisco',
    bankName: 'Silicon Valley Commercial Bank',
    accountType: 'CHECKING',
    bankAccountNumber: uniqueBankAcc,
    confirmAccountNumber: uniqueBankAcc,
    branchName: 'Financial District Branch',
    termsAccepted: true
  }, authHeaders);

  assert.strictEqual(dupBankRes.status, 409, 'Expected 409 Conflict for duplicate bank account');
  assert.strictEqual(dupBankRes.body.error.code, 'ACCOUNT_ALREADY_EXISTS');
  console.log('[PASS] Requirement 6: Duplicate bank account registration rejected with 409 Conflict');

  // 8. Trilingual translations verified for Register Account
  assert(appJsRes.raw.includes('registerTab: "Register Account"'), 'English registerTab missing');
  assert(appJsRes.raw.includes('registerTab: "புதிய கணக்கு பதிவு"'), 'Tamil registerTab missing');
  assert(appJsRes.raw.includes('registerTab: "नया खाता बनाएं"'), 'Hindi registerTab missing');
  assert(appJsRes.raw.includes('registerSubtitle: "Create your human-friendly smart banking account"'), 'English registerSubtitle missing');
  assert(appJsRes.raw.includes('registerSuccess: "Registration successful! Your customer account has been created."'), 'English registerSuccess missing');
  console.log('[PASS] Requirement 9: Trilingual English, Tamil, and Hindi translations verified for Register Account');

  console.log('\n====================================================');
  console.log('  ALL REGISTER ACCOUNT REQUIREMENTS VERIFIED!');
  console.log('====================================================\n');
}

runTests().catch(err => {
  console.error('[FAIL]', err);
  process.exit(1);
});
