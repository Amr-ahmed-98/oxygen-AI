# App Specifications

Platform-agnostic specifications for generating SaaS/ERP applications across Web, Mobile, and Desktop platforms.

## Schemas

### 1. App Spec (`app-spec.schema.json`)
Complete application specification including:
- Platforms (web, mobile, desktop)
- Navigation models per platform
- App shell configuration
- Modules and entities
- Authentication and RBAC
- Multi-tenant support
- i18n and RTL
- Offline support

### 2. Module Spec (`module-spec.schema.json`)
ERP/SaaS module specification:
- Module metadata (id, name, type, icon)
- Routes configuration
- Permissions
- UI presets (density, table style, card style)
- Features (export, import, bulk actions, etc.)
- Platform adaptations

### 3. Entity Spec (`entity-spec.schema.json`)
Data entity specification:
- Fields with types and validation
- Relations to other entities
- Permissions (view, create, edit, delete)
- View configurations (list, create, edit, details)
- Workflows (statuses and transitions)
- Lifecycle hooks

## Usage

### Example: Complete ERP App Spec

```json
{
  "id": "erp-demo",
  "name": "ERP System",
  "type": "erp",
  "platforms": ["web", "mobile", "desktop"],
  "theme": "theme-saas-modern",
  "appShell": {
    "sidebar": {
      "position": "left",
      "collapsible": true,
      "groups": []
    },
    "header": {
      "breadcrumbs": true,
      "userMenu": true
    },
    "commandPalette": true
  },
  "modules": [
    {
      "id": "invoices",
      "name": "Invoices",
      "type": "sales",
      "entities": ["invoice"],
      "routes": {
        "base": "/invoices"
      }
    }
  ],
  "entities": [
    {
      "id": "invoice",
      "name": "Invoice",
      "pluralName": "Invoices",
      "module": "invoices",
      "fields": [
        {
          "name": "invoiceNo",
          "type": "string",
          "required": true,
          "unique": true
        },
        {
          "name": "customerId",
          "type": "relation",
          "relation": {
            "type": "manyToOne",
            "entity": "customer",
            "displayField": "name"
          },
          "required": true
        },
        {
          "name": "status",
          "type": "enum",
          "options": [
            {"value": "draft", "label": "Draft"},
            {"value": "sent", "label": "Sent"},
            {"value": "paid", "label": "Paid"}
          ]
        },
        {
          "name": "total",
          "type": "money",
          "required": true
        }
      ],
      "permissions": {
        "view": ["admin", "accountant", "sales"],
        "create": ["admin", "accountant"],
        "edit": ["admin", "accountant"],
        "delete": ["admin"]
      },
      "views": {
        "list": {
          "columns": [
            {"field": "invoiceNo", "label": "Invoice #", "sortable": true},
            {"field": "customerId", "label": "Customer", "sortable": true},
            {"field": "status", "label": "Status", "format": "badge"},
            {"field": "total", "label": "Total", "format": "money", "align": "right"}
          ],
          "pageSize": 20
        },
        "create": {
          "layout": "sections",
          "sections": [
            {
              "title": "Basic Information",
              "fields": ["invoiceNo", "customerId", "date"]
            }
          ]
        }
      }
    }
  ],
  "auth": {
    "enabled": true,
    "methods": ["email", "2fa"]
  },
  "rbac": {
    "enabled": true,
    "roles": [
      {
        "id": "admin",
        "name": "Administrator",
        "permissions": ["*"]
      }
    ]
  },
  "i18n": {
    "enabled": true,
    "defaultLocale": "en",
    "supportedLocales": ["en", "ar"],
    "rtl": {
      "enabled": true,
      "locales": ["ar"]
    }
  }
}
```

## Platform Adaptations

The same entity spec generates different UIs per platform:

### Web
- DataTable with advanced features
- Side panel forms
- Context menus
- Keyboard shortcuts

### Mobile
- List cards
- Bottom sheet forms
- Swipe actions
- Pull to refresh

### Desktop
- Table with multi-select
- Split view (list + details)
- Context menus
- Keyboard shortcuts
- Native menus

## Integration with Generators

These specs are consumed by:
1. **AI Orchestrator** - Parses natural language to generate specs
2. **Composer** - Validates and composes modules/entities
3. **Renderers** - Generates platform-specific code
4. **Validators** - Ensures quality and consistency

## Benefits

- **Platform-agnostic**: Same spec works for all platforms
- **Consistent**: Ensures UI consistency across platforms
- **Flexible**: Supports custom modules and entities
- **Validated**: JSON Schema validation
- **AI-ready**: Structured for AI generation

