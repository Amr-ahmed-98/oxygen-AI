# شرح البنية الحالية والفرق بين المستويات

## 🔍 المشكلة الحالية

`molecules-complete` يحتوي على مجلدات إضافية غير موجودة في المستويات الأخرى:
- `composer/` - Composition rules
- `orchestrator/` - AI orchestrator
- `renderers/` - Production renderers
- `themes/` - Theme packs
- `core/` - Core services (RBAC, Auth, i18n, Sync)
- `design-tokens/` - Design tokens
- `navigation/` - Navigation models
- `data-ui/` - Data UI components
- `sections/` - Section manifests
- `templates/` - Templates
- `specs/` - Spec schemas
- `registry/` - Registry
- `app-shell/` - App shell

بينما `atoms-complete`, `organisms-complete`, `layouts-complete`, `pages-complete` تحتوي فقط على:
- `css/`
- `js/` (components + libraries)
- `manifests/`
- `index.html`
- `README.md`

## 💡 السبب

تم تطوير `molecules-complete` أولاً بشكل كامل مع جميع الميزات المتقدمة، ثم تم تطبيق النظام على المستويات الأخرى لاحقاً.

**المشكلة:** هذه المجلدات في `molecules-complete` هي في الواقع **مشتركة** بين جميع المستويات وليست خاصة بـ Molecules فقط!

## ✅ الحل الموصى به

### الخيار 1: نقل المجلدات المشتركة إلى `core/` (مستحسن)

```
core/
├── composer/              # Composition rules (مشترك)
├── orchestrator/          # AI orchestrator (مشترك)
├── renderers/             # Production renderers (مشترك)
├── themes/                # Theme packs (مشترك)
├── services/              # Core services (Auth, i18n, Sync)
├── rbac/                  # RBAC system
├── design-tokens/         # Design tokens
├── navigation/            # Navigation models
├── data-ui/               # Data UI components
├── specs/                 # Spec schemas
└── registry/              # Registry

molecules-complete/
├── css/
├── js/
├── manifests/
├── sections/              # Sections خاصة بـ Molecules فقط
├── templates/             # Templates خاصة بـ Molecules
├── app-shell/             # App shell components
└── index.html
```

### الخيار 2: الإبقاء كما هو + إضافة روابط (سريع)

إضافة ملفات `README.md` في كل مستوى تشير إلى الملفات المشتركة في `molecules-complete`:

```markdown
## Core Systems (Shared)

هذه الملفات مشتركة بين جميع المستويات وموجودة في `../molecules-complete/`:

- `../molecules-complete/composer/` - Composition rules
- `../molecules-complete/orchestrator/` - AI orchestrator
- `../molecules-complete/renderers/` - Production renderers
- ... إلخ
```

## 📊 ما يجب أن يكون في كل مستوى

### Atoms (أبسط مستوى)
**يحتاج فقط:**
- ✅ `css/`
- ✅ `js/`
- ✅ `manifests/`
- ✅ `index.html`

**يستخدم من core:**
- ✅ Design Tokens (للتصميم)

**لا يحتاج:**
- ❌ Services (مستوى أساسي جدًا)
- ❌ RBAC
- ❌ Navigation
- ❌ Orchestrator

### Molecules (مستوى متوسط)
**يحتاج:**
- ✅ `css/`
- ✅ `js/`
- ✅ `manifests/`
- ✅ `index.html`

**يستخدم من core:**
- ✅ Design Tokens
- ✅ بعض Services (validation للـforms)

**خاص به:**
- ✅ `sections/` - Section manifests

### Organisms (مستوى معقد)
**يحتاج:**
- ✅ `css/`
- ✅ `js/`
- ✅ `manifests/`
- ✅ `index.html`

**يستخدم من core:**
- ✅ Design Tokens
- ✅ Services (Auth, i18n)
- ✅ RBAC (Permission-aware components)
- ✅ Data UI components

### Layouts (مستوى التخطيط)
**يحتاج:**
- ✅ `css/`
- ✅ `js/`
- ✅ `manifests/`
- ✅ `index.html`

**يستخدم من core:**
- ✅ Design Tokens
- ✅ Navigation Models
- ✅ Services
- ✅ RBAC

**خاص به:**
- ✅ `app-shell/` - App shell components (يمكن أن يكون في core أيضاً)

### Pages (أعلى مستوى)
**يحتاج:**
- ✅ `css/`
- ✅ `js/`
- ✅ `manifests/`
- ✅ `index.html`

**يستخدم من core:**
- ✅ كل شيء (Design Tokens, Services, RBAC, Navigation, Orchestrator, Renderers)

## 🎯 التوصية النهائية

**للآن:** الإبقاء على البنية الحالية مع إضافة توثيق واضح

**للمستقبل:** نقل المجلدات المشتركة إلى `core/` في الجذر لتحسين التنظيم

## 📝 الخطوات العملية

1. ✅ إنشاء هذا الملف (STRUCTURE-EXPLANATION.md)
2. ⏳ إضافة README.md في كل مستوى يوضح المجلدات المشتركة
3. ⏳ (اختياري) نقل المجلدات المشتركة إلى `core/` في الجذر

