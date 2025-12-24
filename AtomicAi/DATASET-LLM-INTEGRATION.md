# Dataset & LLM Integration Guide

## نظرة عامة

هذا المشروع يولّد **Dataset** للتواصل مع LLM (ChatGPT API) ويمكنه **تجميع Components** لإنتاج تصاميم غنية مثل ThemeForest.

---

## 1️⃣ Dataset Generation (نعم، يتم توليد Dataset)

### A) Operational Dataset (يولّد تلقائيًا)

#### Component Manifests
كل manifest ملف JSON يحتوي:
- **Description** - وصف تفصيلي للمكون
- **When to use / When not to use** - إرشادات للـAI
- **Props & Slots** - كيف يستخدم المكون
- **Platform support** - Web/Mobile/Desktop
- **Dependencies** - علاقات مع مكونات أخرى

**الاستخدام:**
```javascript
// Export manifests for embedding
const catalogLoader = new CatalogLoader();
const catalog = await catalogLoader.loadAll();
const embeddings = catalogLoader.exportForEmbedding();

// Use with OpenAI Embeddings API
const embeddings = await openai.embeddings.create({
  model: 'text-embedding-3-large',
  input: embeddings.map(e => JSON.stringify(e))
});
```

#### Catalog Index
فهرس قابل للبحث:
- By level (atom, molecule, organism, etc.)
- By category (data-ui, app-shell, rbac, etc.)
- By tags (saas, erp, marketing, etc.)
- By platform (web, mobile, desktop)

**الاستخدام:**
```javascript
// Search relevant components
const results = catalogLoader.search('invoice table', {
  level: 'organism',
  category: 'data-ui',
  tags: ['erp'],
  platform: 'web',
  limit: 10
});
```

### B) Improvement Dataset (اختياري لكن قوي)

#### Prompt → Spec Pairs
كل مرة تولّد مشروع ناجح:
```json
{
  "brief": "Build invoice management ERP...",
  "spec": { /* app-spec.json */ },
  "timestamp": "2024-01-01T00:00:00Z",
  "validated": true,
  "qualityScore": 95
}
```

**الاستخدام:**
- Few-shot examples في prompts
- Fine-tuning dataset (اختياري)

#### Bad → Fixed Examples
```json
{
  "originalSpec": { /* spec with errors */ },
  "errors": ["Missing route", "Invalid entity reference"],
  "fixedSpec": { /* corrected spec */ },
  "fixes": ["Added route", "Fixed reference"]
}
```

---

## 2️⃣ هل يستطيع AI تجميع Components لإنتاج تصاميم غنية؟ (نعم!)

### الطريقة الصحيحة: Top-Down Composition

```
Brief → Template Selection → Sections → Organisms → Molecules → Atoms
                                  ↓
                          (AI chooses here)
                                  ↓
                          Composer validates
                                  ↓
                          Renderer generates code
```

**مثال:**
1. AI يختار: `template-saas-landing`
2. AI يختار Sections: `hero.split.image`, `features.icon.grid`, `pricing.cards.3`
3. Composer يربط: كل Section يستخدم Organisms/Molecules المناسبة
4. Renderer يبني: من Atoms إلى كود نهائي

### التنوع الكبير (ThemeForest-level)

**المعادلة:**
```
60 Sections × 4 Variants × 8 Themes × 3 Densities × 2 Radius Systems
= 11,520 شكل مختلف
```

**بدون كتابة 11 ألف ملف!**

### كيف يحصل التنوع؟

#### 1. Template Diversity
- SaaS, ERP, Agency, Portfolio, E-commerce, Blog
- كل نوع له Sections مختلفة

#### 2. Section Variants
- `hero.split` / `hero.centered` / `hero.video`
- `features.icon.grid` / `features.bento` / `features.split.list`

#### 3. Theme Packs
- `theme-saas-modern` / `theme-agency-bold` / `theme-minimal-clean`
- كل Theme يغير: Colors, Typography, Spacing, Shadows, Radius

#### 4. Props Space
- `density`: compact / comfortable / airy
- `radius`: sharp / rounded / pill
- `layout`: left / right / centered
- `variant`: minimal / bold / glass

### مثال حقيقي

**Brief:** "Build SaaS landing page with hero, features, pricing"

**AI Process:**
1. **Template:** `template-saas-landing`
2. **Sections:**
   - `hero.split.image` (variant: glass, imagePosition: right)
   - `features.icon.grid` (columns: 3, align: center)
   - `pricing.cards.3` (variant: highlighted, showAnnualToggle: true)
3. **Theme:** `theme-saas-modern`
4. **Composer** يربط:
   - `hero.split.image` → يستخدم `organism.card`, `molecule.button`, `atom.icon`
   - `features.icon.grid` → يستخدم `organism.card`, `atom.icon`, `atom.typography`
5. **Renderer** يبني الكود النهائي

**النتيجة:** صفحة كاملة بجودة ThemeForest!

---

## 3️⃣ RAG + LLM Pipeline

### الخطوات الكاملة

```
1. User Brief
   ↓
2. RAG: Retrieve relevant manifests (20-30 components)
   ↓
3. Build Context: Manifests + Schema + Examples
   ↓
4. LLM Prompt: "Generate app-spec.json using these components"
   ↓
5. LLM Output: App Spec JSON (not code!)
   ↓
6. Validator: Check spec quality
   ↓
7. If errors → LLM Fix (iterative)
   ↓
8. Composer: Build component tree
   ↓
9. Renderer: Generate code (Web/Mobile/Desktop)
```

### Example LLM Prompt

```
Generate an app specification from this brief:

BRIEF:
Build an ERP system for invoice management with customers, invoices, payments.
Support Arabic (RTL) and English. Multi-tenant with role-based permissions.

AVAILABLE COMPONENTS:
[
  {
    "id": "organism.dataTablePro",
    "title": "Data Table Pro",
    "description": "Production-grade data table with pagination, sorting, filtering",
    "tags": ["erp", "data-ui", "table"],
    "whenToUse": ["Data lists", "Entity management", "Admin tables"]
  },
  ...
]

Generate a valid app-spec.json following the schema.
```

**LLM Output:** Valid `app-spec.json` (not HTML!)

---

## 4️⃣ ERP Composition Rules

### قواعد خاصة للـERP

#### كل List View يجب أن يحتوي:
- ✅ Toolbar (search + filters + columns)
- ✅ Data table / Card list (حسب Platform)
- ✅ Pagination
- ✅ Empty state
- ✅ Loading skeleton
- ✅ Error state
- ✅ No-permission banner

#### كل Form View يجب أن يحتوي:
- ✅ Breadcrumbs
- ✅ Form builder (schema-driven)
- ✅ Validation
- ✅ Submit/Cancel buttons
- ✅ Permission check

#### Platform Adaptations:

**Mobile:**
- List → Card list (بدل Table)
- Filters → Bottom sheet
- Forms → Drawer

**Desktop:**
- List → Data table (full features)
- Filters → Inline filter bar
- Forms → Modal
- Shortcuts → Cmd+K, Cmd+I, etc.
- Context menu → Right-click actions

**Web:**
- List → Data table
- Filters → Inline
- Forms → Full page

---

## 5️⃣ مثال كامل: Invoice ERP

انظر `examples/erp-invoice-example.json` لمثال كامل:

- ✅ App spec كامل
- ✅ Entity spec (Invoice)
- ✅ Routes لكل platform
- ✅ Screens مع components
- ✅ Permissions
- ✅ Multi-tenant
- ✅ RTL support

---

## 6️⃣ Dataset Structure

```
catalog/
├── components/
│   ├── atoms/
│   │   ├── button.manifest.json
│   │   └── ...
│   ├── molecules/
│   │   └── ...
│   └── organisms/
│       └── ...
├── templates/
│   └── ...
└── examples/
    ├── erp-invoice-example.json
    └── ...

specs/
├── app-spec.json (generated by LLM)
├── entities/
│   └── invoice.entity.json
└── modules/
    └── invoicing.module.json

logs/
├── generations/
│   └── 2024-01-01-app-123.json (brief → spec pairs)
└── fixes/
    └── 2024-01-01-fix-123.json (bad → fixed examples)
```

---

## ✅ الخلاصة

### 1. Dataset Generation: ✅ نعم
- Manifests جاهزة للـembedding
- Catalog index للبحث
- Generation logs (اختياري)
- Fix logs (اختياري)

### 2. AI Composition: ✅ نعم
- Top-down approach (Template → Sections → Components)
- التنوع من: Sections × Variants × Themes × Props
- 11,520+ شكل مختلف بدون 11 ألف ملف
- Quality من: Composer + Validators

### 3. RAG Pipeline: ✅ موجود
- Catalog Loader
- LLM Integration
- Iterative refinement

### 4. ERP Rules: ✅ موجود
- ERP Composer
- Platform adaptations
- Permission-aware

---

**النظام جاهز لتوليد تصاميم غنية مثل ThemeForest باستخدام LLM! 🚀**

