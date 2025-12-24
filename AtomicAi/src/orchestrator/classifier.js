/**
 * Deterministic Classifier (بدون LLM)
 * يستخدم keyword-map.json للتصنيف
 */

import keywordMap from '../../catalog/classifier/keyword-map.json';

/**
 * Normalize text
 */
function normalize(text) {
  return text.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Classify prompt text
 */
export function classify(promptText) {
  const normalized = normalize(promptText);
  
  // 1. Product Type
  const productType = classifyProductType(normalized);
  
  // 2. Delivery Mode
  const deliveryMode = classifyDeliveryMode(normalized);
  const deployment = deliveryMode === 'onPremise' ? 'onPremise' : 
                    (deliveryMode === 'hybrid' ? 'hybrid' : 'cloudNative');
  
  // 3. Persona
  const persona = classifyPersona(normalized);
  
  // 4. Platforms
  const platforms = inferPlatforms(normalized);
  
  // 5. RTL
  const rtl = inferRTL(normalized);
  
  // 6. Vertical
  const vertical = classifyVertical(normalized);
  
  // 7. Keywords
  const keywords = extractKeywords(normalized);
  
  // 8. Constraints
  const constraints = inferConstraints(normalized, deliveryMode);
  
  // 9. MustHave
  const mustHave = getMustHaveDefaults(productType);

  return {
    productType,
    deliveryMode,
    deployment,
    platforms,
    rtl,
    persona,
    vertical,
    keywords,
    mustHave,
    constraints
  };
}

/**
 * Classify product type
 */
function classifyProductType(text) {
  const scores = {};
  
  for (const [type, signals] of Object.entries(keywordMap.productTypeSignals)) {
    let score = 0;
    for (const kw of signals.keywords) {
      if (text.includes(kw.k.toLowerCase())) {
        score += kw.w;
      }
    }
    scores[type] = score;
  }
  
  const maxScore = Math.max(...Object.values(scores));
  const bestType = Object.keys(scores).find(key => scores[key] === maxScore);
  
  // Threshold: if max score < 12, use GENERAL_SAAS
  return maxScore >= 12 ? bestType : 'GENERAL_SAAS';
}

/**
 * Classify delivery mode
 */
function classifyDeliveryMode(text) {
  // Check for on-premise first
  for (const kw of keywordMap.deliverySignals.onPremise.keywords) {
    if (text.includes(kw.k.toLowerCase())) {
      return 'onPremise';
    }
  }
  
  // Check for SaaS
  for (const kw of keywordMap.deliverySignals.multiTenantSaaS.keywords) {
    if (text.includes(kw.k.toLowerCase())) {
      return 'multiTenantSaaS';
    }
  }
  
  // Default
  return 'multiTenantSaaS';
}

/**
 * Classify persona
 */
function classifyPersona(text) {
  const scores = {};
  
  for (const [persona, signals] of Object.entries(keywordMap.personaSignals)) {
    let score = 0;
    for (const kw of signals) {
      if (text.includes(kw.k.toLowerCase())) {
        score += kw.w;
      }
    }
    scores[persona] = score;
  }
  
  const maxScore = Math.max(...Object.values(scores));
  const bestPersona = Object.keys(scores).find(key => scores[key] === maxScore);
  
  return maxScore >= 8 ? bestPersona : 'general';
}

/**
 * Infer platforms
 */
function inferPlatforms(text) {
  const platforms = ['web']; // Default
  
  if (text.includes('mobile') || text.includes('app') || text.includes('ios') || text.includes('android')) {
    platforms.push('mobile');
  }
  
  if (text.includes('desktop') || text.includes('windows') || text.includes('mac') || text.includes('electron') || text.includes('tauri')) {
    platforms.push('desktop');
  }
  
  return platforms;
}

/**
 * Infer RTL
 */
function inferRTL(text) {
  return text.includes('rtl') || text.includes('عربي') || text.includes('arabic') || 
         text.includes('right to left') || text.includes('r-t-l');
}

/**
 * Classify vertical
 */
function classifyVertical(text) {
  const scores = {};
  
  for (const [vertical, signals] of Object.entries(keywordMap.verticalSignals)) {
    let score = 0;
    for (const kw of signals) {
      if (text.includes(kw.k.toLowerCase())) {
        score += kw.w;
      }
    }
    scores[vertical] = score;
  }
  
  const maxScore = Math.max(...Object.values(scores));
  const bestVertical = Object.keys(scores).find(key => scores[key] === maxScore);
  
  return maxScore >= 7 ? bestVertical : 'general';
}

/**
 * Extract keywords
 */
function extractKeywords(text) {
  const allKeywords = [];
  
  // Collect all keywords from all signals
  for (const signals of Object.values(keywordMap.productTypeSignals)) {
    for (const kw of signals.keywords) {
      if (text.includes(kw.k.toLowerCase())) {
        allKeywords.push(kw.k);
      }
    }
  }
  
  return [...new Set(allKeywords)].slice(0, 40); // Unique, max 40
}

/**
 * Infer constraints
 */
function inferConstraints(text, deliveryMode) {
  const constraints = {
    noExternalCDN: false,
    offlineFirst: false,
    sso: false,
    headless: false,
    strictAudit: false
  };
  
  // Check delivery signals
  if (deliveryMode === 'onPremise') {
    constraints.noExternalCDN = true;
  }
  
  // Check offline
  for (const kw of keywordMap.deliverySignals.offlineFirst.keywords) {
    if (text.includes(kw.k.toLowerCase())) {
      constraints.offlineFirst = true;
      break;
    }
  }
  
  // Check headless
  for (const kw of keywordMap.deliverySignals.headless.keywords) {
    if (text.includes(kw.k.toLowerCase())) {
      constraints.headless = true;
      break;
    }
  }
  
  // Check SSO
  if (text.includes('sso') || text.includes('single sign-on') || text.includes('saml') || text.includes('oidc')) {
    constraints.sso = true;
  }
  
  // Check audit
  if (text.includes('audit') || text.includes('compliance') || text.includes('government')) {
    constraints.strictAudit = true;
  }
  
  return constraints;
}

/**
 * Get must-have defaults for product type
 */
function getMustHaveDefaults(productType) {
  const signals = keywordMap.productTypeSignals[productType];
  return signals ? signals.mustHaveDefaults : [];
}

