/**
 * Auto-Fix System
 * يصلح أخطاء Validation تلقائيًا باستخدام Rules أولاً ثم LLM إذا لزم الأمر
 */

import { buildPrompt } from '../rag/prompts/llm-prompts.js';
import autoFixRules from './auto-fix-rules.json';

export class AutoFixSystem {
  constructor(llmClient) {
    this.llmClient = llmClient;
    this.maxIterations = 3;
  }

  /**
   * Fix spec errors using Rules first, then LLM if needed
   */
  async fixSpec(spec, errors, context = {}) {
    let currentSpec = structuredClone(spec);
    let iteration = 0;

    while (iteration < this.maxIterations && errors.length > 0) {
      console.log(`Auto-fix iteration ${iteration + 1}/${this.maxIterations}`);
      console.log(`Errors to fix: ${errors.length}`);

      // Step 1: Try rule-based fixes first (fast, deterministic)
      const ruleFixed = this.applyRuleBasedFixes(currentSpec, errors, context);
      currentSpec = ruleFixed.spec;
      errors = ruleFixed.remainingErrors;

      // Step 2: If errors remain and LLM available, use LLM
      if (errors.length > 0 && this.llmClient) {
        const prompt = buildPrompt('fixValidationErrors', {
          spec: currentSpec,
          errors,
          context
        });

        const patch = await this.llmClient.generate(prompt);
        currentSpec = this.applyPatch(currentSpec, patch);
      }

      // Re-validate
      const validators = new (await import('./spec-validators.js')).SpecValidators();
      errors = validators.validate(currentSpec);

      if (errors.length === 0) {
        console.log('✅ All errors fixed!');
        break;
      }

      iteration++;
    }

    if (errors.length > 0) {
      console.warn(`⚠️ Still ${errors.length} errors after ${this.maxIterations} iterations`);
    }

    return { spec: currentSpec, errors, iterations: iteration + 1 };
  }

  /**
   * Apply JSON Patch to spec
   */
  applyPatch(spec, patch) {
    if (Array.isArray(patch)) {
      // JSON Patch format (RFC 6902)
      return this.applyJSONPatch(spec, patch);
    } else if (patch.spec) {
      // Partial spec update
      return this.mergePartialSpec(spec, patch.spec);
    } else {
      // Assume it's a partial spec
      return this.mergePartialSpec(spec, patch);
    }
  }

  /**
   * Apply JSON Patch operations
   */
  applyJSONPatch(spec, patch) {
    const result = structuredClone(spec);

    patch.forEach(operation => {
      const { op, path, value } = operation;
      const pathParts = path.split('/').filter(p => p);

      switch (op) {
        case 'add':
          this.setNestedValue(result, pathParts, value);
          break;
        case 'replace':
          this.setNestedValue(result, pathParts, value);
          break;
        case 'remove':
          this.removeNestedValue(result, pathParts);
          break;
        case 'move':
          const fromValue = this.getNestedValue(result, operation.from.split('/').filter(p => p));
          this.setNestedValue(result, pathParts, fromValue);
          this.removeNestedValue(result, operation.from.split('/').filter(p => p));
          break;
        case 'copy':
          const copyValue = this.getNestedValue(result, operation.from.split('/').filter(p => p));
          this.setNestedValue(result, pathParts, copyValue);
          break;
      }
    });

    return result;
  }

  /**
   * Merge partial spec into full spec
   */
  mergePartialSpec(spec, partial) {
    const merged = structuredClone(spec);

    // Deep merge
    if (partial.screens) {
      if (!merged.screens) merged.screens = [];
      
      partial.screens.forEach(partialScreen => {
        const existingIndex = merged.screens.findIndex(s => s.id === partialScreen.id);
        if (existingIndex >= 0) {
          merged.screens[existingIndex] = this.deepMerge(
            merged.screens[existingIndex],
            partialScreen
          );
        } else {
          merged.screens.push(partialScreen);
        }
      });
    }

    if (partial.routes) {
      merged.routes = this.deepMergeArray(merged.routes || [], partial.routes, 'id');
    }

    if (partial.entities) {
      merged.entities = this.deepMergeArray(merged.entities || [], partial.entities, 'entity');
    }

    // Merge other top-level properties
    Object.keys(partial).forEach(key => {
      if (!['screens', 'routes', 'entities'].includes(key)) {
        merged[key] = this.deepMerge(merged[key], partial[key]);
      }
    });

    return merged;
  }

  /**
   * Deep merge two objects
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
   * Deep merge arrays by key
   */
  deepMergeArray(target, source, keyField) {
    const result = [...target];

    source.forEach(sourceItem => {
      const existingIndex = result.findIndex(item => item[keyField] === sourceItem[keyField]);
      if (existingIndex >= 0) {
        result[existingIndex] = this.deepMerge(result[existingIndex], sourceItem);
      } else {
        result.push(sourceItem);
      }
    });

    return result;
  }

  /**
   * Helper: Get nested value
   */
  getNestedValue(obj, pathParts) {
    let current = obj;
    for (const part of pathParts) {
      if (current && typeof current === 'object') {
        current = current[part];
      } else {
        return undefined;
      }
    }
    return current;
  }

  /**
   * Helper: Set nested value
   */
  setNestedValue(obj, pathParts, value) {
    let current = obj;
    for (let i = 0; i < pathParts.length - 1; i++) {
      const part = pathParts[i];
      if (!current[part] || typeof current[part] !== 'object') {
        current[part] = {};
      }
      current = current[part];
    }
    current[pathParts[pathParts.length - 1]] = value;
  }

  /**
   * Helper: Remove nested value
   */
  removeNestedValue(obj, pathParts) {
    let current = obj;
    for (let i = 0; i < pathParts.length - 1; i++) {
      const part = pathParts[i];
      if (!current[part]) return;
      current = current[part];
    }
    delete current[pathParts[pathParts.length - 1]];
  }

  /**
   * Apply rule-based fixes (fast, deterministic)
   */
  applyRuleBasedFixes(spec, errors, context) {
    const fixedSpec = structuredClone(spec);
    const remainingErrors = [];

    errors.forEach(error => {
      // Find matching rule
      const rule = autoFixRules.rules.find(r => r.code === error.code);
      
      if (rule && this.checkRuleCondition(rule, error, spec, context)) {
        try {
          // Apply patches from rule
          const patches = this.resolvePatches(rule.patches, error, spec);
          patches.forEach(patch => {
            this.applyJSONPatchOperation(fixedSpec, patch);
          });
          console.log(`✅ Fixed ${error.code} using rule ${rule.id}`);
        } catch (err) {
          console.warn(`⚠️ Failed to apply rule ${rule.id}:`, err.message);
          remainingErrors.push(error);
        }
      } else {
        // No matching rule, keep error for LLM
        remainingErrors.push(error);
      }
    });

    return { spec: fixedSpec, remainingErrors };
  }

  /**
   * Check if rule condition matches
   */
  checkRuleCondition(rule, error, spec, context) {
    if (!rule.condition) return true;

    const condition = rule.condition;

    // Check screen type
    if (condition.screenType) {
      const screenTypes = Array.isArray(condition.screenType) 
        ? condition.screenType 
        : [condition.screenType];
      const actualScreenType = this.getScreenType(error.screen, spec);
      if (!screenTypes.includes(actualScreenType)) return false;
    }

    // Check platform
    if (condition.platform) {
      const platforms = Array.isArray(condition.platform) 
        ? condition.platform 
        : [condition.platform];
      // Platform check logic here
    }

    // Check field count
    if (condition.fieldCount) {
      const fieldCount = this.getFieldCount(error.screen, spec);
      if (condition.fieldCount.$gt && fieldCount <= condition.fieldCount.$gt) {
        return false;
      }
    }

    // Check delivery mode
    if (condition.deliveryMode) {
      if (spec.delivery?.mode !== condition.deliveryMode) return false;
    }

    // Check app locale
    if (condition.appLocale) {
      if (spec.app?.locale?.rtl !== true) return false;
    }

    return true;
  }

  /**
   * Resolve patches with placeholders
   */
  resolvePatches(patches, error, spec) {
    const resolved = [];
    
    patches.forEach(patch => {
      const resolvedPatch = { ...patch };
      
      // Resolve screenPath placeholder
      if (patch.path && patch.path.includes('{{screenPath}}')) {
        const screenPath = this.getScreenPath(error.screen, spec);
        resolvedPatch.path = patch.path.replace('{{screenPath}}', screenPath);
      }
      
      // Resolve entity placeholder
      if (patch.path && patch.path.includes('{{entity}}')) {
        const entity = this.getEntityName(error.screen, spec);
        resolvedPatch.path = patch.path.replace(/{{entity}}/g, entity);
      }
      if (patch.value && typeof patch.value === 'string' && patch.value.includes('{{entity}}')) {
        const entity = this.getEntityName(error.screen, spec);
        resolvedPatch.value = patch.value.replace(/{{entity}}/g, entity);
      }
      if (patch.value && typeof patch.value === 'object') {
        resolvedPatch.value = this.resolvePlaceholdersInObject(patch.value, error, spec);
      }
      
      resolved.push(resolvedPatch);
    });
    
    return resolved;
  }

  /**
   * Resolve placeholders in object values
   */
  resolvePlaceholdersInObject(obj, error, spec) {
    const resolved = {};
    
    Object.keys(obj).forEach(key => {
      const value = obj[key];
      if (typeof value === 'string' && value.includes('{{entity}}')) {
        const entity = this.getEntityName(error.screen, spec);
        resolved[key] = value.replace(/{{entity}}/g, entity);
      } else if (typeof value === 'object') {
        resolved[key] = this.resolvePlaceholdersInObject(value, error, spec);
      } else {
        resolved[key] = value;
      }
    });
    
    return resolved;
  }

  /**
   * Apply single JSON Patch operation
   */
  applyJSONPatchOperation(spec, operation) {
    const { op, path, value } = operation;
    const pathParts = path.split('/').filter(p => p && p !== '{{screenPath}}');

    switch (op) {
      case 'add':
        this.setNestedValue(spec, pathParts, value);
        break;
      case 'replace':
        this.setNestedValue(spec, pathParts, value);
        break;
      case 'remove':
        this.removeNestedValue(spec, pathParts);
        break;
    }
  }

  /**
   * Helper: Get screen type
   */
  getScreenType(screenId, spec) {
    const screen = this.findScreen(screenId, spec);
    return screen?.type || 'unknown';
  }

  /**
   * Helper: Get field count
   */
  getFieldCount(screenId, spec) {
    const screen = this.findScreen(screenId, spec);
    if (!screen?.entity) return 0;
    
    const entity = spec.entities?.find(e => e.entity === screen.entity);
    return entity?.fields?.length || 0;
  }

  /**
   * Helper: Get screen path
   */
  getScreenPath(screenId, spec) {
    // Find screen in spec and return path
    if (spec.screens) {
      const index = Object.keys(spec.screens).indexOf(screenId);
      if (index >= 0) {
        return `/screens/${screenId}`;
      }
    }
    return `/screens/${screenId}`;
  }

  /**
   * Helper: Get entity name
   */
  getEntityName(screenId, spec) {
    const screen = this.findScreen(screenId, spec);
    return screen?.entity?.toLowerCase() || 'entity';
  }

  /**
   * Helper: Find screen in spec
   */
  findScreen(screenId, spec) {
    if (spec.screens && spec.screens[screenId]) {
      return spec.screens[screenId];
    }
    if (Array.isArray(spec.screens)) {
      return spec.screens.find(s => s.screenId === screenId || s.id === screenId);
    }
    return null;
  }
}

export default AutoFixSystem;

