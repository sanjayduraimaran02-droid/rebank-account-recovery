/**
 * ReBank — Frontend Application Controller
 * Omni-channel Customer Recovery Portal & Bank Operations Cockpit
 */

// ================= TRILINGUAL I18N DICTIONARIES (EN / TA / HI) =================
const I18N = {
  en: {
    recoveryPlatform: "RECOVERY PLATFORM",
    demoRole: "Demo Role:",
    mobileView: "Mobile View",
    desktopView: "Desktop View",
    notifications: "Notifications",
    markAllRead: "Mark all read",
    noNotifications: "No notifications",
    disclaimer: "Simulated Core Banking System (CBS) demonstration environment. No live banking funds or production credentials are used.",
    signInTitle: "Sign In to ReBank",
    signInSubtitle: "Secure multi-role banking access",
    loginTab: "Sign In",
    registerTab: "Register Account",
    registerSubtitle: "Create your human-friendly smart banking account",
    registerSuccess: "Registration successful! Your customer account has been created.",
    emailLabel: "Email Address",
    passwordLabel: "Password",
    signInButton: "Sign In",
    fullNameLabel: "Full Legal Name",
    phoneLabel: "Mobile Phone Number",
    createAccountButton: "Create Demo Account",
    welcomeBack: "Welcome back,",
    helpSupport: "Help & Grievances",
    availableBalance: "Available Balance",
    startRecoveryBtn: "Start Account Recovery",
    estTurnaround: "Est. Turnaround SLA:",
    recoveryTickets: "Recovery Requests & Status Timeline",
    noActiveTickets: "No active recovery requests found.",
    resetDemoState: "Reset Demo State",
    reviewerQueue: "Reviewer Queue (Maker L1)",
    approverQueue: "Approver Queue (Checker L2)",
    auditTrail: "Audit Log Stream",
    cbsTelemetry: "Core Banking (CBS) Sandbox",
    recoveryWizardTitle: "Digital Account Recovery Application",
    stepDiagnosis: "Diagnosis",
    stepIdentity: "Identity",
    stepDocuments: "Documents",
    stepConsent: "Review & Sign",
    requiredTasks: "Required Remediation Tasks:",
    confirmContact: "Confirm Primary Phone & Email",
    contactAccurate: "I confirm my contact information is current and accurate.",
    faceDetected: "✓ Face Position Optimal",
    livenessDesc: "Hold device at eye level and blink when prompted to verify genuine live presence.",
    captureSelfie: "Capture Liveness Selfie",
    govtIdUpload: "Government-Issued Photo ID (Passport / National ID / Driver License)",
    proofAddressUpload: "Proof of Address (< 90 days Utility Bill or Bank Statement)",
    clickOrDrag: "Click or drag document to upload",
    explanationStatement: "Customer Explanation / Remarks",
    sourceOfFunds: "Source of Funds Declaration",
    legalConsent: "I solemnly certify that all uploaded credentials, identity captures, and explanations are authentic and accurate. I authorize ReBank to verify this information with official registries.",
    back: "Back",
    next: "Continue",
    submitApplication: "Submit Recovery Application",
    helpCenter: "Help Center & Grievance Redressal",
    fileGrievance: "File a Grievance / Complaint",
    subjectLabel: "Subject",
    categoryLabel: "Category",
    descriptionLabel: "Detailed Explanation",
    submitGrievance: "Submit Grievance",
    myGrievances: "My Grievances & Escalations",
    tier: "Tier",
    escalate: "Escalate (+1 Tier)",
    privacyCenter: "Privacy & Consents",
    privacyCenterTitle: "Security & Data Privacy Center",
    roleFraudAnalyst: "Fraud Analyst",
    fraudTab: "Fraud Detection & Alerts",
    reportsTab: "Reports & Analytics",
    openAlerts: "Open Alerts",
    criticalThreats: "Critical Severity",
    avgRiskScore: "Avg Risk Score",
    activeRules: "Active Risk Rules",
    immediateTriage: "Immediate review required",
    scaleMax: "Scale 0 - 100",
    rulesEngine: "Rule engine enabled",
    nextStep: "Expected Next Step:",
    resubmissionRequired: "Action Required: Additional Information Requested",
    resubmissionInstructions: "Reviewer Feedback / Instructions:",
    missingDocs: "Missing / Required Documents:",
    uploadRequestedInfo: "Upload Requested Documents",
    stageSubmitted: "1. Submitted",
    stageUnderReview: "2. Under Review",
    stageInfoReq: "3. Info Requested",
    stageAuthorized: "4. Authorized",
    stageRestored: "5. CBS Restored",
    // Bank account registration
    registerBankTitle: "Register Bank Account",
    registerBankSubtitle: "Link your domestic or international account for assistance",
    backToAccounts: "Back to Accounts",
    dobLabel: "Date of Birth (Optional)",
    residentialAddressLabel: "Residential Address (Optional)",
    postalCodeLabel: "PIN / Postal Code",
    accountTypeLabel: "Account Type",
    termsConsentTitle: "I declare and confirm",
    cancelBtn: "Cancel",
    termsRequiredError: "Please agree to the account verification terms.",
    accountHolderNameLabel: "Account Holder Name",
    branchNameLabel: "Branch Name",
    cityLabel: "City",
    stateLabel: "State",
    countryLabel: "Country",
    bankAccNumLabel: "Bank Account Number",
    confirmAccNumLabel: "Confirm Account Number",
    ifscCodeLabel: "IFSC Code",
    registerBankBtn: "Register Bank Account",
    registerBankSuccess: "Bank account registered successfully in RESTRICTED status awaiting verification.",
    accountMismatchError: "Bank account number and confirm account number do not match.",
    invalidIfscError: "Invalid IFSC Code format for India (e.g. SBIN0001234: 4 letters, zero, 6 alphanumeric).",
    invalidPhoneError: "Please enter a valid phone number (minimum 10 digits).",
    requiredFieldsError: "Please fill in all required fields.",
    invalidEmailError: "Please enter a valid email address.",
    shortPasswordError: "Password must be at least 8 characters long.",
    invalidNameError: "Please enter your full legal name (minimum 2 characters).",
    // Hackathon upgrade additions: Lock explanations, transfer simulation, chatbot
    explainLockBtn: "Why is my account locked?",
    simulateTransferBtn: "Simulate Transfer",
    lockModalTitle: "Account Lock & Restriction Details",
    lockModalSubtitle: "Transparent, plain-language explanation of regulatory holds and fund security.",
    whyLockedHeading: "Why Was Your Account Restricted?",
    fundsSafeHeading: "Is My Money Safe?",
    fundsSafeNotice: "Yes, 100% of your funds are completely safe and secure in your account. Your balance has NOT been deducted or forfeited. Only debit transactions and outbound payments are paused to protect your assets.",
    impactServicesHeading: "Services Status Matrix",
    serviceDepositsAllowed: "Direct Inbound Deposits & Salary: Permitted",
    serviceStatementsAllowed: "Account Statements & Balance Inquiries: Permitted",
    serviceOutboundPaused: "Outbound Wire / UPI / NetBanking Transfers: Paused",
    serviceAtmPaused: "ATM Cash Withdrawals & Debit Card Usage: Paused",
    stepsToUnblockHeading: "How to Restore Full Account Access",
    step1Unblock: "Step 1: Submit your valid government identity document in our secure portal.",
    step2Unblock: "Step 2: Complete the 5-second digital liveness selfie verification.",
    step3Unblock: "Step 3: Our Maker-Checker operations team reviews and unfreezes your account within the SLA window.",
    closeLockModalBtn: "Close Explanation",
    simReasonsHeading: "Common Simulated Lock Scenarios & Self-Service Resolutions",
    reasonFailedLoginTitle: "1. Failed Login Attempts / Brute-Force Shield",
    reasonFailedLoginDesc: "Triggered automatically after 5 consecutive incorrect password submissions or suspicious sign-in attempts from an untrusted IP address. Online sign-in is suspended for 30 minutes to safeguard credentials, while 100% of your account funds remain secure.",
    reasonFailedLoginAction: "Recover Credentials",
    reasonKycExpiryTitle: "2. KYC / Document Expiry (Regulatory Refresh)",
    reasonKycExpiryDesc: "Central banking regulations require periodic re-identification every 2 years. Inbound deposits and salary credits continue normally; outbound remittances and ATM withdrawals are held pending renewed proof of identity.",
    reasonKycExpiryAction: "Renew KYC Documents",
    reasonSecurityPendingTitle: "3. Security Verification Pending / Fraud Shield",
    reasonSecurityPendingDesc: "Intercepted when our real-time risk engine flags unusual transfer velocity, an unverified high-value payee, or anomalous transaction devices. Outgoing wire is paused for dual-control Maker-Checker review.",
    reasonSecurityPendingAction: "Verify Security Hold",
    reasonDormancyTitle: "4. Temporary Account Restrictions (Inactivity Dormancy)",
    reasonDormancyDesc: "Applied when an account has no customer debit or credit transactions for over 365 consecutive days. Switched to dormant status to protect unattended balances from fraud. Accrued interest remains intact.",
    reasonDormancyAction: "Reactivate Account",
    simModalTitle: "Simulate Outbound Transfer",
    simModalSubtitle: "Test ReBank's real-time risk intelligence and fraud prevention engine.",
    simSourceAccLabel: "Source Account",
    simAmountLabel: "Transfer Amount ($)",
    simPayeeNameLabel: "Beneficiary / Payee Name",
    simPayeeAccLabel: "Beneficiary Account Number",
    simScenarioLabel: "Simulation Risk Scenario",
    simScenarioNormal: "1. Standard Domestic Transfer (Normal / Low Risk)",
    simScenarioVelocity: "2. Rapid Velocity / Multiple Spikes (Suspicious Activity)",
    simScenarioNewPayee: "3. Unverified International Crypto Beneficiary (High Risk)",
    simScenarioRestricted: "4. Outbound Transfer from Currently Restricted Account",
    simSubmitBtn: "Run Transfer Simulation",
    simResultTitle: "Transfer Risk & Protection Assessment",
    simRiskScoreLabel: "Protection Risk Score:",
    simDisclaim: "Regulatory Safety Notice: Risk scores are protective decision-support indicators for review, not proof of wrongdoing. Accounts are protected, never arbitrarily cancelled.",
    chatLauncherText: "ReBank AI Assistant",
    chatTitle: "ReBank Support AI",
    chatSubtitle: "24/7 Smart Assistant (Rule-Based Demo Mode)",
    chatSecurityNotice: "ReBank AI will never ask for your PIN, password, or OTP.",
    chatWelcomeMsg: "Hello! I am your ReBank recovery assistant. How can I help you restore access or answer questions about your account today?",
    chatChipWhyLocked: "Why is my account locked?",
    chatChipTrackStatus: "Track my recovery ticket",
    chatChipDocsNeeded: "What documents do I need?",
    chatChipHowLong: "How long does recovery take?",
    chatInputPlaceholder: "Ask about recovery, lock reasons, or case status...",
    chatSendBtnText: "Send",
    // Smart Hackathon Platform Extensions
    accountOrEmailLabel: "Account Number or Email Address",
    demoQuickLoginLabel: "Demo One-Click Sign In:",
    loginSecurityNotice: "Demonstration prototype environment. Never enter real banking credentials, PINs, or passwords.",
    accountHealthTitle: "Account Security Health",
    accountHealthOptimal: "98% - Optimal & Protected",
    accountHealthRestricted: "68% - Action Required",
    accountHealthSubtitle: "Automated diagnostic score based on biometric liveness, multi-factor status, and regulatory KYC standing.",
    securityAlertTitle: "Security Activity Alert",
    securityAlertNotice: "New simulated sign-in session recorded from Chicago, US (Chrome on Windows). Behavioral biometrics match authorized customer profile.",
    dismissAlert: "Acknowledge",
    recentTransactionsTitle: "Recent Simulated Transactions",
    recentTransactionsSubtitle: "Simulated core banking ledger. Demonstrates real-time fraud scoring and hold policies.",
    txDate: "Date",
    txDescription: "Transaction Details",
    txAmount: "Amount",
    txStatus: "Status",
    securityTimelineTitle: "Security Activity & Audit Log",
    securityTimelineSubtitle: "Cryptographic event trail showing regulatory compliance and account protection milestones.",
    chipAccountBlocked: "Account Blocked",
    chipRecoverAccount: "Recover Account",
    chipTransactionRisk: "Transaction Risk",
    chipContactSupport: "Contact Support",
    heroSubtitle: "Your account is temporarily locked. Let's check why and see how to get it back.",
    heroSubtitleActive: "Your account is active, verified, and protected.",
    chipWhyLocked: "Account Locked",
    chipHelpRecover: "Recover My Account",
    chipCheckTransfer: "Transfer Safety",
    chipTrackRecovery: "Contact Support",
    chatWelcomeStaff: "Hello! I’m your ReBank AI Assistant. Your account is temporarily locked. Let's check why and see how to get it back.",
    transferSuspiciousWarning: "This transfer looks unusual. Please check the details before continuing.",
    transferSuspiciousReason: "Why this is flagged: Outbound transfers are paused because your account has an active regulatory KYC verification hold to safeguard your deposits.",
    transferSuspiciousRemedy: "Advice: Do not proceed until verified. Complete the 4-stage digital verification in the Account Recovery Hub above to restore full wire privileges.",
    transferPendingMsg: "Your transfer isn't complete yet. Let's check its status.",
    recoverySubmittedMsg: "Your recovery request has been submitted. Here's your reference number. You can track the next update here.",
    loginFailedMsg: "We couldn't log you in. Please check your details and try again.",
    riskLowWarning: "Standard transaction within normal behavioral velocity. Cleared without friction.",
    riskMedWarning: "Elevated transaction velocity or unfamiliar device detected. Two-factor verification suggested.",
    riskHighWarning: "Critical Risk Intercepted: Regulatory hold on account or unverified international beneficiary. Outbound transfer halted.",
    navOverview: "Overview & Health",
    navRecoveryHub: "Account Recovery Hub",
    navTransferSim: "Transfer Simulator",
    navActivityAudit: "Activity & Ledger",
    navHome: "My Home",
    navAccounts: "My Accounts",
    navRecentActivity: "Recent Activity",
    navGetHelp: "Get Help",
    navRecovery: "Account Recovery",
    navSecurityCheck: "Security Check",
    navHelpCenter: "Help Center",
    chatTypingLabel: "ReBank Assistant is typing...",
    fundsSafetyBanner: "100% Funds Safety Protected: All your account balances remain completely secure in your CBS account during recovery.",
    dedicatedRecoveryTitle: "Smart Account Recovery Application",
    dedicatedRecoverySubtitle: "Complete the 4-stage digital verification below to submit your restoration request.",
    submitRecoveryInlineBtn: "Submit Account Recovery Request",
    dedicatedSimTitle: "Simulate Outbound Transfer & Real-Time Risk Analysis",
    dedicatedSimSubtitle: "Test ReBank's automated heuristic anomaly and transaction protection engine.",
    assessRiskBtn: "Assess Transfer Risk & Execute Simulation",
    beneficiaryNameLabel: "Beneficiary Full Name",
    destAccountLabel: "Destination Account / IBAN",
    transferAmountLabel: "Transfer Amount ($ USD)",
    transferSpeedLabel: "Transfer Clearing Speed",
    instantSpeed: "Instant Real-Time Wire (RTP)",
    standardSpeed: "Standard Clearing (ACH/NEFT 1-2 Days)",
    captureSelfieBtnText: "📸 Capture 5-Second Digital Liveness Selfie",
    selfieStatusPending: "Selfie verification ready to capture",
    docTypeLabel: "Government Photo ID Type",
    docNumberLabel: "Document Identification Number",
    addrTypeLabel: "Proof of Address Document",
    additionalNotesLabel: "Additional Clarification / Context",
    recoveryActiveTitle: "Application Under Review",
    recoveryActiveDesc: "Your recovery application is actively being processed by Bank Compliance under dual-control Maker-Checker review. SLA turnaround is 2–4 hours.",
    viewTrackerBtn: "View Live Tracker",
    optPassport: "Passport (International Travel Standard)",
    optNationalId: "National ID / Aadhaar Card",
    optDriversLicense: "Driver's License",
    optUtilityBill: "Utility Bill (Electricity/Water within 90 days)",
    optBankStatement: "Certified Bank Statement (within 90 days)",
    optTaxAssessment: "Municipal Tax / Residential Certificate",
    profileTitle: "Customer Profile",
    navDashboard: "Dashboard",
    navAllAccounts: "All Accounts",
    navAllBanks: "All Banks",
    navBankTransfer: "Bank Transfer",
    navBillPayments: "Bill Payments",
    navBankDeposits: "Bank Deposits",
    navCards: "Cards",
    navAccountStatement: "Account Statement",
    navAiCommunication: "Communication with AI",
    navContactUs: "Contact Us",
    navLogout: "Logout",
    quickBankingActions: "Quick Banking Actions",
    quickScanPay: "Scan & Pay",
    quickPayAnyone: "Pay Anyone",
    quickTransfer: "Bank Transfer",
    quickBills: "Bill Pay",
    quickDth: "DTH / Cable",
    quickCards: "Cards",
    quickStatement: "Statement",
    quickAccounts: "All Accounts",
    quickDeposits: "Deposits",
    quickRecovery: "Recovery Hub",
    quickAiChat: "AI Assistant",
    quickSupport: "Contact Care",
    bankNameLabel: "Bank Name",
    branchCodeLabel: "Branch Code (Optional)",
    districtLabel: "District / City",
    pinCodeLabel: "Postal / PIN Code",
    remarksLabel: "Remarks / Purpose",
    checkSafetyBtn: "Check Transfer Safety",
    confirmTransferBtn: "Confirm & Transfer",
    transferSuccessTitle: "Transfer Successfully Executed!",
    billerOperatorLabel: "Biller / Operator",
    consumerNumberLabel: "Consumer Number / Subscriber ID",
    billAmountLabel: "Bill Amount ($ USD)",
    payBillNowBtn: "Pay Bill Now",
    billSuccessTitle: "Bill Payment Successful!",
    activeDepositsTitle: "Your Active Deposits",
    openDepositBtn: "Open Deposit Account",
    depositTypeLabel: "Deposit Type",
    depositAmountLabel: "Principal Amount ($ USD)",
    tenureLabel: "Tenure (Months)",
    interestRateLabel: "Interest Rate (p.a.)",
    maturityAmountLabel: "Estimated Maturity Amount",
    downloadCsvBtn: "Download Statement (CSV)",
    searchTxnPlaceholder: "Search by recipient, description, ref #...",
    helplineTitle: "24x7 Customer Helpline",
    complianceDeskTitle: "Compliance & Redressal Desk",
    qrScannerTitle: "Scan QR to Pay",
    cameraDeniedFallback: "Camera access unavailable or declined. Enter recipient details manually or use Demo QR.",
    demoQrBtn: "Use Demo QR",
    addressLabel: "Residential Address",
    saveProfileBtn: "Save Changes",
    backToDashboard: "Back to Dashboard",
    transferReviewTitle: "Review Transfer Details",
    transferReviewSubtitle: "Please verify recipient and account information before authorizing",
    transferSecurityNotice: "Zero-Trust Transfer Guarantee: Funds are protected by ReBank automated fraud screening and Maker-Checker compliance.",
    editDetailsBtn: "Edit Details",
    authorizeTransferBtn: "Authorize & Send Transfer",
    feeLabel: "Transfer Fee",
    navLockReasons: "Lock Reasons & Unlock",
    authLockGuideTitle: "Account Locked or Frozen?",
    authLockGuideSub: "Browse real bank lock reasons and step-by-step unfreeze guides",
    exploreReasonsBtn: "Explore Guide",
    quickLockReasons: "Lock Reasons",
    lockReasonsHeroTitle: "Real Bank Account Lock Reasons & Resolution Encyclopedia",
    lockReasonsHeroDesc: "Authoritative breakdown of why commercial and central banks lock accounts, the statutory mandates governing holds, and verified step-by-step unfreeze paths.",
    applyUnfreezeBtn: "Start Account Unfreeze",
    kpiCategoriesTitle: "8 Core Freeze Profiles",
    kpiMandateTitle: "Regulatory Compliance",
    kpiSlaTitle: "Turnaround Timeline (SLA)",
    kpiSelfServiceTitle: "Digital Resolution Available",
    diagnosticTitle: "Interactive Lock Symptom Checker",
    diagnosticDesc: "Select the symptom or error message you encountered at ATM, NetBanking, or Mobile App to find the exact lock cause and remedy.",
    diagSelectPrompt: "-- Choose your error message or banking symptom --",
    diagnoseBtn: "Analyze Symptom",
    resetFilterBtn: "Reset",
    clearSearch: "Clear",
    catAllReasons: "🌐 All Categories (8)",
    catCompliance: "📋 Compliance & KYC (2)",
    catSecurity: "🛡️ Security & AML (2)",
    catLegal: "⚖️ Police & Legal Orders (2)",
    catFinancial: "💳 Overdraft & Emergency (2)",
    loadingLockReasons: "Loading real-world bank lock reasons catalog...",
    statutoryEscalationTitle: "Statutory Banking Ombudsmen & Official Portals",
    statutoryEscalationDesc: "If your bank fails to resolve your account hold within statutory regulatory turnaround times, you have the legal right to escalate directly to official authorities:",
    cardDebitsLabel: "Debits / Outward",
    cardCreditsLabel: "Credits / Inward",
    cardAtmLabel: "ATM & POS Cards",
    cardNetBankingLabel: "NetBanking & UPI",
    requiredDocsLabel: "Required Documents for Unfreeze",
    unlockProcedureLabel: "Step-by-Step Unlock Procedure",
    unlockOnlineBtn: "⚡ Unlock Online Now",
    askAiAboutThisBtn: "💬 Ask AI Assistant",
    navProfile: "Customer Profile",
    navRegisterAccount: "Register Account"
  },
  ta: {
    recoveryPlatform: "கணக்கு மீட்பு தளம்",
    demoRole: "மாதிரி பங்கு:",
    mobileView: "மொபைல் காட்சி",
    desktopView: "டெஸ்க்டாப் காட்சி",
    notifications: "அறிவிப்புகள்",
    markAllRead: "அனைத்தையும் படித்ததாகக் குறி",
    noNotifications: "அறிவிப்புகள் இல்லை",
    disclaimer: "மாதிரி வங்கி அமைப்பு (CBS) டெமோ சூழல். நேரடி வங்கி நிதி அல்லது உற்பத்தி சான்றுகள் பயன்படுத்தப்படவில்லை.",
    signInTitle: "ReBank-ல் உள்நுழையவும்",
    signInSubtitle: "பாதுகாப்பான பல பங்கு வங்கி அணுகல்",
    loginTab: "உள்நுழைவு",
    registerTab: "புதிய கணக்கு பதிவு",
    registerSubtitle: "உங்கள் மனிதநேய ஸ்மார்ட் வங்கி கணக்கை உருவாக்கவும்",
    registerSuccess: "பதிவு வெற்றிகரமாக முடிந்தது! உங்கள் வாடிக்கையாளர் கணக்கு உருவாக்கப்பட்டது.",
    emailLabel: "மின்னஞ்சல் முகவரி",
    passwordLabel: "கடவுச்சொல்",
    signInButton: "உள்நுழைக",
    fullNameLabel: "முழு சட்டப்பூர்வ பெயர்",
    phoneLabel: "மொபைல் எண்",
    createAccountButton: "டெமோ கணக்கை உருவாக்கவும்",
    welcomeBack: "மீண்டும் வருக,",
    helpSupport: "உதவி & புகார்கள்",
    availableBalance: "கிடைக்கக்கூடிய இருப்பு",
    startRecoveryBtn: "கணக்கு மீட்பைத் தொடங்கவும்",
    estTurnaround: "மதிப்பிடப்பட்ட தீர்வு நேரம்:",
    recoveryTickets: "மீட்பு கோரிக்கைகள் & காலவரிசை நிலை",
    noActiveTickets: "செயலில் உள்ள மீட்பு கோரிக்கைகள் இல்லை.",
    resetDemoState: "டெமோ நிலையை மீட்டமை",
    reviewerQueue: "மறுஆய்வாளர் வரிசை (Maker L1)",
    approverQueue: "ஒப்புதல் அளிப்பவர் வரிசை (Checker L2)",
    auditTrail: "தணிக்கை பதிவு ஸ்ட்ரீம்",
    cbsTelemetry: "கோர் பேங்கிங் (CBS) சாண்ட்பாக்ஸ்",
    recoveryWizardTitle: "டிஜிட்டல் வங்கி கணக்கு மீட்பு விண்ணப்பம்",
    stepDiagnosis: "நோயறிதல்",
    stepIdentity: "அடையாளம்",
    stepDocuments: "ஆவணங்கள்",
    stepConsent: "மறுஆய்வு & கையொப்பம்",
    requiredTasks: "தேவையான தீர்வு பணிகள்:",
    confirmContact: "முதன்மை தொலைபேசி மற்றும் மின்னஞ்சலை உறுதிப்படுத்தவும்",
    contactAccurate: "எனது தொடர்புத் தகவல் தற்போதையது மற்றும் துல்லியமானது என்பதை உறுதிப்படுத்துகிறேன்.",
    faceDetected: "✓ முக நிலை உகந்தது",
    livenessDesc: "உண்மையான இருப்பைச் சரிபார்க்க சாதனத்தை கண் மட்டத்தில் பிடித்து கண்சிமிட்டவும்.",
    captureSelfie: "நேரடி செல்ஃபி எடுக்கவும்",
    govtIdUpload: "அரசு வழங்கிய அடையாள அட்டை (பாஸ்போர்ட் / ஓட்டுநர் உரிமம் / ஆதார்)",
    proofAddressUpload: "முகவரிச் சான்று (<90 நாட்கள் மின் கட்டணம் அல்லது வங்கி அறிக்கை)",
    clickOrDrag: "பதிவேற்ற ஆவணத்தை கிளிக் செய்யவும் அல்லது இழுக்கவும்",
    explanationStatement: "வாடிக்கையாளர் விளக்கம் / கருத்துக்கள்",
    sourceOfFunds: "நிதி மூல அறிக்கை",
    legalConsent: "பதிவேற்றப்பட்ட அனைத்து ஆவணங்களும், அடையாள பிடிப்புகளும் உண்மையானவை என்பதை நான் சான்றளிக்கிறேன். இதை அதிகாரப்பூர்வ பதிவேடுகளில் சரிபார்க்க நான் ReBank-க்கு அதிகாரம் அளிக்கிறேன்.",
    back: "பின்னால்",
    next: "தொடரவும்",
    submitApplication: "மீட்பு விண்ணப்பத்தை சமர்ப்பிக்கவும்",
    helpCenter: "உதவி மையம் & குறை தீர்க்கும் பிரிவு",
    fileGrievance: "புகார் அல்லது குறையை பதிவு செய்யவும்",
    subjectLabel: "பொருள்",
    categoryLabel: "வகை",
    descriptionLabel: "விரிவான விளக்கம்",
    submitGrievance: "புகாரைச் சமர்ப்பிக்கவும்",
    myGrievances: "எனது புகார்கள் & படிநிலைகள்",
    tier: "அடுக்கு",
    escalate: "மேல்முறையீடு செய் (+1 அடுக்கு)",
    privacyCenter: "தனியுரிமை & ஒப்புதல்கள்",
    privacyCenterTitle: "பாதுகாப்பு & தரவு தனியுரிமை மையம்",
    roleFraudAnalyst: "மோசடி ஆய்வாளர்",
    fraudTab: "மோசடி கண்டறிதல் & எச்சரிக்கைகள்",
    reportsTab: "அறிக்கைகள் & பகுப்பாய்வு",
    openAlerts: "திறந்த எச்சரிக்கைகள்",
    criticalThreats: "முக்கிய தீவிரம்",
    avgRiskScore: "சராசரி ஆபத்து மதிப்பெண்",
    activeRules: "செயலில் உள்ள விதிகள்",
    immediateTriage: "உடனடி மதிப்பாய்வு தேவை",
    scaleMax: "அளவு 0 - 100",
    rulesEngine: "விதி இயந்திரம் இயக்கப்பட்டது",
    nextStep: "எதிர்பார்க்கப்படும் அடுத்த படி:",
    resubmissionRequired: "நடவடிக்கை தேவை: கூடுதல் தகவல் கோரப்பட்டுள்ளது",
    resubmissionInstructions: "மறுஆய்வாளர் கருத்து / வழிமுறைகள்:",
    missingDocs: "தேவையான ஆவணங்கள்:",
    uploadRequestedInfo: "கோரப்பட்ட ஆவணங்களை பதிவேற்றவும்",
    stageSubmitted: "1. சமர்ப்பிக்கப்பட்டது",
    stageUnderReview: "2. பரிசீலனையில்",
    stageInfoReq: "3. கூடுதல் தகவல்",
    stageAuthorized: "4. அங்கீகரிக்கப்பட்டது",
    stageRestored: "5. கணக்கு மீட்டமைக்கப்பட்டது",
    // Bank account registration
    registerBankTitle: "வங்கி கணக்கை பதிவு செய்க",
    registerBankSubtitle: "உதவிக்காக உங்கள் உள்நாட்டு அல்லது சர்வதேச கணக்கை இணைக்கவும்",
    backToAccounts: "கணக்குகளுக்குத் திரும்பு",
    dobLabel: "பிறந்த தேதி (விருப்பத்தேர்வு)",
    residentialAddressLabel: "குடியிருப்பு முகவரி (விருப்பத்தேர்வு)",
    postalCodeLabel: "அஞ்சல் குறியீடு / PIN",
    accountTypeLabel: "கணக்கு வகை",
    termsConsentTitle: "நான் உறுதிப்படுத்துகிறேன்",
    cancelBtn: "ரத்து செய்",
    termsRequiredError: "கணக்கு சரிபார்ப்பு விதிமுறைகளை ஏற்கவும்.",
    accountHolderNameLabel: "கணக்கு வைத்திருப்பவர் பெயர்",
    branchNameLabel: "கிளை பெயர்",
    cityLabel: "நகரம்",
    stateLabel: "மாநிலம்",
    countryLabel: "நாடு",
    bankAccNumLabel: "வங்கி கணக்கு எண்",
    confirmAccNumLabel: "கணக்கு எண்ணை உறுதிப்படுத்தவும்",
    ifscCodeLabel: "IFSC குறியீடு",
    registerBankBtn: "வங்கி கணக்கை பதிவு செய்க",
    registerBankSuccess: "வங்கி கணக்கு வெற்றிகரமாக பதிவு செய்யப்பட்டது (சரிபார்ப்பு நிலுவையில் உள்ளது).",
    accountMismatchError: "வங்கி கணக்கு எண்ணும் உறுதிப்படுத்திய கணக்கு எண்ணும் பொருந்தவில்லை.",
    invalidIfscError: "இந்தியாவிற்கான தவறான IFSC குறியீடு வடிவம் (எ.கா. SBIN0001234: 4 எழுத்துக்கள், பூஜ்ஜியம், 6 எழுத்து/எண்கள்).",
    invalidPhoneError: "சரியான தொலைபேசி எண்ணை உள்ளிடவும் (குறைந்தது 10 இலக்கங்கள்).",
    requiredFieldsError: "தேவையான அனைத்து புலங்களையும் நிரப்பவும்.",
    invalidEmailError: "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்.",
    shortPasswordError: "கடவுச்சொல் குறைந்தது 8 எழுத்துக்கள் இருக்க வேண்டும்.",
    invalidNameError: "உங்கள் முழு சட்டப்பூர்வ பெயரை உள்ளிடவும் (குறைந்தது 2 எழுத்துக்கள்).",
    // Hackathon upgrade additions: Lock explanations, transfer simulation, chatbot
    explainLockBtn: "கணக்கு ஏன் முடக்கப்பட்டது?",
    simulateTransferBtn: "பணப் பரிமாற்ற சோதனை",
    lockModalTitle: "கணக்கு முடக்க விவரங்கள் & காரணங்கள்",
    lockModalSubtitle: "வங்கி விதிமுறைகள் மற்றும் நிதி பாதுகாப்பு குறித்த எளிய வெளிப்படையான விளக்கம்.",
    whyLockedHeading: "உங்கள் கணக்கு ஏன் கட்டுப்படுத்தப்பட்டது?",
    fundsSafeHeading: "எனது பணம் பாதுகாப்பாக உள்ளதா?",
    fundsSafeNotice: "ஆம்! உங்கள் பணம் 100% பாதுகாப்பாக உங்கள் கணக்கிலேயே உள்ளது. எந்த தொகையும் பிடித்தம் செய்யப்படவில்லை. உங்கள் நிதியைப் பாதுகாக்க மட்டுமே வெளிச்செல்லும் பரிவர்த்தனைகள் தற்காலிகமாக நிறுத்தப்பட்டுள்ளன.",
    impactServicesHeading: "சேவைகள் நிலை விபரம்",
    serviceDepositsAllowed: "உள்வரும் டெபாசிட்கள் மற்றும் சம்பள வரவு: அனுமதிக்கப்படுகிறது",
    serviceStatementsAllowed: "கணக்கு அறிக்கை மற்றும் இருப்பு சோதித்தல்: அனுமதிக்கப்படுகிறது",
    serviceOutboundPaused: "வெளிச்செல்லும் UPI / வங்கி பணப் பரிமாற்றங்கள்: தற்காலிக நிறுத்தம்",
    serviceAtmPaused: "ATM பணம் எடுத்தல் மற்றும் டெபிட் கார்டு பயன்பாடு: தற்காலிக நிறுத்தம்",
    stepsToUnblockHeading: "முடக்கத்தை நீக்குவது எப்படி?",
    step1Unblock: "படி 1: செல்லுபடியாகும் அரசு அடையாள ஆவணத்தை தளத்தில் பதிவேற்றவும்.",
    step2Unblock: "படி 2: 5 வினாடி டிஜிட்டல் செல்ஃபி சரிபார்ப்பை முடிக்கவும்.",
    step3Unblock: "படி 3: வங்கி ஆய்வுக் குழு சரிபார்த்து குறிப்பிட்ட நேரத்திற்குள் (2-4 மணிநேரம்) கணக்கை மீட்டெடுக்கும்.",
    closeLockModalBtn: "விளக்கத்தை மூடுக",
    simReasonsHeading: "பொதுவான கணக்கு முடக்க காரணங்கள் மற்றும் தீர்வுகள்",
    reasonFailedLoginTitle: "1. தோல்வியடைந்த உள்நுழைவு முயற்சிகள்",
    reasonFailedLoginDesc: "5 தவறான கடவுச்சொல் முயற்சிகள் அல்லது அங்கீகரிக்கப்படாத IP முகவரிகளால் தானாக தூண்டப்படுகிறது. உங்கள் நற்சான்றிதழ்களைப் பாதுகாக்க உள்நுழைவு 30 நிமிடங்கள் இடைநிறுத்தப்படுகிறது; உங்கள் பணம் முழுமையாக பாதுகாப்பாக உள்ளது.",
    reasonFailedLoginAction: "அணுகலை மீட்டெடுக்கவும்",
    reasonKycExpiryTitle: "2. KYC ஆவண காலாவதி (ஒழுங்குமுறை மறுஆய்வு)",
    reasonKycExpiryDesc: "வங்கி விதிமுறைகளின்படி 2 ஆண்டுகளுக்கு ஒருமுறை மறுஆய்வு செய்ய வேண்டும். உள்வரும் வைப்புத்தொகை அனுமதிக்கப்படுகிறது; ஆவணங்கள் புதுப்பிக்கப்படும் வரை வெளி பரிமாற்றங்கள் இடைநிறுத்தப்பட்டுள்ளன.",
    reasonKycExpiryAction: "KYC புதுப்பிக்கவும்",
    reasonSecurityPendingTitle: "3. பாதுகாப்பு சரிபார்ப்பு நிலுவையில் உள்ளது",
    reasonSecurityPendingDesc: "வழக்கத்திற்கு மாறான உயர் பரிமாற்ற வேகம் அல்லது புதிய பெறுநர் சரிபார்ப்பின் போது செயல்படுத்தப்படுகிறது. பரிவர்த்தனை ஆய்வுக்கு உட்படுத்தப்பட்டுள்ளது.",
    reasonSecurityPendingAction: "பாதுகாப்பை சரிபார்க்கவும்",
    reasonDormancyTitle: "4. தற்காலிக செயலற்ற முடக்கம் (Dormancy)",
    reasonDormancyDesc: "365+ நாட்களுக்கு மேல் நிதி பரிவர்த்தனைகள் இல்லாத கணக்குகளுக்குப் பயன்படுத்தப்படுகிறது. கவனிக்கப்படாத இருப்புகளைப் பாதுகாக்க செயலற்ற நிலைக்கு மாற்றப்படுகிறது.",
    reasonDormancyAction: "மீண்டும் செயல்படுத்தவும்",
    simModalTitle: "பணப் பரிமாற்ற சோதனை & இடர் ஆய்வு",
    simModalSubtitle: "ReBank-ன் நிகழ்நேர இடர் கண்காணிப்பு மற்றும் மோசடி தடுப்பு அமைப்பை சோதிக்கவும்.",
    simSourceAccLabel: "மூல வங்கி கணக்கு",
    simAmountLabel: "அனுப்பும் தொகை ($)",
    simPayeeNameLabel: "பெறுநர் பெயர்",
    simPayeeAccLabel: "பெறுநர் கணக்கு எண்",
    simScenarioLabel: "சோதனை இடர் காட்சி",
    simScenarioNormal: "1. வழக்கமான உள்நாட்டு பரிமாற்றம் (சாதாரண / குறைந்த இடர்)",
    simScenarioVelocity: "2. குறுகிய நேர பல பரிமாற்றங்கள் (சந்தேகத்திற்குரிய வேகம்)",
    simScenarioNewPayee: "3. புதிய சர்வதேச கிரிப்டோ பெறுநர் (அதிக இடர்)",
    simScenarioRestricted: "4. முடக்கப்பட்ட கணக்கிலிருந்து வெளிச்செல்லும் பரிமாற்றம்",
    simSubmitBtn: "பரிமாற்றத்தை உருவகப்படுத்துக",
    simResultTitle: "பரிமாற்ற இடர் & பாதுகாப்பு மதிப்பீடு",
    simRiskScoreLabel: "பாதுகாப்பு இடர் மதிப்பீடு:",
    simDisclaim: "ஒழுங்குமுறை பாதுகாப்பு குறிப்பு: இடர் மதிப்பீடு வாடிக்கையாளர் பாதுகாப்பிற்கான ஒரு சுட்டிக்காட்டி மட்டுமே. உண்மையான கணக்குகள் தானாக மூடப்படாது.",
    chatLauncherText: "ReBank AI உதவியாளர்",
    chatTitle: "ReBank AI உதவி மையம்",
    chatSubtitle: "24/7 ஸ்மார்ட் உதவியாளர் (டெமோ முறை)",
    chatSecurityNotice: "ReBank AI ஒருபோதும் உங்கள் கடவுச்சொல், PIN அல்லது OTP-ஐ கேட்காது.",
    chatWelcomeMsg: "வணக்கம்! நான் உங்கள் ReBank மீட்பு உதவியாளர். உங்கள் கணக்கு முடக்கம் அல்லது மீட்பு நிலை குறித்து நான் எவ்வாறு உதவ முடியும்?",
    chatChipWhyLocked: "என் கணக்கு ஏன் முடக்கப்பட்டது?",
    chatChipTrackStatus: "மீட்பு கோரிக்கை நிலையை சரிபார்",
    chatChipDocsNeeded: "என்ன ஆவணங்கள் தேவை?",
    chatChipHowLong: "மீட்புக்கு எவ்வளவு நேரம் ஆகும்?",
    chatInputPlaceholder: "கணக்கு மீட்பு அல்லது நிலை குறித்து கேளுங்கள்...",
    chatSendBtnText: "அனுப்புக",
    // Smart Hackathon Platform Extensions
    accountOrEmailLabel: "கணக்கு எண் அல்லது மின்னஞ்சல் முகவரி",
    demoQuickLoginLabel: "மாதிரி ஒரு-கிளிக் உள்நுழைவு:",
    loginSecurityNotice: "டெமோ மாதிரி சூழல். உண்மையான வங்கி கடவுச்சொல், PIN அல்லது ரகசிய எண்களை ஒருபோதும் உள்ளிட வேண்டாம்.",
    accountHealthTitle: "கணக்கு பாதுகாப்பு நிலை (Security Health)",
    accountHealthOptimal: "98% - சிறந்த பாதுகாப்பு நிலை",
    accountHealthRestricted: "68% - உடனடி நடவடிக்கை தேவை",
    accountHealthSubtitle: "பயோமெட்ரிக் இருப்பு, பல காரணி பாதுகாப்பு மற்றும் KYC விதிமுறை நிலையை அடிப்படையாகக் கொண்ட தானியங்கி மதிப்பீடு.",
    securityAlertTitle: "பாதுகாப்பு நடவடிக்கை எச்சரிக்கை",
    securityAlertNotice: "புதிய மாதிரி உள்நுழைவு அமர்வு பதிவு செய்யப்பட்டது (Chicago, US - Windows). பயோமெட்ரிக் நடத்தை பதிவு செய்யப்பட்ட வாடிக்கையாளருடன் பொருந்துகிறது.",
    dismissAlert: "ஏற்றுக்கொள்",
    recentTransactionsTitle: "சமீபத்திய மாதிரி பரிவர்த்தனைகள்",
    recentTransactionsSubtitle: "மாதிரி கோர் பேங்கிங் லெட்ஜர். நிகழ்நேர மோசடி தடுப்பு மற்றும் முடக்க விதிகளை விளக்குகிறது.",
    txDate: "தேதி",
    txDescription: "பரிவர்த்தனை விவரங்கள்",
    txAmount: "தொகை",
    txStatus: "நிலை",
    securityTimelineTitle: "பாதுகாப்பு காலவரிசை & தணிக்கைப் பதிவு",
    securityTimelineSubtitle: "வங்கி ஒழுங்குமுறை இணக்கம் மற்றும் கணக்கு பாதுகாப்பு நிகழ்வுகளின் காலவரிசை.",
    chipAccountBlocked: "கணக்கு முடக்கம்",
    chipRecoverAccount: "கணக்கு மீட்பு",
    chipTransactionRisk: "பரிமாற்ற இடர்",
    chipContactSupport: "உதவி மையம்",
    heroSubtitle: "Ungal account ippo temporary-ah lock aagiyirukku. Yen nu check pannalaam; adutha step-la naan help panren.",
    heroSubtitleActive: "Unga account active-ah irukku, unga panam safe-ah irukku.",
    chipWhyLocked: "கணக்கு முடக்கம் (Account Locked)",
    chipHelpRecover: "கணக்கை மீட்டெடு (Recover My Account)",
    chipCheckTransfer: "பரிமாற்ற பாதுகாப்பு (Transfer Safety)",
    chipTrackRecovery: "உதவி மையம் (Contact Support)",
    chatWelcomeStaff: "Vanakkam! Ungal account ippo temporary-ah lock aagiyirukku. Yen nu check pannalaam; adutha step-la naan help panren.",
    transferSuspiciousWarning: "Indha transfer konjam unusual-ah irukku. Anuppuradhukku munnaadi details-a check pannunga.",
    transferSuspiciousReason: "Yen idhu flag aachu: Unga account-la KYC verification pending-la irukku, unga panathukku aabathu vara koodadhu-nu transfer pause aagirukku. Recipient details-a marubadiyum check pannunga.",
    transferSuspiciousRemedy: "Aalosana: Recipient details-a verify pannama amount send panna vendaam. Mela irukra recovery form-a mudithu transfer-a restore pannunga.",
    transferPendingMsg: "Ungal transfer innum complete aagala. Status-a check pannalaam.",
    recoverySubmittedMsg: "Ungal recovery request submit aagiduchu. Idho unga reference number. Adutha update inga paarkkalaam.",
    loginFailedMsg: "Login panna mudiyala. Details-a oru thadava check pannittu try pannunga.",
    riskLowWarning: "வழக்கமான பயன்பாட்டு முறையுடன் பொருந்தும் சாதாரண பரிமாற்றம். உடனடியாக அனுமதிக்கப்பட்டது.",
    riskMedWarning: "அதிகரித்த பரிமாற்ற வேகம் அல்லது அறியப்படாத சாதனம். இரு-காரணி சரிபார்ப்பு பரிந்துரைக்கப்படுகிறது.",
    riskHighWarning: "முக்கிய இடர் தடுக்கப்பட்டது: கணக்கில் ஒழுங்குமுறை முடக்கம் அல்லது புதிய சரிபார்க்கப்படாத பெறுநர். வெளிச்செல்லும் பரிமாற்றம் நிறுத்தப்பட்டது.",
    navOverview: "கண்ணோட்டம் & பாதுகாப்பு",
    navRecoveryHub: "கணக்கு மீட்பு மையம்",
    navTransferSim: "பரிவர்த்தனை சிமுலேட்டர்",
    navActivityAudit: "நடவடிக்கை & லெட்ஜர்",
    navHome: "என் முகப்பு",
    navAccounts: "என் கணக்குகள்",
    navRecentActivity: "சமீபத்திய பரிவர்த்தனைகள்",
    navGetHelp: "உதவி பெற",
    navRecovery: "கணக்கு மீட்பு",
    navSecurityCheck: "பாதுகாப்பு ஆய்வு",
    navHelpCenter: "உதவி மையம்",
    chatTypingLabel: "உதவியாளர் பதிலளிக்கிறார்...",
    fundsSafetyBanner: "100% நிதி பாதுகாப்பு: உங்கள் கணக்கு பணம் முழுமையாக வங்கி கணக்கில் பாதுகாப்பாக உள்ளது.",
    dedicatedRecoveryTitle: "ஸ்மார்ட் கணக்கு மீட்பு விண்ணப்பம்",
    dedicatedRecoverySubtitle: "உங்கள் கணக்கு அணுகலை மீட்டெடுக்க கீழே உள்ள 4-படி சரிபார்ப்பை பூர்த்தி செய்யவும்.",
    submitRecoveryInlineBtn: "கணக்கு மீட்பு கோரிக்கையை சமர்ப்பிக்கவும்",
    dedicatedSimTitle: "வெளிச்செல்லும் பணப்பரிமாற்றம் & நிகழ்நேர இடர் பகுப்பாய்வு",
    dedicatedSimSubtitle: "ReBank-இன் தானியங்கி இடர் பகுப்பாய்வு மற்றும் மோசடி தடுப்பு முறையை சோதிக்கவும்.",
    assessRiskBtn: "இடரை மதிப்பிட்டு பரிவர்த்தனையை சோதிக்கவும்",
    beneficiaryNameLabel: "பயனாளி முழு பெயர்",
    destAccountLabel: "இலக்கு கணக்கு எண் / IBAN",
    transferAmountLabel: "பரிமாற்ற தொகை ($ USD)",
    transferSpeedLabel: "பரிமாற்ற வேகம்",
    instantSpeed: "உடனடி நிகழ்நேர பரிமாற்றம்",
    standardSpeed: "வழக்கமான பரிமாற்றம் (1-2 நாட்கள்)",
    captureSelfieBtnText: "📸 5-வினாடி நேரடி செல்ஃபி எடுக்கவும்",
    selfieStatusPending: "நேரடி செல்ஃபி சரிபார்ப்புக்கு தயார்",
    docTypeLabel: "அரசு அடையாள அட்டை வகை",
    docNumberLabel: "ஆவண அடையாள எண்",
    addrTypeLabel: "முகவரி சான்று ஆவணம்",
    additionalNotesLabel: "கூடுதல் விளக்கம் / குறிப்பு",
    recoveryActiveTitle: "விண்ணப்பம் பரிசீலனையில் உள்ளது",
    recoveryActiveDesc: "உங்கள் கணக்கு மீட்பு விண்ணப்பம் வங்கி இணக்கக் குழுவின் இரட்டைக் கட்டுப்பாட்டு ஆய்வில் தீவிரமாக செயலாக்கப்படுகிறது. தீர்வு நேரம் 2–4 மணிநேரம்.",
    viewTrackerBtn: "நேரலை கண்காணிப்பைப் பார்க்கவும்",
    optPassport: "கடவுச்சீட்டு (Passport)",
    optNationalId: "தேசிய அடையாள அட்டை / ஆதார் அட்டை",
    optDriversLicense: "ஓட்டுநர் உரிமம் (Driver's License)",
    optUtilityBill: "பயன்பாட்டு கட்டண ரசீது (மின்சாரம்/தண்ணீர் 90 நாட்களுக்குள்)",
    optBankStatement: "சான்றளிக்கப்பட்ட வங்கி கணக்கு அறிக்கை (90 நாட்களுக்குள்)",
    optTaxAssessment: "நகராட்சி வரி / குடியிருப்பு சான்றிதழ்",
    profileTitle: "வாடிக்கையாளர் சுயவிவரம்",
    navDashboard: "டாஷ்போர்டு",
    navAllAccounts: "அனைத்து கணக்குகள்",
    navAllBanks: "அனைத்து வங்கிகள்",
    navBankTransfer: "வங்கி பணப்பரிமாற்றம்",
    navBillPayments: "கட்டண செலுத்துதல்கள்",
    navBankDeposits: "வங்கி வைப்புத்தொகைகள்",
    navCards: "கார்டுகள்",
    navAccountStatement: "கணக்கு அறிக்கை",
    navAiCommunication: "AI உடனுரையாடல்",
    navContactUs: "எங்களை தொடர்பு கொள்ள",
    navLogout: "வெளியேறு",
    quickBankingActions: "விரைவு வங்கி சேவைகள்",
    quickScanPay: "ஸ்கேன் & பே",
    quickPayAnyone: "யாருக்கும் செலுத்து",
    quickTransfer: "வங்கி பரிமாற்றம்",
    quickBills: "கட்டணம் செலுத்து",
    quickDth: "டி.டி.எச் / கேபிள்",
    quickCards: "கார்டுகள்",
    quickStatement: "அறிக்கை",
    quickAccounts: "அனைத்து கணக்குகள்",
    quickDeposits: "வைப்புத்தொகை",
    quickRecovery: "மீட்பு மையம்",
    quickAiChat: "AI உதவியாளர்",
    quickSupport: "வாடிக்கையாளர் உதவி",
    bankNameLabel: "வங்கி பெயர்",
    branchCodeLabel: "கிளை குறியீடு (விருப்பமானது)",
    districtLabel: "மாவட்டம் / நகரம்",
    pinCodeLabel: "அஞ்சல் குறியீட்டு எண்",
    remarksLabel: "குறிப்பு / நோக்கம்",
    checkSafetyBtn: "பரிமாற்ற பாதுகாப்பை சரிபார்",
    confirmTransferBtn: "உறுதிசெய்து பணத்தை அனுப்பு",
    transferSuccessTitle: "பணப்பரிமாற்றம் வெற்றிகரமாக முடிந்தது!",
    billerOperatorLabel: "கட்டண நிறுவனம் / ஆப்ரேட்டர்",
    consumerNumberLabel: "நுகர்வோர் எண் / சந்தாதாரர் ID",
    billAmountLabel: "கட்டணத் தொகை ($ USD)",
    payBillNowBtn: "இப்போதே கட்டணம் செலுத்து",
    billSuccessTitle: "கட்டணம் வெற்றிகரமாக செலுத்தப்பட்டது!",
    activeDepositsTitle: "உங்கள் நடப்பு வைப்புத்தொகைகள்",
    openDepositBtn: "வைப்பு கணக்கு திறக்க",
    depositTypeLabel: "வைப்புத்தொகை வகை",
    depositAmountLabel: "அசல் தொகை ($ USD)",
    tenureLabel: "கால அளவு (மாதங்கள்)",
    interestRateLabel: "வட்டி விகிதம் (ஆண்டுக்கு)",
    maturityAmountLabel: "மதிப்பிடப்பட்ட முதிர்வுத் தொகை",
    downloadCsvBtn: "அறிக்கையைப் பதிவிறக்கு (CSV)",
    searchTxnPlaceholder: "பெறுநர், விவரம் அல்லது குறிப்பு எண் மூலம் தேடுங்கள்...",
    helplineTitle: "24x7 வாடிக்கையாளர் உதவி எண்",
    complianceDeskTitle: "இணக்கம் & குறைதீர்ப்பு பிரிவு",
    qrScannerTitle: "செலுத்த QR ஸ்கேன் செய்க",
    cameraDeniedFallback: "கேமரா அணுகல் கிடைக்கவில்லை. கைமுறையாக விவரங்களை உள்ளிடவும் அல்லது டெமோ QR-ஐ பயன்படுத்தவும்.",
    demoQrBtn: "டெமோ QR பயன்படுத்துக",
    addressLabel: "குடியிருப்பு முகவரி",
    saveProfileBtn: "மாற்றங்களைச் சேமி",
    backToDashboard: "டாஷ்போர்டுக்குத் திரும்பு",
    transferReviewTitle: "பரிமாற்ற விவரங்களை மதிப்பாய்வு செய்க",
    transferReviewSubtitle: "அங்கீகரிக்கும் முன் பெறுநர் மற்றும் கணக்கு தகவல்களை சரிபார்க்கவும்",
    transferSecurityNotice: "பூஜ்ஜிய-நம்பிக்கை பரிமாற்ற உத்தரவாதம்: உங்கள் நிதி பாதுகாக்கப்பட்டுள்ளது.",
    editDetailsBtn: "விவரங்களை மாற்றுக",
    authorizeTransferBtn: "பரிமாற்றத்தை அங்கீகரித்து அனுப்புக",
    feeLabel: "பரிமாற்ற கட்டணம்",
    navLockReasons: "முடக்கம் காரணங்கள் & தீர்வு",
    authLockGuideTitle: "வங்கி கணக்கு முடக்கப்பட்டதா?",
    authLockGuideSub: "வங்கி முடக்க காரணங்கள் மற்றும் விடுவிக்கும் வழிமுறைகளை காண்க",
    exploreReasonsBtn: "வழிகாட்டி காண்க",
    quickLockReasons: "முடக்கம் காரணங்கள்",
    lockReasonsHeroTitle: "வங்கி கணக்கு முடக்க காரணங்கள் மற்றும் தீர்வு வழிகாட்டி",
    lockReasonsHeroDesc: "வங்கிகள் கணக்கை முடக்குவதற்கான சட்டப்பூர்வ காரணங்கள் மற்றும் கணக்கை விடுவிப்பதற்கான படிப்படியான வழிமுறைகள்.",
    applyUnfreezeBtn: "கணக்கை விடுவிக்க தொடங்கு",
    kpiCategoriesTitle: "8 முக்கிய முடக்க வகைகள்",
    kpiMandateTitle: "சட்ட விதிகளின் இணக்கம்",
    kpiSlaTitle: "தீர்வு நேரம் (SLA)",
    kpiSelfServiceTitle: "டிஜிட்டல் தீர்வு கிடைக்கிறது",
    diagnosticTitle: "ஊடாடும் முடக்க அறிகுறி சோதனையாளர்",
    diagnosticDesc: "ஏடிஎம் அல்லது நெட்பேங்கிங்கில் கண்ட பிழை செய்தியை தேர்ந்தெடுத்து சரியான காரணத்தையும் தீர்வையும் கண்டறியவும்.",
    diagSelectPrompt: "-- பிழை செய்தி அல்லது அறிகுறியை தேர்ந்தெடுக்கவும் --",
    diagnoseBtn: "அறிகுறியை ஆய்வு செய்",
    resetFilterBtn: "மீட்டமை",
    clearSearch: "அழி",
    catAllReasons: "🌐 அனைத்து பிரிவுகள் (8)",
    catCompliance: "📋 இணக்கம் & கேஒய்சி (2)",
    catSecurity: "🛡️ பாதுகாப்பு & ஏஎம்எல் (2)",
    catLegal: "⚖️ காவல்துறை & சட்ட உத்தரவுகள் (2)",
    catFinancial: "💳 ஓவர்டிராஃப்ட் & அவசரநிலை (2)",
    loadingLockReasons: "வங்கி கணக்கு முடக்க காரணிகள் ஏற்றப்படுகின்றன...",
    statutoryEscalationTitle: "சட்டப்பூர்வ வங்கி குறைதீர்ப்பாளர் & போர்ட்டல்கள்",
    statutoryEscalationDesc: "குறிப்பிட்ட காலத்திற்குள் வங்கி கணக்கை விடுவிக்கவில்லை என்றால், நீங்கள் அதிகாரப்பூர்வ ஒழுங்குமுறை ஆணையத்தில் புகார் செய்யலாம்:",
    cardDebitsLabel: "பற்று / அனுப்புதல்",
    cardCreditsLabel: "வரவு / பெறுதல்",
    cardAtmLabel: "ஏடிஎம் & பிஓஎஸ் கார்டுகள்",
    cardNetBankingLabel: "நெட்பேங்கிங் & யுபிஐ",
    requiredDocsLabel: "கணக்கை விடுவிக்க தேவையான ஆவணங்கள்",
    unlockProcedureLabel: "படிப்படியான தீர்வு செயல்முறை",
    unlockOnlineBtn: "⚡ ஆன்லைனில் கணக்கை விடுவி",
    askAiAboutThisBtn: "💬 AI உதவியாளரிடம் கேள்",
    navProfile: "வாடிக்கையாளர் விவரம்",
    navRegisterAccount: "கணக்கை பதிவு செய்"
  },
  hi: {
    recoveryPlatform: "पुनर्प्राप्ति मंच (RECOVERY PLATFORM)",
    demoRole: "डेमो भूमिका:",
    mobileView: "मोबाइल दृश्य",
    desktopView: "डेस्कटॉप दृश्य",
    notifications: "सूचनाएं",
    markAllRead: "सभी को पढ़ा हुआ चिह्नित करें",
    noNotifications: "कोई सूचना नहीं है",
    disclaimer: "सिम्युलेटेड कोर बैंकिंग सिस्टम (CBS) डेमो परिवेश। कोई वास्तविक बैंकिंग फंड या उत्पादन क्रेडेंशियल का उपयोग नहीं किया जाता है।",
    signInTitle: "ReBank में साइन इन करें",
    signInSubtitle: "सुरक्षित बहु-भूमिका बैंकिंग पहुंच",
    loginTab: "साइन इन",
    registerTab: "नया खाता बनाएं",
    registerSubtitle: "अपना सरल और स्मार्ट बैंक खाता बनाएं",
    registerSuccess: "पंजीकरण सफल! आपका ग्राहक खाता बना दिया गया है।",
    emailLabel: "ईमेल पता",
    passwordLabel: "पासवर्ड",
    signInButton: "साइन इन करें",
    fullNameLabel: "पूरा कानूनी नाम",
    phoneLabel: "मोबाइल फोन नंबर",
    createAccountButton: "डेमो खाता बनाएं",
    welcomeBack: "वापसी पर स्वागत है,",
    helpSupport: "सहायता एवं शिकायतें",
    availableBalance: "उपलब्ध शेष राशि",
    startRecoveryBtn: "खाता पुनर्प्राप्ति शुरू करें",
    estTurnaround: "अनुमानित समाधान समय (SLA):",
    recoveryTickets: "पुनर्प्राप्ति अनुरोध एवं स्थिति समयरेखा",
    noActiveTickets: "कोई सक्रिय पुनर्प्राप्ति अनुरोध नहीं मिला।",
    resetDemoState: "डेमो स्थिति रीसेट करें",
    reviewerQueue: "समीक्षक कतार (Maker L1)",
    approverQueue: "स्वीकृतिकर्ता कतार (Checker L2)",
    auditTrail: "ऑडिट लॉग स्ट्रीम",
    cbsTelemetry: "कोर बैंकिंग (CBS) सैंडबॉक्स",
    recoveryWizardTitle: "डिजिटल बैंक खाता पुनर्प्राप्ति आवेदन",
    stepDiagnosis: "निदान",
    stepIdentity: "पहचान",
    stepDocuments: "दस्तावेज",
    stepConsent: "समीक्षा एवं हस्ताक्षर",
    requiredTasks: "आवश्यक उपचारात्मक कार्य:",
    confirmContact: "प्राथमिक फोन और ईमेल की पुष्टि करें",
    contactAccurate: "मैं पुष्टि करता/करती हूँ कि मेरी संपर्क जानकारी वर्तमान और सटीक है।",
    faceDetected: "✓ चेहरे की स्थिति अनुकूल",
    livenessDesc: "डिवाइस को आंख के स्तर पर रखें और वास्तविक उपस्थिति सत्यापित करने के लिए संकेत मिलने पर पलकें झपकाएं।",
    captureSelfie: "लाइव सेल्फी लें",
    govtIdUpload: "सरकार द्वारा जारी फोटो पहचान पत्र (पासपोर्ट / आधार / ड्राइविंग लाइसेंस)",
    proofAddressUpload: "पते का प्रमाण (< 90 दिन का बिजली बिल या बैंक विवरण)",
    clickOrDrag: "दस्तावेज़ अपलोड करने के लिए क्लिक करें या खींचें",
    explanationStatement: "ग्राहक स्पष्टीकरण / टिप्पणी",
    sourceOfFunds: "धन के स्रोत की घोषणा",
    legalConsent: "मैं प्रमाणित करता/करती हूँ कि सभी अपलोड किए गए दस्तावेज और जानकारी प्रामाणिक हैं। मैं ReBank को आधिकारिक रजिस्ट्रीयों से इसका सत्यापन करने के लिए अधिकृत करता/करती हूँ।",
    back: "पीछे",
    next: "जारी रखें",
    submitApplication: "पुनर्प्राप्ति आवेदन जमा करें",
    helpCenter: "सहायता केंद्र और शिकायत निवारण",
    fileGrievance: "शिकायत दर्ज करें",
    subjectLabel: "विषय",
    categoryLabel: "श्रेणी",
    descriptionLabel: "विस्तृत विवरण",
    submitGrievance: "शिकायत सबमिट करें",
    myGrievances: "मेरी शिकायतें एवं स्थिति",
    tier: "स्तर",
    escalate: "एस्केलेट करें (+1 स्तर)",
    privacyCenter: "गोपनीयता और सहमति",
    privacyCenterTitle: "सुरक्षा एवं डेटा गोपनीयता केंद्र",
    roleFraudAnalyst: "धोखाधड़ी विश्लेषक",
    fraudTab: "धोखाधड़ी पहचान एवं अलर्ट",
    reportsTab: "रिपोर्ट और एनालिटिक्स",
    openAlerts: "खुले अलर्ट",
    criticalThreats: "गंभीरता: क्रिटिकल",
    avgRiskScore: "औसत जोखिम स्कोर",
    activeRules: "सक्रिय नियम",
    immediateTriage: "तत्काल समीक्षा आवश्यक",
    scaleMax: "पैमाना 0 - 100",
    rulesEngine: "नियम इंजन सक्षम",
    nextStep: "अपेक्षित अगला कदम:",
    resubmissionRequired: "कार्रवाई आवश्यक: अतिरिक्त जानकारी का अनुरोध",
    resubmissionInstructions: "समीक्षक प्रतिक्रिया / निर्देश:",
    missingDocs: "लापता / आवश्यक दस्तावेज:",
    uploadRequestedInfo: "अनुरोधित दस्तावेज अपलोड करें",
    stageSubmitted: "1. सबमिट किया गया",
    stageUnderReview: "2. समीक्षाधीन",
    stageInfoReq: "3. जानकारी मांगी गई",
    stageAuthorized: "4. अधिकृत",
    stageRestored: "5. खाता पुनर्स्थापित (CBS Restored)",
    // Bank account registration
    registerBankTitle: "बैंक खाता पंजीकृत करें",
    registerBankSubtitle: "सहायता के लिए अपना घरेलू या अंतर्राष्ट्रीय बैंक खाता लिंक करें",
    backToAccounts: "खातों पर वापस जाएं",
    dobLabel: "जन्म तिथि (वैकल्पिक)",
    residentialAddressLabel: "आवासीय पता (वैकल्पिक)",
    postalCodeLabel: "पिन / डाक कोड",
    accountTypeLabel: "खाता प्रकार",
    termsConsentTitle: "मैं घोषणा और पुष्टि करता हूँ",
    cancelBtn: "रद्द करें",
    termsRequiredError: "कृपया खाता सत्यापन शर्तों से सहमत हों।",
    accountHolderNameLabel: "खाता धारक का नाम",
    branchNameLabel: "शाखा का नाम",
    cityLabel: "शहर",
    stateLabel: "राज्य",
    countryLabel: "देश",
    bankAccNumLabel: "बैंक खाता संख्या",
    confirmAccNumLabel: "खाता संख्या की पुष्टि करें",
    ifscCodeLabel: "आईएफएससी कोड (IFSC Code)",
    registerBankBtn: "बैंक खाता पंजीकृत करें",
    registerBankSuccess: "बैंक खाता सफलतापूर्वक पंजीकृत किया गया (सत्यापन लंबित है)।",
    accountMismatchError: "बैंक खाता संख्या और पुष्टिकरण खाता संख्या मेल नहीं खाते।",
    invalidIfscError: "भारत के लिए अमान्य IFSC कोड प्रारूप (उदा. SBIN0001234: 4 अक्षर, शून्य, 6 अल्फ़ान्यूमेरिक)।",
    invalidPhoneError: "कृपया एक मान्य फ़ोन नंबर दर्ज करें (कम से कम 10 अंक)।",
    requiredFieldsError: "कृपया सभी आवश्यक फ़ील्ड भरें।",
    invalidEmailError: "कृपया एक मान्य ईमेल पता दर्ज करें।",
    shortPasswordError: "पासवर्ड कम से कम 8 वर्णों का होना चाहिए।",
    invalidNameError: "कृपया अपना पूरा कानूनी नाम दर्ज करें (कम से कम 2 वर्ण)।",
    // Hackathon upgrade additions: Lock explanations, transfer simulation, chatbot
    explainLockBtn: "मेरा खाता क्यों बंद है?",
    simulateTransferBtn: "स्थानांतरण सिमुलेशन",
    lockModalTitle: "खाता प्रतिबंध और सुरक्षा विवरण",
    lockModalSubtitle: "नियामक प्रतिबंधों और फंड सुरक्षा पर पारदर्शी, सरल भाषा में स्पष्टीकरण।",
    whyLockedHeading: "आपका खाता क्यों प्रतिबंधित किया गया?",
    fundsSafeHeading: "क्या मेरे पैसे सुरक्षित हैं?",
    fundsSafeNotice: "हाँ! आपके 100% पैसे आपके खाते में पूरी तरह सुरक्षित हैं। कोई राशि काटी नहीं गई है। आपकी संपत्ति की सुरक्षा के लिए केवल जावक (आउटबाउंड) लेनदेन अस्थायी रूप से रोके गए हैं।",
    impactServicesHeading: "सेवा स्थिति तालिका",
    serviceDepositsAllowed: "इनबाउंड जमा और वेतन क्रेडिट: अनुमत है",
    serviceStatementsAllowed: "खाता विवरण और शेष राशि पूछताछ: अनुमत है",
    serviceOutboundPaused: "आउटबाउंड UPI / नेट बैंकिंग ट्रांसफर: अस्थायी रूप से निलंबित",
    serviceAtmPaused: "ATM नकद निकासी और डेबिट कार्ड: अस्थायी रूप से निलंबित",
    stepsToUnblockHeading: "खाते तक पुनः पहुंच कैसे प्राप्त करें",
    step1Unblock: "चरण 1: पोर्टल पर अपना वैध सरकारी पहचान दस्तावेज अपलोड करें।",
    step2Unblock: "चरण 2: 5 सेकंड का डिजिटल लाइवनेस सेल्फी सत्यापन पूरा करें।",
    step3Unblock: "चरण 3: हमारी संचालन टीम समीक्षा करेगी और निर्धारित समय सीमा (2-4 घंटे) में खाता अनफ्रीज करेगी।",
    closeLockModalBtn: "विवरण बंद करें",
    simReasonsHeading: "सामान्य अनुकरणीय लॉक परिदृश्य और समाधान",
    reasonFailedLoginTitle: "1. विफल लॉगिन प्रयास (सुरक्षा कवच)",
    reasonFailedLoginDesc: "लगातार 5 गलत पासवर्ड दर्ज करने या संदिग्ध आईपी पते से लॉगिन प्रयास के बाद सक्रिय होता है। क्रेडेंशियल सुरक्षा के लिए ऑनलाइन लॉगिन 30 मिनट के लिए निलंबित होता है, जबकि आपका 100% पैसा सुरक्षित रहता है।",
    reasonFailedLoginAction: "क्रेडेंशियल पुनर्प्राप्त करें",
    reasonKycExpiryTitle: "2. केवाईसी / दस्तावेज़ समाप्ति (नियामक नवीनीकरण)",
    reasonKycExpiryDesc: "बैंकिंग नियमों के अनुसार हर 2 वर्ष में पुन: सत्यापन अनिवार्य है। आवक जमा सामान्य रूप से जारी रहता है; नए दस्तावेज़ प्रस्तुत होने तक बाहरी अंतरण अस्थायी रूप से रोके जाते हैं।",
    reasonKycExpiryAction: "केवाईसी नवीनीकृत करें",
    reasonSecurityPendingTitle: "3. सुरक्षा सत्यापन लंबित (धोखाधड़ी रोकथाम)",
    reasonSecurityPendingDesc: "असामान्य उच्च-गति अंतरण, नए प्राप्तकर्ता या जोखिम अलर्ट पर सक्रिय होता है। समीक्षा के लिए बाहरी वायर ट्रांसफर को रोका जाता है।",
    reasonSecurityPendingAction: "सुरक्षा रोक सत्यापित करें",
    reasonDormancyTitle: "4. अस्थायी खाता प्रतिबंध (निष्क्रियता / डॉर्मेंसी)",
    reasonDormancyDesc: "365+ दिनों तक कोई ग्राहक लेनदेन न होने पर लागू होता है। अप्रयुक्त शेष राशि की सुरक्षा के लिए खाता निष्क्रिय मोड में बदल दिया जाता है।",
    reasonDormancyAction: "खाता पुनः सक्रिय करें",
    simModalTitle: "जावक स्थानांतरण अनुकरण (सिमुलेशन)",
    simModalSubtitle: "ReBank के रीयल-टाइम जोखिम प्रबंधन और धोखाधड़ी रोकथाम इंजन का परीक्षण करें।",
    simSourceAccLabel: "स्रोत खाता",
    simAmountLabel: "स्थानांतरण राशि ($)",
    simPayeeNameLabel: "लाभार्थी / प्राप्तकर्ता का नाम",
    simPayeeAccLabel: "लाभार्थी खाता संख्या",
    simScenarioLabel: "सिमुलेशन जोखिम परिदृश्य",
    simScenarioNormal: "1. मानक घरेलू स्थानांतरण (सामान्य / कम जोखिम)",
    simScenarioVelocity: "2. तीव्र गति / एकाधिक प्रयास (संदिग्ध गतिविधि)",
    simScenarioNewPayee: "3. असत्यापित अंतर्राष्ट्रीय क्रिप्टो प्राप्तकर्ता (उच्च जोखिम)",
    simScenarioRestricted: "4. वर्तमान में प्रतिबंधित खाते से जावक स्थानांतरण",
    simSubmitBtn: "स्थानांतरण सिमुलेशन चलाएं",
    simResultTitle: "स्थानांतरण जोखिम व सुरक्षा मूल्यांकन",
    simRiskScoreLabel: "सुरक्षा जोखिम स्कोर:",
    simDisclaim: "नियामक सुरक्षा सूचना: जोखिम स्कोर सुरक्षात्मक निर्णय-समर्थन संकेतक हैं, दोष का प्रमाण नहीं। वास्तविक खाते मनमाने ढंग से बंद नहीं किए जाते।",
    chatLauncherText: "ReBank AI सहायक",
    chatTitle: "ReBank AI सहायता केंद्र",
    chatSubtitle: "24/7 स्मार्ट सहायक (डेमो मोड)",
    chatSecurityNotice: "ReBank AI कभी भी आपका पिन, पासवर्ड या ओटीपी नहीं मांगेगा।",
    chatWelcomeMsg: "नमस्ते! मैं आपका ReBank पुनर्प्राप्ति सहायक हूँ। आज मैं आपके खाते को पुनः सक्रिय करने या प्रश्नों के उत्तर देने में कैसे मदद कर सकता हूँ?",
    chatChipWhyLocked: "मेरा खाता क्यों बंद है?",
    chatChipTrackStatus: "पुनर्प्राप्ति स्थिति ट्रैक करें",
    chatChipDocsNeeded: "किन दस्तावेजों की आवश्यकता है?",
    chatChipHowLong: "खाता चालू होने में कितना समय लगेगा?",
    chatInputPlaceholder: "खाता पुनर्प्राप्ति या स्थिति के बारे में पूछें...",
    chatSendBtnText: "भेजें",
    // Smart Hackathon Platform Extensions
    accountOrEmailLabel: "खाता संख्या या ईमेल पता",
    demoQuickLoginLabel: "डेमो एक-क्लिक साइन इन:",
    loginSecurityNotice: "डेमो प्रोटोटाइप वातावरण। कभी भी वास्तविक बैंकिंग क्रेडेंशियल, पिन या पासवर्ड दर्ज न करें।",
    accountHealthTitle: "खाता सुरक्षा स्वास्थ्य (Security Health)",
    accountHealthOptimal: "98% - सुरक्षित व इष्टतम",
    accountHealthRestricted: "68% - कार्रवाई आवश्यक",
    accountHealthSubtitle: "बायोमेट्रिक लाइवनेस, मल्टी-फैक्टर प्रमाणीकरण और नियामक केवाईसी स्थिति पर आधारित स्वचालित स्कोर।",
    securityAlertTitle: "सुरक्षा गतिविधि अलर्ट",
    securityAlertNotice: "शिकागो, यूएस (विंडोज़) से नया सिम्युलेटेड सत्र दर्ज किया गया। व्यवहार बायोमेट्रिक्स अधिकृत ग्राहक प्रोफ़ाइल से मेल खाता है।",
    dismissAlert: "स्वीकार करें",
    recentTransactionsTitle: "हालिया सिम्युलेटेड लेनदेन",
    recentTransactionsSubtitle: "सिम्युलेटेड कोर बैंकिंग खाता। वास्तविक समय धोखाधड़ी स्कोरिंग और सुरक्षा नियमों को प्रदर्शित करता है।",
    txDate: "दिनांक",
    txDescription: "लेनदेन विवरण",
    txAmount: "राशि",
    txStatus: "स्थिति",
    securityTimelineTitle: "सुरक्षा गतिविधि और ऑडिट लॉग",
    securityTimelineSubtitle: "नियामक अनुपालन और खाता सुरक्षा घटनाओं का कालानुक्रमिक इतिहास।",
    chipAccountBlocked: "खाता अवरुद्ध",
    chipRecoverAccount: "खाता पुनर्प्राप्ति",
    chipTransactionRisk: "स्थानांतरण जोखिम",
    chipContactSupport: "सहायता संपर्क",
    heroSubtitle: "आपका खाता अभी अस्थायी रूप से लॉक है। आइए देखें क्यों, और इसे वापस पाने में मैं आपकी मदद करता हूँ।",
    heroSubtitleActive: "आपका खाता सक्रिय, सत्यापित और सुरक्षित है।",
    chipWhyLocked: "खाता लॉक (Account Locked)",
    chipHelpRecover: "खाता रिकवर करें (Recover My Account)",
    chipCheckTransfer: "ट्रांसफर सुरक्षा (Transfer Safety)",
    chipTrackRecovery: "सहायता संपर्क (Contact Support)",
    chatWelcomeStaff: "नमस्ते! मैं आपका ReBank AI सहायक हूँ। आपका खाता अभी अस्थायी रूप से लॉक है। आइए देखें क्यों, और इसे वापस पाने में मैं आपकी मदद करता हूँ।",
    transferSuspiciousWarning: "यह ट्रांसफर थोड़ा असामान्य लग रहा है। कृपया आगे बढ़ने से पहले विवरण दोबारा जाँच लें।",
    transferSuspiciousReason: "यह क्यों चिन्हित किया गया: आपके खाते पर नियामक केवाईसी सत्यापन लंबित है, और आपकी जमा राशि की सुरक्षा हेतु बाहरी अंतरण रोका गया है। प्राप्तकर्ता की जानकारी दोबारा जाँच लें।",
    transferSuspiciousRemedy: "सलाह: पूर्ण सत्यापन तक आगे न बढ़ें। स्थानांतरण सेवा तुरंत बहाल करने के लिए ऊपर दिए गए रिकवरी फॉर्म में सत्यापन पूरा करें।",
    transferPendingMsg: "आपका ट्रांसफर अभी पूरा नहीं हुआ है। आइए इसकी स्थिति जांचें।",
    recoverySubmittedMsg: "आपका रिकवरी अनुरोध जमा हो गया है। यह रहा आपका संदर्भ नंबर। आप अगला अपडेट यहाँ देख सकते हैं।",
    loginFailedMsg: "हम आपको लॉगिन नहीं कर सके। कृपया अपना विवरण जांचें और पुनः प्रयास करें।",
    riskLowWarning: "सामान्य व्यवहार पैटर्न के अंतर्गत सामान्य लेनदेन। तुरंत स्वीकृत।",
    riskMedWarning: "असामान्य गति या अपरिचित डिवाइस का पता चला। दो-चरणीय सत्यापन का सुझाव दिया गया है।",
    riskHighWarning: "गंभीर जोखिम रोका गया: खाते पर सक्रिय नियामक प्रतिबंध या असत्यापित अंतर्राष्ट्रीय प्राप्तकर्ता। आउटबाउंड अंतरण निलंबित।",
    navOverview: "अवलोकन एवं स्वास्थ्य",
    navRecoveryHub: "खाता पुनर्प्राप्ति केंद्र",
    navTransferSim: "स्थानांतरण सिमुलेटर",
    navActivityAudit: "गतिविधि एवं बहीखाता",
    navHome: "मेरा होम",
    navAccounts: "मेरे खाते",
    navRecentActivity: "हाल की गतिविधियां",
    navGetHelp: "सहायता लें",
    navRecovery: "खाता रिकवरी",
    navSecurityCheck: "सुरक्षा जांच",
    navHelpCenter: "सहायता केंद्र",
    chatTypingLabel: "सहायक लिख रहा है...",
    fundsSafetyBanner: "100% फंड सुरक्षा: पुनर्प्राप्ति प्रक्रिया के दौरान आपकी पूरी जमा राशि पूरी तरह सुरक्षित है।",
    dedicatedRecoveryTitle: "स्मार्ट खाता पुनर्प्राप्ति आवेदन",
    dedicatedRecoverySubtitle: "खाता पुनः चालू करने हेतु नीचे दी गई 4-चरणीय सत्यापन प्रक्रिया पूर्ण करें।",
    submitRecoveryInlineBtn: "खाता पुनर्प्राप्ति अनुरोध जमा करें",
    dedicatedSimTitle: "आउटबाउंड ट्रांसफर एवं वास्तविक समय जोखिम विश्लेषण",
    dedicatedSimSubtitle: "ReBank के स्वचालित जोखिम विश्लेषण एवं धोखाधड़ी रोधी इंजन का परीक्षण करें।",
    assessRiskBtn: "जोखिम का मूल्यांकन करें एवं सिमुलेशन चलाएं",
    beneficiaryNameLabel: "लाभार्थी का पूरा नाम",
    destAccountLabel: "गंतव्य खाता संख्या / IBAN",
    transferAmountLabel: "स्थानांतरण राशि ($ USD)",
    transferSpeedLabel: "स्थानांतरण गति",
    instantSpeed: "त्वरित वास्तविक समय वायर",
    standardSpeed: "मानक समाशोधन (1-2 दिन)",
    captureSelfieBtnText: "📸 5-सेकंड डिजिटल लाइवनेस सेल्फी लें",
    selfieStatusPending: "सेल्फी सत्यापन हेतु तैयार",
    docTypeLabel: "सरकारी फोटो पहचान पत्र का प्रकार",
    docNumberLabel: "दस्तावेज पहचान संख्या",
    addrTypeLabel: "पते का प्रमाण दस्तावेज",
    additionalNotesLabel: "अतिरिक्त स्पष्टीकरण / संदर्भ",
    recoveryActiveTitle: "आवेदन समीक्षाधीन है",
    recoveryActiveDesc: "आपका खाता पुनर्प्राप्ति आवेदन बैंक अनुपालन टीम द्वारा दोहरे-नियंत्रण मेकर-चेकर प्रक्रिया के तहत संसाधित किया जा रहा है। समाधान समय 2–4 घंटे है।",
    viewTrackerBtn: "लाइव ट्रैकर देखें",
    optPassport: "पासपोर्ट (अंतर्राष्ट्रीय यात्रा मानक)",
    optNationalId: "राष्ट्रीय पहचान पत्र / आधार कार्ड",
    optDriversLicense: "ड्राइविंग लाइसेंस",
    optUtilityBill: "उपयोगिता बिल (90 दिनों के भीतर बिजली/पानी)",
    optBankStatement: "सत्यापित बैंक खाता विवरण (90 दिनों के भीतर)",
    optTaxAssessment: "नगर निगम कर / आवासीय प्रमाण पत्र",
    profileTitle: "ग्राहक प्रोफ़ाइल",
    navDashboard: "डैशबोर्ड",
    navAllAccounts: "सभी खाते",
    navAllBanks: "सभी बैंक",
    navBankTransfer: "बैंक ट्रांसफर",
    navBillPayments: "बिल भुगतान",
    navBankDeposits: "बैंक जमा (Deposits)",
    navCards: "कार्ड्स (Cards)",
    navAccountStatement: "खाता विवरण (Statement)",
    navAiCommunication: "AI से बातचीत",
    navContactUs: "संपर्क करें",
    navLogout: "लॉगआउट",
    quickBankingActions: "त्वरित बैंकिंग कार्य",
    quickScanPay: "स्कैन और भुगतान",
    quickPayAnyone: "किसी को भी भुगतान",
    quickTransfer: "बैंक ट्रांसफर",
    quickBills: "बिल भुगतान",
    quickDth: "डीटीएच / केबल",
    quickCards: "कार्ड्स",
    quickStatement: "विवरण",
    quickAccounts: "सभी खाते",
    quickDeposits: "जमा (Deposits)",
    quickRecovery: "रिकवरी हब",
    quickAiChat: "AI सहायक",
    quickSupport: "ग्राहक सहायता",
    bankNameLabel: "बैंक का नाम",
    branchCodeLabel: "शाखा कोड (वैकल्पिक)",
    districtLabel: "जिला / शहर",
    pinCodeLabel: "पिन कोड",
    remarksLabel: "टिप्पणी / उद्देश्य",
    checkSafetyBtn: "ट्रांसफर सुरक्षा जांचें",
    confirmTransferBtn: "पुष्टि करें और ट्रांसफर करें",
    transferSuccessTitle: "स्थानांतरण सफलतापूर्वक निष्पादित!",
    billerOperatorLabel: "बिलर / ऑपरेटर",
    consumerNumberLabel: "उपभोक्ता संख्या / ग्राहक आईडी",
    billAmountLabel: "बिल राशि ($ USD)",
    payBillNowBtn: "अभी बिल का भुगतान करें",
    billSuccessTitle: "बिल भुगतान सफल रहा!",
    activeDepositsTitle: "आपकी सक्रिय जमा राशि",
    openDepositBtn: "जमा खाता खोलें",
    depositTypeLabel: "जमा का प्रकार",
    depositAmountLabel: "मूलधन राशि ($ USD)",
    tenureLabel: "अवधि (महीने)",
    interestRateLabel: "ब्याज दर (वार्षिक)",
    maturityAmountLabel: "अनुमानित परिपक्वता राशि",
    downloadCsvBtn: "विवरण डाउनलोड करें (CSV)",
    searchTxnPlaceholder: "प्राप्तकर्ता, विवरण या संदर्भ संख्या द्वारा खोजें...",
    helplineTitle: "24x7 ग्राहक हेल्पलाइन",
    complianceDeskTitle: "अनुपालन एवं निवारण डेस्क",
    qrScannerTitle: "भुगतान के लिए QR स्कैन करें",
    cameraDeniedFallback: "कैमरा पहुंच अनुपलब्ध है। विवरण मैन्युअल रूप से दर्ज करें या डेमो क्यूआर का उपयोग करें।",
    demoQrBtn: "डेमो QR का उपयोग करें",
    addressLabel: "आवासीय पता",
    saveProfileBtn: "परिवर्तन सहेजें",
    backToDashboard: "डैशबोर्ड पर वापस जाएं",
    transferReviewTitle: "स्थानांतरण विवरण की समीक्षा करें",
    transferReviewSubtitle: "अधिकृत करने से पहले कृपया प्राप्तकर्ता और खाते की जानकारी सत्यापित करें",
    transferSecurityNotice: "ज़ीरो-ट्रस्ट ट्रांसफर गारंटी: आपके फंड धोखाधड़ी जांच द्वारा सुरक्षित हैं।",
    editDetailsBtn: "विवरण संपादित करें",
    authorizeTransferBtn: "अधिकृत करें और भेजें",
    feeLabel: "स्थानांतरण शुल्क",
    navLockReasons: "खाता लॉक के कारण व अनलॉक उपाय",
    authLockGuideTitle: "क्या आपका बैंक खाता लॉक या फ्रीज है?",
    authLockGuideSub: "असली बैंक लॉक कारणों और अनलॉक करने के चरणबद्ध तरीकों को देखें",
    exploreReasonsBtn: "गाइड देखें",
    quickLockReasons: "लॉक के कारण",
    lockReasonsHeroTitle: "बैंक खाता लॉक कारण और समाधान विश्वकोश",
    lockReasonsHeroDesc: "बैंक खातों के लॉक होने के नियामक कारण और खाता अनफ्रीज करने की प्रमाणित चरणबद्ध प्रक्रियाएं।",
    applyUnfreezeBtn: "खाता अनफ्रीज शुरू करें",
    kpiCategoriesTitle: "8 मुख्य फ्रीज प्रोफाइल",
    kpiMandateTitle: "नियामक अनुपालन",
    kpiSlaTitle: "समाधान समयसीमा (SLA)",
    kpiSelfServiceTitle: "डिजिटल समाधान उपलब्ध",
    diagnosticTitle: "इंटरैक्टिव लॉक लक्षण विश्लेषक",
    diagnosticDesc: "एटीएम या नेटबैंकिंग में मिले त्रुटि संदेश का चयन करें और सटीक कारण व समाधान पाएं।",
    diagSelectPrompt: "-- अपनी त्रुटि या लक्षण का चयन करें --",
    diagnoseBtn: "लक्षण का विश्लेषण करें",
    resetFilterBtn: "रीसेट",
    clearSearch: "हटाएं",
    catAllReasons: "🌐 सभी श्रेणियां (8)",
    catCompliance: "📋 अनुपालन व केवाईसी (2)",
    catSecurity: "🛡️ सुरक्षा व एएमएल (2)",
    catLegal: "⚖️ पुलिस व अदालती आदेश (2)",
    catFinancial: "💳 ओवरड्राफ्ट व आपातकाल (2)",
    loadingLockReasons: "बैंक लॉक कारणों की सूची लोड हो रही है...",
    statutoryEscalationTitle: "सांविधिक बैंकिंग लोकपाल व आधिकारिक पोर्टल",
    statutoryEscalationDesc: "यदि बैंक निर्धारित समयसीमा में खाता अनफ्रीज नहीं करता है, तो आप आधिकारिक लोकपाल से शिकायत कर सकते हैं:",
    cardDebitsLabel: "डेबिट / निकासी",
    cardCreditsLabel: "क्रेडिट / जमा",
    cardAtmLabel: "एटीएम व कार्ड",
    cardNetBankingLabel: "नेटबैंकिंग व यूपीआई",
    requiredDocsLabel: "अनफ्रीज के लिए आवश्यक दस्तावेज",
    unlockProcedureLabel: "चरणबद्ध अनलॉक प्रक्रिया",
    unlockOnlineBtn: "⚡ अभी ऑनलाइन अनफ्रीज करें",
    askAiAboutThisBtn: "💬 AI सहायक से पूछें",
    navProfile: "ग्राहक प्रोफ़ाइल",
    navRegisterAccount: "खाता पंजीकृत करें"
  }
};

// ================= APPLICATION STATE =================
const state = {
  token: localStorage.getItem('rebank_token') || null,
  user: null,
  customerProfile: null,
  accounts: [],
  activeAccount: null,
  activeEligibility: null,
  myRequests: [],
  notifications: [],
  complaints: [],
  currentLang: localStorage.getItem('rebank_lang') || 'en',
  isMobileMode: false,
  wizard: {
    currentStep: 1,
    accountId: null,
    restrictionId: null,
    categoryCode: null,
    selfieCaptured: false,
    idFile: null,
    addressFile: null
  },
  currentInspectCase: null
};

// ================= CENTRALIZED API CLIENT & MOBILE/PAGES BACKEND RESOLUTION =================
function getResolvedApiBaseUrl() {
  if (window.REBANK_API_BASE_URL) return window.REBANK_API_BASE_URL.replace(/\/+$/, '');
  
  const saved = localStorage.getItem('rebank_api_url');
  if (saved && saved.trim()) return saved.trim().replace(/\/+$/, '');

  const isCapacitor = typeof window.Capacitor !== 'undefined';
  if (isCapacitor) {
    // In Android Emulator, host PC is reachable via 10.0.2.2:3000
    return 'http://10.0.2.2:3000';
  }

  // If running on GitHub Pages (static hosting with no Node.js server), use instant demo mode
  if (window.location && window.location.hostname && (window.location.hostname.includes('github.io') || window.location.protocol === 'file:')) {
    return 'STATIC_DEMO_MODE';
  }

  if (window.location && window.location.origin && window.location.origin !== 'null' && !window.location.origin.startsWith('file:') && !window.location.origin.includes('localhost:')) {
    return window.location.origin;
  }

  return 'http://localhost:3000';
}

let API_BASE_URL = getResolvedApiBaseUrl();

function updateServerDisplayBadge() {
  const display = document.getElementById('currentServerDisplay');
  if (display) {
    if (API_BASE_URL === 'STATIC_DEMO_MODE') {
      display.textContent = 'Demo Mode (Static)';
      return;
    }
    try {
      const u = new URL(API_BASE_URL);
      display.textContent = `${u.hostname}:${u.port || (u.protocol === 'https:' ? '443' : '80')}`;
    } catch {
      display.textContent = API_BASE_URL;
    }
  }
}

// In-Browser High-Fidelity Demo Provider for Static GitHub Pages
function getStaticDemoMock(endpoint, options = {}) {
  const method = (options.method || 'GET').toUpperCase();
  let body = {};
  try { if (options.body) body = JSON.parse(options.body); } catch(e){}

  if (endpoint.includes('/api/auth/me')) {
    return {
      success: true,
      data: {
        user: state.user || { id: 'usr-customer-1002', email: 'elena.rostova@example.com', fullName: 'Elena Rostova', role: 'CUSTOMER' },
        customerProfile: state.customerProfile || { id: 'prof-1002', customer_number: 'CUST-1002', full_name: 'Elena Rostova', kyc_status: 'KYC_EXPIRED', risk_rating: 'MEDIUM' }
      }
    };
  }

  if (endpoint.includes('/api/auth/login')) {
    const email = body.email || 'elena.rostova@example.com';
    let role = 'CUSTOMER';
    let fullName = 'Elena Rostova';
    if (email.includes('reviewer')) { role = 'REVIEWER'; fullName = 'Alex Mercer'; }
    else if (email.includes('approver')) { role = 'APPROVER'; fullName = 'Diana Ross'; }
    else if (email.includes('admin')) { role = 'ADMIN'; fullName = 'SysAdmin'; }
    else if (email.includes('analyst')) { role = 'FRAUD_ANALYST'; fullName = 'Fraud Analyst'; }
    else if (email.includes('john')) { fullName = 'John Doe'; }
    else if (email.includes('marcus')) { fullName = 'Marcus Vance'; }

    return {
      success: true,
      data: {
        token: 'demo-token-' + Date.now(),
        user: { id: 'usr-' + role.toLowerCase(), email, fullName, role },
        customerProfile: { id: 'prof-1002', customer_number: 'CUST-1002', full_name: fullName, kyc_status: 'KYC_EXPIRED', risk_rating: 'MEDIUM' }
      }
    };
  }

  if (endpoint.includes('/api/customer/accounts')) {
    return {
      success: true,
      data: [
        { id: 'acc-1002', account_number: '109283741002', account_number_masked: '•••• •••• •••• 1002', account_type: 'SAVINGS', currency: 'USD', balance: 12450.00, status: 'RESTRICTED', country: 'United States', account_holder_name: 'Elena Rostova', restriction: { restriction_type: 'KYC_EXPIRED', status: 'ACTIVE', severity_tier: 'RESTRICTED_DEBIT' } },
        { id: 'acc-1001', account_number: '109283741001', account_number_masked: '•••• •••• •••• 1001', account_type: 'CHECKING', currency: 'USD', balance: 8420.50, status: 'ACTIVE', country: 'United States', account_holder_name: 'Elena Rostova' }
      ]
    };
  }

  if (endpoint.includes('/api/customer/restriction')) {
    return {
      success: true,
      data: {
        hasRestriction: true,
        accountId: 'acc-1002',
        accountNumber: '•••• •••• •••• 1002',
        accountType: 'SAVINGS',
        currentBalance: 12450.00,
        restrictionType: 'KYC_EXPIRED',
        severityTier: 'RESTRICTED_DEBIT',
        reasonCode: 'STATUTORY_KYC_PERIODIC_EXPIRED',
        plainExplanation: 'Statutory KYC periodic re-verification period expired under AML/CFT Directive section 14-B.',
        placedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        reviewSlaHours: 24,
        allowOnlineRemediation: true,
        requirementsChecklist: ['Confirm primary contact details', 'Complete live biometric liveness check', 'Upload Government Photo ID', 'Upload Proof of Address (<90 days old)'],
        openCase: { id: 'req-1002', reference_number: 'REB-2026-98124', state: 'SUBMITTED', submitted_at: new Date(Date.now() - 3600000 * 12).toISOString() }
      }
    };
  }

  if (endpoint.includes('/api/customer/banks') || endpoint.includes('/api/banks')) {
    return {
      success: true,
      data: [
        { bank_code: 'SBI', bank_name: 'State Bank of India', ifsc_prefix: 'SBIN', network: 'NEFT / RTGS / IMPS / UPI', branches_count: 22405 },
        { bank_code: 'HDFC', bank_name: 'HDFC Bank', ifsc_prefix: 'HDFC', network: 'NEFT / RTGS / IMPS / UPI', branches_count: 8300 },
        { bank_code: 'ICICI', bank_name: 'ICICI Bank', ifsc_prefix: 'ICIC', network: 'NEFT / RTGS / IMPS / UPI', branches_count: 6000 },
        { bank_code: 'AXIS', bank_name: 'Axis Bank', ifsc_prefix: 'UTIB', network: 'NEFT / RTGS / IMPS / UPI', branches_count: 4900 },
        { bank_code: 'PNB', bank_name: 'Punjab National Bank', ifsc_prefix: 'PUNB', network: 'NEFT / RTGS / IMPS / UPI', branches_count: 10000 },
        { bank_code: 'BOB', bank_name: 'Bank of Baroda', ifsc_prefix: 'BARB', network: 'NEFT / RTGS / IMPS / UPI', branches_count: 8200 }
      ]
    };
  }

  if (endpoint.includes('/api/customer/deposits') || endpoint.includes('/api/deposits')) {
    return {
      success: true,
      data: [
        { id: 'dep-1', type: 'FIXED_DEPOSIT', deposit_number_masked: '•••• •••• 9812', principal_amount: 50000, interest_rate: 7.25, maturity_amount: 57640, start_date: '2026-01-15', maturity_date: '2028-01-15', status: 'ACTIVE', tenor_months: 24 },
        { id: 'dep-2', type: 'RECURRING_DEPOSIT', deposit_number_masked: '•••• •••• 4421', principal_amount: 10000, monthly_installment: 5000, interest_rate: 6.85, maturity_amount: 64200, start_date: '2026-03-01', maturity_date: '2027-03-01', status: 'ACTIVE', tenor_months: 12 }
      ]
    };
  }

  if (endpoint.includes('/api/customer/cards') || endpoint.includes('/api/cards')) {
    return {
      success: true,
      data: [
        { id: 'crd-1', card_type: 'CREDIT', card_network: 'VISA', card_number_masked: '4111 •••• •••• 1002', card_holder_name: 'ELENA ROSTOVA', expiry_month: '08', expiry_year: '29', credit_limit: 15000, available_limit: 12340, is_active: 1, is_contactless_enabled: 1, is_international_enabled: 0, status: 'ACTIVE' },
        { id: 'crd-2', card_type: 'DEBIT', card_network: 'MASTERCARD', card_number_masked: '5200 •••• •••• 5521', card_holder_name: 'ELENA ROSTOVA', expiry_month: '12', expiry_year: '30', daily_limit: 5000, is_active: 1, is_contactless_enabled: 1, is_international_enabled: 1, status: 'ACTIVE' }
      ]
    };
  }

  if (endpoint.includes('/api/customer/transactions') || endpoint.includes('/api/transactions')) {
    return {
      success: true,
      data: [
        { id: 'tx-1', reference_num: 'TXN-2026-9812', amount: 24.80, currency: 'USD', type: 'DEBIT', category: 'POS_MERCHANT', counterparty_name: 'Artisan Cafe & Bakery', timestamp: new Date(Date.now() - 3600000 * 2).toISOString(), status: 'SETTLED', balance_after: 12450.00 },
        { id: 'tx-2', reference_num: 'TXN-2026-8711', amount: 2450.00, currency: 'USD', type: 'CREDIT', category: 'SALARY_ACH', counterparty_name: 'Global Tech Payroll Ltd', timestamp: new Date(Date.now() - 86400000).toISOString(), status: 'SETTLED', balance_after: 12474.80 },
        { id: 'tx-3', reference_num: 'TXN-2026-7245', amount: 84.50, currency: 'USD', type: 'DEBIT', category: 'UTILITY_BILL', counterparty_name: 'Metro Electric Power Corp', timestamp: new Date(Date.now() - 86400000 * 3).toISOString(), status: 'SETTLED', balance_after: 10024.80 }
      ]
    };
  }

  if (endpoint.includes('/api/customer/recovery/tickets') || endpoint.includes('/api/recovery/tickets')) {
    return {
      success: true,
      data: [
        { id: 'req-1002', reference_number: 'REB-2026-98124', account_id: 'acc-1002', account_number_masked: '•••• 1002', state: 'SUBMITTED', submitted_at: new Date(Date.now() - 3600000 * 12).toISOString(), review_sla_hours: 24, notes: 'Self-service automated biometric verification submitted.' }
      ]
    };
  }

  if (endpoint.includes('/api/notifications')) {
    return {
      success: true,
      data: [
        { id: 'notif-1', title: 'Account Hold Placed', message: 'Account ending in 1002 restricted under statutory periodic KYC rule.', created_at: new Date(Date.now() - 86400000 * 2).toISOString(), is_read: 0, severity: 'WARNING' },
        { id: 'notif-2', title: 'Case REB-2026-98124 Submitted', message: 'Your restoration request is queued for Maker L1 compliance audit.', created_at: new Date(Date.now() - 3600000 * 12).toISOString(), is_read: 1, severity: 'INFO' }
      ]
    };
  }

  if (endpoint.includes('/api/chat')) {
    const q = (body.message || '').toLowerCase();
    let reply = "Hello! I am your ReBank Virtual Assistant. Your account is currently in periodic KYC re-verification. You can complete the 4-step digital recovery application right from your dashboard, or ask me any question about banking services!";
    if (q.includes('lock') || q.includes('blocked') || q.includes('freeze')) {
      reply = "Accounts are typically restricted for statutory KYC expiration (14-B), dormancy (>24 months without activity), or unexpected velocity AML checks. You can check the 'Why is my account locked?' tab for step-by-step resolution steps!";
    } else if (q.includes('time') || q.includes('sla') || q.includes('how long')) {
      reply = "Standard digital account restoration requests are reviewed within 24 hours under our dual-control Maker-Checker SLA.";
    }
    return { success: true, data: { reply, intent: 'GENERAL_ASSISTANCE' } };
  }

  // Generic success for mutations
  return { success: true, message: 'Action processed successfully in Demo Mode.', data: { id: 'demo-' + Date.now(), status: 'SUCCESS' } };
}

function openServerConfigModal() {
  const modal = document.getElementById('serverConfigModal');
  const input = document.getElementById('serverConfigUrlInput');
  if (input) input.value = API_BASE_URL === 'STATIC_DEMO_MODE' ? 'http://localhost:3000' : API_BASE_URL;
  if (modal) modal.style.display = 'flex';
}

function closeServerConfigModal() {
  const modal = document.getElementById('serverConfigModal');
  if (modal) modal.style.display = 'none';
}

function setQuickServerUrl(url) {
  const input = document.getElementById('serverConfigUrlInput');
  if (input) input.value = url;
}

function saveServerConfigUrl(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('serverConfigUrlInput');
  const val = (input?.value || '').trim().replace(/\/+$/, '');
  if (!val) return;
  API_BASE_URL = val;
  localStorage.setItem('rebank_api_url', val);
  updateServerDisplayBadge();
  closeServerConfigModal();
  showToast(`Backend API configured to ${val}. Reloading...`, 'success');
  setTimeout(() => window.location.reload(), 600);
}

const API = {
  get baseUrl() {
    return API_BASE_URL;
  },
  set baseUrl(val) {
    API_BASE_URL = val ? val.replace(/\/+$/, '') : 'http://localhost:3000';
    localStorage.setItem('rebank_api_url', API_BASE_URL);
    updateServerDisplayBadge();
  },

  async request(endpoint, options = {}) {
    // If running in static demo mode on GitHub Pages, return offline mock immediately
    if (API_BASE_URL === 'STATIC_DEMO_MODE') {
      await new Promise(r => setTimeout(r, 60)); // natural micro-latency
      return getStaticDemoMock(endpoint, options);
    }

    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(state.token ? { Authorization: `Bearer ${state.token}` } : {}),
      ...options.headers
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || `HTTP ${response.status}: Error processing request`);
      }
      return data;
    } catch (err) {
      console.error(`[API Error] ${endpoint}:`, err);
      // Fallback for GitHub Pages if someone navigated without setting custom API
      if (window.location && window.location.hostname && window.location.hostname.includes('github.io')) {
        return getStaticDemoMock(endpoint, options);
      }
      const isNetworkErr = err.name === 'TypeError' && err.message.toLowerCase().includes('fetch');
      const msg = isNetworkErr ? `Network connection failure. Backend API unreachable at ${API_BASE_URL}. Tap Server button to configure.` : err.message;
      showToast(msg, 'error');
      throw err;
    }
  },

  get(endpoint, headers = {}) {
    return this.request(endpoint, { method: 'GET', headers });
  },

  post(endpoint, body, headers = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      headers
    });
  },

  async upload(endpoint, formData) {
    const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;
    const headers = {
      ...(state.token ? { Authorization: `Bearer ${state.token}` } : {})
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: formData
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error?.message || 'File upload failed');
      }
      return data;
    } catch (err) {
      console.error(`[Upload Error] ${endpoint}:`, err);
      showToast(err.message, 'error');
      throw err;
    }
  }
};

// ================= DOM ELEMENT REFERENCES =================
const el = {
  viewport: document.getElementById('mainViewport'),
  mobileToggleBtn: document.getElementById('mobileToggleBtn'),
  langBtns: document.querySelectorAll('.lang-btn'),
  rolePills: document.querySelectorAll('.role-pill'),
  notifBellBtn: document.getElementById('notifBellBtn'),
  notifDropdown: document.getElementById('notifDropdown'),
  notifBadge: document.getElementById('notifBadge'),
  notifList: document.getElementById('notifList'),
  markAllReadBtn: document.getElementById('markAllReadBtn'),
  userDisplayName: document.getElementById('userDisplayName'),
  userRoleBadge: document.getElementById('userRoleBadge'),
  userAvatar: document.getElementById('userAvatar'),
  logoutBtn: document.getElementById('logoutBtn'),
  
  // Views
  authView: document.getElementById('authView'),
  customerView: document.getElementById('customerView'),
  adminView: document.getElementById('adminView'),
  
  // Auth Form
  authTitle: document.getElementById('authTitle'),
  authSubtitle: document.getElementById('authSubtitle'),
  tabLogin: document.getElementById('tabLogin'),
  tabRegister: document.getElementById('tabRegister'),
  loginForm: document.getElementById('loginForm'),
  registerForm: document.getElementById('registerForm'),
  loginEmail: document.getElementById('loginEmail'),
  loginPassword: document.getElementById('loginPassword'),
  regFullName: document.getElementById('regFullName'),
  regPhone: document.getElementById('regPhone'),
  regEmail: document.getElementById('regEmail'),
  regPassword: document.getElementById('regPassword'),
  regSubmitBtn: document.getElementById('regSubmitBtn'),
  regErrorMsg: document.getElementById('regErrorMsg'),
  
  // Customer Dashboard
  dashCustomerName: document.getElementById('dashCustomerName'),
  dashCustomerNum: document.getElementById('dashCustomerNum'),
  dashHeroSubtitle: document.getElementById('dashHeroSubtitle'),
  dashAccountType: document.getElementById('dashAccountType'),
  dashAccountSelector: document.getElementById('dashAccountSelector'),
  dashAccountStatusBadge: document.getElementById('dashAccountStatusBadge'),
  dashMaskedAccNum: document.getElementById('dashMaskedAccNum'),
  dashBalance: document.getElementById('dashBalance'),
  dashBranch: document.getElementById('dashBranch'),
  dashCbsRef: document.getElementById('dashCbsRef'),
  restrictionBanner: document.getElementById('restrictionBanner'),
  rstTitle: document.getElementById('rstTitle'),
  rstSeverity: document.getElementById('rstSeverity'),
  rstDescription: document.getElementById('rstDescription'),
  rstImpactTags: document.getElementById('rstImpactTags'),
  rstSlaHours: document.getElementById('rstSlaHours'),
  startRecoveryBtn: document.getElementById('startRecoveryBtn'),
  ticketsContainer: document.getElementById('ticketsContainer'),
  refreshTicketsBtn: document.getElementById('refreshTicketsBtn'),
  openHelpBtn: document.getElementById('openHelpBtn'),
  faqExplainLockBtn: document.getElementById('faqExplainLockBtn'),
  registerAccountBtn: document.getElementById('registerAccountBtn'),

  // Register Bank Account Modal & Dedicated Page
  registerBankModal: document.getElementById('registerBankModal'),
  closeRegisterBankBtn: document.getElementById('closeRegisterBankBtn'),
  modalProceedRegisterBankBtn: document.getElementById('modalProceedRegisterBankBtn'),
  cancelRegisterBankBtn: document.getElementById('cancelRegisterBankBtn'),
  backToAccountsBtn: document.getElementById('backToAccountsBtn'),
  openRegisterBankBtn2: document.getElementById('openRegisterBankBtn2'),
  accountsCountBadge: document.getElementById('accountsCountBadge'),
  registerBankForm: document.getElementById('registerBankForm'),
  bankHolderName: document.getElementById('bankHolderName'),
  bankEmail: document.getElementById('bankEmail'),
  bankPhoneNumber: document.getElementById('bankPhoneNumber'),
  bankDob: document.getElementById('bankDob'),
  bankAddress: document.getElementById('bankAddress'),
  bankBranchName: document.getElementById('bankBranchName'),
  bankBranchCode: document.getElementById('bankBranchCode'),
  bankCity: document.getElementById('bankCity'),
  bankState: document.getElementById('bankState'),
  bankPostalCode: document.getElementById('bankPostalCode'),
  bankCountry: document.getElementById('bankCountry'),
  bankName: document.getElementById('bankName'),
  bankAccountType: document.getElementById('bankAccountType'),
  bankAccountNumber: document.getElementById('bankAccountNumber'),
  bankConfirmAccountNumber: document.getElementById('bankConfirmAccountNumber'),
  bankIfscCode: document.getElementById('bankIfscCode'),
  bankTermsConsent: document.getElementById('bankTermsConsent'),
  ifscCodeGroup: document.getElementById('ifscCodeGroup'),
  ifscRequiredStar: document.getElementById('ifscRequiredStar'),
  ifscHelpText: document.getElementById('ifscHelpText'),
  bankRegisterError: document.getElementById('bankRegisterError'),
  submitRegisterBankBtn: document.getElementById('submitRegisterBankBtn'),
  
  // Recovery Wizard Modal
  recoveryModal: document.getElementById('recoveryModal'),
  closeRecoveryModalBtn: document.getElementById('closeRecoveryModalBtn'),
  wizardCategoryTitle: document.getElementById('wizardCategoryTitle'),
  wizardChecklist: document.getElementById('wizardChecklist'),
  wizardConfirmEmail: document.getElementById('wizardConfirmEmail'),
  wizardConfirmPhone: document.getElementById('wizardConfirmPhone'),
  contactConfirmedCheck: document.getElementById('contactConfirmedCheck'),
  captureSelfieBtn: document.getElementById('captureSelfieBtn'),
  selfieConfirmMsg: document.getElementById('selfieConfirmMsg'),
  idDropzone: document.getElementById('idDropzone'),
  idFileInput: document.getElementById('idFileInput'),
  idFileName: document.getElementById('idFileName'),
  addressDropzone: document.getElementById('addressDropzone'),
  addressFileInput: document.getElementById('addressFileInput'),
  addressFileName: document.getElementById('addressFileName'),
  wizardExplanation: document.getElementById('wizardExplanation'),
  wizardSourceOfFunds: document.getElementById('wizardSourceOfFunds'),
  legalConsentCheck: document.getElementById('legalConsentCheck'),
  wizardPrevBtn: document.getElementById('wizardPrevBtn'),
  wizardNextBtn: document.getElementById('wizardNextBtn'),
  wizardSubmitBtn: document.getElementById('wizardSubmitBtn'),
  
  // Bank Cockpit
  cockpitTabs: document.querySelectorAll('.cockpit-tab'),
  reviewerTableBody: document.getElementById('reviewerTableBody'),
  approverTableBody: document.getElementById('approverTableBody'),
  reviewerBadge: document.getElementById('reviewerBadge'),
  approverBadge: document.getElementById('approverBadge'),
  auditTableBody: document.getElementById('auditTableBody'),
  auditSearchInput: document.getElementById('auditSearchInput'),
  auditRoleFilter: document.getElementById('auditRoleFilter'),
  refreshAuditBtn: document.getElementById('refreshAuditBtn'),
  latencySlider: document.getElementById('latencySlider'),
  latencyDisplay: document.getElementById('latencyDisplay'),
  failRateSlider: document.getElementById('failRateSlider'),
  failRateDisplay: document.getElementById('failRateDisplay'),
  applyCbsConfigBtn: document.getElementById('applyCbsConfigBtn'),
  cbsLatencyVal: document.getElementById('cbsLatencyVal'),
  cbsTelemetryLog: document.getElementById('cbsTelemetryLog'),
  factoryResetBtn: document.getElementById('factoryResetBtn'),
  
  // Case Inspect Modal
  caseInspectModal: document.getElementById('caseInspectModal'),
  closeInspectModalBtn: document.getElementById('closeInspectModalBtn'),
  inspectRefTitle: document.getElementById('inspectRefTitle'),
  inspectCustomerMeta: document.getElementById('inspectCustomerMeta'),
  inspectAccNum: document.getElementById('inspectAccNum'),
  inspectCategory: document.getElementById('inspectCategory'),
  inspectStatusBadge: document.getElementById('inspectStatusBadge'),
  inspectExplanation: document.getElementById('inspectExplanation'),
  inspectOcrScore: document.getElementById('inspectOcrScore'),
  inspectFaceScore: document.getElementById('inspectFaceScore'),
  inspectDocsContainer: document.getElementById('inspectDocsContainer'),
  inspectNotes: document.getElementById('inspectNotes'),
  makerActionButtons: document.getElementById('makerActionButtons'),
  checkerActionButtons: document.getElementById('checkerActionButtons'),
  recommendApprovalBtn: document.getElementById('recommendApprovalBtn'),
  requestMoreInfoBtn: document.getElementById('requestMoreInfoBtn'),
  rejectCaseBtn: document.getElementById('rejectCaseBtn'),
  authorizeUnfreezeBtn: document.getElementById('authorizeUnfreezeBtn'),
  checkerRejectBtn: document.getElementById('checkerRejectBtn'),
  
  // Help Modal
  helpModal: document.getElementById('helpModal'),
  closeHelpModalBtn: document.getElementById('closeHelpModalBtn'),
  complaintForm: document.getElementById('complaintForm'),
  compSubject: document.getElementById('compSubject'),
  compCategory: document.getElementById('compCategory'),
  compDescription: document.getElementById('compDescription'),
  myComplaintsList: document.getElementById('myComplaintsList'),

  // Privacy & Consent Center Modal
  openPrivacyBtn: document.getElementById('openPrivacyBtn'),
  privacyModal: document.getElementById('privacyModal'),
  closePrivacyModalBtn: document.getElementById('closePrivacyModalBtn'),
  privacyConsentsList: document.getElementById('privacyConsentsList'),

  // Fraud Detection & Alert Center
  fraudBadge: document.getElementById('fraudBadge'),
  fraudKpiOpen: document.getElementById('fraudKpiOpen'),
  fraudKpiTotal: document.getElementById('fraudKpiTotal'),
  fraudKpiCritical: document.getElementById('fraudKpiCritical'),
  fraudKpiAvgRisk: document.getElementById('fraudKpiAvgRisk'),
  fraudKpiActiveRules: document.getElementById('fraudKpiActiveRules'),
  fraudSearchInput: document.getElementById('fraudSearchInput'),
  fraudStatusFilter: document.getElementById('fraudStatusFilter'),
  fraudSeverityFilter: document.getElementById('fraudSeverityFilter'),
  refreshFraudBtn: document.getElementById('refreshFraudBtn'),
  fraudAlertsTableBody: document.getElementById('fraudAlertsTableBody'),
  fraudRulesTableBody: document.getElementById('fraudRulesTableBody'),
  fraudAlertModal: document.getElementById('fraudAlertModal'),
  closeFraudModalBtn: document.getElementById('closeFraudModalBtn'),
  fraudModalAlertCode: document.getElementById('fraudModalAlertCode'),
  fraudModalCustomerMeta: document.getElementById('fraudModalCustomerMeta'),
  fraudModalRiskPill: document.getElementById('fraudModalRiskPill'),
  fraudModalRiskBar: document.getElementById('fraudModalRiskBar'),
  fraudModalReasonsList: document.getElementById('fraudModalReasonsList'),
  fraudModalAccNum: document.getElementById('fraudModalAccNum'),
  fraudModalBalance: document.getElementById('fraudModalBalance'),
  fraudModalCbsRef: document.getElementById('fraudModalCbsRef'),
  fraudModalKyc: document.getElementById('fraudModalKyc'),
  fraudModalNotesHistory: document.getElementById('fraudModalNotesHistory'),
  fraudAnalystNotesInput: document.getElementById('fraudAnalystNotesInput'),
  fraudAckBtn: document.getElementById('fraudAckBtn'),
  fraudSaveNotesBtn: document.getElementById('fraudSaveNotesBtn'),
  fraudEscalateBtn: document.getElementById('fraudEscalateBtn'),
  fraudCloseVerifiedBtn: document.getElementById('fraudCloseVerifiedBtn'),
  fraudCloseFalsePositiveBtn: document.getElementById('fraudCloseFalsePositiveBtn'),
  fraudCloseConfirmedBtn: document.getElementById('fraudCloseConfirmedBtn'),

  // Reports & Analytics
  repTotalCases: document.getElementById('repTotalCases'),
  repPendingMaker: document.getElementById('repPendingMaker'),
  repPendingChecker: document.getElementById('repPendingChecker'),
  repRestoredAccounts: document.getElementById('repRestoredAccounts'),
  repAvgTurnaround: document.getElementById('repAvgTurnaround'),
  repOpenFraudAlerts: document.getElementById('repOpenFraudAlerts'),
  exportCasesCsvBtn: document.getElementById('exportCasesCsvBtn'),
  exportCasesJsonBtn: document.getElementById('exportCasesJsonBtn'),
  exportFraudCsvBtn: document.getElementById('exportFraudCsvBtn'),
  exportFraudJsonBtn: document.getElementById('exportFraudJsonBtn'),
  exportPreviewCard: document.getElementById('exportPreviewCard'),
  exportPreviewTitle: document.getElementById('exportPreviewTitle'),
  exportPreviewContent: document.getElementById('exportPreviewContent'),
  closeExportPreviewBtn: document.getElementById('closeExportPreviewBtn'),
  
  // Hackathon: Lock Explanations Modal
  explainLockBtn: document.getElementById('explainLockBtn'),
  lockExplanationModal: document.getElementById('lockExplanationModal'),
  closeLockModalBtn: document.getElementById('closeLockModalBtn'),
  lockCloseActionBtn: document.getElementById('lockCloseActionBtn'),
  lockModalTitle: document.getElementById('lockModalTitle'),
  lockModalStatusBadge: document.getElementById('lockModalStatusBadge'),
  lockModalCodeBadge: document.getElementById('lockModalCodeBadge'),
  lockModalAccNum: document.getElementById('lockModalAccNum'),
  lockModalReasonText: document.getElementById('lockModalReasonText'),
  lockModalSlaText: document.getElementById('lockModalSlaText'),
  lockResolveCurrentBtn: document.getElementById('lockResolveCurrentBtn'),
  lockStartRecoveryBtn: document.getElementById('lockStartRecoveryBtn'),

  // Hackathon: Simulated Outbound Transfer & Real-time Fraud Interception
  openSimulateTransferBtn: document.getElementById('openSimulateTransferBtn'),
  simulateTransferModal: document.getElementById('simulateTransferModal'),
  closeSimModalBtn: document.getElementById('closeSimModalBtn'),
  simCloseBtn: document.getElementById('simCloseBtn'),
  simForm: document.getElementById('simForm'),
  simSourceAccSelect: document.getElementById('simSourceAccSelect'),
  simAmountInput: document.getElementById('simAmountInput'),
  simPayeeNameInput: document.getElementById('simPayeeNameInput'),
  simPayeeAccInput: document.getElementById('simPayeeAccInput'),
  simScenarioSelect: document.getElementById('simScenarioSelect'),
  simSubmitBtn: document.getElementById('simSubmitBtn'),
  simResultBox: document.getElementById('simResultBox'),
  simResultTitle: document.getElementById('simResultTitle'),
  simRiskBadge: document.getElementById('simRiskBadge'),
  simRiskScoreDisplay: document.getElementById('simRiskScoreDisplay'),
  simRiskScoreBar: document.getElementById('simRiskScoreBar'),
  simRiskReasonText: document.getElementById('simRiskReasonText'),
  simRiskRemedyText: document.getElementById('simRiskRemedyText'),

  // Hackathon: Floating AI Customer-Care Assistant
  rebankChatContainer: document.getElementById('rebankChatContainer'),
  rebankChatLauncher: document.getElementById('rebankChatLauncher'),
  chatUnreadDot: document.getElementById('chatUnreadDot'),
  rebankChatWindow: document.getElementById('rebankChatWindow'),
  minimizeChatBtn: document.getElementById('minimizeChatBtn'),
  chatMessages: document.getElementById('chatMessages'),
  chatQuickChips: document.getElementById('chatQuickChips'),
  chatInputForm: document.getElementById('chatInputForm'),
  chatInput: document.getElementById('chatInput'),
  chatSendBtn: document.getElementById('chatSendBtn'),
  chipAccBlocked: document.getElementById('chipAccBlocked'),
  chipRecoverAcc: document.getElementById('chipRecoverAcc'),
  chipTxRisk: document.getElementById('chipTxRisk'),
  chipContactSupport: document.getElementById('chipContactSupport'),
  chatTypingIndicator: document.getElementById('chatTypingIndicator'),
  chatSuggestedQuestions: document.getElementById('chatSuggestedQuestions'),

  // Hackathon: Login Enhancements
  toggleLoginPasswordBtn: document.getElementById('toggleLoginPasswordBtn'),
  loginAccountMaskPreview: document.getElementById('loginAccountMaskPreview'),
  loginMaskedAccountText: document.getElementById('loginMaskedAccountText'),
  loginErrorMsg: document.getElementById('loginErrorMsg'),
  demoLoginElenaBtn: document.getElementById('demoLoginElenaBtn'),
  demoLoginJohnBtn: document.getElementById('demoLoginJohnBtn'),
  demoLoginMarcusBtn: document.getElementById('demoLoginMarcusBtn'),
  demoLoginMakerBtn: document.getElementById('demoLoginMakerBtn'),
  demoLoginCheckerBtn: document.getElementById('demoLoginCheckerBtn'),

  // Hackathon: Security Dashboard & Activity Ledger
  dashHealthCard: document.getElementById('dashHealthCard'),
  dashHealthScore: document.getElementById('dashHealthScore'),
  dashHealthBar: document.getElementById('dashHealthBar'),
  dashHealthDesc: document.getElementById('dashHealthDesc'),
  dashHealthActionBtn: document.getElementById('dashHealthActionBtn'),
  suspiciousLoginCard: document.getElementById('suspiciousLoginCard'),
  dashSecurityAlertText: document.getElementById('dashSecurityAlertText'),
  dismissSuspiciousAlertBtn: document.getElementById('dismissSuspiciousAlertBtn'),
  recentTransactionsCard: document.getElementById('recentTransactionsCard'),
  recentTxContainer: document.getElementById('recentTxContainer'),
  openSimulateTransferBtn2: document.getElementById('openSimulateTransferBtn2'),
  securityActivityTimelineCard: document.getElementById('securityActivityTimelineCard'),
  securityTimelineContainer: document.getElementById('securityTimelineContainer'),

  // Dedicated Sections & Navigation Pills
  dashTabOverview: document.getElementById('dashTabOverview'),
  dashTabAccounts: document.getElementById('dashTabAccounts'),
  dashTabSecurity: document.getElementById('dashTabSecurity'),
  dashTabRecovery: document.getElementById('dashTabRecovery'),
  dashTabTransfer: document.getElementById('dashTabTransfer'),
  dashTabActivity: document.getElementById('dashTabActivity'),
  dashRecoverySection: document.getElementById('dashRecoverySection'),
  dashTransferSection: document.getElementById('dashTransferSection'),
  dashActivitySection: document.getElementById('dashActivitySection'),
  openGetHelpBtn: document.getElementById('openGetHelpBtn'),
  headNavHome: document.getElementById('headNavHome'),
  headNavAccounts: document.getElementById('headNavAccounts'),
  headNavRecovery: document.getElementById('headNavRecovery'),
  headNavSecurityCheck: document.getElementById('headNavSecurityCheck'),
  headNavTransfer: document.getElementById('headNavTransfer'),
  headNavRecentActivity: document.getElementById('headNavRecentActivity'),

  // Dedicated In-Page Recovery Form Elements
  inlineRecoveryForm: document.getElementById('inlineRecoveryForm'),
  inlineRecName: document.getElementById('inlineRecName'),
  inlineRecContact: document.getElementById('inlineRecContact'),
  inlineDocType: document.getElementById('inlineDocType'),
  inlineDocNumber: document.getElementById('inlineDocNumber'),
  inlineAddrType: document.getElementById('inlineAddrType'),
  inlineExplanation: document.getElementById('inlineExplanation'),
  inlineSelfieBtn: document.getElementById('inlineSelfieBtn'),
  inlineSelfieStatus: document.getElementById('inlineSelfieStatus'),
  inlineScanBeam: document.getElementById('inlineScanBeam'),
  inlineSubmitRecoveryBtn: document.getElementById('inlineSubmitRecoveryBtn'),
  inlineRecoveryStatusBanner: document.getElementById('inlineRecoveryStatusBanner'),
  inlineStatusBannerTitle: document.getElementById('inlineStatusBannerTitle'),
  inlineStatusBannerRef: document.getElementById('inlineStatusBannerRef'),
  inlineStatusBannerDesc: document.getElementById('inlineStatusBannerDesc'),
  viewTrackerScrollBtn: document.getElementById('viewTrackerScrollBtn'),

  // Dedicated In-Page Transfer Simulator Elements
  inlineTransferForm: document.getElementById('inlineTransferForm'),
  inlineTransferRecipient: document.getElementById('inlineTransferRecipient'),
  inlineTransferAccount: document.getElementById('inlineTransferAccount'),
  inlineTransferAmount: document.getElementById('inlineTransferAmount'),
  inlineTransferSpeed: document.getElementById('inlineTransferSpeed'),
  inlineTransferSubmitBtn: document.getElementById('inlineTransferSubmitBtn'),
  inlineTransferResult: document.getElementById('inlineTransferResult'),
  inlineRiskScoreText: document.getElementById('inlineRiskScoreText'),
  inlineRiskScoreBar: document.getElementById('inlineRiskScoreBar'),
  inlineRiskReasonText: document.getElementById('inlineRiskReasonText'),
  inlineRiskRemedyText: document.getElementById('inlineRiskRemedyText'),

  dashGreeting: document.getElementById('dashGreeting'),

  // Sub-view Back Navigation Buttons
  backFromAccountsBtn: document.getElementById('backFromAccountsBtn'),
  backFromBanksBtn: document.getElementById('backFromBanksBtn'),
  backFromTransferBtn: document.getElementById('backFromTransferBtn'),
  backFromBillPayBtn: document.getElementById('backFromBillPayBtn'),
  backFromDepositsBtn: document.getElementById('backFromDepositsBtn'),
  backFromCardsBtn: document.getElementById('backFromCardsBtn'),
  backFromStatementBtn: document.getElementById('backFromStatementBtn'),
  backFromAiChatBtn: document.getElementById('backFromAiChatBtn'),
  backFromContactBtn: document.getElementById('backFromContactBtn'),

  // Navigation Scrolling Controls
  rebankMainNavWrapper: document.getElementById('rebankMainNavWrapper'),
  rebankMainNav: document.getElementById('rebankMainNav'),
  navScrollPrevBtn: document.getElementById('navScrollPrevBtn'),
  navScrollNextBtn: document.getElementById('navScrollNextBtn'),

  // Transfer Sub-view Dynamic Context
  transferHeroTitle: document.getElementById('transferHeroTitle'),
  transferHeroDesc: document.getElementById('transferHeroDesc'),

  // Transfer Authorization Review Modal
  transferReviewModal: document.getElementById('transferReviewModal'),
  closeTransferReviewBtn: document.getElementById('closeTransferReviewBtn'),
  cancelTransferReviewBtn: document.getElementById('cancelTransferReviewBtn'),
  transferFinalConfirmBtn: document.getElementById('transferFinalConfirmBtn'),
  reviewTransferAmount: document.getElementById('reviewTransferAmount'),
  reviewSourceAccount: document.getElementById('reviewSourceAccount'),
  reviewRecipientName: document.getElementById('reviewRecipientName'),
  reviewRecipientAccount: document.getElementById('reviewRecipientAccount'),
  reviewBankIfsc: document.getElementById('reviewBankIfsc'),

  toastContainer: document.getElementById('toastContainer')
};

// ================= TOAST NOTIFICATIONS =================
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'error' ? '⚠️' : '✓'}</span><span>${message}</span>`;
  el.toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ================= HUMAN-CENTERED GREETING HELPER =================
function getHumanGreeting() {
  const hour = new Date().getHours();
  const lang = state.currentLang || 'en';
  if (lang === 'ta') {
    if (hour < 12) return 'காலை வணக்கம்,';
    if (hour < 17) return 'மதிய வணக்கம்,';
    return 'மாலை வணக்கம்,';
  } else if (lang === 'hi') {
    if (hour < 12) return 'शुभ प्रभात,';
    if (hour < 17) return 'शुभ दोपहर,';
    return 'शुभ संध्या,';
  } else {
    if (hour < 12) return 'Good morning,';
    if (hour < 17) return 'Good afternoon,';
    return 'Good evening,';
  }
}

// ================= I18N LOCALIZATION HELPER =================
function applyLanguage(lang) {
  state.currentLang = lang;
  localStorage.setItem('rebank_lang', lang);
  document.documentElement.lang = lang;

  el.langBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  const dict = I18N[lang] || I18N.en;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n;
    if (dict[key]) {
      element.textContent = dict[key];
    }
  });

  // Dynamic human greeting update
  if (el.dashGreeting) {
    el.dashGreeting.textContent = getHumanGreeting();
  }

  // Dynamic hero subtitle update
  if (el.dashHeroSubtitle) {
    const isRestricted = state.activeAccount && (state.activeAccount.status === 'RESTRICTED' || state.activeEligibility?.hasRestriction);
    el.dashHeroSubtitle.textContent = isRestricted ? dict.heroSubtitle : dict.heroSubtitleActive;
  }

  // Re-render tickets and dynamic content if active
  if (state.user && state.user.role === 'CUSTOMER') {
    renderTickets();
    if (state.activeEligibility) renderRestrictionBanner(state.activeEligibility);
    updateSecurityDashboard();
  }
  if (typeof updateChatBotLanguage === 'function') {
    updateChatBotLanguage();
  }
  if (el.lockExplanationModal && el.lockExplanationModal.style.display === 'flex' && typeof openLockExplanationModal === 'function') {
    openLockExplanationModal();
  }
  if (state.lastSimulation && el.inlineTransferResult && el.inlineTransferResult.style.display !== 'none' && typeof renderTransferSimulationResult === 'function') {
    renderTransferSimulationResult(state.lastSimulation.tier);
  }
}

// ================= VIEW TOGGLE CONTROLLER =================
function showView(viewName) {
  el.authView.style.display = viewName === 'auth' ? 'block' : 'none';
  el.customerView.style.display = viewName === 'customer' ? 'block' : 'none';
  el.adminView.style.display = viewName === 'admin' ? 'block' : 'none';
}

function updateHeaderUser() {
  if (state.user) {
    const name = state.user.fullName || state.user.full_name || state.user.email;
    el.userDisplayName.textContent = name;
    el.userRoleBadge.textContent = state.user.role;
    el.userAvatar.textContent = name.charAt(0).toUpperCase();
    el.logoutBtn.style.display = 'flex';
  } else {
    el.userDisplayName.textContent = 'Guest';
    el.userRoleBadge.textContent = 'NOT SIGNED IN';
    el.userAvatar.textContent = '?';
    el.logoutBtn.style.display = 'none';
  }
}

// ================= INITIALIZATION & AUTH =================
async function init() {
  // Update server connection display badge in disclaimer strip
  updateServerDisplayBadge();

  // Detect Capacitor native Android environment
  if (typeof window.Capacitor !== 'undefined') {
    document.body.classList.add('capacitor-app');
    if (el.mobileToggleBtn) el.mobileToggleBtn.style.display = 'none';
  }

  applyLanguage(state.currentLang);
  setupEventListeners();
  initEmailOtpVerification();
  initMain11Nav();
  initQuickActions();
  initQrScanner();
  initProfileModal();
  initTransferMain();
  initBillPay();
  initDeposits();
  initCards();
  initStatement();
  initFullAiChat();
  initContactUs();
  initLockReasons();

  // Visibly initialize the floating AI Assistant window for immediate hackathon access
  if (el.rebankChatWindow) {
    chatState.isOpen = true;
    el.rebankChatWindow.style.display = 'flex';
    initChatBotMessages();
    renderChatChips();
  }

  if (state.token) {
    try {
      const meRes = await API.get('/api/auth/me');
      state.user = meRes.data.user;
      state.customerProfile = meRes.data.customerProfile;
      updateHeaderUser();
      routeRoleView();
      loadNotifications();
    } catch (e) {
      logout();
      await loginWithCredentials('elena.rostova@example.com', 'Customer@123', true);
    }
  } else {
    // Auto-login default customer Elena for frictionless evaluation
    await loginWithCredentials('elena.rostova@example.com', 'Customer@123', true);
  }
}

function switchCockpitTab(tabId) {
  el.cockpitTabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabId));
  document.querySelectorAll('.tab-content').forEach(c => {
    c.classList.toggle('active', c.id === tabId);
  });
}

function routeRoleView() {
  if (!state.user) {
    showView('auth');
    return;
  }

  // Update active pill in role switcher
  el.rolePills.forEach(pill => {
    pill.classList.toggle('active', pill.dataset.email === state.user.email);
  });

  if (state.user.role === 'CUSTOMER') {
    showView('customer');
    loadCustomerDashboard();
    handleRouteHash();
  } else {
    showView('admin');
    if (state.user.role === 'FRAUD_ANALYST') {
      switchCockpitTab('fraudTab');
    }
    loadAdminDashboard();
  }
}

let pendingLoginSession = null;
let simulatedEmailOtpCode = '849201';

function finalizeLoginSession(session) {
  state.token = session.token;
  localStorage.setItem('rebank_token', state.token);
  state.user = session.user;
  state.customerProfile = session.customerProfile;
  updateHeaderUser();
  routeRoleView();
  loadNotifications();
  showToast(`Signed in as ${state.user.fullName} (${state.user.role}) — Email Verified`, 'success');

  const otpForm = document.getElementById('emailOtpForm');
  const loginForm = document.getElementById('loginForm');
  if (otpForm) otpForm.style.display = 'none';
  if (loginForm) loginForm.style.display = 'block';
  pendingLoginSession = null;
}

function initEmailOtpVerification() {
  const otpForm = document.getElementById('emailOtpForm');
  const cancelBtn = document.getElementById('emailOtpCancelBtn');
  const autoFillBtn = document.getElementById('emailOtpAutoFillBtn');
  const resendBtn = document.getElementById('emailOtpResendBtn');
  const loginForm = document.getElementById('loginForm');
  const otpInput = document.getElementById('emailOtpInput');
  const errorMsg = document.getElementById('emailOtpErrorMsg');

  if (cancelBtn) {
    cancelBtn.onclick = () => {
      pendingLoginSession = null;
      if (otpForm) otpForm.style.display = 'none';
      if (loginForm) loginForm.style.display = 'block';
    };
  }

  if (autoFillBtn && otpInput) {
    autoFillBtn.onclick = () => {
      otpInput.value = simulatedEmailOtpCode;
      otpInput.focus();
    };
  }

  if (resendBtn) {
    resendBtn.onclick = () => {
      simulatedEmailOtpCode = String(Math.floor(100000 + Math.random() * 900000));
      const demoCodeEl = document.getElementById('emailOtpDemoCode');
      if (demoCodeEl) demoCodeEl.textContent = simulatedEmailOtpCode;
      showToast(`New security code sent to email: ${simulatedEmailOtpCode}`, 'info');
    };
  }

  if (otpForm) {
    otpForm.onsubmit = (e) => {
      e.preventDefault();
      const code = (otpInput?.value || '').trim();
      if (!code || code.length !== 6) {
        if (errorMsg) {
          errorMsg.textContent = 'Please enter the 6-digit code received in your email.';
          errorMsg.style.display = 'block';
        }
        return;
      }
      if (code !== simulatedEmailOtpCode && code !== '849201') {
        if (errorMsg) {
          errorMsg.textContent = 'Invalid verification code. Please check your email and enter the 6-digit code.';
          errorMsg.style.display = 'block';
        }
        return;
      }

      if (errorMsg) errorMsg.style.display = 'none';
      if (pendingLoginSession) {
        finalizeLoginSession(pendingLoginSession);
      }
    };
  }
}

async function loginWithCredentials(emailOrAccount, password, isAutoLogin = false) {
  try {
    if (el.loginErrorMsg) el.loginErrorMsg.style.display = 'none';

    let resolvedEmail = (emailOrAccount || '').trim();
    if (/^\d+$/.test(resolvedEmail) || (!resolvedEmail.includes('@') && resolvedEmail.length > 0)) {
      const last4 = resolvedEmail.slice(-4);
      if (last4 === '1002' || resolvedEmail === '1002') resolvedEmail = 'elena.rostova@example.com';
      else if (last4 === '1001' || resolvedEmail === '1001') resolvedEmail = 'john.doe@example.com';
      else if (last4 === '1003' || resolvedEmail === '1003') resolvedEmail = 'marcus.vance@example.com';
      else if (resolvedEmail.toLowerCase().includes('maker') || resolvedEmail.toLowerCase().includes('reviewer')) resolvedEmail = 'reviewer@rebank.internal';
      else if (resolvedEmail.toLowerCase().includes('checker') || resolvedEmail.toLowerCase().includes('approver')) resolvedEmail = 'approver@rebank.internal';
    }

    const res = await API.post('/api/auth/login', { email: resolvedEmail, password });

    // Customer role requires 2-factor email verification code for manual login
    const isCustomer = res.data.user && res.data.user.role === 'CUSTOMER';
    const otpForm = document.getElementById('emailOtpForm');
    const loginForm = document.getElementById('loginForm');

    if (!isAutoLogin && isCustomer && otpForm && loginForm) {
      pendingLoginSession = res.data;
      showView('auth');
      loginForm.style.display = 'none';
      otpForm.style.display = 'block';

      const emailDisplay = document.getElementById('emailOtpRecipientDisplay');
      if (emailDisplay) emailDisplay.textContent = resolvedEmail;

      const codeDisplay = document.getElementById('emailOtpDemoCode');
      simulatedEmailOtpCode = '849201';
      if (codeDisplay) codeDisplay.textContent = simulatedEmailOtpCode;

      const otpInput = document.getElementById('emailOtpInput');
      if (otpInput) {
        otpInput.value = '';
        otpInput.focus();
      }

      showToast(`Security code dispatched to ${resolvedEmail}. Enter code to complete login.`, 'info');
      return;
    }

    finalizeLoginSession(res.data);
  } catch (err) {
    const dict = I18N[state.currentLang] || I18N.en;
    const friendlyLoginFail = dict.loginFailedMsg || "We couldn't log you in. Please check your details and try again.";
    if (el.loginErrorMsg) {
      el.loginErrorMsg.textContent = friendlyLoginFail;
      el.loginErrorMsg.style.display = 'block';
    }
    showToast(friendlyLoginFail, 'error');
    showView('auth');
  }
}

function logout() {
  state.token = null;
  state.user = null;
  state.customerProfile = null;
  localStorage.removeItem('rebank_token');
  updateHeaderUser();
  showView('auth');
  showToast('Signed out', 'info');
}

// ================= CUSTOMER DASHBOARD CONTROLLER =================
async function loadCustomerDashboard() {
  try {
    // 1. Load accounts
    const accRes = await API.get('/api/customer/accounts');
    state.accounts = accRes.data;
    if (state.accounts.length > 0) {
      if (!state.activeAccount || !state.accounts.some(a => a.id === state.activeAccount.id)) {
        state.activeAccount = state.accounts[0];
      } else {
        state.activeAccount = state.accounts.find(a => a.id === state.activeAccount.id);
      }
      renderAccountCard(state.activeAccount);

      // Populate account switcher if multiple accounts
      if (el.dashAccountSelector) {
        if (state.accounts.length > 1) {
          el.dashAccountSelector.style.display = 'inline-block';
          el.dashAccountSelector.innerHTML = state.accounts.map(a => {
            const isSel = a.id === state.activeAccount.id ? 'selected' : '';
            const holder = a.account_holder_name ? `${a.account_holder_name} — ` : '';
            return `<option value="${a.id}" ${isSel}>${holder}${a.account_number_masked} (${a.country || a.currency})</option>`;
          }).join('');
          el.dashAccountSelector.onchange = async (e) => {
            const chosen = state.accounts.find(a => a.id === e.target.value);
            if (chosen) {
              state.activeAccount = chosen;
              renderAccountCard(state.activeAccount);
              await updateRestrictionForActiveAccount();
              updateSecurityDashboard();
            }
          };
        } else {
          el.dashAccountSelector.style.display = 'none';
        }
      }

      // 2. Check restriction eligibility for active account
      await updateRestrictionForActiveAccount();
    }

    // 3. Load recovery tickets
    await loadCustomerTickets();

    // 4. Update Security Dashboard (Health, Transactions, Timeline)
    updateSecurityDashboard();

    // 5. Populate "Why is my account locked?" section on dashboard
    populateDashboardLockReasons();

  } catch (err) {
    console.error('Failed to load dashboard:', err);
  }
}

function populateDashboardLockReasons() {
  const container = document.getElementById('dashReasonsMiniCards');
  if (!container) return;

  const catalog = (typeof lockReasonsState !== 'undefined' && lockReasonsState.data && lockReasonsState.data.length > 0)
    ? lockReasonsState.data
    : (typeof LOCK_REASONS_FALLBACK !== 'undefined' ? LOCK_REASONS_FALLBACK : []);

  if (catalog.length === 0) return;

  container.innerHTML = catalog.slice(0, 8).map(r => `
    <div class="dash-reason-mini-card" style="background: #ffffff; border: 1.5px solid var(--border); border-radius: 8px; padding: 0.85rem; display: flex; flex-direction: column; justify-content: space-between; gap: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 0.4rem; margin-bottom: 0.25rem;">
          <strong style="color: var(--navy-900); font-size: 0.88rem; line-height: 1.35;">${r.title}</strong>
          <span class="badge" style="background: var(--navy-50); color: var(--navy-900); font-family: monospace; font-size: 0.7rem;">${r.code}</span>
        </div>
        <p style="margin: 0; font-size: 0.78rem; color: #475569; line-height: 1.4;">${r.plainExplanation}</p>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed var(--border-subtle); padding-top: 0.5rem; margin-top: 0.25rem;">
        <span style="font-size: 0.72rem; color: #b45309; font-weight: 700;">⏱ SLA: ${r.slaHours || 24} Hours</span>
        <button type="button" class="btn btn-sm btn-outline-primary" style="font-size: 0.72rem; padding: 3px 8px;" onclick="startUnlockForReason('${r.code}')">
          <span>⚡</span> Unlock Way
        </button>
      </div>
    </div>
  `).join('');
}

async function updateRestrictionForActiveAccount() {
  if (state.activeAccount && state.activeAccount.restriction) {
    const eligRes = await API.get(`/api/customer/restriction/${state.activeAccount.id}`);
    state.activeEligibility = eligRes.data;
    renderRestrictionBanner(state.activeEligibility);
  } else {
    state.activeEligibility = null;
    el.restrictionBanner.style.display = 'none';
  }
  if (el.dashHeroSubtitle) {
    const isRestricted = state.activeAccount && (state.activeAccount.status === 'RESTRICTED' || state.activeEligibility?.hasRestriction);
    const dict = I18N[state.currentLang] || I18N.en;
    el.dashHeroSubtitle.textContent = isRestricted ? dict.heroSubtitle : dict.heroSubtitleActive;
  }
  updateSecurityDashboard();
}

function updateSecurityDashboard() {
  const dict = I18N[state.currentLang] || I18N.en;
  const acc = state.activeAccount;
  const elig = state.activeEligibility;
  const isRestricted = acc && (acc.status === 'RESTRICTED' || (elig && elig.hasRestriction));

  // 1. Account Security Health Card
  if (el.dashHealthScore && el.dashHealthBar) {
    if (isRestricted) {
      el.dashHealthScore.textContent = dict.accountHealthRestricted || "68% - Action Required";
      el.dashHealthScore.className = "health-score-badge warning";
      el.dashHealthBar.style.width = "68%";
      el.dashHealthBar.className = "health-progress-bar";
      let desc = elig?.description;
      if (state.currentLang === 'ta' && elig?.descriptionTa) desc = elig.descriptionTa;
      else if (state.currentLang === 'hi' && elig?.descriptionHi) desc = elig.descriptionHi;
      if (el.dashHealthDesc) {
        el.dashHealthDesc.textContent = desc || (dict.accountHealthSubtitle || "Regulatory KYC documents pending renewal.");
      }
    } else {
      el.dashHealthScore.textContent = dict.accountHealthOptimal || "98% - Optimal & Protected";
      el.dashHealthScore.className = "health-score-badge optimal";
      el.dashHealthBar.style.width = "98%";
      el.dashHealthBar.className = "health-progress-bar optimal";
      if (el.dashHealthDesc) {
        el.dashHealthDesc.textContent = state.currentLang === 'ta'
          ? "பயோமெட்ரிக் இருப்பு, பல காரணி பாதுகாப்பு மற்றும் KYC விதிமுறை இணக்கம் முழுமையாக உள்ளது."
          : (state.currentLang === 'hi'
            ? "सभी बायोमेट्रिक, मल्टी-फैक्टर व नियामक अनुपालन मानक सुरक्षित व सत्यापित हैं।"
            : "All biometric, multi-factor, and regulatory compliance standards verified.");
      }
    }
  }

  // 2. Recent Simulated Transactions
  if (el.recentTxContainer) {
    const isTa = state.currentLang === 'ta';
    const isHi = state.currentLang === 'hi';
    const completedBadge = isTa ? "✓ நிறைவடைந்தது (Completed)" : (isHi ? "✓ पूर्ण (Completed)" : "✓ COMPLETED");

    const txs = [
      {
        date: "Oct 19, 2026",
        desc: isTa ? "Apex Global Ltd வெளிச்செல்லும் பணப் பரிமாற்றம்" : (isHi ? "एपेक्स ग्लोबल लिमिटेड आउटबाउंड वायर ट्रांसफर" : "Outbound Wire Transfer to Apex Global Ltd"),
        amount: "-$1,250.00",
        type: "out",
        statusClass: isRestricted ? "intercepted" : "completed",
        badge: isRestricted
          ? (isTa ? "⏸️ Ungal transfer innum complete aagala. Status-a check pannalaam." : (isHi ? "⏸️ आपका ट्रांसफर अभी पूरा नहीं हुआ है। आइए इसकी स्थिति जांचें।" : "⏸️ Your transfer isn't complete yet. Let's check its status."))
          : completedBadge
      },
      {
        date: "Oct 18, 2026",
        desc: isTa ? "CBS மாத சம்பள வரவு (Direct Deposit)" : (isHi ? "सीबीएस वेतन प्रत्यक्ष जमा (Salary Deposit)" : "Core Banking Monthly Salary Credit (Direct Deposit)"),
        amount: "+$4,250.00",
        type: "in",
        statusClass: "completed",
        badge: completedBadge
      },
      {
        date: "Oct 17, 2026",
        desc: isTa ? "கிளவுட் சாப்ட்வேர் சந்தா (Cloud Software)" : (isHi ? "क्लाउड सॉफ़्टवेयर सदस्यता" : "Cloud Infrastructure Hosting Subscription"),
        amount: "-$45.00",
        type: "out",
        statusClass: "completed",
        badge: completedBadge
      },
      {
        date: "Oct 15, 2026",
        desc: isTa ? "மின் கட்டண தானியங்கி செலுத்துகை (Utility Bill)" : (isHi ? "बिजली बिल भुगतान (Utility Bill)" : "Metro Electric Utility Bill Payment"),
        amount: "-$118.50",
        type: "out",
        statusClass: "completed",
        badge: completedBadge
      }
    ];

    el.recentTxContainer.innerHTML = txs.map(t => `
      <tr class="tx-row">
        <td style="color: var(--text-muted); font-size: 0.78rem;">${t.date}</td>
        <td>
          <div style="font-weight: 600; font-size: 0.82rem; color: var(--navy-900);">${t.desc}</div>
          <div style="font-size: 0.72rem; color: var(--text-muted);">Ref: CBS-TX-${Math.floor(Math.random() * 89999 + 10000)} &bull; Simulated Sandbox</div>
        </td>
        <td class="${t.type === 'in' ? 'tx-amount-in' : 'tx-amount-out'}">${t.amount}</td>
        <td><span class="tx-status-pill ${t.statusClass}">${t.badge}</span></td>
      </tr>
    `).join('');
  }

  // 3. Security Activity Timeline
  if (el.securityTimelineContainer) {
    const isTa = state.currentLang === 'ta';
    const isHi = state.currentLang === 'hi';

    const events = [
      {
        icon: isRestricted ? "⚠️" : "🛡️",
        title: isRestricted
          ? (isTa ? "கோர் பேங்கிங் ஒழுங்குமுறை முடக்கம் செயல்படுத்தப்பட்டது" : (isHi ? "सीबीएस नियामक सुरक्षा प्रतिबंध लागू" : "Core Banking Regulatory Hold Activated"))
          : (isTa ? "கணக்கு பாதுகாப்பு ஸ்கேன்: முழுமையாக சரிபார்க்கப்பட்டது" : (isHi ? "खाता सुरक्षा स्कैन: पूर्णतः सत्यापित" : "Account Security Health Scan: 100% Protected")),
        time: isTa ? "இன்று 09:41 AM" : (isHi ? "आज सुबह 09:41" : "Today at 09:41 AM")
      },
      {
        icon: "🤖",
        title: isTa ? "AI உதவி மையம் மற்றும் இடர் கண்காணிப்பு இயந்திரம் இணைக்கப்பட்டது" : (isHi ? "एआई सहायक व जोखिम निगरानी इंजन सक्रिय" : "AI Smart Assistant & Real-Time Fraud Engine Connected"),
        time: isTa ? "இன்று 08:30 AM" : (isHi ? "आज सुबह 08:30" : "Today at 08:30 AM")
      },
      {
        icon: "👤",
        title: isTa ? "பயோமெட்ரிக் நேரடி செல்ஃபி மாதிரி துவக்கப்பட்டது (96% பொருத்தம்)" : (isHi ? "बायोमेट्रिक लाइवनेस मॉडल आरंभ (96% सटीकता)" : "Biometric Liveness Verification Model Initialized (96% Match)"),
        time: isTa ? "நேற்று" : (isHi ? "कल" : "Yesterday")
      },
      {
        icon: "📜",
        title: isTa ? "DPDP சட்டம் 2023 தரவு பாதுகாப்பு ஒப்புதல் பதிவு செய்யப்பட்டது" : (isHi ? "डीपीडीपी अधिनियम 2023 डेटा सुरक्षा सहमति टोकन दर्ज" : "DPDP Act 2023 Cryptographic Consent Preferences Registered"),
        time: isTa ? "2 நாட்களுக்கு முன்" : (isHi ? "2 दिन पहले" : "2 Days Ago")
      }
    ];

    el.securityTimelineContainer.innerHTML = events.map(e => `
      <div class="security-timeline-item">
        <div class="timeline-icon-box">${e.icon}</div>
        <div class="timeline-content">
          <div class="timeline-event-title">${e.title}</div>
          <div class="timeline-event-time">${e.time}</div>
        </div>
      </div>
    `).join('');
  }
}

function renderAccountCard(acc) {
  if (el.dashGreeting) {
    el.dashGreeting.textContent = getHumanGreeting();
  }
  el.dashCustomerName.textContent = state.user?.fullName || state.user?.full_name || 'Customer';
  el.dashCustomerNum.textContent = state.customerProfile?.customer_number || 'CUST-000';
  el.dashAccountType.textContent = `${acc.account_type || 'BANK'} ACCOUNT`;
  el.dashMaskedAccNum.textContent = acc.account_number_masked || '•••• •••• ••••';
  el.dashBalance.textContent = `$${(acc.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })} ${acc.currency || 'USD'}`;
  el.dashBranch.textContent = `Branch: ${acc.branch_code || 'Main'}`;
  el.dashCbsRef.textContent = `CBS: ${acc.cbs_account_ref || ''}`;

  if (el.dashHeroSubtitle) {
    const isRestricted = acc.status === 'RESTRICTED' || state.activeEligibility?.hasRestriction;
    const dict = I18N[state.currentLang] || I18N.en;
    el.dashHeroSubtitle.textContent = isRestricted ? dict.heroSubtitle : dict.heroSubtitleActive;
  }

  el.dashAccountStatusBadge.textContent = acc.status;
  el.dashAccountStatusBadge.className = `badge ${acc.status === 'ACTIVE' ? 'badge-status restored' : 'badge-status under_review'}`;

  // Update inline recovery form pre-filled customer details
  if (el.inlineRecName) {
    el.inlineRecName.value = state.user?.fullName || state.user?.full_name || 'Customer';
  }
  if (el.inlineRecContact) {
    const phone = state.user?.phone || '+1 (555) 000-0000';
    const email = state.user?.email || 'customer@example.com';
    el.inlineRecContact.value = `${phone} • ${email}`;
  }
}

function renderRestrictionBanner(eligibility) {
  if (!eligibility || !eligibility.hasRestriction) {
    el.restrictionBanner.style.display = 'none';
    return;
  }

  el.restrictionBanner.style.display = 'flex';
  const isTa = state.currentLang === 'ta';
  const isHi = state.currentLang === 'hi';
  let title = eligibility.title;
  if (isTa && eligibility.titleTa) title = eligibility.titleTa;
  else if (isHi && eligibility.titleHi) title = eligibility.titleHi;

  el.rstTitle.textContent = title;
  el.rstSeverity.textContent = `${eligibility.severity} RISK`;
  el.rstSeverity.className = `severity-tag ${eligibility.severity === 'CRITICAL' ? 'bg-danger' : ''}`;
  const hoursWord = isTa ? 'மணிநேரம்' : (isHi ? 'घंटे' : 'Hours');
  el.rstSlaHours.textContent = `${eligibility.slaHours} ${hoursWord}`;

  // Impact tags
  el.rstImpactTags.innerHTML = (eligibility.impactedServices || []).map(tag => {
    return `<span class="impact-pill">${tag.replace(/_/g, ' ')}</span>`;
  }).join('');

  // Start recovery button handler - scroll smoothly to dedicated in-page recovery hub
  el.startRecoveryBtn.onclick = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (el.dashRecoverySection) {
      el.dashRecoverySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (el.inlineDocNumber) setTimeout(() => el.inlineDocNumber.focus(), 300);
    }
  };
}

async function loadCustomerTickets() {
  try {
    const res = await API.get('/api/recovery/my-requests');
    state.myRequests = res.data;
    renderTickets();
  } catch (err) {
    console.error('Error loading tickets:', err);
  }
}

function renderTickets() {
  if (el.inlineRecoveryStatusBanner) {
    const activeReq = (state.myRequests || []).find(r => r.status !== 'RESTORED' && r.status !== 'REJECTED');
    if (activeReq) {
      el.inlineRecoveryStatusBanner.style.display = 'flex';
      if (el.inlineStatusBannerRef) el.inlineStatusBannerRef.textContent = activeReq.reference_number;
      if (el.inlineStatusBannerTitle) {
        el.inlineStatusBannerTitle.textContent = state.currentLang === 'ta' ? 'விண்ணப்பம் பரிசீலனையில் உள்ளது' :
          (state.currentLang === 'hi' ? 'आवेदन समीक्षाधीन है' : 'Application Under Review');
      }
      if (el.inlineStatusBannerDesc) {
        const friendlyStatus = activeReq.status.replace(/_/g, ' ');
        el.inlineStatusBannerDesc.textContent = state.currentLang === 'ta' ?
          `Ungal recovery request submit aagiduchu. Idho unga reference number: ${activeReq.reference_number}. Adutha update inga paarkkalaam. (நிலை: ${friendlyStatus}, SLA: 2–4 மணிநேரம்).` :
          (state.currentLang === 'hi' ?
          `आपका रिकवरी अनुरोध जमा हो गया है। यह रहा आपका संदर्भ नंबर: ${activeReq.reference_number}। आप अगला अपडेट यहाँ देख सकते हैं। (स्थिति: ${friendlyStatus}, SLA: 2–4 घंटे)।` :
          `Your recovery request has been submitted. Here's your reference number: ${activeReq.reference_number}. You can track the next update here (Status: ${friendlyStatus}, SLA: 2–4 hours).`);
      }
    } else {
      el.inlineRecoveryStatusBanner.style.display = 'none';
    }
  }

  if (!state.myRequests || state.myRequests.length === 0) {
    el.ticketsContainer.innerHTML = `<div class="empty-state">${I18N[state.currentLang].noActiveTickets}</div>`;
    return;
  }

  const dict = I18N[state.currentLang];

  el.ticketsContainer.innerHTML = state.myRequests.map(req => {
    const stages = [
      { key: 'SUBMITTED', label: dict.stageSubmitted },
      { key: 'UNDER_REVIEW', label: dict.stageUnderReview },
      { key: 'INFO_REQUESTED', label: dict.stageInfoReq },
      { key: 'AUTHORIZED', label: dict.stageAuthorized },
      { key: 'RESOLVED', label: dict.stageRestored }
    ];

    let currentStageIndex = 0;
    if (req.status === 'SUBMITTED') currentStageIndex = 0;
    else if (req.status === 'UNDER_REVIEW') currentStageIndex = 1;
    else if (req.status === 'INFO_REQUESTED') currentStageIndex = 2;
    else if (req.status === 'REVIEWED_PENDING_APPROVAL') currentStageIndex = 3;
    else if (req.status === 'RESTORED') currentStageIndex = 4;
    else if (req.status === 'REJECTED') currentStageIndex = 3;

    const timelineHtml = stages.map((st, i) => {
      let cls = '';
      if (req.status === 'RESTORED') {
        cls = 'completed';
      } else if (i < currentStageIndex) {
        cls = 'completed';
      } else if (i === currentStageIndex) {
        if (req.status === 'REJECTED') cls = 'rejected';
        else if (req.status === 'INFO_REQUESTED') cls = 'current info-requested';
        else cls = 'current';
      }

      const icon = cls.includes('completed') ? '✓' : (cls.includes('rejected') ? '✕' : (i + 1));

      return `
        <div class="timeline-step ${cls}">
          <div class="step-dot">${icon}</div>
          <span class="step-text">${st.label}</span>
        </div>
      `;
    }).join('');

    const submittedDate = req.submitted_at ? new Date(req.submitted_at).toLocaleString() : 'Recent';
    const maskedAcc = req.account_number_masked || (req.account && req.account.account_number_masked) || '•••• 0000';

    return `
      <div class="ticket-item">
        <div class="ticket-top">
          <div>
            <span class="ticket-ref">${req.reference_number}</span>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">
              ${req.category_code} &bull; Account ${maskedAcc} &bull; Submitted: ${submittedDate}
            </div>
          </div>
          <span class="badge-status ${req.status.toLowerCase()}">${req.status.replace(/_/g, ' ')}</span>
        </div>

        <div class="status-timeline">
          ${timelineHtml}
        </div>

        <!-- Expected Next Step Banner -->
        <div class="next-step-box ${req.status === 'INFO_REQUESTED' ? 'alert-mode' : ''}">
          <span class="next-step-title">
            <span>${req.status === 'INFO_REQUESTED' ? '⚠️' : '⏱️'}</span>
            <strong>${dict.nextStep}</strong> ${req.expectedNextStep || 'Review in progress by Bank Operations desk.'}
          </span>
          <span class="text-muted" style="font-size: 0.72rem;">SLA Turnaround: 2-4 Hours</span>
        </div>

        ${req.status === 'INFO_REQUESTED' ? `
          <div style="background: #fff7ed; border: 1px solid #ffedd5; padding: 0.85rem; border-radius: 8px; margin-top: 0.75rem;">
            <div style="color: #c2410c; font-weight: 800; font-size: 0.82rem; margin-bottom: 0.3rem;">
              ⚠️ ${dict.resubmissionRequired}
            </div>
            ${req.resubmissionInstructions ? `
              <div style="font-size: 0.78rem; color: #7c2d12; margin-bottom: 0.4rem;">
                <strong>${dict.resubmissionInstructions}</strong> ${req.resubmissionInstructions}
              </div>
            ` : ''}
            ${req.missingDocuments && req.missingDocuments.length > 0 ? `
              <div style="font-size: 0.78rem; color: #9a3412; margin-bottom: 0.6rem;">
                <strong>${dict.missingDocs}</strong> ${req.missingDocuments.map(d => `<span class="impact-pill" style="margin-left: 4px;">${d}</span>`).join('')}
              </div>
            ` : ''}
            <button class="btn btn-sm btn-primary" onclick="reUploadInfo('${req.id}')">
              📤 ${dict.uploadRequestedInfo}
            </button>
          </div>
        ` : ''}

        ${req.status === 'RESTORED' && req.cbs_transaction_ref ? `
          <div style="background: #f0fdf4; border: 1px solid #dcfce7; padding: 0.6rem 0.85rem; border-radius: 8px; font-size: 0.78rem; color: #166534; margin-top: 0.75rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
            <span><strong>✓ Core Banking System Released:</strong> <code style="font-weight: 700; color: #15803d;">${req.cbs_transaction_ref}</code></span>
            <span class="badge bg-success" style="color: #fff; padding: 2px 8px; border-radius: 9999px;">RESTORED ACTIVE</span>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

// ================= RECOVERY APPLICATION WIZARD =================
function openRecoveryWizard(eligibility) {
  state.wizard = {
    currentStep: 1,
    accountId: eligibility.accountId,
    restrictionId: eligibility.restrictionId,
    categoryCode: eligibility.restrictionCode,
    selfieCaptured: false,
    idFile: null,
    addressFile: null
  };

  el.wizardCategoryTitle.textContent = `${eligibility.title} (${eligibility.restrictionCode})`;
  el.wizardChecklist.innerHTML = eligibility.remediationSteps.map(step => `<li>${step}</li>`).join('');
  el.wizardConfirmEmail.textContent = state.user.email;
  el.wizardConfirmPhone.textContent = state.user.phone || '+1 (555) 000-0000';

  updateWizardStepView(1);
  el.recoveryModal.style.display = 'flex';
}

function updateWizardStepView(step) {
  state.wizard.currentStep = step;

  // Step item active states
  document.querySelectorAll('.wizard-steps .step-item').forEach(it => {
    const s = parseInt(it.dataset.step, 10);
    it.classList.toggle('active', s === step);
  });

  // Panes
  document.getElementById('wizardStep1').style.display = step === 1 ? 'block' : 'none';
  document.getElementById('wizardStep2').style.display = step === 2 ? 'block' : 'none';
  document.getElementById('wizardStep3').style.display = step === 3 ? 'block' : 'none';
  document.getElementById('wizardStep4').style.display = step === 4 ? 'block' : 'none';

  // Navigation buttons
  el.wizardPrevBtn.style.display = step > 1 ? 'inline-flex' : 'none';
  el.wizardNextBtn.style.display = step < 4 ? 'inline-flex' : 'none';
  el.wizardSubmitBtn.style.display = step === 4 ? 'inline-flex' : 'none';
}

async function submitRecoveryApplication() {
  if (!el.legalConsentCheck.checked) {
    showToast('Please certify the legal consent declaration before submitting.', 'error');
    return;
  }

  el.wizardSubmitBtn.disabled = true;
  el.wizardSubmitBtn.querySelector('.btn-spinner').style.display = 'inline-block';

  try {
    // 1. Submit recovery application with Idempotency-Key
    const idempotencyKey = `req-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const createRes = await API.post('/api/recovery/submit', {
      accountId: state.wizard.accountId,
      restrictionId: state.wizard.restrictionId,
      categoryCode: state.wizard.categoryCode,
      customerExplanation: el.wizardExplanation.value,
      sourceOfFunds: el.wizardSourceOfFunds.value,
      contactConfirmed: el.contactConfirmedCheck.checked,
      consentSigned: true
    }, {
      'Idempotency-Key': idempotencyKey
    });

    const newRequest = createRes.data;

    // 2. Upload simulated selfie liveness document
    await API.post(`/api/recovery/${newRequest.id}/upload-doc`, {
      documentType: 'SELFIE_LIVENESS',
      fileName: 'biometric_selfie_liveness.jpg'
    });

    // 3. Upload ID document if attached (handles real File or simulated)
    if (state.wizard.idFile && state.wizard.idFile instanceof File) {
      const formData = new FormData();
      formData.append('document', state.wizard.idFile);
      formData.append('documentType', 'GOVT_ID');
      await API.upload(`/api/recovery/${newRequest.id}/upload-doc`, formData);
    } else {
      await API.post(`/api/recovery/${newRequest.id}/upload-doc`, {
        documentType: 'GOVT_ID',
        fileName: state.wizard.idFile ? state.wizard.idFile.name : 'national_passport.jpg'
      });
    }

    // 4. Upload Proof of Address if attached
    if (state.wizard.addressFile && state.wizard.addressFile instanceof File) {
      const formData = new FormData();
      formData.append('document', state.wizard.addressFile);
      formData.append('documentType', 'PROOF_OF_ADDRESS');
      await API.upload(`/api/recovery/${newRequest.id}/upload-doc`, formData);
    }

    el.recoveryModal.style.display = 'none';
    showToast(`Application ${newRequest.reference_number} submitted successfully!`, 'success');

    // Reload dashboard to show active timeline
    await loadCustomerDashboard();

  } catch (err) {
    // Error handled by API client
  } finally {
    el.wizardSubmitBtn.disabled = false;
    el.wizardSubmitBtn.querySelector('.btn-spinner').style.display = 'none';
  }
}

// ================= BANK OPERATIONS COCKPIT =================
async function loadAdminDashboard() {
  try {
    loadReviewerQueue();
    loadApproverQueue();
    loadFraudDashboard();
    loadReportsDashboard();
    loadAuditLogs();
    loadCbsStatus();
  } catch (err) {
    console.error('Admin dashboard load error:', err);
  }
}

async function loadReviewerQueue() {
  try {
    const res = await API.get('/api/admin/queue/reviewer');
    const cases = res.data;
    el.reviewerBadge.textContent = cases.length;

    if (cases.length === 0) {
      el.reviewerTableBody.innerHTML = `<tr><td colspan="8" class="text-center text-muted" style="padding: 2rem;">No pending cases awaiting Maker review.</td></tr>`;
      return;
    }

    el.reviewerTableBody.innerHTML = cases.map(c => {
      const isClaimedByMe = c.assigned_reviewer_id === state.user.id;
      return `
        <tr>
          <td><strong class="ticket-ref">${c.reference_number}</strong></td>
          <td>${c.customer_name}<br><small class="text-muted">${c.customer_number}</small></td>
          <td>${c.account_number_masked}<br><small class="text-muted">${c.account_type}</small></td>
          <td>${c.category_code}</td>
          <td><span class="badge ${c.severity === 'CRITICAL' ? 'bg-danger' : 'badge-warning'}">${c.severity}</span></td>
          <td><span class="badge-status ${c.status.toLowerCase()}">${c.status}</span></td>
          <td>${c.assigned_reviewer_name || '<em class="text-muted">Unassigned</em>'}</td>
          <td>
            ${c.status === 'SUBMITTED' ? `
              <button class="btn btn-sm btn-primary" onclick="claimCase('${c.id}')">Claim Case</button>
            ` : `
              <button class="btn btn-sm btn-outline" onclick="openCaseInspection('${c.id}', 'MAKER')">Inspect Case</button>
            `}
          </td>
        </tr>
      `;
    }).join('');
  } catch (err) {
    console.error('Error loading reviewer queue:', err);
  }
}

async function loadApproverQueue() {
  try {
    const res = await API.get('/api/admin/queue/approver');
    const cases = res.data;
    el.approverBadge.textContent = cases.length;

    if (cases.length === 0) {
      el.approverTableBody.innerHTML = `<tr><td colspan="8" class="text-center text-muted" style="padding: 2rem;">No cases currently awaiting Checker dual authorization.</td></tr>`;
      return;
    }

    el.approverTableBody.innerHTML = cases.map(c => {
      // Four-Eyes check: If current user was the maker, flag violation
      const isSelfMaker = c.assigned_reviewer_id === state.user.id;

      return `
        <tr>
          <td><strong class="ticket-ref">${c.reference_number}</strong></td>
          <td>${c.customer_name}<br><small class="text-muted">${c.customer_number}</small></td>
          <td>${c.account_number_masked}<br><small class="text-muted">$${c.balance.toLocaleString()}</small></td>
          <td>${c.category_code}</td>
          <td>${c.assigned_reviewer_name}</td>
          <td><span class="badge-status ${c.status.toLowerCase()}">${c.status}</span></td>
          <td>
            ${isSelfMaker ? `
              <span class="text-danger" style="font-size: 0.75rem; font-weight: 700;">
                ⚠️ FOUR-EYES BLOCK (You were Maker)
              </span>
            ` : `
              <span class="text-success" style="font-size: 0.75rem; font-weight: 700;">
                ✓ Dual-Control Compliant
              </span>
            `}
          </td>
          <td>
            <button class="btn btn-sm btn-primary" onclick="openCaseInspection('${c.id}', 'CHECKER')">
              Review & Authorize
            </button>
          </td>
        </tr>
      `;
    }).join('');
  } catch (err) {
    console.error('Error loading approver queue:', err);
  }
}

async function claimCase(requestId) {
  try {
    await API.post(`/api/admin/case/${requestId}/claim`);
    showToast('Case claimed for L1 Maker review', 'success');
    loadReviewerQueue();
  } catch (err) {
    // Handled
  }
}

async function openCaseInspection(requestId, roleMode) {
  try {
    const res = await API.get(`/api/recovery/${requestId}`);
    const caseData = res.data;
    state.currentInspectCase = caseData;

    el.inspectRefTitle.textContent = `Case ${caseData.reference_number}`;
    el.inspectCustomerMeta.textContent = `${caseData.customer?.full_name || 'Customer'} • ${caseData.customer?.customer_number || ''}`;
    el.inspectAccNum.textContent = caseData.account?.account_number_masked || '••••';
    el.inspectCategory.textContent = caseData.category_code;
    el.inspectStatusBadge.textContent = caseData.status;
    el.inspectStatusBadge.className = `badge-status ${caseData.status.toLowerCase()}`;
    el.inspectExplanation.textContent = caseData.customer_explanation || 'No customer explanation provided';

    // Documents
    if (caseData.documents && caseData.documents.length > 0) {
      el.inspectDocsContainer.innerHTML = caseData.documents.map(d => {
        return `
          <div style="background: #fff; border: 1px solid var(--border); padding: 0.6rem; border-radius: 6px; margin-bottom: 0.5rem;">
            <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700;">
              <span>📄 ${d.document_type}</span>
              <span class="text-success">${Math.round((d.ocr_confidence_score || 0.95) * 100)}% Confidence</span>
            </div>
            <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">
              File: ${d.file_name} &bull; Tamper Check: PASS
            </div>
          </div>
        `;
      }).join('');
    } else {
      el.inspectDocsContainer.innerHTML = `<em class="text-muted">No documents uploaded.</em>`;
    }

    // Role-specific action buttons
    if (roleMode === 'MAKER') {
      el.makerActionButtons.style.display = 'flex';
      el.checkerActionButtons.style.display = 'none';
    } else {
      el.makerActionButtons.style.display = 'none';
      el.checkerActionButtons.style.display = 'flex';
    }

    el.inspectNotes.value = '';
    el.caseInspectModal.style.display = 'flex';
  } catch (err) {
    console.error('Error opening inspection:', err);
  }
}

// Maker Actions
async function recordMakerDecision(action) {
  if (!state.currentInspectCase) return;
  const requestId = state.currentInspectCase.id;
  const notes = el.inspectNotes.value;

  try {
    await API.post(`/api/admin/case/${requestId}/review`, {
      action,
      notes,
      riskScore: 15
    });

    el.caseInspectModal.style.display = 'none';
    showToast(`Maker action '${action}' recorded successfully!`, 'success');
    loadReviewerQueue();
    loadApproverQueue();
  } catch (err) {
    // Handled
  }
}

// Checker Actions (CBS Hold Release)
async function recordCheckerAuthorization(action) {
  if (!state.currentInspectCase) return;
  const requestId = state.currentInspectCase.id;
  const notes = el.inspectNotes.value;

  try {
    const res = await API.post(`/api/admin/case/${requestId}/authorize`, {
      action,
      notes
    });

    el.caseInspectModal.style.display = 'none';
    showToast(res.message, 'success');
    loadApproverQueue();
    loadReviewerQueue();
    loadAuditLogs();
    loadCbsStatus();
  } catch (err) {
    // Handled
  }
}

// Audit Logs
async function loadAuditLogs() {
  try {
    const role = el.auditRoleFilter.value;
    const search = el.auditSearchInput.value;
    const res = await API.get(`/api/admin/audit-logs?actorRole=${role}&action=${encodeURIComponent(search)}`);
    const logs = res.data;

    el.auditTableBody.innerHTML = logs.map(l => {
      const time = new Date(l.timestamp).toLocaleTimeString();
      const date = new Date(l.timestamp).toLocaleDateString();
      const detailsStr = typeof l.details === 'object' ? JSON.stringify(l.details) : l.details;

      return `
        <tr>
          <td><small class="text-muted">${date} ${time}</small></td>
          <td><strong>${l.actor_name || l.actor_id || 'System'}</strong></td>
          <td><span class="user-badge">${l.actor_role}</span></td>
          <td><code>${l.action}</code></td>
          <td>${l.entity_type}</td>
          <td><small style="font-family: monospace; color: var(--secondary);">${detailsStr}</small></td>
        </tr>
      `;
    }).join('');
  } catch (err) {
    console.error('Error loading audit logs:', err);
  }
}

// CBS Telemetry & Latency Controls
async function loadCbsStatus() {
  try {
    const res = await API.get('/api/admin/cbs-status');
    const { latencyMs, failRate, telemetry } = res.data;
    el.cbsLatencyVal.textContent = `${latencyMs} ms`;
    el.latencySlider.value = latencyMs;
    el.latencyDisplay.textContent = `${latencyMs} ms`;
    el.failRateSlider.value = failRate;
    el.failRateDisplay.textContent = `${Math.round(failRate * 100)} %`;

    if (telemetry && telemetry.length > 0) {
      el.cbsTelemetryLog.innerHTML = telemetry.slice(0, 15).map(t => {
        return `
          <div style="padding: 0.4rem 0; border-bottom: 1px solid #f1f5f9; font-size: 0.75rem; font-family: monospace;">
            <span style="color: var(--text-muted);">${t.timestamp.slice(11, 19)}</span>
            <strong style="color: var(--primary); margin: 0 0.4rem;">${t.action}</strong>
            <span>${JSON.stringify(t.result || t.payload)}</span>
          </div>
        `;
      }).join('');
    } else {
      el.cbsTelemetryLog.innerHTML = `<em class="text-muted">No telemetry logged yet.</em>`;
    }
  } catch (err) {
    console.error('Error loading CBS status:', err);
  }
}

// ================= NOTIFICATIONS & COMPLAINTS =================
async function loadNotifications() {
  if (!state.user) return;
  try {
    const res = await API.get('/api/notifications');
    state.notifications = res.data;
    const unread = state.notifications.filter(n => !n.read_status).length;

    if (unread > 0) {
      el.notifBadge.textContent = unread;
      el.notifBadge.style.display = 'inline-block';
    } else {
      el.notifBadge.style.display = 'none';
    }

    if (state.notifications.length === 0) {
      el.notifList.innerHTML = `<div class="empty-state">${I18N[state.currentLang].noNotifications}</div>`;
    } else {
      el.notifList.innerHTML = state.notifications.map(n => `
        <div class="notif-item ${n.read_status ? '' : 'unread'}" onclick="markNotifRead('${n.id}')">
          <div class="notif-item-top">
            <span>${n.delivery_channel}</span>
            <span>${new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div class="notif-title">${n.title}</div>
          <div class="notif-msg">${n.message}</div>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error('Error loading notifications:', err);
  }
}

async function markNotifRead(id) {
  try {
    await API.post(`/api/notifications/${id}/read`);
    loadNotifications();
  } catch (err) {
    // Handled
  }
}

// Complaints
async function loadCustomerComplaints() {
  try {
    const res = await API.get('/api/complaints/my');
    state.complaints = res.data;
    const listEl = el.myComplaintsList;

    if (state.complaints.length === 0) {
      listEl.innerHTML = `<div class="empty-state" style="padding: 1rem;">No grievances filed.</div>`;
      return;
    }

    listEl.innerHTML = state.complaints.map(c => `
      <div style="background: #f8fafc; border: 1px solid var(--border); padding: 0.75rem; border-radius: 6px; margin-bottom: 0.5rem;">
        <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 700;">
          <span>${c.subject}</span>
          <span class="badge ${c.status === 'ESCALATED' ? 'bg-danger' : 'badge-warning'}">Tier ${c.escalation_tier} &bull; ${c.status}</span>
        </div>
        <p style="font-size: 0.78rem; color: var(--secondary); margin: 0.3rem 0;">${c.description}</p>
        ${c.resolution_notes ? `<div style="font-size: 0.75rem; color: #166534; background: #dcfce7; padding: 4px 6px; border-radius: 4px; margin-top: 4px;">${c.resolution_notes}</div>` : ''}
        ${c.escalation_tier < 3 ? `
          <button class="btn btn-sm btn-outline-danger mt-2" onclick="escalateComplaint('${c.id}')">
            ${I18N[state.currentLang].escalate}
          </button>
        ` : ''}
      </div>
    `).join('');
  } catch (err) {
    console.error('Error loading complaints:', err);
  }
}

async function escalateComplaint(id) {
  try {
    await API.post(`/api/complaints/${id}/escalate`, { reason: 'Customer requested executive level intervention' });
    showToast('Grievance escalated to senior compliance tier', 'success');
    loadCustomerComplaints();
  } catch (err) {
    // Handled
  }
}

// ================= SECURITY & PRIVACY CENTER =================
async function loadCustomerConsents() {
  if (!state.customerProfile) return;
  try {
    const res = await API.get('/api/privacy/consents');
    const consents = res.data;
    el.privacyConsentsList.innerHTML = consents.map(c => {
      const isGranted = Boolean(c.granted);
      const updatedDate = c.lastUpdated ? new Date(c.lastUpdated).toLocaleDateString() : 'Active Registration';
      return `
        <div class="consent-item-card">
          <div class="consent-info">
            <div style="display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap;">
              <h5>${c.name}</h5>
              <span class="badge ${c.isMandatory ? 'badge-warning' : 'user-badge'}">${c.version}</span>
              ${c.isMandatory ? '<span class="consent-status-badge" style="background:#fef3c7; color:#b45309;">Mandatory Regulatory</span>' : '<span class="consent-status-badge" style="background:#f1f5f9; color:#475569;">Optional</span>'}
            </div>
            <p>${c.description}</p>
            <small class="text-muted">Recorded Status: ${isGranted ? '✓ Granted' : 'Revoked'} &bull; Updated: ${updatedDate}</small>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" ${isGranted ? 'checked' : ''} ${c.isMandatory ? 'disabled' : ''} onchange="toggleCustomerConsent('${c.type}', this.checked)">
            <span class="toggle-slider"></span>
          </label>
        </div>
      `;
    }).join('');
  } catch (err) {
    console.error('Error loading consents:', err);
  }
}

async function toggleCustomerConsent(consentType, granted) {
  try {
    await API.post('/api/privacy/consents', {
      consentType,
      granted
    });
    showToast(`Privacy consent preference updated (${granted ? 'Granted' : 'Revoked'})`, 'success');
    loadCustomerConsents();
  } catch (err) {
    loadCustomerConsents();
  }
}

// ================= FRAUD DETECTION & ALERT CENTER =================
let currentTriageAlert = null;

async function loadFraudDashboard() {
  try {
    // 1. Stats
    const statsRes = await API.get('/api/fraud/stats');
    const stats = statsRes.data;
    el.fraudKpiOpen.textContent = stats.openAlerts || 0;
    el.fraudKpiTotal.textContent = `Total: ${stats.totalAlerts || 0}`;
    el.fraudKpiCritical.textContent = stats.criticalCount || 0;
    el.fraudKpiAvgRisk.textContent = `${stats.averageOpenRiskScore || 0} / 100`;
    el.fraudKpiActiveRules.textContent = stats.activeRulesCount || 5;

    if (stats.openAlerts > 0) {
      el.fraudBadge.textContent = stats.openAlerts;
      el.fraudBadge.style.display = 'inline-block';
    } else {
      el.fraudBadge.style.display = 'none';
    }

    // 2. Alerts table
    await loadFraudAlerts();

    // 3. Rules table
    await loadFraudRules();

  } catch (err) {
    console.error('Error loading fraud dashboard:', err);
  }
}

async function loadFraudAlerts() {
  try {
    const status = el.fraudStatusFilter.value;
    const severity = el.fraudSeverityFilter.value;
    const search = el.fraudSearchInput.value;
    const res = await API.get(`/api/fraud/alerts?status=${status}&severity=${severity}&search=${encodeURIComponent(search)}`);
    const alerts = res.data;

    if (alerts.length === 0) {
      el.fraudAlertsTableBody.innerHTML = `<tr><td colspan="8" class="text-center text-muted" style="padding: 2rem;">No fraud alerts matching filter criteria.</td></tr>`;
      return;
    }

    el.fraudAlertsTableBody.innerHTML = alerts.map(a => {
      const riskClass = a.risk_score >= 70 ? 'critical' : (a.risk_score >= 40 ? 'high' : (a.risk_score >= 20 ? 'medium' : 'low'));
      return `
        <tr>
          <td><strong class="ticket-ref">${a.alert_code}</strong></td>
          <td>${a.customer_name}<br><small class="text-muted">${a.account_number_masked} (${a.account_type})</small></td>
          <td><code>${a.alert_type}</code></td>
          <td><span class="badge ${a.severity === 'CRITICAL' ? 'bg-danger' : (a.severity === 'HIGH' ? 'badge-warning' : 'user-badge')}">${a.severity}</span></td>
          <td>
            <span class="risk-pill ${riskClass}">
              ● ${a.risk_score} / 100
            </span>
          </td>
          <td><span class="badge-status ${a.status.toLowerCase()}">${a.status}</span></td>
          <td>${a.assigned_analyst_name || '<em class="text-muted">Unassigned</em>'}</td>
          <td>
            <button class="btn btn-sm btn-outline" onclick="openFraudAlertTriage('${a.id}')">
              Investigate
            </button>
          </td>
        </tr>
      `;
    }).join('');
  } catch (err) {
    console.error('Error loading fraud alerts:', err);
  }
}

async function loadFraudRules() {
  try {
    const res = await API.get('/api/fraud/rules');
    const rules = res.data;

    el.fraudRulesTableBody.innerHTML = rules.map(r => {
      return `
        <tr>
          <td><code>${r.rule_code}</code></td>
          <td>
            <strong>${r.name}</strong><br>
            <small class="text-muted">${r.description}</small>
          </td>
          <td><span class="badge ${r.severity === 'CRITICAL' ? 'bg-danger' : (r.severity === 'HIGH' ? 'badge-warning' : 'user-badge')}">${r.severity}</span></td>
          <td><small>${r.threshold_value > 0 ? '$' + Number(r.threshold_value).toLocaleString() : 'Dynamic Geo'}</small></td>
          <td>
            <span class="badge ${r.is_enabled ? 'badge-status restored' : 'badge-status rejected'}">
              ${r.is_enabled ? 'ACTIVE' : 'DISABLED'}
            </span>
          </td>
          <td>
            <button class="btn btn-sm ${r.is_enabled ? 'btn-outline-danger' : 'btn-outline-primary'}" onclick="toggleFraudRule('${r.id}')">
              ${r.is_enabled ? 'Disable' : 'Enable'}
            </button>
          </td>
        </tr>
      `;
    }).join('');
  } catch (err) {
    console.error('Error loading fraud rules:', err);
  }
}

async function toggleFraudRule(ruleId) {
  try {
    await API.post(`/api/fraud/rules/${ruleId}/toggle`);
    showToast('Fraud detection rule status updated', 'success');
    loadFraudRules();
    loadFraudDashboard();
  } catch (err) {
    // Handled
  }
}

async function openFraudAlertTriage(alertId) {
  try {
    const res = await API.get(`/api/fraud/alerts/${alertId}`);
    const alert = res.data;
    currentTriageAlert = alert;

    el.fraudModalAlertCode.textContent = `Alert ${alert.alert_code} (${alert.alert_type})`;
    el.fraudModalCustomerMeta.textContent = `${alert.customer_name} • ${alert.customer_number} • Account ${alert.account_number_masked}`;

    const riskClass = alert.risk_score >= 70 ? 'critical' : (alert.risk_score >= 40 ? 'high' : (alert.risk_score >= 20 ? 'medium' : 'low'));
    el.fraudModalRiskPill.className = `risk-pill ${riskClass}`;
    el.fraudModalRiskPill.textContent = `${alert.risk_score} / 100 (${alert.severity} SEVERITY)`;
    el.fraudModalRiskBar.style.width = `${alert.risk_score}%`;
    el.fraudModalRiskBar.style.background = alert.risk_score >= 70 ? '#ef4444' : (alert.risk_score >= 40 ? '#f97316' : '#10b981');

    el.fraudModalReasonsList.innerHTML = alert.reasons && alert.reasons.length > 0 
      ? alert.reasons.map(r => `<li>${r}</li>`).join('')
      : `<li>Statistical telemetry departed from historic customer baseline.</li>`;

    el.fraudModalAccNum.textContent = alert.account_number_masked;
    el.fraudModalBalance.textContent = `$${Number(alert.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })} USD`;
    el.fraudModalCbsRef.textContent = alert.cbs_account_ref;
    el.fraudModalKyc.textContent = alert.risk_rating || 'MEDIUM';

    el.fraudModalNotesHistory.textContent = alert.investigation_notes || 'No notes logged yet.';
    el.fraudAnalystNotesInput.value = '';

    el.fraudAlertModal.style.display = 'flex';
  } catch (err) {
    console.error('Error opening triage:', err);
  }
}

async function acknowledgeCurrentFraudAlert() {
  if (!currentTriageAlert) return;
  try {
    await API.post(`/api/fraud/alerts/${currentTriageAlert.id}/acknowledge`);
    showToast('Alert acknowledged and assigned to analyst queue', 'success');
    openFraudAlertTriage(currentTriageAlert.id);
    loadFraudDashboard();
  } catch (err) {}
}

async function saveCurrentFraudNotes() {
  if (!currentTriageAlert) return;
  const notes = el.fraudAnalystNotesInput.value.trim();
  if (!notes) {
    showToast('Please enter an investigation note to record.', 'error');
    return;
  }
  try {
    await API.post(`/api/fraud/alerts/${currentTriageAlert.id}/investigate`, { notes });
    showToast('Investigation note saved to case history', 'success');
    openFraudAlertTriage(currentTriageAlert.id);
    loadFraudDashboard();
  } catch (err) {}
}

async function escalateCurrentFraudAlert() {
  if (!currentTriageAlert) return;
  const notes = el.fraudAnalystNotesInput.value.trim() || 'Escalated by analyst for senior fraud committee investigation';
  try {
    await API.post(`/api/fraud/alerts/${currentTriageAlert.id}/escalate`, { notes });
    showToast('Alert escalated to senior committee', 'warning');
    openFraudAlertTriage(currentTriageAlert.id);
    loadFraudDashboard();
  } catch (err) {}
}

async function closeCurrentFraudAlert(disposition) {
  if (!currentTriageAlert) return;
  const notes = el.fraudAnalystNotesInput.value.trim() || `Disposition confirmed: ${disposition}`;
  try {
    await API.post(`/api/fraud/alerts/${currentTriageAlert.id}/close`, { disposition, notes });
    showToast(`Alert closed with disposition: ${disposition}`, 'success');
    el.fraudAlertModal.style.display = 'none';
    loadFraudDashboard();
  } catch (err) {}
}

// ================= REPORTS & COMPLIANCE EXPORTS =================
async function loadReportsDashboard() {
  try {
    const res = await API.get('/api/admin/reports/summary');
    const s = res.data;
    el.repTotalCases.textContent = s.totalCases || 0;
    el.repPendingMaker.textContent = s.pendingMakerReviews || 0;
    el.repPendingChecker.textContent = s.pendingCheckerApprovals || 0;
    el.repRestoredAccounts.textContent = s.totalRestoredAccounts || 0;
    el.repAvgTurnaround.textContent = `${s.avgTurnaroundHours} h`;
    el.repOpenFraudAlerts.textContent = s.fraudAlertsOpen || 0;
  } catch (err) {
    console.error('Error loading reports summary:', err);
  }
}

async function exportComplianceReport(type, format) {
  try {
    const url = `/api/admin/reports/export?type=${type}&format=${format}`;
    const token = state.token;

    const res = await fetch(url, {
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });

    if (format === 'csv') {
      const csvText = await res.text();
      el.exportPreviewTitle.textContent = `Generated CSV Export: ${type.toUpperCase()}_REPORT_${Date.now()}.csv`;
      el.exportPreviewContent.textContent = csvText;
      el.exportPreviewCard.style.display = 'block';

      const blob = new Blob([csvText], { type: 'text/csv' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `rebank_${type}_report_${Date.now()}.csv`;
      a.click();
      showToast('CSV report export generated and downloaded', 'success');
    } else {
      const jsonData = await res.json();
      el.exportPreviewTitle.textContent = `Generated JSON Export: ${type.toUpperCase()} (Total records: ${jsonData.recordCount})`;
      el.exportPreviewContent.textContent = JSON.stringify(jsonData, null, 2);
      el.exportPreviewCard.style.display = 'block';
      showToast('JSON report export generated', 'success');
    }
  } catch (err) {
    console.error('Export failed:', err);
    showToast('Failed to export report: ' + err.message, 'error');
  }
}

// ================= HACKATHON UPGRADE: LOCK EXPLANATIONS =================
async function openLockExplanationModal() {
  if (!el.lockExplanationModal) return;

  // Auto-fetch active restriction diagnostics if logged in and not yet loaded
  if (state.token && state.activeAccount && !state.activeEligibility) {
    try {
      const eligRes = await API.get(`/api/customer/restriction/${state.activeAccount.id}`);
      state.activeEligibility = eligRes.data;
    } catch (e) {
      console.warn('Could not fetch restriction diagnostics:', e);
    }
  }

  const elig = state.activeEligibility;
  const acc = state.activeAccount;
  const lang = state.currentLang;

  if (el.lockModalAccNum) {
    el.lockModalAccNum.textContent = acc ? (acc.account_number_masked || '•••• 1002') : '•••• 1002';
  }

  const isRestricted = (acc && acc.status === 'RESTRICTED') || (elig && elig.hasRestriction);

  if (isRestricted && elig) {
    if (el.lockModalStatusBadge) {
      el.lockModalStatusBadge.textContent = lang === 'ta' ? '🔴 செயலில் உள்ள ஒழுங்குமுறை முடக்கம்' :
        (lang === 'hi' ? '🔴 सक्रिय विनियामक रोक' : '🔴 ACTIVE REGULATORY HOLD');
      el.lockModalStatusBadge.style.background = '#FEE2E2';
      el.lockModalStatusBadge.style.color = '#991B1B';
    }
    if (el.lockModalCodeBadge) {
      el.lockModalCodeBadge.textContent = elig.restrictionCode || 'KYC_EXPIRED';
      el.lockModalCodeBadge.style.display = 'inline-block';
    }
    if (el.lockResolveCurrentBtn) {
      el.lockResolveCurrentBtn.style.display = 'inline-block';
    }

    let desc = elig.description;
    if (lang === 'ta' && elig.descriptionTa) desc = elig.descriptionTa;
    else if (lang === 'hi' && elig.descriptionHi) desc = elig.descriptionHi;
    if (el.lockModalReasonText) {
      el.lockModalReasonText.textContent = desc || (lang === 'ta'
        ? 'KYC ஆவண காலாவதி காரணமாக வெளி பரிவர்த்தனைகள் தற்காலிகமாக இடைநிறுத்தப்பட்டுள்ளன.'
        : (lang === 'hi'
          ? 'केवाईसी दस्तावेज़ समाप्ति के कारण बाहरी लेनदेन रोके गए हैं।'
          : 'Statutory KYC documentation review deadline reached. Outbound payments held to safeguard funds.'));
    }

    const hoursWord = lang === 'ta' ? 'மணிநேரம்' : (lang === 'hi' ? 'घंटे' : 'Hours');
    if (el.lockModalSlaText) el.lockModalSlaText.textContent = `${elig.slaHours || '2 - 4'} ${hoursWord}`;
  } else {
    if (el.lockModalStatusBadge) {
      el.lockModalStatusBadge.textContent = lang === 'ta' ? 'ℹ️ பொது தகவல் வழிகாட்டி' :
        (lang === 'hi' ? 'ℹ️ सामान्य सूचनात्मक मार्गदर्शिका' : 'ℹ️ GENERAL INFORMATIONAL GUIDE');
      el.lockModalStatusBadge.style.background = '#E0F2FE';
      el.lockModalStatusBadge.style.color = '#0369A1';
    }
    if (el.lockModalCodeBadge) {
      el.lockModalCodeBadge.textContent = 'STANDARD_SECURITY';
      el.lockModalCodeBadge.style.display = 'inline-block';
    }
    if (el.lockResolveCurrentBtn) {
      el.lockResolveCurrentBtn.style.display = 'none';
    }

    const noHoldMsg = lang === 'ta'
      ? 'கணக்கில் எந்த முடக்கமும் இல்லை. இயல்பான இயக்க நிலையில் உள்ளது. பொதுவான வங்கி முடக்க காரணங்கள் மற்றும் தீர்வுகளை கீழே உள்ள வழிகாட்டியில் அறியலாம்.'
      : (lang === 'hi'
        ? 'खाते पर कोई सक्रिय विनियामक रोक नहीं है। सामान्य रूप से कार्यरत है। सामान्य बैंकिंग लॉक परिदृश्यों को समझने के लिए नीचे दी गई गाइड देखें।'
        : 'No active regulatory hold on this account. Operating normally. Review the official guide below to understand common simulated banking lock scenarios and self-service resolution paths.');
    if (el.lockModalReasonText) el.lockModalReasonText.textContent = noHoldMsg;
    if (el.lockModalSlaText) {
      el.lockModalSlaText.textContent = lang === 'ta' ? 'பொருந்தாது (இயல்பானது)' : (lang === 'hi' ? 'लागू नहीं (सामान्य)' : 'Standard / Operating Normally');
    }
  }

  el.lockExplanationModal.style.display = 'flex';
}

function closeLockExplanationModal() {
  if (el.lockExplanationModal) el.lockExplanationModal.style.display = 'none';
}

function startRecoveryFromLockModal(reasonCode) {
  closeLockExplanationModal();
  if (!state.token) {
    showView('auth');
    showToast('Please sign in to access account recovery.', 'info');
    return;
  }

  switchSubView('viewDashboard');

  if (el.dashRecoverySection) {
    el.dashRecoverySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (el.inlineDocNumber) {
      setTimeout(() => el.inlineDocNumber.focus(), 350);
    }
  } else if (state.activeEligibility && state.activeEligibility.hasRestriction) {
    openRecoveryWizard(state.activeEligibility);
  }

  showToast(
    state.currentLang === 'ta' ? 'கணக்கு மீட்புப் படிவத்திற்கு வழிகாட்டப்பட்டது. தயவுசெய்து சரிபார்ப்பை முடிக்கவும்.' :
    (state.currentLang === 'hi' ? 'खाता पुनर्प्राप्ति पर नेविगेट किया गया। कृपया अपना सत्यापन पूरा करें।' :
    'Navigated to Account Recovery. Please complete your identity verification to restore access.'),
    'info'
  );
}

// ================= HACKATHON UPGRADE: SIMULATED TRANSFER & RISK INTERCEPTION =================
function openSimulateTransferModal() {
  if (!el.simulateTransferModal) return;
  if (el.simSourceAccSelect) {
    if (state.accounts && state.accounts.length > 0) {
      el.simSourceAccSelect.innerHTML = state.accounts.map(acc => {
        const isSel = state.activeAccount && state.activeAccount.id === acc.id ? 'selected' : '';
        const bal = typeof acc.balance === 'number' ? acc.balance.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '0.00';
        return `<option value="${acc.id}" ${isSel}>${acc.account_type || 'SAVINGS'} (${acc.account_number_masked}) - Balance: $${bal}</option>`;
      }).join('');
    } else {
      el.simSourceAccSelect.innerHTML = `<option value="1002" selected>SAVINGS ACCOUNT (•••• 1002) - Balance: $5,800.50</option>`;
    }
  }
  if (el.simResultBox) el.simResultBox.style.display = 'none';
  el.simulateTransferModal.style.display = 'flex';
}

function closeSimulateTransferModal() {
  if (el.simulateTransferModal) el.simulateTransferModal.style.display = 'none';
}

function handleSimulateTransferSubmit(e) {
  e.preventDefault();
  const scenario = el.simScenarioSelect ? el.simScenarioSelect.value : 'AUTO';
  const amount = parseFloat(el.simAmountInput ? el.simAmountInput.value : 0) || 0;
  const payee = el.simPayeeNameInput ? el.simPayeeNameInput.value.trim() : 'Beneficiary';
  const isAccRestricted = state.activeAccount && (state.activeAccount.restriction || state.activeAccount.status === 'RESTRICTED');

  let isBlocked = false;
  let riskScore = 15;
  let badgeText = 'LOW RISK';
  let reason = '';
  let remedy = '';

  const lang = state.currentLang;

  if (scenario === 'RESTRICTED' || (scenario === 'AUTO' && isAccRestricted)) {
    isBlocked = true;
    riskScore = 88;
    badgeText = lang === 'ta' ? 'அபாய பரிமாற்றம் தடுக்கப்பட்டது' : (lang === 'hi' ? 'उच्च जोखिम अंतरण अवरुद्ध' : 'CRITICAL RISK INTERCEPTED');
    if (lang === 'ta') {
      reason = `வெளிச்செல்லும் பணப் பரிமாற்றம் தடுத்து நிறுத்தப்பட்டது: கணக்கில் செயலில் உள்ள ஒழுங்குமுறை முடக்கம் உள்ளது. வாடிக்கையாளர் நிதியைப் பாதுகாக்க பரிவர்த்தனை இடைநிறுத்தப்பட்டது.`;
      remedy = `பரிந்துரைக்கப்படும் நடவடிக்கை: 'கணக்கு மீட்பு' போர்ட்டலில் டிஜிட்டல் KYC ஆவணங்களை சமர்ப்பித்து அணுகலை மீட்டெடுக்கவும்.`;
    } else if (lang === 'hi') {
      reason = `जावक स्थानांतरण रोक दिया गया: खाते पर सक्रिय नियामक प्रतिबंध है। ग्राहक निधि की सुरक्षा के लिए लेनदेन निलंबित किया गया है।`;
      remedy = `अनुशंसित कार्रवाई: खाता पुनर्प्राप्ति पोर्टल में आवश्यक दस्तावेज अपलोड कर खाता अनफ्रीज करें।`;
    } else {
      reason = `Outbound transfer intercepted: Active regulatory hold detected on this account. Debit transfers are halted to safeguard assets.`;
      remedy = `Recommended action: Complete digital KYC verification in the Account Recovery portal to unfreeze your account.`;
    }
  } else if (scenario === 'VELOCITY') {
    isBlocked = true;
    riskScore = 74;
    badgeText = lang === 'ta' ? 'உயர் இடர் எச்சரிக்கை' : (lang === 'hi' ? 'उच्च जोखिम चेतावनी' : 'HIGH RISK WARNING');
    if (lang === 'ta') {
      reason = `அசாதாரண பரிமாற்ற வேகம் கண்டறியப்பட்டது: கடந்த 1 மணிநேரத்தில் பல தொடர் அதிக மதிப்புப் பணப் பரிமாற்றங்கள் புதிய சாதனத்திலிருந்து முயற்சிக்கப்பட்டன.`;
      remedy = `பாதுகாப்பு நடவடிக்கை: வங்கி பதிவுசெய்த மொபைல் எண் வழியாக இரு-காரணி அங்கீகாரத்தை முடிக்கவும்.`;
    } else if (lang === 'hi') {
      reason = `असामान्य स्थानांतरण गति (Velocity Spike) पहचानी गई: अपरिचित आईपी पते से अल्पावधि में कई उच्च-मूल्य लेनदेन के प्रयास।`;
      remedy = `सुरक्षा उपाय: पंजीकृत मोबाइल नंबर के माध्यम से सुरक्षा सत्यापन पूरा करें।`;
    } else {
      reason = `Unusual transaction velocity pattern: Multiple outbound transfer attempts detected in short succession from an unfamiliar device IP.`;
      remedy = `Security step: Complete multi-factor verification with bank operations before transfer can be cleared.`;
    }
  } else if (scenario === 'NEW_PAYEE') {
    isBlocked = true;
    riskScore = 82;
    badgeText = lang === 'ta' ? 'உயர் இடர் எச்சரிக்கை' : (lang === 'hi' ? 'उच्च जोखिम चेतावनी' : 'HIGH RISK INTERCEPTED');
    if (lang === 'ta') {
      reason = `உயர் இடர் பரிமாற்றம்: சரிபார்க்கப்படாத புதிய சர்வதேச கணக்கிற்கு (${payee}) $${amount.toLocaleString()} அனுப்பும் முயற்சி.`;
      remedy = `மோசடி தடுப்பு: புதிய வெளிநாட்டுப் பெறுநரை சேர்க்க 24 மணிநேர கூலிங்-ஆஃப் காலம் மற்றும் இரு-காரணி ஒப்புதல் தேவை.`;
    } else if (lang === 'hi') {
      reason = `उच्च जोखिम अंतरण: असत्यापित अंतर्राष्ट्रीय प्राप्तकर्ता (${payee}) को $${amount.toLocaleString()} भेजने का प्रयास।`;
      remedy = `धोखाधड़ी रोकथाम: नए अंतर्राष्ट्रीय लाभार्थी के लिए 24 घंटे की कूलिंग अवधि और सुरक्षा समीक्षा आवश्यक है।`;
    } else {
      reason = `High-risk outbound transfer: High-value payment to newly added, unverified international recipient (${payee}).`;
      remedy = `Fraud prevention policy: New international beneficiaries require a mandatory 24-hour cooling window and authorized verification.`;
    }
  } else {
    // NORMAL
    isBlocked = false;
    riskScore = 12;
    badgeText = lang === 'ta' ? 'சரிபார்க்கப்பட்டது / பாதுகாப்பானது' : (lang === 'hi' ? 'सत्यापित / सुरक्षित' : 'NORMAL / VERIFIED');
    if (lang === 'ta') {
      reason = `பாதுகாப்பு சோதனை முடிந்தது: குறைந்த இடர் பரிமாற்றம் ($${amount.toLocaleString()} -> ${payee}). வழக்கமான பயன்பாட்டு முறையுடன் பொருந்துகிறது.`;
      remedy = `சிமுலேஷன் முடிவு: நேரடி வங்கி சூழலில் இந்த பரிமாற்றம் உடனடியாக அங்கீகரிக்கப்படும்.`;
    } else if (lang === 'hi') {
      reason = `सुरक्षा जांच सफल: सामान्य जोखिम स्कोर ($${amount.toLocaleString()} -> ${payee})। ज्ञात लेनदेन पैटर्न से मेल खाता है।`;
      remedy = `सिमुलेशन परिणाम: उत्पादन वातावरण में यह स्थानांतरण तुरंत स्वीकृत कर दिया जाएगा।`;
    } else {
      reason = `Security clearance passed: Low risk score ($${amount.toLocaleString()} to ${payee}). Matches established customer behavioral telemetry.`;
      remedy = `Simulation outcome: In live banking, this transaction is authorized without intervention.`;
    }
  }

  if (el.simRiskBadge) {
    el.simRiskBadge.textContent = badgeText;
    el.simRiskBadge.className = `badge-status ${isBlocked ? 'rejected' : 'restored'}`;
  }
  if (el.simRiskScoreDisplay) {
    const riskLabel = isBlocked ? (riskScore > 80 ? 'CRITICAL RISK' : 'HIGH RISK') : 'LOW RISK';
    el.simRiskScoreDisplay.textContent = `${riskScore} / 100 (${riskLabel})`;
  }
  if (el.simRiskScoreBar) {
    el.simRiskScoreBar.style.width = `${riskScore}%`;
    el.simRiskScoreBar.style.background = isBlocked ? (riskScore > 80 ? '#DC2626' : '#D97706') : '#059669';
  }
  if (el.simRiskReasonText) el.simRiskReasonText.textContent = reason;
  if (el.simRiskRemedyText) el.simRiskRemedyText.textContent = remedy;
  if (el.simResultBox) el.simResultBox.style.display = 'block';
}

// ================= HACKATHON UPGRADE: AI CUSTOMER-CARE CHATBOT =================
const chatState = {
  isOpen: false,
  messages: [],
  isSubmitting: false,
  lastQuery: ''
};

function saveChatHistory() {
  try {
    sessionStorage.setItem('rebank_chat_history', JSON.stringify(chatState.messages.slice(-30)));
  } catch (e) {}
}

function loadChatHistory() {
  try {
    const saved = sessionStorage.getItem('rebank_chat_history');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        chatState.messages = parsed;
        if (el.chatMessages) {
          el.chatMessages.innerHTML = '';
          parsed.forEach(m => renderBubble(m.sender, m.text, m.action, m.isError));
        }
        return true;
      }
    }
  } catch (e) {}
  return false;
}

function toggleChatWindow() {
  const isCurrentlyOpen = el.rebankChatWindow && window.getComputedStyle(el.rebankChatWindow).display !== 'none';
  chatState.isOpen = !isCurrentlyOpen;
  if (el.rebankChatWindow) {
    el.rebankChatWindow.style.display = chatState.isOpen ? 'flex' : 'none';
  }
  if (el.chatUnreadDot && chatState.isOpen) {
    el.chatUnreadDot.style.display = 'none';
  }
  if (chatState.isOpen) {
    if (chatState.messages.length === 0) {
      initChatBotMessages();
    }
    renderChatChips();
    if (el.chatInput) el.chatInput.focus();
  }
}

async function initChatBotMessages() {
  const restored = loadChatHistory();
  if (!restored) {
    const dict = I18N[state.currentLang] || I18N.en;
    let welcome = dict.chatWelcomeStaff || "Hello! I’m your ReBank AI Assistant. Your account is temporarily locked for your safety. Let’s check why and get you back in.";
    
    if (el.chatMessages) {
      el.chatMessages.innerHTML = '';
    }
    chatState.messages = [];
    appendChatMessage('bot', welcome);

    // If customer has an active restriction, proactively inform them
    if (state.activeAccount && state.activeAccount.restriction && state.activeEligibility) {
      let holdNotice = '';
      if (state.currentLang === 'ta') {
        holdNotice = `🛡️ **பாதுகாப்பு உறுதி:** Unga panam 100% bank-la பாதுகாப்பாக safe-ah irukku. KYC verification mudicha udane ella transfers-um restore aagidum. Quick action buttons-a click panni details paarkkalaam!`;
      } else if (state.currentLang === 'hi') {
        holdNotice = `🛡️ **सुरक्षा आश्वासन:** आपकी पूरी जमा राशि बैंक में 100% सुरक्षित है। सत्यापन पूरा होते ही सभी सेवाएं पुनः बहाल हो जाएंगी। सहायता के लिए नीचे दिए गए त्वरित बटन चुनें!`;
      } else {
        holdNotice = `🛡️ **Safety Assurance:** All your funds remain 100% safe and secure in your account. Outbound transfers are paused until your quick verification is complete. Use the quick action buttons below anytime!`;
      }
      appendChatMessage('bot', holdNotice, {
        type: 'NAVIGATE_RECOVERY',
        label: state.currentLang === 'ta' ? '🛡️ கணக்கை மீட்டெடுக்கவும்' : (state.currentLang === 'hi' ? '🛡️ खाता रिकवर करें' : '🛡️ Go to Account Recovery')
      });
    }
  }

  // Load Suggested Questions from backend or fallback
  await loadSuggestedQuestions();
}

async function loadSuggestedQuestions() {
  try {
    const res = await API.get(`/api/chat/suggested-questions?language=${state.currentLang}`);
    if (res && res.data && res.data.questions) {
      renderSuggestedQuestions(res.data.questions);
      return;
    }
  } catch (e) {
    // Fallback handled below
  }

  const defaultQs = state.currentLang === 'ta'
    ? ['என் கணக்கு ஏன் லாக் ஆனது?', 'கணக்கை மீட்டெடுக்க உதவுங்கள்', 'மீட்பு விண்ணப்ப நிலை என்ன?', 'பரிமாற்ற பாதுகாப்பு சோதனை']
    : (state.currentLang === 'hi'
      ? ['मेरा खाता क्यों लॉक हुआ?', 'खाता रिकवर करने में मदद करें', 'रिकवरी आवेदन की स्थिति क्या है?', 'स्थानांतरण सुरक्षा जांच']
      : ['Why is my account locked?', 'Help me recover my account', 'Track my recovery status', 'Check transfer safety']);
  renderSuggestedQuestions(defaultQs);
}

function renderSuggestedQuestions(questions) {
  if (!el.chatSuggestedQuestions) return;
  if (!questions || questions.length === 0) {
    el.chatSuggestedQuestions.style.display = 'none';
    return;
  }
  el.chatSuggestedQuestions.style.display = 'flex';
  el.chatSuggestedQuestions.innerHTML = questions.map(q => `
    <button type="button" class="suggested-q-btn">${q}</button>
  `).join('');

  el.chatSuggestedQuestions.querySelectorAll('.suggested-q-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.textContent.trim();
      window.sendChatChipQuery(q);
    });
  });
}

function showChatTyping(show) {
  if (el.chatTypingIndicator) {
    el.chatTypingIndicator.style.display = show ? 'flex' : 'none';
    if (show && el.chatMessages) {
      el.chatMessages.scrollTop = el.chatMessages.scrollHeight;
    }
  }
}

function appendChatMessage(sender, text, action = null, isError = false) {
  chatState.messages.push({ sender, text, action, isError, timestamp: new Date().toISOString() });
  saveChatHistory();
  renderBubble(sender, text, action, isError);
}

function renderBubble(sender, text, action = null, isError = false) {
  if (!el.chatMessages) return;

  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender}${isError ? ' error-bubble' : ''}`;
  bubble.innerHTML = (text || '').replace(/\n/g, '<br>');

  if (action && action.type && action.label) {
    const actionBtn = document.createElement('button');
    actionBtn.type = 'button';
    actionBtn.className = 'chat-action-btn';
    actionBtn.textContent = action.label;
    actionBtn.onclick = () => executeChatAction(action.type);
    bubble.appendChild(document.createElement('br'));
    bubble.appendChild(actionBtn);
  }

  if (isError) {
    const retryBtn = document.createElement('button');
    retryBtn.type = 'button';
    retryBtn.className = 'chat-retry-btn';
    retryBtn.textContent = '🔄 Retry';
    retryBtn.onclick = () => window.retryLastChatMessage();
    bubble.appendChild(retryBtn);
  }

  el.chatMessages.appendChild(bubble);
  el.chatMessages.scrollTop = el.chatMessages.scrollHeight;
}

function executeChatAction(type) {
  if (type === 'OPEN_LOCK_EXPLANATION') {
    openLockExplanationModal();
  } else if (type === 'NAVIGATE_RECOVERY') {
    if (el.dashRecoverySection) {
      el.dashRecoverySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (el.inlineDocNumber) setTimeout(() => el.inlineDocNumber.focus(), 400);
    }
  } else if (type === 'VIEW_TRACKER') {
    const trackerCard = document.getElementById('recoveryTrackerCard');
    if (trackerCard) {
      trackerCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else if (type === 'NAVIGATE_TRANSFER_SIM') {
    if (el.dashTransferSection) {
      el.dashTransferSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (el.inlineTransferAmount) setTimeout(() => el.inlineTransferAmount.focus(), 400);
    }
  } else if (type === 'NAVIGATE_ACCOUNTS') {
    const accCard = document.getElementById('accountSummaryCard');
    if (accCard) {
      accCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else if (type === 'OPEN_HELP') {
    if (el.helpModal) {
      el.helpModal.style.display = 'flex';
      loadCustomerComplaints();
    }
  }
}

function renderChatChips() {
  if (!el.chatQuickChips) return;
  const dict = I18N[state.currentLang] || I18N.en;
  if (el.chipAccBlocked) el.chipAccBlocked.textContent = dict.chipWhyLocked || "Why is my account locked?";
  if (el.chipRecoverAcc) el.chipRecoverAcc.textContent = dict.chipHelpRecover || "Recover My Account";
  if (el.chipTxRisk) el.chipTxRisk.textContent = dict.chipCheckTransfer || "Transfer Safety";
  if (el.chipContactSupport) el.chipContactSupport.textContent = dict.navHelpCenter || "Help Center";
}

window.sendChatChipQuery = async function(query) {
  if (!query || chatState.isSubmitting) return;
  appendChatMessage('user', query);
  chatState.lastQuery = query;
  await submitChatQuery(query);
};

window.retryLastChatMessage = async function() {
  if (chatState.lastQuery && !chatState.isSubmitting) {
    await submitChatQuery(chatState.lastQuery);
  }
};

async function handleChatSubmit(e) {
  if (e && e.preventDefault) e.preventDefault();
  if (!el.chatInput || chatState.isSubmitting) return;
  const text = el.chatInput.value.trim();
  if (!text) return;
  el.chatInput.value = '';
  chatState.lastQuery = text;
  appendChatMessage('user', text);
  await submitChatQuery(text);
}

async function submitChatQuery(text) {
  chatState.isSubmitting = true;
  if (el.chatSendBtn) el.chatSendBtn.disabled = true;
  showChatTyping(true);

  try {
    const res = await API.post('/api/chat/message', {
      message: text,
      language: state.currentLang,
      accountId: state.activeAccount?.id
    });

    showChatTyping(false);
    if (res && res.data && res.data.success) {
      appendChatMessage('bot', res.data.reply, res.data.action);
      if (res.data.suggestedQuestions) {
        renderSuggestedQuestions(res.data.suggestedQuestions);
      }
    } else {
      processChatQuery(text);
    }
  } catch (err) {
    showChatTyping(false);
    console.warn('[Chat] API error, falling back to local reasoning:', err.message);
    processChatQuery(text);
  } finally {
    chatState.isSubmitting = false;
    if (el.chatSendBtn) el.chatSendBtn.disabled = false;
    if (el.chatInput) el.chatInput.focus();
  }
}

function processChatQuery(rawQuery) {
  const query = rawQuery.toLowerCase();
  const lang = state.currentLang;

  // 1. Strict Security Guardrail: Never collect or discuss passwords/PINs/OTPs
  if (query.includes('pin') || query.includes('password') || query.includes('otp') || query.includes('cvv') || query.includes('கடவுச்சொல்') || query.includes('पासवर्ड')) {
    let warning = '';
    if (lang === 'ta') {
      warning = `🛡️ **பாதுகாப்பு எச்சரிக்கை:** ReBank அல்லது அதன் ஊழியர்கள் ஒருபோதும் உங்கள் கடவுச்சொல், PIN, CVV அல்லது OTP-ஐ கேட்க மாட்டார்கள். இந்த ரகசிய தகவல்களை யாரிடமும் பகிர வேண்டாம்.`;
    } else if (lang === 'hi') {
      warning = `🛡️ **सुरक्षा चेतावनी:** ReBank या उसका कोई भी प्रतिनिधि कभी भी आपका पासवर्ड, पिन, सीवीवी या ओटीपी नहीं मांगेगा। यह गोपनीय जानकारी कभी किसी से साझा न करें।`;
    } else {
      warning = `🛡️ **Security Alert:** ReBank and our automated systems will NEVER request your password, ATM PIN, CVV, or OTP. Never disclose these credentials to anyone.`;
    }
    appendChatMessage('bot', warning);
    return;
  }

  // 2. Action 1: Why is my account locked? (Human-friendly bank staff tone)
  if (query.includes('account locked') || query.includes('account blocked') || query.includes('why is my account locked') || query.includes('why') || (query.includes('lock') && !query.includes('safety')) || query.includes('yen unga account') || query.includes('yen lock') || query.includes('முடக்கம்') || query.includes('ஏன்') || query.includes('अवरुद्ध') || query.includes('क्यों लॉक') || query.includes('खाता क्यों')) {
    let reply = '';
    if (lang === 'ta') {
      reply = `🛡️ **Ungal account ippo temporary-ah lock aagiyirukku. Yen nu check pannalaam; adutha step-la naan help panren.**\n\n📌 **Kaaranam:** Unga KYC documents renew panna vendiyirukku. Adhanaala veliye panam anuppuvadhai tharkaalam-a pause panni vachirukkom.\n✅ **Unga Panam:** 100% bank-la பாதுகாப்பாக safe-ah dhaan irukku. Oru roobai kooda piditham seyyappadavillai.\n\n👉 Keezha உள்ள **'Account Recovery Hub'**-ல் 3 எளிய படிகளை முடித்து உடனடியாக உங்கள் கணக்கை மீட்டெடுக்கலாம்!`;
    } else if (lang === 'hi') {
      reply = `🛡️ **आपका खाता अभी अस्थायी रूप से लॉक है। आइए देखें क्यों, और इसे वापस पाने में मैं आपकी मदद करता हूँ।**\n\n📌 **कारण:** आपके खाते में नियमित नियामक केवाईसी नवीनीकरण लंबित है। सुरक्षा कारणों से बाहर पैसे भेजना अस्थायी रूप से रोका गया है।\n✅ **राशि सुरक्षा:** आपका पूरा 100% पैसा बैंक में सुरक्षित है। कोई कटौती नहीं की गई है।\n\n👉 नीचे दिए गए **'Smart Account Recovery'** फॉर्म में 3 आसान चरणों को पूरा करके खाता पुनः चालू करें!`;
    } else {
      reply = `🛡️ **Your account is temporarily locked. Let's check why and see how to get it back.**\n\n📌 **Reason:** Your regulatory KYC documents have reached statutory renewal deadlines. Outbound debits and wire transfers have been paused so unauthorized withdrawals cannot occur.\n✅ **Funds Safety:** 100% of your money remains completely secure in your CBS savings account.\n\n👉 Follow the simple 4-stage digital verification below in the **Account Recovery Hub** to restore full access!`;
    }
    appendChatMessage('bot', reply);
    return;
  }

  // 3. Action 2: Track my recovery / Ticket Status (Evaluated before generic recovery keywords)
  if (query.includes('track') || query.includes('status') || query.includes('ticket') || query.includes('reb-') || query.includes('progress') || query.includes('innum complete') || query.includes('complete aagala') || query.includes('pending') || query.includes('நிலை') || query.includes('स्थिति') || query.includes('ट्रैक')) {
    let reply = '';
    const ref = (state.myRequests && state.myRequests.length > 0) ? state.myRequests[0].reference_number : 'REB-2026-67550';
    const currentStatus = (state.myRequests && state.myRequests.length > 0) ? state.myRequests[0].status.replace(/_/g, ' ') : 'Under Review (Maker L1)';

    if (query.includes('complete') || query.includes('pending') || query.includes('innum')) {
      if (lang === 'ta') {
        reply = `⏸️ **Ungal transfer innum complete aagala. Status-a check pannalaam.**\n\n📌 Unga account-la active KYC verification pending-la iruppadhal, veli transfer தற்காலிகமாக நிறுத்தப்பட்டுள்ளது.\n• மீட்பு குறிப்பு எண்: **${ref}**\n• தற்போதைய நிலை: **${currentStatus}**\n• நிதி பாதுகாப்பு: **100% பாதுகாப்பாக உள்ளது**\n\n👉 சரிபார்ப்பு முடிந்தவுடன் பணப்பரிமாற்றம் தானாகவே அனுமதிக்கப்படும்.`;
      } else if (lang === 'hi') {
        reply = `⏸️ **आपका ट्रांसफर अभी पूरा नहीं हुआ है। आइए इसकी स्थिति जांचें।**\n\n📌 आपके खाते पर सक्रिय केवाईसी रोक होने के कारण बाहरी वायर ट्रांसफर रोका गया है।\n• संदर्भ संख्या: **${ref}**\n• वर्तमान स्थिति: **${currentStatus}**\n• फंड सुरक्षा: **100% सुरक्षित**\n\n👉 सत्यापन पूरा होते ही सेवाएं पुनः सक्रिय हो जाएंगी।`;
      } else {
        reply = `⏸️ **Your transfer isn't complete yet. Let's check its status.**\n\n📌 Outbound transfers are paused because your account has an active regulatory KYC verification hold.\n• Active Request: **${ref}**\n• Status: **${currentStatus}**\n• Funds Protected: **100% Safe in CBS Account**\n\n👉 Once approved by Compliance, standard transfer limits will be restored.`;
      }
    } else {
      if (lang === 'ta') {
        reply = `📋 **Unga recovery status-a check pannalaam:**\n• குறிப்பு எண் (Reference): **${ref}**\n• தற்போதைய நிலை: **${currentStatus}**\n• மதிப்பிடப்பட்ட நேரம் (SLA): **2 முதல் 4 மணிநேரம்**\n• நிதி நிலை: **100% பாதுகாப்பாக உள்ளது**\n\n👉 டாஷ்போர்டில் உள்ள 4-படி லைவ் டிராக்கரில் உங்கள் விண்ணப்பத்தின் முன்னேற்றத்தை எப்போது வேண்டுமானாலும் பார்க்கலாம்.`;
      } else if (lang === 'hi') {
        reply = `📋 **आइए आपकी रिकवरी स्थिति देखें:**\n• संदर्भ संख्या (Reference): **${ref}**\n• वर्तमान स्थिति: **${currentStatus}**\n• अनुमानित समय (SLA): **2 से 4 घंटे**\n• फंड सुरक्षा: **100% सुरक्षित**\n\n👉 डैशबोर्ड पर 4-चरणीय लाइव ट्रैकर में अपने आवेदन की प्रगति किसी भी समय देख सकते हैं।`;
      } else {
        reply = `📋 **Let’s check your active recovery request:**\n• Reference Number: **${ref}**\n• Current Status: **${currentStatus}**\n• Turnaround SLA: **2 to 4 Hours**\n• Funds Status: **100% Protected & Insured**\n\n👉 You can check real-time progress on the 4-milestone visual tracker in the Account Recovery Hub below.`;
      }
    }
    appendChatMessage('bot', reply);
    return;
  }

  // 4. Action 3: Help me recover my account
  if (query.includes('help me recover') || query.includes('recover my account') || query.includes('recover account') || query.includes('help panren') || query.includes('recover') || query.includes('restor') || query.includes('மீட்பு') || query.includes('மீட்டெடு') || query.includes('रिकवर') || query.includes('मदद करें')) {
    let reply = '';
    if (lang === 'ta') {
      reply = `🤝 **Kavalaiye padaadheenga, unga account-a seekkirama recover panna naan step-by-step-ah help panren!**\n\n1️⃣ **படி 1:** Keezha irukra Smart Account Recovery form-ukku ponga.\n2️⃣ **படி 2:** Unga ID number matrum address proof-a confirm pannunga.\n3️⃣ **படி 3:** **"5-Second Selfie"** eduthu submit pannunga.\n\n⏱️ Namma bank compliance team 2-4 hours-la verify panni unlock panniduvaanga!`;
    } else if (lang === 'hi') {
      reply = `🤝 **चिंता न करें, मैं तुरंत आपका खाता चालू कराने में पूरी मदद करूँगा!**\n\n1️⃣ **चरण 1:** नीचे दिए गए Smart Account Recovery फॉर्म पर जाएं।\n2️⃣ **चरण 2:** अपनी सरकारी पहचान पत्र संख्या और निवास प्रमाण भरें।\n3️⃣ **चरण 3:** **5-सेकंड की डिजिटल सेल्फी** लें और सबमिट करें।\n\n⏱️ हमारी बैंक अनुपालन टीम 2 से 4 घंटे के भीतर सत्यापन पूरा करके सेवाएं बहाल कर देगी!`;
    } else {
      reply = `🤝 **I’m here to help you get your account back right away! Here is the simple 3-step walkthrough:**\n\n1️⃣ **Step 1:** Head down to the **Smart Account Recovery Application** form below.\n2️⃣ **Step 2:** Confirm your Government Photo ID number and 90-day address document.\n3️⃣ **Step 3:** Click **"Capture 5-Second Digital Liveness Selfie"** and submit.\n\n⏱️ Our compliance team (Maker L1 & Checker L2) will review and approve your submission within 2–4 hours!`;
    }
    appendChatMessage('bot', reply);
    return;
  }

  // 5. Action 4: Check transfer safety / Transfer Warning
  if (query.includes('transfer safety') || query.includes('check transfer') || query.includes('transfer') || query.includes('risk') || query.includes('safety') || query.includes('unusual') || query.includes('இடர்') || query.includes('பரிவர்த்தனை') || query.includes('பாதுகாப்பு') || query.includes('जोखिम') || query.includes('स्थानांतरण')) {
    let reply = '';
    if (lang === 'ta') {
      reply = `⚠️ **Indha transfer konjam unusual-ah irukku. Anuppuradhukku munnaadi details-a check pannunga.**\n\n🛡️ **வங்கி ஆலோசனை:** Unga account-la temporary KYC hold iruppadhal, unga mudhukkup-pin nalladhukkaaga veli transfer pause pannappattulladhu. Verify pannama amount send panna vendaam. Account recover aana udane transfer normal aagidum.\n\n👉 நேரில் இடர் சோதனையை சோதிக்க டாஷ்போர்டில் உள்ள **'Transfer Simulator'**-ஐ பயன்படுத்தலாம்!`;
    } else if (lang === 'hi') {
      reply = `⚠️ **यह ट्रांसफर थोड़ा असामान्य लग रहा है। कृपया आगे बढ़ने से पहले विवरण दोबारा जाँच लें।**\n\n🛡️ **बैंक सुरक्षा सलाह:** बिना पुष्टि के कोई राशि न भेजें। खाते पर सक्रिय रोक होने के कारण सुरक्षा हेतु बाहरी अंतरण रुका हुआ है। रिकवरी पूरी होते ही सभी सेवाएं चालू हो जाएंगी।\n\n👉 लाइव परीक्षण के लिए नीचे दिए गए **'Transfer Simulator'** का उपयोग करें!`;
    } else {
      reply = `⚠️ **This transfer looks unusual. Please check the details before continuing.**\n\n🛡️ **Bank Safety Advice:** Outbound transfers are paused until your account verification is complete. We advise you not to proceed until your account and recipient details are verified.\n\n👉 You can simulate transfer checks anytime using the **Transfer Simulator** form below!`;
    }
    appendChatMessage('bot', reply);
    return;
  }

  // 6. Contact Support / Grievances
  if (query.includes('support') || query.includes('contact') || query.includes('grievance') || query.includes('complaint') || query.includes('உதவி') || query.includes('தொடர்பு') || query.includes('सहायता') || query.includes('शिकायत')) {
    let reply = '';
    if (lang === 'ta') {
      reply = `🤝 **வாடிக்கையாளர் உதவி மையம் & குறைதீர்க்கும் பிரிவு:**\nஉங்களுக்கு உதவ எங்கள் பாதுகாப்புக் குழு தயாராக உள்ளது:\n• 📧 **அதிகாரப்பூர்வ மின்னஞ்சல்:** compliance@rebank.internal\n• 📞 **கட்டணமில்லா உதவி எண்:** 1800-REBANK-CARE (1800-732-265)\n• ⏱️ **தீர்வு நேரம் (SLA):** 24 முதல் 48 வணிக மணிநேரம்\n\n💡 **குறிப்பு:** விண்ணப்ப நிலையை அறிய **'Track my recovery'** என்று கேட்கலாம்!`;
    } else if (lang === 'hi') {
      reply = `🤝 **ग्राहक सहायता एवं शिकायत निवारण:**\nआपकी सहायता हेतु हमारी टीम तत्पर है:\n• 📧 **आधिकारिक ईमेल:** compliance@rebank.internal\n• 📞 **हेल्पलाइन:** 1800-REBANK-CARE (1800-732-265)\n• ⏱️ **समाधान समय (SLA):** 24 से 48 कार्य घंटे\n\n💡 **सुझाव:** सक्रिय आवेदन की स्थिति देखने के लिए **'Track my recovery'** पूछें!`;
    } else {
      reply = `🤝 **Customer Care & Grievance Redressal:**\nOur dedicated bank resolution officers are ready to assist you:\n• 📧 **Compliance Desk:** compliance@rebank.internal\n• 📞 **Toll-Free Helpline:** 1800-REBANK-CARE (1800-732-265)\n• ⏱️ **Resolution Turnaround (SLA):** 24 to 48 business hours\n\n💡 **Tip:** If you have an active application, click **'Track my recovery'** or ask for ticket status to see your real-time reference number!`;
    }
    appendChatMessage('bot', reply);
    return;
  }

  // 7. Clear honest response when query cannot be answered (Rule-Based Demo Assistant)
  let fallback = '';
  if (lang === 'ta') {
    fallback = `🤝 **ReBank மாதிரி உதவியாளர் (Rule-Based Demo Mode):**\nஉங்களுக்கு உதவ மகிழ்ச்சி! நான் ReBank-ன் மாதிரி உதவியாளர். நீங்கள் கேட்க விரும்பும் தலைப்பை தேர்ந்தெடுக்கலாம்:\n• **Account Locked**: கணக்கு ஏன் லாக் ஆனது என்று அறிய\n• **Recover My Account**: கணக்கை மீட்டெடுக்க 3-படி வழிகாட்டி\n• **Transfer Safety**: பணப் பரிமாற்ற பாதுகாப்பு ஆய்வு\n• **Contact Support**: வாடிக்கையாளர் உதவி மையம் & நேரலை டிராக்கர்\n\nஅதிகாரப்பூர்வ உதவிக்கு 1800-REBANK-CARE-ஐ அழைக்கவும்.`;
  } else if (lang === 'hi') {
    fallback = `🤝 **ReBank डेमो सहायक (Rule-Based Demo Mode):**\nआपकी सहायता करने में मुझे खुशी होगी! मैं ReBank का स्वचालित डेमो सहायक हूँ। आप निम्नलिखित सहायता चुन सकते हैं:\n• **Account Locked**: खाता क्यों लॉक हुआ\n• **Recover My Account**: खाता रिकवर करने की 3-चरणीय प्रक्रिया\n• **Transfer Safety**: स्थानांतरण सुरक्षा जांच\n• **Contact Support**: ग्राहक सहायता और लाइव ट्रैकर\n\nविस्तृत जानकारी हेतु 1800-REBANK-CARE पर संपर्क करें।`;
  } else {
    fallback = `🤝 **ReBank Assistant (Rule-Based Demo Mode):**\nI'm happy to help! I am ReBank's automated rule-based demo assistant. You can choose any of the quick actions below:\n• **Account Locked**: Check why your account is temporarily held\n• **Recover My Account**: Step-by-step digital restoration guide\n• **Transfer Safety**: Review outbound transfer safety checks\n• **Contact Support**: Reach compliance desk or track your active request\n\nFor official bank inquiries, our desk is at 1800-REBANK-CARE.`;
  }
  appendChatMessage('bot', fallback);
}

function updateChatBotLanguage() {
  renderChatChips();
  if (chatState.messages.length <= 2) {
    initChatBotMessages();
  } else {
    const dict = I18N[state.currentLang] || I18N.en;
    appendChatMessage('bot', dict.chatWelcomeStaff || "Hello! How can I assist you with your account recovery?");
  }
}

// Multi-Tier Transfer Risk Simulation Engine Helper
function renderTransferSimulationResult(tier) {
  if (!el.inlineTransferResult) return;
  const isTa = state.currentLang === 'ta';
  const isHi = state.currentLang === 'hi';

  if (tier === 'HIGH') {
    if (el.inlineRiskScoreText) {
      el.inlineRiskScoreText.textContent = isTa ? '88 / 100 — கவனிப்பு தேவை / இடைமறிக்கப்பட்டது' : (isHi ? '88 / 100 — असामान्य / सुरक्षा हेतु रोका गया' : '88 / 100 — SUSPICIOUS / PAUSED FOR SAFETY');
      el.inlineRiskScoreText.className = 'risk-result-pill risk-high';
      el.inlineRiskScoreText.style.background = '#FEE2E2';
      el.inlineRiskScoreText.style.color = '#DC2626';
      el.inlineRiskScoreText.style.borderColor = '#FECACA';
    }
    if (el.inlineRiskScoreBar) {
      el.inlineRiskScoreBar.style.width = '88%';
      el.inlineRiskScoreBar.style.background = '#EF4444';
    }
    if (el.inlineRiskReasonText) {
      el.inlineRiskReasonText.textContent = isTa
        ? 'Indha transfer konjam unusual-ah irukku. Anuppuradhukku munnaadi details-a check pannunga. (Kaaranam: Unga account-la active KYC hold irukku / periya thogai aagavum iruppadhal, unga panathukku aabathu vara koodadhu-nu transfer pause aagirukku).'
        : (isHi
          ? 'यह ट्रांसफर थोड़ा असामान्य लग रहा है। कृपया आगे बढ़ने से पहले विवरण दोबारा जाँच लें। (कारण: आपके खाते पर नियामक केवाईसी सत्यापन लंबित है या उच्च राशि सीमा के कारण जमा राशि की सुरक्षा हेतु बाहरी अंतरण रोका गया है)।'
          : 'This transfer looks unusual. Please check the details before continuing. (Why flagged: Outbound transfers are paused because your account has an active regulatory KYC verification hold or high-velocity threshold to safeguard your deposits).');
    }
    if (el.inlineRiskRemedyText) {
      el.inlineRiskRemedyText.textContent = isTa
        ? 'பாதுகாப்பு ஆலோசனை: விபரங்களை உறுதி செய்யாமல் பணத்தை அனுப்ப வேண்டாம். கணக்கு மீட்புப் பிரிவில் சரிபார்ப்பை முடித்து பணப் பரிமாற்றத்தை மீண்டும் தொடங்கவும்.'
        : (isHi
          ? 'सुरक्षा सलाह: प्राप्तकर्ता की पूरी तरह पुष्टि किए बिना पैसे न भेजें। सामान्य सेवाएं बहाल करने के लिए ऊपर दिया गया रिकवरी फॉर्म भरें।'
          : 'Safety advice: Please do not proceed with unverified transfers. Complete your quick KYC verification above to restore full wire privileges.');
    }
  } else if (tier === 'REVIEW') {
    if (el.inlineRiskScoreText) {
      el.inlineRiskScoreText.textContent = isTa ? '45 / 100 — மறுஆய்வு தேவை (REVIEW)' : (isHi ? '45 / 100 — समीक्षा अनुशंसित (REVIEW)' : '45 / 100 — REVIEW RECOMMENDED');
      el.inlineRiskScoreText.className = 'risk-result-pill risk-review';
      el.inlineRiskScoreText.style.background = '#FFFBEB';
      el.inlineRiskScoreText.style.color = '#D97706';
      el.inlineRiskScoreText.style.borderColor = '#FDE68A';
    }
    if (el.inlineRiskScoreBar) {
      el.inlineRiskScoreBar.style.width = '45%';
      el.inlineRiskScoreBar.style.background = '#F59E0B';
    }
    if (el.inlineRiskReasonText) {
      el.inlineRiskReasonText.textContent = isTa
        ? 'Indha transfer-la konjam kavanama irunga. Pudhiya recipient enbadhaal, transfer seivadharku mun details-a verify pannunga.'
        : (isHi
          ? 'इस ट्रांसफर में अतिरिक्त सतर्कता बरतें। नया लाभार्थी होने के कारण कृपया विवरणों की दोबारा समीक्षा करें।'
          : 'Elevated transaction velocity or new beneficiary detected. Please review recipient details before authorizing final settlement.');
    }
    if (el.inlineRiskRemedyText) {
      el.inlineRiskRemedyText.textContent = isTa
        ? 'இரு-காரணி சரிபார்ப்பு (2FA) பரிந்துரைக்கப்படுகிறது. பெறுநர் விவரங்களை ஒருமுறைக்கு இருமுறை சரிபார்க்கவும்.'
        : (isHi
          ? 'दो-चरणीय प्रमाणीकरण (2FA) अनुशंसित है। आगे बढ़ने से पहले विवरण की पुष्टि करें।'
          : 'Step-up verification recommended: Dual-factor confirmation will be required upon final submission.');
    }
  } else {
    if (el.inlineRiskScoreText) {
      el.inlineRiskScoreText.textContent = isTa ? '12 / 100 — குறைந்த இடர் / அனுமதிக்கப்பட்டது' : (isHi ? '12 / 100 — कम जोखिम / स्वीकृत' : '12 / 100 — LOW RISK APPROVED');
      el.inlineRiskScoreText.className = 'risk-result-pill risk-low';
      el.inlineRiskScoreText.style.background = '#ECFDF5';
      el.inlineRiskScoreText.style.color = '#059669';
      el.inlineRiskScoreText.style.borderColor = '#A7F3D0';
    }
    if (el.inlineRiskScoreBar) {
      el.inlineRiskScoreBar.style.width = '12%';
      el.inlineRiskScoreBar.style.background = '#10B981';
    }
    if (el.inlineRiskReasonText) {
      el.inlineRiskReasonText.textContent = isTa
        ? 'பரிவர்த்தனை வெற்றிகரமாக சரிபார்க்கப்பட்டது: கணக்கில் கட்டுப்பாடுகள் எதுவும் இல்லை. கோர் பேங்கிங் ஒப்புதல் வழங்கப்பட்டுள்ளது.'
        : (isHi
          ? 'लेनदेन सफलतापूर्वक सत्यापित: खाते पर कोई प्रतिबंध नहीं है। कोर बैंकिंग द्वारा स्वीकृत।'
          : 'Transaction cleared without restrictions: Standard velocity and verified beneficiary. Approved by Core Banking sandbox.');
    }
    if (el.inlineRiskRemedyText) {
      el.inlineRiskRemedyText.textContent = isTa
        ? 'அடுத்த கட்ட நடவடிக்கை: பரிவர்த்தனை உடனடியாக நிறைவேற்ற தயாராக உள்ளது.'
        : (isHi
          ? 'अगला कदम: स्थानांतरण तुरंत निष्पादित होने के लिए तैयार है।'
          : 'Next step: Transfer executed successfully in Core Banking sandbox ledger.');
    }
  }
}

// ================= EVENT LISTENERS =================
function setupEventListeners() {
  // Mobile Frame Viewport Toggle
  el.mobileToggleBtn.addEventListener('click', () => {
    state.isMobileMode = !state.isMobileMode;
    el.viewport.classList.toggle('mobile-mode', state.isMobileMode);
    el.mobileToggleBtn.classList.toggle('active', state.isMobileMode);
    const labelKey = state.isMobileMode ? 'desktopView' : 'mobileView';
    el.mobileToggleBtn.querySelector('.btn-text').textContent = I18N[state.currentLang][labelKey];
  });

  // Language buttons
  el.langBtns.forEach(btn => {
    btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
  });

  // Role Switcher Pills
  el.rolePills.forEach(pill => {
    pill.addEventListener('click', () => {
      const email = pill.dataset.email;
      let pwd = 'Customer@123';
      if (email.includes('reviewer')) pwd = 'Reviewer@123';
      if (email.includes('approver')) pwd = 'Approver@123';
      if (email.includes('admin')) pwd = 'Admin@123';
      if (email.includes('analyst') || email.includes('fraud')) pwd = 'Analyst@123';
      loginWithCredentials(email, pwd, true);
    });
  });

  // Notifications Bell
  el.notifBellBtn.addEventListener('click', () => {
    const isVisible = el.notifDropdown.style.display === 'block';
    el.notifDropdown.style.display = isVisible ? 'none' : 'block';
  });

  document.addEventListener('click', (e) => {
    if (!el.notifBellBtn.contains(e.target) && !el.notifDropdown.contains(e.target)) {
      el.notifDropdown.style.display = 'none';
    }
  });

  el.markAllReadBtn.addEventListener('click', async () => {
    await API.post('/api/notifications/read-all');
    loadNotifications();
  });

  // Logout
  el.logoutBtn.addEventListener('click', logout);

  // Auth Tabs
  if (el.tabLogin) {
    el.tabLogin.addEventListener('click', () => {
      el.tabLogin.classList.add('active');
      if (el.tabRegister) el.tabRegister.classList.remove('active');
      if (el.loginForm) el.loginForm.style.display = 'block';
      if (el.registerForm) el.registerForm.style.display = 'none';
      const lang = I18N[state.currentLang] || I18N.en;
      if (el.authTitle) el.authTitle.textContent = lang.signInTitle || 'Sign In to ReBank';
      if (el.authSubtitle) el.authSubtitle.textContent = lang.signInSubtitle || 'Secure multi-role banking access';
    });
  }

  if (el.tabRegister) {
    el.tabRegister.addEventListener('click', () => {
      el.tabRegister.classList.add('active');
      if (el.tabLogin) el.tabLogin.classList.remove('active');
      if (el.registerForm) el.registerForm.style.display = 'block';
      if (el.loginForm) el.loginForm.style.display = 'none';
      const lang = I18N[state.currentLang] || I18N.en;
      if (el.authTitle) el.authTitle.textContent = lang.registerTab || 'Register Account';
      if (el.authSubtitle) el.authSubtitle.textContent = lang.registerSubtitle || 'Create your human-friendly smart banking account';
    });
  }

  // Login Form Submission
  el.loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginWithCredentials(el.loginEmail.value, el.loginPassword.value, false);
  });

  // Password Visibility Toggle
  if (el.toggleLoginPasswordBtn && el.loginPassword) {
    el.toggleLoginPasswordBtn.addEventListener('click', () => {
      const isPwd = el.loginPassword.getAttribute('type') === 'password';
      el.loginPassword.setAttribute('type', isPwd ? 'text' : 'password');
      el.toggleLoginPasswordBtn.textContent = isPwd ? '🙈' : '👁️';
    });
  }

  // Masked Account Number Preview on Login Input
  if (el.loginEmail && el.loginAccountMaskPreview && el.loginMaskedAccountText) {
    el.loginEmail.addEventListener('input', () => {
      const val = el.loginEmail.value.trim();
      const cleanDigits = val.replace(/[^0-9]/g, '');
      if (cleanDigits.length >= 4 && /^[0-9\s\-]+$/.test(val)) {
        el.loginAccountMaskPreview.style.display = 'inline-flex';
        el.loginMaskedAccountText.textContent = `Masked: •••• •••• •••• ${cleanDigits.slice(-4)}`;
      } else {
        el.loginAccountMaskPreview.style.display = 'none';
      }
    });
  }

  // Demo One-Click Sign In Quick Buttons
  if (el.demoLoginElenaBtn) {
    el.demoLoginElenaBtn.addEventListener('click', () => {
      if (el.loginEmail) el.loginEmail.value = 'elena.rostova@example.com';
      if (el.loginPassword) el.loginPassword.value = 'Customer@123';
      loginWithCredentials('elena.rostova@example.com', 'Customer@123', true);
    });
  }
  if (el.demoLoginJohnBtn) {
    el.demoLoginJohnBtn.addEventListener('click', () => {
      if (el.loginEmail) el.loginEmail.value = 'john.doe@example.com';
      if (el.loginPassword) el.loginPassword.value = 'Customer@123';
      loginWithCredentials('john.doe@example.com', 'Customer@123', true);
    });
  }
  if (el.demoLoginMarcusBtn) {
    el.demoLoginMarcusBtn.addEventListener('click', () => {
      if (el.loginEmail) el.loginEmail.value = 'marcus.vance@example.com';
      if (el.loginPassword) el.loginPassword.value = 'Customer@123';
      loginWithCredentials('marcus.vance@example.com', 'Customer@123', true);
    });
  }
  if (el.demoLoginMakerBtn) {
    el.demoLoginMakerBtn.addEventListener('click', () => {
      if (el.loginEmail) el.loginEmail.value = 'reviewer@rebank.internal';
      if (el.loginPassword) el.loginPassword.value = 'Reviewer@123';
      loginWithCredentials('reviewer@rebank.internal', 'Reviewer@123', true);
    });
  }
  if (el.demoLoginCheckerBtn) {
    el.demoLoginCheckerBtn.addEventListener('click', () => {
      if (el.loginEmail) el.loginEmail.value = 'approver@rebank.internal';
      if (el.loginPassword) el.loginPassword.value = 'Approver@123';
      loginWithCredentials('approver@rebank.internal', 'Approver@123', true);
    });
  }

  // Instant inline error clearing on input
  if (el.loginForm) {
    el.loginForm.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => {
        if (el.loginErrorMsg) el.loginErrorMsg.style.display = 'none';
      });
    });
  }

  if (el.registerForm) {
    el.registerForm.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => {
        if (el.regErrorMsg) el.regErrorMsg.style.display = 'none';
      });
    });
  }

  // Registration Form Submission with Name, Phone, Email, Password validation
  el.registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (el.regErrorMsg) el.regErrorMsg.style.display = 'none';

    const fullName = el.regFullName.value.trim();
    const phone = el.regPhone.value.trim();
    const email = el.regEmail.value.trim();
    const password = el.regPassword.value;

    const lang = I18N[state.currentLang] || I18N.en;

    // 1. Validate Name
    if (!fullName || fullName.length < 2) {
      const msg = lang.invalidNameError || 'Please enter your full legal name (minimum 2 characters).';
      if (el.regErrorMsg) { el.regErrorMsg.textContent = msg; el.regErrorMsg.style.display = 'block'; }
      showToast(msg, 'error');
      el.regFullName.focus();
      return;
    }

    // 2. Validate Phone Number (minimum 10 digits)
    const phoneDigits = phone.replace(/[^0-9]/g, '');
    const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;
    if (!phone || phoneDigits.length < 10 || !phoneRegex.test(phone)) {
      const msg = lang.invalidPhoneError || 'Please enter a valid phone number (minimum 10 digits).';
      if (el.regErrorMsg) { el.regErrorMsg.textContent = msg; el.regErrorMsg.style.display = 'block'; }
      showToast(msg, 'error');
      el.regPhone.focus();
      return;
    }

    // 3. Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      const msg = lang.invalidEmailError || 'Please enter a valid email address.';
      if (el.regErrorMsg) { el.regErrorMsg.textContent = msg; el.regErrorMsg.style.display = 'block'; }
      showToast(msg, 'error');
      el.regEmail.focus();
      return;
    }

    // 4. Validate Password
    if (!password || password.length < 8) {
      const msg = lang.shortPasswordError || 'Password must be at least 8 characters long.';
      if (el.regErrorMsg) { el.regErrorMsg.textContent = msg; el.regErrorMsg.style.display = 'block'; }
      showToast(msg, 'error');
      el.regPassword.focus();
      return;
    }

    // Prevent duplicate submissions and show progress spinner
    const submitBtn = el.regSubmitBtn;
    const spinner = submitBtn ? submitBtn.querySelector('.btn-spinner') : null;
    if (spinner) spinner.style.display = 'inline-block';
    if (submitBtn) submitBtn.disabled = true;

    try {
      const res = await API.post('/api/auth/register', {
        fullName,
        phone,
        email,
        password
      });

      if (spinner) spinner.style.display = 'none';
      if (submitBtn) submitBtn.disabled = false;

      // Show success message only after the server confirms successful registration
      const successMsg = lang.registerSuccess || 'Registration successful! Customer account initialized.';
      showToast(successMsg, 'success');

      if (el.registerForm) el.registerForm.reset();

      state.token = res.data.token;
      localStorage.setItem('rebank_token', state.token);
      state.user = res.data.user;
      state.customerProfile = res.data.customerProfile;
      updateHeaderUser();
      routeRoleView();
    } catch (err) {
      if (spinner) spinner.style.display = 'none';
      if (submitBtn) submitBtn.disabled = false;

      const errorMsg = err.message || 'Registration failed. Please try again.';
      if (el.regErrorMsg) {
        el.regErrorMsg.textContent = errorMsg;
        el.regErrorMsg.style.display = 'block';
      }
      showToast(errorMsg, 'error');
    }
  });

  // ================= REGISTER BANK ACCOUNT CONTROLLERS =================
  function setupRegisterBankView() {
    // Pre-fill holder name, email, phone if available from current customer profile
    if (el.bankHolderName && !el.bankHolderName.value) {
      el.bankHolderName.value = state.user?.fullName || state.user?.full_name || '';
    }
    if (el.bankEmail && !el.bankEmail.value) {
      el.bankEmail.value = state.user?.email || '';
    }
    if (el.bankPhoneNumber && !el.bankPhoneNumber.value) {
      el.bankPhoneNumber.value = state.user?.phone || '';
    }
    if (el.bankCountry && !el.bankCountry.value) {
      el.bankCountry.value = 'India';
    }
    if (el.bankAccountType && !el.bankAccountType.value) {
      el.bankAccountType.value = 'SAVINGS';
    }
    if (el.bankTermsConsent) {
      el.bankTermsConsent.checked = true;
    }
    if (el.bankRegisterError) {
      el.bankRegisterError.style.display = 'none';
    }

    const isIndia = /^(india|in)$/i.test(el.bankCountry ? el.bankCountry.value.trim() : 'India');
    if (el.ifscRequiredStar) el.ifscRequiredStar.style.display = isIndia ? 'inline' : 'none';
    if (el.ifscHelpText) {
      el.ifscHelpText.textContent = isIndia
        ? 'Mandatory for India: 4 letters bank code, 0, 6 alphanumeric branch code.'
        : 'Optional branch/routing code for international clearing.';
    }
  }

  if (el.openRegisterBankBtn2) {
    el.openRegisterBankBtn2.addEventListener('click', () => {
      setupRegisterBankView();
      switchSubView('viewRegisterBank');
    });
  }

  if (el.registerAccountBtn) {
    el.registerAccountBtn.addEventListener('click', () => {
      if (!state.token) {
        showView('auth');
        if (el.tabRegister) el.tabRegister.click();
      } else {
        setupRegisterBankView();
        switchSubView('viewRegisterBank');
      }
    });
  }

  if (el.modalProceedRegisterBankBtn) {
    el.modalProceedRegisterBankBtn.addEventListener('click', () => {
      if (el.registerBankModal) el.registerBankModal.style.display = 'none';
      setupRegisterBankView();
      switchSubView('viewRegisterBank');
    });
  }

  if (el.backToAccountsBtn) {
    el.backToAccountsBtn.addEventListener('click', () => {
      switchSubView('viewAccounts');
    });
  }

  if (el.closeRegisterBankBtn) {
    el.closeRegisterBankBtn.addEventListener('click', () => {
      if (el.registerBankModal) el.registerBankModal.style.display = 'none';
    });
  }

  if (el.cancelRegisterBankBtn) {
    el.cancelRegisterBankBtn.addEventListener('click', () => {
      if (el.registerBankModal) el.registerBankModal.style.display = 'none';
      switchSubView('viewAccounts');
    });
  }

  // Country Change: Toggle IFSC Requirement
  if (el.bankCountry) {
    el.bankCountry.addEventListener('change', () => {
      const isIndia = /^(india|in)$/i.test(el.bankCountry.value.trim());
      if (el.ifscRequiredStar) el.ifscRequiredStar.style.display = isIndia ? 'inline' : 'none';
      if (el.ifscHelpText) {
        el.ifscHelpText.textContent = isIndia
          ? 'Mandatory for India: 4 letters bank code, 0, 6 alphanumeric branch code.'
          : 'Optional branch/routing code for international clearing.';
      }
    });
  }

  // Register Bank Account Form Submission & Instant Field Clearing
  if (el.registerBankForm) {
    el.registerBankForm.querySelectorAll('input, select, textarea').forEach(input => {
      const clearError = () => {
        const group = input.closest('.form-group');
        if (group && group.classList.contains('has-error')) {
          group.classList.remove('has-error');
          const errSpan = group.querySelector('.field-error-text');
          if (errSpan) { errSpan.style.display = 'none'; errSpan.textContent = ''; }
        }
        if (el.bankRegisterError) el.bankRegisterError.style.display = 'none';
      };
      input.addEventListener('input', clearError);
      input.addEventListener('change', clearError);
    });

    el.registerBankForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (el.bankRegisterError) el.bankRegisterError.style.display = 'none';

      // Clear previous field-level error messages and indicators
      const errorSpans = el.registerBankForm.querySelectorAll('.field-error-text');
      errorSpans.forEach(s => { s.style.display = 'none'; s.textContent = ''; });
      const errorGroups = el.registerBankForm.querySelectorAll('.form-group.has-error');
      errorGroups.forEach(g => g.classList.remove('has-error'));

      const lang = I18N[state.currentLang] || I18N.en;

      // Extract all form values
      const accountHolderName = el.bankHolderName ? el.bankHolderName.value.trim() : '';
      const email = el.bankEmail ? el.bankEmail.value.trim() : '';
      const phoneNumber = el.bankPhoneNumber ? el.bankPhoneNumber.value.trim() : '';
      const dateOfBirth = el.bankDob ? el.bankDob.value.trim() : '';
      const residentialAddress = el.bankAddress ? el.bankAddress.value.trim() : '';
      const country = el.bankCountry ? el.bankCountry.value.trim() : '';
      const stateVal = el.bankState ? el.bankState.value.trim() : '';
      const city = el.bankCity ? el.bankCity.value.trim() : '';
      const postalCode = el.bankPostalCode ? el.bankPostalCode.value.trim() : '';
      const bankName = el.bankName ? el.bankName.value.trim() : '';
      const accountType = el.bankAccountType ? el.bankAccountType.value.trim() : 'SAVINGS';
      const bankAccountNumber = el.bankAccountNumber ? el.bankAccountNumber.value.trim() : '';
      const confirmAccountNumber = el.bankConfirmAccountNumber ? el.bankConfirmAccountNumber.value.trim() : '';
      const ifscCode = el.bankIfscCode ? el.bankIfscCode.value.trim().toUpperCase() : '';
      const branchName = el.bankBranchName ? el.bankBranchName.value.trim() : '';
      const branchCode = el.bankBranchCode ? el.bankBranchCode.value.trim() : '';
      const termsAccepted = el.bankTermsConsent ? el.bankTermsConsent.checked : true;

      let hasError = false;
      function setFieldError(fieldId, spanId, msg) {
        const span = document.getElementById(spanId);
        const field = document.getElementById(fieldId);
        if (span) { span.textContent = msg; span.style.display = 'block'; }
        if (field) {
          field.closest('.form-group')?.classList.add('has-error');
          if (!hasError) field.focus();
        }
        hasError = true;
      }

      // 1. Account Holder Name Validation
      if (!accountHolderName || accountHolderName.length < 2) {
        setFieldError('bankHolderName', 'errBankHolderName', lang.invalidNameError || 'Please enter full legal name (minimum 2 characters).');
      }

      // 2. Email Validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        setFieldError('bankEmail', 'errBankEmail', lang.invalidEmailError || 'Please enter a valid email address.');
      }

      // 3. Phone Number Validation
      const phoneDigits = phoneNumber.replace(/[^0-9]/g, '');
      const phoneRegex = /^\+?[0-9\s\-()]{10,20}$/;
      if (!phoneNumber || phoneDigits.length < 10 || !phoneRegex.test(phoneNumber)) {
        setFieldError('bankPhoneNumber', 'errBankPhoneNumber', lang.invalidPhoneError || 'Please enter a valid phone number (minimum 10 digits).');
      }

      // 4. Country
      if (!country) {
        setFieldError('bankCountry', 'bankRegisterError', 'Country is required.');
      }

      // 5. State
      if (!stateVal || stateVal.length < 2) {
        setFieldError('bankState', 'errBankState', 'State / Province is required.');
      }

      // 6. City
      if (!city || city.length < 2) {
        setFieldError('bankCity', 'errBankCity', 'City / District is required.');
      }

      // 7. PIN / Postal Code
      if (!postalCode || postalCode.length < 3) {
        setFieldError('bankPostalCode', 'errBankPostalCode', 'PIN / Postal Code is required.');
      }

      // 8. Bank Name
      if (!bankName || bankName.length < 2) {
        setFieldError('bankName', 'errBankName', 'Please select or enter the Bank Name.');
      }

      // 9. Bank Account Number
      if (!bankAccountNumber || bankAccountNumber.length < 6) {
        setFieldError('bankAccountNumber', 'errBankAccountNumber', 'Bank account number must be at least 6 digits.');
      }

      // 10. Confirm Account Number Matching
      if (!confirmAccountNumber || bankAccountNumber !== confirmAccountNumber) {
        setFieldError('bankConfirmAccountNumber', 'errBankConfirmAccountNumber', lang.accountMismatchError || 'Bank account number and confirm account number do not match.');
      }

      // 11. IFSC Code (Mandatory for India)
      const isIndia = /^(india|in)$/i.test(country);
      if (isIndia) {
        const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
        if (!ifscCode || !ifscRegex.test(ifscCode)) {
          setFieldError('bankIfscCode', 'errBankIfscCode', lang.invalidIfscError || 'Invalid IFSC Code format for India (e.g. SBIN0001234: 4 letters, zero, 6 alphanumeric).');
        }
      }

      // 12. Branch Name
      if (!branchName || branchName.length < 2) {
        setFieldError('bankBranchName', 'errBankBranchName', 'Branch Name is required (minimum 2 characters).');
      }

      // 13. Terms & Conditions Consent
      if (!termsAccepted) {
        setFieldError('bankTermsConsent', 'errBankTermsConsent', lang.termsRequiredError || 'Please agree to the account verification terms.');
      }

      if (hasError) {
        const generalMsg = lang.requiredFieldsError || 'Please correct the highlighted fields before submitting.';
        if (el.bankRegisterError) {
          el.bankRegisterError.textContent = generalMsg;
          el.bankRegisterError.style.display = 'block';
        }
        showToast(generalMsg, 'error');
        return;
      }

      // Never log full account numbers. Post to backend API.
      try {
        const submitBtn = el.submitRegisterBankBtn;
        if (submitBtn) {
          const spinner = submitBtn.querySelector('.btn-spinner');
          if (spinner) spinner.style.display = 'inline-block';
          submitBtn.disabled = true;
        }

        await API.post('/api/customer/accounts', {
          accountHolderName,
          branchName,
          city,
          state: stateVal,
          country,
          bankAccountNumber,
          confirmAccountNumber,
          ifscCode: ifscCode || null,
          phoneNumber,
          email,
          bankName,
          accountType,
          postalCode,
          residentialAddress,
          dateOfBirth,
          branchCode,
          termsAccepted
        });

        if (submitBtn) {
          const spinner = submitBtn.querySelector('.btn-spinner');
          if (spinner) spinner.style.display = 'none';
          submitBtn.disabled = false;
        }

        if (el.registerBankModal) el.registerBankModal.style.display = 'none';
        const successMsg = lang.registerBankSuccess || 'Bank account registered successfully in RESTRICTED status awaiting verification.';
        showToast(successMsg, 'success');

        // Reset form inputs for clean state
        if (el.registerBankForm) el.registerBankForm.reset();

        // Refresh dashboard and accounts view to display newly registered account
        await loadCustomerDashboard();
        await loadAllAccountsView();
        switchSubView('viewAccounts');
      } catch (err) {
        const submitBtn = el.submitRegisterBankBtn;
        if (submitBtn) {
          const spinner = submitBtn.querySelector('.btn-spinner');
          if (spinner) spinner.style.display = 'none';
          submitBtn.disabled = false;
        }
        if (el.bankRegisterError) {
          el.bankRegisterError.textContent = err.message;
          el.bankRegisterError.style.display = 'block';
        }
        showToast(err.message, 'error');
      }
    });
  }

  // Refresh Tickets
  el.refreshTicketsBtn.addEventListener('click', loadCustomerDashboard);

  // Recovery Wizard Navigation
  el.wizardPrevBtn.addEventListener('click', () => {
    if (state.wizard.currentStep > 1) updateWizardStepView(state.wizard.currentStep - 1);
  });

  el.wizardNextBtn.addEventListener('click', () => {
    if (state.wizard.currentStep === 1 && !el.contactConfirmedCheck.checked) {
      showToast('Please confirm your contact details to proceed.', 'error');
      return;
    }
    if (state.wizard.currentStep < 4) updateWizardStepView(state.wizard.currentStep + 1);
  });

  el.wizardSubmitBtn.addEventListener('click', submitRecoveryApplication);

  el.closeRecoveryModalBtn.addEventListener('click', () => {
    el.recoveryModal.style.display = 'none';
  });

  // Liveness Selfie Capture Simulation
  el.captureSelfieBtn.addEventListener('click', () => {
    state.wizard.selfieCaptured = true;
    el.selfieConfirmMsg.style.display = 'block';
    showToast('Biometric liveness selfie captured (Match confidence: 96%)', 'success');
  });

  // File dropzones
  el.idDropzone.addEventListener('click', () => el.idFileInput.click());
  el.idFileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      state.wizard.idFile = e.target.files[0];
      el.idFileName.textContent = `✓ Selected: ${state.wizard.idFile.name}`;
      showToast(`Selected ${state.wizard.idFile.name} (Simulated OCR check: READY)`, 'info');
    }
  });

  el.addressDropzone.addEventListener('click', () => el.addressFileInput.click());
  el.addressFileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      state.wizard.addressFile = e.target.files[0];
      el.addressFileName.textContent = `✓ Selected: ${state.wizard.addressFile.name}`;
      showToast(`Selected ${state.wizard.addressFile.name}`, 'info');
    }
  });

  // Cockpit Tab Switching
  el.cockpitTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      el.cockpitTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const targetId = tab.dataset.tab;
      document.querySelectorAll('.tab-content').forEach(c => {
        c.classList.toggle('active', c.id === targetId);
      });
    });
  });

  // Case Inspection Modal
  el.closeInspectModalBtn.addEventListener('click', () => {
    el.caseInspectModal.style.display = 'none';
  });

  el.recommendApprovalBtn.addEventListener('click', () => recordMakerDecision('RECOMMEND_APPROVAL'));
  el.requestMoreInfoBtn.addEventListener('click', () => recordMakerDecision('REQUEST_MORE_INFO'));
  el.rejectCaseBtn.addEventListener('click', () => recordMakerDecision('REJECT'));
  el.authorizeUnfreezeBtn.addEventListener('click', () => recordCheckerAuthorization('APPROVE_AND_UNFREEZE'));
  el.checkerRejectBtn.addEventListener('click', () => recordCheckerAuthorization('REJECT'));

  // Audit Filters
  el.refreshAuditBtn.addEventListener('click', loadAuditLogs);
  el.auditRoleFilter.addEventListener('change', loadAuditLogs);
  el.auditSearchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') loadAuditLogs();
  });

  // CBS Sliders
  el.latencySlider.addEventListener('input', (e) => {
    el.latencyDisplay.textContent = `${e.target.value} ms`;
  });
  el.failRateSlider.addEventListener('input', (e) => {
    el.failRateDisplay.textContent = `${Math.round(e.target.value * 100)} %`;
  });
  el.applyCbsConfigBtn.addEventListener('click', async () => {
    const latency = parseInt(el.latencySlider.value, 10);
    const failRate = parseFloat(el.failRateSlider.value);
    await API.post('/api/admin/cbs-config', { latencyMs: latency, failRate });
    showToast('CBS adapter simulation configuration updated', 'success');
    loadCbsStatus();
  });

  // Factory Reset
  el.factoryResetBtn.addEventListener('click', async () => {
    if (confirm('Reset prototype state to factory seed data? All temporary records will be restored to clean state.')) {
      await API.post('/api/admin/seed-reset');
      showToast('Prototype state successfully reset to factory seed!', 'success');
      loadAdminDashboard();
    }
  });

  // Help & Grievances Modal
  el.openHelpBtn.addEventListener('click', () => {
    el.helpModal.style.display = 'flex';
    loadCustomerComplaints();
  });
  el.closeHelpModalBtn.addEventListener('click', () => {
    el.helpModal.style.display = 'none';
  });

  el.complaintForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/complaints', {
        subject: el.compSubject.value,
        category: el.compCategory.value,
        description: el.compDescription.value
      });
      el.compSubject.value = '';
      el.compDescription.value = '';
      showToast('Grievance filed successfully!', 'success');
      loadCustomerComplaints();
    } catch (err) {
      // Handled
    }
  });

  // Privacy Center Modal
  if (el.openPrivacyBtn) {
    el.openPrivacyBtn.addEventListener('click', () => {
      el.privacyModal.style.display = 'flex';
      loadCustomerConsents();
    });
  }
  if (el.closePrivacyModalBtn) {
    el.closePrivacyModalBtn.addEventListener('click', () => {
      el.privacyModal.style.display = 'none';
    });
  }

  // Fraud Detection Center Controls
  if (el.refreshFraudBtn) el.refreshFraudBtn.addEventListener('click', loadFraudDashboard);
  if (el.fraudStatusFilter) el.fraudStatusFilter.addEventListener('change', loadFraudAlerts);
  if (el.fraudSeverityFilter) el.fraudSeverityFilter.addEventListener('change', loadFraudAlerts);
  if (el.fraudSearchInput) {
    el.fraudSearchInput.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') loadFraudAlerts();
    });
  }
  if (el.closeFraudModalBtn) {
    el.closeFraudModalBtn.addEventListener('click', () => {
      el.fraudAlertModal.style.display = 'none';
    });
  }
  if (el.fraudAckBtn) el.fraudAckBtn.addEventListener('click', acknowledgeCurrentFraudAlert);
  if (el.fraudSaveNotesBtn) el.fraudSaveNotesBtn.addEventListener('click', saveCurrentFraudNotes);
  if (el.fraudEscalateBtn) el.fraudEscalateBtn.addEventListener('click', escalateCurrentFraudAlert);
  if (el.fraudCloseVerifiedBtn) el.fraudCloseVerifiedBtn.addEventListener('click', () => closeCurrentFraudAlert('CUSTOMER_VERIFIED'));
  if (el.fraudCloseFalsePositiveBtn) el.fraudCloseFalsePositiveBtn.addEventListener('click', () => closeCurrentFraudAlert('FALSE_POSITIVE'));
  if (el.fraudCloseConfirmedBtn) el.fraudCloseConfirmedBtn.addEventListener('click', () => closeCurrentFraudAlert('CONFIRMED_FRAUD_PREVENTED'));

  // Reports & Analytics Exports
  if (el.exportCasesCsvBtn) el.exportCasesCsvBtn.addEventListener('click', () => exportComplianceReport('cases', 'csv'));
  if (el.exportCasesJsonBtn) el.exportCasesJsonBtn.addEventListener('click', () => exportComplianceReport('cases', 'json'));
  if (el.exportFraudCsvBtn) el.exportFraudCsvBtn.addEventListener('click', () => exportComplianceReport('fraud', 'csv'));
  if (el.exportFraudJsonBtn) el.exportFraudJsonBtn.addEventListener('click', () => exportComplianceReport('fraud', 'json'));
  if (el.closeExportPreviewBtn) {
    el.closeExportPreviewBtn.addEventListener('click', () => {
      el.exportPreviewCard.style.display = 'none';
    });
  }

  // Backdrop click & Escape key modal dismissal
  const allModals = [
    el.caseInspectModal,
    el.helpModal,
    el.privacyModal,
    el.fraudAlertModal,
    el.lockExplanationModal,
    el.simulateTransferModal,
    el.recoveryModal,
    el.registerBankModal,
    document.getElementById('profileModal'),
    document.getElementById('qrScannerModal')
  ];

  allModals.forEach(m => {
    if (m) {
      m.addEventListener('click', (e) => {
        if (e.target === m) {
          m.style.display = 'none';
        }
      });
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      allModals.forEach(m => {
        if (m && m.style.display !== 'none') {
          m.style.display = 'none';
        }
      });
    }
  });

  // Hackathon: Lock Explanation Modal Listeners
  if (el.explainLockBtn) el.explainLockBtn.addEventListener('click', openLockExplanationModal);
  if (el.closeLockModalBtn) el.closeLockModalBtn.addEventListener('click', closeLockExplanationModal);
  if (el.lockCloseActionBtn) el.lockCloseActionBtn.addEventListener('click', closeLockExplanationModal);
  if (el.lockResolveCurrentBtn) el.lockResolveCurrentBtn.addEventListener('click', () => startRecoveryFromLockModal());
  if (el.lockStartRecoveryBtn) {
    el.lockStartRecoveryBtn.addEventListener('click', () => startRecoveryFromLockModal());
  }
  if (el.faqExplainLockBtn) {
    el.faqExplainLockBtn.addEventListener('click', () => {
      if (el.helpModal) el.helpModal.style.display = 'none';
      openLockExplanationModal();
    });
  }
  document.querySelectorAll('.lock-reason-nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const reason = e.currentTarget.getAttribute('data-reason');
      startRecoveryFromLockModal(reason);
    });
  });

  // Hackathon: Simulated Outbound Transfer Listeners
  if (el.openSimulateTransferBtn) el.openSimulateTransferBtn.addEventListener('click', openSimulateTransferModal);
  if (el.openSimulateTransferBtn2) el.openSimulateTransferBtn2.addEventListener('click', openSimulateTransferModal);
  if (el.closeSimModalBtn) el.closeSimModalBtn.addEventListener('click', closeSimulateTransferModal);
  if (el.simCloseBtn) el.simCloseBtn.addEventListener('click', closeSimulateTransferModal);
  if (el.simForm) el.simForm.addEventListener('submit', handleSimulateTransferSubmit);

  // Hackathon: Floating AI Customer-Care Assistant Listeners
  if (el.rebankChatLauncher) el.rebankChatLauncher.addEventListener('click', toggleChatWindow);
  if (el.minimizeChatBtn) el.minimizeChatBtn.addEventListener('click', toggleChatWindow);
  if (el.chatInputForm) el.chatInputForm.addEventListener('submit', handleChatSubmit);
  if (el.chatInput) {
    el.chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleChatSubmit(e);
      }
    });
  }

  // Chatbot Quick-Action Chips
  if (el.chipAccBlocked) {
    el.chipAccBlocked.addEventListener('click', () => {
      const q = state.currentLang === 'ta' ? 'Account Locked / ஏன் லாக் ஆனது?' : (state.currentLang === 'hi' ? 'खाता लॉक (Account Locked)' : 'Why is my account locked?');
      window.sendChatChipQuery(q);
    });
  }
  if (el.chipRecoverAcc) {
    el.chipRecoverAcc.addEventListener('click', () => {
      const q = state.currentLang === 'ta' ? 'Recover My Account / கணக்கை மீட்டெடு' : (state.currentLang === 'hi' ? 'खाता रिकवर करें (Recover My Account)' : 'Help me recover my account');
      window.sendChatChipQuery(q);
    });
  }
  if (el.chipTxRisk) {
    el.chipTxRisk.addEventListener('click', () => {
      const q = state.currentLang === 'ta' ? 'Transfer Safety / பரிமாற்ற பாதுகாப்பு' : (state.currentLang === 'hi' ? 'ट्रांसफर सुरक्षा (Transfer Safety)' : 'Check transfer safety');
      window.sendChatChipQuery(q);
    });
  }
  if (el.chipContactSupport) {
    el.chipContactSupport.addEventListener('click', () => {
      const q = state.currentLang === 'ta' ? 'Help Center / உதவி மையம்' : (state.currentLang === 'hi' ? 'सहायता केंद्र (Help Center)' : 'Help Center');
      window.sendChatChipQuery(q);
    });
  }

  // Security Dashboard: Suspicious Login Alert Dismiss
  if (el.dismissSuspiciousAlertBtn && el.suspiciousLoginCard) {
    el.dismissSuspiciousAlertBtn.addEventListener('click', () => {
      el.suspiciousLoginCard.style.display = 'none';
      showToast('Suspicious session notification acknowledged and dismissed.', 'info');
    });
  }

  // Security Dashboard: Account Health Action Button
  if (el.dashHealthActionBtn) {
    el.dashHealthActionBtn.addEventListener('click', () => {
      if (state.activeEligibility && state.activeEligibility.hasRestriction) {
        openRecoveryWizard(state.activeEligibility);
      } else if (state.activeAccount && state.activeAccount.status === 'RESTRICTED') {
        openLockExplanationModal();
      } else {
        showToast(
          state.currentLang === 'ta' ? 'உங்கள் கணக்கு 98% சிறந்த நிலையில் உள்ளது.' :
          (state.currentLang === 'hi' ? 'आपका खाता 98% इष्टतम सुरक्षा स्थिति में है।' :
          'Your account security is 98% optimal with no active remediation needed.'),
          'success'
        );
      }
    });
  }

  // Dashboard Section Navigation Pills
  const navTabs = [
    { btn: el.dashTabOverview, target: document.getElementById('overviewSectionContainer') },
    { btn: el.dashTabAccounts, target: el.accountSummaryCard },
    { btn: el.dashTabSecurity, target: el.dashHealthCard },
    { btn: el.dashTabRecovery, target: el.dashRecoverySection },
    { btn: el.dashTabTransfer, target: el.dashTransferSection },
    { btn: el.dashTabActivity, target: el.dashActivitySection }
  ];

  navTabs.forEach(({ btn, target }) => {
    if (btn && target) {
      btn.addEventListener('click', () => {
        navTabs.forEach(t => t.btn && t.btn.classList.remove('active'));
        btn.classList.add('active');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  });

  // Header Nav Links Smooth Scroll
  const headLinks = [
    { link: el.headNavHome, target: document.getElementById('overviewSectionContainer') },
    { link: el.headNavAccounts, target: el.accountSummaryCard },
    { link: el.headNavRecovery, target: el.dashRecoverySection },
    { link: el.headNavSecurityCheck, target: el.dashHealthCard },
    { link: el.headNavTransfer, target: el.dashTransferSection },
    { link: el.headNavRecentActivity, target: el.dashActivitySection }
  ];

  headLinks.forEach(({ link, target }) => {
    if (link && target) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  });

  // Get Help button in Hero
  if (el.openGetHelpBtn) {
    el.openGetHelpBtn.addEventListener('click', () => {
      if (!chatState.isOpen) toggleChatWindow();
      if (el.chatInput) setTimeout(() => el.chatInput.focus(), 300);
    });
  }

  // Smooth scroll shortcuts for hero buttons
  if (el.startRecoveryBtn) {
    el.startRecoveryBtn.addEventListener('click', (e) => {
      if (el.dashRecoverySection) {
        el.dashRecoverySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
  if (el.openSimulateTransferBtn) {
    el.openSimulateTransferBtn.addEventListener('click', (e) => {
      if (el.dashTransferSection) {
        el.dashTransferSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Dedicated In-Page Recovery Form Submission
  if (el.inlineRecoveryForm) {
    el.inlineRecoveryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!state.activeAccount) {
        showToast('Please select an active account first.', 'error');
        return;
      }

      const accountId = state.activeAccount.id;
      const restrictionId = state.activeEligibility?.restrictionId || state.activeAccount.restriction?.id || null;
      const categoryCode = state.activeEligibility?.restrictionCode || state.activeAccount.restriction?.category_code || 'KYC_PERIODIC_REFRESH';
      const docType = el.inlineDocType ? el.inlineDocType.value : 'PASSPORT';
      const docNumber = el.inlineDocNumber ? el.inlineDocNumber.value.trim() : 'A98234710';
      const explanation = el.inlineExplanation ? el.inlineExplanation.value.trim() : 'Updated KYC document submitted';

      try {
        const idempotencyKey = `REB-INLINE-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
        const res = await API.post('/api/recovery/submit', {
          accountId,
          restrictionId,
          categoryCode,
          customerExplanation: explanation,
          sourceOfFunds: 'Employment & Personal Savings',
          contactConfirmed: true,
          consentSigned: true
        }, {
          'Idempotency-Key': idempotencyKey
        });

        const newRequest = res.data;

        // Upload document evidence metadata
        await API.post(`/api/recovery/${newRequest.id}/upload-doc`, {
          documentType: docType,
          fileName: `${docType.toLowerCase()}_verified.jpg`,
          simulatedData: JSON.stringify({
            docNumber,
            docType,
            verified: true,
            livenessConfidence: 96.4
          })
        });

        const friendlyRecoverySubmitted = state.currentLang === 'ta'
          ? `Ungal recovery request submit aagiduchu. Idho unga reference number: ${newRequest.reference_number}. Adutha update inga paarkkalaam.`
          : (state.currentLang === 'hi'
            ? `आपका रिकवरी अनुरोध जमा हो गया है। यह रहा आपका संदर्भ नंबर: ${newRequest.reference_number}। आप अगला अपडेट यहाँ देख सकते हैं।`
            : `Your recovery request has been submitted. Here's your reference number: ${newRequest.reference_number}. You can track the next update here.`);

        // Visibly present confirmation banner inside the recovery card
        if (el.inlineRecoveryStatusBanner) {
          el.inlineRecoveryStatusBanner.style.display = 'flex';
          if (el.inlineStatusBannerRef) el.inlineStatusBannerRef.textContent = newRequest.reference_number;
          if (el.inlineStatusBannerTitle) {
            el.inlineStatusBannerTitle.textContent = state.currentLang === 'ta' ? 'விண்ணப்பம் சமர்ப்பிக்கப்பட்டது' :
              (state.currentLang === 'hi' ? 'आवेदन जमा हो गया है' : 'Application Submitted & Under Review');
          }
          if (el.inlineStatusBannerDesc) {
            el.inlineStatusBannerDesc.textContent = friendlyRecoverySubmitted;
          }
        }

        showToast(friendlyRecoverySubmitted, 'success');

        // Reload customer tickets and scroll down to the live 4-stage tracker
        await loadCustomerTickets();
        const trackerCard = document.getElementById('recoveryTrackerCard');
        if (trackerCard) {
          trackerCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      } catch (err) {
        if (err && err.response && err.response.status === 409) {
          const match = (err.response.data?.error || '').match(/REB-2026-\w+/);
          const activeRef = match ? match[0] : (state.myRequests?.[0]?.reference_number || 'REB-2026-ACTIVE');
          if (el.inlineRecoveryStatusBanner) {
            el.inlineRecoveryStatusBanner.style.display = 'flex';
            if (el.inlineStatusBannerRef) el.inlineStatusBannerRef.textContent = activeRef;
            if (el.inlineStatusBannerTitle) {
              el.inlineStatusBannerTitle.textContent = state.currentLang === 'ta' ? 'விண்ணப்பம் பரிசீலனையில் உள்ளது' :
                (state.currentLang === 'hi' ? 'आवेदन समीक्षाधीन है' : 'Application Under Review');
            }
          }
        }
      }
    });
  }

  // Scroll to Tracker Shortcut Button
  if (el.viewTrackerScrollBtn) {
    el.viewTrackerScrollBtn.addEventListener('click', () => {
      const trackerCard = document.getElementById('recoveryTrackerCard');
      if (trackerCard) {
        trackerCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Interactive Digital Liveness Selfie Capture
  if (el.inlineSelfieBtn) {
    el.inlineSelfieBtn.addEventListener('click', () => {
      state.wizard = state.wizard || {};
      state.wizard.selfieCaptured = true;

      if (el.inlineScanBeam) el.inlineScanBeam.style.display = 'block';
      if (el.inlineSelfieStatus) {
        el.inlineSelfieStatus.textContent = state.currentLang === 'ta' ? 'பயோமெட்ரிக் ஸ்கேனிங் செய்யப்படுகிறது (ISO 30107-3)...' :
          (state.currentLang === 'hi' ? 'बायोमेट्रिक लाइवनेस स्कैनिंग जारी (ISO 30107-3)...' : 'Scanning facial biometrics (ISO 30107-3)...');
        el.inlineSelfieStatus.style.color = 'var(--cyan-700)';
      }

      setTimeout(() => {
        if (el.inlineScanBeam) el.inlineScanBeam.style.display = 'none';
        if (el.inlineSelfieStatus) {
          el.inlineSelfieStatus.textContent = state.currentLang === 'ta' ? '✓ நேரடி செல்ஃபி சரிபார்க்கப்பட்டது (96.4% நம்பிக்கை)' :
            (state.currentLang === 'hi' ? '✓ लाइवनेस सेल्फी सत्यापित (96.4% सटीकता)' : '✓ Liveness Selfie Verified (96.4% Match)');
          el.inlineSelfieStatus.style.color = 'var(--success)';
        }
        el.inlineSelfieBtn.textContent = state.currentLang === 'ta' ? '✓ செல்ஃபி சரிபார்க்கப்பட்டது' : (state.currentLang === 'hi' ? '✓ सेल्फी सत्यापित' : '✓ Selfie Verified');
        el.inlineSelfieBtn.className = 'btn btn-success';
        showToast('Digital liveness biometric selfie verified with 96.4% confidence score!', 'success');
      }, 1200);
    });
  }

  // Dedicated In-Page Transfer Simulator Form
  if (el.inlineTransferForm) {
    el.inlineTransferForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const amount = parseFloat(el.inlineTransferAmount ? el.inlineTransferAmount.value : 0) || 0;
      const recipient = (el.inlineTransferRecipient ? el.inlineTransferRecipient.value : '').trim();
      const speed = el.inlineTransferSpeed ? el.inlineTransferSpeed.value : 'STANDARD';
      const isRestricted = state.activeAccount && (state.activeAccount.status === 'RESTRICTED' || state.activeEligibility?.hasRestriction);

      let tier = 'LOW';
      if (isRestricted || amount > 2500 || recipient.toLowerCase().includes('apex') || recipient.toLowerCase().includes('unknown') || recipient.toLowerCase().includes('suspicious')) {
        tier = 'HIGH';
      } else if (amount >= 500 || speed === 'INSTANT') {
        tier = 'REVIEW';
      } else {
        tier = 'LOW';
      }

      state.lastSimulation = { tier, amount, recipient, speed };

      if (el.inlineTransferResult) {
        el.inlineTransferResult.style.display = 'block';
        el.inlineTransferResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      renderTransferSimulationResult(tier);

      if (tier === 'HIGH') {
        showToast(
          state.currentLang === 'ta' ? 'Indha transfer konjam unusual-ah irukku. Anuppuradhukku munnaadi details-a check pannunga.' :
          (state.currentLang === 'hi' ? 'यह ट्रांसफर थोड़ा असामान्य लग रहा है। कृपया आगे बढ़ने से पहले विवरण दोबारा जाँच लें।' :
          'This transfer looks unusual. Please check the details before continuing.'),
          'warning'
        );
      } else if (tier === 'REVIEW') {
        showToast(
          state.currentLang === 'ta' ? 'இடர் ஆய்வு: இந்த பரிமாற்றத்திற்கு கூடுதல் சரிபார்ப்பு பரிந்துரைக்கப்படுகிறது.' :
          (state.currentLang === 'hi' ? 'जोखिम समीक्षा: इस स्थानांतरण के लिए अतिरिक्त सत्यापन अनुशंसित है।' :
          'Medium risk: Elevated transaction velocity detected. Please review recipient details.'),
          'warning'
        );
      } else {
        showToast(
          state.currentLang === 'ta' ? 'பரிவர்த்தனை சரிபார்க்கப்பட்டு அனுமதிக்கப்பட்டது (12/100 குறைந்த இடர்).' :
          (state.currentLang === 'hi' ? 'स्थानांतरण स्वीकृत (12/100 कम जोखिम)।' :
          'Simulated transfer cleared with 12/100 Low Risk rating.'),
          'success'
        );
      }
    });
  }
}

// Re-upload slot for INFO_REQUESTED
window.reUploadInfo = async function(requestId) {
  const notes = prompt('Enter your additional explanation or updated document description:');
  if (notes) {
    try {
      await API.post(`/api/recovery/${requestId}/upload-doc`, {
        documentType: 'GOVT_ID',
        fileName: 'refreshed_id_document.jpg',
        simulatedData: JSON.stringify({ note: notes, reupload: true })
      });
      showToast('Additional documentation submitted to Bank Compliance', 'success');
      loadCustomerDashboard();
    } catch (e) {
      // Handled
    }
  }
};

// ================= 11-ITEM MAIN NAVIGATION & SUB-VIEWS CONTROLLER =================
function updateNavScrollIndicators() {
  const nav = el.rebankMainNav || document.getElementById('rebankMainNav');
  const prev = el.navScrollPrevBtn || document.getElementById('navScrollPrevBtn');
  const next = el.navScrollNextBtn || document.getElementById('navScrollNextBtn');
  if (!nav) return;

  const canScrollLeft = nav.scrollLeft > 8;
  const canScrollRight = nav.scrollLeft < (nav.scrollWidth - nav.clientWidth - 8);

  if (prev) prev.style.display = canScrollLeft ? 'flex' : 'none';
  if (next) next.style.display = canScrollRight ? 'flex' : 'none';
}

function initMain11Nav() {
  const navBtns = [
    { id: 'navItemDashboard', view: 'viewDashboard' },
    { id: 'navItemAccounts', view: 'viewAccounts' },
    { id: 'navItemBanks', view: 'viewBanks' },
    { id: 'navItemTransfer', view: 'viewTransfer' },
    { id: 'navItemBillPay', view: 'viewBillPay' },
    { id: 'navItemDeposits', view: 'viewDeposits' },
    { id: 'navItemCards', view: 'viewCards' },
    { id: 'navItemStatement', view: 'viewStatement' },
    { id: 'navItemAiChat', view: 'viewAiChat' },
    { id: 'navItemContact', view: 'viewContact' },
    { id: 'navItemLockReasons', view: 'viewLockReasons' }
  ];

  navBtns.forEach(item => {
    const btn = document.getElementById(item.id);
    if (btn) {
      btn.addEventListener('click', () => switchSubView(item.view));
    }
  });

  const logoutBtn = document.getElementById('navItemLogout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }

  // Left & Right Horizontal Scroll Controls
  const nav = el.rebankMainNav || document.getElementById('rebankMainNav');
  const prevBtn = el.navScrollPrevBtn || document.getElementById('navScrollPrevBtn');
  const nextBtn = el.navScrollNextBtn || document.getElementById('navScrollNextBtn');

  if (prevBtn && nav) {
    prevBtn.addEventListener('click', () => {
      nav.scrollBy({ left: -240, behavior: 'smooth' });
      setTimeout(updateNavScrollIndicators, 220);
    });
  }

  if (nextBtn && nav) {
    nextBtn.addEventListener('click', () => {
      nav.scrollBy({ left: 240, behavior: 'smooth' });
      setTimeout(updateNavScrollIndicators, 220);
    });
  }

  if (nav) {
    nav.addEventListener('scroll', updateNavScrollIndicators, { passive: true });
    window.addEventListener('resize', updateNavScrollIndicators, { passive: true });
    setTimeout(updateNavScrollIndicators, 150);

    // Keyboard Arrow navigation between navigation buttons
    nav.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        const btns = Array.from(nav.querySelectorAll('.main-nav-btn'));
        const activeIdx = btns.indexOf(document.activeElement);
        if (activeIdx !== -1) {
          e.preventDefault();
          const nextIdx = e.key === 'ArrowRight'
            ? (activeIdx + 1) % btns.length
            : (activeIdx - 1 + btns.length) % btns.length;
          btns[nextIdx].focus();
        }
      }
    });
  }

  const backBtns = [
    'backFromAccountsBtn',
    'backFromBanksBtn',
    'backFromTransferBtn',
    'backFromBillPayBtn',
    'backFromDepositsBtn',
    'backFromCardsBtn',
    'backFromStatementBtn',
    'backFromAiChatBtn',
    'backFromContactBtn',
    'backFromLockReasonsBtn'
  ];
  backBtns.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', () => switchSubView('viewDashboard'));
    }
  });

  window.addEventListener('hashchange', handleRouteHash);
  window.addEventListener('popstate', handleRouteHash);
}

function switchSubView(viewId, mode = null) {
  const views = [
    'viewDashboard', 'viewAccounts', 'viewRegisterBank', 'viewBanks', 'viewTransfer',
    'viewBillPay', 'viewDeposits', 'viewCards', 'viewStatement',
    'viewProfile', 'viewAiChat', 'viewContact', 'viewLockReasons'
  ];

  views.forEach(id => {
    const panel = document.getElementById(id);
    if (panel) {
      panel.style.display = (id === viewId) ? 'block' : 'none';
    }
  });

  const navBtns = document.querySelectorAll('.main-nav-btn');
  let activeBtn = null;
  navBtns.forEach(btn => {
    const target = btn.getAttribute('data-view');
    if (target === viewId || (viewId === 'viewRegisterBank' && target === 'viewAccounts')) {
      btn.classList.add('active');
      activeBtn = btn;
    } else {
      btn.classList.remove('active');
    }
  });

  // Automatically scroll selected navigation item into view
  if (activeBtn) {
    activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
  setTimeout(updateNavScrollIndicators, 180);

  const hashMap = {
    'viewDashboard': 'dashboard',
    'viewAccounts': 'accounts',
    'viewRegisterBank': 'register-bank',
    'viewBanks': 'banks',
    'viewTransfer': 'transfer',
    'viewBillPay': 'bills',
    'viewDeposits': 'deposits',
    'viewCards': 'cards',
    'viewStatement': 'statement',
    'viewProfile': 'profile',
    'viewAiChat': 'ai',
    'viewContact': 'contact',
    'viewLockReasons': 'lock-reasons'
  };
  if (hashMap[viewId] && window.location.hash !== `#${hashMap[viewId]}`) {
    history.pushState(null, null, `#${hashMap[viewId]}`);
  }

  if (viewId === 'viewAccounts') loadAllAccountsView();
  else if (viewId === 'viewRegisterBank') setupRegisterBankView();
  else if (viewId === 'viewBanks') loadAllBanksView();
  else if (viewId === 'viewTransfer') setupTransferView(mode);
  else if (viewId === 'viewBillPay') setupBillPayView();
  else if (viewId === 'viewDeposits') loadDepositsView();
  else if (viewId === 'viewCards') loadCardsView();
  else if (viewId === 'viewStatement') loadStatementView();
  else if (viewId === 'viewProfile') loadProfileView();
  else if (viewId === 'viewAiChat') setupAiChatView();
  else if (viewId === 'viewContact') loadContactView();
  else if (viewId === 'viewLockReasons') loadLockReasonsView();
  else if (viewId === 'viewDashboard') loadCustomerDashboard();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleRouteHash() {
  const hash = (window.location.hash || '').toLowerCase().replace('#', '').trim();
  if (!hash) return;

  if (hash === 'why-locked' || hash === 'lock-explanation' || hash === 'account-locked') {
    if (state.token) {
      switchSubView('viewDashboard');
      setTimeout(() => openLockExplanationModal(), 120);
    } else {
      openLockExplanationModal();
    }
    return;
  }

  if (hash === 'lock-reasons' || hash === 'locked-reasons' || hash === 'blocked-reasons' || hash === 'unlock-guide' || hash === 'unfreeze-guide' || hash === 'reasons') {
    if (state.token) {
      switchSubView('viewLockReasons');
    } else {
      openPublicLockReasons();
    }
    return;
  }

  if (hash === 'register' || hash === 'register-account') {
    if (!state.token) {
      showView('auth');
      if (el.tabRegister) el.tabRegister.click();
      return;
    }
  }

  const routeMap = {
    'dashboard': 'viewDashboard',
    'home': 'viewDashboard',
    'accounts': 'viewAccounts',
    'all-accounts': 'viewAccounts',
    'registered-accounts': 'viewAccounts',
    'registered-bank-account': 'viewRegisterBank',
    'register-bank-account': 'viewRegisterBank',
    'register-bank': 'viewRegisterBank',
    'register-account': 'viewRegisterBank',
    'register': 'viewRegisterBank',
    'banks': 'viewBanks',
    'partner-banks': 'viewBanks',
    'transfer': 'viewTransfer',
    'bills': 'viewBillPay',
    'billpay': 'viewBillPay',
    'deposits': 'viewDeposits',
    'cards': 'viewCards',
    'statement': 'viewStatement',
    'profile': 'viewProfile',
    'customer-profile': 'viewProfile',
    'my-profile': 'viewProfile',
    'ai': 'viewAiChat',
    'chat': 'viewAiChat',
    'contact': 'viewContact',
    'lock-reasons': 'viewLockReasons',
    'locked-reasons': 'viewLockReasons',
    'blocked-reasons': 'viewLockReasons',
    'unlock-guide': 'viewLockReasons',
    'unfreeze-guide': 'viewLockReasons',
    'reasons': 'viewLockReasons'
  };

  const targetView = routeMap[hash];
  if (targetView && state.token) {
    switchSubView(targetView);
  }
}

// ================= GOOGLE PAY STYLE QUICK ACTIONS =================
function initQuickActions() {
  const actions = [
    { id: 'actionScanPay', action: () => openQrScannerModal() },
    { id: 'actionPayAnyone', action: () => switchSubView('viewTransfer', 'payAnyone') },
    { id: 'actionBankTransfer', action: () => switchSubView('viewTransfer', 'transfer') },
    { id: 'actionBillPay', action: () => switchSubView('viewBillPay') },
    { id: 'actionDth', action: () => { switchSubView('viewBillPay'); activateBillCat('DTH'); } },
    { id: 'actionCards', action: () => switchSubView('viewCards') },
    { id: 'actionStatement', action: () => switchSubView('viewStatement') },
    { id: 'actionAccounts', action: () => switchSubView('viewAccounts') },
    { id: 'actionDeposits', action: () => switchSubView('viewDeposits') },
    { id: 'actionRecovery', action: () => {
      switchSubView('viewDashboard');
      const rec = document.getElementById('dashRecoverySection') || document.getElementById('inlineRecoveryCard');
      if (rec) rec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } },
    { id: 'actionAiChat', action: () => switchSubView('viewAiChat') },
    { id: 'actionContact', action: () => switchSubView('viewContact') },
    { id: 'actionLockReasons', action: () => switchSubView('viewLockReasons') }
  ];

  actions.forEach(a => {
    const elBtn = document.getElementById(a.id);
    if (elBtn) {
      elBtn.addEventListener('click', a.action);
    }
  });
}

// ================= QR SCANNER & INSTANT SCAN-PAY =================
let qrMediaStream = null;

function openQrScannerModal() {
  const modal = document.getElementById('qrScannerModal');
  if (!modal) return;
  modal.style.display = 'flex';

  const video = document.getElementById('qrScannerVideo');
  const alertBox = document.getElementById('qrFallbackAlert');
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(stream => {
        qrMediaStream = stream;
        if (video) video.srcObject = stream;
        if (alertBox) alertBox.style.display = 'none';
      })
      .catch(err => {
        if (alertBox) {
          alertBox.style.display = 'block';
          alertBox.innerHTML = '<span>💡</span> <span>Camera preview not accessible in this browser profile. You can enter recipient details manually or click "Use Demo QR" below.</span>';
        }
      });
  } else {
    if (alertBox) alertBox.style.display = 'block';
  }
}

function closeQrScannerModal() {
  const modal = document.getElementById('qrScannerModal');
  if (modal) modal.style.display = 'none';
  if (qrMediaStream) {
    try { qrMediaStream.getTracks().forEach(track => track.stop()); } catch(e) {}
    qrMediaStream = null;
  }
  const resBox = document.getElementById('qrPayResultBox');
  if (resBox) resBox.style.display = 'none';
}

function initQrScanner() {
  const closeBtn = document.getElementById('closeQrScannerBtn');
  const cancelBtn = document.getElementById('cancelQrScannerBtn');
  if (closeBtn) closeBtn.addEventListener('click', closeQrScannerModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeQrScannerModal);

  const demoBtn = document.getElementById('useDemoQrBtn');
  if (demoBtn) {
    demoBtn.addEventListener('click', () => {
      const rec = document.getElementById('qrRecipientInput');
      const amt = document.getElementById('qrAmountInput');
      const note = document.getElementById('qrNoteInput');
      if (rec) rec.value = 'UPI-ARTISAN@REBK';
      if (amt) amt.value = '24.80';
      if (note) note.value = 'Artisan Roasters Cafe - Table 4';
      showToast('Loaded Demo QR code from Artisan Roasters Cafe ($24.80)', 'info');
    });
  }

  const form = document.getElementById('qrPaymentForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      const recipientCode = document.getElementById('qrRecipientInput')?.value.trim();
      const amount = parseFloat(document.getElementById('qrAmountInput')?.value || 0);
      const notes = document.getElementById('qrNoteInput')?.value.trim();
      const resBox = document.getElementById('qrPayResultBox');

      try {
        const res = await API.post('/api/customer/scan-pay', {
          recipientCode,
          amount,
          notes
        });

        if (submitBtn) submitBtn.disabled = false;

        if (resBox) {
          resBox.style.display = 'block';
          resBox.style.background = '#F0FDF4';
          resBox.style.border = '1px solid #86EFAC';
          resBox.style.color = '#166534';
          resBox.innerHTML = `<strong>✓ Payment Successful!</strong> Ref: ${res.data.referenceNumber}. Paid $${amount.toFixed(2)} to ${recipientCode}. New Balance: $${res.data.newBalance.toFixed(2)}`;
        }
        showToast(`QR payment of $${amount.toFixed(2)} completed!`, 'success');
        loadCustomerDashboard();
      } catch (err) {
        if (submitBtn) submitBtn.disabled = false;
        if (resBox) {
          resBox.style.display = 'block';
          resBox.style.background = '#FEF2F2';
          resBox.style.border = '1px solid #FCA5A5';
          resBox.style.color = '#991B1B';
          const errMsg = err.response?.data?.error?.message || 'Payment failed. Account restricted.';
          resBox.innerHTML = `<strong>✕ Payment Blocked:</strong> ${errMsg}`;
        }
        showToast(err.response?.data?.error?.message || 'Payment blocked on restricted account', 'warning');
      }
    });
  }
}

// ================= CUSTOMER PROFILE MODAL =================
function openProfileModal() {
  const modal = document.getElementById('profileModal');
  if (!modal) return;
  modal.style.display = 'flex';
  loadCustomerProfileData();
}

function closeProfileModal() {
  const modal = document.getElementById('profileModal');
  if (modal) modal.style.display = 'none';
  const notice = document.getElementById('profileSaveNotice');
  if (notice) notice.style.display = 'none';
}

async function loadCustomerProfileData() {
  try {
    const res = await API.get('/api/customer/profile');
    const p = res.data;
    if (p) {
      const nameEl = document.getElementById('profileDisplayName');
      const custNumEl = document.getElementById('profileCustNum');
      const emailEl = document.getElementById('profileEmail');
      const avatarEl = document.getElementById('profileInitialsAvatar');
      const nameInput = document.getElementById('profileFullNameInput');
      const phoneInput = document.getElementById('profilePhoneInput');
      const addrInput = document.getElementById('profileAddressInput');
      const kycBadge = document.getElementById('profileKycBadge');
      const riskBadge = document.getElementById('profileRiskBadge');

      if (nameEl) nameEl.textContent = p.full_name || 'Customer';
      if (custNumEl) custNumEl.textContent = p.customer_number || 'CUST-1002';
      if (emailEl) emailEl.textContent = p.email || '';
      if (nameInput) nameInput.value = p.full_name || '';
      if (phoneInput) phoneInput.value = p.phone || '';
      if (addrInput) addrInput.value = p.address || '';
      if (kycBadge) kycBadge.textContent = p.kyc_status || 'RESTRICTED';
      if (riskBadge) riskBadge.textContent = p.risk_rating || 'MEDIUM';

      if (avatarEl && p.full_name) {
        const initials = p.full_name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        avatarEl.textContent = initials;
      }
    }
  } catch (err) {
    // Non-blocking
  }
}

function initProfileModal() {
  const openBtn = document.getElementById('openProfileBtn');
  const userAvatar = document.getElementById('userAvatar');
  const closeBtn = document.getElementById('closeProfileModalBtn');
  const cancelBtn = document.getElementById('closeProfileBtn2');

  if (openBtn) openBtn.addEventListener('click', openProfileModal);
  if (userAvatar) userAvatar.addEventListener('click', openProfileModal);
  if (closeBtn) closeBtn.addEventListener('click', closeProfileModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeProfileModal);

  const form = document.getElementById('profileEditForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fullName = document.getElementById('profileFullNameInput')?.value.trim();
      const phone = document.getElementById('profilePhoneInput')?.value.trim();
      const address = document.getElementById('profileAddressInput')?.value.trim();
      const notice = document.getElementById('profileSaveNotice');

      try {
        await API.put('/api/customer/profile', { fullName, phone, address });
        if (notice) {
          notice.style.display = 'block';
          notice.style.background = '#F0FDF4';
          notice.style.color = '#166534';
          notice.textContent = '✓ Profile details updated successfully.';
        }
        showToast('Profile information saved!', 'success');
        if (state.user) {
          state.user.full_name = fullName;
          state.user.fullName = fullName;
          state.user.phone = phone;
        }
        const userDisp = document.getElementById('userDisplayName');
        if (userDisp) userDisp.textContent = fullName;
        const dashName = document.getElementById('dashCustomerName');
        if (dashName) dashName.textContent = fullName;
      } catch (err) {
        if (notice) {
          notice.style.display = 'block';
          notice.style.background = '#FEF2F2';
          notice.style.color = '#991B1B';
          notice.textContent = '✕ Error saving profile details.';
        }
      }
    });
  }
}

// ================= CUSTOMER PROFILE VIEW CONTROLLER =================
async function loadProfileView() {
  try {
    const profRes = await API.get('/api/customer/profile');
    const profile = profRes.data || {};
    state.customerProfile = profile;

    const nameEl = document.getElementById('profileFullNameDisplay');
    const avatarEl = document.getElementById('profileAvatarText');
    const cifEl = document.getElementById('profileCustIdDisplay');
    const kycEl = document.getElementById('profileKycStatusTag');
    const viewKycBadge = document.getElementById('profileViewKycBadge');
    const emailEl = document.getElementById('profileEmailDisplay');
    const phoneEl = document.getElementById('profilePhoneDisplay');
    const addrEl = document.getElementById('profileAddressDisplay');
    const accEl = document.getElementById('profilePrimaryAccDisplay');

    const phoneIn = document.getElementById('viewProfilePhoneInput');
    const emailIn = document.getElementById('viewProfileEmailInput');
    const addrIn = document.getElementById('viewProfileAddressInput');

    const fullName = profile.full_name || state.user?.fullName || 'Elena Rostova';
    if (nameEl) nameEl.textContent = fullName;
    if (avatarEl) {
      const parts = fullName.trim().split(' ');
      avatarEl.textContent = parts.length > 1 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : fullName.slice(0, 2).toUpperCase();
    }
    if (cifEl) cifEl.textContent = `CIF: ${profile.cif_number || 'CUST-77402'}`;
    const kyc = profile.kyc_status || 'VERIFIED';
    if (kycEl) {
      kycEl.textContent = kyc;
      kycEl.className = `badge ${kyc === 'ACTIVE' || kyc === 'VERIFIED' ? 'badge-success' : 'badge-warning'}`;
    }
    if (viewKycBadge) {
      viewKycBadge.textContent = `${kyc} STANDING`;
      viewKycBadge.className = `badge ${kyc === 'ACTIVE' || kyc === 'VERIFIED' ? 'badge-success' : 'badge-warning'}`;
    }

    if (emailEl) emailEl.textContent = profile.email || state.user?.email || 'elena.rostova@example.com';
    if (phoneEl) phoneEl.textContent = profile.phone || state.user?.phone || '+1 (555) 234-5678';
    if (addrEl) addrEl.textContent = profile.residential_address || '452 Elm Street, Chicago, IL 60601';

    if (phoneIn) phoneIn.value = profile.phone || state.user?.phone || '+1 (555) 234-5678';
    if (emailIn) emailIn.value = profile.email || state.user?.email || 'elena.rostova@example.com';
    if (addrIn) addrIn.value = profile.residential_address || '452 Elm Street, Chicago, IL 60601';

    if (accEl) {
      const pAcc = (state.accounts && state.accounts[0]) ? state.accounts[0].account_number_masked : '•••• •••• •••• 1002';
      accEl.textContent = pAcc;
    }

    const form = document.getElementById('viewProfileEditForm');
    if (form && !form.dataset.bound) {
      form.dataset.bound = 'true';
      form.onsubmit = async (e) => {
        e.preventDefault();
        const alertBox = document.getElementById('viewProfileAlert');
        try {
          const updatedPhone = phoneIn?.value.trim() || '';
          const updatedEmail = emailIn?.value.trim() || '';
          const updatedAddr = addrIn?.value.trim() || '';
          await API.put('/api/customer/profile', {
            phone: updatedPhone,
            email: updatedEmail,
            residential_address: updatedAddr
          });
          if (emailEl) emailEl.textContent = updatedEmail;
          if (phoneEl) phoneEl.textContent = updatedPhone;
          if (addrEl) addrEl.textContent = updatedAddr;
          if (state.user) {
            state.user.phone = updatedPhone;
            state.user.email = updatedEmail;
          }
          if (alertBox) {
            alertBox.style.display = 'block';
            alertBox.style.background = '#dcfce7';
            alertBox.style.color = '#15803d';
            alertBox.textContent = '✓ Profile details successfully updated and synchronized with CBS records.';
            setTimeout(() => { alertBox.style.display = 'none'; }, 4000);
          }
          showToast('Customer Profile updated successfully!', 'success');
        } catch (err) {
          if (alertBox) {
            alertBox.style.display = 'block';
            alertBox.style.background = '#fee2e2';
            alertBox.style.color = '#991b1b';
            alertBox.textContent = '✕ Failed to update profile. Please verify input formats.';
          }
          showToast('Failed to update profile.', 'error');
        }
      };
    }
  } catch (err) {
    console.error('Error loading profile view', err);
  }
}

// ================= ALL ACCOUNTS (REGISTERED BANK ACCOUNTS) VIEW =================
async function loadAllAccountsView() {
  const grid = document.getElementById('allAccountsGrid');
  if (!grid) return;

  grid.innerHTML = '<div class="empty-state" style="grid-column: 1 / -1;"><span class="btn-spinner" style="margin-right: 8px;"></span> Loading registered bank accounts...</div>';

  try {
    const res = await API.get('/api/customer/accounts');
    const accounts = res.data || [];
    state.accounts = accounts;

    const countBadge = document.getElementById('accountsCountBadge');
    if (countBadge) {
      countBadge.textContent = `${accounts.length} ${accounts.length === 1 ? 'Linked Account' : 'Linked Accounts'}`;
    }

    // Populate KPI Summary Strip if elements exist
    const totalCountEl = document.getElementById('accountsTotalCount');
    const activeCountEl = document.getElementById('accountsActiveCount');
    const restrictedCountEl = document.getElementById('accountsRestrictedCount');
    const totalBalanceEl = document.getElementById('accountsTotalBalance');

    const activeAccs = accounts.filter(a => a.status === 'ACTIVE');
    const restrictedAccs = accounts.filter(a => a.status === 'RESTRICTED');
    const totalBal = accounts.reduce((sum, a) => sum + (parseFloat(a.balance) || 0), 0);

    if (totalCountEl) totalCountEl.textContent = `${accounts.length} Accounts`;
    if (activeCountEl) activeCountEl.textContent = `${activeAccs.length} Active`;
    if (restrictedCountEl) restrictedCountEl.textContent = `${restrictedAccs.length} Restricted`;
    if (totalBalanceEl) totalBalanceEl.textContent = `$${totalBal.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD`;

    if (accounts.length === 0) {
      grid.innerHTML = `
        <div class="empty-state" style="padding: 3rem 1.5rem; text-align: center; background: #FFFFFF; border: 1.5px dashed var(--border); border-radius: var(--radius-lg); grid-column: 1 / -1;">
          <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">🏦</div>
          <h4 style="margin: 0 0 0.5rem; color: var(--navy-900);">No Bank Accounts Registered Yet</h4>
          <p style="color: var(--text-secondary); max-width: 440px; margin: 0 auto 1.5rem; font-size: 0.88rem;">
            Link your domestic or international bank account to unlock transfers, instant bill settlement, and priority account recovery.
          </p>
          <button type="button" class="btn btn-primary" onclick="switchSubView('viewRegisterBank')">
            <span class="btn-icon">🏦</span> Register Bank Account
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = accounts.map(acc => {
      const isRestricted = acc.status === 'RESTRICTED';
      const bankName = acc.bank_name || (acc.ifsc_code && acc.ifsc_code.startsWith('SBIN') ? 'State Bank of India' : (acc.ifsc_code && acc.ifsc_code.startsWith('HDFC') ? 'HDFC Bank' : 'ReBank Federal'));
      return `
        <div class="account-card" style="margin-bottom: 1rem; border-top: 4px solid ${isRestricted ? 'var(--warning)' : 'var(--teal-500)'};">
          <div class="account-card-header">
            <div>
              <strong style="color: var(--navy-900); font-size: 1.05rem; display: block;">${bankName}</strong>
              <span class="acc-type">${acc.account_type || 'SAVINGS'}</span>
            </div>
            <span class="badge ${acc.status === 'ACTIVE' ? 'badge-success' : 'badge-warning'}">
              ${acc.status === 'RESTRICTED' ? '⚠️ RESTRICTED (Verification Pending)' : acc.status}
            </span>
          </div>

          <div class="acc-number" style="font-size: 1.25rem; font-family: monospace; letter-spacing: 0.12em; margin: 0.75rem 0;">
            ${acc.account_number_masked}
          </div>

          <div class="acc-balance-group" style="background: var(--navy-50); padding: 0.75rem 1rem; border-radius: var(--radius-sm); margin: 0.75rem 0;">
            <span class="balance-label" style="font-size: 0.75rem; text-transform: uppercase;">Available Balance</span>
            <div class="balance-amount" style="font-size: 1.35rem; font-weight: 800; color: var(--navy-900);">
              $${(parseFloat(acc.balance) || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })} ${acc.currency || 'USD'}
            </div>
          </div>

          <div class="acc-footer" style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.8rem; color: var(--text-secondary); border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
            <div style="display: flex; justify-content: space-between;">
              <span>Branch: <strong>${acc.branch_name || 'Main Branch'}</strong></span>
              <span>${acc.city ? `${acc.city}, ${acc.country || ''}` : (acc.country || '')}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>CBS: <strong>${acc.cbs_account_ref || 'CBS-ACC'}</strong></span>
              ${acc.ifsc_code ? `<span>IFSC: <strong>${acc.ifsc_code}</strong></span>` : ''}
            </div>
          </div>

          <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
            <button type="button" class="btn btn-sm btn-outline-primary" style="flex: 1;" onclick="switchSubView('viewTransfer')">
              <span>💸</span> Transfer
            </button>
            <button type="button" class="btn btn-sm btn-outline" style="flex: 1;" onclick="switchSubView('viewStatement')">
              <span>📄</span> Statement
            </button>
          </div>
        </div>
      `;
    }).join('');

    const regBtn = document.getElementById('openRegisterBankBtn2');
    if (regBtn) {
      regBtn.onclick = () => switchSubView('viewRegisterBank');
    }
  } catch (err) {
    grid.innerHTML = '<div class="empty-state text-danger" style="grid-column: 1 / -1;">Failed to load accounts. Please check your network or try again.</div>';
  }
}

// ================= ALL BANKS NETWORK VIEW =================
async function loadAllBanksView() {
  const grid = document.getElementById('allBanksCatalogGrid');
  if (!grid) return;

  try {
    const res = await API.get('/api/customer/banks');
    const banks = res.data || [];
    grid.innerHTML = banks.map(b => `
      <div class="partner-bank-card">
        <div class="bank-card-top">
          <div class="bank-avatar-badge">${b.bank_code.substring(0, 3)}</div>
          <div>
            <h4 class="bank-card-title">${b.bank_name}</h4>
            <span class="bank-ifsc-prefix">IFSC Prefix: <strong>${b.ifsc_prefix}</strong></span>
          </div>
        </div>
        <div class="bank-card-meta">
          <div class="meta-row"><span>Clearing Networks:</span><strong>${b.network}</strong></div>
          <div class="meta-row"><span>Branch Footprint:</span><strong>${b.branches_count.toLocaleString()} Branches</strong></div>
          <div class="meta-row"><span>RTGS / IMPS Settlement:</span><strong class="text-success">Active 24x7</strong></div>
        </div>
        <button type="button" class="btn btn-outline-primary btn-sm btn-block" onclick="transferToBank('${b.bank_name}', '${b.ifsc_prefix}0001')">
          <span>💸</span> Transfer to this Bank
        </button>
      </div>
    `).join('');
  } catch (err) {
    grid.innerHTML = '<div class="empty-state">Unable to load partner banks catalog.</div>';
  }
}

window.transferToBank = function(bankName, ifscCode) {
  switchSubView('viewTransfer');
  const bName = document.getElementById('transferBankName');
  const bIfsc = document.getElementById('transferIfscCode');
  if (bName) bName.value = bankName;
  if (bIfsc) bIfsc.value = ifscCode;
};

// ================= BANK TRANSFER CONTROLLER =================
function setupTransferView(mode = 'transfer') {
  const sel = document.getElementById('transferSourceAccountSelect');
  if (sel) {
    sel.innerHTML = (state.accounts || []).map(a =>
      `<option value="${a.id}">${a.account_type} (${a.account_number_masked}) - $${a.balance.toFixed(2)}</option>`
    ).join('');
  }

  const heroTitle = el.transferHeroTitle || document.getElementById('transferHeroTitle');
  const heroDesc = el.transferHeroDesc || document.getElementById('transferHeroDesc');
  const recInput = document.getElementById('transferRecipientName');

  if (mode === 'payAnyone') {
    if (heroTitle) heroTitle.textContent = 'Pay Anyone & Peer-to-Peer Transfer';
    if (heroDesc) heroDesc.textContent = 'Send funds instantly to any verified personal contact, family member, or domestic account.';
    if (recInput) setTimeout(() => recInput.focus(), 250);
  } else {
    if (heroTitle) {
      const dict = I18N[state.currentLang] || I18N.en;
      heroTitle.textContent = dict.navBankTransfer || 'Bank Transfer & Fast Wires';
    }
    if (heroDesc) {
      heroDesc.textContent = 'Send funds to any verified bank account with automated safety pre-check';
    }
  }
}

function initTransferMain() {
  const simBtn = document.getElementById('transferSimulateBtn');
  if (simBtn) {
    simBtn.addEventListener('click', async () => {
      const recipientName = document.getElementById('transferRecipientName')?.value.trim();
      const recipientAccount = document.getElementById('transferRecipientAccount')?.value.trim();
      const confirmRecipientAccount = document.getElementById('transferConfirmRecipientAccount')?.value.trim();
      const ifscCode = document.getElementById('transferIfscCode')?.value.trim();
      const amount = parseFloat(document.getElementById('transferAmount')?.value || 0);
      const riskBox = document.getElementById('transferRiskBox');
      const badge = document.getElementById('transferRiskBadge');
      const meter = document.getElementById('transferRiskMeter');
      const warningsDiv = document.getElementById('transferRiskWarnings');
      const remedyDiv = document.getElementById('transferRiskRemedy');

      if (!recipientName || !recipientAccount || !amount) {
        showToast('Please fill in recipient name, account number, and amount.', 'error');
        return;
      }

      try {
        const res = await API.post('/api/customer/transfer', {
          accountId: state.activeAccount?.id,
          recipientName,
          recipientAccount,
          confirmRecipientAccount,
          ifscCode,
          amount,
          simulate: true
        });

        const data = res.data;
        if (riskBox) {
          riskBox.style.display = 'block';
          riskBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          if (badge) {
            badge.textContent = `${data.riskScore} / 100 — ${data.riskLevel} RISK`;
            badge.className = `risk-badge ${data.riskLevel === 'HIGH' ? 'badge-danger' : (data.riskLevel === 'MEDIUM' ? 'badge-warning' : 'badge-success')}`;
          }
          if (meter) {
            meter.style.width = `${data.riskScore}%`;
            meter.style.background = data.riskScore >= 70 ? '#EF4444' : (data.riskScore >= 30 ? '#F59E0B' : '#10B981');
          }
          if (warningsDiv) {
            warningsDiv.innerHTML = (data.warnings || []).map(w => `<div class="risk-warning-item">⚠️ ${w}</div>`).join('');
          }
          if (remedyDiv) {
            remedyDiv.textContent = data.canProceed
              ? 'Transfer details validated. You may click "Confirm & Transfer" below.'
              : 'Hold Active: Your account is restricted. Outgoing wire transfers are paused to safeguard deposits. Please complete Account Recovery first.';
          }
        }
      } catch (err) {
        showToast('Error running transfer safety check', 'error');
      }
    });
  }

  let pendingTransfer = null;

  const closeReviewModal = () => {
    if (el.transferReviewModal) el.transferReviewModal.style.display = 'none';
  };

  if (el.closeTransferReviewBtn) {
    el.closeTransferReviewBtn.addEventListener('click', closeReviewModal);
  }
  if (el.cancelTransferReviewBtn) {
    el.cancelTransferReviewBtn.addEventListener('click', closeReviewModal);
  }

  if (el.transferFinalConfirmBtn) {
    el.transferFinalConfirmBtn.addEventListener('click', async () => {
      if (!pendingTransfer) return;
      const btn = el.transferFinalConfirmBtn;
      btn.disabled = true;
      const originalHtml = btn.innerHTML;
      btn.innerHTML = '<span>⏳</span><span>Authorizing Transfer...</span>';

      const receiptBox = document.getElementById('transferReceiptBox');
      const detailsDiv = document.getElementById('transferReceiptDetails');

      try {
        const res = await API.post('/api/customer/transfer', pendingTransfer.payload);
        btn.disabled = false;
        btn.innerHTML = originalHtml;
        closeReviewModal();

        if (receiptBox) {
          receiptBox.style.display = 'block';
          receiptBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          if (detailsDiv) {
            detailsDiv.innerHTML = `
              <div class="receipt-item"><span>Reference Number:</span><strong>${res.data.referenceNumber}</strong></div>
              <div class="receipt-item"><span>Amount Sent:</span><strong>$${pendingTransfer.amount.toFixed(2)} USD</strong></div>
              <div class="receipt-item"><span>Beneficiary:</span><strong>${pendingTransfer.recipientName} (${pendingTransfer.recipientAccount})</strong></div>
              <div class="receipt-item"><span>Bank:</span><strong>${pendingTransfer.bankName} (${pendingTransfer.ifscCode})</strong></div>
              <div class="receipt-item"><span>Updated Balance:</span><strong>$${res.data.newBalance.toFixed(2)} USD</strong></div>
            `;
          }
        }
        showToast(`Transfer of $${pendingTransfer.amount.toFixed(2)} completed successfully!`, 'success');
        pendingTransfer = null;
        loadCustomerDashboard();
      } catch (err) {
        btn.disabled = false;
        btn.innerHTML = originalHtml;
        closeReviewModal();
        const errMsg = err.response?.data?.error?.message || 'Transfer cannot be completed. Account restricted.';
        showToast(errMsg, 'warning');
      }
    });
  }

  const form = document.getElementById('transferMainForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const recipientName = document.getElementById('transferRecipientName')?.value.trim();
      const recipientAccount = document.getElementById('transferRecipientAccount')?.value.trim();
      const confirmRecipientAccount = document.getElementById('transferConfirmRecipientAccount')?.value.trim();
      const ifscCode = document.getElementById('transferIfscCode')?.value.trim();
      const bankName = document.getElementById('transferBankName')?.value.trim();
      const branchName = document.getElementById('transferBranchName')?.value.trim();
      const branchCode = document.getElementById('transferBranchCode')?.value.trim();
      const amount = parseFloat(document.getElementById('transferAmount')?.value || 0);
      const remarks = document.getElementById('transferRemarks')?.value.trim();

      if (!recipientName || !recipientAccount || !confirmRecipientAccount || !ifscCode || !bankName || !branchName) {
        showToast('Please fill in all required recipient details.', 'error');
        return;
      }
      if (recipientAccount !== confirmRecipientAccount) {
        showToast('Recipient account number and confirmation do not match.', 'error');
        return;
      }
      if (!amount || amount <= 0) {
        showToast('Please enter a valid transfer amount.', 'error');
        return;
      }

      pendingTransfer = {
        amount,
        recipientName,
        recipientAccount,
        bankName,
        ifscCode,
        payload: {
          accountId: state.activeAccount?.id,
          recipientName,
          recipientAccount,
          confirmRecipientAccount,
          ifscCode,
          bankName,
          branchName,
          branchCode,
          amount,
          remarks,
          simulate: false
        }
      };

      if (el.reviewTransferAmount) el.reviewTransferAmount.textContent = `$${amount.toFixed(2)} USD`;
      if (el.reviewSourceAccount) {
        const src = state.activeAccount;
        el.reviewSourceAccount.textContent = src ? `${src.account_type || 'BANK'} (${src.account_number_masked})` : 'Primary Checking';
      }
      if (el.reviewRecipientName) el.reviewRecipientName.textContent = recipientName;
      if (el.reviewRecipientAccount) el.reviewRecipientAccount.textContent = recipientAccount;
      if (el.reviewBankIfsc) el.reviewBankIfsc.textContent = `${bankName} (${ifscCode}) — ${branchName}`;

      if (el.transferReviewModal) el.transferReviewModal.style.display = 'flex';
    });
  }

  const closeReceiptBtn = document.getElementById('closeTransferReceiptBtn');
  if (closeReceiptBtn) {
    closeReceiptBtn.addEventListener('click', () => {
      const box = document.getElementById('transferReceiptBox');
      if (box) box.style.display = 'none';
    });
  }
}

// ================= BILL PAYMENTS CONTROLLER (ALL 8 CATEGORIES & 46 SERVICES) =================
const BILL_SERVICES_CATALOG = [
  // 1. Mobile & communication recharges
  { id: 'srv-mob-prepaid', cat: 'Mobile', name: 'Mobile Prepaid Recharge', icon: '📱', desc: 'Instant talktime, 4G/5G data packs & unlimited roaming' },
  { id: 'srv-mob-postpaid', cat: 'Mobile', name: 'Mobile Postpaid Bill Payment', icon: '📄', desc: 'Monthly postpaid bill clearance with zero convenience fee' },
  { id: 'srv-airtel-rech', cat: 'Mobile', name: 'Airtel Recharge', icon: '📶', desc: 'Prepaid & postpaid Airtel mobility recharge packs' },
  { id: 'srv-jio-rech', cat: 'Mobile', name: 'Jio Recharge', icon: '📶', desc: 'True 5G unlimited plans & JioFiber booster packs' },
  { id: 'srv-vi-rech', cat: 'Mobile', name: 'Vodafone Idea (Vi) Recharge', icon: '📶', desc: 'Hero unlimited night data & weekend rollover packs' },
  { id: 'srv-bsnl-rech', cat: 'Mobile', name: 'BSNL Recharge', icon: '📶', desc: 'National roaming & validity extension recharge packs' },
  { id: 'srv-mtnl-rech', cat: 'Mobile', name: 'MTNL Recharge', icon: '📶', desc: 'Delhi & Mumbai metro circle cellular payments' },
  { id: 'srv-datacard', cat: 'Mobile', name: 'Data Card Recharge', icon: '📡', desc: 'Wireless 4G dongle, Wi-Fi hotspot & MiFi reload' },
  { id: 'srv-landline', cat: 'Mobile', name: 'Landline Bill Payment', icon: '☎️', desc: 'BSNL, MTNL, Airtel, Tata Teleservices fixed wireline' },
  { id: 'srv-broadband', cat: 'Mobile', name: 'Broadband / Internet Bill Payment', icon: '🌐', desc: 'High-speed gigabit optical fiber bill settlement' },

  // 2. Electricity & utility bills
  { id: 'srv-elec-bill', cat: 'Electricity', name: 'Electricity Bill Payment', icon: '⚡', desc: 'State power distribution companies & electricity boards' },
  { id: 'srv-elec-prepaid', cat: 'Electricity', name: 'Prepaid Electricity Meter Recharge', icon: '🔋', desc: 'Smart prepaid electric meters & smart token recharge' },
  { id: 'srv-water-bill', cat: 'Electricity', name: 'Water Bill Payment', icon: '💧', desc: 'Municipal drinking water & sewerage utility boards' },
  { id: 'srv-png-bill', cat: 'Electricity', name: 'Piped Gas (PNG) Bill', icon: '🔥', desc: 'Direct piped natural gas domestic utility connection' },
  { id: 'srv-lpg-cyl', cat: 'Electricity', name: 'LPG Gas Cylinder Booking', icon: '🛢️', desc: 'Indane, Bharat Gas, HP Gas refill cylinder booking' },
  { id: 'srv-cng-gas', cat: 'Electricity', name: 'CNG / Gas Services', icon: '⛽', desc: 'Commercial & domestic compressed natural gas clearing' },
  { id: 'srv-muni-water', cat: 'Electricity', name: 'Municipal Water Charges', icon: '🚿', desc: 'Urban civic corporation water drainage & tax levies' },

  // 3. TV & entertainment
  { id: 'srv-dth-rech', cat: 'DTH', name: 'DTH Recharge', icon: '📺', desc: 'Direct-to-home satellite digital TV monthly channel packs' },
  { id: 'srv-tata-play', cat: 'DTH', name: 'Tata Play Recharge', icon: '🛰️', desc: 'Tata Play (formerly Tata Sky) HD & Binge combos' },
  { id: 'srv-airtel-tv', cat: 'DTH', name: 'Airtel Digital TV Recharge', icon: '🛰️', desc: 'Airtel Xstream Box & HD set-top box recharges' },
  { id: 'srv-dish-tv', cat: 'DTH', name: 'Dish TV Recharge', icon: '🛰️', desc: 'DishTV satellite packages and regional bouquets' },
  { id: 'srv-sun-direct', cat: 'DTH', name: 'Sun Direct Recharge', icon: '🛰️', desc: 'South India & national DTH entertainment packages' },
  { id: 'srv-d2h-rech', cat: 'DTH', name: 'd2h Recharge', icon: '🛰️', desc: 'Videocon d2h channel packs & active services' },
  { id: 'srv-cable-tv', cat: 'DTH', name: 'Cable TV Bill Payment', icon: '🔌', desc: 'Hathway, DEN Networks, Asianet, GTPL cable operators' },
  { id: 'srv-google-play', cat: 'DTH', name: 'Google Play Recharge', icon: '🎮', desc: 'Google Play store redeem codes & in-app subscriptions' },

  // 4. Transport & toll services
  { id: 'srv-fastag', cat: 'Transport', name: 'FASTag Recharge', icon: '🚗', desc: 'National Highway electronic toll collection balance' },
  { id: 'srv-metro-card', cat: 'Transport', name: 'Metro Card Recharge', icon: '🚇', desc: 'Urban rapid transit metro smart travel cards' },
  { id: 'srv-toll-gate', cat: 'Transport', name: 'Toll Gate Payments', icon: '🛣️', desc: 'Expressway & bridge electronic toll transit passes' },
  { id: 'srv-traffic-challan', cat: 'Transport', name: 'Traffic E-Challan Payment', icon: '🚦', desc: 'Traffic police e-challans & state transport fines' },

  // 5. Financial bill payments
  { id: 'srv-loan-emi', cat: 'Financial', name: 'Loan EMI Payment', icon: '🏦', desc: 'Home loan, auto loan, personal loan EMI repayment' },
  { id: 'srv-insurance-prem', cat: 'Financial', name: 'Insurance Premium Payment', icon: '🛡️', desc: 'General, health & vehicle policy premium renewal' },
  { id: 'srv-lic-prem', cat: 'Financial', name: 'LIC Premium Payment', icon: '📜', desc: 'Life Insurance Corporation of India policy dues' },
  { id: 'srv-credit-card-bill', cat: 'Financial', name: 'Credit Card Bill Payment', icon: '💳', desc: 'Instant credit card bill clearance for all banks' },
  { id: 'srv-nps-contrib', cat: 'Financial', name: 'National Pension System (NPS) Contribution', icon: '👴', desc: 'Tier-1 & Tier-2 NPS retirement pension contribution' },

  // 6. Government & municipal payments
  { id: 'srv-property-tax', cat: 'Govt', name: 'Property Tax', icon: '🏛️', desc: 'Annual residential & commercial municipal property tax' },
  { id: 'srv-municipal-tax', cat: 'Govt', name: 'Municipal Tax', icon: '🏢', desc: 'City development, sanitation & conservancy charges' },
  { id: 'srv-water-tax', cat: 'Govt', name: 'Water Tax', icon: '🚰', desc: 'Municipal corporation annual water tax assessments' },
  { id: 'srv-local-body', cat: 'Govt', name: 'Local Body Payments', icon: '🏘️', desc: 'Panchayat, town council & municipal board duties' },
  { id: 'srv-govt-challan', cat: 'Govt', name: 'Government E-Challans', icon: '📑', desc: 'Departmental non-tax receipts & administrative fees' },
  { id: 'srv-civic-payments', cat: 'Govt', name: 'Other supported civic payments', icon: '⚖️', desc: 'Trade licenses, birth/death registrations & civic dues' },

  // 7. Education & housing
  { id: 'srv-school-fees', cat: 'Education', name: 'School Fees', icon: '🎒', desc: 'Primary & secondary school term fee payments' },
  { id: 'srv-college-fees', cat: 'Education', name: 'College Fees', icon: '🎓', desc: 'University semester tuition fees & hostel dues' },
  { id: 'srv-education-fees', cat: 'Education', name: 'Education Fee Payments', icon: '📚', desc: 'Coaching institutions & competitive exam registrations' },
  { id: 'srv-apt-maint', cat: 'Education', name: 'Apartment Maintenance', icon: '🏢', desc: 'Condo association monthly maintenance billing' },
  { id: 'srv-housing-soc', cat: 'Education', name: 'Housing Society Payments', icon: '🏡', desc: 'Cooperative housing society maintenance & sink funds' },
  { id: 'srv-res-assoc', cat: 'Education', name: 'Residential Association Charges', icon: '🏘️', desc: 'Gated community security & amenities subscriptions' },

  // 8. Other services
  { id: 'srv-donations', cat: 'Other', name: 'Donations', icon: '❤️', desc: 'Registered charitable trusts & non-profit organizations' },
  { id: 'srv-devotional', cat: 'Other', name: 'Religious / Devotional Payments', icon: '🛕', desc: 'Temple trusts, shrines & religious welfare trusts' },
  { id: 'srv-subscriptions', cat: 'Other', name: 'Subscription Services', icon: '📦', desc: 'Digital OTT, software SaaS & streaming platforms' },
  { id: 'srv-toll-tax', cat: 'Other', name: 'Toll Tax', icon: '🚙', desc: 'Municipal entry taxes & inter-state vehicle permits' },
  { id: 'srv-other-billers', cat: 'Other', name: 'Other supported billers', icon: '✨', desc: 'All Bharat BillPay (BBPS) clearing network billers' }
];

let activeBillCategory = 'Mobile';

function renderBillServicesGrid(services) {
  const grid = document.getElementById('billServicesCatalogGrid');
  if (!grid) return;

  if (services.length === 0) {
    grid.innerHTML = '<div style="grid-column: 1 / -1; padding: 2rem; text-align: center; color: var(--text-muted); background: #fff; border-radius: 8px;">No bill payment services match your search.</div>';
    return;
  }

  grid.innerHTML = services.map(s => `
    <div class="bill-service-card" onclick="selectBillService('${s.name.replace(/'/g, "\\'")}')" style="background: #ffffff; border: 1.5px solid var(--border); border-radius: 10px; padding: 1rem; cursor: pointer; transition: all 0.2s ease; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
          <span style="font-size: 1.6rem; line-height: 1;">${s.icon}</span>
          <span class="badge" style="background: var(--navy-50); color: var(--navy-900); font-size: 0.68rem; font-weight: 700;">${s.cat}</span>
        </div>
        <strong style="color: var(--navy-900); font-size: 0.92rem; display: block; margin-bottom: 0.3rem;">${s.name}</strong>
        <p style="margin: 0; font-size: 0.76rem; color: var(--text-secondary); line-height: 1.35;">${s.desc}</p>
      </div>
      <div style="margin-top: 0.85rem; padding-top: 0.6rem; border-top: 1px dashed var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.72rem; color: var(--success); font-weight: 700;">⚡ Instant CBS Clearing</span>
        <span style="font-size: 0.78rem; color: var(--primary); font-weight: 800;">Pay Now →</span>
      </div>
    </div>
  `).join('');
}

window.selectBillService = function(serviceName) {
  const billerSel = document.getElementById('billBillerSelect');
  if (billerSel) {
    let exists = false;
    for (let i = 0; i < billerSel.options.length; i++) {
      if (billerSel.options[i].value === serviceName) {
        billerSel.selectedIndex = i;
        exists = true;
        break;
      }
    }
    if (!exists) {
      const opt = new Option(serviceName, serviceName, true, true);
      billerSel.add(opt);
      billerSel.value = serviceName;
    }
  }

  const numInput = document.getElementById('billConsumerNum');
  if (numInput) {
    numInput.placeholder = `Enter Consumer ID / Account # for ${serviceName}`;
    numInput.focus();
  }

  const form = document.getElementById('billPayForm');
  if (form) {
    form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  showToast(`Selected: ${serviceName}. Enter Consumer Number to clear.`, 'info');
};

function setupBillPayView() {
  const sel = document.getElementById('billSourceAccountSelect');
  if (sel) {
    sel.innerHTML = (state.accounts || []).map(a =>
      `<option value="${a.id}">${a.account_type} (${a.account_number_masked}) - $${(parseFloat(a.balance) || 0).toFixed(2)}</option>`
    ).join('');
  }

  // Populate biller dropdown with all 46 services
  const billerSel = document.getElementById('billBillerSelect');
  if (billerSel) {
    billerSel.innerHTML = BILL_SERVICES_CATALOG.map(s =>
      `<option value="${s.name}">${s.name} (${s.cat})</option>`
    ).join('');
  }

  activateBillCat(activeBillCategory);
}

function activateBillCat(cat) {
  activeBillCategory = cat;
  const pills = document.querySelectorAll('.bill-cat-pill');
  pills.forEach(p => {
    if (p.getAttribute('data-cat') === cat) p.classList.add('active');
    else p.classList.remove('active');
  });

  const searchInput = document.getElementById('billServiceSearchInput');
  if (searchInput && searchInput.value.trim().length > 0) {
    const q = searchInput.value.trim().toLowerCase();
    const filtered = BILL_SERVICES_CATALOG.filter(s => s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q));
    renderBillServicesGrid(filtered);
    return;
  }

  const catServices = BILL_SERVICES_CATALOG.filter(s => s.cat === cat);
  renderBillServicesGrid(catServices);
}

function initBillPay() {
  const catPills = document.querySelectorAll('.bill-cat-pill');
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cat = pill.getAttribute('data-cat');
      activateBillCat(cat);
    });
  });

  const searchInput = document.getElementById('billServiceSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) {
        activateBillCat(activeBillCategory);
        return;
      }
      const matches = BILL_SERVICES_CATALOG.filter(s =>
        s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q) || s.cat.toLowerCase().includes(q)
      );
      renderBillServicesGrid(matches);
    });
  }

  const simBtn = document.getElementById('billSimulateBtn');
  if (simBtn) {
    simBtn.addEventListener('click', async () => {
      const biller = document.getElementById('billBillerSelect')?.value;
      const num = document.getElementById('billConsumerNum')?.value.trim();
      const amount = parseFloat(document.getElementById('billAmountInput')?.value || 0);
      const riskBox = document.getElementById('billRiskBox');
      const warningsDiv = document.getElementById('billRiskWarnings');

      try {
        const res = await API.post('/api/customer/bill-pay', {
          accountId: state.activeAccount?.id,
          billerName: biller,
          consumerNumber: num,
          amount,
          simulate: true
        });

        if (riskBox) {
          riskBox.style.display = 'block';
          if (warningsDiv) {
            warningsDiv.innerHTML = (res.data.warnings || []).map(w => `<div>⚠️ ${w}</div>`).join('') ||
              '<div class="text-success">✓ Bill account valid and authenticated. Ready for instant clearing.</div>';
          }
        }
      } catch (err) {
        showToast('Error validating bill', 'error');
      }
    });
  }

  const form = document.getElementById('billPayForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      const biller = document.getElementById('billBillerSelect')?.value;
      const num = document.getElementById('billConsumerNum')?.value.trim();
      const amount = parseFloat(document.getElementById('billAmountInput')?.value || 0);
      const receiptBox = document.getElementById('billReceiptBox');
      const detailsDiv = document.getElementById('billReceiptDetails');

      try {
        const res = await API.post('/api/customer/bill-pay', {
          accountId: state.activeAccount?.id,
          billerName: biller,
          consumerNumber: num,
          amount,
          simulate: false
        });

        if (submitBtn) submitBtn.disabled = false;

        if (receiptBox) {
          receiptBox.style.display = 'block';
          if (detailsDiv) {
            detailsDiv.innerHTML = `
              <div class="receipt-item"><span>Reference Number:</span><strong>${res.data.referenceNumber}</strong></div>
              <div class="receipt-item"><span>Biller:</span><strong>${biller}</strong></div>
              <div class="receipt-item"><span>Consumer ID:</span><strong>${num}</strong></div>
              <div class="receipt-item"><span>Amount Paid:</span><strong>$${amount.toFixed(2)} USD</strong></div>
              <div class="receipt-item"><span>Updated Balance:</span><strong>$${res.data.newBalance.toFixed(2)} USD</strong></div>
            `;
          }
        }
        showToast(`Paid $${amount.toFixed(2)} to ${biller}!`, 'success');
        loadCustomerDashboard();
      } catch (err) {
        if (submitBtn) submitBtn.disabled = false;
        showToast(err.response?.data?.error?.message || 'Bill payment blocked. Account restricted.', 'warning');
      }
    });
  }

  const closeReceiptBtn = document.getElementById('closeBillReceiptBtn');
  if (closeReceiptBtn) {
    closeReceiptBtn.addEventListener('click', () => {
      const box = document.getElementById('billReceiptBox');
      if (box) box.style.display = 'none';
    });
  }
}

// ================= BANK DEPOSITS CONTROLLER =================
async function loadDepositsView() {
  const container = document.getElementById('activeDepositsContainer');

  // Compute Credits vs Withdrawals from transactions ledger
  try {
    const txRes = await API.get('/api/customer/transactions');
    const txns = txRes.data || [];
    let credited = 0;
    let withdrawn = 0;

    txns.forEach(t => {
      const amt = parseFloat(t.amount) || 0;
      if (t.direction === 'CREDIT' || t.transaction_type === 'INTEREST') {
        credited += amt;
      } else {
        withdrawn += amt;
      }
    });

    const baseBalance = (state.accounts || []).reduce((sum, a) => sum + (parseFloat(a.balance) || 0), 0);
    if (credited === 0 && baseBalance > 0) {
      credited = baseBalance + 148250;
      withdrawn = 42180;
    }

    const netSavings = credited - withdrawn;

    const elCredited = document.getElementById('depTotalCreditedAmount');
    const elWithdrawn = document.getElementById('depTotalWithdrawnAmount');
    const elNet = document.getElementById('depNetSavingsAmount');
    const elActiveTotal = document.getElementById('depActiveDepositsCount');

    if (elCredited) elCredited.textContent = `+$${credited.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (elWithdrawn) elWithdrawn.textContent = `-$${withdrawn.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (elNet) elNet.textContent = `+$${netSavings.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  } catch (e) {
    console.error('Error computing cashflow metrics', e);
  }

  if (!container) return;

  try {
    const res = await API.get('/api/customer/deposits');
    const deposits = res.data || [];

    const totalDepositValue = deposits.reduce((sum, d) => sum + (parseFloat(d.principal_amount) || 0), 0);
    const elActiveTotal = document.getElementById('depActiveDepositsCount');
    if (elActiveTotal) {
      elActiveTotal.textContent = `$${totalDepositValue.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD`;
    }

    if (deposits.length === 0) {
      container.innerHTML = '<div class="empty-state">No term deposits opened yet. Use the calculator below to open one.</div>';
      return;
    }

    container.innerHTML = deposits.map(d => `
      <div class="deposit-card">
        <div class="deposit-card-header">
          <span class="deposit-type-tag">${d.deposit_type.replace('_', ' ')}</span>
          <span class="badge badge-success">${d.status}</span>
        </div>
        <div class="deposit-card-amount">$${parseFloat(d.principal_amount).toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</div>
        <div class="deposit-card-meta">
          <div class="meta-row"><span>Interest Rate:</span><strong class="text-success">${d.interest_rate}% p.a.</strong></div>
          <div class="meta-row"><span>Tenure:</span><strong>${d.tenure_months} Months</strong></div>
          <div class="meta-row"><span>Maturity Value:</span><strong>$${parseFloat(d.maturity_amount).toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</strong></div>
          <div class="meta-row"><span>Maturity Date:</span><strong>${d.maturity_date}</strong></div>
        </div>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = '<div class="empty-state">Unable to load deposits.</div>';
  }
}

function updateDepositCalcPreview() {
  const principal = parseFloat(document.getElementById('depositPrincipalInput')?.value || 5000);
  const tenure = parseInt(document.getElementById('depositTenureSelect')?.value || 12, 10);
  const rateDisplay = document.getElementById('depositRateDisplay');
  const matDisplay = document.getElementById('depositMaturityDisplay');

  const rate = tenure >= 24 ? 7.10 : (tenure >= 12 ? 6.85 : 5.50);
  const maturity = principal * (1 + (rate / 100) * (tenure / 12));

  if (rateDisplay) rateDisplay.textContent = `${rate.toFixed(2)}%`;
  if (matDisplay) matDisplay.textContent = `$${maturity.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
}

function initDeposits() {
  const principalInput = document.getElementById('depositPrincipalInput');
  const tenureSelect = document.getElementById('depositTenureSelect');
  if (principalInput) principalInput.addEventListener('input', updateDepositCalcPreview);
  if (tenureSelect) tenureSelect.addEventListener('change', updateDepositCalcPreview);

  const form = document.getElementById('createDepositForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      const depositType = document.getElementById('depositTypeSelect')?.value;
      const principalAmount = parseFloat(document.getElementById('depositPrincipalInput')?.value || 0);
      const tenureMonths = parseInt(document.getElementById('depositTenureSelect')?.value || 12, 10);

      try {
        await API.post('/api/customer/deposits', {
          accountId: state.activeAccount?.id,
          depositType,
          principalAmount,
          tenureMonths
        });

        if (submitBtn) submitBtn.disabled = false;
        showToast('Deposit account opened successfully!', 'success');
        loadDepositsView();
      } catch (err) {
        if (submitBtn) submitBtn.disabled = false;
        showToast(err.response?.data?.error?.message || 'Error opening deposit', 'error');
      }
    });
  }
}

// ================= CARDS CONTROLLER (DEBIT & CREDIT CARDS WITH TYPES) =================
let allCustomerCards = [];
let currentCardFilter = 'ALL';

window.filterCardsView = function(filter) {
  currentCardFilter = filter;
  const btnAll = document.getElementById('cardFilterAllBtn');
  const btnDebit = document.getElementById('cardFilterDebitBtn');
  const btnCredit = document.getElementById('cardFilterCreditBtn');

  if (btnAll) btnAll.className = `btn btn-sm ${filter === 'ALL' ? 'btn-primary' : 'btn-outline'}`;
  if (btnDebit) btnDebit.className = `btn btn-sm ${filter === 'DEBIT' ? 'btn-primary' : 'btn-outline'}`;
  if (btnCredit) btnCredit.className = `btn btn-sm ${filter === 'CREDIT' ? 'btn-primary' : 'btn-outline'}`;

  renderCardsDisplay();
};

function renderCardsDisplay() {
  const container = document.getElementById('cardsContainer');
  if (!container) return;

  let filtered = allCustomerCards;
  if (currentCardFilter === 'DEBIT') {
    filtered = allCustomerCards.filter(c => c.card_type.toLowerCase().includes('debit'));
  } else if (currentCardFilter === 'CREDIT') {
    filtered = allCustomerCards.filter(c => c.card_type.toLowerCase().includes('credit'));
  }

  if (filtered.length === 0) {
    container.innerHTML = '<div class="empty-state" style="grid-column: 1 / -1;">No cards found for selected category.</div>';
    return;
  }

  container.innerHTML = filtered.map(c => {
    const isCredit = c.card_type.toLowerCase().includes('credit');
    const isRuPay = c.card_type.toLowerCase().includes('rupay');
    const isVisa = c.card_type.toLowerCase().includes('visa');
    const isMaster = c.card_type.toLowerCase().includes('master');
    const networkBadge = isRuPay ? 'RuPay' : (isVisa ? 'VISA' : (isMaster ? 'Mastercard' : 'CBS Direct'));
    const gradient = isCredit
      ? 'linear-gradient(135deg, #1e1b4b, #312e81, #0f172a)'
      : 'linear-gradient(135deg, #064e3b, #047857, #065f46)';

    return `
      <div class="rebank-card-item">
        <div class="bank-card-visual" style="background: ${gradient}; border-radius: 14px; padding: 1.5rem; color: #fff; min-height: 200px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.25); position: relative; overflow: hidden;">
          <div style="position: absolute; right: -20px; top: -20px; width: 100px; height: 100px; border-radius: 50%; background: rgba(255,255,255,0.06);"></div>
          <div class="card-visual-header" style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span class="card-chip" style="width: 38px; height: 28px; background: #fbbf24; border-radius: 4px; display: inline-block; border: 1px solid #d97706;"></span>
              <span style="font-size: 0.72rem; letter-spacing: 1px; font-weight: 700; color: rgba(255,255,255,0.75);">CONTACTLESS</span>
            </div>
            <span style="font-size: 1.1rem; font-weight: 900; letter-spacing: 1px;">${networkBadge}</span>
          </div>

          <div>
            <div style="font-size: 0.72rem; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.7); margin-bottom: 2px;">
              ${isCredit ? 'CREDIT CARD' : 'DEBIT CARD'} &bull; ${c.card_type}
            </div>
            <div class="card-visual-number" style="font-size: 1.35rem; font-family: monospace; letter-spacing: 3px; font-weight: 700;">
              ${c.card_number_masked}
            </div>
          </div>

          <div class="card-visual-footer" style="display: flex; justify-content: space-between; align-items: flex-end;">
            <div>
              <div style="font-size: 0.68rem; text-transform: uppercase; color: rgba(255,255,255,0.65);">Cardholder</div>
              <div class="card-holder-name" style="font-weight: 700; font-size: 0.95rem; text-transform: uppercase;">${c.cardholder_name}</div>
            </div>
            <div style="text-align: right;">
              <div style="font-size: 0.68rem; text-transform: uppercase; color: rgba(255,255,255,0.65);">Expires</div>
              <div class="card-exp" style="font-family: monospace; font-weight: 700; font-size: 0.9rem;">${c.expiry_date}</div>
            </div>
          </div>
        </div>

        <div class="card-controls-card">
          <div class="card-type-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <div>
              <h4 style="margin: 0; font-size: 1rem; font-weight: 800; color: var(--navy-900);">${c.card_type}</h4>
              <span style="font-size: 0.72rem; color: var(--text-muted);">${isCredit ? 'Pre-Approved Credit Limit: $150,000 USD' : 'Daily Cash ATM Limit: $50,000 USD'}</span>
            </div>
            <span class="badge ${c.status === 'ACTIVE' ? 'badge-success' : 'badge-danger'}">${c.status}</span>
          </div>

          <div class="card-toggle-row">
            <div>
              <strong>Online Transactions (E-Commerce)</strong>
              <div class="text-muted">Enable or disable online payment gateways & POS</div>
            </div>
            <label class="switch">
              <input type="checkbox" ${c.is_online_enabled ? 'checked' : ''} onchange="toggleCardSetting('${c.id}', 'is_online_enabled', this.checked)">
              <span class="slider round"></span>
            </label>
          </div>

          <div class="card-toggle-row">
            <div>
              <strong>International Usage</strong>
              <div class="text-muted">Global merchant clearing & ATM currency conversion</div>
            </div>
            <label class="switch">
              <input type="checkbox" ${c.is_international_enabled ? 'checked' : ''} onchange="toggleCardSetting('${c.id}', 'is_international_enabled', this.checked)">
              <span class="slider round"></span>
            </label>
          </div>

          <div class="card-toggle-row">
            <div>
              <strong>Instant Safety Freeze</strong>
              <div class="text-muted">Lock card instantly against unauthorized debits</div>
            </div>
            <button type="button" class="btn btn-sm ${c.status === 'FROZEN' ? 'btn-success' : 'btn-outline-danger'}" onclick="toggleCardStatus('${c.id}', '${c.status}')">
              ${c.status === 'FROZEN' ? '🔓 Unfreeze Card' : '🔒 Freeze Card'}
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

async function loadCardsView() {
  const container = document.getElementById('cardsContainer');
  if (!container) return;

  try {
    const res = await API.get('/api/customer/cards');
    allCustomerCards = res.data || [];
    renderCardsDisplay();
  } catch (err) {
    container.innerHTML = '<div class="empty-state">Unable to load cards.</div>';
  }
}

window.toggleCardSetting = async function(cardId, field, value) {
  try {
    await API.post('/api/customer/cards/toggle', { cardId, field, value });
    showToast('Card settings updated!', 'success');
  } catch (err) {
    showToast('Failed to update card setting', 'error');
  }
};

window.toggleCardStatus = async function(cardId, currentStatus) {
  const newStatus = currentStatus === 'FROZEN' ? 'ACTIVE' : 'FROZEN';
  try {
    await API.post('/api/customer/cards/toggle', { cardId, field: 'status', value: newStatus });
    showToast(newStatus === 'FROZEN' ? 'Card frozen for safety!' : 'Card unfreezed and active!', 'success');
    loadCardsView();
  } catch (err) {
    showToast('Failed to toggle card freeze status', 'error');
  }
};

function initCards() {}

// ================= ACCOUNT STATEMENT & CSV EXPORT CONTROLLER =================
let currentTxns = [];

async function loadStatementView() {
  const sel = document.getElementById('stmtAccountSelect');
  if (sel) {
    sel.innerHTML = '<option value="">All Customer Accounts</option>' + (state.accounts || []).map(a =>
      `<option value="${a.id}">${a.account_type} (${a.account_number_masked})</option>`
    ).join('');
  }

  await fetchAndRenderStatement();
}

async function fetchAndRenderStatement() {
  const tbody = document.getElementById('stmtTableBody');
  if (!tbody) return;

  const accountId = document.getElementById('stmtAccountSelect')?.value || '';
  const type = document.getElementById('stmtTypeFilter')?.value || '';
  const search = document.getElementById('stmtSearchInput')?.value.trim() || '';

  try {
    const params = new URLSearchParams();
    if (accountId) params.append('accountId', accountId);
    if (type) params.append('type', type);
    if (search) params.append('search', search);

    const res = await API.get(`/api/customer/transactions?${params.toString()}`);
    currentTxns = res.data || [];

    // Calculate Inflow & Outflow amounts
    let inflow = 0;
    let outflow = 0;
    currentTxns.forEach(t => {
      const amt = parseFloat(t.amount) || 0;
      if (t.direction === 'CREDIT' || t.transaction_type === 'INTEREST') {
        inflow += amt;
      } else {
        outflow += amt;
      }
    });

    const primaryBal = state.activeAccount ? (parseFloat(state.activeAccount.balance) || 12450) : 12450;
    const elInflow = document.getElementById('stmtTotalInflowDisplay');
    const elOutflow = document.getElementById('stmtTotalOutflowDisplay');
    const elBal = document.getElementById('stmtClosingBalanceDisplay');
    const elCount = document.getElementById('stmtTxnCountDisplay');

    if (elInflow) elInflow.textContent = `+$${inflow.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (elOutflow) elOutflow.textContent = `-$${outflow.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (elBal) elBal.textContent = `$${primaryBal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`;
    if (elCount) elCount.textContent = `${currentTxns.length} Records`;

    if (currentTxns.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted" style="padding: 2rem;">No matching transactions found.</td></tr>';
      return;
    }

    tbody.innerHTML = currentTxns.map(t => {
      const isDebit = t.direction === 'DEBIT';
      const dateFormatted = t.created_at ? t.created_at.split('T')[0] : '2026-10-18';
      return `
        <tr>
          <td><span class="tx-date-badge">${dateFormatted}</span></td>
          <td>
            <strong>${t.description}</strong>
            <div style="font-size: 0.73rem; color: var(--text-muted);">${t.recipient_name || 'CBS Direct'}</div>
          </td>
          <td><span class="type-pill">${t.transaction_type}</span></td>
          <td>
            <strong class="${isDebit ? 'text-danger' : 'text-success'}" style="font-size: 0.95rem;">
              ${isDebit ? '-' : '+'}$${parseFloat(t.amount).toFixed(2)}
            </strong>
          </td>
          <td><span class="badge badge-success">${t.status}</span></td>
          <td><code style="font-size: 0.72rem;">${t.reference_number}</code></td>
        </tr>
      `;
    }).join('');
  } catch (err) {
    tbody.innerHTML = '<tr><td colspan="6" class="text-center text-danger">Failed to load transactions.</td></tr>';
  }
}

function exportStatementCsv() {
  if (!currentTxns || currentTxns.length === 0) {
    showToast('No transactions available to download.', 'warning');
    return;
  }

  const headers = ['Date', 'Transaction ID', 'Type', 'Description', 'Payee / Recipient', 'Direction', 'Amount (USD)', 'Status'];
  const rows = currentTxns.map(t => [
    `"${t.created_at || ''}"`,
    `"${t.reference_number || t.id}"`,
    `"${t.transaction_type}"`,
    `"${(t.description || '').replace(/"/g, '""')}"`,
    `"${(t.recipient_name || '').replace(/"/g, '""')}"`,
    `"${t.direction}"`,
    `"${t.amount.toFixed(2)}"`,
    `"${t.status}"`
  ]);

  const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `ReBank_Statement_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Account statement downloaded (CSV)', 'success');
}

function debounce(fn, delay = 300) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function initStatement() {
  const sel = document.getElementById('stmtAccountSelect');
  const typeFilter = document.getElementById('stmtTypeFilter');
  const searchInput = document.getElementById('stmtSearchInput');
  const csvBtn = document.getElementById('downloadStatementCsvBtn');

  if (sel) sel.addEventListener('change', fetchAndRenderStatement);
  if (typeFilter) typeFilter.addEventListener('change', fetchAndRenderStatement);
  if (searchInput) searchInput.addEventListener('input', debounce(fetchAndRenderStatement, 300));
  if (csvBtn) csvBtn.addEventListener('click', exportStatementCsv);
}

// ================= FULL PAGE COMMUNICATION WITH AI =================
function setupAiChatView() {
  const container = document.getElementById('fullAiChatMessages');
  if (!container || container.children.length > 0) return;

  const welcome = state.currentLang === 'ta'
    ? 'Vanakkam! Ungal account ippo temporary-ah lock aagiyirukku. Yen nu check pannalaam; adutha step-la naan help panren.'
    : (state.currentLang === 'hi'
      ? 'नमस्ते! मैं आपका ReBank AI सहायक हूँ। आपका खाता अभी अस्थायी रूप से लॉक है। आइए देखें क्यों, और इसे वापस पाने में मैं आपकी मदद करता हूँ।'
      : "Hello! I'm your ReBank AI Assistant. Your account is temporarily locked. Let's check why and see how to get it back.");

  container.innerHTML = `
    <div class="chat-msg bot">
      <div class="msg-bubble">${welcome}</div>
      <div class="msg-meta">ReBank Staff AI &bull; Just now</div>
    </div>
  `;
}

async function sendFullAiChatMessage(text) {
  if (!text) return;
  const container = document.getElementById('fullAiChatMessages');
  const typing = document.getElementById('fullAiChatTyping');
  const input = document.getElementById('fullAiChatInput');

  if (input) input.value = '';

  if (container) {
    container.innerHTML += `
      <div class="chat-msg user">
        <div class="msg-bubble">${text}</div>
        <div class="msg-meta">You &bull; Just now</div>
      </div>
    `;
    container.scrollTop = container.scrollHeight;
  }

  if (typing) typing.style.display = 'flex';

  try {
    const res = await API.post('/api/chat/message', {
      message: text,
      language: state.currentLang,
      accountId: state.activeAccount?.id
    });

    if (typing) typing.style.display = 'none';

    if (container) {
      container.innerHTML += `
        <div class="chat-msg bot">
          <div class="msg-bubble">${res.data.reply}</div>
          <div class="msg-meta">ReBank Staff AI &bull; Just now</div>
        </div>
      `;
      container.scrollTop = container.scrollHeight;
    }
  } catch (err) {
    if (typing) typing.style.display = 'none';
  }
}

function initFullAiChat() {
  const form = document.getElementById('fullAiChatForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const txt = document.getElementById('fullAiChatInput')?.value.trim();
      if (txt) sendFullAiChatMessage(txt);
    });
  }

  const chips = [
    { id: 'fullChipWhyLocked', text: 'Why is my account locked?' },
    { id: 'fullChipHelpRecover', text: 'Help me recover my account' },
    { id: 'fullChipCheckTransfer', text: 'Check transfer safety' },
    { id: 'fullChipTrackRecovery', text: 'Track my recovery' }
  ];

  chips.forEach(c => {
    const btn = document.getElementById(c.id);
    if (btn) btn.addEventListener('click', () => sendFullAiChatMessage(c.text));
  });
}

// ================= CONTACT US CONTROLLER (ALL BANKS TOLL-FREE NUMBERS & OMBUDSMAN) =================
let allContactBanks = [];

function renderContactBanksGrid(banks) {
  const grid = document.getElementById('contactBanksTollFreeGrid');
  if (!grid) return;

  if (banks.length === 0) {
    grid.innerHTML = '<div style="grid-column: 1 / -1; padding: 1.5rem; text-align: center; color: var(--text-muted); background: var(--navy-50); border-radius: 8px;">No bank matched your helpline search.</div>';
    return;
  }

  grid.innerHTML = banks.map(b => {
    const tollFree = b.toll_free || '1800 120 0000';
    const primaryPhone = tollFree.split('/')[0].trim().replace(/\s+/g, '');
    return `
      <div class="partner-bank-card" style="background: #ffffff; border: 1.5px solid var(--border); border-radius: 10px; padding: 1.15rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 1px 4px rgba(0,0,0,0.04);">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
            <div style="width: 44px; height: 44px; border-radius: 8px; background: var(--navy-900); color: #fff; font-weight: 800; font-size: 0.95rem; display: flex; align-items: center; justify-content: center;">
              ${(b.bank_code || 'BNK').substring(0, 4)}
            </div>
            <span class="badge badge-success" style="font-size: 0.7rem;">24x7 HELPLINE</span>
          </div>
          <h4 style="margin: 0.2rem 0; font-size: 1.05rem; font-weight: 800; color: var(--navy-900);">${b.bank_name}</h4>
          <span style="font-size: 0.75rem; color: var(--text-muted);">IFSC Code Prefix: <strong>${b.ifsc_prefix || 'SBIN'}</strong></span>
        </div>

        <div style="margin-top: 1rem; padding-top: 0.85rem; border-top: 1px dashed var(--border-subtle);">
          <div style="font-size: 0.72rem; text-transform: uppercase; color: var(--text-muted); font-weight: 700; margin-bottom: 2px;">Toll-Free Numbers</div>
          <strong style="color: #047857; font-size: 0.95rem; display: block; margin-bottom: 0.75rem;">${tollFree}</strong>
          <a href="tel:${primaryPhone}" class="btn btn-sm btn-outline-primary" style="width: 100%; text-align: center; justify-content: center; text-decoration: none;">
            <span>📞</span> Call ${tollFree.split('/')[0].trim()}
          </a>
        </div>
      </div>
    `;
  }).join('');
}

async function loadContactView() {
  const list = document.getElementById('contactComplaintsList');
  const section = document.getElementById('contactComplaintsSection');

  // Load complaints
  try {
    const res = await API.get('/api/complaints/my');
    const complaints = res.data || [];
    if (complaints.length > 0 && section && list) {
      section.style.display = 'block';
      list.innerHTML = complaints.map(c => `
        <div class="complaint-card" style="background: #F8FAFC; border: 1px solid var(--border); border-radius: 8px; padding: 0.85rem; margin-bottom: 0.6rem;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong>${c.subject}</strong>
            <span class="badge ${c.status === 'RESOLVED' ? 'badge-success' : 'badge-warning'}">${c.status}</span>
          </div>
          <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.35rem;">${c.description}</div>
          <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 0.25rem;">Ref: ${c.id} &bull; Tier ${c.escalation_tier || 1} Escalation</div>
        </div>
      `).join('');
    }
  } catch (e) {}

  // Load all 24 partner banks toll-free directory
  try {
    const bRes = await API.get('/api/customer/banks');
    allContactBanks = bRes.data || [];
    renderContactBanksGrid(allContactBanks);
  } catch (e) {
    console.error('Failed to load banks for contact directory', e);
  }
}

function initContactUs() {
  const searchInput = document.getElementById('contactBankSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) {
        renderContactBanksGrid(allContactBanks);
        return;
      }
      const matches = allContactBanks.filter(b =>
        b.bank_name.toLowerCase().includes(q) ||
        (b.bank_code && b.bank_code.toLowerCase().includes(q)) ||
        (b.toll_free && b.toll_free.toLowerCase().includes(q))
      );
      renderContactBanksGrid(matches);
    });
  }

  const form = document.getElementById('contactGrievanceForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const subject = document.getElementById('contactCompSubject')?.value.trim();
      const category = document.getElementById('contactCompCategory')?.value;
      const description = document.getElementById('contactCompDescription')?.value.trim();

      try {
        const res = await API.post('/api/complaints', { subject, category, description });
        showToast(`Grievance submitted successfully. Tracking ticket: ${res.data.id}`, 'success');
        form.reset();
        loadContactView();
      } catch (err) {
        showToast('Error filing grievance', 'error');
      }
    });
  }
}

// ================= BANK ACCOUNT LOCK REASONS & RESOLUTION ENCYCLOPEDIA =================
const lockReasonsState = {
  data: [],
  currentCategory: 'ALL',
  searchQuery: '',
  activeHighlightCode: null
};

// Fallback catalog in case of network interruption
const LOCK_REASONS_FALLBACK = [
  {
    code: 'KYC_EXPIRED',
    category: 'KYC & Identity',
    categoryKey: 'catKyc',
    title: 'KYC Periodic Review Expired / Non-Compliance',
    titleTa: 'கேஒய்சி காலாவதி / சட்டப்பூர்வ புதுப்பித்தல் நிலுவை',
    titleHi: 'केवाईसी समयसीमा समाप्त / गैर-अनुपालन रोक',
    regulatoryMandate: 'RBI Master Direction - KYC (Sec 38) / US FinCEN CDD Rule',
    plainExplanation: 'Statutory Customer Due Diligence (CDD) periodic update is overdue. Banks are legally mandated to pause outbound transactions until updated official identification is submitted.',
    plainExplanationTa: 'சட்டப்பூர்வ வாடிக்கையாளர் சரிபார்ப்பு (CDD) காலாவதியாகிவிட்டது. அடையாளம் புதுப்பிக்கப்படும் வரை வெளியேறும் பரிவர்த்தனைகள் நிறுத்தப்படுகின்றன.',
    plainExplanationHi: 'सांविधिक ग्राहक सत्यापन (सीडीडी) की समयसीमा समाप्त हो गई है। नवीनीकृत दस्तावेज जमा होने तक डेबिट निकासी रोक दी जाती है।',
    operationsMatrix: { debitsAllowed: false, creditsAllowed: true, atmAllowed: false, netBankingAllowed: false, upiAllowed: false },
    remediationSteps: [
      { step: 1, title: 'Upload Official ID', description: 'Submit Passport, Voter ID, Driver License or Aadhaar with current residential address.' },
      { step: 2, title: 'Complete Biometric Liveness', description: 'Perform 5-second in-app facial liveness scan.' },
      { step: 3, title: 'Maker Review L1', description: 'Bank operations officer verifies OCR document matches.' },
      { step: 4, title: 'Automated CBS Unfreeze', description: 'Hold removed within 2-4 hours upon Checker L2 sign-off.' }
    ],
    requiredDocuments: ['Government Photo ID (Passport/Aadhaar/DL)', 'Proof of Current Address (Utility bill < 90 days)', 'Facial Biometric Liveness Capture'],
    slaHours: 4,
    riskTier: 'LOW',
    selfServiceAvailable: true
  },
  {
    code: 'DORMANT_INACTIVE',
    category: 'Account Inactivity',
    categoryKey: 'catInactivity',
    title: 'Dormant / Inactive Account (No Transactions for 12-24 Months)',
    titleTa: 'செயலற்ற கணக்கு (12-24 மாதங்களாக பரிவர்த்தனை இல்லை)',
    titleHi: 'निष्क्रिय / डोर्मेंट खाता (12-24 महीनों से कोई लेनदेन नहीं)',
    regulatoryMandate: 'RBI Dormancy Circular DBR.No.Leg.BC.21/09.07.006 / State Unclaimed Property Laws',
    plainExplanation: 'Account automatically converted to inoperative status to safeguard unclaimed balances from unauthorized internal or external access.',
    plainExplanationTa: 'நீண்டகாலமாக பயன்படுத்தப்படாத கணக்குகள் மோசடிகளில் இருந்து பாதுகாக்க தானாகவே முடக்கப்படுகின்றன.',
    plainExplanationHi: 'अनधिकृत पहुंच से अप्रयुक्त शेष राशि की सुरक्षा के लिए खाते को स्वचालित रूप से निष्क्रिय स्थिति में स्थानांतरित किया गया है।',
    operationsMatrix: { debitsAllowed: false, creditsAllowed: true, atmAllowed: false, netBankingAllowed: false, upiAllowed: false },
    remediationSteps: [
      { step: 1, title: 'Self-Service Reactivation', description: 'Submit digital reactivation request with active identity confirmation.' },
      { step: 2, title: 'Token Financial Transaction', description: 'Execute a verified credit/deposit or small in-branch / online transaction.' },
      { step: 3, title: 'Instant Status Restoration', description: 'CBS flags account back to ACTIVE within 12 hours.' }
    ],
    requiredDocuments: ['Recent ID confirmation', 'Customer Signature / Liveness Verification'],
    slaHours: 12,
    riskTier: 'LOW',
    selfServiceAvailable: true
  },
  {
    code: 'AML_SUSPICIOUS_TXN',
    category: 'Compliance & AML',
    categoryKey: 'catAml',
    title: 'Anti-Money Laundering (AML) / Unusual Velocity Alert',
    titleTa: 'பணமோசடி தடுப்பு (AML) / சந்தேகத்திற்கிடமான பணப்பரிமாற்றம்',
    titleHi: 'एंटी-मनी लॉन्ड्रिंग (एएमएल) / असामान्य लेन-देन वेग चेतावनी',
    regulatoryMandate: 'Prevention of Money Laundering Act (PMLA) 2002 / US Bank Secrecy Act (BSA) & FinCEN SAR rules',
    plainExplanation: 'Automated fraud and transaction monitoring engines flagged unusual transaction volume, sudden structuring, or atypical inbound credits exceeding established behavioral profiles.',
    plainExplanationTa: 'வழக்கத்திற்கு மாறான பெரிய தொகை பரிமாற்றம் அல்லது தொடர் பரிவர்த்தனைகள் பணமோசடி தடுப்பு அல்காரிதம்களால் கொடியிடப்பட்டுள்ளது.',
    plainExplanationHi: 'असामान्य लेनदेन की मात्रा या अचानक हुए भारी स्थानांतरण के कारण धोखाधड़ी रोकथाम प्रणाली द्वारा खाता अस्थायी रूप से रोका गया है।',
    operationsMatrix: { debitsAllowed: false, creditsAllowed: false, atmAllowed: false, netBankingAllowed: false, upiAllowed: false },
    remediationSteps: [
      { step: 1, title: 'Source of Funds Declaration', description: 'Submit salary slips, invoice, contract, or sale deed explaining origin of flagged transaction.' },
      { step: 2, title: 'Compliance Officer Audit', description: 'Bank AML Special Investigation Unit (SIU) analyzes ledger trails.' },
      { step: 3, title: 'Enhanced Due Diligence (EDD)', description: 'Provide counterparty explanation if transactions involved unknown third parties.' },
      { step: 4, title: 'Dual-Control Clearance', description: 'Checker L2 authorizes full release once funds proven legitimate.' }
    ],
    requiredDocuments: ['Legitimate Source of Wealth / Income Proof', 'Bank statement of originating account', 'Signed Purpose of Transaction Declaration'],
    slaHours: 24,
    riskTier: 'HIGH',
    selfServiceAvailable: true
  },
  {
    code: 'SECURITY_COMPROMISED',
    category: 'Security & Access',
    categoryKey: 'catSecurity',
    title: 'Credential Lockout / Multiple Failed PIN & Password Attempts',
    titleTa: 'பாதுகாப்பு முடக்கம் / தொடர்ச்சியாக தவறான கடவுச்சொல் அல்லது பின்',
    titleHi: 'सुरक्षा लॉकआउट / बार-बार गलत पिन व पासवर्ड प्रयास',
    regulatoryMandate: 'RBI Cyber Security Framework / PCI-DSS Requirement 8.1.6 Account Lockout',
    plainExplanation: 'Account and card channels locked after 3 or more consecutive failed password, MPIN, or OTP attempts to protect against brute-force attacks and credential stuffing.',
    plainExplanationTa: 'மூன்று அல்லது அதற்கு மேற்பட்ட முறை தவறான கடவுச்சொல் உள்ளிட்டதால் ஹேக்கிங் தாக்குதலில் இருந்து பாதுகாக்க முடக்கப்பட்டது.',
    plainExplanationHi: 'ब्रूट-फोर्स हमलों से सुरक्षा के लिए 3 बार गलत पासवर्ड, एमपीआईएन या ओटीपी दर्ज करने पर चैनल लॉक कर दिया गया है।',
    operationsMatrix: { debitsAllowed: false, creditsAllowed: true, atmAllowed: false, netBankingAllowed: false, upiAllowed: false },
    remediationSteps: [
      { step: 1, title: '2-Factor Mobile Auth', description: 'Request secure SMS OTP verification to your registered mobile number.' },
      { step: 2, title: 'Identity Challenge', description: 'Answer banking security challenge or submit registered email verification code.' },
      { step: 3, title: 'Set New Credentials', description: 'Create new alphanumeric password and secure 6-digit MPIN.' },
      { step: 4, title: 'Instant Unfreeze', description: 'Access is restored immediately upon credential reset.' }
    ],
    requiredDocuments: ['Registered Mobile SIM (for OTP)', 'Debit Card details or Security Challenge answers'],
    slaHours: 1,
    riskTier: 'MEDIUM',
    selfServiceAvailable: true
  },
  {
    code: 'CYBER_POLICE_FREEZE',
    category: 'Legal & Cyber Crime',
    categoryKey: 'catLegal',
    title: 'Cyber Crime Police / 1930 Portal Notice Freeze',
    titleTa: 'சைபர் கிரைம் காவல்துறை / 1930 போர்டல் நோட்டீஸ் முடக்கம்',
    titleHi: 'साइबर क्राइम पुलिस / 1930 पोर्टल नोटिस फ्रीज',
    regulatoryMandate: 'Section 91 & Section 102 Code of Criminal Procedure (CrPC) / Indian Cyber Crime Coordination Centre (I4C)',
    plainExplanation: 'Statutory hold placed following a formal police notice or cyber complaint registered on the National Cyber Crime Reporting Portal (1930) regarding disputed or fraudulent funds traced to this account.',
    plainExplanationTa: '1930 சைபர் கிரைம் போர்ட்டலில் பதிவு செய்யப்பட்ட புகாரின் பேரில் காவல் துறையின் உத்தரவுப்படி கணக்கு முடக்கப்பட்டுள்ளது.',
    plainExplanationHi: 'राष्ट्रीय साइबर अपराध पोर्टल (1930) पर दर्ज शिकायत या पुलिस नोटिस (सीआरपीसी 102) के तहत खाते पर वैधानिक रोक लगाई गई है।',
    operationsMatrix: { debitsAllowed: false, creditsAllowed: false, atmAllowed: false, netBankingAllowed: false, upiAllowed: false },
    remediationSteps: [
      { step: 1, title: 'Obtain Notice Details & Acknowledgement Number', description: 'Bank provides the Police Station Name, Investigating Officer (IO), and Cyber Crime Acknowledgement Number.' },
      { step: 2, title: 'Furnish Legitimate Transaction Proof to IO', description: 'Provide invoices, chats, or transaction agreements demonstrating you were not complicit in cyber fraud.' },
      { step: 3, title: 'Request Police NOC (No Objection Certificate)', description: 'Investigating Officer issues formal de-freeze direction under CrPC to the bank Nodal Officer.' },
      { step: 4, title: 'Bank Legal Cell Verification & Release', description: 'Bank legal desk authenticates police dispatch and clears lien.' }
    ],
    requiredDocuments: ['Cyber Cell Police Acknowledgement Letter', 'Police No Objection Certificate (NOC)', 'Bank Transaction Statement & Invoices'],
    slaHours: 72,
    riskTier: 'CRITICAL',
    selfServiceAvailable: false
  },
  {
    code: 'COURT_ATTACHMENT_LIEN',
    category: 'Legal & Cyber Crime',
    categoryKey: 'catLegal',
    title: 'Court Attachment / Statutory Tax Authority Lien',
    titleTa: 'நீதிமன்ற ஆணை / வருமான வரித்துறை பற்று முடக்கம் (Lien)',
    titleHi: 'न्यायालय कुर्की आदेश / आयकर विभाग वैधानिक लियन',
    regulatoryMandate: 'Section 226(3) Income Tax Act / Order 21 Rule 46 Code of Civil Procedure (CPC) Garnishee Order',
    plainExplanation: 'Judicial decree or statutory revenue authority order (Income Tax, GST, or civil court) mandating the bank to freeze balance up to the decreed lien amount.',
    plainExplanationTa: 'நீதிமன்ற தீர்ப்பு அல்லது வருமான வரித்துறையின் உத்தரவின்படி குறிப்பிட்ட தொகைக்கு பற்று முடக்கம் வைக்கப்பட்டுள்ளது.',
    plainExplanationHi: 'अदालती डिक्री या आयकर / जीएसटी विभाग के आदेश के तहत खाते में निर्दिष्ट राशि पर वैधानिक लियन लगाया गया है।',
    operationsMatrix: { debitsAllowed: false, creditsAllowed: true, atmAllowed: false, netBankingAllowed: false, upiAllowed: false },
    remediationSteps: [
      { step: 1, title: 'Review Garnishee Notice', description: 'Inspect exact lien amount, court case docket number, and issuing tax authority details.' },
      { step: 2, title: 'Settle Statutory Demand or Obtain Stay Order', description: 'Pay tax demand via official portal or secure stay order from jurisdictional court.' },
      { step: 3, title: 'Submit Discharge / Revocation Order', description: 'Provide certified copy of court discharge order or tax demand withdrawal notice.' },
      { step: 4, title: 'Lien Removal by Bank Legal Desk', description: 'Bank compliance releases hold within 24-48 hours of verification.' }
    ],
    requiredDocuments: ['Official Court Revocation / Discharge Order', 'Tax Clearance Certificate (ITR/GST Challan)'],
    slaHours: 48,
    riskTier: 'HIGH',
    selfServiceAvailable: false
  },
  {
    code: 'OVERDRAFT_LIEN_HOLD',
    category: 'Balance & Overdraft',
    categoryKey: 'catBalance',
    title: 'Negative Balance / Overdraft Limit Exceeded / Fee Lien',
    titleTa: 'எதிர்மறை இருப்பு / ஓவர்டிராஃப்ட் வரம்பு மீறல் / கட்டண லியன்',
    titleHi: 'ऋणात्मक शेष / ओवरड्राफ्ट सीमा समाप्त / बैंक शुल्क लियन',
    regulatoryMandate: 'Banker’s General Lien under Section 171 Indian Contract Act 1872 / UCC Article 4 Right of Setoff',
    plainExplanation: 'Account entered negative balance due to unpaid charges, bounced ACH/ECS mandates, or exceeding approved temporary overdraft headroom.',
    plainExplanationTa: 'கணக்கில் உள்ள இருப்பு எதிர்மறையாக சென்றதால் அல்லது செலுத்தப்படாத நிலுவைத் தொகையினால் தற்காலிக முடக்கம்.',
    plainExplanationHi: 'खाते में नकारात्मक शेष राशि होने या बकाया बैंक शुल्कों के कारण बैंक द्वारा अधिकार लियन लगाया गया है।',
    operationsMatrix: { debitsAllowed: false, creditsAllowed: true, atmAllowed: false, netBankingAllowed: false, upiAllowed: false },
    remediationSteps: [
      { step: 1, title: 'Deposit Deficit Balance', description: 'Transfer funds or make cash/UPI deposit to bring ledger balance above zero.' },
      { step: 2, title: 'Automatic Lien Release', description: 'Core banking clears debit hold instantly as soon as ledger reaches active positive balance.' },
      { step: 3, title: 'Normal Operations Resumed', description: 'Immediate resumption of card, UPI, and wire privileges.' }
    ],
    requiredDocuments: [],
    slaHours: 2,
    riskTier: 'LOW',
    selfServiceAvailable: true
  },
  {
    code: 'EMERGENCY_PANIC_LOCK',
    category: 'Security & Access',
    categoryKey: 'catSecurity',
    title: 'Emergency Customer Panic / Stolen Device Lock',
    titleTa: 'அவசர வாடிக்கையாளர் முடக்கம் / சாதனம் திருடப்பட்ட பாதுகாப்பு நடவடிக்கை',
    titleHi: 'आपातकालीन ग्राहक पैनिक लॉक / चोरी हुए डिवाइस से सुरक्षा',
    regulatoryMandate: 'Customer Protection Directive / Zero-Liability Banking Kill-Switch',
    plainExplanation: 'Customer or account owner triggered the emergency freeze kill-switch after losing a phone, misplaced debit card, or suspecting unauthorized login attempts.',
    plainExplanationTa: 'செல்போன் அல்லது கார்டு தொலைந்ததால் வாடிக்கையாளர் தானாகவே பாதுகாப்பு கருதி அவசரமாக முடக்கிய கணக்கு.',
    plainExplanationHi: 'फोन खो जाने या कार्ड चोरी होने के संदेह पर ग्राहक द्वारा स्वयं सक्रिय किया गया आपातकालीन किल-स्विच लॉक।',
    operationsMatrix: { debitsAllowed: false, creditsAllowed: true, atmAllowed: false, netBankingAllowed: false, upiAllowed: false },
    remediationSteps: [
      { step: 1, title: 'Initiate Digital Re-Authentication', description: 'Log in from a recognized trusted device or branch terminal.' },
      { step: 2, title: 'Biometric Face + Aadhaar/Govt ID verification', description: 'Complete live video or selfie verification to prove true identity.' },
      { step: 3, title: 'Revoke Compromised Devices', description: 'Log out of all existing mobile sessions and generate new PIN.' },
      { step: 4, title: 'Immediate Safe Restoration', description: 'Hold deactivated within 30 minutes.' }
    ],
    requiredDocuments: ['Govt Photo ID', 'Active Biometric Verification'],
    slaHours: 1,
    riskTier: 'MEDIUM',
    selfServiceAvailable: true
  }
];

async function loadLockReasonsView() {
  const grid = document.getElementById('lockReasonsGrid');
  if (!grid) return;

  grid.innerHTML = `
    <div class="reasons-loading-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
      <div class="spinner" style="margin: 0 auto 1rem;"></div>
      <p>${(I18N[state.currentLang] && I18N[state.currentLang].loadingLockReasons) || 'Loading real-world bank lock reasons catalog...'}</p>
    </div>
  `;

  try {
    const res = await API.get('/api/lock-reasons');
    if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
      lockReasonsState.data = res.data;
    } else {
      lockReasonsState.data = LOCK_REASONS_FALLBACK;
    }
  } catch (err) {
    console.warn('[LockReasons] Network fetch failed, using built-in compliance catalog', err);
    lockReasonsState.data = LOCK_REASONS_FALLBACK;
  }

  filterLockReasons();
}

function filterLockReasons() {
  const searchInput = document.getElementById('lockReasonsSearchInput');
  const clearBtn = document.getElementById('clearLockReasonsSearchBtn');
  const countBadge = document.getElementById('lockReasonsCountBadge');
  const grid = document.getElementById('lockReasonsGrid');
  if (!grid) return;

  const query = (searchInput?.value || '').trim().toLowerCase();
  lockReasonsState.searchQuery = query;

  if (clearBtn) {
    clearBtn.style.display = query ? 'inline-block' : 'none';
  }

  const catalog = (lockReasonsState.data && lockReasonsState.data.length > 0) ? lockReasonsState.data : LOCK_REASONS_FALLBACK;

  const filtered = catalog.filter(reason => {
    // Category match
    const cat = lockReasonsState.currentCategory;
    let matchCat = true;
    if (cat === 'COMPLIANCE') {
      matchCat = reason.code === 'KYC_EXPIRED' || reason.code === 'DORMANT_INACTIVE' || reason.categoryKey === 'catKyc' || reason.categoryKey === 'catInactivity';
    } else if (cat === 'SECURITY') {
      matchCat = reason.code === 'AML_SUSPICIOUS_TXN' || reason.code === 'SECURITY_COMPROMISED' || reason.code === 'EMERGENCY_PANIC_LOCK' || reason.categoryKey === 'catSecurity' || reason.categoryKey === 'catAml';
    } else if (cat === 'LEGAL') {
      matchCat = reason.code === 'CYBER_POLICE_FREEZE' || reason.code === 'COURT_ATTACHMENT_LIEN' || reason.categoryKey === 'catLegal';
    } else if (cat === 'FINANCIAL') {
      matchCat = reason.code === 'OVERDRAFT_LIEN_HOLD' || reason.categoryKey === 'catBalance';
    }

    if (!matchCat) return false;

    // Search query match
    if (!query) return true;

    const searchableText = [
      reason.code,
      reason.title,
      reason.titleTa,
      reason.titleHi,
      reason.category,
      reason.regulatoryMandate,
      reason.plainExplanation,
      reason.plainExplanationTa,
      reason.plainExplanationHi,
      reason.riskTier,
      (reason.requiredDocuments || []).join(' '),
      (reason.remediationSteps || []).map(s => (s.title || '') + ' ' + (s.description || '')).join(' ')
    ].filter(Boolean).join(' ').toLowerCase();

    return searchableText.includes(query);
  });

  if (countBadge) {
    countBadge.textContent = `Showing ${filtered.length} of ${catalog.length}`;
  }

  renderLockReasonsCards(filtered);
}

function renderLockReasonsCards(reasons) {
  const grid = document.getElementById('lockReasonsGrid');
  if (!grid) return;

  if (reasons.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem; background: #ffffff; border: 1px dashed var(--border); border-radius: 12px;">
        <span style="font-size: 2.5rem; display: block; margin-bottom: 0.75rem;">🔍</span>
        <h4 style="color: var(--navy-900); margin-bottom: 0.5rem;">No matching lock reasons found</h4>
        <p style="color: var(--text-muted); font-size: 0.9rem; max-width: 450px; margin: 0 auto 1.25rem;">
          Try searching with other keywords like "KYC", "Dormant", "1930", "CrPC", "AML", "Police", or "Overdraft".
        </p>
        <button type="button" class="btn btn-outline" onclick="resetLockReasonsFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  const lang = state.currentLang || 'en';
  const dict = I18N[lang] || I18N.en;

  grid.innerHTML = reasons.map(r => {
    const title = (lang === 'ta' && r.titleTa) ? r.titleTa : ((lang === 'hi' && r.titleHi) ? r.titleHi : r.title);
    const explanation = (lang === 'ta' && r.plainExplanationTa) ? r.plainExplanationTa : ((lang === 'hi' && r.plainExplanationHi) ? r.plainExplanationHi : r.plainExplanation);

    const ops = r.operationsMatrix || { debitsAllowed: false, creditsAllowed: true, atmAllowed: false, netBankingAllowed: false };

    // Risk badge color
    let riskBg = '#E0F2FE', riskColor = '#0369A1';
    if (r.riskTier === 'CRITICAL') { riskBg = '#FEE2E2'; riskColor = '#991B1B'; }
    else if (r.riskTier === 'HIGH') { riskBg = '#FEF3C7'; riskColor = '#92400E'; }
    else if (r.riskTier === 'MEDIUM') { riskBg = '#EDE9FE'; riskColor = '#6D28D9'; }
    else if (r.riskTier === 'LOW') { riskBg = '#DCFCE7'; riskColor = '#166534'; }

    const isHighlighted = lockReasonsState.activeHighlightCode === r.code;

    const docsHtml = (r.requiredDocuments && r.requiredDocuments.length > 0)
      ? `
        <div class="reason-docs-section">
          <div class="reason-docs-title">
            <span>📄</span>
            <span>${dict.requiredDocsLabel || 'Required Documents for Unfreeze'}</span>
          </div>
          <div class="reason-docs-list">
            ${r.requiredDocuments.map(doc => `
              <div class="reason-doc-item">
                <span style="color: var(--success, #10b981); font-weight: bold;">✓</span>
                <span>${doc}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `
      : `
        <div class="reason-docs-section" style="background: #f0fdf4; border-color: #bbf7d0;">
          <div class="reason-doc-item" style="color: #166534; font-weight: 600;">
            <span>⚡ Zero Documentation Required &bull; Instant Automatic CBS Clearing upon Ledger Balancing</span>
          </div>
        </div>
      `;

    const stepsHtml = (r.remediationSteps && r.remediationSteps.length > 0)
      ? `
        <div class="reason-steps-section">
          <div class="reason-steps-title">
            <span>🛠️</span>
            <span>${dict.unlockProcedureLabel || 'Step-by-Step Unlock Procedure'}</span>
          </div>
          <ol class="reason-steps-list">
            ${r.remediationSteps.map(step => `
              <li class="reason-step-item">
                <span class="reason-step-num">${step.step}</span>
                <div>
                  <strong style="color: var(--navy-900);">${step.title}:</strong>
                  <span style="color: #475569;"> ${step.description}</span>
                </div>
              </li>
            `).join('')}
          </ol>
        </div>
      `
      : '';

    return `
      <div class="lock-reason-card ${isHighlighted ? 'highlight-card' : ''}" id="reasonCard_${r.code}" data-code="${r.code}">
        <div class="lock-reason-header">
          <div class="lock-reason-badges">
            <span class="impact-pill" style="background: var(--navy-900); color: #ffffff; font-family: monospace; font-weight: 700;">${r.code}</span>
            <span class="impact-pill" style="background: ${riskBg}; color: ${riskColor}; font-weight: 700;">${r.riskTier} RISK</span>
            <span class="impact-pill" style="background: #F1F5F9; color: var(--navy-900); font-weight: 600;">⏱️ ${r.slaHours || 24}h SLA</span>
            ${r.selfServiceAvailable ? '<span class="impact-pill" style="background: #DCFCE7; color: #166534; font-weight: 700;">⚡ SELF-SERVICE</span>' : '<span class="impact-pill" style="background: #FEF3C7; color: #92400E; font-weight: 700;">🏛️ BRANCH/LEGAL</span>'}
          </div>
          <h4 class="lock-reason-title">${title}</h4>
          <span class="lock-reason-mandate">🏛️ Mandate: ${r.regulatoryMandate}</span>
          <p class="lock-reason-desc">${explanation}</p>
        </div>

        <!-- Banking Operations Impact Matrix -->
        <table class="reason-ops-matrix" aria-label="Transaction impact table">
          <thead>
            <tr>
              <th>${dict.cardDebitsLabel || 'Debits'}</th>
              <th>${dict.cardCreditsLabel || 'Credits'}</th>
              <th>${dict.cardAtmLabel || 'ATM Cards'}</th>
              <th>${dict.cardNetBankingLabel || 'UPI / App'}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span class="reason-ops-status ${ops.debitsAllowed ? 'allowed' : 'blocked'}">
                  ${ops.debitsAllowed ? '🟢 Permitted' : '⛔ Blocked'}
                </span>
              </td>
              <td>
                <span class="reason-ops-status ${ops.creditsAllowed ? 'allowed' : 'blocked'}">
                  ${ops.creditsAllowed ? '🟢 Permitted' : '⛔ Blocked'}
                </span>
              </td>
              <td>
                <span class="reason-ops-status ${ops.atmAllowed ? 'allowed' : 'blocked'}">
                  ${ops.atmAllowed ? '🟢 Active' : '⛔ Frozen'}
                </span>
              </td>
              <td>
                <span class="reason-ops-status ${ops.netBankingAllowed ? 'allowed' : 'blocked'}">
                  ${ops.netBankingAllowed ? '🟢 Active' : '⛔ Frozen'}
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        ${docsHtml}
        ${stepsHtml}

        <div class="reason-actions-row">
          <button type="button" class="btn btn-primary btn-sm" onclick="startUnlockForReason('${r.code}')" style="flex: 1; min-width: 160px;">
            <span>⚡</span>
            <span>${dict.unlockOnlineBtn || 'Unlock Online Now'}</span>
          </button>
          <button type="button" class="btn btn-outline-info btn-sm" onclick="askAiAboutLockReason('${r.code}')" style="flex: 1; min-width: 150px;">
            <span>💬</span>
            <span>${dict.askAiAboutThisBtn || 'Ask AI Assistant'}</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function startUnlockForReason(code) {
  const catalog = (lockReasonsState.data && lockReasonsState.data.length > 0) ? lockReasonsState.data : LOCK_REASONS_FALLBACK;
  const reason = catalog.find(x => x.code === code) || { title: code, code };
  showToast(`Initiating unfreeze workflow for ${reason.title}...`, 'info');

  if (!state.token) {
    openPublicLockReasons();
  }

  switchSubView('viewDashboard');

  setTimeout(() => {
    const recSection = document.getElementById('dashRecoverySection') || document.getElementById('inlineRecoveryCard');
    if (recSection) {
      recSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    const explanationInput = document.getElementById('inlineExplanation');
    if (explanationInput) {
      explanationInput.value = `Requesting account unfreeze under CBS restriction: ${reason.title} (${reason.code}). Uploaded official verification records.`;
      explanationInput.focus();
    }
  }, 220);
}

function askAiAboutLockReason(code) {
  const catalog = (lockReasonsState.data && lockReasonsState.data.length > 0) ? lockReasonsState.data : LOCK_REASONS_FALLBACK;
  const reason = catalog.find(x => x.code === code) || { title: code, code };
  switchSubView('viewAiChat');

  setTimeout(() => {
    const input = document.getElementById('fullAiChatInput') || document.getElementById('chatInput');
    const sendBtn = document.getElementById('fullAiChatSendBtn') || document.getElementById('chatSendBtn');
    if (input) {
      input.value = `Can you explain the real bank lock reason "${reason.title}" (${reason.code}) and give me the exact step-by-step unfreeze procedure?`;
      if (sendBtn) {
        sendBtn.click();
      }
    }
  }, 220);
}

function resetLockReasonsFilters() {
  const searchInput = document.getElementById('lockReasonsSearchInput');
  if (searchInput) searchInput.value = '';
  lockReasonsState.currentCategory = 'ALL';
  lockReasonsState.searchQuery = '';
  lockReasonsState.activeHighlightCode = null;

  const pills = document.querySelectorAll('#lockReasonsCategoryPills .category-pill');
  pills.forEach(p => {
    if (p.getAttribute('data-category') === 'ALL') p.classList.add('active');
    else p.classList.remove('active');
  });

  filterLockReasons();
}

async function openPublicLockReasons() {
  if (!state.token) {
    await demoLogin('elena@example.com', 'Customer@123');
  }
  switchSubView('viewLockReasons');
}

function initLockReasons() {
  // Category filter pills
  const pills = document.querySelectorAll('#lockReasonsCategoryPills .category-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      lockReasonsState.currentCategory = pill.getAttribute('data-category') || 'ALL';
      filterLockReasons();
    });
  });

  // Search input live filtering
  const searchInput = document.getElementById('lockReasonsSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      filterLockReasons();
    });
  }

  // Clear search button
  const clearBtn = document.getElementById('clearLockReasonsSearchBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      filterLockReasons();
      if (searchInput) searchInput.focus();
    });
  }

  // Direct Recovery Hub button from header
  const goToRecovBtn = document.getElementById('reasonsGoToRecoveryBtn');
  if (goToRecovBtn) {
    goToRecovBtn.addEventListener('click', () => {
      switchSubView('viewDashboard');
      const rec = document.getElementById('dashRecoverySection') || document.getElementById('inlineRecoveryCard');
      if (rec) rec.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Public banner button on auth screen
  const publicGuideBtn = document.getElementById('openPublicLockReasonsBtn');
  if (publicGuideBtn) {
    publicGuideBtn.addEventListener('click', openPublicLockReasons);
  }

  // Diagnostic symptom checker
  const symptomSelect = document.getElementById('diagnosticSymptomSelect');
  const runDiagBtn = document.getElementById('runDiagnosticBtn');
  const resetDiagBtn = document.getElementById('resetDiagnosticBtn');
  const diagCard = document.getElementById('diagnosticResultCard');
  const diagTitle = document.getElementById('diagnosticResultTitle');
  const diagBadge = document.getElementById('diagnosticResultBadge');
  const diagSummary = document.getElementById('diagnosticResultSummary');
  const jumpBtn = document.getElementById('diagnosticJumpToCardBtn');

  if (runDiagBtn) {
    runDiagBtn.addEventListener('click', () => {
      const code = symptomSelect ? symptomSelect.value : '';
      if (!code) {
        showToast('Please select a banking symptom or error message first', 'warning');
        if (symptomSelect) symptomSelect.focus();
        return;
      }

      const catalog = (lockReasonsState.data && lockReasonsState.data.length > 0) ? lockReasonsState.data : LOCK_REASONS_FALLBACK;
      const match = catalog.find(x => x.code === code);
      if (!match) return;

      lockReasonsState.activeHighlightCode = code;

      // Ensure that category or search does not hide the matched card
      lockReasonsState.currentCategory = 'ALL';
      if (searchInput) searchInput.value = '';
      pills.forEach(p => {
        if (p.getAttribute('data-category') === 'ALL') p.classList.add('active');
        else p.classList.remove('active');
      });

      filterLockReasons();

      if (diagCard) diagCard.style.display = 'block';
      if (diagTitle) diagTitle.textContent = match.title;
      if (diagBadge) diagBadge.textContent = match.code;
      if (diagSummary) {
        diagSummary.textContent = `${match.plainExplanation} Turnaround SLA: ${match.slaHours} hours. Required: ${(match.requiredDocuments || []).join(', ') || 'Online ledger balance'}.`;
      }

      showToast(`Matched CBS Code: ${match.code}`, 'success');

      // Scroll smoothly to matched card
      setTimeout(() => {
        const cardEl = document.getElementById(`reasonCard_${match.code}`);
        if (cardEl) {
          cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    });
  }

  if (resetDiagBtn) {
    resetDiagBtn.addEventListener('click', () => {
      if (symptomSelect) symptomSelect.value = '';
      if (diagCard) diagCard.style.display = 'none';
      lockReasonsState.activeHighlightCode = null;
      resetLockReasonsFilters();
    });
  }

  if (jumpBtn) {
    jumpBtn.addEventListener('click', () => {
      const code = lockReasonsState.activeHighlightCode;
      if (code) {
        const cardEl = document.getElementById(`reasonCard_${code}`);
        if (cardEl) {
          cardEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  }
}

window.state = state;
window.API = API;
window.switchSubView = switchSubView;
window.openQrScannerModal = openQrScannerModal;
window.closeQrScannerModal = closeQrScannerModal;
window.openLockExplanationModal = openLockExplanationModal;
window.closeLockExplanationModal = closeLockExplanationModal;
window.startRecoveryFromLockModal = startRecoveryFromLockModal;
window.logout = logout;
window.handleLogout = logout;
window.loginWithCredentials = loginWithCredentials;
window.activateBillCat = activateBillCat;
window.showToast = showToast;
window.applyLanguage = applyLanguage;
window.claimCase = claimCase;
window.openCaseInspection = openCaseInspection;
window.escalateComplaint = escalateComplaint;
window.toggleCustomerConsent = toggleCustomerConsent;
window.openFraudAlertTriage = openFraudAlertTriage;
window.toggleFraudRule = toggleFraudRule;
window.loadLockReasonsView = loadLockReasonsView;
window.initLockReasons = initLockReasons;
window.openPublicLockReasons = openPublicLockReasons;
window.startUnlockForReason = startUnlockForReason;
window.askAiAboutLockReason = askAiAboutLockReason;
window.resetLockReasonsFilters = resetLockReasonsFilters;
window.openServerConfigModal = openServerConfigModal;
window.closeServerConfigModal = closeServerConfigModal;
window.saveServerConfigUrl = saveServerConfigUrl;
window.setQuickServerUrl = setQuickServerUrl;

// Run on page load
document.addEventListener('DOMContentLoaded', init);
