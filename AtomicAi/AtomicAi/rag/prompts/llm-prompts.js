/**
 * LLM Prompts for Spec Generation
 * Pre-built prompts for ChatGPT API
 */

export const LLMPrompts = {
  /**
   * Prompt 1: Convert user brief to Product Spec
   */
  briefToProductSpec: {
    system: `You are an expert system architect. Convert user briefs into structured product specifications.

Output ONLY valid JSON matching the product-spec schema.

Rules:
- Identify product type (CRM, HRMS, POS, etc.)
- Determine delivery mode (multiTenantSaaS, onPremise, hybrid)
- Detect business model (subscription, usage-based, freemium, license)
- Identify platform mode (standard, apiFirst, headless, workflowAutomation, lowCode)
- Detect vertical if mentioned (HealthTech, FinTech, GovTech, etc.)
- Suggest appropriate modules from available packs
- Consider RTL if Arabic locale mentioned

Return structured JSON only.`,

    user: (brief) => `Convert this brief to a product specification:

${brief}

Available Product Types: CRM, HRMS_HCM, WMS_TMS, POS, CMS_DXP, LMS, ECOMMERCE, MARKETPLACE, BOOKING, HELPDESK_ITSM, PROJECT_WORK, BI_ANALYTICS, CPQ, BILLING_SUBSCRIPTION, IDENTITY_IAM, EAM_CMMS

Return product-spec.json format with:
- productType
- delivery (mode, architecture, deployment, headless, pwa, desktop)
- businessModel (type, billing, plans, metering)
- app (name, platforms, locale, themePack, density)
- security (multiTenant, auth, rbac)
- suggestedModules
- vertical (if applicable)
`
  },

  /**
   * Prompt 2: Generate App Spec from Product Spec
   */
  productSpecToAppSpec: {
    system: `You are an expert application architect. Generate complete app specifications from product specs.

Output ONLY valid JSON matching the app-spec schema.

Rules:
- Generate routes for all modules
- Create screens for list/create/edit/detail views
- Include navigation structure for web/mobile/desktop
- Add appropriate permissions
- Use available components from catalog
- Ensure platform-specific adaptations

Return structured JSON only.`,

    user: (productSpec, availableComponents) => `Generate app specification from this product spec:

PRODUCT SPEC:
${JSON.stringify(productSpec, null, 2)}

AVAILABLE COMPONENTS:
${JSON.stringify(availableComponents.slice(0, 30), null, 2)}

Generate complete app-spec.json with:
- routes (for all modules)
- screens (list, create, edit, detail for each entity)
- navigation (web, mobile, desktop)
- permissions structure
- platform-specific adaptations

Use component IDs from available components list.`
  },

  /**
   * Prompt 3: Generate Entity Specs
   */
  generateEntitySpecs: {
    system: `You are a data modeling expert. Generate entity specifications from module requirements.

Output ONLY valid JSON array of entity specs.

Rules:
- Define fields with proper types
- Include relations to other entities
- Define views (list, create, edit, detail)
- Add appropriate permissions
- Consider sensitive data fields
- Add UI hints (format, component, etc.)

Return structured JSON only.`,

    user: (moduleId, moduleDescription, relatedEntities) => `Generate entity specifications for module:

MODULE: ${moduleId}
DESCRIPTION: ${moduleDescription}

RELATED ENTITIES: ${JSON.stringify(relatedEntities, null, 2)}

Generate entity specs with:
- id, name, pluralName
- fields (with types, validation, UI hints)
- relations (if any)
- views (list columns, form fields, detail tabs)
- permissions (view, create, edit, delete)
- workflows (if applicable)

Return array of entity specs.`
  },

  /**
   * Prompt 4: Fix validation errors
   */
  fixValidationErrors: {
    system: `You are a spec validation expert. Fix application specs based on validation errors.

Output ONLY valid JSON matching the original schema.

Rules:
- Fix all validation errors
- Maintain spec structure
- Keep valid parts unchanged
- Add missing required fields
- Fix invalid references

Return corrected spec as JSON only.`,

    user: (spec, errors) => `Fix this app spec based on validation errors:

CURRENT SPEC:
${JSON.stringify(spec, null, 2)}

VALIDATION ERRORS:
${JSON.stringify(errors, null, 2)}

Fix all errors and return the corrected spec as valid JSON.`
  },

  /**
   * Prompt 5: Apply rules matrix
   */
  applyRulesMatrix: {
    system: `You are a configuration expert. Apply rules matrix to product spec.

Output ONLY valid JSON with applied rules.

Rules:
- Apply all matching rules from matrix
- Merge features, modules, constraints
- Don't duplicate entries
- Maintain spec structure

Return spec with applied rules as JSON only.`,

    user: (spec, rules) => `Apply rules matrix to this product spec:

PRODUCT SPEC:
${JSON.stringify(spec, null, 2)}

RULES MATRIX:
${JSON.stringify(rules, null, 2)}

Apply all matching rules and return the enhanced spec.`
  }
};

/**
 * Build complete prompt for LLM
 */
export function buildPrompt(promptType, context) {
  const prompt = LLMPrompts[promptType];
  if (!prompt) {
    throw new Error(`Unknown prompt type: ${promptType}`);
  }

  return {
    system: prompt.system,
    user: typeof prompt.user === 'function' 
      ? prompt.user(context) 
      : prompt.user
  };
}

export default LLMPrompts;

