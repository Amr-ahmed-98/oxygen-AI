/**
 * Entity to Screens Generator
 * Generates screens and routes automatically from entity specs (without LLM)
 */

import platformDefaults from '../core/platform-defaults.json';
import screenSnippets from '../specs/templates/screen-snippets.json';
import screenSnippets from '../specs/templates/screen-snippets.json';

export class EntityToScreensGenerator {
  constructor() {
    this.defaults = platformDefaults.defaults;
    this.snippets = screenSnippets.snippets;
  }

  /**
   * Generate screens for an entity
   * @param {Object} entity - Entity spec
   * @param {string} moduleId - Module ID
   * @param {Object} appSpec - App spec for context
   * @returns {Object} Generated screens
   */
  generateScreensForEntity(entity, moduleId, appSpec) {
    const screens = {};
    const entityName = entity.entity;
    const entityPlural = this.pluralize(entityName);
    
    // Get entity metadata
    const entityTitle = entity.title?.singular || this.formatTitle(entityName);
    const entityTitlePlural = entity.title?.plural || this.formatTitle(entityPlural);

    // 1. List Screen
    screens[`screen.${moduleId}.list`] = this.generateListScreen(
      entity, moduleId, entityName, entityPlural, entityTitle, entityTitlePlural, appSpec
    );

    // 2. Create Screen
    screens[`screen.${moduleId}.create`] = this.generateCreateScreen(
      entity, moduleId, entityName, entityPlural, entityTitle, entityTitlePlural, appSpec
    );

    // 3. Edit Screen
    screens[`screen.${moduleId}.edit`] = this.generateEditScreen(
      entity, moduleId, entityName, entityPlural, entityTitle, entityTitlePlural, appSpec
    );

    // 4. Detail Screen
    screens[`screen.${moduleId}.detail`] = this.generateDetailScreen(
      entity, moduleId, entityName, entityPlural, entityTitle, entityTitlePlural, appSpec
    );

    return screens;
  }

  /**
   * Generate routes for an entity
   * @param {Object} entity - Entity spec
   * @param {string} moduleId - Module ID
   * @returns {Array} Generated routes
   */
  generateRoutesForEntity(entity, moduleId) {
    const routes = [];
    const entityName = entity.entity;
    const entityPlural = this.pluralize(entityName.toLowerCase());
    const basePath = `/${moduleId.replace('.', '/')}`;

    // List route
    routes.push({
      id: `${moduleId}.list`,
      path: basePath,
      screen: `screen.${moduleId}.list`,
      permission: `${entityName.toLowerCase()}.view`
    });

    // Create route
    routes.push({
      id: `${moduleId}.create`,
      path: `${basePath}/new`,
      screen: `screen.${moduleId}.create`,
      permission: `${entityName.toLowerCase()}.create`
    });

    // Detail route
    routes.push({
      id: `${moduleId}.detail`,
      path: `${basePath}/:id`,
      screen: `screen.${moduleId}.detail`,
      permission: `${entityName.toLowerCase()}.view`
    });

    // Edit route
    routes.push({
      id: `${moduleId}.edit`,
      path: `${basePath}/:id/edit`,
      screen: `screen.${moduleId}.edit`,
      permission: `${entityName.toLowerCase()}.edit`
    });

    return routes;
  }

  /**
   * Generate List Screen
   */
  generateListScreen(entity, moduleId, entityName, entityPlural, entityTitle, entityTitlePlural, appSpec) {
    const snippet = this.snippets.find(s => s.id === 'entityList');
    let screen = JSON.parse(JSON.stringify(snippet.template));

    // Replace placeholders
    screen = this.replacePlaceholders(screen, {
      entity: entityName.toLowerCase(),
      entityTitle: entityTitle,
      entityTitlePlural: entityTitlePlural,
      entityPlural: entityPlural
    });

    // Apply entity-specific overrides
    if (entity.views?.list) {
      screen = this.applyEntityViewOverrides(screen, entity.views.list, 'list');
    }

    // Apply platform defaults
    screen.view.web = { ...this.defaults.web, ...screen.view.web };
    screen.view.mobile = { ...this.defaults.mobile, ...screen.view.mobile };
    screen.view.desktop = { ...this.defaults.desktop, ...screen.view.desktop };

    // Apply entity view rules
    screen = this.applyEntityViewRules(screen, entity, 'list');

    // Add filters from entity
    if (entity.views?.list?.filters) {
      screen.filters = entity.views.list.filters;
    }

    // Add toolbar actions from entity
    if (entity.views?.list?.bulkActions) {
      screen.bulkActions = entity.views.list.bulkActions.map(action => ({
        id: action,
        label: this.formatActionLabel(action),
        variant: action === 'delete' ? 'destructive' : 'secondary',
        permission: `${entityName.toLowerCase()}.${action}`,
        requiresSelection: true,
        ...(action === 'delete' && {
          confirm: {
            title: 'تأكيد الحذف',
            message: `هل أنت متأكد من حذف العناصر المحددة؟`
          }
        })
      }));
    }

    return screen;
  }

  /**
   * Generate Create Screen
   */
  generateCreateScreen(entity, moduleId, entityName, entityPlural, entityTitle, entityTitlePlural, appSpec) {
    const screen = {
      screenId: `screen.${moduleId}.create`,
      title: `إنشاء ${entityTitle}`,
      intent: 'entityForm',
      entity: entityName,
      type: 'create',
      breadcrumbs: [
        { label: 'الصفحة الرئيسية', path: '/' },
        { label: entityTitlePlural, path: `/${moduleId.replace('.', '/')}` },
        { label: 'إنشاء' }
      ],
      view: {
        web: {
          layout: this.defaults.web.formLayout,
          validation: 'schemaDriven'
        },
        mobile: {
          layout: entity.fields.length > 10 ? 'stepper' : 'fullScreen',
          validation: 'schemaDriven'
        },
        desktop: {
          layout: this.defaults.desktop.formLayout,
          validation: 'schemaDriven'
        }
      },
      formFields: entity.fields.filter(f => f.ui?.form !== false).map(field => ({
        name: field.name,
        type: field.type,
        label: field.ui?.label || this.formatTitle(field.name),
        required: field.required,
        validation: field.validation,
        ...(field.type === 'relation' && {
          relation: {
            to: field.to,
            type: field.relationType || 'oneToMany'
          }
        })
      })),
      formStates: {
        idle: true,
        submitting: true,
        success: true,
        error: true
      },
      validationMode: 'schemaDriven',
      actions: [
        {
          id: 'submit',
          label: 'حفظ',
          variant: 'primary',
          permission: `${entityName.toLowerCase()}.create`
        },
        {
          id: 'cancel',
          label: 'إلغاء',
          variant: 'secondary'
        }
      ],
      permissionsRequired: [`${entityName.toLowerCase()}.create`]
    };

    return screen;
  }

  /**
   * Generate Edit Screen
   */
  generateEditScreen(entity, moduleId, entityName, entityPlural, entityTitle, entityTitlePlural, appSpec) {
    const createScreen = this.generateCreateScreen(entity, moduleId, entityName, entityPlural, entityTitle, entityTitlePlural, appSpec);
    
    return {
      ...createScreen,
      screenId: `screen.${moduleId}.edit`,
      title: `تعديل ${entityTitle}`,
      type: 'edit',
      breadcrumbs: [
        { label: 'الصفحة الرئيسية', path: '/' },
        { label: entityTitlePlural, path: `/${moduleId.replace('.', '/')}` },
        { label: 'تعديل' }
      ],
      permissionsRequired: [`${entityName.toLowerCase()}.edit`],
      actions: [
        {
          id: 'submit',
          label: 'حفظ التغييرات',
          variant: 'primary',
          permission: `${entityName.toLowerCase()}.edit`
        },
        {
          id: 'cancel',
          label: 'إلغاء',
          variant: 'secondary'
        }
      ]
    };
  }

  /**
   * Generate Detail Screen
   */
  generateDetailScreen(entity, moduleId, entityName, entityPlural, entityTitle, entityTitlePlural, appSpec) {
    const snippet = this.snippets.find(s => s.id === 'entityDetail');
    let screen = JSON.parse(JSON.stringify(snippet.template));

    // Replace placeholders
    screen = this.replacePlaceholders(screen, {
      entity: entityName.toLowerCase(),
      entityTitle: entityTitle,
      entityTitlePlural: entityTitlePlural,
      entityPlural: entityPlural
    });

    // Apply entity-specific overrides
    if (entity.views?.detail) {
      if (entity.views.detail.tabs) {
        screen.tabs = entity.views.detail.tabs.map(tab => ({
          id: tab.id || tab,
          label: tab.label || this.formatTitle(tab),
          component: tab.component || tab,
          default: tab === entity.views.detail.tabs[0]
        }));
      }
      
      if (entity.views.detail.rightPanel) {
        screen.rightPanel = entity.views.detail.rightPanel;
      }
    }

    // Apply platform defaults
    screen.view.web = { ...this.defaults.web, ...screen.view.web };
    screen.view.mobile = { ...this.defaults.mobile, ...screen.view.mobile };
    screen.view.desktop = { ...this.defaults.desktop, ...screen.view.desktop };

    // Add actions from entity permissions
    const actions = [];
    if (entity.permissions?.[`${entityName.toLowerCase()}.edit`]) {
      actions.push({
        id: 'edit',
        label: 'تعديل',
        variant: 'secondary',
        permission: `${entityName.toLowerCase()}.edit`
      });
    }
    if (entity.permissions?.[`${entityName.toLowerCase()}.delete`]) {
      actions.push({
        id: 'delete',
        label: 'حذف',
        variant: 'destructive',
        permission: `${entityName.toLowerCase()}.delete`,
        confirm: {
          title: 'تأكيد الحذف',
          message: `هل أنت متأكد من حذف ${entityTitle}؟`
        }
      });
    }
    screen.actions = actions;

    return screen;
  }

  /**
   * Apply entity view rules from platform-defaults
   */
  applyEntityViewRules(screen, entity, viewType) {
    const rules = platformDefaults.entityViewRules;

    if (viewType === 'listView' && entity.views?.list?.layout === 'dataTable') {
      screen.view.web.layout = rules.listView.then.web.layout;
      screen.view.mobile.layout = rules.listView.then.mobile.layout;
      screen.view.desktop.layout = rules.listView.then.desktop.layout;
    }

    if (viewType === 'formView' && entity.fields.length > 10) {
      screen.view.mobile.layout = rules.formView.then.mobile.layout;
    }

    return screen;
  }

  /**
   * Apply entity-specific view overrides
   */
  applyEntityViewOverrides(screen, entityView, viewType) {
    // Merge entity view config with screen template
    if (entityView.layout) {
      screen.view.web.layout = entityView.layout;
      screen.view.mobile.layout = entityView.layout;
      screen.view.desktop.layout = entityView.layout;
    }

    if (entityView.filters) {
      screen.filters = entityView.filters;
    }

    return screen;
  }

  /**
   * Replace placeholders in template
   */
  replacePlaceholders(obj, replacements) {
    const str = JSON.stringify(obj);
    let result = str;
    
    Object.keys(replacements).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(regex, replacements[key]);
    });
    
    return JSON.parse(result);
  }

  /**
   * Helper: Pluralize
   */
  pluralize(word) {
    // Simple pluralization (can be enhanced)
    if (word.endsWith('y')) {
      return word.slice(0, -1) + 'ies';
    } else if (word.endsWith('s') || word.endsWith('x') || word.endsWith('ch') || word.endsWith('sh')) {
      return word + 'es';
    } else {
      return word + 's';
    }
  }

  /**
   * Helper: Format title
   */
  formatTitle(str) {
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  /**
   * Helper: Format action label
   */
  formatActionLabel(action) {
    const labels = {
      'create': 'إنشاء',
      'edit': 'تعديل',
      'delete': 'حذف',
      'export': 'تصدير',
      'import': 'استيراد',
      'bulkEdit': 'تعديل متعدد'
    };
    return labels[action] || this.formatTitle(action);
  }
}

export default EntityToScreensGenerator;

