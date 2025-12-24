# App Shell System

Complete application shell components for SaaS/ERP applications.

## Components

### 1. Sidebar (`shell.sidebar`)
Main application navigation sidebar.

**Features:**
- Collapsible/expandable
- Icon-based navigation
- Grouped items
- Search functionality
- Badge support
- Permission-based visibility
- RTL support

**Variants:**
- `collapsible` - Can be collapsed
- `permanent` - Always visible
- `overlay` - Overlays content (mobile)
- `mini` - Icon-only when collapsed

### 2. Header (`shell.header`)
Application header with breadcrumbs and actions.

**Features:**
- Breadcrumbs navigation
- Page title
- Action buttons
- Global search
- Notifications
- User menu
- Sticky positioning

**Variants:**
- `with-breadcrumbs` - Full breadcrumbs
- `minimal` - Title only
- `with-search` - Integrated search
- `transparent` - Transparent background

### 3. Command Palette (`shell.command-palette`)
Cmd+K command palette for quick navigation.

**Features:**
- Keyboard shortcut (Cmd+K / Ctrl+K)
- Search commands
- Categorized results
- Recent commands
- Permission-aware
- Custom actions

**Variants:**
- `modal` - Centered modal (desktop)
- `drawer` - Bottom drawer (mobile)
- `inline` - Inline dropdown

## Usage

### Sidebar Example

```json
{
  "ref": "shell.sidebar",
  "props": {
    "variant": "collapsible",
    "position": "left",
    "collapsed": false
  },
  "slots": {
    "logo": "https://example.com/logo.svg",
    "items": [
      {
        "id": "dashboard",
        "label": "Dashboard",
        "icon": "home",
        "href": "/dashboard"
      },
      {
        "id": "invoices",
        "label": "Invoices",
        "icon": "file-text",
        "href": "/invoices",
        "badge": "3",
        "group": "Sales"
      }
    ]
  }
}
```

### Header Example

```json
{
  "ref": "shell.header",
  "props": {
    "variant": "with-breadcrumbs",
    "showBreadcrumbs": true,
    "showNotifications": true
  },
  "slots": {
    "breadcrumbs": [
      {"label": "Home", "href": "/"},
      {"label": "Invoices", "href": "/invoices"},
      {"label": "Invoice #1234"}
    ],
    "actions": [
      {
        "id": "create",
        "label": "New Invoice",
        "icon": "plus",
        "variant": "primary",
        "permission": "invoice.create"
      }
    ]
  }
}
```

### Command Palette Example

```json
{
  "ref": "shell.command-palette",
  "props": {
    "trigger": "Cmd+K",
    "placeholder": "Type a command..."
  },
  "slots": {
    "commands": [
      {
        "id": "nav-dashboard",
        "label": "Go to Dashboard",
        "category": "Navigation",
        "icon": "home",
        "action": {"type": "navigate", "value": "/dashboard"}
      },
      {
        "id": "create-invoice",
        "label": "Create Invoice",
        "category": "Actions",
        "icon": "plus",
        "shortcut": "Cmd+I",
        "action": {"type": "execute", "value": "createInvoice"},
        "permission": "invoice.create"
      }
    ]
  }
}
```

## Platform Adaptations

### Web
- Full sidebar with hover states
- Keyboard shortcuts
- Context menus

### Mobile
- Overlay sidebar (drawer)
- Bottom navigation tabs (alternative)
- Swipe gestures

### Desktop
- Resizable sidebar
- Window menu integration
- Native shortcuts

## Integration

App shell components integrate with:
- **RBAC** - Permission-based visibility
- **Routing** - Navigation handling
- **Themes** - Consistent styling
- **i18n** - Localized labels
- **State Management** - Collapsed state, etc.

## Benefits

- **Consistent Navigation** - Same patterns across modules
- **Power User Friendly** - Command palette for efficiency
- **Accessible** - Full keyboard navigation
- **Responsive** - Adapts to screen size
- **Flexible** - Configurable per application

