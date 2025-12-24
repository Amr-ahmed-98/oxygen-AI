# RBAC (Role-Based Access Control)

Permission system for policy-aware UI generation.

## Features

- **Role-based permissions** - Assign permissions to roles
- **Permission patterns** - Support for wildcards (`*`, `invoice.*`)
- **Policy-aware UI** - Components respect permissions
- **Permission checking** - Runtime permission validation
- **Menu filtering** - Hide unauthorized menu items
- **Action disabling** - Disable actions without permission

## Usage

### Initialize Permission Checker

```javascript
import { PermissionChecker } from './core/rbac/permission-checker.js';

const policies = {
  roles: [
    {
      id: 'admin',
      permissions: ['*']
    },
    {
      id: 'accountant',
      permissions: ['invoice.*', 'payment.*']
    }
  ]
};

const checker = new PermissionChecker(policies);
checker.setUserRoles(['accountant']);

// Check permission
if (checker.can('invoice.create')) {
  // Show create button
}

// Filter menu items
const visibleItems = checker.getVisibleMenuItems(menuItems);

// Get enabled actions
const actions = checker.getEnabledActions([
  { id: 'edit', label: 'Edit', permission: 'invoice.edit' },
  { id: 'delete', label: 'Delete', permission: 'invoice.delete' }
]);
```

### Policy-Aware UI

```javascript
import { PolicyAwareUI } from './core/rbac/permission-checker.js';

const ui = new PolicyAwareUI(checker);

// Render conditionally
{ui.renderIf(checker.can('invoice.create'), <CreateButton />)}

// Disable if no permission
<Button {...ui.disableIf(!checker.can('invoice.edit'), { onClick: handleEdit })}>
  Edit
</Button>

// Show permission banner
const banner = ui.getPermissionBanner('invoice.delete', 'Contact admin to request access');
```

### Permission Patterns

- `*` - All permissions
- `invoice.*` - All invoice permissions
- `invoice.create` - Specific permission
- `*.view` - View permission for all resources

### Integration with Components

Components automatically check permissions:

```json
{
  "actions": [
    {
      "id": "create",
      "label": "New Invoice",
      "permission": "invoice.create"
    },
    {
      "id": "export",
      "label": "Export",
      "permission": "invoice.export"
    }
  ]
}
```

The renderer will:
- Hide actions without permission
- Disable buttons without permission
- Show permission banners when needed

## Benefits

- **Security** - Enforced at UI level
- **UX** - Clear feedback on permissions
- **Maintainable** - Centralized permission logic
- **Flexible** - Pattern-based permissions

