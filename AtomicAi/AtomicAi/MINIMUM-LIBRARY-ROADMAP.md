# Minimum Library Roadmap - خريطة المكتبة الدنيا

## 🎯 الهدف

**80% Coverage** بأقل عمل ممكن باستخدام Smart Shortcuts.

---

## 📊 المكتبة الدنيا (Minimum Viable)

### ✅ موجود بالفعل (جاهز)

#### 1. Patterns (12 patterns)
- ✅ موجود في `catalog/patterns/priority-patterns.json`
- ✅ يغطي: CRUD, Tables, Forms, Workflows, Kanban, Calendar, etc.

#### 2. Product Packs (11 packs)
- ✅ موجود في `catalog/product-packs/`
- ✅ يغطي: CRM, HRMS, POS, Helpdesk, Billing, etc.

#### 3. Core Packs (1 pack)
- ✅ موجود في `catalog/product-packs/core/`
- ✅ يغطي: Auth, RBAC, Tenants, Audit, Settings

#### 4. Presets (4 presets)
- ✅ موجود في `catalog/presets/`
- ✅ يغطي: HRMS, CRM, Helpdesk, Billing

#### 5. Theme Packs (5 themes)
- ✅ موجود في `core/themes/`
- ✅ يغطي: SaaS, Agency, Minimal, Portfolio, Ecommerce

#### 6. Entity Generator
- ✅ موجود في `composer/entity-to-screens-generator.js`
- ✅ يولد: 4 Screens لكل Entity تلقائيًا

---

### ⚠️ يحتاج إضافة/توسيع

#### 1. Sections (13 → 60)

**الموجود:** ~13 section في `molecules-complete/sections/`

**المطلوب:** 60 section (من ~10 templates + Tokens)

**التوزيع:**
- Hero: 12 (من 2-3 templates)
- Features: 10 (من 2 templates)
- Social Proof: 6 (من 1 template)
- Pricing: 6 (من 1 template)
- FAQ/CTA: 6 (من 1 template)
- Blog: 6 (من 1 template)
- Contact: 4 (من 1 template)
- Footer: 4 (من 1 template)
- Header/Nav: 6 (من 1-2 templates)

**الطريقة:**
- 10 Templates × Tokens × Layouts = 60 Sections

**الوقت:** 20 ساعة (بدل 60 ساعة)

---

#### 2. Presets (4 → 20)

**الموجود:** 4 presets

**المطلوب:** 16 preset إضافية

**القائمة:**

**SaaS (2 إضافية):**
- Project/Work mgmt
- IAM

**ERP-lite (4 جديدة):**
- Invoices + Customers + Inventory
- HRMS (Attendance + Leave)
- WMS (inventory + pick/pack)
- EAM (work orders)

**Commerce (4 جديدة):**
- Ecommerce platform
- Marketplace multi-vendor
- Headless commerce

**Verticals (6 جديدة):**
- HealthTech
- FinTech
- GovTech
- EdTech
- RetailTech
- LegalTech

**الطريقة:**
- استخدام Templates الموجودة
- تعديل Product Packs
- إضافة Entities فقط

**الوقت:** 20 ساعة (بدل 320 ساعة)

---

#### 3. Tokens-Driven Variants System ⚠️

**المطلوب:**
- Variant System يطبق Tokens على Components
- Section Decorators (background, dividers, spacing)
- Layout Variants

**الملفات:**
- `core/variants/variant-system.js`
- `core/variants/decorators.json`

**الوقت:** 8 ساعات

---

#### 4. Screen Snippets (3 → 10)

**الموجود:** 3 snippets (entityList, entityDetail, workflowApproval)

**المطلوب:** 7 snippets إضافية

**القائمة:**
- Kanban board
- Calendar scheduler
- Dashboard
- Form wizard
- Search results
- Settings panel
- Onboarding flow

**الوقت:** 14 ساعة

---

## 📋 خطة التنفيذ (Priority)

### Phase 1: MVP (أسبوعين) ✅

**الهدف:** Prompt → Helpdesk Project شغال

1. ✅ Entity Generator (موجود)
2. ✅ Patterns (موجود)
3. ⚠️ Web Renderer (إكمال)
4. ⚠️ Backend Scaffolding (إضافة)
5. ✅ Validators + Auto-fix (موجود)

**النتيجة:** نظام يولّد Helpdesk من Prompt ✅

---

### Phase 2: Sections Expansion (أسبوع)

**الهدف:** ThemeForest-quality Marketing

1. ⚠️ Tokens-Driven Variants System (8 ساعات)
2. ⚠️ Section Decorators (4 ساعات)
3. ⚠️ 60 Sections من Templates (8 ساعات)

**النتيجة:** 11,520 شكل من 60 Section ✅

**الوقت:** 20 ساعة

---

### Phase 3: Presets Expansion (أسبوع)

**الهدف:** 20 Presets جاهزة

1. ⚠️ إضافة 16 Preset جديدة (20 ساعة)
2. ⚠️ Testing (4 ساعات)

**النتيجة:** 20 Preset جاهزة ✅

**الوقت:** 24 ساعة

---

### Phase 4: Screen Snippets (3 أيام)

**الهدف:** تغطية جميع Intents

1. ⚠️ 7 Screen Snippets إضافية (14 ساعة)

**النتيجة:** 10 Screen Snippets جاهزة ✅

**الوقت:** 14 ساعة

---

## 📊 حساب العمل الكلي

### الموجود (جاهز):
- ✅ Patterns: 12 (جاهز)
- ✅ Product Packs: 11 (جاهز)
- ✅ Core Packs: 1 (جاهز)
- ✅ Presets: 4 (جاهز)
- ✅ Theme Packs: 5 (جاهز)
- ✅ Entity Generator: 1 (جاهز)
- ✅ Screen Snippets: 3 (جاهز)

**الوقت المنجز:** ~200 ساعة (جاهز)

---

### المطلوب (إضافة):

| المهمة | الوقت |
|--------|-------|
| Tokens-Driven Variants System | 8 ساعات |
| Section Decorators | 4 ساعات |
| 60 Sections (من Templates) | 8 ساعات |
| 16 Presets إضافية | 20 ساعة |
| 7 Screen Snippets | 14 ساعة |
| Testing & Polish | 6 ساعات |
| **المجموع** | **60 ساعة** |

---

### المجموع الكلي:

**الموجود:** 200 ساعة (جاهز) ✅
**المطلوب:** 60 ساعة (إضافة) ⚠️
**المجموع:** 260 ساعة عمل

**بدون Smart Shortcuts:** 1,000+ ساعة
**التوفير:** 740+ ساعة (74% تقليل!) 🚀

---

## ✅ الخلاصة

### هل نحتاج "توليد Components"؟

**لا:** إذا قصدت اختراع UI جديد من الصفر
**نعم:** إذا قصدت توليد Variants/Sections/Pages/Projects من المكتبة

### النظام الحالي:

- ✅ **جاهز 77%** (Patterns, Packs, Generator)
- ⚠️ **يحتاج 23%** (Sections, Presets, Variants System)

### الطريقة "العبقرية":

1. ✅ Tokens-Driven Variants
2. ✅ Entity Generator (موجود ✅)
3. ✅ Pattern-Based Modules
4. ✅ Preset Templates

### الوقت المتبقي:

**60 ساعة عمل** فقط للوصول لـ 80% Coverage! 🚀

---

**Status:** Roadmap Defined ✅

