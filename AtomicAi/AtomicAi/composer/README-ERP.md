# ERP Composer

Composition rules specific to ERP/SaaS applications.

## Philosophy

ERP applications need **consistent structure** rather than visual variety. The composer ensures:
- Every screen has required elements (breadcrumbs, actions, etc.)
- List views always include toolbar, filters, pagination
- Forms follow consistent patterns
- Platform adaptations are automatic
- Permissions are respected

## Rules

### Required Screen Elements
Every ERP screen must have:
- App shell (sidebar/header)
- Breadcrumbs
- Page actions (if applicable)

### List View Requirements
All list views must include:
- Toolbar (search, filters, columns, export)
- Pagination
- Empty state
- Loading state
- Error state
- No-permission state

### Platform Adaptations

#### Mobile
- List: Card list instead of table
- Filters: Bottom sheet
- Forms: Drawer or full-screen

#### Desktop
- List: Full data table
- Filters: Inline filter bar
- Forms: Modal or side panel
- Shortcuts: Keyboard shortcuts enabled
- Context menu: Right-click actions

#### Web
- List: Data table
- Filters: Inline filter bar
- Forms: Full page form

## Usage

```javascript
import { ERPComposer } from './composer/composer-erp.js';

const composer = new ERPComposer();

// Compose entity views
const entitySpec = {
  id: 'invoice',
  name: 'Invoice',
  fields: [...],
  permissions: {...}
};

const views = composer.composeEntityViews(entitySpec, 'web');

// views.list - List view composition
// views.create - Create view composition
// views.edit - Edit view composition
// views.detail - Detail view composition
```

## Benefits

- **Consistency** - All ERP screens follow same patterns
- **Quality** - Required elements always present
- **Platform-optimized** - Adapts to mobile/desktop/web
- **Permission-aware** - Respects RBAC
- **Maintainable** - Centralized composition logic

## Integration

The ERP Composer integrates with:
- **Entity Specs** - Reads entity definitions
- **Manifest Catalog** - Uses component manifests
- **Platform Renderers** - Generates platform-specific code
- **Validators** - Ensures quality

