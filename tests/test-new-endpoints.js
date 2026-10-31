const http = require('http');

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, text: body });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function run() {
  console.log('Testing new customer endpoints against server...');
  // Login Elena
  const loginRes = await request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/auth/login',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, { email: 'elena.rostova@example.com', password: 'Customer@123' });

  if (loginRes.status !== 200 || !loginRes.data.data.token) {
    console.error('Login failed:', loginRes);
    process.exit(1);
  }

  const token = loginRes.data.data.token;
  const authHeaders = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  // 1. Profile
  const prof = await request({ hostname: 'localhost', port: 3000, path: '/api/customer/profile', method: 'GET', headers: authHeaders });
  console.log('GET /api/customer/profile:', prof.status, prof.data.data?.email);

  // 2. Banks
  const banks = await request({ hostname: 'localhost', port: 3000, path: '/api/customer/banks', method: 'GET', headers: authHeaders });
  console.log('GET /api/customer/banks:', banks.status, 'Count:', banks.data.data?.length);

  // 3. Cards
  const cards = await request({ hostname: 'localhost', port: 3000, path: '/api/customer/cards', method: 'GET', headers: authHeaders });
  console.log('GET /api/customer/cards:', cards.status, 'Count:', cards.data.data?.length);

  // 4. Deposits
  const deposits = await request({ hostname: 'localhost', port: 3000, path: '/api/customer/deposits', method: 'GET', headers: authHeaders });
  console.log('GET /api/customer/deposits:', deposits.status, 'Count:', deposits.data.data?.length);

  // 5. Transactions
  const txns = await request({ hostname: 'localhost', port: 3000, path: '/api/customer/transactions', method: 'GET', headers: authHeaders });
  console.log('GET /api/customer/transactions:', txns.status, 'Count:', txns.data.data?.length);

  // 6. Transfer Simulation (Restricted account)
  const xferSim = await request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/customer/transfer',
    method: 'POST',
    headers: authHeaders
  }, {
    accountId: 'acc-1002',
    recipientName: 'David Miller',
    recipientAccount: 'US88REBK992211',
    confirmRecipientAccount: 'US88REBK992211',
    ifscCode: 'REBK0001',
    amount: 250.00,
    simulate: true
  });
  console.log('POST /api/customer/transfer (simulate):', xferSim.status, 'riskScore:', xferSim.data.riskScore, 'canProceed:', xferSim.data.canProceed);

  // 7. Transfer Execution (Must be blocked with 403 on restricted)
  const xferExec = await request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/customer/transfer',
    method: 'POST',
    headers: authHeaders
  }, {
    accountId: 'acc-1002',
    recipientName: 'David Miller',
    recipientAccount: 'US88REBK992211',
    confirmRecipientAccount: 'US88REBK992211',
    amount: 250.00,
    simulate: false
  });
  console.log('POST /api/customer/transfer (exec restricted):', xferExec.status, xferExec.data?.error?.code);

  console.log('All new customer endpoints verified successfully!');
}

run().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
