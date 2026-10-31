const crypto = require('crypto');
const { get, all, run } = require('../db/database');
const { recordAudit } = require('../middleware/auditLogger');

/**
 * Supported consent categories
 */
const CONSENT_CATALOG = [
  {
    type: 'DIGITAL_KYC_VERIFICATION',
    name: 'Digital KYC & Identity Registry Verification',
    version: 'v2.1',
    description: 'Authorization to cross-reference identity documents with certified national registries and official issuing databases.',
    isMandatory: true
  },
  {
    type: 'BIOMETRIC_DATA_PROCESSING',
    name: 'Biometric Liveness & Facial Geometry Analysis',
    version: 'v2.1',
    description: 'Consent for automated geometric facial feature vector extraction strictly for anti-spoofing and customer identity validation during account recovery.',
    isMandatory: true
  },
  {
    type: 'CREDIT_BUREAU_INQUIRY',
    name: 'Automated Account Hold & Negative Balance Verification',
    version: 'v1.4',
    description: 'Consent to query clearinghouse balance holds and statutory lien registers to expedite restriction releases.',
    isMandatory: false
  },
  {
    type: 'DATA_RETENTION_POLICY',
    name: 'Statutory 7-Year AML/BSA Audit Trail Retention',
    version: 'v3.0',
    description: 'Statutory regulatory acknowledgment that compliance recovery case records are archived in tamper-evident storage for mandatory legal audit periods.',
    isMandatory: true
  }
];

/**
 * Retrieve consent records for a customer
 */
function getCustomerConsents(customerId) {
  const recorded = all(
    'SELECT * FROM customer_consents WHERE customer_id = ? ORDER BY timestamp DESC',
    [customerId]
  );

  return CONSENT_CATALOG.map(cat => {
    const existing = recorded.find(r => r.consent_type === cat.type);
    return {
      ...cat,
      granted: existing ? Boolean(existing.granted) : cat.isMandatory,
      lastUpdated: existing ? existing.timestamp : null,
      consentId: existing ? existing.id : null
    };
  });
}

/**
 * Record or update a customer consent decision
 */
function recordCustomerConsent(customerId, { consentType, consentVersion = 'v2.1', granted = true, ipAddress = '127.0.0.1', userAgent = 'Browser' }) {
  const cat = CONSENT_CATALOG.find(c => c.type === consentType);
  if (!cat) {
    const err = new Error(`Unrecognized consent type: ${consentType}`);
    err.status = 400;
    throw err;
  }

  const id = 'cns-' + crypto.randomUUID();
  const now = new Date().toISOString();

  run(
    `INSERT INTO customer_consents (id, customer_id, consent_type, consent_version, granted, ip_address, user_agent, timestamp)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [id, customerId, consentType, consentVersion, granted ? 1 : 0, ipAddress, userAgent, now]
  );

  recordAudit({
    actorId: null,
    actorRole: 'CUSTOMER',
    action: granted ? 'PRIVACY_CONSENT_GRANTED' : 'PRIVACY_CONSENT_REVOKED',
    entityType: 'CUSTOMER_CONSENT',
    entityId: id,
    ipAddress,
    userAgent,
    details: { consentType, consentVersion, granted: Boolean(granted) }
  });

  return get('SELECT * FROM customer_consents WHERE id = ?', [id]);
}

/**
 * Complete privacy statement disclosures
 */
function getPrivacyPolicy() {
  return {
    policyTitle: 'ReBank Account Recovery & Data Privacy Framework',
    effectiveDate: '2026-01-01',
    dataClassification: 'PCI-DSS & ISO 27001 Restricted Financial Telemetry',
    principles: [
      {
        title: 'Zero Credential Storage',
        detail: 'ReBank never collects, transmits, or stores account passwords, UPI/ATM PINs, CVVs, or raw one-time passwords (OTPs).'
      },
      {
        title: 'Ephemeral Biometric Verification',
        detail: 'Facial liveness verification extracts temporary mathematical feature vectors solely to verify live user presence. No raw facial templates are sold or shared with commercial marketing entities.'
      },
      {
        title: 'Role-Based Need-to-Know Access',
        detail: 'Customer identity artifacts and uploaded records can only be inspected by authorized Bank Makers and Checkers handling the specific open recovery ticket.'
      },
      {
        title: 'Immutable Redacted Audit Trails',
        detail: 'All administrative, reviewer, and core hold actions are cryptographically logged with actor IDs and timestamps, with personal secrets completely redacted.'
      }
    ],
    consents: CONSENT_CATALOG
  };
}

module.exports = {
  getCustomerConsents,
  recordCustomerConsent,
  getPrivacyPolicy,
  CONSENT_CATALOG
};
