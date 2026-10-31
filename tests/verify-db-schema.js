const { getDb } = require('../src/db/database');

const db = getDb();

console.log('--- DATABASE INTEGRITY AND SCHEMA AUDIT ---');

// 1. PRAGMA integrity_check
const integrity = db.prepare('PRAGMA integrity_check;').all();
console.log('Integrity Check:', integrity[0].integrity_check);
if (integrity[0].integrity_check !== 'ok') {
  console.error('Integrity check failed!');
  process.exit(1);
}

// 2. PRAGMA foreign_key_check
const fkCheck = db.prepare('PRAGMA foreign_key_check;').all();
console.log('Foreign Key Violations:', fkCheck.length);
if (fkCheck.length > 0) {
  console.error('Foreign key violations found:', fkCheck);
  process.exit(1);
}

// 3. Expected Tables
const expectedTables = [
  'users',
  'customer_profiles',
  'account_references',
  'account_restrictions',
  'recovery_requests',
  'request_status_histories',
  'documents',
  'review_decisions',
  'notifications',
  'complaints',
  'audit_events',
  'fraud_rules',
  'fraud_alerts',
  'customer_consents'
];

const existingTables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';").all().map(t => t.name);

console.log('\nExisting Tables (' + existingTables.length + '):', existingTables.join(', '));

let missingTables = [];
for (const table of expectedTables) {
  if (!existingTables.includes(table)) {
    missingTables.push(table);
  }
}

if (missingTables.length > 0) {
  console.error('Missing expected tables:', missingTables);
  process.exit(1);
}

// 4. Record counts per table
console.log('\nTable Record Counts:');
for (const table of expectedTables) {
  const count = db.prepare(`SELECT COUNT(*) as count FROM "${table}";`).get().count;
  console.log(` - ${table}: ${count} rows`);
}

// 5. Check account_references columns
const accCols = db.prepare("PRAGMA table_info('account_references')").all().map(c => c.name);
const expectedAccCols = [
  'id', 'customer_id', 'account_holder_name', 'branch_name', 'city', 'state', 'country',
  'account_number_masked', 'ifsc_code', 'phone_number', 'account_type', 'currency', 'balance',
  'status', 'branch_code', 'cbs_account_ref', 'created_at', 'updated_at'
];
const missingAccCols = expectedAccCols.filter(c => !accCols.includes(c));
if (missingAccCols.length > 0) {
  console.error('Missing columns in account_references:', missingAccCols);
  process.exit(1);
}
console.log('\nAccount Reference Columns verified:', accCols.length, 'columns present.');

console.log('\nSUCCESS: Database schema, tables, columns, and foreign keys are fully intact and healthy!');
process.exit(0);
