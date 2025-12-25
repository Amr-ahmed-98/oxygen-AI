/**
 * RBAC Permission Checker
 * Policy-aware permission checking system
 */

export class PermissionChecker {
  constructor(policies = {}) {
    this.policies = policies;
    this.userRoles = [];
    this.userPermissions = [];
  }

  /**
   * Set user roles
   */
  setUserRoles(roles) {
    this.userRoles = Array.isArray(roles) ? roles : [roles];
    this.userPermissions = this.collectPermissions(roles);
  }

  /**
   * Collect permissions from roles
   */
  collectPermissions(roles) {
    const permissions = new Set();
    
    roles.forEach(roleId => {
      const role = this.policies.roles?.find(r => r.id === roleId);
      if (role) {
        role.permissions?.forEach(perm => {
          if (perm === '*') {
            // Wildcard - all permissions
            permissions.add('*');
          } else {
            permissions.add(perm);
          }
        });
      }
    });

    return Array.from(permissions);
  }

  /**
   * Check if user has permission
   * @param {string} permission - Permission ID (e.g., 'invoice.create')
   * @returns {boolean}
   */
  can(permission) {
    // Wildcard permission
    if (this.userPermissions.includes('*')) {
      return true;
    }

    // Exact match
    if (this.userPermissions.includes(permission)) {
      return true;
    }

    // Pattern match (e.g., 'invoice.*' matches 'invoice.create')
    const patternMatch = this.userPermissions.some(perm => {
      if (perm.endsWith('.*')) {
        const prefix = perm.slice(0, -2);
        return permission.startsWith(prefix + '.');
      }
      return false;
    });

    return patternMatch;
  }

  /**
   * Check if user has any of the permissions
   */
  canAny(permissions) {
    return permissions.some(perm => this.can(perm));
  }

  /**
   * Check if user has all permissions
   */
  canAll(permissions) {
    return permissions.every(perm => this.can(perm));
  }

  /**
   * Check if user has role
   */
  hasRole(roleId) {
    return this.userRoles.includes(roleId);
  }

  /**
   * Check if user has any of the roles
   */
  hasAnyRole(roleIds) {
    return roleIds.some(roleId => this.hasRole(roleId));
  }

  /**
   * Filter items by permission
   */
  filterByPermission(items, permissionField = 'permission') {
    return items.filter(item => {
      const permission = item[permissionField];
      if (!permission) return true; // No permission required
      return this.can(permission);
    });
  }

  /**
   * Get visible menu items
   */
  getVisibleMenuItems(menuItems) {
    return this.filterByPermission(menuItems, 'permission');
  }

  /**
   * Get enabled actions
   */
  getEnabledActions(actions) {
    return actions.map(action => ({
      ...action,
      disabled: action.permission ? !this.can(action.permission) : false
    }));
  }
}

/**
 * Policy-aware UI helper
 */
export class PolicyAwareUI {
  constructor(permissionChecker) {
    this.checker = permissionChecker;
  }

  /**
   * Render component if permission granted
   */
  renderIf(can, component) {
    return can ? component : null;
  }

  /**
   * Disable component if no permission
   */
  disableIf(cannot, props) {
    return {
      ...props,
      disabled: cannot || props.disabled
    };
  }

  /**
   * Hide component if no permission
   */
  hideIf(cannot) {
    return cannot;
  }

  /**
   * Show permission banner
   */
  getPermissionBanner(permission, reason = '') {
    if (this.checker.can(permission)) {
      return null;
    }

    return {
      type: 'warning',
      message: `You don't have permission to ${permission}. ${reason}`,
      action: {
        label: 'Request Access',
        href: '/permissions/request'
      }
    };
  }
}

export default PermissionChecker;

