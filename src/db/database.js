const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const DATA_DIR = process.env.DATA_DIR || (fs.existsSync(path.resolve(process.cwd(), 'data')) ? path.resolve(process.cwd(), 'data') : path.join(__dirname, '..', '..', 'data'));
const DB_FILE = path.join(DATA_DIR, 'rebank.db');
const SCHEMA_FILE = path.join(__dirname, 'schema.sql');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

let dbInstance = null;

function getDb() {
  if (!dbInstance) {
    dbInstance = new DatabaseSync(DB_FILE);
    dbInstance.exec('PRAGMA foreign_keys = ON;');
    dbInstance.exec('PRAGMA journal_mode = WAL;');
    initSchema();
  }
  return dbInstance;
}

function initSchema() {
  if (fs.existsSync(SCHEMA_FILE)) {
    const ddl = fs.readFileSync(SCHEMA_FILE, 'utf8');
    dbInstance.exec(ddl);
  }

  // Ensure dynamic columns exist for account_references
  try {
    const cols = dbInstance.prepare("PRAGMA table_info('account_references')").all().map(c => c.name);
    const neededCols = [
      { name: 'account_holder_name', type: 'TEXT' },
      { name: 'branch_name', type: 'TEXT' },
      { name: 'city', type: 'TEXT' },
      { name: 'state', type: 'TEXT' },
      { name: 'country', type: 'TEXT' },
      { name: 'ifsc_code', type: 'TEXT' },
      { name: 'phone_number', type: 'TEXT' },
      { name: 'bank_name', type: 'TEXT' },
      { name: 'email', type: 'TEXT' },
      { name: 'postal_code', type: 'TEXT' },
      { name: 'residential_address', type: 'TEXT' },
      { name: 'date_of_birth', type: 'TEXT' },
      { name: 'terms_accepted', type: 'INTEGER DEFAULT 1' }
    ];
    for (const col of neededCols) {
      if (!cols.includes(col.name)) {
        dbInstance.exec(`ALTER TABLE account_references ADD COLUMN ${col.name} ${col.type};`);
      }
    }

    const bCols = dbInstance.prepare("PRAGMA table_info('banks_catalog')").all().map(c => c.name);
    if (!bCols.includes('toll_free')) {
      dbInstance.exec("ALTER TABLE banks_catalog ADD COLUMN toll_free TEXT DEFAULT '1800 120 0000';");
    }
  } catch (e) {
    // Schema initialized cleanly
  }
}

/**
 * Execute a query returning a single row.
 */
function get(sql, params = []) {
  const db = getDb();
  const stmt = db.prepare(sql);
  return stmt.get(...params);
}

/**
 * Execute a query returning multiple rows.
 */
function all(sql, params = []) {
  const db = getDb();
  const stmt = db.prepare(sql);
  return stmt.all(...params);
}

/**
 * Execute an INSERT, UPDATE, or DELETE statement.
 */
function run(sql, params = []) {
  const db = getDb();
  const stmt = db.prepare(sql);
  return stmt.run(...params);
}

/**
 * Execute raw DDL or multiple statements.
 */
function exec(sql) {
  const db = getDb();
  return db.exec(sql);
}

/**
 * Execute multiple statements in a transaction.
 */
function transaction(fn) {
  const db = getDb();
  db.exec('BEGIN TRANSACTION;');
  try {
    const result = fn({ get, all, run, exec });
    db.exec('COMMIT;');
    return result;
  } catch (err) {
    db.exec('ROLLBACK;');
    throw err;
  }
}

/**
 * Cleanly reset and wipe database for testing / demo reset.
 */
function resetDatabase() {
  const db = getDb();
  db.exec('PRAGMA foreign_keys = OFF;');
  const tables = [
    'transactions',
    'deposits',
    'cards',
    'banks_catalog',
    'audit_events',
    'customer_consents',
    'fraud_alerts',
    'fraud_rules',
    'complaints',
    'notifications',
    'review_decisions',
    'documents',
    'request_status_histories',
    'recovery_requests',
    'account_restrictions',
    'account_references',
    'customer_profiles',
    'users'
  ];
  for (const table of tables) {
    db.exec(`DROP TABLE IF EXISTS ${table};`);
  }
  db.exec('PRAGMA foreign_keys = ON;');
  initSchema();
}

module.exports = {
  getDb,
  initSchema,
  get,
  all,
  run,
  exec,
  transaction,
  resetDatabase,
  DB_FILE
};
