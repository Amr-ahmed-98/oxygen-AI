# Core System

Shared core system for all 5 levels (Atoms, Molecules, Organisms, Layouts, Pages).

## Structure

```
core/
├── app-shell/             # App shell components (Sidebar, Header, Command Palette)
├── composer/              # Composition rules and validation engine
├── data-ui/               # Data UI components (DataTable, FilterBuilder, FormBuilder)
├── design-tokens/         # Platform-agnostic design tokens
├── navigation/            # Navigation models (Web, Mobile, Desktop)
├── orchestrator/          # Generation orchestrators (AI, ERP)
├── rbac/                  # RBAC system (Permissions, Policies)
├── registry/              # Component registry
├── renderers/             # Production renderers (HTML/CSS, React, Next.js)
├── services/              # Core services (Auth, i18n, Sync)
├── specs/                 # App/Module/Entity spec schemas
└── themes/                # Theme packs (5 themes)
```

## App Shell

App shell components for application layouts:
- Sidebar (grouped, collapsible)
- Header (with breadcrumbs)
- Command Palette (Ctrl+K)
- User Menu
- Tenant/Workspace Switcher
- Notification Center

**Location:** `core/app-shell/`
**Usage:** Used by Layouts and Pages

## Composer

Composition rules engine for building pages:
- Layout rules (spacing, max widths)
- Composition rules (valid combinations, frequencies)
- Validation engine
- Scoring system

**Location:** `core/composer/`
**Usage:** Used by Orchestrator and Generator

## Data UI

Data-intensive UI components:
- DataTable Pro (advanced table with sorting, filtering, pagination)
- Filter Builder
- Form Builder
- Detail View

**Location:** `core/data-ui/`
**Usage:** Used by Organisms and Pages

## Design Tokens

Platform-agnostic design tokens that work across all platforms (Web, Mobile, Desktop):
- Colors
- Typography
- Spacing
- Shadows
- Border radius
- Motion

**Location:** `core/design-tokens/`
**Usage:** Shared by all levels

## Navigation

Navigation models for different platforms:
- **Web Navigation** - Routes, breadcrumbs, sidebar
- **Mobile Navigation** - Tabs, drawer, stack navigation
- **Desktop Navigation** - Sidebar, menu bar, keyboard shortcuts

**Location:** `core/navigation/`
**Usage:** Used by Layouts and Pages

## Orchestrator

Generation orchestrators:
- **AI Orchestrator** - Generate from user brief
- **ERP Orchestrator** - Generate ERP/SaaS applications
- **Catalog Retriever** - RAG-based component retrieval
- **Site Spec Parser** - Parse site specifications

**Location:** `core/orchestrator/`
**Usage:** Generates complete applications

## RBAC

Role-based access control system:
- Permission checker
- Policy-aware UI components
- Permission-aware routing
- RBAC spec format

**Location:** `core/rbac/`
**Usage:** Used by Organisms and Pages

## Registry

Central component registry:
- All components from all levels
- Metadata and manifest paths
- Categories and tags
- Integration info

**Location:** `core/registry/`
**Usage:** Used by Orchestrator and Catalog Retriever

## Renderers

Production code renderers:
- **HTML/CSS Renderer** - Static HTML/CSS output
- **React Renderer** - React components
- **Next.js Renderer** - Next.js pages
- **CSS Variables Renderer** - CSS variables output
- **Web Renderer** - Web-optimized output

**Location:** `core/renderers/`
**Usage:** Generates production-ready code

## Services

Core services for applications:
- **Auth Service** - Authentication (email/password, SSO, 2FA)
- **Sync Service** - Offline-first sync with conflict resolution
- **i18n Service** - Internationalization with RTL support

**Location:** `core/services/`
**Usage:** Used by Pages and Layouts

## Specs

Platform-agnostic specifications:
- **App Spec** - Complete application specification
- **Module Spec** - ERP/SaaS module specification
- **Entity Spec** - Data entity specification

**Location:** `core/specs/`
**Usage:** Used by Orchestrator and Generator

## Themes

Complete theme packs:
- **theme-saas-modern** - Modern SaaS theme
- **theme-agency-bold** - Bold agency theme
- **theme-minimal-clean** - Minimal clean theme
- **theme-portfolio-editorial** - Portfolio editorial theme
- **theme-ecommerce-premium** - E-commerce premium theme

Each theme includes:
- Colors
- Typography
- Spacing
- Border radius
- Shadows
- Motion

**Location:** `core/themes/`
**Usage:** Used by all levels for theming

## Integration

All levels use the core system:

- **Atoms** - Use design tokens
- **Molecules** - Use design tokens, may use services
- **Organisms** - Use design tokens, services, RBAC, data-ui
- **Layouts** - Use design tokens, navigation models, app-shell
- **Pages** - Use all core systems

## Benefits

- **Shared foundation** - Same tokens/services across all levels
- **Consistency** - Unified design and behavior
- **Reusability** - Core logic shared
- **Maintainability** - Single source of truth
- **Better organization** - All core systems in one place

## Migration Note

All core systems were moved from `molecules-complete/` to `core/` for better organization. Update your import paths accordingly:

**Old:** `../molecules-complete/composer/composer.js`
**New:** `../core/composer/composer.js`

---

**Last Updated:** After moving shared folders from molecules-complete to core/
