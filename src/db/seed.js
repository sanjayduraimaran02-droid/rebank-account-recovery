const bcrypt = require('bcryptjs');
const { getDb, resetDatabase, run, get } = require('./database');

async function seed() {
  console.log('[Seed] Resetting and re-seeding database...');
  resetDatabase();

  const salt = await bcrypt.genSalt(10);
  const customerPasswordHash = await bcrypt.hash('Customer@123', salt);
  const reviewerPasswordHash = await bcrypt.hash('Reviewer@123', salt);
  const approverPasswordHash = await bcrypt.hash('Approver@123', salt);
  const adminPasswordHash = await bcrypt.hash('Admin@123', salt);
  const analystPasswordHash = await bcrypt.hash('Analyst@123', salt);

  const now = new Date().toISOString();

  // 1. Seed Users
  const users = [
    {
      id: 'usr-customer-1002',
      email: 'elena.rostova@example.com',
      password_hash: customerPasswordHash,
      role: 'CUSTOMER',
      full_name: 'Elena Rostova',
      phone: '+1 (555) 234-5678',
      mfa_enabled: 0
    },
    {
      id: 'usr-customer-1001',
      email: 'john.doe@example.com',
      password_hash: customerPasswordHash,
      role: 'CUSTOMER',
      full_name: 'John Doe',
      phone: '+1 (555) 123-4567',
      mfa_enabled: 0
    },
    {
      id: 'usr-customer-1003',
      email: 'marcus.vance@example.com',
      password_hash: customerPasswordHash,
      role: 'CUSTOMER',
      full_name: 'Marcus Vance',
      phone: '+1 (555) 876-5432',
      mfa_enabled: 0
    },
    {
      id: 'usr-reviewer-1',
      email: 'reviewer@rebank.internal',
      password_hash: reviewerPasswordHash,
      role: 'REVIEWER',
      full_name: 'Alex Mercer (Maker L1)',
      phone: '+1 (555) 999-0001',
      mfa_enabled: 1
    },
    {
      id: 'usr-approver-1',
      email: 'approver@rebank.internal',
      password_hash: approverPasswordHash,
      role: 'APPROVER',
      full_name: 'Diana Ross (Checker L2)',
      phone: '+1 (555) 999-0002',
      mfa_enabled: 1
    },
    {
      id: 'usr-fraud-1',
      email: 'fraud.analyst@rebank.internal',
      password_hash: analystPasswordHash,
      role: 'FRAUD_ANALYST',
      full_name: 'Samantha Reed (Fraud Specialist)',
      phone: '+1 (555) 999-0003',
      mfa_enabled: 1
    },
    {
      id: 'usr-admin-1',
      email: 'admin@rebank.internal',
      password_hash: adminPasswordHash,
      role: 'ADMIN',
      full_name: 'System Administrator',
      phone: '+1 (555) 999-9999',
      mfa_enabled: 1
    }
  ];

  for (const u of users) {
    run(
      `INSERT INTO users (id, email, password_hash, role, full_name, phone, mfa_enabled, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [u.id, u.email, u.password_hash, u.role, u.full_name, u.phone, u.mfa_enabled, now, now]
    );
  }

  // 2. Seed Customer Profiles
  const profiles = [
    {
      id: 'prof-1002',
      user_id: 'usr-customer-1002',
      customer_number: 'CUST-1002',
      address: '742 Evergreen Terrace, Springfield, IL',
      date_of_birth: '1989-04-12',
      risk_rating: 'MEDIUM',
      nationality: 'US',
      kyc_status: 'EXPIRED'
    },
    {
      id: 'prof-1001',
      user_id: 'usr-customer-1001',
      customer_number: 'CUST-1001',
      address: '10 Downing St, London, UK',
      date_of_birth: '1982-11-23',
      risk_rating: 'LOW',
      nationality: 'GB',
      kyc_status: 'VERIFIED'
    },
    {
      id: 'prof-1003',
      user_id: 'usr-customer-1003',
      customer_number: 'CUST-1003',
      address: '45 Wall Street, New York, NY',
      date_of_birth: '1976-08-19',
      risk_rating: 'HIGH',
      nationality: 'US',
      kyc_status: 'VERIFIED'
    }
  ];

  for (const p of profiles) {
    run(
      `INSERT INTO customer_profiles (id, user_id, customer_number, address, date_of_birth, risk_rating, nationality, kyc_status, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [p.id, p.user_id, p.customer_number, p.address, p.date_of_birth, p.risk_rating, p.nationality, p.kyc_status, now, now]
    );
  }

  // 3. Seed Accounts
  const accounts = [
    {
      id: 'acc-1002',
      customer_id: 'prof-1002',
      account_number_masked: '•••• •••• •••• 1002',
      account_type: 'SAVINGS',
      currency: 'USD',
      balance: 5800.50,
      status: 'RESTRICTED',
      branch_code: 'BR-CHICAGO-04',
      cbs_account_ref: 'CBS-ACC-1002'
    },
    {
      id: 'acc-1001',
      customer_id: 'prof-1001',
      account_number_masked: '•••• •••• •••• 1001',
      account_type: 'CHECKING',
      currency: 'USD',
      balance: 14250.00,
      status: 'DORMANT',
      branch_code: 'BR-LONDON-01',
      cbs_account_ref: 'CBS-ACC-1001'
    },
    {
      id: 'acc-1003',
      customer_id: 'prof-1003',
      account_number_masked: '•••• •••• •••• 1003',
      account_type: 'BUSINESS',
      currency: 'USD',
      balance: 84000.00,
      status: 'FROZEN',
      branch_code: 'BR-NY-09',
      cbs_account_ref: 'CBS-ACC-1003'
    }
  ];

  for (const a of accounts) {
    run(
      `INSERT INTO account_references (id, customer_id, account_number_masked, account_type, currency, balance, status, branch_code, cbs_account_ref, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [a.id, a.customer_id, a.account_number_masked, a.account_type, a.currency, a.balance, a.status, a.branch_code, a.cbs_account_ref, now, now]
    );
  }

  // 4. Seed Restrictions
  const restrictions = [
    {
      id: 'rst-1002',
      account_id: 'acc-1002',
      restriction_code: 'KYC_EXPIRED',
      severity: 'MEDIUM',
      description: 'Regulatory KYC documentation has expired past the statutory 2-year refresh cycle. Outbound debits and wire transfers have been paused.',
      impacted_services: 'DEBITS_LOCKED,ONLINE_TRANSFERS_BLOCKED',
      resolution_checklist: JSON.stringify([
        'Upload valid Government ID (Passport, National ID or Driver License)',
        'Upload Proof of Address (< 90 days old utility bill or bank statement)',
        'Perform Real-time Biometric Liveness Face Match'
      ]),
      statutory_authority: 'Financial Consumer Regulatory Agency (FCRA)',
      court_ref_no: null,
      outstanding_balance: null
    },
    {
      id: 'rst-1001',
      account_id: 'acc-1001',
      restriction_code: 'DORMANT_INACTIVE',
      severity: 'LOW',
      description: 'Account has experienced zero customer-initiated transactions for 365+ consecutive days. Outbound operations locked to safeguard depositor funds.',
      impacted_services: 'DEBITS_LOCKED,ATM_WITHDRAWALS_BLOCKED',
      resolution_checklist: JSON.stringify([
        'Confirm current primary phone & email address',
        'Capture quick biometric selfie verification',
        'Sign electronic reactivation consent declaration'
      ]),
      statutory_authority: 'Central Banking Dormancy Directive Sec 14',
      court_ref_no: null,
      outstanding_balance: null
    },
    {
      id: 'rst-1003',
      account_id: 'acc-1003',
      restriction_code: 'AML_SUSPICIOUS_TXN',
      severity: 'HIGH',
      description: 'Automated AML monitoring triggered an alert on high-velocity wire transactions departing from historic account baseline profile.',
      impacted_services: 'ALL_TRANSACTIONS_BLOCKED,CARDS_SUSPENDED',
      resolution_checklist: JSON.stringify([
        'Provide written declaration of economic purpose for flagged wires',
        'Upload commercial sales invoices or executed contracts',
        'Submit corporate source of wealth documentation'
      ]),
      statutory_authority: 'Financial Intelligence & AML Directorate',
      court_ref_no: 'AML-ALERT-2026-9081',
      outstanding_balance: null
    }
  ];

  for (const r of restrictions) {
    run(
      `INSERT INTO account_restrictions (id, account_id, restriction_code, severity, description, impacted_services, resolution_checklist, statutory_authority, court_ref_no, outstanding_balance, applied_at, is_active, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)`,
      [r.id, r.account_id, r.restriction_code, r.severity, r.description, r.impacted_services, r.resolution_checklist, r.statutory_authority, r.court_ref_no, r.outstanding_balance, now, now, now]
    );
  }

  // 5. Seed Demo Recovery Requests
  // Request 1: John Doe - Already reviewed by Alex Mercer (Maker), pending L2 approval by Diana Ross (Checker)
  const reqJohn = {
    id: 'req-john-1001',
    reference_number: 'REB-2026-10492',
    customer_id: 'prof-1001',
    account_id: 'acc-1001',
    restriction_id: 'rst-1001',
    category_code: 'DORMANT_INACTIVE',
    status: 'REVIEWED_PENDING_APPROVAL',
    priority: 'MEDIUM',
    customer_explanation: 'Relocated overseas temporarily for work. Resuming local transactions now.',
    source_of_funds: 'Employment Salary / Savings',
    contact_confirmed: 1,
    consent_signed: 1,
    assigned_reviewer_id: 'usr-reviewer-1',
    assigned_approver_id: null,
    submitted_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 2).toISOString()
  };

  run(
    `INSERT INTO recovery_requests (id, reference_number, customer_id, account_id, restriction_id, category_code, status, priority, customer_explanation, source_of_funds, contact_confirmed, consent_signed, assigned_reviewer_id, assigned_approver_id, submitted_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [reqJohn.id, reqJohn.reference_number, reqJohn.customer_id, reqJohn.account_id, reqJohn.restriction_id, reqJohn.category_code, reqJohn.status, reqJohn.priority, reqJohn.customer_explanation, reqJohn.source_of_funds, reqJohn.contact_confirmed, reqJohn.consent_signed, reqJohn.assigned_reviewer_id, reqJohn.assigned_approver_id, reqJohn.submitted_at, reqJohn.updated_at]
  );

  // Status history for John's request
  run(
    `INSERT INTO request_status_histories (id, recovery_request_id, previous_status, new_status, changed_by_user_id, actor_role, notes, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ['hist-1', reqJohn.id, null, 'SUBMITTED', 'usr-customer-1001', 'CUSTOMER', 'Customer submitted reactivation application with selfie liveness.', reqJohn.submitted_at]
  );
  run(
    `INSERT INTO request_status_histories (id, recovery_request_id, previous_status, new_status, changed_by_user_id, actor_role, notes, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ['hist-2', reqJohn.id, 'SUBMITTED', 'UNDER_REVIEW', 'usr-reviewer-1', 'REVIEWER', 'L1 Analyst claimed case for KYC and biometric verification.', new Date(Date.now() - 3600000 * 3).toISOString()]
  );
  run(
    `INSERT INTO request_status_histories (id, recovery_request_id, previous_status, new_status, changed_by_user_id, actor_role, notes, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ['hist-3', reqJohn.id, 'UNDER_REVIEW', 'REVIEWED_PENDING_APPROVAL', 'usr-reviewer-1', 'REVIEWER', 'Verified identity. Biometric match 96%. Recommended for CBS hold release.', reqJohn.updated_at]
  );

  // Maker decision for John
  run(
    `INSERT INTO review_decisions (id, recovery_request_id, reviewer_id, decision_type, notes, risk_score, four_eyes_validation_passed, created_at)
     VALUES (?, ?, ?, ?, ?, ?, 1, ?)`,
    ['dec-1', reqJohn.id, 'usr-reviewer-1', 'RECOMMEND_APPROVAL', 'Contact confirmed via secondary channel. Biometric liveness check passed with 96% confidence score. Recommending release.', 15, reqJohn.updated_at]
  );

  // Documents for John
  run(
    `INSERT INTO documents (id, recovery_request_id, document_type, file_name, mime_type, file_size, file_path, file_url, verification_status, ocr_extracted_data, ocr_confidence_score, face_match_score, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ['doc-1', reqJohn.id, 'SELFIE_LIVENESS', 'john_doe_liveness_selfie.jpg', 'image/jpeg', 245000, 'uploads/john_doe_liveness_selfie.jpg', '/uploads/demo_selfie.jpg', 'VERIFIED', JSON.stringify({ liveness: 'PASS', blinkTest: 'PASS' }), 0.99, 0.96, reqJohn.submitted_at]
  );

  // Request 2: Marcus Vance - In UNDER_REVIEW state, claimed by Reviewer Alex Mercer
  const reqMarcus = {
    id: 'req-marcus-1003',
    reference_number: 'REB-2026-10501',
    customer_id: 'prof-1003',
    account_id: 'acc-1003',
    restriction_id: 'rst-1003',
    category_code: 'AML_SUSPICIOUS_TXN',
    status: 'UNDER_REVIEW',
    priority: 'HIGH',
    customer_explanation: 'Receipt of commercial invoice settlement from foreign trading partner.',
    source_of_funds: 'Commercial Export Contract',
    contact_confirmed: 1,
    consent_signed: 1,
    assigned_reviewer_id: 'usr-reviewer-1',
    submitted_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 3600000).toISOString()
  };

  run(
    `INSERT INTO recovery_requests (id, reference_number, customer_id, account_id, restriction_id, category_code, status, priority, customer_explanation, source_of_funds, contact_confirmed, consent_signed, assigned_reviewer_id, submitted_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [reqMarcus.id, reqMarcus.reference_number, reqMarcus.customer_id, reqMarcus.account_id, reqMarcus.restriction_id, reqMarcus.category_code, reqMarcus.status, reqMarcus.priority, reqMarcus.customer_explanation, reqMarcus.source_of_funds, reqMarcus.contact_confirmed, reqMarcus.consent_signed, reqMarcus.assigned_reviewer_id, reqMarcus.submitted_at, reqMarcus.updated_at]
  );

  run(
    `INSERT INTO request_status_histories (id, recovery_request_id, previous_status, new_status, changed_by_user_id, actor_role, notes, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ['hist-4', reqMarcus.id, null, 'SUBMITTED', 'usr-customer-1003', 'CUSTOMER', 'Submitted invoice proof and source of funds declaration.', reqMarcus.submitted_at]
  );
  run(
    `INSERT INTO request_status_histories (id, recovery_request_id, previous_status, new_status, changed_by_user_id, actor_role, notes, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    ['hist-5', reqMarcus.id, 'SUBMITTED', 'UNDER_REVIEW', 'usr-reviewer-1', 'REVIEWER', 'High-risk case claimed for AML source verification.', reqMarcus.updated_at]
  );

  // Documents for Marcus
  run(
    `INSERT INTO documents (id, recovery_request_id, document_type, file_name, mime_type, file_size, file_path, file_url, verification_status, ocr_extracted_data, ocr_confidence_score, face_match_score, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ['doc-2', reqMarcus.id, 'SOURCE_OF_FUNDS', 'export_contract_inv_884.pdf', 'application/pdf', 512000, 'uploads/export_contract.pdf', '/uploads/export_contract.pdf', 'VERIFIED', JSON.stringify({ counterparty: 'Nordic Commodities AS', amount: 84000, invoiceNo: 'INV-884-2026' }), 0.94, null, reqMarcus.submitted_at]
  );

  // 6. Seed Notifications
  const notifications = [
    {
      id: 'notif-1',
      user_id: 'usr-customer-1002',
      title: 'Action Required: Account KYC Expired',
      message: 'Your savings account (•••• 1002) has an expired KYC document. Please submit your recovery packet to restore outbound transfers.',
      type: 'WARNING',
      delivery_channel: 'IN_APP',
      created_at: now
    },
    {
      id: 'notif-2',
      user_id: 'usr-customer-1001',
      title: 'Recovery Packet Under Review',
      message: 'Your recovery request REB-2026-10492 has passed L1 Maker inspection and is queued for final L2 managerial sign-off.',
      type: 'INFO',
      delivery_channel: 'SMS',
      created_at: reqJohn.updated_at
    },
    {
      id: 'notif-3',
      user_id: 'usr-customer-1003',
      title: 'AML Review In Progress',
      message: 'Case REB-2026-10501 is being reviewed by the Financial Crimes Compliance desk.',
      type: 'INFO',
      delivery_channel: 'EMAIL',
      created_at: reqMarcus.updated_at
    }
  ];

  for (const n of notifications) {
    run(
      `INSERT INTO notifications (id, user_id, title, message, type, read_status, delivery_channel, created_at)
       VALUES (?, ?, ?, ?, ?, 0, ?, ?)`,
      [n.id, n.user_id, n.title, n.message, n.type, n.delivery_channel, n.created_at]
    );
  }

  // 7. Seed Complaints
  run(
    `INSERT INTO complaints (id, customer_id, recovery_request_id, subject, category, description, status, escalation_tier, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?)`,
    ['comp-1', 'prof-1003', 'req-marcus-1003', 'Delayed Wire Transfer Release', 'SLA_DELAY', 'Business payroll is pending while the high-velocity wire is held. Requesting expedited triage.', 'INVESTIGATING', reqMarcus.updated_at, reqMarcus.updated_at]
  );

  // 8. Seed Initial Audit Log
  const auditEntries = [
    {
      id: 'aud-1',
      actor_id: 'usr-admin-1',
      actor_role: 'ADMIN',
      action: 'SYSTEM_BOOTSTRAP',
      entity_type: 'SYSTEM',
      entity_id: 'SYSTEM_CONFIG',
      ip_address: '127.0.0.1',
      user_agent: 'ReBank Engine/1.0',
      details: JSON.stringify({ message: 'ReBank core database seeded and schema initialized with 6 restriction categories.' }),
      timestamp: now
    },
    {
      id: 'aud-2',
      actor_id: 'usr-reviewer-1',
      actor_role: 'REVIEWER',
      action: 'CASE_CLAIMED',
      entity_type: 'RECOVERY_REQUEST',
      entity_id: 'req-john-1001',
      ip_address: '10.0.4.12',
      user_agent: 'ReBank Ops Portal/Chrome',
      details: JSON.stringify({ referenceNumber: 'REB-2026-10492', action: 'Claimed case from L1 queue' }),
      timestamp: new Date(Date.now() - 3600000 * 3).toISOString()
    },
    {
      id: 'aud-3',
      actor_id: 'usr-reviewer-1',
      actor_role: 'REVIEWER',
      action: 'RECOMMEND_APPROVAL',
      entity_type: 'RECOVERY_REQUEST',
      entity_id: 'req-john-1001',
      ip_address: '10.0.4.12',
      user_agent: 'ReBank Ops Portal/Chrome',
      details: JSON.stringify({ referenceNumber: 'REB-2026-10492', fourEyesEnforced: true, riskScore: 15 }),
      timestamp: reqJohn.updated_at
    }
  ];

  for (const aud of auditEntries) {
    run(
      `INSERT INTO audit_events (id, actor_id, actor_role, action, entity_type, entity_id, ip_address, user_agent, details, timestamp)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [aud.id, aud.actor_id, aud.actor_role, aud.action, aud.entity_type, aud.entity_id, aud.ip_address, aud.user_agent, aud.details, aud.timestamp]
    );
  }

  // 9. Seed Fraud Rules
  const fraudRules = [
    {
      id: 'rule-1',
      rule_code: 'RULE_VELOCITY_SPIKE',
      name: 'Rapid High-Velocity Transaction Outflow',
      description: 'Flags more than 3 transactions exceeding $10,000 within a 15-minute window.',
      severity: 'HIGH',
      threshold_value: 10000,
      is_enabled: 1
    },
    {
      id: 'rule-2',
      rule_code: 'RULE_CREDENTIAL_STUFFING',
      name: 'Repeated Failed Login Attempts',
      description: 'Detects multiple failed credential attempts followed by immediate recovery request.',
      severity: 'CRITICAL',
      threshold_value: 5,
      is_enabled: 1
    },
    {
      id: 'rule-3',
      rule_code: 'RULE_ANOMALOUS_GEOLOCATION',
      name: 'Cross-Border Geolocation Mismatch',
      description: 'Flags authentication or transfer sessions originating from atypical IP geographies.',
      severity: 'MEDIUM',
      threshold_value: 0,
      is_enabled: 1
    },
    {
      id: 'rule-4',
      rule_code: 'RULE_SUSPICIOUS_DEVICE',
      name: 'Unrecognized Device Fingerprint',
      description: 'Flags requests originating from newly observed hardware fingerprints or headless emulators.',
      severity: 'MEDIUM',
      threshold_value: 0,
      is_enabled: 1
    },
    {
      id: 'rule-5',
      rule_code: 'RULE_OFF_HOURS_HIGH_VALUE',
      name: 'Off-Hours High-Value Wire Initiation',
      description: 'Wire transfers above $50,000 triggered outside core local banking clearing hours.',
      severity: 'HIGH',
      threshold_value: 50000,
      is_enabled: 1
    }
  ];

  for (const fr of fraudRules) {
    run(
      `INSERT INTO fraud_rules (id, rule_code, name, description, severity, threshold_value, is_enabled, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [fr.id, fr.rule_code, fr.name, fr.description, fr.severity, fr.threshold_value, fr.is_enabled, now, now]
    );
  }

  // 10. Seed Fraud Alerts
  const fraudAlerts = [
    {
      id: 'frd-1003',
      alert_code: 'FRD-2026-89104',
      account_id: 'acc-1003',
      customer_id: 'prof-1003',
      alert_type: 'HIGH_VALUE_TRANSFER',
      severity: 'HIGH',
      risk_score: 78,
      reasons: JSON.stringify([
        'Outflow wire of $84,000 to offshore jurisdiction departed from historical baseline',
        'Beneficiary entity newly created within last 30 days',
        'Initiated immediately after credential password reset'
      ]),
      status: 'INVESTIGATING',
      assigned_analyst_id: 'usr-fraud-1',
      resolution_disposition: null,
      investigation_notes: 'Analyst Samantha Reed reviewing export contract INV-884-2026 and foreign clearinghouse routing code.'
    },
    {
      id: 'frd-1001',
      alert_code: 'FRD-2026-89105',
      account_id: 'acc-1001',
      customer_id: 'prof-1001',
      alert_type: 'FAILED_LOGINS',
      severity: 'MEDIUM',
      risk_score: 42,
      reasons: JSON.stringify([
        '3 consecutive failed password attempts prior to successful biometric recovery submission',
        'Device browser user-agent changed from Windows desktop to Mobile Safari'
      ]),
      status: 'ACKNOWLEDGED',
      assigned_analyst_id: 'usr-fraud-1',
      resolution_disposition: null,
      investigation_notes: 'Acknowledged. Customer confirmed legitimate overseas travel relocation.'
    },
    {
      id: 'frd-1002',
      alert_code: 'FRD-2026-89106',
      account_id: 'acc-1002',
      customer_id: 'prof-1002',
      alert_type: 'SUSPICIOUS_DEVICE',
      severity: 'LOW',
      risk_score: 18,
      reasons: JSON.stringify([
        'First time access from modern mobile device profile',
        'Standard KYC document expiration trigger'
      ]),
      status: 'NEW',
      assigned_analyst_id: null,
      resolution_disposition: null,
      investigation_notes: null
    }
  ];

  for (const fa of fraudAlerts) {
    run(
      `INSERT INTO fraud_alerts (id, alert_code, account_id, customer_id, alert_type, severity, risk_score, reasons, status, assigned_analyst_id, resolution_disposition, investigation_notes, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [fa.id, fa.alert_code, fa.account_id, fa.customer_id, fa.alert_type, fa.severity, fa.risk_score, fa.reasons, fa.status, fa.assigned_analyst_id, fa.resolution_disposition, fa.investigation_notes, now, now]
    );
  }

  // 11. Seed Customer Consents
  const demoConsents = [
    // Elena Rostova (prof-1002)
    { id: 'cns-elena-1', customer_id: 'prof-1002', consent_type: 'DIGITAL_KYC_VERIFICATION', consent_version: 'v2.1', granted: 1 },
    { id: 'cns-elena-2', customer_id: 'prof-1002', consent_type: 'BIOMETRIC_DATA_PROCESSING', consent_version: 'v2.1', granted: 1 },
    { id: 'cns-elena-3', customer_id: 'prof-1002', consent_type: 'CREDIT_BUREAU_INQUIRY', consent_version: 'v1.4', granted: 1 },
    { id: 'cns-elena-4', customer_id: 'prof-1002', consent_type: 'DATA_RETENTION_POLICY', consent_version: 'v3.0', granted: 1 },
    // John Doe (prof-1001)
    { id: 'cns-john-1', customer_id: 'prof-1001', consent_type: 'DIGITAL_KYC_VERIFICATION', consent_version: 'v2.1', granted: 1 },
    { id: 'cns-john-2', customer_id: 'prof-1001', consent_type: 'BIOMETRIC_DATA_PROCESSING', consent_version: 'v2.1', granted: 1 },
    { id: 'cns-john-3', customer_id: 'prof-1001', consent_type: 'CREDIT_BUREAU_INQUIRY', consent_version: 'v1.4', granted: 1 },
    { id: 'cns-john-4', customer_id: 'prof-1001', consent_type: 'DATA_RETENTION_POLICY', consent_version: 'v3.0', granted: 1 },
    // Marcus Vance (prof-1003)
    { id: 'cns-marcus-1', customer_id: 'prof-1003', consent_type: 'DIGITAL_KYC_VERIFICATION', consent_version: 'v2.1', granted: 1 },
    { id: 'cns-marcus-2', customer_id: 'prof-1003', consent_type: 'BIOMETRIC_DATA_PROCESSING', consent_version: 'v2.1', granted: 1 },
    { id: 'cns-marcus-3', customer_id: 'prof-1003', consent_type: 'CREDIT_BUREAU_INQUIRY', consent_version: 'v1.4', granted: 0 },
    { id: 'cns-marcus-4', customer_id: 'prof-1003', consent_type: 'DATA_RETENTION_POLICY', consent_version: 'v3.0', granted: 1 }
  ];

  for (const c of demoConsents) {
    run(
      `INSERT INTO customer_consents (id, customer_id, consent_type, consent_version, granted, ip_address, user_agent, timestamp)
       VALUES (?, ?, ?, ?, ?, '127.0.0.1', 'Mozilla/5.0 ReBank Client', ?)`,
      [c.id, c.customer_id, c.consent_type, c.consent_version, c.granted, now]
    );
  }

  // 12. Seed Banks Catalog
  const banks = [
    { id: 'bnk-sbi', bank_name: 'State Bank of India', bank_code: 'SBIN', ifsc_prefix: 'SBIN000', network: 'NEFT, RTGS, IMPS, UPI', branches_count: 22000, toll_free: '1800 1234 / 1800 2100' },
    { id: 'bnk-hdfc', bank_name: 'HDFC Bank', bank_code: 'HDFC', ifsc_prefix: 'HDFC000', network: 'NEFT, RTGS, IMPS, UPI', branches_count: 8500, toll_free: '1800 202 6161 / 1800 1600' },
    { id: 'bnk-icici', bank_name: 'ICICI Bank', bank_code: 'ICIC', ifsc_prefix: 'ICIC000', network: 'NEFT, RTGS, IMPS, UPI', branches_count: 6000, toll_free: '1800 1080 / 1800 102 4242' },
    { id: 'bnk-pnb', bank_name: 'Punjab National Bank', bank_code: 'PUNB', ifsc_prefix: 'PUNB000', network: 'NEFT, RTGS, IMPS, UPI', branches_count: 10000, toll_free: '1800 180 2222 / 1800 103 2222' },
    { id: 'bnk-bob', bank_name: 'Bank of Baroda', bank_code: 'BARB', ifsc_prefix: 'BARB000', network: 'NEFT, RTGS, IMPS, UPI', branches_count: 8200, toll_free: '1800 5700 / 1800 258 4455' },
    { id: 'bnk-axis', bank_name: 'Axis Bank', bank_code: 'UTIB', ifsc_prefix: 'UTIB000', network: 'NEFT, RTGS, IMPS, UPI', branches_count: 5000, toll_free: '1860 419 5555 / 1860 500 5555' },
    { id: 'bnk-canara', bank_name: 'Canara Bank', bank_code: 'CNRB', ifsc_prefix: 'CNRB000', network: 'NEFT, RTGS, IMPS, UPI', branches_count: 9600, toll_free: '1800 425 0018 / 1800 103 0018' },
    { id: 'bnk-union', bank_name: 'Union Bank of India', bank_code: 'UBIN', ifsc_prefix: 'UBIN000', network: 'NEFT, RTGS, IMPS, UPI', branches_count: 8700, toll_free: '1800 22 22 44 / 1800 208 2244' },
    { id: 'bnk-kotak', bank_name: 'Kotak Mahindra Bank', bank_code: 'KKBK', ifsc_prefix: 'KKBK000', network: 'NEFT, RTGS, IMPS, UPI', branches_count: 1800, toll_free: '1860 266 2666' },
    { id: 'bnk-indus', bank_name: 'IndusInd Bank', bank_code: 'INDB', ifsc_prefix: 'INDB000', network: 'NEFT, RTGS, IMPS, UPI', branches_count: 2600, toll_free: '1860 267 7777 / 1800 209 0061' },
    { id: 'bnk-fed', bank_name: 'Federal Bank', bank_code: 'FDRL', ifsc_prefix: 'FDRL000', network: 'NEFT, RTGS, IMPS, UPI', branches_count: 1350, toll_free: '1800 425 1199 / 1800 420 1199' },
    { id: 'bnk-yes', bank_name: 'Yes Bank', bank_code: 'YESB', ifsc_prefix: 'YESB000', network: 'NEFT, RTGS, IMPS, UPI', branches_count: 1200, toll_free: '1800 1200 / 1800 103 1212' },
    { id: 'bnk-idbi', bank_name: 'IDBI Bank', bank_code: 'IBKL', ifsc_prefix: 'IBKL000', network: 'NEFT, RTGS, IMPS, UPI', branches_count: 1900, toll_free: '1800 209 4324 / 1800 22 1070' },
    { id: 'bnk-cbi', bank_name: 'Central Bank of India', bank_code: 'CBIN', ifsc_prefix: 'CBIN000', network: 'NEFT, RTGS, IMPS, UPI', branches_count: 4500, toll_free: '1800 22 1911' },
    { id: 'bnk-indian', bank_name: 'Indian Bank', bank_code: 'IDIB', ifsc_prefix: 'IDIB000', network: 'NEFT, RTGS, IMPS, UPI', branches_count: 5800, toll_free: '1800 425 00 000' },
    { id: 'bnk-iob', bank_name: 'Indian Overseas Bank', bank_code: 'IOBA', ifsc_prefix: 'IOBA000', network: 'NEFT, RTGS, IMPS, UPI', branches_count: 3200, toll_free: '1800 890 4445 / 1800 425 4445' },
    { id: 'bnk-boi', bank_name: 'Bank of India', bank_code: 'BKID', ifsc_prefix: 'BKID000', network: 'NEFT, RTGS, IMPS, UPI', branches_count: 5100, toll_free: '1800 103 1906 / 1800 220 229' },
    { id: 'bnk-uco', bank_name: 'UCO Bank', bank_code: 'UCBA', ifsc_prefix: 'UCBA000', network: 'NEFT, RTGS, IMPS, UPI', branches_count: 3100, toll_free: '1800 103 0123' },
    { id: 'bnk-rebk', bank_name: 'ReBank Federal', bank_code: 'REBK', ifsc_prefix: 'REBK000', network: 'NEFT, RTGS, IMPS, UPI', branches_count: 1450, toll_free: '1800 732 2651' },
    { id: 'bnk-citi', bank_name: 'Citibank N.A.', bank_code: 'CITI', ifsc_prefix: 'CITI000', network: 'NEFT, RTGS, IMPS, SWIFT', branches_count: 850, toll_free: '1860 210 2484' },
    { id: 'bnk-scb', bank_name: 'Standard Chartered Bank', bank_code: 'SCBL', ifsc_prefix: 'SCBL000', network: 'NEFT, RTGS, IMPS, SWIFT', branches_count: 100, toll_free: '1800 345 1000' },
    { id: 'bnk-hsbc', bank_name: 'HSBC India', bank_code: 'HSBC', ifsc_prefix: 'HSBC000', network: 'NEFT, RTGS, IMPS, SWIFT', branches_count: 80, toll_free: '1800 267 3456' },
    { id: 'bnk-chase', bank_name: 'JPMorgan Chase Bank', bank_code: 'CHAS', ifsc_prefix: 'CHAS000', network: 'SWIFT, ACH, Fedwire', branches_count: 4800, toll_free: '1800 935 9935' },
    { id: 'bnk-bofa', bank_name: 'Bank of America', bank_code: 'BOFA', ifsc_prefix: 'BOFA000', network: 'SWIFT, ACH, Fedwire', branches_count: 3900, toll_free: '1800 432 1000' }
  ];

  for (const b of banks) {
    run(
      `INSERT INTO banks_catalog (id, bank_name, bank_code, ifsc_prefix, network, branches_count, toll_free, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'ACTIVE')`,
      [b.id, b.bank_name, b.bank_code, b.ifsc_prefix, b.network, b.branches_count, b.toll_free]
    );
  }

  // 13. Seed Cards
  const demoCards = [
    {
      id: 'crd-1002-1',
      customer_id: 'prof-1002',
      account_id: 'acc-1002',
      card_type: 'RuPay Platinum Debit Card',
      card_number_masked: '•••• •••• •••• 4821',
      cardholder_name: 'Elena Rostova',
      expiry_date: '08/29',
      status: 'ACTIVE',
      is_online_enabled: 1,
      is_international_enabled: 0,
      daily_limit: 50000.0,
      created_at: now
    },
    {
      id: 'crd-1002-2',
      customer_id: 'prof-1002',
      account_id: 'acc-1002',
      card_type: 'Visa Signature Global Debit Card',
      card_number_masked: '•••• •••• •••• 7192',
      cardholder_name: 'Elena Rostova',
      expiry_date: '04/28',
      status: 'ACTIVE',
      is_online_enabled: 1,
      is_international_enabled: 1,
      daily_limit: 100000.0,
      created_at: now
    },
    {
      id: 'crd-1002-3',
      customer_id: 'prof-1002',
      account_id: 'acc-1002',
      card_type: 'Mastercard Titanium Business Debit Card',
      card_number_masked: '•••• •••• •••• 3045',
      cardholder_name: 'Elena Rostova',
      expiry_date: '10/30',
      status: 'ACTIVE',
      is_online_enabled: 1,
      is_international_enabled: 0,
      daily_limit: 75000.0,
      created_at: now
    },
    {
      id: 'crd-1002-4',
      customer_id: 'prof-1002',
      account_id: 'acc-1002',
      card_type: 'Millennia Cashback Credit Card',
      card_number_masked: '•••• •••• •••• 9104',
      cardholder_name: 'Elena Rostova',
      expiry_date: '11/30',
      status: 'ACTIVE',
      is_online_enabled: 1,
      is_international_enabled: 1,
      daily_limit: 150000.0,
      created_at: now
    },
    {
      id: 'crd-1002-5',
      customer_id: 'prof-1002',
      account_id: 'acc-1002',
      card_type: 'Infinite Luxury Metal Credit Card',
      card_number_masked: '•••• •••• •••• 5520',
      cardholder_name: 'Elena Rostova',
      expiry_date: '06/31',
      status: 'ACTIVE',
      is_online_enabled: 1,
      is_international_enabled: 1,
      daily_limit: 500000.0,
      created_at: now
    },
    {
      id: 'crd-1002-6',
      customer_id: 'prof-1002',
      account_id: 'acc-1002',
      card_type: 'Corporate Platinum Commercial Card',
      card_number_masked: '•••• •••• •••• 8829',
      cardholder_name: 'Elena Rostova',
      expiry_date: '01/29',
      status: 'ACTIVE',
      is_online_enabled: 1,
      is_international_enabled: 0,
      daily_limit: 300000.0,
      created_at: now
    },
    {
      id: 'crd-1001-1',
      customer_id: 'prof-1001',
      account_id: 'acc-1001',
      card_type: 'RuPay Platinum Debit Card',
      card_number_masked: '•••• •••• •••• 3318',
      cardholder_name: 'John Doe',
      expiry_date: '05/28',
      status: 'ACTIVE',
      is_online_enabled: 1,
      is_international_enabled: 0,
      daily_limit: 50000.0,
      created_at: now
    }
  ];

  for (const c of demoCards) {
    run(
      `INSERT INTO cards (id, customer_id, account_id, card_type, card_number_masked, cardholder_name, expiry_date, status, is_online_enabled, is_international_enabled, daily_limit, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [c.id, c.customer_id, c.account_id, c.card_type, c.card_number_masked, c.cardholder_name, c.expiry_date, c.status, c.is_online_enabled, c.is_international_enabled, c.daily_limit, c.created_at]
    );
  }

  // 14. Seed Deposits
  const demoDeposits = [
    {
      id: 'dep-1002-1',
      customer_id: 'prof-1002',
      account_id: 'acc-1002',
      deposit_type: 'FIXED_DEPOSIT',
      principal_amount: 10000.0,
      interest_rate: 6.85,
      tenure_months: 12,
      maturity_amount: 10685.0,
      start_date: '2026-01-15',
      maturity_date: '2027-01-15',
      status: 'ACTIVE',
      created_at: now
    },
    {
      id: 'dep-1002-2',
      customer_id: 'prof-1002',
      account_id: 'acc-1002',
      deposit_type: 'RECURRING_DEPOSIT',
      principal_amount: 500.0,
      interest_rate: 7.10,
      tenure_months: 24,
      maturity_amount: 12890.0,
      start_date: '2025-11-01',
      maturity_date: '2027-11-01',
      status: 'ACTIVE',
      created_at: now
    },
    {
      id: 'dep-1001-1',
      customer_id: 'prof-1001',
      account_id: 'acc-1001',
      deposit_type: 'FIXED_DEPOSIT',
      principal_amount: 25000.0,
      interest_rate: 7.00,
      tenure_months: 36,
      maturity_amount: 30750.0,
      start_date: '2025-06-10',
      maturity_date: '2028-06-10',
      status: 'ACTIVE',
      created_at: now
    }
  ];

  for (const d of demoDeposits) {
    run(
      `INSERT INTO deposits (id, customer_id, account_id, deposit_type, principal_amount, interest_rate, tenure_months, maturity_amount, start_date, maturity_date, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [d.id, d.customer_id, d.account_id, d.deposit_type, d.principal_amount, d.interest_rate, d.tenure_months, d.maturity_amount, d.start_date, d.maturity_date, d.status, d.created_at]
    );
  }

  // 15. Seed Transactions
  const demoTransactions = [
    {
      id: 'txn-1002-1',
      account_id: 'acc-1002',
      transaction_type: 'TRANSFER',
      amount: 1250.0,
      currency: 'USD',
      direction: 'DEBIT',
      description: 'Rent Payment - Apt 4B',
      recipient_name: 'Highland Properties LLC',
      recipient_account: 'US91REBK10028881',
      reference_number: 'TXN-2026-9001',
      status: 'COMPLETED',
      risk_score: 10,
      created_at: '2026-10-18T10:14:00Z'
    },
    {
      id: 'txn-1002-2',
      account_id: 'acc-1002',
      transaction_type: 'BILL_PAY',
      amount: 142.5,
      currency: 'USD',
      direction: 'DEBIT',
      description: 'Electricity Bill - PowerGrid Corp',
      recipient_name: 'PowerGrid Corp',
      recipient_account: 'PG-882190',
      reference_number: 'TXN-2026-9002',
      status: 'COMPLETED',
      risk_score: 5,
      created_at: '2026-10-15T14:32:00Z'
    },
    {
      id: 'txn-1002-3',
      account_id: 'acc-1002',
      transaction_type: 'SCAN_PAY',
      amount: 24.8,
      currency: 'USD',
      direction: 'DEBIT',
      description: 'Coffee & Bistro - QR Payment',
      recipient_name: 'Artisan Roasters Cafe',
      recipient_account: 'UPI-ARTISAN@REBK',
      reference_number: 'TXN-2026-9003',
      status: 'COMPLETED',
      risk_score: 8,
      created_at: '2026-10-14T09:20:00Z'
    },
    {
      id: 'txn-1002-4',
      account_id: 'acc-1002',
      transaction_type: 'TRANSFER',
      amount: 4500.0,
      currency: 'USD',
      direction: 'CREDIT',
      description: 'Monthly Payroll Direct Deposit',
      recipient_name: 'Vertex Systems Tech Inc',
      recipient_account: 'US88VERTEX001',
      reference_number: 'TXN-2026-9004',
      status: 'COMPLETED',
      risk_score: 0,
      created_at: '2026-10-01T08:00:00Z'
    },
    {
      id: 'txn-1002-5',
      account_id: 'acc-1002',
      transaction_type: 'INTEREST',
      amount: 48.75,
      currency: 'USD',
      direction: 'CREDIT',
      description: 'Quarterly Savings Interest Credit',
      recipient_name: 'ReBank Core Interest Engine',
      recipient_account: 'REBK-SYS-INT',
      reference_number: 'TXN-2026-9005',
      status: 'COMPLETED',
      risk_score: 0,
      created_at: '2026-09-30T23:59:00Z'
    },
    {
      id: 'txn-1002-6',
      account_id: 'acc-1002',
      transaction_type: 'BILL_PAY',
      amount: 65.0,
      currency: 'USD',
      direction: 'DEBIT',
      description: 'Mobile & Broadband Fiber',
      recipient_name: 'Metro Fiber Net',
      recipient_account: 'BILL-METRO-441',
      reference_number: 'TXN-2026-9006',
      status: 'COMPLETED',
      risk_score: 5,
      created_at: '2026-09-28T16:45:00Z'
    },
    {
      id: 'txn-1001-1',
      account_id: 'acc-1001',
      transaction_type: 'TRANSFER',
      amount: 850.0,
      currency: 'USD',
      direction: 'DEBIT',
      description: 'Online Electronics Purchase',
      recipient_name: 'GadgetStore Express',
      recipient_account: 'US44STORE891',
      reference_number: 'TXN-2026-8001',
      status: 'COMPLETED',
      risk_score: 12,
      created_at: '2026-10-17T11:22:00Z'
    },
    {
      id: 'txn-1001-2',
      account_id: 'acc-1001',
      transaction_type: 'TRANSFER',
      amount: 5200.0,
      currency: 'USD',
      direction: 'CREDIT',
      description: 'Direct Deposit Salary',
      recipient_name: 'Global Logistics Co',
      recipient_account: 'US12LOGIST99',
      reference_number: 'TXN-2026-8002',
      status: 'COMPLETED',
      risk_score: 0,
      created_at: '2026-10-01T08:00:00Z'
    }
  ];

  for (const t of demoTransactions) {
    run(
      `INSERT INTO transactions (id, account_id, transaction_type, amount, currency, direction, description, recipient_name, recipient_account, reference_number, status, risk_score, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [t.id, t.account_id, t.transaction_type, t.amount, t.currency, t.direction, t.description, t.recipient_name, t.recipient_account, t.reference_number, t.status, t.risk_score, t.created_at]
    );
  }

  console.log('[Seed] Database successfully populated with synthetic customers, staff, accounts, fraud telemetry, and demo workflow records.');
}

if (require.main === module) {
  seed()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error('[Seed Error]:', err);
      process.exit(1);
    });
}

module.exports = { seed };
