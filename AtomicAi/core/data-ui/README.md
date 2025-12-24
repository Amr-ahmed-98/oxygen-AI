# Data UI Kit

Production-grade data UI components for SaaS/ERP applications.

## Components

### 1. Data Table Pro (`datatable.pro`)
Advanced data table with enterprise features.

**Features:**
- Server-side pagination
- Sorting (single/multi-column)
- Column filtering
- Row selection (single/multi)
- Column visibility toggle
- Column resizing
- Column reordering
- Export (CSV, Excel, PDF, JSON)
- Empty states
- Loading states
- Bulk actions
- Row actions

**Variants:**
- `bordered` - Bordered cells
- `striped` - Alternating row colors
- `minimal` - Clean minimal style
- `compact` - Dense rows
- `comfortable` - Standard spacing

### 2. Filter Builder (`filter.builder`)
Advanced filter builder with groups and saved views.

**Features:**
- Multiple filter types (text, number, date, enum, relation)
- AND/OR groups
- Saved filter views
- Quick filters
- Filter presets

**Variants:**
- `simple` - Basic filters
- `advanced` - Groups and complex logic
- `saved-views` - With saved views
- `inline` - Inline filter UI

### 3. Form Builder (`form.builder`)
Schema-driven form builder.

**Features:**
- JSON Schema support
- Field validation
- Conditional fields
- Multi-step forms
- Sectioned forms
- Dirty tracking
- Auto-save (optional)

**Variants:**
- `single` - Single page form
- `steps` - Multi-step wizard
- `sections` - Grouped sections
- `inline` - Inline editing

### 4. Detail View (`detail.view`)
Entity detail view with tabs and timeline.

**Features:**
- Overview cards
- Tabbed sections
- Activity timeline
- Comments (optional)
- Related entities
- Action buttons
- Breadcrumbs integration

**Variants:**
- `single` - Single column
- `tabs` - Tabbed layout
- `split` - Split view
- `minimal` - Minimal layout

## Platform Adaptations

### Web
- Full-featured tables
- Inline editing
- Context menus
- Keyboard shortcuts

### Mobile
- List cards instead of tables
- Bottom sheet forms
- Swipe actions
- Pull to refresh

### Desktop
- Multi-select
- Drag & drop
- Keyboard shortcuts
- Native menus

## Usage Examples

### Data Table

```json
{
  "ref": "datatable.pro",
  "props": {
    "variant": "minimal",
    "density": "comfortable",
    "serverSide": true,
    "pageSize": 20,
    "selectable": true,
    "multiSelect": true,
    "export": true
  },
  "slots": {
    "columns": [
      {
        "id": "name",
        "label": "Name",
        "field": "name",
        "sortable": true,
        "filterable": true
      },
      {
        "id": "status",
        "label": "Status",
        "field": "status",
        "format": "badge"
      }
    ],
    "data": [],
    "bulkActions": [
      {
        "id": "delete",
        "label": "Delete",
        "action": "delete"
      }
    ]
  }
}
```

### Form Builder

```json
{
  "ref": "form.builder",
  "props": {
    "variant": "sections",
    "schema": {
      "type": "object",
      "properties": {
        "name": {"type": "string", "required": true},
        "email": {"type": "string", "format": "email"}
      }
    }
  }
}
```

## Integration

Data UI components integrate with:
- **Entity Specs** - Auto-generate from entity definitions
- **RBAC** - Permission-based actions
- **State Management** - Form state, table state
- **API** - Server-side operations
- **i18n** - Localized labels

## Benefits

- **Production-ready** - Enterprise features included
- **Consistent** - Same patterns across entities
- **Flexible** - Configurable per use case
- **Accessible** - Full a11y support
- **Performant** - Optimized for large datasets

