/**
 * LLM Integration for Spec Generation
 * Integrates with ChatGPT API/LLM to generate App Specs from natural language
 */

export class LLMIntegration {
  constructor(apiKey, catalogLoader) {
    this.apiKey = apiKey;
    this.catalogLoader = catalogLoader;
    this.apiUrl = 'https://api.openai.com/v1/chat/completions';
  }

  /**
   * Generate app spec from brief using RAG
   */
  async generateAppSpec(brief, options = {}) {
    // Step 1: RAG - Retrieve relevant manifests
    const relevantManifests = this.catalogLoader.search(brief, {
      limit: 20
    });

    // Step 2: Build context for LLM
    const context = this.buildContext(relevantManifests, brief);

    // Step 3: Generate spec via LLM
    const spec = await this.callLLM(context, options);

    return spec;
  }

  /**
   * Build context from manifests
   */
  buildContext(manifests, brief) {
    const manifestDescriptions = manifests.map(m => ({
      id: m.id,
      level: m.level,
      title: m.title,
      description: m.description,
      category: m.category,
      tags: m.tags,
      whenToUse: m.whenToUse,
      whenNotToUse: m.whenNotToUse,
      slots: m.slots ? Object.keys(m.slots) : [],
      props: m.props ? Object.keys(m.props) : []
    }));

    return {
      brief,
      availableComponents: manifestDescriptions,
      schema: this.getAppSpecSchema()
    };
  }

  /**
   * Call LLM to generate spec
   */
  async callLLM(context, options = {}) {
    const prompt = this.buildPrompt(context);

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: options.model || 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: this.getSystemPrompt()
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: options.temperature || 0.3,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      throw new Error(`LLM API error: ${response.statusText}`);
    }

    const data = await response.json();
    const specJson = JSON.parse(data.choices[0].message.content);

    return specJson;
  }

  /**
   * Build prompt for LLM
   */
  buildPrompt(context) {
    return `Generate an app specification from this brief:

BRIEF:
${context.brief}

AVAILABLE COMPONENTS:
${JSON.stringify(context.availableComponents, null, 2)}

SCHEMA:
${JSON.stringify(context.schema, null, 2)}

Generate a valid app-spec.json following the schema. Include:
1. App metadata (name, type, platforms)
2. Security settings (auth, RBAC, multi-tenant if needed)
3. Navigation structure for each platform
4. Modules list
5. Routes with screens
6. Screen definitions using available components

Return ONLY valid JSON matching the schema.`;
  }

  /**
   * Get system prompt
   */
  getSystemPrompt() {
    return `You are an expert at generating application specifications from natural language briefs.

You generate platform-agnostic app specs that can be rendered to Web/Mobile/Desktop.

Rules:
- Always use components from the available components list
- Follow the schema exactly
- Generate specs that are valid and complete
- Consider platform differences (web/mobile/desktop)
- Include proper navigation structures
- Add appropriate permissions/RBAC if mentioned
- Use proper component IDs from the catalog

Output only valid JSON matching the app-spec schema.`;
  }

  /**
   * Get app spec schema (simplified for prompt)
   */
  getAppSpecSchema() {
    return {
      app: {
        name: "string",
        type: "saas|erp|crm|ecommerce|agency|portfolio|blog|dashboard",
        platforms: ["web", "mobile", "desktop"],
        locale: { default: "string", rtl: "boolean" },
        themePack: "string",
        density: "compact|comfortable|airy"
      },
      security: {
        multiTenant: "boolean",
        auth: { method: "string", twoFactor: "boolean" },
        rbac: "boolean"
      },
      navigation: {
        web: {},
        mobile: {},
        desktop: {}
      },
      modules: ["string"],
      routes: [
        {
          id: "string",
          path: "string",
          screen: "string",
          permission: "string (optional)"
        }
      ],
      screens: {
        "screen.id": {
          type: "list|create|edit|detail|dashboard|settings|custom",
          entity: "string (optional)",
          components: []
        }
      }
    };
  }

  /**
   * Validate and fix spec (iterative refinement)
   */
  async validateAndFix(spec, validators) {
    const errors = validators.validate(spec);

    if (errors.length === 0) {
      return { spec, fixed: false };
    }

    // Fix spec via LLM
    const fixedSpec = await this.fixSpec(spec, errors);

    return { spec: fixedSpec, fixed: true };
  }

  /**
   * Fix spec based on validation errors
   */
  async fixSpec(spec, errors) {
    const prompt = `Fix this app spec based on validation errors:

CURRENT SPEC:
${JSON.stringify(spec, null, 2)}

VALIDATION ERRORS:
${JSON.stringify(errors, null, 2)}

Fix all errors and return the corrected spec as valid JSON.`;

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You fix application specs based on validation errors. Return only valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.2,
        response_format: { type: 'json_object' }
      })
    });

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  }
}

export default LLMIntegration;

