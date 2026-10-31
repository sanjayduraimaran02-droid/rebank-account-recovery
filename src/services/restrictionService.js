const { get, all } = require('../db/database');

const RESTRICTION_CONFIGS = {
  KYC_EXPIRED: {
    title: 'KYC Document Expired',
    titleTa: 'KYC ஆவணம் காலாவதியானது',
    titleHi: 'केवाईसी दस्तावेज़ समाप्त (KYC Expired)',
    slaHours: 4,
    eligibleForDigitalRecovery: true,
    requiredDocuments: ['GOVT_ID', 'PROOF_OF_ADDRESS', 'SELFIE_LIVENESS'],
    remediationSteps: [
      'Upload valid Government ID (Passport, Driving License, or National ID)',
      'Upload Proof of Address (< 90 days old utility bill or bank statement)',
      'Perform Biometric Liveness Face Match'
    ],
    riskTier: 'MEDIUM'
  },
  DORMANT_INACTIVE: {
    title: 'Dormant / Inactive Account',
    titleTa: 'செயலற்ற கணக்கு (Dormant)',
    titleHi: 'निष्क्रिय खाता (Dormant / Inactive)',
    slaHours: 2,
    eligibleForDigitalRecovery: true,
    requiredDocuments: ['SELFIE_LIVENESS'],
    remediationSteps: [
      'Confirm current residential contact details',
      'Capture quick biometric selfie verification',
      'Sign electronic reactivation consent declaration'
    ],
    riskTier: 'LOW'
  },
  AML_SUSPICIOUS_TXN: {
    title: 'AML Transaction Compliance Review',
    titleTa: 'AML பணப்பரிவர்த்தனை இணக்க மறுஆய்வு',
    titleHi: 'एएमएल लेनदेन अनुपालन समीक्षा (AML Review)',
    slaHours: 24,
    eligibleForDigitalRecovery: true,
    requiredDocuments: ['SOURCE_OF_FUNDS', 'GOVT_ID'],
    remediationSteps: [
      'Provide statement on the economic rationale for the flagged transaction',
      'Upload commercial sales invoices or executed contracts',
      'Submit corporate source of wealth documentation'
    ],
    riskTier: 'HIGH'
  },
  SECURITY_COMPROMISED: {
    title: 'Security / Credential Compromise Lock',
    titleTa: 'பாதுகாப்பு / நற்சான்றிதழ் முடக்கம்',
    titleHi: 'सुरक्षा / क्रेडेंशियल समझौता लॉक',
    slaHours: 2,
    eligibleForDigitalRecovery: true,
    requiredDocuments: ['SELFIE_LIVENESS'],
    remediationSteps: [
      'Complete secondary channel multi-factor authentication',
      'Biometric facial verification against recorded baseline',
      'Execute guided credential rotation'
    ],
    riskTier: 'HIGH'
  },
  COURT_ATTACHMENT_LIEN: {
    title: 'Court / Statutory Regulatory Lien',
    titleTa: 'நீதிமன்றம் / சட்டப்பூர்வ பற்று முடக்கம்',
    titleHi: 'न्यायालय / वैधानिक नियामक ग्रहणाधिकार',
    slaHours: 72,
    eligibleForDigitalRecovery: true,
    requiredDocuments: ['COURT_CLEARANCE'],
    remediationSteps: [
      'Review official court writ and executing authority notice',
      'Upload Court Satisfaction Order or Tax Clearance Certificate',
      'Submit legal dismissal decree'
    ],
    riskTier: 'CRITICAL'
  },
  OVERDRAFT_LIEN_HOLD: {
    title: 'Overdraft / Negative Balance Lien',
    titleTa: 'மிகைப்பற்று / எதிர்மறை இருப்பு முடக்கம்',
    titleHi: 'ओवरड्राफ्ट / नकारात्मक शेष ग्रहणाधिकार',
    slaHours: 2,
    eligibleForDigitalRecovery: true,
    requiredDocuments: [],
    remediationSteps: [
      'Review outstanding overdue balance',
      'Confirm external repayment link or deposit authorization'
    ],
    riskTier: 'MEDIUM'
  },
  CYBER_POLICE_FREEZE: {
    title: 'Cyber Crime Police / 1930 Portal Notice Freeze',
    titleTa: 'சைபர் கிரைம் காவல்துறை / 1930 புகார் முடக்கம்',
    titleHi: 'साइबर क्राइम पुलिस / 1930 पोर्टल नोटिस फ्रीज',
    slaHours: 72,
    eligibleForDigitalRecovery: true,
    requiredDocuments: ['POLICE_NOC', 'TRANSACTION_PROOF'],
    remediationSteps: [
      'Download Cyber Crime Notice details & Requisition Number',
      'Contact the investigating Nodal Police Officer',
      'Upload legitimate commercial proofs & Police Clearance NOC'
    ],
    riskTier: 'CRITICAL'
  },
  EMERGENCY_PANIC_LOCK: {
    title: 'Emergency Customer Panic / Stolen Device Lock',
    titleTa: 'அவசர வாடிக்கையாளர் பாதுகாப்பு முடக்கம்',
    titleHi: 'आपातकालीन ग्राहक सुरक्षा / खोया उपकरण लॉक',
    slaHours: 1,
    eligibleForDigitalRecovery: true,
    requiredDocuments: ['SELFIE_LIVENESS', 'GOVT_ID'],
    remediationSteps: [
      'Verify identity with registered 2-Factor OTP',
      'Perform biometric facial match against official record',
      'Reset NetBanking credentials and restore account security'
    ],
    riskTier: 'HIGH'
  }
};

const LOCK_REASONS_CATALOG = [
  {
    code: 'KYC_EXPIRED',
    category: 'KYC & Identity',
    categoryKey: 'catKyc',
    title: 'KYC Periodic Review Expired / Non-Compliance',
    titleTa: 'KYC ஆவண மறுசரிபார்ப்பு காலாவதி',
    titleHi: 'केवाईसी आवधिक समीक्षा समाप्त (KYC Expired)',
    regulatoryMandate: 'RBI Master Direction on KYC (Section 38) / FinCEN CDD Rule',
    plainExplanation: 'Banks are legally required to periodically refresh and verify customer identity and address records (Low Risk: every 10 years, Medium: 8 years, High: 2 years). When documents expire and notifications go unanswered, the Core Banking System automatically halts outbound debits to protect against identity theft.',
    plainExplanationTa: 'வங்கி விதிமுறைகளின்படி வாடிக்கையாளர் அடையாள மற்றும் முகவரி ஆவணங்கள் குறிப்பிட்ட கால இடைவெளியில் புதுப்பிக்கப்பட வேண்டும். ஆவணங்கள் காலாவதியாகும்போது வாடிக்கையாளர் நிதிப் பாதுகாப்பிற்காக வெளிப்பரிவர்த்தனைகள் முடக்கப்படும்.',
    plainExplanationHi: 'बैंकों को कानूनी रूप से ग्राहकों के पहचान और पते के रिकॉर्ड को समय-समय पर सत्यापित करना अनिवार्य होता है। समय सीमा समाप्त होने पर धोखाधड़ी से बचाने के लिए कोर बैंकिंग डेबिट लेनदेन को रोक देता है।',
    operationsMatrix: {
      credits: 'Permitted (Salary, Interest, Inbound Deposits)',
      debits: 'Blocked (UPI, NetBanking, Wires)',
      cards: 'Disabled for ATM / POS',
      netBanking: 'Restricted (View-only)'
    },
    remediationSteps: [
      'Complete Digital Video KYC (V-KYC) via the official banking app',
      'Upload valid Government ID (Passport, Driving License, Voter Card, or National ID)',
      'Upload Proof of Address (< 90 days old utility bill or bank statement)',
      'Perform biometric face-match liveness verification'
    ],
    requiredDocuments: ['GOVT_ID', 'PROOF_OF_ADDRESS', 'SELFIE_LIVENESS'],
    slaHours: 4,
    riskTier: 'MEDIUM',
    selfServiceAvailable: true
  },
  {
    code: 'DORMANT_INACTIVE',
    category: 'Account Inactivity',
    categoryKey: 'catInactivity',
    title: 'Dormant / Inactive Account (No Transactions for 12-24 Months)',
    titleTa: 'செயலற்ற கணக்கு (Dormant / Inactive)',
    titleHi: 'निष्क्रिय खाता (Dormant / Inactive Account)',
    regulatoryMandate: 'Banking Regulation Act Sec 26A / Unclaimed Balances Protection Act',
    plainExplanation: 'If no customer-induced transaction occurs for 12 months, the account becomes Inactive. After 24 months of total inactivity, it enters Dormant hold status to prevent unauthorized withdrawals by fraudsters or internal misuse of abandoned balances.',
    plainExplanationTa: '12 முதல் 24 மாதங்களாக வாடிக்கையாளரால் எந்தப் பரிவர்த்தனையும் செய்யப்படாத கணக்குகள் தானாகவே செயலற்ற நிலைக்கு மாற்றப்படும். திருட்டு மற்றும் தவறான பயன்பாட்டைத் தடுக்கவே இந்த பாதுகாப்பு நடவடிக்கை.',
    plainExplanationHi: 'यदि 12 से 24 महीनों तक खाते में कोई लेनदेन नहीं होता है, तो सुरक्षा कारणों से खाते को निष्क्रिय (Dormant) कर दिया जाता है ताकि इसका कोई दुरुपयोग न कर सके।',
    operationsMatrix: {
      credits: 'Permitted (Accrued interest, dividend deposits)',
      debits: 'Blocked (Transfers and withdrawals disabled)',
      cards: 'Suspended',
      netBanking: 'Restricted'
    },
    remediationSteps: [
      'Confirm current residential contact details and phone number',
      'Capture quick biometric selfie liveness verification',
      'Perform a small customer-initiated deposit or withdrawal to trigger CBS unfreeze'
    ],
    requiredDocuments: ['SELFIE_LIVENESS'],
    slaHours: 2,
    riskTier: 'LOW',
    selfServiceAvailable: true
  },
  {
    code: 'AML_SUSPICIOUS_TXN',
    category: 'Compliance & AML',
    categoryKey: 'catAml',
    title: 'Anti-Money Laundering (AML) / Unusual Velocity Alert',
    titleTa: 'AML பணப்பரிவர்த்தனை இணக்க மறுஆய்வு',
    titleHi: 'एएमएल लेनदेन अनुपालन समीक्षा (AML Velocity Alert)',
    regulatoryMandate: 'FATF Recommendations 10 & 20 / Prevention of Money Laundering Act',
    plainExplanation: 'Core Banking automated fraud algorithms flagged high-velocity transfers, unexpected foreign remittances, rapid turnover inconsistent with profile history, or split structuring (smurfing). Funds are locked until commercial legitimacy is verified.',
    plainExplanationTa: 'வழக்கத்திற்கு மாறான பெரிய அளவிலான பரிவர்த்தனைகள் அல்லது வேகமான பணப்பரிமாற்றங்கள் நிதி கண்காணிப்பு அல்காரிதத்தால் அடையாளம் காணப்பட்டு பரிவர்த்தனை நிறுத்தி வைக்கப்பட்டுள்ளது.',
    plainExplanationHi: 'खाते में असामान्य रूप से बड़े लेनदेन या त्वरित स्थानांतरण के कारण कोर बैंकिंग सुरक्षा प्रणाली द्वारा अनुपालन समीक्षा हेतु रोक लगाई गई है।',
    operationsMatrix: {
      credits: 'Under Compliance Review',
      debits: 'Blocked to prevent asset dissipation',
      cards: 'Temporarily Locked',
      netBanking: 'Restricted'
    },
    remediationSteps: [
      'Review flagged transaction reference numbers, timestamps, and counterparties',
      'Provide declaration of economic rationale (commercial invoice, salary contract, property deed)',
      'Upload commercial sales invoices or tax documentation through ReBank Compliance Portal',
      'Compliance Maker-Checker performs dual-control verification and CBS hold release'
    ],
    requiredDocuments: ['SOURCE_OF_FUNDS', 'GOVT_ID', 'COMMERCIAL_INVOICE'],
    slaHours: 24,
    riskTier: 'HIGH',
    selfServiceAvailable: true
  },
  {
    code: 'SECURITY_COMPROMISED',
    category: 'Security & Access',
    categoryKey: 'catSecurity',
    title: 'Credential Lockout / Multiple Failed PIN & Password Attempts',
    titleTa: 'பாதுகாப்பு / நற்சான்றிதழ் முடக்கம் (Failed PIN / Passwords)',
    titleHi: 'क्रेडेंशियल लॉक / कई बार गलत पिन या पासवर्ड (Credential Lock)',
    regulatoryMandate: 'NIST SP 800-63B Authentication Guidelines / Cyber Security Controls',
    plainExplanation: 'Entering 3 or more consecutive incorrect PIN, password, or OTP attempts triggers an automatic defensive lockout to protect against brute-force password guessing and unauthorized account takeover.',
    plainExplanationTa: 'தவறான PIN அல்லது கடவுச்சொல் 3 முறைக்கு மேல் உள்ளிடப்பட்டதால், கணக்கின் பாதுகாப்பிற்காக தானாகவே தற்காலிக முடக்கம் செய்யப்பட்டுள்ளது.',
    plainExplanationHi: 'लगातार 3 बार गलत पिन या पासवर्ड डालने के कारण खाता सुरक्षा प्रणाली द्वारा स्वचालित रूप से लॉक कर दिया गया है।',
    operationsMatrix: {
      credits: 'Normal (Deposits proceed uninterrupted)',
      debits: 'Digital channels locked; physical branch available with ID',
      cards: 'ATM / POS PIN locked',
      netBanking: 'Locked'
    },
    remediationSteps: [
      'Initiate Instant Self-Service Credential Reset using registered phone and email',
      'Complete 2-Factor Authentication (SMS OTP + Email Secure Token)',
      'Perform biometric facial match against registered baseline',
      'Set new strong password and transaction PIN to immediately unlock digital channels'
    ],
    requiredDocuments: ['REGISTERED_PHONE', 'SELFIE_LIVENESS'],
    slaHours: 1,
    riskTier: 'HIGH',
    selfServiceAvailable: true
  },
  {
    code: 'CYBER_POLICE_FREEZE',
    category: 'Legal & Cyber Crime',
    categoryKey: 'catLegal',
    title: 'Cyber Crime Police / 1930 Portal Notice Freeze',
    titleTa: 'சைபர் கிரைம் காவல்துறை / 1930 புகார் முடக்கம்',
    titleHi: 'साइबर क्राइम पुलिस / 1930 पोर्टल नोटिस फ्रीज',
    regulatoryMandate: 'Section 91 / 102 Code of Criminal Procedure (CrPC) / National Cyber Crime Portal (I4C)',
    plainExplanation: 'The bank received a formal statutory requisition from a State Police Cyber Cell or national fraud portal (1930 / cybercrime.gov.in) indicating that funds connected to an alleged digital fraud or scam entered this account.',
    plainExplanationTa: 'சைபர் கிரைம் காவல்துறை அல்லது தேசிய நிதி மோசடி புகார் போர்ட்டல் (1930) மூலம் பெறப்பட்ட உத்தியோகபூர்வ நோட்டீஸின் அடிப்படையில் இந்த முடக்கம் செய்யப்பட்டுள்ளது.',
    plainExplanationHi: 'साइबर अपराध सेल या राष्ट्रीय धोखाधड़ी पोर्टल (1930) से प्राप्त कानूनी नोटिस के आधार पर खाते पर विनियामक रोक लगाई गई है।',
    operationsMatrix: {
      credits: 'Permitted',
      debits: 'Lien on reported disputed amount or complete debit freeze',
      cards: 'Suspended',
      netBanking: 'Restricted'
    },
    remediationSteps: [
      'Download Cyber Crime Notice details, including Crime Incident ID & Requisition Order',
      'Contact the investigating Nodal Cyber Crime Officer listed in the requisition notice',
      'Submit legitimate commercial evidence (P2P transaction logs, invoice, merchant contract)',
      'Obtain official Police No Objection Certificate (NOC) or Revocation Order and upload to ReBank'
    ],
    requiredDocuments: ['POLICE_NOC', 'TRANSACTION_PROOF', 'GOVT_ID'],
    slaHours: 72,
    riskTier: 'CRITICAL',
    selfServiceAvailable: false
  },
  {
    code: 'COURT_ATTACHMENT_LIEN',
    category: 'Legal & Cyber Crime',
    categoryKey: 'catLegal',
    title: 'Court Attachment / Statutory Tax Authority Lien',
    titleTa: 'நீதிமன்றம் / சட்டப்பூர்வ வரி பற்று முடக்கம்',
    titleHi: 'न्यायालय / वैधानिक कर ग्रहणाधिकार (Court / Tax Lien)',
    regulatoryMandate: 'Code of Civil Procedure Order XXI / Income Tax Act Section 226(3)',
    plainExplanation: 'A statutory attachment order or execution writ was served on the bank by a competent civil court, tax revenue department, or debt tribunal for recovery of decreed liabilities or unpaid tax assessments.',
    plainExplanationTa: 'நீதிமன்ற ஆணை அல்லது வருமான வரித்துறையின் உத்தரவின் பேரில் சட்டப்பூர்வமாக பற்று முடக்கம் விதிக்கப்பட்டுள்ளது.',
    plainExplanationHi: 'सक्षम न्यायालय या आयकर विभाग द्वारा जारी कानूनी कुर्की आदेश के तहत खाते पर ग्रहणाधिकार लगाया गया है।',
    operationsMatrix: {
      credits: 'Permitted (Lien applied against balance)',
      debits: 'Blocked up to the exact lien amount; excess balance remains operational',
      cards: 'Active for balance above lien amount',
      netBanking: 'Operational above lien'
    },
    remediationSteps: [
      'Review official Attachment Order details and court suit docket number',
      'Satisfy the outstanding tax liability or clear the decreed court amount',
      'Obtain an official Court Satisfaction Order or Tax Clearance Certificate',
      'Upload the clearance decree; bank legal team verifies and removes the CBS hold'
    ],
    requiredDocuments: ['COURT_CLEARANCE', 'TAX_NOC'],
    slaHours: 72,
    riskTier: 'CRITICAL',
    selfServiceAvailable: false
  },
  {
    code: 'OVERDRAFT_LIEN_HOLD',
    category: 'Balance & Overdraft',
    categoryKey: 'catBalance',
    title: 'Negative Balance / Overdraft Limit Exceeded / Fee Lien',
    titleTa: 'மிகைப்பற்று / எதிர்மறை இருப்பு முடக்கம்',
    titleHi: 'ओवरड्राफ्ट / नकारात्मक शेष ग्रहणाधिकार (Negative Balance)',
    regulatoryMandate: 'Core Banking System Operational Guidelines & Overdraft Facility Agreement',
    plainExplanation: 'Account balance dropped below zero due to unpaid service fees, bounced cheque penalties, or exceeding approved overdraft limits. Outbound debits are paused until the negative balance is settled.',
    plainExplanationTa: 'கணக்கில் உள்ள இருப்புத்தொகை மைனஸ் நிலைக்குச் சென்றதால் அல்லது மிகைப்பற்று வரம்பை மீறியதால் தற்காலிகமாக வெளிப்பரிவர்த்தனைகள் இடைநிறுத்தப்பட்டுள்ளன.',
    plainExplanationHi: 'खाते में नकारात्मक शेष या स्वीकृत ओवरड्राफ्ट सीमा से अधिक निकासी होने के कारण आउटबाउंड लेनदेन रोके गए हैं।',
    operationsMatrix: {
      credits: 'Fully Permitted (Applied immediately to clear negative balance)',
      debits: 'Blocked until account is in positive standing',
      cards: 'Declined for insufficient funds',
      netBanking: 'Active for deposit and balance inquiry'
    },
    remediationSteps: [
      'View the exact negative balance and outstanding charges breakdown on your dashboard',
      'Execute an instant inbound fund transfer or deposit to restore account balance to positive',
      'Core Banking automatically removes the debit hold within 15 minutes of balance replenishment'
    ],
    requiredDocuments: [],
    slaHours: 1,
    riskTier: 'MEDIUM',
    selfServiceAvailable: true
  },
  {
    code: 'EMERGENCY_PANIC_LOCK',
    category: 'Security & Access',
    categoryKey: 'catSecurity',
    title: 'Emergency Customer Panic / Stolen Device Lock',
    titleTa: 'அவசர வாடிக்கையாளர் பாதுகாப்பு முடக்கம்',
    titleHi: 'आपातकालीन ग्राहक सुरक्षा / खोया उपकरण लॉक',
    regulatoryMandate: 'Customer Protection Policy on Limiting Liability in Electronic Banking',
    plainExplanation: 'Customer or automated fraud protection activated an emergency kill-switch freeze following a reported lost/stolen mobile phone, stolen debit card, suspected phishing click, or unrecognized UPI prompt.',
    plainExplanationTa: 'தொலைந்துபோன போன், திருடப்பட்ட கார்டு அல்லது ஃபிஷிங் மோசடி சந்தேகத்தின் பேரில் அவசரகால பாதுகாப்பு முடக்கம் செயல்படுத்தப்பட்டுள்ளது.',
    plainExplanationHi: 'खोए हुए मोबाइल, कार्ड चोरी या संदिग्ध धोखाधड़ी की शिकायत पर आपातकालीन सुरक्षा लॉक सक्रिय किया गया है।',
    operationsMatrix: {
      credits: 'Permitted (Salary and incoming transfers safe)',
      debits: '100% Frozen across ATM, Cards, UPI, NetBanking, and Branch',
      cards: 'Hotlisted / Permanently Blocked',
      netBanking: 'Emergency Suspended'
    },
    remediationSteps: [
      'Verify identity using primary two-factor biometric authentication',
      'Reissue digital banking credentials and virtual debit card tokens',
      'Confirm trusted device authorization and execute guided unfreeze'
    ],
    requiredDocuments: ['GOVT_ID', 'SELFIE_LIVENESS'],
    slaHours: 1,
    riskTier: 'HIGH',
    selfServiceAvailable: true
  }
];

function getAllLockReasons() {
  return LOCK_REASONS_CATALOG.map(r => ({
    ...r,
    operationsMatrix: {
      ...r.operationsMatrix,
      debitsAllowed: false,
      creditsAllowed: r.code !== 'AML_SUSPICIOUS_TXN' && r.code !== 'CYBER_POLICE_FREEZE',
      atmAllowed: false,
      netBankingAllowed: false
    }
  }));
}

/**
 * Retrieves all accounts owned by a customer profile
 */
function getCustomerAccounts(customerId) {
  const accounts = all(
    `SELECT id, customer_id, account_holder_name, branch_name, city, state, country,
            account_number_masked, ifsc_code, phone_number, account_type, currency,
            balance, status, branch_code, cbs_account_ref, bank_name, email,
            postal_code, residential_address, date_of_birth, created_at
     FROM account_references
     WHERE customer_id = ?
     ORDER BY created_at DESC`,
    [customerId]
  );

  return accounts.map(acc => {
    const activeRestriction = get(
      `SELECT * FROM account_restrictions WHERE account_id = ? AND is_active = 1 LIMIT 1`,
      [acc.id]
    );

    let parsedChecklist = [];
    if (activeRestriction && activeRestriction.resolution_checklist) {
      try {
        parsedChecklist = JSON.parse(activeRestriction.resolution_checklist);
      } catch (e) {
        parsedChecklist = [activeRestriction.resolution_checklist];
      }
    }

    const config = activeRestriction ? RESTRICTION_CONFIGS[activeRestriction.restriction_code] : null;

    return {
      ...acc,
      restriction: activeRestriction ? {
        id: activeRestriction.id,
        code: activeRestriction.restriction_code,
        severity: activeRestriction.severity,
        description: activeRestriction.description,
        impactedServices: activeRestriction.impacted_services.split(','),
        statutoryAuthority: activeRestriction.statutory_authority,
        courtRefNo: activeRestriction.court_ref_no,
        outstandingBalance: activeRestriction.outstanding_balance,
        appliedAt: activeRestriction.applied_at,
        checklist: parsedChecklist,
        metadata: config || null
      } : null
    };
  });
}

/**
 * Evaluates recovery eligibility for a specific account restriction
 */
function evaluateEligibility(accountId) {
  const account = get('SELECT * FROM account_references WHERE id = ?', [accountId]);
  if (!account) {
    throw new Error('Account reference not found');
  }

  const restriction = get(
    'SELECT * FROM account_restrictions WHERE account_id = ? AND is_active = 1 LIMIT 1',
    [accountId]
  );

  if (!restriction) {
    return {
      accountId,
      accountStatus: account.status,
      hasRestriction: false,
      eligible: false,
      message: 'Account is active with no operational restrictions holds.'
    };
  }

  const config = RESTRICTION_CONFIGS[restriction.restriction_code] || {
    title: restriction.restriction_code,
    slaHours: 24,
    eligibleForDigitalRecovery: true,
    requiredDocuments: ['GOVT_ID'],
    remediationSteps: [],
    riskTier: restriction.severity
  };

  return {
    accountId,
    accountStatus: account.status,
    hasRestriction: true,
    restrictionId: restriction.id,
    restrictionCode: restriction.restriction_code,
    severity: restriction.severity,
    eligible: config.eligibleForDigitalRecovery,
    slaHours: config.slaHours,
    title: config.title,
    titleTa: config.titleTa,
    requiredDocuments: config.requiredDocuments,
    remediationSteps: config.remediationSteps,
    impactedServices: restriction.impacted_services.split(','),
    statutoryAuthority: restriction.statutory_authority,
    courtRefNo: restriction.court_ref_no
  };
}

module.exports = {
  getCustomerAccounts,
  evaluateEligibility,
  RESTRICTION_CONFIGS,
  LOCK_REASONS_CATALOG,
  getAllLockReasons
};
