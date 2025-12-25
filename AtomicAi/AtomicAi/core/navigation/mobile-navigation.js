/**
 * Mobile Navigation Model
 * Navigation patterns for mobile applications (React Native / Flutter)
 */

export class MobileNavigation {
  constructor(config) {
    this.config = {
      type: 'tabs', // tabs, drawer, stack
      tabs: [],
      ...config
    };
  }

  /**
   * Generate navigation structure
   */
  generateNavigation(modules, entities) {
    if (this.config.type === 'tabs') {
      return this.generateTabNavigation(modules);
    } else if (this.config.type === 'drawer') {
      return this.generateDrawerNavigation(modules, entities);
    } else {
      return this.generateStackNavigation(modules, entities);
    }
  }

  /**
   * Generate tab navigation
   */
  generateTabNavigation(modules) {
    const tabs = modules
      .slice(0, 5) // Max 5 tabs
      .map((module, index) => ({
        id: module.id,
        label: module.name,
        icon: module.icon || 'list',
        screen: `List${this.capitalize(module.id)}`,
        badge: null
      }));

    return {
      type: 'tabs',
      tabs,
      screens: this.generateTabScreens(modules)
    };
  }

  /**
   * Generate drawer navigation
   */
  generateDrawerNavigation(modules, entities) {
    const items = modules.map(module => ({
      id: module.id,
      label: module.name,
      icon: module.icon || 'folder',
      screen: `List${this.capitalize(module.id)}`,
      group: module.type
    }));

    return {
      type: 'drawer',
      items,
      screens: this.generateDrawerScreens(modules)
    };
  }

  /**
   * Generate stack navigation
   */
  generateStackNavigation(modules, entities) {
    const screens = [];

    // Home/Dashboard
    screens.push({
      id: 'Home',
      component: 'Dashboard',
      options: {
        title: 'Home'
      }
    });

    // Module screens
    modules.forEach(module => {
      screens.push({
        id: `List${this.capitalize(module.id)}`,
        component: 'EntityList',
        options: {
          title: module.name
        }
      });

      screens.push({
        id: `Details${this.capitalize(module.id)}`,
        component: 'EntityDetails',
        options: {
          title: 'Details'
        }
      });
    });

    return {
      type: 'stack',
      screens
    };
  }

  /**
   * Generate screens for tabs
   */
  generateTabScreens(modules) {
    const screens = [];

    modules.forEach(module => {
      screens.push({
        id: `List${this.capitalize(module.id)}`,
        component: 'EntityList',
        module: module.id,
        options: {
          title: module.name,
          tabBarLabel: module.name
        }
      });
    });

    return screens;
  }

  /**
   * Generate screens for drawer
   */
  generateDrawerScreens(modules) {
    const screens = [];

    modules.forEach(module => {
      // List screen
      screens.push({
        id: `List${this.capitalize(module.id)}`,
        component: 'EntityList',
        module: module.id
      });

      // Details screen
      screens.push({
        id: `Details${this.capitalize(module.id)}`,
        component: 'EntityDetails',
        module: module.id
      });

      // Create screen (modal)
      screens.push({
        id: `Create${this.capitalize(module.id)}`,
        component: 'EntityCreate',
        module: module.id,
        presentation: 'modal'
      });
    });

    return screens;
  }

  /**
   * Generate deep links
   */
  generateDeepLinks(modules) {
    const links = [];

    modules.forEach(module => {
      links.push({
        pattern: `${module.id}/:id`,
        screen: `Details${this.capitalize(module.id)}`
      });
    });

    return links;
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export default MobileNavigation;

