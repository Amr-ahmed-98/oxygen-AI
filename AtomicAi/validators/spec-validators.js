/**
 * Spec Validators
 * بوابة الجودة - لا يسمح بتمرير spec إلا بعد اجتياز جميع الفحوصات
 */

export class SpecValidators {
  constructor() {
    this.validators = [
      this.validateLayoutUX,
      this.validateSecurityRBAC,
      this.validateForms,
      this.validatePerformance,
      this.validateRTLi18n,
      this.validateMobileConstraints,
      this.validatePlatformSpecifics
    ];
  }

  /**
   * Validate complete app spec
   */
  validate(appSpec) {
    const errors = [];

    for (const validator of this.validators) {
      const result = validator.call(this, appSpec);
      if (result && result.length > 0) {
        errors.push(...result);
      }
    }

    return errors;
  }

  /**
   * Layout & UX Validations
   */
  validateLayoutUX(appSpec) {
    const errors = [];

    // كل Screen لازم فيها title + breadcrumbs (إلا login/auth)
    appSpec.screens?.forEach(screen => {
      if (!screen.id.includes('login') && !screen.id.includes('auth')) {
        if (!screen.title) {
          errors.push({
            code: 'MISSING_SCREEN_TITLE',
            screen: screen.id,
            severity: 'error',
            message: `Screen ${screen.id} must have a title`,
            hint: 'Add title property to screen definition'
          });
        }

        if (!screen.breadcrumbs && !screen.hideBreadcrumbs) {
          errors.push({
            code: 'MISSING_BREADCRUMBS',
            screen: screen.id,
            severity: 'warning',
            message: `Screen ${screen.id} should have breadcrumbs (or hideBreadcrumbs: true)`,
            hint: 'Add breadcrumbs or set hideBreadcrumbs: true'
          });
        }
      }
    });

    // كل list/detail screen لازم فيها empty/loading/error states
    appSpec.screens?.forEach(screen => {
      if (screen.type === 'list' || screen.type === 'detail') {
        if (!screen.states) {
          errors.push({
            code: 'MISSING_STATES',
            screen: screen.id,
            severity: 'error',
            message: `${screen.id} must define states (loading, empty, error)`,
            hint: 'Add states: { loading: true, empty: true, error: true }'
          });
        } else {
          ['loading', 'empty', 'error'].forEach(state => {
            if (!screen.states[state]) {
              errors.push({
                code: `MISSING_${state.toUpperCase()}_STATE`,
                screen: screen.id,
                severity: 'warning',
                message: `${screen.id} should have ${state} state`,
                hint: `Add states.${state}: true or component reference`
              });
            }
          });
        }
      }
    });

    return errors;
  }

  /**
   * Security/RBAC Validations
   */
  validateSecurityRBAC(appSpec) {
    const errors = [];

    // كل route لازم فيه permission
    appSpec.routes?.forEach(route => {
      if (!route.permission && !route.public) {
        errors.push({
          code: 'MISSING_ROUTE_PERMISSION',
          route: route.id,
          severity: 'error',
          message: `Route ${route.id} must have permission or public: true`,
          hint: 'Add permission: "module.action" or public: true'
        });
      }
    });

    // كل action button/action لازم مربوط permission
    appSpec.screens?.forEach(screen => {
      screen.actions?.forEach(action => {
        if (!action.permission && !action.public) {
          errors.push({
            code: 'MISSING_ACTION_PERMISSION',
            screen: screen.id,
            action: action.id,
            severity: 'error',
            message: `Action ${action.id} in ${screen.id} must have permission`,
            hint: `Add permission: "${screen.entity || 'module'}.${action.type}"`
          });
        }
      });
    });

    return errors;
  }

  /**
   * Forms Validations
   */
  validateForms(appSpec) {
    const errors = [];

    appSpec.screens?.forEach(screen => {
      if (screen.type === 'create' || screen.type === 'edit') {
        // Required fields لازم لها validation
        const entity = this.getEntity(screen.entity, appSpec);
        if (entity) {
          entity.fields?.forEach(field => {
            if (field.required && !field.validation) {
              errors.push({
                code: 'MISSING_REQUIRED_FIELD_VALIDATION',
                screen: screen.id,
                field: field.name,
                severity: 'warning',
                message: `Required field ${field.name} should have validation`,
                hint: `Add validation to field ${field.name}`
              });
            }
          });
        }

        // Destructive actions لازم لها confirm
        screen.actions?.forEach(action => {
          if (action.destructive && !action.confirm) {
            errors.push({
              code: 'MISSING_DESTRUCTIVE_CONFIRM',
              screen: screen.id,
              action: action.id,
              severity: 'error',
              message: `Destructive action ${action.id} must have confirmation`,
              hint: 'Add confirm: { title: "...", message: "..." }'
            });
          }
        });
      }
    });

    return errors;
  }

  /**
   * Performance Validations
   */
  validatePerformance(appSpec) {
    const errors = [];

    // Lists لازم فيها virtualization
    appSpec.screens?.forEach(screen => {
      if (screen.type === 'list') {
        if (screen.view?.web?.layout === 'dataTablePro') {
          if (!screen.view.web.virtualization) {
            errors.push({
              code: 'MISSING_VIRTUALIZATION',
              screen: screen.id,
              severity: 'warning',
              message: `List screen ${screen.id} should enable virtualization for large datasets`,
              hint: 'Add virtualization: true to view.web'
            });
          }
        }
      }
    });

    // Mobile lists لازم فيها pull-to-refresh أو pagination
    appSpec.screens?.forEach(screen => {
      if (screen.type === 'list' && screen.view?.mobile) {
        const hasPagination = screen.view.mobile.pagination !== false;
        const hasPullToRefresh = screen.view.mobile.pullToRefresh !== false;
        
        if (!hasPagination && !hasPullToRefresh) {
          errors.push({
            code: 'MISSING_MOBILE_LIST_REFRESH',
            screen: screen.id,
            severity: 'warning',
            message: `Mobile list ${screen.id} should have pagination or pull-to-refresh`,
            hint: 'Add pagination: true or pullToRefresh: true'
          });
        }
      }
    });

    return errors;
  }

  /**
   * RTL/i18n Validations
   */
  validateRTLi18n(appSpec) {
    const errors = [];

    if (appSpec.app?.locale?.rtl === true) {
      // استخدام logical spacing
      appSpec.screens?.forEach(screen => {
        if (screen.styles && !screen.styles.useLogicalSpacing) {
          errors.push({
            code: 'MISSING_LOGICAL_SPACING',
            screen: screen.id,
            severity: 'warning',
            message: `RTL app: ${screen.id} should use logical spacing (paddingInline, marginInline)`,
            hint: 'Use logical CSS properties for RTL support'
          });
        }
      });
    }

    return errors;
  }

  /**
   * Mobile Constraints Validations
   */
  validateMobileConstraints(appSpec) {
    const errors = [];

    appSpec.screens?.forEach(screen => {
      if (screen.type === 'list' && screen.view?.mobile) {
        // ممنوع جداول عريضة في الموبايل
        if (screen.view.mobile.layout === 'dataTablePro' || 
            screen.view.mobile.layout === 'table') {
          errors.push({
            code: 'MOBILE_WIDE_TABLE',
            screen: screen.id,
            severity: 'error',
            message: `Mobile view cannot use wide table layout in ${screen.id}`,
            hint: 'Use data.list.cards or cardList layout for mobile'
          });
        }

        // Forms الطويلة لازم stepper
        if (screen.type === 'create' || screen.type === 'edit') {
          const fieldCount = this.getEntityFieldCount(screen.entity, appSpec);
          if (fieldCount > 10 && screen.view.mobile.layout !== 'stepper') {
            errors.push({
              code: 'MOBILE_LONG_FORM_NO_STEPPER',
              screen: screen.id,
              severity: 'warning',
              message: `Long form ${screen.id} should use stepper layout on mobile`,
              hint: 'Set view.mobile.layout: "stepper" for forms with many fields'
            });
          }
        }
      }
    });

    return errors;
  }

  /**
   * Platform-specific Validations
   */
  validatePlatformSpecifics(appSpec) {
    const errors = [];

    // On-premise: no external CDN
    if (appSpec.delivery?.mode === 'onPremise') {
      // Check for external assets in components
      // This would need to check component manifests
    }

    // Desktop: keyboard shortcuts
    if (appSpec.app?.platforms?.includes('desktop')) {
      if (!appSpec.navigation?.desktop?.shortcuts) {
        errors.push({
          code: 'MISSING_DESKTOP_SHORTCUTS',
          severity: 'warning',
          message: 'Desktop app should define keyboard shortcuts',
          hint: 'Add navigation.desktop.shortcuts array'
        });
      }
    }

    return errors;
  }

  /**
   * Helper: Get entity by name
   */
  getEntity(entityName, appSpec) {
    return appSpec.entities?.find(e => e.entity === entityName);
  }

  /**
   * Helper: Get entity field count
   */
  getEntityFieldCount(entityName, appSpec) {
    const entity = this.getEntity(entityName, appSpec);
    return entity?.fields?.length || 0;
  }
}

export default SpecValidators;

