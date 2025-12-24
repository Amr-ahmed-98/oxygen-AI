/**
 * Main Generator Function
 * Blueprint كامل: Retrieve → Compose → Validate → Render
 */

import { ProductComposer } from '../composer/product-composer.js';
import SpecValidators from '../validators/spec-validators.js';
import AutoFixSystem from '../validators/auto-fix.js';

export class AppGenerator {
  constructor(options = {}) {
    this.llmClient = options.llmClient;
    this.catalogLoader = options.catalogLoader;
    this.composer = new ProductComposer();
    this.validators = new SpecValidators();
    this.autoFix = new AutoFixSystem(this.llmClient);
    this.renderers = options.renderers || {};
  }

  /**
   * Generate complete application from input
   * @param {Object} input - User input (brief, preset, or spec)
   * @returns {Promise<Object>} Generated project
   */
  async generate(input) {
    console.log('🚀 Starting generation...');

    // Step 1: Normalize Spec
    console.log('📝 Step 1: Normalizing spec...');
    const spec = await this.normalizeSpec(input);
    console.log('✅ Spec normalized:', spec.productType || spec.presetId);

    // Step 2: Retrieve (RAG)
    console.log('🔍 Step 2: Retrieving catalog context...');
    const context = await this.retrieveCatalogContext(spec);
    console.log(`✅ Retrieved ${context.manifests.length} manifests`);

    // Step 3: Compose
    console.log('🧩 Step 3: Composing app spec...');
    let composed = await this.composeAppSpec(spec, context);
    console.log(`✅ Composed: ${composed.routes?.length || 0} routes, ${composed.screens?.length || 0} screens`);

    // Step 4: Validate & Auto-fix loop
    console.log('✅ Step 4: Validating spec...');
    let errors = this.validators.validate(composed);
    console.log(`Found ${errors.length} validation errors`);

    if (errors.length > 0 && this.llmClient) {
      console.log('🔧 Auto-fixing errors...');
      const fixResult = await this.autoFix.fixSpec(composed, errors, context);
      composed = fixResult.spec;
      errors = fixResult.errors;
      console.log(`✅ Fixed ${fixResult.iterations} iteration(s), ${errors.length} errors remaining`);
    }

    // Final validation check
    if (errors.length > 0) {
      const criticalErrors = errors.filter(e => e.severity === 'error');
      if (criticalErrors.length > 0) {
        throw new Error(`Spec validation failed with ${criticalErrors.length} critical errors:\n${JSON.stringify(criticalErrors, null, 2)}`);
      }
      console.warn(`⚠️ ${errors.length} warnings remaining (non-critical)`);
    }

    // Step 5: Render
    console.log('🎨 Step 5: Rendering code...');
    const rendered = await this.renderAll(composed);

    // Step 6: Export
    console.log('📦 Step 6: Exporting project...');
    const exported = await this.exportProject(composed, rendered);

    console.log('✅ Generation complete!');
    return {
      spec: composed,
      rendered,
      exported,
      warnings: errors.filter(e => e.severity === 'warning')
    };
  }

  /**
   * Step 1: Normalize Spec
   * Merge preset + user overrides + apply rules matrix
   */
  async normalizeSpec(input) {
    let spec;

    // If input is a brief (string), convert to spec using LLM
    if (typeof input === 'string') {
      if (!this.llmClient) {
        throw new Error('LLM client required to convert brief to spec');
      }
      const { buildPrompt } = await import('../rag/prompts/llm-prompts.js');
      const prompt = buildPrompt('briefToProductSpec', input);
      const llmResult = await this.llmClient.generate(prompt);
      spec = JSON.parse(llmResult);
    }
    // If input has presetId, load preset
    else if (input.presetId) {
      const preset = await this.loadPreset(input.presetId);
      spec = this.mergeSpecs(preset, input.overrides || {});
    }
    // Otherwise assume it's already a spec
    else {
      spec = input;
    }

    // Apply rules matrix
    spec = this.composer.applyRulesMatrix(spec);

    return spec;
  }

  /**
   * Step 2: Retrieve Catalog Context (RAG)
   */
  async retrieveCatalogContext(spec) {
    const context = {
      manifests: [],
      productPack: null,
      examples: [],
      rules: []
    };

    // Load product pack
    if (spec.productType) {
      context.productPack = await this.composer.loadProductPack(spec.productType);
    }

    // Retrieve component manifests based on spec
    const requiredPatterns = this.extractRequiredPatterns(spec);
    
    for (const patternId of requiredPatterns) {
      try {
        const manifest = await this.catalogLoader?.(`patterns/${patternId}`);
        if (manifest) {
          context.manifests.push(manifest);
        }
      } catch (error) {
        console.warn(`Could not load manifest for ${patternId}:`, error.message);
      }
    }

    // Load rules matrix relevant rules
    const rulesMatrix = await import('../catalog/rules/rules-matrix.json');
    context.rules = rulesMatrix.default?.rules || rulesMatrix.rules || [];

    return context;
  }

  /**
   * Step 3: Compose App Spec
   */
  async composeAppSpec(spec, context) {
    return await this.composer.compose(spec, this.catalogLoader);
  }

  /**
   * Step 5: Render All Platforms
   */
  async renderAll(composed) {
    const rendered = {
      web: null,
      mobile: null,
      desktop: null
    };

    const platforms = composed.app?.platforms || ['web'];

    if (platforms.includes('web') && this.renderers.web) {
      rendered.web = await this.renderers.web.render(composed);
    }

    if (platforms.includes('mobile') && this.renderers.mobile) {
      rendered.mobile = await this.renderers.mobile.render(composed);
    }

    if (platforms.includes('desktop') && this.renderers.desktop) {
      rendered.desktop = await this.renderers.desktop.render(composed);
    }

    return rendered;
  }

  /**
   * Step 6: Export Project
   */
  async exportProject(composed, rendered) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const projectName = composed.app?.name?.toLowerCase().replace(/\s+/g, '-') || 'app';
    
    return {
      projectName,
      timestamp,
      structure: {
        'app-spec.json': composed,
        'package.json': this.generatePackageJson(composed),
        'README.md': this.generateREADME(composed),
        'build.sh': this.generateBuildScript(composed),
        ...(rendered.web && { web: rendered.web }),
        ...(rendered.mobile && { mobile: rendered.mobile }),
        ...(rendered.desktop && { desktop: rendered.desktop })
      }
    };
  }

  /**
   * Helper: Load preset
   */
  async loadPreset(presetId) {
    try {
      const preset = await import(`../catalog/presets/${presetId}.preset.json`);
      return preset.default || preset;
    } catch (error) {
      throw new Error(`Preset not found: ${presetId}`);
    }
  }

  /**
   * Helper: Merge specs
   */
  mergeSpecs(base, overrides) {
    return this.deepMerge(structuredClone(base), overrides);
  }

  /**
   * Helper: Deep merge
   */
  deepMerge(target, source) {
    if (!source) return target;
    if (!target) return source;
    if (typeof source !== 'object' || typeof target !== 'object') return source;

    const result = { ...target };
    Object.keys(source).forEach(key => {
      if (Array.isArray(source[key])) {
        result[key] = source[key];
      } else if (typeof source[key] === 'object' && source[key] !== null) {
        result[key] = this.deepMerge(target[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    });

    return result;
  }

  /**
   * Helper: Extract required patterns from spec
   */
  extractRequiredPatterns(spec) {
    const patterns = new Set();

    // From product pack
    if (spec.productPack?.primaryPatterns) {
      spec.productPack.primaryPatterns.forEach(p => patterns.add(p));
    }

    // From screens
    spec.screens?.forEach(screen => {
      if (screen.view?.web?.layout) patterns.add(screen.view.web.layout);
      if (screen.view?.mobile?.layout) patterns.add(screen.view.mobile.layout);
      if (screen.view?.desktop?.layout) patterns.add(screen.view.desktop.layout);
    });

    // Common patterns always needed
    patterns.add('shell.app');
    patterns.add('shell.sidebar.grouped');

    return Array.from(patterns);
  }

  /**
   * Helper: Generate package.json
   */
  generatePackageJson(spec) {
    return {
      name: spec.app?.name?.toLowerCase().replace(/\s+/g, '-') || 'app',
      version: '1.0.0',
      description: `Generated ${spec.productType || 'application'}`,
      scripts: {
        dev: 'npm run dev:web',
        'dev:web': 'next dev',
        'dev:mobile': 'expo start',
        'dev:desktop': 'npm run tauri dev',
        build: 'npm run build:web',
        'build:web': 'next build',
        'build:mobile': 'expo build',
        'build:desktop': 'npm run tauri build'
      }
    };
  }

  /**
   * Helper: Generate README
   */
  generateREADME(spec) {
    return `# ${spec.app?.name || 'Application'}

Generated application specification.

## Product Type
${spec.productType || 'N/A'}

## Platforms
${spec.app?.platforms?.join(', ') || 'web'}

## Modules
${spec.modules?.join('\n- ') || 'N/A'}

## Getting Started
\`\`\`bash
npm install
npm run dev
\`\`\`
`;
  }

  /**
   * Helper: Generate build script
   */
  generateBuildScript(spec) {
    return `#!/bin/bash
# Build script for ${spec.app?.name || 'application'}

echo "Building application..."

# Build web
if [ -d "web" ]; then
  cd web && npm run build && cd ..
fi

# Build mobile
if [ -d "mobile" ]; then
  cd mobile && npm run build && cd ..
fi

# Build desktop
if [ -d "desktop" ]; then
  cd desktop && npm run build && cd ..
fi

echo "Build complete!"
`;
  }
}

export default AppGenerator;

