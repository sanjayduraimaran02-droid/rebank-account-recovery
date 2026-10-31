const assert = require('assert');

async function verify() {
  console.log('Testing Bank Account Lock Reasons & Resolution Encyclopedia...');

  // 1. Public API Endpoint
  const apiRes = await fetch('http://localhost:3000/api/lock-reasons');
  assert.strictEqual(apiRes.status, 200);
  const data = await apiRes.json();
  assert.strictEqual(data.success, true);
  assert.strictEqual(data.data.length, 8);
  console.log('  [PASS] Public API returned 8 comprehensive lock reasons');

  // Verify all 8 core reasons are present
  const expectedCodes = [
    'KYC_EXPIRED',
    'DORMANT_INACTIVE',
    'AML_SUSPICIOUS_TXN',
    'SECURITY_COMPROMISED',
    'CYBER_POLICE_FREEZE',
    'COURT_ATTACHMENT_LIEN',
    'OVERDRAFT_LIEN_HOLD',
    'EMERGENCY_PANIC_LOCK'
  ];
  const actualCodes = data.data.map(d => d.code);
  for (const c of expectedCodes) {
    assert.ok(actualCodes.includes(c), `Missing code: ${c}`);
  }
  console.log('  [PASS] All 8 required real-world freeze scenario codes verified');

  // 2. Frontend HTML Assets
  const htmlRes = await fetch('http://localhost:3000/');
  assert.strictEqual(htmlRes.status, 200);
  const html = await htmlRes.text();

  assert.ok(html.includes('id="viewLockReasons"'), 'HTML must contain viewLockReasons');
  assert.ok(html.includes('id="navItemLockReasons"'), 'HTML must contain navItemLockReasons');
  assert.ok(html.includes('id="actionLockReasons"'), 'HTML must contain actionLockReasons');
  assert.ok(html.includes('id="lockReasonsGrid"'), 'HTML must contain lockReasonsGrid');
  assert.ok(html.includes('id="lockReasonsSearchInput"'), 'HTML must contain lockReasonsSearchInput');
  assert.ok(html.includes('id="lockReasonsCategoryPills"'), 'HTML must contain lockReasonsCategoryPills');
  assert.ok(html.includes('id="diagnosticSymptomSelect"'), 'HTML must contain diagnosticSymptomSelect');
  assert.ok(html.includes('id="runDiagnosticBtn"'), 'HTML must contain runDiagnosticBtn');
  assert.ok(html.includes('id="authLockGuideBanner"'), 'HTML must contain authLockGuideBanner');
  assert.ok(html.includes('id="openPublicLockReasonsBtn"'), 'HTML must contain openPublicLockReasonsBtn');
  console.log('  [PASS] HTML markup contains all dedicated view containers, nav tabs, quick actions & diagnostic tools');

  // 3. Frontend JS Assets
  const jsRes = await fetch('http://localhost:3000/app.js?v=20261022_v3');
  assert.strictEqual(jsRes.status, 200);
  const js = await jsRes.text();

  assert.ok(js.includes('loadLockReasonsView'), 'JS must have loadLockReasonsView');
  assert.ok(js.includes('initLockReasons'), 'JS must have initLockReasons');
  assert.ok(js.includes('openPublicLockReasons'), 'JS must have openPublicLockReasons');
  assert.ok(js.includes('startUnlockForReason'), 'JS must have startUnlockForReason');
  assert.ok(js.includes('askAiAboutLockReason'), 'JS must have askAiAboutLockReason');
  assert.ok(js.includes('resetLockReasonsFilters'), 'JS must have resetLockReasonsFilters');
  assert.ok(js.includes('viewLockReasons'), 'JS must route to viewLockReasons');
  assert.ok(js.includes('actionLockReasons'), 'JS must bind actionLockReasons');
  console.log('  [PASS] JS bundle provides all reactive controllers, routing hashes & modal helpers');

  // 4. CSS Assets
  const cssRes = await fetch('http://localhost:3000/styles.css');
  assert.strictEqual(cssRes.status, 200);
  const css = await cssRes.text();
  assert.ok(css.includes('.lock-reason-card'), 'CSS must define .lock-reason-card');
  assert.ok(css.includes('.category-pill'), 'CSS must define .category-pill');
  assert.ok(css.includes('.reason-ops-matrix'), 'CSS must define .reason-ops-matrix');
  assert.ok(css.includes('.highlight-card'), 'CSS must define .highlight-card');
  console.log('  [PASS] CSS stylesheet includes complete styling for cards, pills, matrices & highlights');

  console.log('\n====================================================');
  console.log('  LOCK REASONS ENCYCLOPEDIA VERIFICATION PASSED 100%');
  console.log('====================================================\n');
}

verify().catch(err => {
  console.error('[FAIL]', err);
  process.exit(1);
});
