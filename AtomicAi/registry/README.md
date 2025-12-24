# Complete Registry

Unified registry for all 5 levels: Atoms, Molecules, Organisms, Layouts, and Pages.

## Structure

The registry organizes components by level and provides:

- **Component metadata** - ID, name, category, dependencies, tags
- **Manifest paths** - Location of manifest files
- **Categories** - Grouping by functionality
- **Integrations** - Special integrations (Data UI, App Shell, RBAC)
- **Site type presets** - Recommended components per site type

## Levels

### Atoms (20 components)
Basic building blocks:
- button, icon, badge, avatar, link, typography, label, chip
- spinner, progress, skeleton, tooltip, divider, image
- kbd, indicator, fab

### Molecules (48 components)
Simple combinations:
- input, select, textarea, checkbox, radio
- card, accordion, tabs, modal, drawer
- carousel, breadcrumb, menu, alert, toast

### Organisms (51 components)
Complex components:
- Data UI: filter-bar, table-toolbar, bulk-selection-actions
- RBAC: permissions-matrix, roles-permissions-ui
- Activity: activity-card, notification-card
- And more...

### Layouts (39 components)
Layout structures:
- App Shell: app-shell, sidebar, navbar
- Multi-tenant: workspace-switcher
- Layouts: container, grid, sidebar-layout
- And more...

### Pages (48 components)
Complete pages:
- Auth: login-form, register-form
- ERP: invoice-list
- E-commerce: checkout
- Marketing: pricing-section, testimonials-section
- And more...

## Integrations

### Data UI Kit
Components for data-heavy applications (tables, filters, etc.)
- Level: Organisms
- Components: filter-bar, table-toolbar, bulk-selection-actions, etc.

### App Shell
Application shell components
- Levels: Layouts, Organisms
- Components: app-shell, sidebar, navbar, workspace-switcher, etc.

### RBAC
Role-based access control components
- Level: Organisms
- Components: permissions-matrix, roles-permissions-ui

## Site Type Presets

### SaaS
Recommended components for SaaS applications

### ERP
Recommended components for ERP systems

## Usage

```javascript
import registry from './registry-complete.json';

// Get all atoms
const atoms = registry.levels.atoms.components;

// Get Data UI components
const dataUI = registry.integrations.dataUI.components;

// Get SaaS preset
const saasPreset = registry.siteTypePresets.saas;
```

