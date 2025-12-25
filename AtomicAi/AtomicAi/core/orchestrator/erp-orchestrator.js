/**
 * ERP/SaaS Orchestrator
 * Enhanced orchestrator for generating SaaS/ERP applications
 */

import { SiteSpecParser } from './site-spec-parser.js';
import { CatalogRetriever } from './catalog-retriever.js';
import { Composer } from '../composer/composer.js';

export class ERPOrchestrator {
  constructor(options = {}) {
    this.parser = new SiteSpecParser();
    this.catalog = new CatalogRetriever();
    this.composer = new Composer({
      siteType: 'saas',
      ...options.composerOptions
    });
  }

  /**
   * Generate ERP/SaaS app from brief
   */
  async generateApp(brief, options = {}) {
    // Step 1: Parse brief to determine app type and requirements
    const requirements = this.parseRequirements(brief);

    // Step 2: Generate app spec
    const appSpec = await this.generateAppSpec(requirements);

    // Step 3: Validate spec
    const validation = this.validateAppSpec(appSpec);
    if (!validation.valid) {
      throw new Error(`App spec validation failed: ${JSON.stringify(validation.errors)}`);
    }

    // Step 4: Generate modules
    const modules = await this.generateModules(appSpec.modules || []);

    // Step 5: Generate entities
    const entities = await this.generateEntities(appSpec.entities || []);

    // Step 6: Generate navigation
    const navigation = this.generateNavigation(appSpec);

    return {
      appSpec,
      modules,
      entities,
      navigation,
      validation,
      metadata: {
        generatedAt: new Date().toISOString(),
        type: appSpec.type,
        platforms: appSpec.platforms,
        moduleCount: modules.length,
        entityCount: entities.length
      }
    };
  }

  /**
   * Parse requirements from brief
   */
  parseRequirements(brief) {
    const lowerBrief = brief.toLowerCase();

    return {
      type: this.detectAppType(lowerBrief),
      modules: this.detectModules(lowerBrief),
      entities: this.detectEntities(lowerBrief),
      platforms: this.detectPlatforms(lowerBrief),
      features: this.detectFeatures(lowerBrief)
    };
  }

  /**
   * Detect app type
   */
  detectAppType(brief) {
    if (brief.match(/\b(erp|enterprise|resource planning)\b/)) {
      return 'erp';
    }
    if (brief.match(/\b(crm|customer relationship)\b/)) {
      return 'crm';
    }
    if (brief.match(/\b(saas|software as a service)\b/)) {
      return 'saas';
    }
    return 'saas'; // Default
  }

  /**
   * Detect required modules
   */
  detectModules(brief) {
    const modules = [];

    if (brief.match(/\b(invoice|billing|payment|financial)\b/)) {
      modules.push('sales');
    }
    if (brief.match(/\b(customer|client|contact)\b/)) {
      modules.push('crm');
    }
    if (brief.match(/\b(inventory|stock|warehouse|product)\b/)) {
      modules.push('inventory');
    }
    if (brief.match(/\b(employee|hr|human resource|attendance)\b/)) {
      modules.push('hr');
    }
    if (brief.match(/\b(purchase|supplier|vendor)\b/)) {
      modules.push('purchases');
    }
    if (brief.match(/\b(report|analytics|dashboard)\b/)) {
      modules.push('reports');
    }

    return modules;
  }

  /**
   * Detect entities
   */
  detectEntities(brief) {
    const entities = [];

    const entityPatterns = {
      'invoice': /\b(invoice|bill)\b/,
      'customer': /\b(customer|client)\b/,
      'product': /\b(product|item)\b/,
      'employee': /\b(employee|staff)\b/,
      'order': /\b(order|purchase order)\b/
    };

    Object.entries(entityPatterns).forEach(([entity, pattern]) => {
      if (brief.match(pattern)) {
        entities.push(entity);
      }
    });

    return entities;
  }

  /**
   * Detect target platforms
   */
  detectPlatforms(brief) {
    const platforms = ['web']; // Always include web

    if (brief.match(/\b(mobile|phone|app|ios|android)\b/)) {
      platforms.push('mobile');
    }
    if (brief.match(/\b(desktop|windows|mac|electron|tauri)\b/)) {
      platforms.push('desktop');
    }

    return platforms;
  }

  /**
   * Detect features
   */
  detectFeatures(brief) {
    return {
      auth: brief.match(/\b(auth|login|user)\b/) !== null,
      rbac: brief.match(/\b(role|permission|access)\b/) !== null,
      multiTenant: brief.match(/\b(multi.?tenant|workspace)\b/) !== null,
      offline: brief.match(/\b(offline|sync)\b/) !== null,
      i18n: brief.match(/\b(i18n|international|arabic|rtl)\b/) !== null
    };
  }

  /**
   * Generate app spec
   */
  async generateAppSpec(requirements) {
    return {
      id: `app-${Date.now()}`,
      name: 'Generated App',
      type: requirements.type,
      platforms: requirements.platforms,
      theme: 'theme-saas-modern',
      appShell: {
        sidebar: {
          position: 'left',
          collapsible: true
        },
        header: {
          breadcrumbs: true,
          userMenu: true
        },
        commandPalette: true
      },
      modules: await this.generateModuleSpecs(requirements.modules),
      entities: await this.generateEntitySpecs(requirements.entities),
      auth: {
        enabled: requirements.features.auth,
        methods: ['email']
      },
      rbac: {
        enabled: requirements.features.rbac,
        roles: this.getDefaultRoles()
      },
      multiTenant: {
        enabled: requirements.features.multiTenant
      },
      i18n: {
        enabled: requirements.features.i18n,
        defaultLocale: 'en',
        supportedLocales: ['en', 'ar'],
        rtl: {
          enabled: requirements.features.i18n,
          locales: ['ar']
        }
      },
      offline: {
        enabled: requirements.features.offline,
        sync: requirements.features.offline
      }
    };
  }

  /**
   * Generate module specs
   */
  async generateModuleSpecs(moduleIds) {
    return moduleIds.map(id => ({
      id,
      name: this.capitalize(id),
      type: id,
      icon: this.getModuleIcon(id),
      entities: [],
      routes: {
        base: `/${id}`
      }
    }));
  }

  /**
   * Generate entity specs (simplified)
   */
  async generateEntitySpecs(entityIds) {
    // This would generate full entity specs based on common patterns
    return entityIds.map(id => ({
      id,
      name: this.capitalize(id),
      pluralName: `${this.capitalize(id)}s`,
      module: this.getModuleForEntity(id),
      fields: this.getDefaultFieldsForEntity(id),
      permissions: {
        view: ['admin', 'user'],
        create: ['admin'],
        edit: ['admin'],
        delete: ['admin']
      }
    }));
  }

  /**
   * Get default fields for entity
   */
  getDefaultFieldsForEntity(entityId) {
    const commonFields = [
      {
        name: 'id',
        type: 'string',
        label: 'ID',
        required: true,
        readonly: true
      },
      {
        name: 'createdAt',
        type: 'datetime',
        label: 'Created At',
        readonly: true
      },
      {
        name: 'updatedAt',
        type: 'datetime',
        label: 'Updated At',
        readonly: true
      }
    ];

    // Entity-specific fields
    const entityFields = {
      'invoice': [
        { name: 'invoiceNo', type: 'string', label: 'Invoice #', required: true },
        { name: 'customerId', type: 'relation', label: 'Customer', relation: { entity: 'customer' } },
        { name: 'total', type: 'money', label: 'Total', required: true },
        { name: 'status', type: 'enum', label: 'Status', options: ['draft', 'sent', 'paid'] }
      ],
      'customer': [
        { name: 'name', type: 'string', label: 'Name', required: true },
        { name: 'email', type: 'email', label: 'Email' },
        { name: 'phone', type: 'string', label: 'Phone' }
      ]
    };

    return [
      ...(entityFields[entityId] || []),
      ...commonFields
    ];
  }

  /**
   * Generate modules
   */
  async generateModules(moduleSpecs) {
    return moduleSpecs.map(spec => ({
      ...spec,
      views: {}
    }));
  }

  /**
   * Generate entities
   */
  async generateEntities(entitySpecs) {
    return entitySpecs;
  }

  /**
   * Generate navigation
   */
  generateNavigation(appSpec) {
    return {
      web: this.generateWebNavigation(appSpec),
      mobile: this.generateMobileNavigation(appSpec),
      desktop: this.generateDesktopNavigation(appSpec)
    };
  }

  /**
   * Generate web navigation
   */
  generateWebNavigation(appSpec) {
    const { WebNavigation } = require('../navigation/web-navigation.js');
    const nav = new WebNavigation({
      type: 'sidebar',
      auth: appSpec.auth?.enabled
    });
    return nav.generateRoutes(appSpec.modules || [], appSpec.entities || []);
  }

  /**
   * Generate mobile navigation
   */
  generateMobileNavigation(appSpec) {
    const { MobileNavigation } = require('../navigation/mobile-navigation.js');
    const nav = new MobileNavigation({ type: 'tabs' });
    return nav.generateNavigation(appSpec.modules || [], appSpec.entities || []);
  }

  /**
   * Generate desktop navigation
   */
  generateDesktopNavigation(appSpec) {
    const { DesktopNavigation } = require('../navigation/desktop-navigation.js');
    const nav = new DesktopNavigation({
      sidebar: true,
      menuBar: true,
      shortcuts: true
    });
    return nav.generateNavigation(appSpec.modules || [], appSpec.entities || []);
  }

  /**
   * Validate app spec
   */
  validateAppSpec(appSpec) {
    const errors = [];

    if (!appSpec.id) errors.push('Missing app id');
    if (!appSpec.name) errors.push('Missing app name');
    if (!appSpec.platforms || appSpec.platforms.length === 0) {
      errors.push('No platforms specified');
    }
    if (!appSpec.modules || appSpec.modules.length === 0) {
      errors.push('No modules specified');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Get default roles
   */
  getDefaultRoles() {
    return [
      {
        id: 'admin',
        name: 'Administrator',
        permissions: ['*']
      },
      {
        id: 'user',
        name: 'User',
        permissions: ['*.view', '*.create']
      }
    ];
  }

  /**
   * Helper methods
   */
  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  getModuleIcon(moduleId) {
    const icons = {
      'crm': 'users',
      'sales': 'file-text',
      'inventory': 'package',
      'hr': 'user',
      'purchases': 'shopping-cart',
      'reports': 'bar-chart'
    };
    return icons[moduleId] || 'folder';
  }

  getModuleForEntity(entityId) {
    const mapping = {
      'invoice': 'sales',
      'customer': 'crm',
      'product': 'inventory',
      'employee': 'hr'
    };
    return mapping[entityId] || 'custom';
  }
}

export default ERPOrchestrator;

