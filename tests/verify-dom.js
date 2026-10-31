const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const js = fs.readFileSync('public/app.js', 'utf8');

// Extract all id="..." and id='...' from index.html
const idRegex = /id=["']([^"']+)["']/g;
const htmlIds = new Set();
let match;
while ((match = idRegex.exec(html)) !== null) {
  htmlIds.add(match[1]);
}

// Extract all getElementById("...") from app.js
const getElemRegex = /getElementById\(["']([^"']+)["']\)/g;
const jsIds = new Set();
while ((match = getElemRegex.exec(js)) !== null) {
  jsIds.add(match[1]);
}

console.log('HTML defined IDs: ' + htmlIds.size);
console.log('JS referenced IDs: ' + jsIds.size);

const missing = [];
for (const id of jsIds) {
  if (!htmlIds.has(id)) {
    missing.push(id);
  }
}

if (missing.length === 0) {
  console.log('SUCCESS: All ' + jsIds.size + ' element IDs referenced in public/app.js exist in public/index.html!');
  process.exit(0);
} else {
  console.warn('Elements referenced in JS but NOT found in HTML:', missing);
  process.exit(1);
}
