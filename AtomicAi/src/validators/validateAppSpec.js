/**
 * Validators + Auto-fix Loop
 * Pseudo-code للـValidators + Auto-fix loop
 */

import { SpecValidators } from '../../validators/spec-validators.js';
import { AutoFixSystem } from '../../validators/auto-fix.js';

/**
 * Validate app spec and return errors
 */
function validate(appSpec) {
  const errors = [];

  // 1) Routes must map to screens
  for (const route of appSpec.routes || []) {
    const screen = findScreen(route.screenId, appSpec);
    if (!screen) {
      errors.push({
        code: 'ROUTES_HAVE_SCREEN',
        route: route.id,
        screenId: route.screenId,
        severity: 'error',
        message: `Route ${route.id} references non-existent screen ${route.screenId}`,
        fixable: false
      });
    }
  }

  // 2) Each screen must have title, states, permissionsRequired
  for (const screen of appSpec.screens || []) {
    if (!screen.title) {
      errors.push({
        code: 'SCREENS_HAVE_TITLE',
        screen: screen.screenId,
        severity: 'error',
        message: `Screen ${screen.screenId} must have a title`,
        fixable: true,
        suggestedPatch: [
          {
            op: 'add',
            path: `/screens/${screen.screenId}/title`,
            value: inferTitle(screen.screenId)
          }
        ]
      });
    }

    if (!screen.states) {
      errors.push({
        code: 'LIST_HAS_STATES',
        screen: screen.screenId,
        severity: 'error',
        message: `Screen ${screen.screenId} must have states`,
        fixable: true,
        suggestedPatch: [
          {
            op: 'add',
            path: `/screens/${screen.screenId}/states`,
            value: getDefaultStates(screen.type)
          }
        ]
      });
    }

    if (!screen.permissionsRequired) {
      errors.push({
        code: 'SCREEN_PERMISSIONS_DECLARED',
        screen: screen.screenId,
        severity: 'error',
        message: `Screen ${screen.screenId} must have permissionsRequired`,
        fixable: true,
        suggestedPatch: [
          {
            op: 'add',
            path: `/screens/${screen.screenId}/permissionsRequired`,
            value: inferPermissions(screen)
          }
        ]
      });
    }

    // 3) Mobile wide table rule
    if (screen.view?.mobile?.layout?.includes('dataTable') || 
        screen.view?.mobile?.layout === 'dataTablePro') {
      errors.push({
        code: 'MOBILE_WIDE_TABLE',
        screen: screen.screenId,
        severity: 'error',
        message: `Mobile view cannot use wide table layout in ${screen.screenId}`,
        fixable: true,
        suggestedPatch: [
          {
            op: 'replace',
            path: `/screens/${screen.screenId}/view/mobile/layout`,
            value: 'cardList'
          },
          {
            op: 'add',
            path: `/screens/${screen.screenId}/view/mobile/filters`,
            value: 'bottomSheet'
          }
        ]
      });
    }

    // 4) Actions must have permissions
    if (screen.actions) {
      for (const action of screen.actions) {
        if (!action.permission && !action.public) {
          errors.push({
            code: 'ACTION_HAS_PERMISSION',
            screen: screen.screenId,
            action: action.id,
            severity: 'error',
            message: `Action ${action.id} in ${screen.screenId} must have permission`,
            fixable: true,
            suggestedPatch: [
              {
                op: 'add',
                path: `/screens/${screen.screenId}/actions/${action.id}/permission`,
                value: inferActionPermission(screen, action)
              }
            ]
          });
        }
      }
    }

    // 5) Forms must have formStates
    if (screen.intent === 'entityForm' && !screen.formStates) {
      errors.push({
        code: 'FORM_HAS_SUBMIT_STATES',
        screen: screen.screenId,
        severity: 'warning',
        message: `Form screen ${screen.screenId} should have formStates`,
        fixable: true,
        suggestedPatch: [
          {
            op: 'add',
            path: `/screens/${screen.screenId}/formStates`,
            value: {
              idle: true,
              submitting: true,
              success: true,
              error: true
            }
          }
        ]
      });
    }
  }

  // 6) OnPrem no external CDN
  if (appSpec.delivery?.mode === 'onPremise') {
    if (!appSpec.delivery.noExternalCDN) {
      errors.push({
        code: 'NO_EXTERNAL_CDN_ONPREM',
        severity: 'warning',
        message: 'On-premise deployment should not use external CDN',
        fixable: true,
        suggestedPatch: [
          {
            op: 'add',
            path: '/delivery/noExternalCDN',
            value: true
          },
          {
            op: 'add',
            path: '/delivery/assetsPolicy',
            value: 'localOnly'
          }
        ]
      });
    }
  }

  return errors;
}

/**
 * Auto-fix errors using rules first, then LLM if needed
 */
async function autoFix(appSpec, errors, llmClient = null) {
  const patches = [];

  // Step 1: Apply rule-based fixes (fast, deterministic)
  for (const error of errors) {
    if (error.fixable && error.suggestedPatch) {
      patches.push(...error.suggestedPatch);
    }
  }

  // Apply patches
  let fixedSpec = applyJsonPatch(appSpec, patches);

  // Step 2: Re-validate
  let remainingErrors = validate(fixedSpec);

  // Step 3: If errors remain and LLM available, use LLM
  if (remainingErrors.length > 0 && llmClient) {
    const autoFixSystem = new AutoFixSystem(llmClient);
    const result = await autoFixSystem.fixSpec(fixedSpec, remainingErrors);
    fixedSpec = result.spec;
    remainingErrors = result.errors;
  }

  return { spec: fixedSpec, errors: remainingErrors };
}

/**
 * Validate with auto-fix loop
 */
async function validateWithLoop(appSpec, llmClient = null, maxIterations = 3) {
  let currentSpec = structuredClone(appSpec);
  let iteration = 0;

  while (iteration < maxIterations) {
    const errors = validate(currentSpec);

    if (errors.length === 0) {
      console.log('✅ Spec passed validation!');
      return { spec: currentSpec, errors: [] };
    }

    console.log(`Iteration ${iteration + 1}: ${errors.length} errors found`);

    // Auto-fix
    const fixResult = await autoFix(currentSpec, errors, llmClient);
    currentSpec = fixResult.spec;

    // Check if errors reduced
    const newErrors = validate(currentSpec);
    if (newErrors.length >= errors.length) {
      console.warn('⚠️ No improvement after auto-fix, stopping');
      break;
    }

    iteration++;
  }

  const finalErrors = validate(currentSpec);
  return { spec: currentSpec, errors: finalErrors };
}

/**
 * Helper: Find screen by ID
 */
function findScreen(screenId, appSpec) {
  return appSpec.screens?.find(s => s.screenId === screenId);
}

/**
 * Helper: Infer title from screen ID
 */
function inferTitle(screenId) {
  // Extract readable title from screenId
  return screenId.replace(/screen\./g, '').replace(/\./g, ' ');
}

/**
 * Helper: Get default states for screen type
 */
function getDefaultStates(screenType) {
  const defaults = {
    list: { loading: true, empty: true, error: true, noPermission: true },
    detail: { loading: true, error: true, noPermission: true },
    create: { loading: true, error: true, noPermission: true },
    edit: { loading: true, error: true, noPermission: true }
  };
  return defaults[screenType] || defaults.list;
}

/**
 * Helper: Infer permissions from screen
 */
function inferPermissions(screen) {
  if (screen.entity) {
    const namespace = screen.entity.toLowerCase();
    if (screen.type === 'list' || screen.type === 'detail') {
      return [`${namespace}.view`];
    } else if (screen.type === 'create') {
      return [`${namespace}.create`];
    } else if (screen.type === 'edit') {
      return [`${namespace}.edit`];
    }
  }
  return [];
}

/**
 * Helper: Infer action permission
 */
function inferActionPermission(screen, action) {
  if (screen.entity) {
    const namespace = screen.entity.toLowerCase();
    return `${namespace}.${action.id}`;
  }
  return 'admin';
}

/**
 * Helper: Apply JSON Patch
 */
function applyJsonPatch(spec, patches) {
  const result = structuredClone(spec);

  for (const patch of patches) {
    const pathParts = patch.path.split('/').filter(p => p && p !== '{{screenPath}}');
    
    switch (patch.op) {
      case 'add':
      case 'replace':
        setNestedValue(result, pathParts, patch.value);
        break;
      case 'remove':
        removeNestedValue(result, pathParts);
        break;
    }
  }

  return result;
}

/**
 * Helper: Set nested value
 */
function setNestedValue(obj, pathParts, value) {
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
function removeNestedValue(obj, pathParts) {
  let current = obj;
  for (let i = 0; i < pathParts.length - 1; i++) {
    const part = pathParts[i];
    if (!current[part]) return;
    current = current[part];
  }
  delete current[pathParts[pathParts.length - 1]];
}

export { validate, autoFix, validateWithLoop };

