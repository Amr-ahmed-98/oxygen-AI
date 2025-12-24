/**
 * Preset Selector + Scoring Algorithm
 * يختار أقرب preset بناءً على classifier output
 */

import presetsIndex from '../../catalog/presets/index.json';

/**
 * Score preset against classifier output
 */
function scorePreset(classifierOutput, preset) {
  let score = 0;

  // 1. ProductType match (+40 if exact, +15 if related)
  if (classifierOutput.productType === preset.productType) {
    score += 40;
  } else {
    // Related product types (could be enhanced)
    const relatedTypes = getRelatedProductTypes(classifierOutput.productType);
    if (relatedTypes.includes(preset.productType)) {
      score += 15;
    }
  }

  // 2. Delivery match (+20)
  if (preset.delivery.includes(classifierOutput.deliveryMode)) {
    score += 20;
  }

  // 3. Platforms match (+15, +5 per platform)
  const platformMatches = classifierOutput.platforms.filter(p => preset.platforms.includes(p));
  score += platformMatches.length * 5;

  // 4. RTL match (+5)
  if (classifierOutput.rtl === preset.rtl) {
    score += 5;
  }

  // 5. Tags/keywords overlap (+15 max)
  const keywordOverlap = calculateKeywordOverlap(classifierOutput.keywords, preset.tags);
  score += Math.min(keywordOverlap, 15);

  // 6. Persona fit (+5)
  // This could be enhanced with persona mapping
  score += 5;

  // Penalties
  // Missing required platform (-10)
  const missingPlatforms = classifierOutput.platforms.filter(p => !preset.platforms.includes(p));
  score -= missingPlatforms.length * 10;

  // Conflicting delivery (-20)
  if (isDeliveryConflict(classifierOutput.deliveryMode, preset.delivery)) {
    score -= 20;
  }

  // ProductType mismatch (-25)
  if (score < 20 && classifierOutput.productType !== preset.productType) {
    score -= 25;
  }

  return score;
}

/**
 * Select best preset
 */
export function selectPreset(classifierOutput) {
  const scored = presetsIndex.presets.map(preset => ({
    presetId: preset.presetId,
    score: scorePreset(classifierOutput, preset),
    defaultTheme: preset.defaultTheme
  }));

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);
  const best = scored[0];

  // Decision logic
  if (best.score >= 75) {
    return {
      presetId: best.presetId,
      score: best.score,
      defaultTheme: best.defaultTheme,
      confidence: 'high'
    };
  }

  if (best.score >= 60) {
    return {
      presetId: best.presetId,
      score: best.score,
      defaultTheme: best.defaultTheme,
      confidence: 'medium',
      assumptions: true
    };
  }

  // Fallback
  return {
    presetId: 'helpdesk-b2b-sla-saas', // General SaaS fallback
    score: 0,
    defaultTheme: 'erp-professional',
    confidence: 'low',
    fallback: true
  };
}

/**
 * Helper: Calculate keyword overlap
 */
function calculateKeywordOverlap(keywords, tags) {
  const lowerKeywords = keywords.map(k => k.toLowerCase());
  const lowerTags = tags.map(t => t.toLowerCase());
  
  let matches = 0;
  for (const keyword of lowerKeywords) {
    if (lowerTags.some(tag => tag.includes(keyword) || keyword.includes(tag))) {
      matches++;
    }
  }
  
  return matches * 2; // Weight per match
}

/**
 * Helper: Check delivery conflict
 */
function isDeliveryConflict(mode, presetDelivery) {
  if (mode === 'onPremise' && presetDelivery.includes('multiTenantSaaS')) {
    return true;
  }
  if (mode === 'multiTenantSaaS' && presetDelivery.includes('onPremise')) {
    return true;
  }
  return false;
}

/**
 * Helper: Get related product types
 */
function getRelatedProductTypes(productType) {
  const relations = {
    'HELPDESK_ITSM': ['CRM', 'PROJECT_WORK'],
    'CRM': ['HELPDESK_ITSM', 'PROJECT_WORK'],
    'HRMS_HCM': ['PROJECT_WORK'],
    'WMS_TMS': ['ECOMMERCE'],
    'POS': ['ECOMMERCE', 'MARKETPLACE'],
    'ECOMMERCE': ['MARKETPLACE', 'POS'],
    'MARKETPLACE': ['ECOMMERCE']
  };
  
  return relations[productType] || [];
}

/**
 * Choose theme pack based on classifier output and preset default
 */
export function chooseThemePack(classifierOutput, presetDefaultTheme) {
  const { productType, keywords, persona, deliveryMode } = classifierOutput;
  const lowerKeywords = keywords.map(k => k.toLowerCase()).join(' ');

  // Rule 1: On-premise or GovTech → gov-onprem-rtl
  if (deliveryMode === 'onPremise' || lowerKeywords.includes('government') || lowerKeywords.includes('gov')) {
    return 'gov-onprem-rtl';
  }

  // Rule 2: Data-heavy products
  const dataHeavyTypes = ['WMS_TMS', 'HRMS_HCM', 'ERP_LITE', 'HELPDESK_ITSM'];
  if (dataHeavyTypes.includes(productType)) {
    if (lowerKeywords.includes('dense') || lowerKeywords.includes('power user') || persona === 'powerUser') {
      return 'enterprise-dense';
    }
    return 'erp-professional';
  }

  // Rule 3: Fintech/Analytics
  if (productType === 'BILLING_SUBSCRIPTION' || productType === 'BI_ANALYTICS' || 
      lowerKeywords.includes('analytics') || lowerKeywords.includes('fintech') || 
      lowerKeywords.includes('dashboard')) {
    return 'fintech-dark';
  }

  // Rule 4: Glass/Modern/AI
  if (lowerKeywords.includes('glass') || lowerKeywords.includes('frost') || 
      lowerKeywords.includes('modern') && lowerKeywords.includes('ai')) {
    return 'glass-modern';
  }

  // Rule 5: Minimal/Clean
  if (lowerKeywords.includes('minimal') || lowerKeywords.includes('clean') || 
      lowerKeywords.includes('simple') || persona === 'minimal') {
    return 'minimal-saas';
  }

  // Rule 6: Commerce/Marketplace
  if (['ECOMMERCE', 'MARKETPLACE', 'BOOKING', 'POS'].includes(productType)) {
    if (persona === 'warm' || lowerKeywords.includes('friendly')) {
      return 'marketplace-warm';
    }
    return 'minimal-saas';
  }

  // Rule 7: Brutal
  if (lowerKeywords.includes('brutal') || lowerKeywords.includes('bold') || 
      lowerKeywords.includes('poster') || persona === 'brutal') {
    return 'neo-brutal';
  }

  // Fallback to preset default
  return presetDefaultTheme || 'erp-professional';
}

