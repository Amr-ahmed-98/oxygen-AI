/**
 * Product Composer
 * Composes complete applications from Product Specs using Rules Matrix
 */

import rulesMatrix from '../catalog/rules/rules-matrix.json';

export class ProductComposer {
  constructor() {
    this.rulesMatrix = rulesMatrix;
  }

  /**
   * Compose app from product spec
   */
  async compose(productSpec, catalogLoader) {
    // Step 1: Apply rules matrix
    const enhancedSpec = this.applyRulesMatrix(productSpec);

    // Step 2: Load product pack
    const productPack = await this.loadProductPack(enhancedSpec.productType);

    // Step 3: Merge modules
    const modules = this.mergeModules(enhancedSpec, productPack);

    // Step 4: Generate routes
    const routes = this.generateRoutes(modules, enhancedSpec);

    // Step 5: Generate screens
    const screens = await this.generateScreens(modules, enhancedSpec, catalogLoader);

    // Step 6: Generate navigation
    const navigation = this.generateNavigation(enhancedSpec, routes);

    return {
      app: enhancedSpec.app,
      security: enhancedSpec.security,
      navigation,
      modules,
      routes,
      screens,
      features: enhancedSpec.features || [],
      constraints: enhancedSpec.constraints || []
    };
  }

  /**
   * Apply rules matrix to product spec
   */
  applyRulesMatrix(spec) {
    const enhanced = JSON.parse(JSON.stringify(spec));

    this.rulesMatrix.rules.forEach(rule => {
      if (this.matchesRule(spec, rule.when)) {
        this.applyRule(enhanced, rule.apply);
      }
    });

    return enhanced;
  }

  /**
   * Check if spec matches rule condition
   */
  matchesRule(spec, condition) {
    for (const [key, value] of Object.entries(condition)) {
      const specValue = this.getNestedValue(spec, key);

      if (typeof value === 'object' && value.$contains) {
        if (!Array.isArray(specValue) || !specValue.includes(value.$contains)) {
          return false;
        }
      } else if (specValue !== value) {
        return false;
      }
    }
    return true;
  }

  /**
   * Apply rule to spec
   */
  applyRule(spec, apply) {
    // Add features
    if (apply.features) {
      if (!spec.features) spec.features = [];
      apply.features.forEach(feature => {
        if (!spec.features.includes(feature)) {
          spec.features.push(feature);
        }
      });
    }

    // Add modules
    if (apply.modulesAdd) {
      if (!spec.modules) spec.modules = [];
      apply.modulesAdd.forEach(module => {
        if (!spec.modules.includes(module)) {
          spec.modules.push(module);
        }
      });
    }

    // Add constraints
    if (apply.constraints) {
      if (!spec.constraints) spec.constraints = [];
      apply.constraints.forEach(constraint => {
        if (!spec.constraints.includes(constraint)) {
          spec.constraints.push(constraint);
        }
      });
    }

    // Add UI components
    if (apply.uiComponents) {
      if (!spec.uiComponents) spec.uiComponents = [];
      apply.uiComponents.forEach(component => {
        if (!spec.uiComponents.includes(component)) {
          spec.uiComponents.push(component);
        }
      });
    }

    // Apply UI overrides
    if (apply.uiOverrides) {
      if (!spec.uiOverrides) spec.uiOverrides = {};
      Object.assign(spec.uiOverrides, apply.uiOverrides);
    }

    // Apply UI patterns
    if (apply.uiPatternsAdd) {
      if (!spec.uiPatterns) spec.uiPatterns = [];
      apply.uiPatternsAdd.forEach(pattern => {
        if (!spec.uiPatterns.includes(pattern)) {
          spec.uiPatterns.push(pattern);
        }
      });
    }
  }

  /**
   * Load product pack
   */
  async loadProductPack(productType) {
    const packId = this.productTypeToPackId(productType);
    
    try {
      const pack = await import(`../catalog/product-packs/${packId}/pack.manifest.json`);
      return pack.default || pack;
    } catch (error) {
      console.warn(`Product pack not found: ${packId}`);
      return null;
    }
  }

  /**
   * Convert product type to pack ID
   */
  productTypeToPackId(productType) {
    const mapping = {
      'CRM': 'crm',
      'HRMS_HCM': 'hrms',
      'WMS_TMS': 'wms',
      'POS': 'pos',
      'CMS_DXP': 'cms',
      'LMS': 'lms',
      'ECOMMERCE': 'ecommerce',
      'MARKETPLACE': 'marketplace',
      'BOOKING': 'booking',
      'HELPDESK_ITSM': 'helpdesk',
      'PROJECT_WORK': 'project',
      'BI_ANALYTICS': 'bi',
      'CPQ': 'cpq',
      'BILLING_SUBSCRIPTION': 'billing',
      'IDENTITY_IAM': 'iam',
      'EAM_CMMS': 'eam'
    };
    return mapping[productType] || 'generic';
  }

  /**
   * Merge modules from spec and pack
   */
  mergeModules(spec, pack) {
    const modules = new Set();

    // Add core modules
    if (pack && pack.coreModules) {
      pack.coreModules.forEach(m => modules.add(m));
    }

    // Add modules from spec
    if (spec.modules) {
      spec.modules.forEach(m => modules.add(m));
    }

    // Add modules from pack
    if (pack && pack.modules) {
      pack.modules.forEach(m => {
        if (m.required || spec.modules?.includes(m.moduleId)) {
          modules.add(m.moduleId);
        }
      });
    }

    return Array.from(modules);
  }

  /**
   * Generate routes using EntityToScreensGenerator
   */
  async generateRoutes(modules, spec) {
    const { EntityToScreensGenerator } = await import('./entity-to-screens-generator.js');
    const generator = new EntityToScreensGenerator();
    
    const routes = [];

    // Dashboard route
    routes.push({
      id: 'dashboard',
      path: '/',
      screen: 'screen.dashboard',
      permission: 'dashboard.view'
    });

    // Module routes - use generator for automatic route creation
    for (const moduleId of modules) {
      const module = await this.getModuleInfo(moduleId, spec);
      if (!module || !module.entities) continue;

      module.entities.forEach(entity => {
        const entityRoutes = generator.generateRoutesForEntity(entity, moduleId);
        routes.push(...entityRoutes);
      });
    }

    return routes;
  }

  /**
   * Generate screens using EntityToScreensGenerator
   */
  async generateScreens(modules, spec, catalogLoader) {
    const { EntityToScreensGenerator } = await import('./entity-to-screens-generator.js');
    const generator = new EntityToScreensGenerator();
    
    const screens = {};

    // Dashboard screen
    screens['screen.dashboard'] = {
      type: 'dashboard',
      components: []
    };

    // Module screens - use generator for automatic screen creation
    for (const moduleId of modules) {
      const module = await this.getModuleInfo(moduleId, spec);
      if (!module || !module.entities) continue;

      module.entities.forEach(entity => {
        // Generate all screens for this entity using generator
        const entityScreens = generator.generateScreensForEntity(entity, moduleId, spec);
        Object.assign(screens, entityScreens);
      });
    }

    return screens;
  }

  /**
   * Get platform adaptations
   */
  getPlatformAdaptations(viewType, spec) {
    const adaptations = {
      web: {},
      mobile: {},
      desktop: {}
    };

    // Apply UI overrides from rules
    if (spec.uiOverrides) {
      if (viewType === 'list') {
        adaptations.mobile.layout = spec.uiOverrides.listView || 'cardList';
        adaptations.web.layout = 'dataTablePro';
        adaptations.desktop.layout = 'dataTablePro';
      }
    }

    return adaptations;
  }

  /**
   * Generate navigation
   */
  generateNavigation(spec, routes) {
    return {
      web: {
        type: spec.delivery?.mode === 'multiTenantSaaS' ? 'sidebar' : 'sidebar',
        items: this.buildNavItems(routes)
      },
      mobile: {
        type: 'tabs',
        tabs: this.buildMobileTabs(routes.slice(0, 5))
      },
      desktop: {
        sidebar: true,
        menuBar: true,
        shortcuts: this.buildShortcuts(routes)
      }
    };
  }

  /**
   * Build navigation items
   */
  buildNavItems(routes) {
    const items = [];
    const moduleMap = new Map();

    routes.forEach(route => {
      const parts = route.id.split('.');
      if (parts.length >= 2) {
        const moduleId = parts.slice(0, -1).join('.');
        if (!moduleMap.has(moduleId)) {
          moduleMap.set(moduleId, {
            id: moduleId,
            label: this.formatLabel(moduleId),
            path: route.path.split('/:')[0],
            children: []
          });
        }
      }
    });

    return Array.from(moduleMap.values());
  }

  /**
   * Build mobile tabs
   */
  buildMobileTabs(routes) {
    return routes.slice(0, 5).map(route => ({
      id: route.id,
      label: this.formatLabel(route.id),
      screen: route.screen
    }));
  }

  /**
   * Build keyboard shortcuts
   */
  buildShortcuts(routes) {
    const shortcuts = [
      { key: 'Cmd+K', action: 'commandPalette' }
    ];

    routes.slice(0, 9).forEach((route, index) => {
      shortcuts.push({
        key: `Cmd+${index + 1}`,
        action: `navigate:${route.path}`
      });
    });

    return shortcuts;
  }

  /**
   * Helper methods
   */
  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : null;
    }, obj);
  }

  getModuleInfo(moduleId, spec) {
    // This would load from product pack or spec
    return { entities: [] };
  }

  formatLabel(id) {
    return id
      .split('.')
      .pop()
      .replace(/([A-Z])/g, ' $1')
      .trim();
  }
}

export default ProductComposer;

