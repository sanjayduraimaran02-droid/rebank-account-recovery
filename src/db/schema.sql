-- ReBank Relational Database Schema DDL
-- Compatible with SQLite and PostgreSQL syntax conventions

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL, -- CUSTOMER, REVIEWER, APPROVER, ADMIN
    full_name TEXT NOT NULL,
    phone TEXT,
    mfa_secret TEXT,
    mfa_enabled INTEGER DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS customer_profiles (
    id TEXT PRIMARY KEY,
    user_id TEXT UNIQUE NOT NULL,
    customer_number TEXT UNIQUE NOT NULL,
    address TEXT,
    date_of_birth TEXT,
    risk_rating TEXT DEFAULT 'LOW',
    nationality TEXT,
    kyc_status TEXT DEFAULT 'PENDING',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS account_references (
    id TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL,
    account_holder_name TEXT,
    branch_name TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    account_number_masked TEXT NOT NULL,
    ifsc_code TEXT,
    phone_number TEXT,
    account_type TEXT NOT NULL, -- SAVINGS, CHECKING, BUSINESS
    currency TEXT DEFAULT 'USD',
    balance REAL DEFAULT 0.0,
    status TEXT NOT NULL, -- ACTIVE, RESTRICTED, FROZEN, DORMANT
    branch_code TEXT,
    cbs_account_ref TEXT UNIQUE NOT NULL,
    bank_name TEXT,
    email TEXT,
    postal_code TEXT,
    residential_address TEXT,
    date_of_birth TEXT,
    terms_accepted INTEGER DEFAULT 1,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY(customer_id) REFERENCES customer_profiles(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS account_restrictions (
    id TEXT PRIMARY KEY,
    account_id TEXT NOT NULL,
    restriction_code TEXT NOT NULL, -- DORMANT_INACTIVE, KYC_EXPIRED, AML_SUSPICIOUS_TXN, SECURITY_COMPROMISED, COURT_ATTACHMENT_LIEN, OVERDRAFT_LIEN_HOLD
    severity TEXT NOT NULL, -- LOW, MEDIUM, HIGH, CRITICAL
    description TEXT NOT NULL,
    impacted_services TEXT NOT NULL,
    resolution_checklist TEXT NOT NULL,
    statutory_authority TEXT,
    court_ref_no TEXT,
    outstanding_balance REAL,
    applied_at TEXT NOT NULL,
    resolved_at TEXT,
    is_active INTEGER DEFAULT 1,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY(account_id) REFERENCES account_references(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS recovery_requests (
    id TEXT PRIMARY KEY,
    reference_number TEXT UNIQUE NOT NULL,
    customer_id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    restriction_id TEXT NOT NULL,
    category_code TEXT NOT NULL,
    status TEXT DEFAULT 'SUBMITTED', -- SUBMITTED, UNDER_REVIEW, INFO_REQUESTED, REVIEWED_PENDING_APPROVAL, APPROVED, REJECTED, RESTORED
    priority TEXT DEFAULT 'MEDIUM',
    customer_explanation TEXT,
    source_of_funds TEXT,
    contact_confirmed INTEGER DEFAULT 0,
    consent_signed INTEGER DEFAULT 0,
    assigned_reviewer_id TEXT,
    assigned_approver_id TEXT,
    cbs_transaction_ref TEXT,
    submitted_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    resolved_at TEXT,
    FOREIGN KEY(customer_id) REFERENCES customer_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY(account_id) REFERENCES account_references(id) ON DELETE CASCADE,
    FOREIGN KEY(restriction_id) REFERENCES account_restrictions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS request_status_histories (
    id TEXT PRIMARY KEY,
    recovery_request_id TEXT NOT NULL,
    previous_status TEXT,
    new_status TEXT NOT NULL,
    changed_by_user_id TEXT,
    actor_role TEXT NOT NULL,
    notes TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY(recovery_request_id) REFERENCES recovery_requests(id) ON DELETE CASCADE,
    FOREIGN KEY(changed_by_user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS documents (
    id TEXT PRIMARY KEY,
    recovery_request_id TEXT NOT NULL,
    document_type TEXT NOT NULL, -- GOVT_ID, PROOF_OF_ADDRESS, SOURCE_OF_FUNDS, SELFIE_LIVENESS, COURT_CLEARANCE
    file_name TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    file_path TEXT NOT NULL,
    file_url TEXT,
    verification_status TEXT DEFAULT 'VERIFIED',
    ocr_extracted_data TEXT,
    ocr_confidence_score REAL,
    face_match_score REAL,
    created_at TEXT NOT NULL,
    FOREIGN KEY(recovery_request_id) REFERENCES recovery_requests(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS review_decisions (
    id TEXT PRIMARY KEY,
    recovery_request_id TEXT NOT NULL,
    reviewer_id TEXT NOT NULL,
    decision_type TEXT NOT NULL, -- RECOMMEND_APPROVAL, REQUEST_MORE_INFO, REJECT, APPROVE_AND_UNFREEZE, ESCALATE
    notes TEXT,
    risk_score INTEGER,
    four_eyes_validation_passed INTEGER DEFAULT 1,
    created_at TEXT NOT NULL,
    FOREIGN KEY(recovery_request_id) REFERENCES recovery_requests(id) ON DELETE CASCADE,
    FOREIGN KEY(reviewer_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'INFO', -- INFO, WARNING, SUCCESS, ALERT
    read_status INTEGER DEFAULT 0,
    delivery_channel TEXT DEFAULT 'IN_APP', -- IN_APP, SMS, EMAIL
    metadata TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS complaints (
    id TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL,
    recovery_request_id TEXT,
    subject TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'OPEN', -- OPEN, INVESTIGATING, ESCALATED, RESOLVED, CLOSED
    resolution_notes TEXT,
    escalation_tier INTEGER DEFAULT 1,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY(customer_id) REFERENCES customer_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY(recovery_request_id) REFERENCES recovery_requests(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS audit_events (
    id TEXT PRIMARY KEY,
    actor_id TEXT,
    actor_role TEXT NOT NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    ip_address TEXT,
    user_agent TEXT,
    details TEXT,
    timestamp TEXT NOT NULL,
    FOREIGN KEY(actor_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS fraud_rules (
    id TEXT PRIMARY KEY,
    rule_code TEXT UNIQUE NOT NULL, -- e.g. RULE_VELOCITY_SPIKE, RULE_HIGH_RISK_GEO, RULE_CREDENTIAL_STUFFING
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    severity TEXT NOT NULL, -- LOW, MEDIUM, HIGH, CRITICAL
    threshold_value REAL DEFAULT 0,
    is_enabled INTEGER DEFAULT 1,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS fraud_alerts (
    id TEXT PRIMARY KEY,
    alert_code TEXT UNIQUE NOT NULL, -- e.g. FRD-2026-90412
    account_id TEXT NOT NULL,
    customer_id TEXT NOT NULL,
    alert_type TEXT NOT NULL, -- VELOCITY_SPIKE, FAILED_LOGINS, ANOMALOUS_GEOLOCATION, SUSPICIOUS_DEVICE, HIGH_VALUE_TRANSFER
    severity TEXT NOT NULL, -- LOW, MEDIUM, HIGH, CRITICAL
    risk_score INTEGER NOT NULL, -- 0 - 100
    reasons TEXT NOT NULL, -- JSON array of human-readable indicator strings
    status TEXT DEFAULT 'NEW', -- NEW, ACKNOWLEDGED, INVESTIGATING, ESCALATED, CLOSED
    assigned_analyst_id TEXT,
    resolution_disposition TEXT, -- FALSE_POSITIVE, CONFIRMED_FRAUD_PREVENTED, CUSTOMER_VERIFIED
    investigation_notes TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY(account_id) REFERENCES account_references(id) ON DELETE CASCADE,
    FOREIGN KEY(customer_id) REFERENCES customer_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY(assigned_analyst_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS customer_consents (
    id TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL,
    consent_type TEXT NOT NULL, -- DIGITAL_KYC_VERIFICATION, BIOMETRIC_DATA_PROCESSING, CREDIT_BUREAU_INQUIRY, DATA_RETENTION_POLICY
    consent_version TEXT NOT NULL, -- e.g. "v1.2"
    granted INTEGER DEFAULT 1,
    ip_address TEXT,
    user_agent TEXT,
    timestamp TEXT NOT NULL,
    FOREIGN KEY(customer_id) REFERENCES customer_profiles(id) ON DELETE CASCADE
);

-- Indexes for high-performance query execution
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_account_customer ON account_references(customer_id);
CREATE INDEX IF NOT EXISTS idx_restriction_account ON account_restrictions(account_id);
CREATE INDEX IF NOT EXISTS idx_recovery_customer ON recovery_requests(customer_id);
CREATE INDEX IF NOT EXISTS idx_recovery_ref ON recovery_requests(reference_number);
CREATE INDEX IF NOT EXISTS idx_recovery_status ON recovery_requests(status);
CREATE INDEX IF NOT EXISTS idx_status_history_req ON request_status_histories(recovery_request_id);
CREATE INDEX IF NOT EXISTS idx_documents_req ON documents(recovery_request_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_complaints_customer ON complaints(customer_id);
CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON audit_events(timestamp);
CREATE INDEX IF NOT EXISTS idx_fraud_alerts_status ON fraud_alerts(status);
CREATE INDEX IF NOT EXISTS idx_fraud_alerts_account ON fraud_alerts(account_id);
CREATE INDEX IF NOT EXISTS idx_customer_consents ON customer_consents(customer_id);

-- Modern Banking Core Extension Tables
CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,
    account_id TEXT NOT NULL,
    transaction_type TEXT NOT NULL, -- TRANSFER, BILL_PAY, SCAN_PAY, DEPOSIT, INTEREST
    amount REAL NOT NULL,
    currency TEXT DEFAULT 'USD',
    direction TEXT NOT NULL, -- DEBIT, CREDIT
    description TEXT NOT NULL,
    recipient_name TEXT,
    recipient_account TEXT,
    reference_number TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'COMPLETED', -- COMPLETED, PENDING, REJECTED
    risk_score INTEGER DEFAULT 0,
    created_at TEXT NOT NULL,
    FOREIGN KEY(account_id) REFERENCES account_references(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS deposits (
    id TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    deposit_type TEXT NOT NULL, -- FIXED_DEPOSIT, RECURRING_DEPOSIT
    principal_amount REAL NOT NULL,
    interest_rate REAL NOT NULL,
    tenure_months INTEGER NOT NULL,
    maturity_amount REAL NOT NULL,
    start_date TEXT NOT NULL,
    maturity_date TEXT NOT NULL,
    status TEXT DEFAULT 'ACTIVE', -- ACTIVE, MATURED, CLOSED
    created_at TEXT NOT NULL,
    FOREIGN KEY(customer_id) REFERENCES customer_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY(account_id) REFERENCES account_references(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cards (
    id TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL,
    account_id TEXT NOT NULL,
    card_type TEXT NOT NULL, -- PLATINUM_DEBIT, GOLD_CREDIT, RUPAY_CLASSIC
    card_number_masked TEXT NOT NULL,
    cardholder_name TEXT NOT NULL,
    expiry_date TEXT NOT NULL,
    status TEXT DEFAULT 'ACTIVE', -- ACTIVE, FROZEN, BLOCKED
    is_online_enabled INTEGER DEFAULT 1,
    is_international_enabled INTEGER DEFAULT 0,
    daily_limit REAL DEFAULT 50000.0,
    created_at TEXT NOT NULL,
    FOREIGN KEY(customer_id) REFERENCES customer_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY(account_id) REFERENCES account_references(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS banks_catalog (
    id TEXT PRIMARY KEY,
    bank_name TEXT NOT NULL,
    bank_code TEXT UNIQUE NOT NULL,
    ifsc_prefix TEXT NOT NULL,
    network TEXT DEFAULT 'NEFT, RTGS, IMPS, UPI',
    branches_count INTEGER DEFAULT 1200,
    toll_free TEXT DEFAULT '1800 120 0000',
    status TEXT DEFAULT 'ACTIVE'
);

CREATE INDEX IF NOT EXISTS idx_transactions_account ON transactions(account_id);
CREATE INDEX IF NOT EXISTS idx_transactions_created ON transactions(created_at);
CREATE INDEX IF NOT EXISTS idx_deposits_customer ON deposits(customer_id);
CREATE INDEX IF NOT EXISTS idx_cards_customer ON cards(customer_id);
