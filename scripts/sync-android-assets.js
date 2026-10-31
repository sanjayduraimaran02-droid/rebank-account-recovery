const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..', 'public');
const destDir = path.resolve(__dirname, '..', 'android', 'app', 'src', 'main', 'assets', 'public');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const entries = fs.readdirSync(srcDir);
let count = 0;
for (const entry of entries) {
  const srcPath = path.join(srcDir, entry);
  const destPath = path.join(destDir, entry);
  const stat = fs.statSync(srcPath);
  if (stat.isFile()) {
    fs.copyFileSync(srcPath, destPath);
    count++;
  }
}

console.log(`[ReBank Android Sync] Copied ${count} web assets to ${destDir}`);
