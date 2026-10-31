const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');
const js = fs.readFileSync('public/app.js', 'utf8');

// Extract all data-i18n attributes from index.html
const i18nRegex = /data-i18n=["']([^"']+)["']/g;
const htmlKeys = new Set();
let match;
while ((match = i18nRegex.exec(html)) !== null) {
  htmlKeys.add(match[1]);
}

// Extract I18N keys from app.js
const enMatch = js.match(/en:\s*\{([\s\S]*?)\},\s*ta:\s*\{([\s\S]*?)\},\s*hi:\s*\{([\s\S]*?)\}\s*\};/);
if (!enMatch) {
  console.error('Could not parse trilingual I18N object from app.js');
  process.exit(1);
}

const enBlock = enMatch[1];
const taBlock = enMatch[2];
const hiBlock = enMatch[3];

const keyRegex = /([a-zA-Z0-9_]+)\s*:/g;

function getKeys(block) {
  const s = new Set();
  let m;
  const re = new RegExp(keyRegex.source, 'g');
  while ((m = re.exec(block)) !== null) {
    s.add(m[1]);
  }
  return s;
}

const enKeys = getKeys(enBlock);
const taKeys = getKeys(taBlock);
const hiKeys = getKeys(hiBlock);

console.log('HTML data-i18n keys found:', htmlKeys.size);
console.log('English keys defined:', enKeys.size);
console.log('Tamil keys defined:', taKeys.size);
console.log('Hindi keys defined:', hiKeys.size);

const missingInEn = [...htmlKeys].filter(k => !enKeys.has(k));
const missingInTa = [...htmlKeys].filter(k => !taKeys.has(k));
const missingInHi = [...htmlKeys].filter(k => !hiKeys.has(k));

if (missingInEn.length > 0) console.warn('Missing in English I18N:', missingInEn);
if (missingInTa.length > 0) console.warn('Missing in Tamil I18N:', missingInTa);
if (missingInHi.length > 0) console.warn('Missing in Hindi I18N:', missingInHi);

if (missingInEn.length === 0 && missingInTa.length === 0 && missingInHi.length === 0) {
  console.log('SUCCESS: All data-i18n keys are properly defined across English, Tamil, and Hindi dictionaries!');
  process.exit(0);
} else {
  process.exit(1);
}
