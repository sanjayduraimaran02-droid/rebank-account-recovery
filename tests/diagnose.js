const fs = require('fs');

const html = fs.readFileSync('public/index.html', 'utf8');
const js = fs.readFileSync('public/app.js', 'utf8');

// Find all document.getElementById calls
const idRegex = /getElementById\(['"]([^'"]+)['"]/g;
const ids = [];
let match;
while ((match = idRegex.exec(js)) !== null) {
  ids.push(match[1]);
}

const uniqueIds = [...new Set(ids)];
const missingFromHtml = uniqueIds.filter(id => {
  return !html.includes(`id="${id}"`) && !html.includes(`id='${id}'`);
});

console.log('--- DOM ID AUDIT ---');
console.log('Total getElementById calls:', ids.length);
console.log('Unique IDs queried:', uniqueIds.length);
console.log('Missing IDs from index.html:', missingFromHtml);

// Find all querySelector / querySelectorAll in app.js
const qsRegex = /querySelector(All)?\(['"]([^'"]+)['"]/g;
const selectors = [];
while ((match = qsRegex.exec(js)) !== null) {
  selectors.push(match[2]);
}
console.log('\n--- SELECTOR AUDIT ---');
console.log('Unique selectors:', [...new Set(selectors)]);
