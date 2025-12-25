/**
 * Web Renderer
 * Renders app spec to Next.js/React web application
 */

import { PlatformRenderer } from './platform-renderer.base.js';
import { WebNavigation } from '../navigation/web-navigation.js';

export class WebRenderer extends PlatformRenderer {
  constructor(options = {}) {
    super('web', {
      framework: 'nextjs', // 'nextjs' or 'react'
      useTypeScript: true,
      useAppRouter: true, // Next.js App Router
      ...options
    });
  }

  /**
   * Render app from spec
   */
  async renderApp(appSpec) {
    const structure = this.generateFileStructure(appSpec);
    const routes = this.generateRoutes(appSpec);
    const components = await this.generateComponents(appSpec);

    return {
      platform: 'web',
      framework: this.options.framework,
      structure,
      routes,
      components,
      config: this.generateConfig(appSpec)
    };
  }

  /**
   * Generate file structure
   */
  generateFileStructure(appSpec) {
    const structure = {
      'app': {}, // Next.js App Router
      'components': {
        'app-shell': {},
        'data-ui': {},
        'modules': {}
      },
      'lib': {
        'services': {},
        'utils': {}
      },
      'styles': {}
    };

    // Generate module directories
    appSpec.modules?.forEach(module => {
      structure['app'][module.id] = {
        'page.tsx': null,
        '[id]': {
          'page.tsx': null,
          'edit': {
            'page.tsx': null
          }
        },
        'new': {
          'page.tsx': null
        }
      };
    });

    return structure;
  }

  /**
   * Generate routes
   */
  generateRoutes(appSpec) {
    const nav = new WebNavigation({
      type: appSpec.appShell?.sidebar ? 'sidebar' : 'topbar',
      auth: appSpec.auth?.enabled
    });

    return nav.generateRoutes(appSpec.modules || [], appSpec.entities || []);
  }

  /**
   * Generate components
   */
  async generateComponents(appSpec) {
    const components = {};

    // Generate app shell components
    if (appSpec.appShell) {
      components['app-shell'] = await this.generateAppShell(appSpec.appShell);
    }

    // Generate module components
    for (const module of appSpec.modules || []) {
      components[`modules/${module.id}`] = await this.renderModule(module, appSpec.entities || []);
    }

    return components;
  }

  /**
   * Generate app shell
   */
  async generateAppShell(shellConfig) {
    return {
      sidebar: shellConfig.sidebar ? await this.renderComponent({
        ref: 'shell.sidebar',
        props: shellConfig.sidebar
      }) : null,
      header: shellConfig.header ? await this.renderComponent({
        ref: 'shell.header',
        props: shellConfig.header
      }) : null,
      commandPalette: shellConfig.commandPalette ? await this.renderComponent({
        ref: 'shell.command-palette'
      }) : null
    };
  }

  /**
   * Render module
   */
  async renderModule(moduleSpec, entitySpecs) {
    const entities = entitySpecs.filter(e => moduleSpec.entities?.includes(e.id));
    const views = {};

    for (const entity of entities) {
      views[entity.id] = await this.renderEntityViews(entity);
    }

    return {
      module: moduleSpec,
      entities,
      views
    };
  }

  /**
   * Render entity views
   */
  async renderEntityViews(entitySpec) {
    const adaptations = this.getPlatformAdaptations(entitySpec);

    return {
      list: await this.renderListView(entitySpec, adaptations),
      create: await this.renderCreateView(entitySpec, adaptations),
      edit: await this.renderEditView(entitySpec, adaptations),
      details: await this.renderDetailsView(entitySpec, adaptations)
    };
  }

  /**
   * Render list view
   */
  async renderListView(entitySpec, adaptations) {
    const viewType = adaptations.defaultView || entitySpec.views?.list?.type || 'table';
    
    if (viewType === 'table') {
      return await this.renderComponent({
        ref: 'datatable.pro',
        props: {
          columns: entitySpec.views?.list?.columns || [],
          serverSide: true,
          selectable: true
        }
      });
    } else if (viewType === 'cards') {
      // Render card-based list
      return await this.renderComponent({
        ref: 'entity.list.cards',
        props: {}
      });
    }
  }

  /**
   * Render create view
   */
  async renderCreateView(entitySpec, adaptations) {
    return await this.renderComponent({
      ref: 'form.builder',
      props: {
        schema: this.entityToFormSchema(entitySpec),
        variant: adaptations.useBottomSheet ? 'inline' : 'single'
      }
    });
  }

  /**
   * Render edit view
   */
  async renderEditView(entitySpec, adaptations) {
    return await this.renderComponent({
      ref: 'form.builder',
      props: {
        schema: this.entityToFormSchema(entitySpec),
        variant: adaptations.useBottomSheet ? 'inline' : 'single'
      }
    });
  }

  /**
   * Render details view
   */
  async renderDetailsView(entitySpec, adaptations) {
    return await this.renderComponent({
      ref: 'detail.view',
      props: {
        entity: entitySpec.id,
        variant: 'tabs',
        showActivity: true
      }
    });
  }

  /**
   * Render component (delegates to existing renderers)
   */
  async renderComponent(componentSpec, props = {}, theme = {}) {
    // Use existing HTML/CSS or React renderer
    const { ReactRenderer } = require('./renderer-react.js');
    const renderer = new ReactRenderer(this.options);
    
    // Load manifest
    const manifest = await this.loadManifest(componentSpec.ref);
    
    return renderer.render(manifest, { ...manifest.props, ...props }, theme);
  }

  /**
   * Convert entity to form schema
   */
  entityToFormSchema(entitySpec) {
    return {
      type: 'object',
      properties: entitySpec.fields.reduce((acc, field) => {
        acc[field.name] = {
          type: field.type,
          title: field.label || field.name,
          required: field.required || false
        };
        return acc;
      }, {})
    };
  }

  /**
   * Generate config files
   */
  generateConfig(appSpec) {
    return {
      'next.config.js': null,
      'tsconfig.json': null,
      'package.json': null,
      'tailwind.config.js': null // If using Tailwind
    };
  }

  /**
   * Load manifest
   */
  async loadManifest(ref) {
    // Load from manifests directory
    try {
      const manifest = await import(`../manifests/${ref}.manifest.json`);
      return manifest.default || manifest;
    } catch (e) {
      // Try sections
      try {
        const manifest = await import(`../sections/${ref}.manifest.json`);
        return manifest.default || manifest;
      } catch (e2) {
        throw new Error(`Manifest not found: ${ref}`);
      }
    }
  }
}

export default WebRenderer;

