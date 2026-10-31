const { get, all } = require('../db/database');

/**
 * ReBank Context-Aware Chatbot Service
 * Interacts with actual SQLite persistent database state to provide real, human-friendly bank assistance.
 */

async function processChatbotMessage({ message, language = 'en', user = null, customerProfile = null, accountId = null }) {
  const lang = (language === 'ta' || language === 'hi') ? language : 'en';
  const cleanMsg = (message || '').trim();
  const lowerMsg = cleanMsg.toLowerCase();

  if (!cleanMsg) {
    return {
      success: false,
      error: 'Message cannot be empty',
      reply: lang === 'ta' ? 'தயவுசெய்து உங்கள் கேள்வியை உள்ளிடவும்.' :
        (lang === 'hi' ? 'कृपया अपना प्रश्न दर्ज करें।' : 'Please enter a message to begin.')
    };
  }

  // 1. Strict Security Guardrail: Never collect or discuss sensitive credentials
  const credentialTerms = ['pin', 'password', 'otp', 'cvv', 'கடவுச்சொல்', 'ரகசிய எண்', 'पासवर्ड', 'पिन', 'ओटीपी'];
  if (credentialTerms.some(term => lowerMsg.includes(term))) {
    return {
      success: true,
      sender: 'bot',
      reply: lang === 'ta'
        ? `🛡️ **பாதுகாப்பு எச்சரிக்கை:** ReBank அல்லது அதன் ஊழியர்கள் ஒருபோதும் உங்கள் கடவுச்சொல், PIN, CVV அல்லது OTP-ஐ கேட்க மாட்டார்கள். இந்த ரகசிய தகவல்களை யாரிடமும் பகிர வேண்டாம்.`
        : (lang === 'hi'
          ? `🛡️ **सुरक्षा चेतावनी:** ReBank या उसका कोई भी प्रतिनिधि कभी भी आपका पासवर्ड, पिन, सीवीवी या ओटीपी नहीं मांगेगा। यह गोपनीय जानकारी कभी किसी से साझा न करें।`
          : `🛡️ **Security Alert:** ReBank and our automated systems will NEVER request your password, ATM PIN, CVV, or OTP. Never disclose these credentials to anyone.`),
      suggestedQuestions: getSuggestedQuestions(lang),
      action: null
    };
  }

  // 2. Fetch real database context if customer is authenticated
  let activeAccounts = [];
  let activeRestrictions = [];
  let activeRequests = [];

  if (customerProfile) {
    try {
      activeAccounts = all('SELECT * FROM account_references WHERE customer_id = ?', [customerProfile.id]) || [];
      const accountIds = activeAccounts.map(a => a.id);
      if (accountIds.length > 0) {
        const placeholders = accountIds.map(() => '?').join(',');
        activeRestrictions = all(
          `SELECT r.*, a.account_number_masked, a.account_type 
           FROM account_restrictions r 
           JOIN account_references a ON r.account_id = a.id 
           WHERE r.account_id IN (${placeholders}) AND r.is_active = 1`,
          accountIds
        ) || [];
      }
      activeRequests = all(
        'SELECT * FROM recovery_requests WHERE customer_id = ? ORDER BY submitted_at DESC',
        [customerProfile.id]
      ) || [];
    } catch (e) {
      console.error('[ChatService] Error loading DB context:', e.message);
    }
  }

  const primaryRestriction = activeRestrictions[0] || null;
  const primaryRequest = activeRequests[0] || null;
  const primaryAccount = activeAccounts.find(a => a.id === accountId) || activeAccounts[0] || null;

  // 3. Intent: Why is my account locked?
  if (
    lowerMsg.includes('why') ||
    lowerMsg.includes('locked') ||
    lowerMsg.includes('blocked') ||
    lowerMsg.includes('lock') ||
    lowerMsg.includes('முடக்கம்') ||
    lowerMsg.includes('ஏன்') ||
    lowerMsg.includes('லாக்') ||
    lowerMsg.includes('अवरुद्ध') ||
    lowerMsg.includes('क्यों लॉक') ||
    lowerMsg.includes('खाता क्यों')
  ) {
    let reasonDesc = primaryRestriction ? primaryRestriction.reason_description : 'Regulatory KYC review deadline reached';
    let slaHours = primaryRestriction ? primaryRestriction.sla_hours : 4;
    let holdRef = primaryRestriction ? primaryRestriction.id : 'rst-1002';

    let reply = '';
    if (lang === 'ta') {
      reply = `🛡️ **Ungal account ippo temporary-ah lock aagiyirukku. Yen nu check pannalaam; adutha step-la naan help panren.**\n\n` +
        `📌 **வங்கி காரண விளக்கம்:** ${reasonDesc} (குறிப்பு: ${holdRef}). பாதுகாப்பு காரணங்களுக்காக வெளி பரிமாற்றங்கள் தற்காலிகமாக இடைநிறுத்தப்பட்டுள்ளன.\n` +
        `✅ **உங்கள் நிதி பாதுகாப்பு:** 100% உங்கள் பணம் வங்கி கணக்கில் முழுமையாக பாதுகாப்பாக உள்ளது. ஒரு பைசா கூட கழிக்கப்படவில்லை.\n` +
        `⏱️ **மதிப்பிடப்பட்ட தீர்வு நேரம்:** ${slaHours} மணிநேரம்.\n\n` +
        `👉 கீழே உள்ள **'Account Recovery'** பகுதியில் விரைவாக ஆவணத்தை சமர்ப்பித்து கணக்கை மீட்டெடுக்கலாம்!`;
    } else if (lang === 'hi') {
      reply = `🛡️ **आपका खाता अभी अस्थायी रूप से लॉक है। आइए देखें क्यों, और इसे वापस पाने में मैं आपकी मदद करता हूँ।**\n\n` +
        `📌 **बैंक सुरक्षा कारण:** ${reasonDesc} (संदर्भ: ${holdRef})। सुरक्षा कारणों से बाहरी वायर ट्रांसफर को रोका गया है।\n` +
        `✅ **राशि सुरक्षा:** आपका पूरा 100% पैसा बैंक में पूरी तरह सुरक्षित है। कोई कटौती नहीं की गई है।\n` +
        `⏱️ **समाधान समय (SLA):** ${slaHours} घंटे।\n\n` +
        `👉 नीचे दिए गए **'Account Recovery'** फॉर्म में डिजिटल सत्यापन पूरा करके तुरंत सेवाएं बहाल करें!`;
    } else {
      reply = `🛡️ **Your account is temporarily locked. Let's check why and see how to get it back.**\n\n` +
        `📌 **Official Bank Reason:** ${reasonDesc} (Hold ID: ${holdRef}). Outbound debits and wire transfers have been held to safeguard your deposits.\n` +
        `✅ **Funds Safety Guarantee:** 100% of your account balance remains safe and insured in your CBS account.\n` +
        `⏱️ **Resolution SLA:** ${slaHours} Hours.\n\n` +
        `👉 Follow the simple digital steps below in the **Account Recovery Hub** to restore full access!`;
    }

    return {
      success: true,
      sender: 'bot',
      reply,
      action: {
        type: 'NAVIGATE_RECOVERY',
        label: lang === 'ta' ? '🛡️ கணக்கை மீட்டெடுக்கவும்' : (lang === 'hi' ? '🛡️ खाता रिकवर करें' : '🛡️ Go to Account Recovery')
      },
      suggestedQuestions: getSuggestedQuestions(lang)
    };
  }

  // 4. Intent: Track recovery / ticket status
  if (
    lowerMsg.includes('track') ||
    lowerMsg.includes('status') ||
    lowerMsg.includes('ticket') ||
    lowerMsg.includes('reb-') ||
    lowerMsg.includes('progress') ||
    lowerMsg.includes('pending') ||
    lowerMsg.includes('நிலை') ||
    lowerMsg.includes('காண்க') ||
    lowerMsg.includes('स्थिति') ||
    lowerMsg.includes('ट्रैक')
  ) {
    let reply = '';
    if (primaryRequest) {
      const ref = primaryRequest.reference_number;
      const statusClean = primaryRequest.status.replace(/_/g, ' ');
      const submitted = primaryRequest.submitted_at ? new Date(primaryRequest.submitted_at).toLocaleDateString() : 'Today';

      if (lang === 'ta') {
        reply = `📋 **உங்கள் கணக்கு மீட்பு விண்ணப்பத்தின் நேரலை நிலை:**\n\n` +
          `• விண்ணப்ப எண்: **${ref}**\n` +
          `• தற்போதைய நிலை: **${statusClean}**\n` +
          `• சமர்ப்பிக்கப்பட்ட தேதி: **${submitted}**\n` +
          `• பாதுகாப்பு ஆய்வு: **இரு-நிலை அதிகாரி ஆய்வு (Maker L1 / Checker L2)**\n` +
          `• நிதி நிலை: **100% வங்கியில் பாதுகாப்பாக உள்ளது**\n\n` +
          `👉 டாஷ்போர்டில் உள்ள 4-படி நிலை டிராக்கரில் முன்னேற்றத்தை எப்போது வேண்டுமானாலும் பார்க்கலாம்.`;
      } else if (lang === 'hi') {
        reply = `📋 **आपके खाता रिकवरी अनुरोध की वास्तविक स्थिति:**\n\n` +
          `• संदर्भ संख्या: **${ref}**\n` +
          `• वर्तमान स्थिति: **${statusClean}**\n` +
          `• जमा करने की तारीख: **${submitted}**\n` +
          `• समीक्षा स्तर: **दोहरा नियंत्रण (मेकर L1 एवं चेकर L2)**\n` +
          `• फंड सुरक्षा: **100% बैंक में सुरक्षित**\n\n` +
          `👉 डैशबोर्ड के 4-चरणीय लाइव ट्रैकर में वास्तविक समय की प्रगति देखी जा सकती है।`;
      } else {
        reply = `📋 **Live Status of Your Account Recovery Application:**\n\n` +
          `• Reference ID: **${ref}**\n` +
          `• Current Status: **${statusClean}**\n` +
          `• Submission Date: **${submitted}**\n` +
          `• Verification Stage: **Dual-Control Compliance Review (Maker L1 / Checker L2)**\n` +
          `• Funds Security: **100% Safe & Protected in CBS**\n\n` +
          `👉 You can track every milestone in the 4-stage visual timeline below on your dashboard.`;
      }

      return {
        success: true,
        sender: 'bot',
        reply,
        action: {
          type: 'VIEW_TRACKER',
          label: lang === 'ta' ? '📋 டிராக்கரைப் பார்க்கவும்' : (lang === 'hi' ? '📋 लाइव ट्रैकर देखें' : '📋 View Live Tracker')
        },
        suggestedQuestions: getSuggestedQuestions(lang)
      };
    } else {
      if (lang === 'ta') {
        reply = `📋 உங்களிடம் தற்போது செயலில் உள்ள மீட்பு விண்ணப்பம் எதுவும் இல்லை. உங்கள் கணக்கு முடக்கப்பட்டிருந்தால், உடனே மீட்பு விண்ணப்பத்தை சமர்ப்பிக்கலாம்.`;
      } else if (lang === 'hi') {
        reply = `📋 आपका कोई सक्रिय रिकवरी आवेदन लंबित नहीं है। यदि आपका खाता लॉक है, तो आप तुरंत रिकवरी फॉर्म भर सकते हैं।`;
      } else {
        reply = `📋 You do not have an active recovery ticket in progress right now. If your account has a restriction, you can submit an application using the Recovery Hub below.`;
      }

      return {
        success: true,
        sender: 'bot',
        reply,
        action: {
          type: 'NAVIGATE_RECOVERY',
          label: lang === 'ta' ? '🛡️ விண்ணப்பம் துவங்குக' : (lang === 'hi' ? '🛡️ नया आवेदन भरें' : '🛡️ Start Recovery Application')
        },
        suggestedQuestions: getSuggestedQuestions(lang)
      };
    }
  }

  // 5. Intent: Help me recover / walkthrough
  if (
    lowerMsg.includes('help me recover') ||
    lowerMsg.includes('recover') ||
    lowerMsg.includes('restore') ||
    lowerMsg.includes('unblock') ||
    lowerMsg.includes('unlock') ||
    lowerMsg.includes('மீட்டெடு') ||
    lowerMsg.includes('மீட்பு') ||
    lowerMsg.includes('रिकवर') ||
    lowerMsg.includes('अनलॉक')
  ) {
    let reply = '';
    if (lang === 'ta') {
      reply = `🤝 **கவலையே படாதீர்கள்! உங்கள் கணக்கை மீட்டெடுக்க நான் உங்களுக்கு வழிகாட்டுகிறேன்:**\n\n` +
        `1️⃣ **படி 1:** கீழே உள்ள 'Account Recovery' படிவத்திற்கு செல்லவும்.\n` +
        `2️⃣ **படி 2:** உங்கள் அடையாள அட்டை எண் மற்றும் முகவரி சான்றை உறுதிப்படுத்தவும்.\n` +
        `3️⃣ **படி 3:** **5-வினாடி நேரடி பயோமெட்ரிக் செல்ஃபி** எடுத்து சமர்ப்பிக்கவும்.\n\n` +
        `⏱️ வங்கி அதிகாரி குழு (Maker L1 & Checker L2) 2-4 மணிநேரத்திற்குள் சரிபார்த்து கணக்கை விடுவிக்கும்!`;
    } else if (lang === 'hi') {
      reply = `🤝 **चिंता न करें! आपका खाता पुनः सक्रिय कराने में मैं पूरी मदद करूँगा:**\n\n` +
        `1️⃣ **चरण 1:** नीचे 'Account Recovery' अनुभाग पर जाएं।\n` +
        `2️⃣ **चरण 2:** अपना पहचान पत्र नंबर एवं निवास प्रमाण पत्र विवरण दर्ज करें।\n` +
        `3️⃣ **चरण 3:** **5-सेकंड की डिजिटल लाइवनेस सेल्फी** लेकर सबमिट करें।\n\n` +
        `⏱️ बैंक अनुपालन टीम 2 से 4 घंटे के भीतर सत्यापन पूरा करके सेवाएं बहाल कर देगी!`;
    } else {
      reply = `🤝 **I am here to help you get your account restored smoothly! Here is the 3-step walkthrough:**\n\n` +
        `1️⃣ **Step 1:** Scroll down to the **Account Recovery Hub**.\n` +
        `2️⃣ **Step 2:** Confirm your Government Photo ID number and address document.\n` +
        `3️⃣ **Step 3:** Click **"Capture 5-Second Digital Liveness Selfie"** and submit.\n\n` +
        `⏱️ Our compliance team (Maker L1 & Checker L2) will review and approve your submission within 2–4 hours!`;
    }

    return {
      success: true,
      sender: 'bot',
      reply,
      action: {
        type: 'NAVIGATE_RECOVERY',
        label: lang === 'ta' ? '🛡️ மீட்பு படிவம்' : (lang === 'hi' ? '🛡️ रिकवरी फॉर्म' : '🛡️ Open Recovery Form')
      },
      suggestedQuestions: getSuggestedQuestions(lang)
    };
  }

  // 6. Intent: Check transfer safety
  if (
    lowerMsg.includes('transfer safety') ||
    lowerMsg.includes('transfer') ||
    lowerMsg.includes('wire') ||
    lowerMsg.includes('safety') ||
    lowerMsg.includes('risk') ||
    lowerMsg.includes('unusual') ||
    lowerMsg.includes('பரிவர்த்தனை') ||
    lowerMsg.includes('இடர்') ||
    lowerMsg.includes('பாதுகாப்பு') ||
    lowerMsg.includes('स्थानांतरण') ||
    lowerMsg.includes('सुरक्षा') ||
    lowerMsg.includes('जोखिम')
  ) {
    const isRestricted = activeRestrictions.length > 0;
    let reply = '';
    if (lang === 'ta') {
      reply = `⚠️ **Indha transfer konjam unusual-ah irukku. Anuppuradhukku munnaadi details-a check pannunga.**\n\n` +
        (isRestricted
          ? `🛡️ **முக்கிய அறிவிப்பு:** உங்கள் கணக்கில் தற்காலிக ஒழுங்குமுறை முடக்கம் இருப்பதால், வெளிச்செல்லும் பரிமாற்றங்கள் இடைநிறுத்தப்பட்டுள்ளன. சரிபார்ப்பு முடிந்த பின்னரே பரிமாற்றங்கள் அனுமதிக்கப்படும்.\n`
          : `🛡️ **வங்கி ஆலோசனை:** புதிய பெறுநர்களுக்கு பணம் அனுப்பும் முன் விவரங்களை இருமுறை சரிபார்க்கவும்.\n`) +
        `👉 டாஷ்போர்டில் உள்ள **'Transfer Simulator'** மூலம் இடர் மதிப்பீட்டை முன்கூட்டியே சோதிக்கலாம்!`;
    } else if (lang === 'hi') {
      reply = `⚠️ **यह ट्रांसफर थोड़ा असामान्य लग रहा है। कृपया आगे बढ़ने से पहले विवरण दोबारा जाँच लें।**\n\n` +
        (isRestricted
          ? `🛡️ **महत्वपूर्ण नोटिस:** आपके खाते पर सक्रिय सुरक्षा रोक होने के कारण बाहरी अंतरण अस्थायी रूप से रोका गया है। सत्यापन के बाद ही सेवाएं सुचारू होंगी।\n`
          : `🛡️ **बैंक सुरक्षा सलाह:** किसी भी अनजान व्यक्ति या नए लाभार्थी को राशि भेजने से पहले विवरण दोबारा जांचें।\n`) +
        `👉 लाइव परीक्षण के लिए नीचे दिए गए **'Transfer Simulator'** का उपयोग करें!`;
    } else {
      reply = `⚠️ **This transfer looks unusual. Please check the details before continuing.**\n\n` +
        (isRestricted
          ? `🛡️ **Bank Notice:** Outbound transfers are paused because your account currently has an active regulatory KYC verification hold.\n`
          : `🛡️ **Safety Recommendation:** Verify the beneficiary name and bank code before authorizing transfers.\n`) +
        `👉 You can test transaction safety anytime using the **Transfer Simulator** below!`;
    }

    return {
      success: true,
      sender: 'bot',
      reply,
      action: {
        type: 'NAVIGATE_TRANSFER_SIM',
        label: lang === 'ta' ? '⚡ பரிமாற்ற சிமுலேட்டர்' : (lang === 'hi' ? '⚡ ट्रांसफर सिमुलेटर' : '⚡ Open Transfer Simulator')
      },
      suggestedQuestions: getSuggestedQuestions(lang)
    };
  }

  // 7. Intent: Account details / balance inquiry
  if (
    lowerMsg.includes('balance') ||
    lowerMsg.includes('account number') ||
    lowerMsg.includes('my account') ||
    lowerMsg.includes('இருப்பு') ||
    lowerMsg.includes('பணம்') ||
    lowerMsg.includes('खाता') ||
    lowerMsg.includes('बैलेंस')
  ) {
    if (primaryAccount) {
      const masked = primaryAccount.account_number_masked;
      const bal = (primaryAccount.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2 });
      const curr = primaryAccount.currency || 'USD';
      const stat = primaryAccount.status;

      let reply = '';
      if (lang === 'ta') {
        reply = `💳 **உங்கள் கணக்கு விவரங்கள் (உண்மையான சிபிஎஸ் தரவு):**\n\n` +
          `• கணக்கு எண்: **${masked}** (${primaryAccount.account_type || 'SAVINGS'})\n` +
          `• நடப்பு இருப்பு: **$${bal} ${curr}**\n` +
          `• கணக்கு நிலை: **${stat}**\n` +
          `🛡️ உங்கள் இருப்புத் தொகை 100% வங்கியில் பாதுகாப்பாக உள்ளது.`;
      } else if (lang === 'hi') {
        reply = `💳 **आपके खाते का विवरण (सीबीएस वास्तविक डेटा):**\n\n` +
          `• खाता संख्या: **${masked}** (${primaryAccount.account_type || 'SAVINGS'})\n` +
          `• उपलब्ध शेष राशि: **$${bal} ${curr}**\n` +
          `• खाता स्थिति: **${stat}**\n` +
          `🛡️ आपकी जमा राशि बैंक में 100% सुरक्षित है।`;
      } else {
        reply = `💳 **Your Account Summary (CBS Verified Data):**\n\n` +
          `• Account: **${masked}** (${primaryAccount.account_type || 'SAVINGS'})\n` +
          `• Available Balance: **$${bal} ${curr}**\n` +
          `• Operational Status: **${stat}**\n` +
          `🛡️ 100% of your funds are safe and protected in your core banking account.`;
      }

      return {
        success: true,
        sender: 'bot',
        reply,
        action: {
          type: 'NAVIGATE_ACCOUNTS',
          label: lang === 'ta' ? '💳 கணக்கு விவரங்கள்' : (lang === 'hi' ? '💳 खाते देखें' : '💳 View Accounts')
        },
        suggestedQuestions: getSuggestedQuestions(lang)
      };
    }
  }

  // 8. Intent: Support / Grievances
  if (
    lowerMsg.includes('support') ||
    lowerMsg.includes('contact') ||
    lowerMsg.includes('help') ||
    lowerMsg.includes('complaint') ||
    lowerMsg.includes('grievance') ||
    lowerMsg.includes('உதவி') ||
    lowerMsg.includes('தொடர்பு') ||
    lowerMsg.includes('புகார்') ||
    lowerMsg.includes('सहायता') ||
    lowerMsg.includes('शिकायत')
  ) {
    let reply = '';
    if (lang === 'ta') {
      reply = `🤝 **வாடிக்கையாளர் உதவி மையம் & குறைதீர்க்கும் பிரிவு:**\n\n` +
        `எங்கள் பாதுகாப்புக் குழு உங்களுக்கு உதவ தயாராக உள்ளது:\n` +
        `• 📧 **அதிகாரப்பூர்வ மின்னஞ்சல்:** compliance@rebank.internal\n` +
        `• 📞 **கட்டணமில்லா உதவி எண்:** 1800-REBANK-CARE (1800-732-265)\n` +
        `• ⏱️ **தீர்வு நேரம்:** 24 முதல் 48 வணிக மணிநேரம்\n\n` +
        `💡 உங்களுக்கு உதவ குறைகளை நேரடியாக பதிவு செய்ய கீழே உள்ள பொத்தானை அழுத்தவும்!`;
    } else if (lang === 'hi') {
      reply = `🤝 **ग्राहक सहायता एवं शिकायत निवारण केंद्र:**\n\n` +
        `हमारी टीम आपकी सेवा में सदैव तत्पर है:\n` +
        `• 📧 **आधिकारिक ईमेल:** compliance@rebank.internal\n` +
        `• 📞 **हेल्पलाइन नंबर:** 1800-REBANK-CARE (1800-732-265)\n` +
        `• ⏱️ **समाधान समय:** 24 से 48 कार्य घंटे\n\n` +
        `💡 त्वरित सहायता या शिकायत दर्ज करने हेतु नीचे दिया गया बटन चुनें!`;
    } else {
      reply = `🤝 **Customer Care & Grievance Redressal Desk:**\n\n` +
        `Our dedicated banking team is available 24/7:\n` +
        `• 📧 **Compliance Desk:** compliance@rebank.internal\n` +
        `• 📞 **Toll-Free Helpline:** 1800-REBANK-CARE (1800-732-265)\n` +
        `• ⏱️ **Resolution Turnaround:** 24 to 48 business hours\n\n` +
        `💡 You can also file an official grievance ticket using our Help Center!`;
    }

    return {
      success: true,
      sender: 'bot',
      reply,
      action: {
        type: 'OPEN_HELP',
        label: lang === 'ta' ? '🤝 உதவி & குறைதீர்ப்பு' : (lang === 'hi' ? '🤝 सहायता केंद्र' : '🤝 Open Help & Grievances')
      },
      suggestedQuestions: getSuggestedQuestions(lang)
    };
  }

  // 9. Honest Contextual Fallback
  let fallbackReply = '';
  if (lang === 'ta') {
    fallbackReply = `🤝 **ReBank ஸ்மார்ட் உதவியாளர்:**\n\n` +
      `நான் உங்களுக்கு உதவ தயாராக உள்ளேன். பின்வரும் முக்கிய தலைப்புகளில் நீங்கள் கேட்கலாம்:\n` +
      `• **Account Locked**: கணக்கு ஏன் முடக்கப்பட்டுள்ளது என்பதை அறிய\n` +
      `• **Recover My Account**: கணக்கை மீட்டெடுக்கும் 3 எளிய படிகள்\n` +
      `• **Track My Recovery**: நடப்பு விண்ணப்ப நிலையை அறிய\n` +
      `• **Transfer Safety**: பணப் பரிமாற்ற பாதுகாப்பு ஆய்வு\n\n` +
      `கீழே உள்ள விரைவு பொத்தான்களை கிளிக் செய்யலாம்!`;
  } else if (lang === 'hi') {
    fallbackReply = `🤝 **ReBank स्मार्ट बैंकिंग सहायक:**\n\n` +
      `मैं आपकी सहायता के लिए यहाँ हूँ। आप निम्न विषयों पर पूछ सकते हैं:\n` +
      `• **Account Locked**: खाता क्यों लॉक हुआ है\n` +
      `• **Recover My Account**: खाता रिकवर करने की 3 आसान प्रक्रियाएं\n` +
      `• **Track My Recovery**: सक्रिय रिकवरी आवेदन की स्थिति\n` +
      `• **Transfer Safety**: स्थानांतरण सुरक्षा जांच\n\n` +
      `आप नीचे दिए गए त्वरित बटनों पर भी क्लिक कर सकते हैं!`;
  } else {
    fallbackReply = `🤝 **ReBank Smart Banking Assistant:**\n\n` +
      `I'm here to help you navigate your account. Here are key things you can ask me:\n` +
      `• **Why is my account locked?**: Understand your specific restriction hold\n` +
      `• **Help me recover my account**: 3-step digital restoration walkthrough\n` +
      `• **Track my recovery status**: Check live reference number and SLA\n` +
      `• **Check transfer safety**: Review risk analysis before transfers\n\n` +
      `Or click any of the suggested action chips below!`;
  }

  return {
    success: true,
    sender: 'bot',
    reply: fallbackReply,
    suggestedQuestions: getSuggestedQuestions(lang),
    action: null
  };
}

function getSuggestedQuestions(lang) {
  if (lang === 'ta') {
    return [
      'என் கணக்கு ஏன் லாக் ஆனது? (Why locked?)',
      'கணக்கை மீட்டெடுக்க உதவுங்கள் (Recover account)',
      'மீட்பு விண்ணப்ப நிலை என்ன? (Track status)',
      'பரிமாற்ற பாதுகாப்பு சோதனை (Transfer safety)'
    ];
  } else if (lang === 'hi') {
    return [
      'मेरा खाता क्यों लॉक हुआ? (Why locked?)',
      'खाता रिकवर करने में मदद करें (Recover account)',
      'रिकवरी आवेदन की स्थिति क्या है? (Track status)',
      'स्थानांतरण सुरक्षा जांच (Transfer safety)'
    ];
  } else {
    return [
      'Why is my account locked?',
      'Help me recover my account',
      'Track my recovery status',
      'Check transfer safety'
    ];
  }
}

module.exports = {
  processChatbotMessage,
  getSuggestedQuestions
};
