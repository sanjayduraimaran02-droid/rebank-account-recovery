const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const modals = [
  'caseInspectModal',
  'helpModal',
  'privacyModal',
  'fraudAlertModal',
  'lockExplanationModal',
  'simulateTransferModal',
  'recoveryModal',
  'registerBankModal',
  'profileModal',
  'qrScannerModal'
];

modals.forEach(m => {
  const match = html.match(new RegExp('<div[^>]*id=["\']' + m + '["\'][^>]*>'));
  console.log(m, '-->', match ? match[0] : 'not found');
});
