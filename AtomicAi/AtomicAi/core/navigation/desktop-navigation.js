/**
 * Desktop Navigation Model
 * Navigation patterns for desktop applications (Tauri/Electron)
 */

export class DesktopNavigation {
  constructor(config) {
    this.config = {
      sidebar: true,
      menuBar: true,
      shortcuts: true,
      ...config
    };
  }

  /**
   * Generate navigation structure
   */
  generateNavigation(modules, entities) {
    return {
      sidebar: this.config.sidebar ? this.generateSidebar(modules) : null,
      menuBar: this.config.menuBar ? this.generateMenuBar(modules) : null,
      shortcuts: this.config.shortcuts ? this.generateShortcuts(modules) : null,
      routes: this.generateRoutes(modules, entities)
    };
  }

  /**
   * Generate sidebar navigation
   */
  generateSidebar(modules) {
    return {
      items: modules.map(module => ({
        id: module.id,
        label: module.name,
        icon: module.icon || 'folder',
        path: `/${module.id}`,
        group: this.getGroup(module.type)
      })),
      groups: this.getGroups()
    };
  }

  /**
   * Generate menu bar
   */
  generateMenuBar(modules) {
    return {
      items: [
        {
          label: 'File',
          items: [
            { label: 'New', shortcut: 'Cmd+N', action: 'new' },
            { label: 'Open', shortcut: 'Cmd+O', action: 'open' },
            { type: 'separator' },
            { label: 'Exit', action: 'exit' }
          ]
        },
        {
          label: 'Edit',
          items: [
            { label: 'Undo', shortcut: 'Cmd+Z', action: 'undo' },
            { label: 'Redo', shortcut: 'Cmd+Shift+Z', action: 'redo' },
            { type: 'separator' },
            { label: 'Cut', shortcut: 'Cmd+X', action: 'cut' },
            { label: 'Copy', shortcut: 'Cmd+C', action: 'copy' },
            { label: 'Paste', shortcut: 'Cmd+V', action: 'paste' }
          ]
        },
        {
          label: 'View',
          items: [
            { label: 'Toggle Sidebar', shortcut: 'Cmd+B', action: 'toggleSidebar' },
            { label: 'Toggle Fullscreen', shortcut: 'Cmd+Ctrl+F', action: 'toggleFullscreen' }
          ]
        },
        {
          label: 'Modules',
          items: modules.map(module => ({
            label: module.name,
            action: `navigate:/${module.id}`
          }))
        }
      ]
    };
  }

  /**
   * Generate keyboard shortcuts
   */
  generateShortcuts(modules) {
    const shortcuts = [
      { key: 'Cmd+K', action: 'commandPalette', platform: ['mac', 'linux'] },
      { key: 'Ctrl+K', action: 'commandPalette', platform: ['windows'] },
      { key: 'Cmd+B', action: 'toggleSidebar', platform: ['mac', 'linux'] },
      { key: 'Ctrl+B', action: 'toggleSidebar', platform: ['windows'] }
    ];

    // Add module shortcuts
    modules.slice(0, 9).forEach((module, index) => {
      shortcuts.push({
        key: `Cmd+${index + 1}`,
        action: `navigate:/${module.id}`,
        platform: ['mac', 'linux']
      });
    });

    return shortcuts;
  }

  /**
   * Generate routes
   */
  generateRoutes(modules, entities) {
    const routes = [];

    routes.push({
      path: '/',
      component: 'Dashboard'
    });

    modules.forEach(module => {
      routes.push({
        path: `/${module.id}`,
        component: 'EntityList',
        module: module.id
      });

      routes.push({
        path: `/${module.id}/:id`,
        component: 'EntityDetails',
        module: module.id
      });
    });

    return routes;
  }

  /**
   * Get module group
   */
  getGroup(moduleType) {
    const groups = {
      'crm': 'Sales',
      'inventory': 'Operations',
      'hr': 'HR',
      'accounting': 'Finance',
      'admin': 'Administration'
    };
    return groups[moduleType] || 'Other';
  }

  /**
   * Get all groups
   */
  getGroups() {
    return ['Sales', 'Operations', 'HR', 'Finance', 'Administration', 'Other'];
  }
}

export default DesktopNavigation;

