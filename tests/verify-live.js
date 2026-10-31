const http = require('http');
const PORT = process.env.PORT || 3000;

http.get(`http://localhost:${PORT}/`, (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    console.log('HTTP Status:', res.statusCode);
    console.log('Cache-Control:', res.headers['cache-control']);
    console.log('Contains styles stylesheet:', body.includes('styles.css'));
    console.log('Contains app.js script:', body.includes('app.js'));
    console.log('Contains langSwitcher:', body.includes('id="langSwitcher"'));
    console.log('Contains Tamil selector:', body.includes('data-lang="ta"'));
    console.log('Contains English selector:', body.includes('data-lang="en"'));
    console.log('Contains Hindi selector:', body.includes('data-lang="hi"'));
    console.log('Contains ReBank AI Assistant title:', body.includes('data-i18n="chatTitle">ReBank AI Assistant</div>'));
    console.log('Contains floating launcher:', body.includes('id="rebankChatLauncher"'));
    console.log('Contains My Home navigation:', body.includes('data-i18n="navHome"'));
    console.log('Contains My Accounts navigation:', body.includes('data-i18n="navAccounts"'));
    console.log('Contains Security Check navigation:', body.includes('data-i18n="navSecurityCheck"'));
    console.log('Contains Recent Activity navigation:', body.includes('data-i18n="navRecentActivity"'));
    console.log('Contains Help Center action:', body.includes('data-i18n="navHelpCenter"'));
    console.log('Contains Chat Typing Indicator:', body.includes('id="chatTypingIndicator"'));
    console.log('Contains Suggested Questions:', body.includes('id="chatSuggestedQuestions"'));
    process.exit(0);
  });
}).on('error', (err) => {
  console.error('Connection failed:', err.message);
  process.exit(1);
});
