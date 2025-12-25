# Implementation Guide - All 5 Levels

## نظرة عامة

تم تطبيق النظام الكامل على جميع المستويات الخمسة (Atoms, Molecules, Organisms, Layouts, Pages) مع ربط كل مستوى بما يناسبه من المكونات.

---

## 1️⃣ Registry شامل ✅

**الموقع:** `registry/registry-complete.json`

**المحتوى:**
- ✅ جميع Components من المستويات الخمسة
- ✅ Metadata لكل component
- ✅ Manifest paths
- ✅ Categories و Tags
- ✅ Integrations (Data UI, App Shell, RBAC)
- ✅ Site type presets

---

## 2️⃣ Core System مشترك ✅

**الموقع:** `core/` (مع إشارات للملفات الموجودة في molecules-complete)

**المكونات المشتركة:**

### Design Tokens
- **الموقع:** `molecules-complete/design-tokens/`
- **الاستخدام:** جميع المستويات
- **الملفات:**
  - `platform-tokens.js` - Platform-agnostic tokens
  - `README.md`

### Core Services
- **الموقع:** `molecules-complete/core/services/`
- **الاستخدام:** Organisms, Layouts, Pages
- **الخدمات:**
  - `auth.service.js` - Authentication
  - `sync.service.js` - Offline sync
  - `i18n.service.js` - Internationalization + RTL

### RBAC System
- **الموقع:** `molecules-complete/core/rbac/`
- **الاستخدام:** Organisms, Pages
- **الملفات:**
  - `permission-checker.js` - Permission checking
  - `rbac-spec.example.json` - RBAC configuration

### Navigation Models
- **الموقع:** `molecules-complete/navigation/`
- **الاستخدام:** Layouts, Pages
- **النماذج:**
  - `web-navigation.js` - Web navigation
  - `mobile-navigation.js` - Mobile navigation
  - `desktop-navigation.js` - Desktop navigation

### Specs
- **الموقع:** `molecules-complete/specs/`
- **الاستخدام:** Orchestrator
- **الملفات:**
  - `app-spec.schema.json`
  - `module-spec.schema.json`
  - `entity-spec.schema.json`

### Orchestrator
- **الموقع:** `molecules-complete/orchestrator/`
- **الاستخدام:** System-level
- **الملفات:**
  - `ai-orchestrator.js` - AI generation
  - `erp-orchestrator.js` - ERP/SaaS generation

---

## 3️⃣ ما يناسب كل مستوى

### Atoms (20 components)
**الاستخدام:**
- ✅ Design Tokens (للتصميم)
- ✅ Manifests (لتوثيق المكونات)

**لا يحتاج:**
- ❌ Services (مستوى أساسي جدًا)
- ❌ RBAC (مكونات بسيطة)
- ❌ Navigation (مكونات فردية)

**الخطوة التالية:**
- إنشاء Manifests لجميع Atoms (20 manifest)

### Molecules (48 components)
**الاستخدام:**
- ✅ Design Tokens
- ✅ Manifests (موجود جزئيًا)
- ✅ بعض Services (مثل input يحتاج validation)

**الاستخدام الاختياري:**
- ⚠️ بعض Services للـforms

**الوضع الحالي:**
- ✅ Manifests موجودة (button, input, hero.split.image, feature.grid)
- 🔄 يحتاج manifests إضافية لباقي المكونات

### Organisms (51 components)
**الاستخدام:**
- ✅ Design Tokens
- ✅ Data UI Kit integration (filter-bar, table-toolbar, etc.)
- ✅ RBAC integration (permissions-matrix, roles-permissions-ui)
- ✅ Manifests للـData UI components

**المكونات الخاصة:**
- Data UI: filter-bar, table-toolbar, bulk-selection-actions, empty-table-state
- RBAC: permissions-matrix, roles-permissions-ui
- Activity: activity-card, notification-card

**الخطوة التالية:**
- إنشاء Manifests للـOrganisms خاصة Data UI و RBAC

### Layouts (39 components)
**الاستخدام:**
- ✅ Design Tokens
- ✅ Navigation Models (sidebar, navbar, app-shell)
- ✅ App Shell integration
- ✅ Manifests للـApp Shell layouts

**المكونات الخاصة:**
- App Shell: app-shell, sidebar, navbar, workspace-switcher
- Navigation: sidebar-layout, container, grid
- Multi-tenant: workspace-switcher

**الخطوة التالية:**
- إنشاء Manifests للـLayouts خاصة App Shell

### Pages (48 components)
**الاستخدام:**
- ✅ Design Tokens
- ✅ Navigation Models
- ✅ Core Services (auth, sync, i18n)
- ✅ RBAC (للصفحات المحمية)
- ✅ Templates integration
- ✅ Manifests للـPages

**الصفحات الخاصة:**
- Auth: login-form, register-form, forgot-password
- ERP: invoice-list
- E-commerce: checkout
- Marketing: pricing-section, testimonials-section

**الخطوة التالية:**
- إنشاء Manifests للـPages
- ربط Templates بالـPages

---

## 4️⃣ خطة التنفيذ

### Phase 1: Atoms Manifests
- [ ] إنشاء manifests لجميع Atoms (20 manifest)
- [ ] ربط Design Tokens

### Phase 2: Organisms Manifests (Data UI + RBAC)
- [ ] Manifests للـData UI components
- [ ] Manifests للـRBAC components
- [ ] ربط بـData UI Kit و RBAC system

### Phase 3: Layouts Manifests (App Shell)
- [ ] Manifests للـApp Shell layouts
- [ ] ربط بـNavigation Models

### Phase 4: Pages Manifests
- [ ] Manifests للـPages
- [ ] ربط بـTemplates و Services

### Phase 5: Renderers لكل مستوى
- [ ] Atom Renderer
- [ ] Molecule Renderer (موجود)
- [ ] Organism Renderer
- [ ] Layout Renderer
- [ ] Page Renderer

---

## 5️⃣ البنية المقترحة

```
project-root/
├── registry/
│   ├── registry-complete.json    # ✅ موجود
│   └── README.md                 # ✅ موجود
│
├── core/                          # ✅ موجود (إشارات)
│   └── README.md                 # ✅ موجود
│
├── atoms-complete/
│   ├── manifests/                # 🔄 يحتاج إنشاء
│   │   ├── button.manifest.json
│   │   ├── icon.manifest.json
│   │   └── ... (20 manifests)
│   └── README.md
│
├── molecules-complete/
│   ├── manifests/                # ✅ موجود جزئيًا
│   ├── sections/                 # ✅ موجود
│   ├── app-shell/                # ✅ موجود
│   ├── data-ui/                  # ✅ موجود
│   ├── core/                     # ✅ موجود
│   ├── navigation/               # ✅ موجود
│   ├── design-tokens/            # ✅ موجود
│   ├── specs/                    # ✅ موجود
│   ├── orchestrator/             # ✅ موجود
│   └── renderers/                # ✅ موجود
│
├── organisms-complete/
│   ├── manifests/                # 🔄 يحتاج إنشاء (خاصة Data UI + RBAC)
│   │   ├── filter-bar.manifest.json
│   │   ├── table-toolbar.manifest.json
│   │   ├── permissions-matrix.manifest.json
│   │   └── ...
│   └── README.md
│
├── layouts-complete/
│   ├── manifests/                # 🔄 يحتاج إنشاء (خاصة App Shell)
│   │   ├── app-shell.manifest.json
│   │   ├── sidebar.manifest.json
│   │   ├── navbar.manifest.json
│   │   └── ...
│   └── README.md
│
└── pages-complete/
    ├── manifests/                # 🔄 يحتاج إنشاء
    │   ├── login-form.manifest.json
    │   ├── invoice-list.manifest.json
    │   └── ...
    └── README.md
```

---

## 6️⃣ التكامل بين المستويات

### Atoms → Molecules
- Molecules تستخدم Atoms كـdependencies
- Manifests تحدد dependencies

### Molecules → Organisms
- Organisms تستخدم Molecules
- Data UI Organisms تستخدم Molecules (input, button, etc.)

### Organisms → Layouts
- Layouts تستخدم Organisms (مثل sidebar يستخدم menu)
- App Shell Layouts تستخدم App Shell Organisms

### Layouts → Pages
- Pages تستخدم Layouts (app-shell, container, etc.)
- Pages تستخدم Navigation Models

---

## 7️⃣ الاستخدام

### استخدام Registry
```javascript
import registry from './registry/registry-complete.json';

// Get all Data UI components
const dataUI = registry.integrations.dataUI.components;

// Get App Shell components
const appShell = registry.integrations.appShell.components;

// Get SaaS preset
const saas = registry.siteTypePresets.saas;
```

### استخدام Core Services
```javascript
// All levels can use design tokens
import { platformTokens } from '../molecules-complete/design-tokens/platform-tokens.js';

// Organisms and Pages can use services
import { AuthService } from '../molecules-complete/core/services/auth.service.js';
import { PermissionChecker } from '../molecules-complete/core/rbac/permission-checker.js';
```

---

## ✅ الحالة الحالية

- ✅ Registry شامل موجود
- ✅ Core System موجود (في molecules-complete)
- ✅ Molecules كامل (manifests, sections, app-shell, data-ui, core, etc.)
- 🔄 Atoms يحتاج manifests
- 🔄 Organisms يحتاج manifests (Data UI + RBAC)
- 🔄 Layouts يحتاج manifests (App Shell)
- 🔄 Pages يحتاج manifests

---

**الخطوة التالية:** بدء إنشاء Manifests للمستويات الأخرى (Atoms, Organisms, Layouts, Pages)

