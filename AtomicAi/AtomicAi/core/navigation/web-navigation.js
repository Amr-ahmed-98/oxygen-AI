/**
 * Web Navigation Model
 * Navigation patterns for web applications
 */

export class WebNavigation {
  constructor(config) {
    this.config = {
      type: 'sidebar', // sidebar, topbar, both
      routes: [],
      ...config
    };
  }

  /**
   * Generate routes structure
   */
  generateRoutes(modules, entities) {
    const routes = [];

    // Dashboard route
    routes.push({
      path: '/',
      component: 'Dashboard',
      exact: true
    });

    // Module routes
    modules.forEach(module => {
      const moduleRoutes = this.generateModuleRoutes(module, entities);
      routes.push(...moduleRoutes);
    });

    // Auth routes
    if (this.config.auth) {
      routes.push({
        path: '/login',
        component: 'Login',
        public: true
      });
    }

    return routes;
  }

  /**
   * Generate routes for a module
   */
  generateModuleRoutes(module, entities) {
    const routes = [];
    const basePath = module.routes?.base || `/${module.id}`;

    // List route
    routes.push({
      path: basePath,
      component: 'EntityList',
      module: module.id,
      permission: `${module.id}.view`
    });

    // Create route
    routes.push({
      path: `${basePath}/new`,
      component: 'EntityCreate',
      module: module.id,
      permission: `${module.id}.create`
    });

    // Details route
    routes.push({
      path: `${basePath}/:id`,
      component: 'EntityDetails',
      module: module.id,
      permission: `${module.id}.view`
    });

    // Edit route
    routes.push({
      path: `${basePath}/:id/edit`,
      component: 'EntityEdit',
      module: module.id,
      permission: `${module.id}.edit`
    });

    return routes;
  }

  /**
   * Generate breadcrumbs for route
   */
  generateBreadcrumbs(path, route, modules) {
    const breadcrumbs = [
      { label: 'Home', href: '/' }
    ];

    if (route.module) {
      const module = modules.find(m => m.id === route.module);
      if (module) {
        breadcrumbs.push({
          label: module.name,
          href: module.routes?.base || `/${module.id}`
        });
      }
    }

    // Add current page
    if (route.component) {
      breadcrumbs.push({
        label: this.getPageLabel(route.component),
        href: path
      });
    }

    return breadcrumbs;
  }

  /**
   * Get page label from component name
   */
  getPageLabel(component) {
    const labels = {
      'Dashboard': 'Dashboard',
      'EntityList': 'List',
      'EntityCreate': 'Create',
      'EntityEdit': 'Edit',
      'EntityDetails': 'Details'
    };
    return labels[component] || component;
  }
}

export default WebNavigation;

