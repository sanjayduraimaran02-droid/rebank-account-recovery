const fs = require('fs');
const html = fs.readFileSync('public/index.html', 'utf8');
const js = fs.readFileSync('public/app.js', 'utf8');

// Find all buttons with id
const btnRegex = /<button[^>]*\bid=["']([^"']+)["'][^>]*>/gi;
let match;
const buttonsWithId = [];
while ((match = btnRegex.exec(html)) !== null) {
  buttonsWithId.push(match[1]);
}

console.log('Total buttons with ID in HTML:', buttonsWithId.length);
const unhandledButtons = [];
for (const id of buttonsWithId) {
  if (!js.includes(id)) {
    unhandledButtons.push(id);
  }
}
console.log('Buttons with ID NOT mentioned in app.js:', unhandledButtons);

// Check all forms with ID
const formRegex = /<form[^>]*\bid=["']([^"']+)["'][^>]*>/gi;
const formsWithId = [];
while ((match = formRegex.exec(html)) !== null) {
  formsWithId.push(match[1]);
}
console.log('Total forms with ID in HTML:', formsWithId.length);
const unhandledForms = [];
for (const id of formsWithId) {
  if (!js.includes(id)) {
    unhandledForms.push(id);
  }
}
console.log('Forms with ID NOT mentioned in app.js:', unhandledForms);

// Check buttons WITHOUT id
const btnNoIdRegex = /<button(?![^>]*\bid=)[^>]*>/gi;
const buttonsWithoutId = html.match(btnNoIdRegex) || [];
console.log('Buttons without ID:', buttonsWithoutId);
