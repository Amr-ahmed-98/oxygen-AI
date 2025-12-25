# MVP Checklist - 14 مهمة للوصول لـ "Lovable-like"

## 🎯 الهدف النهائي

**Prompt واحد → Product Spec → App Spec → Validate/Auto-fix → مشروع Next شغال + DB/Auth + CRUD APIs**

مع تسجيل logs تلقائيًا لتكوين dataset التشغيل.

---

## ✅ Repo Layout (قبل أي شيء)

**Done يعني:** المجلدات دي موجودة.

```
schemas/
catalog/
  components/
  patterns/
  product-packs/
  presets/
  rules/
prompts/
src/
  orchestrator/
  validators/
  autofix/
  renderers/
    web/
  scaffolders/
    backend/
output/
logs/
  generations/
```

**Status:** ✅ موجود (يحتاج تأكيد)

---

## 1️⃣ Schemas (إغلاق الهلوسة)

**Files:**
- `schemas/product-spec.schema.json`
- `schemas/app-spec.schema.json`
- `schemas/entity-spec.schema.json`
- `schemas/validator.js` (AJV أو zod)

**Done يعني:**
- ✅ `validateProductSpec(json)` يرجّع true/false
- ✅ أي خروج من LLM خارج schema يتم رفضه فورًا
- ✅ Error messages واضحة

**Status:** ⚠️ موجود جزئيًا في `core/specs/`، يحتاج نقل/تحديث

---

## 2️⃣ Catalog v1 (30 manifests على الأقل)

**Files:**
- `catalog/components/*.manifest.json` (20+ manifests)
- `catalog/patterns/*.manifest.json` (10+ manifests)
- `catalog/product-packs/helpdesk/pack.manifest.json`
- `catalog/presets/helpdesk-b2b-sla-workflow.preset.json`
- `catalog/rules/rules-matrix.json`

**Done يعني:**
- ✅ عندك 30 manifest IDs (القائمة في `FIRST-30-MANIFESTS.md`)
- ✅ كل manifest فيه tags + platformSupport + props/slots/constraints
- ✅ Retriever يقدر يسترجع manifests من IDs

**Status:** ⚠️ موجود جزئيًا، يحتاج إكمال إلى 30

---

## 3️⃣ Retriever v1 (Keyword+Tags)

**Files:**
- `src/orchestrator/catalog-retriever.js`

**Done يعني:**
- ✅ `retrieve(prompt, topK=40)` يرجع manifests مرتبة
- ✅ Prompt "Helpdesk" يرجع: ticketQueue + SLA + KB + automations
- ✅ يعمل keyword + tags matching

**Status:** ✅ موجود في `core/orchestrator/catalog-retriever.js`

---

## 4️⃣ Prompts الثلاثة (Analyze / Generate / Patch)

**Files:**
- `prompts/analyze_to_product_spec.txt`
- `prompts/product_to_app_spec.txt`
- `prompts/fix_spec_patch.txt`

**Done يعني:**
- ✅ LLM#1 يخرج product-spec.json صحيح (structured output)
- ✅ LLM#2 يخرج app-spec.json صحيح
- ✅ LLM#3 يخرج JSON Patch فقط (ليس spec كامل)

**Status:** ⚠️ موجود في `rag/prompts/llm-prompts.js`، يحتاج extraction إلى ملفات منفصلة

---

## 5️⃣ Rules Matrix Apply

**Files:**
- `catalog/rules/rules-matrix.json`
- `composer/product-composer.js` (applyRulesMatrix)

**Done يعني:**
- ✅ onPrem → noExternalCDN + licensePack تلقائيًا
- ✅ usageBased → usageMetering + quotaWarnings تلقائيًا
- ✅ mobile included → offlineQueue + cardList تلقائيًا
- ✅ Rules تطبق قبل Composition

**Status:** ✅ موجود في `catalog/rules/rules-matrix.json` و `composer/product-composer.js`

---

## 6️⃣ Composer v1 (اختيار modules/entities)

**Files:**
- `composer/product-composer.js` (mergeModules, loadProductPack)

**Done يعني:**
- ✅ pack blueprint + preset + rules → modules[] جاهزة
- ✅ modules → entities[] من product pack
- ✅ core modules تضاف تلقائيًا

**Status:** ⚠️ موجود جزئيًا، يحتاج إكمال loadEntity

---

## 7️⃣ Entity→CRUD Generator (بدون LLM)

**Files:**
- `composer/entity-to-screens-generator.js`

**Done يعني:**
- ✅ لكل entity: يولد list/detail/create/edit screens
- ✅ يولد routes الأربعة تلقائيًا
- ✅ يضيف states + permissions defaults
- ✅ يستخدم platform-defaults.json

**Status:** ✅ موجود في `composer/entity-to-screens-generator.js`

---

## 8️⃣ Validators (20 قاعدة) + Error format

**Files:**
- `validators/spec-validators.js`

**Done يعني:**
- ✅ `validate(appSpec)` يرجع errors[] موحدة
- ✅ errors تحتوي: code, screen, severity, message, hint
- ✅ 7+ validator categories (Layout, Security, Forms, Performance, RTL, Mobile, Platform)

**Status:** ✅ موجود في `validators/spec-validators.js`

---

## 9️⃣ Auto-fix (12 قاعدة جاهزة)

**Files:**
- `validators/auto-fix-rules.json`
- `validators/auto-fix.js`

**Done يعني:**
- ✅ `applyAutoFix(appSpec, errors)` يطبق rule-based patches
- ✅ 50%+ من الأخطاء تتحل بدون LLM
- ✅ 12 rules جاهزة للأخطاء الشائعة

**Status:** ✅ موجود في `validators/auto-fix-rules.json` و `validators/auto-fix.js`

---

## 🔟 Patch Loop (LLM عند الضرورة)

**Files:**
- `validators/auto-fix.js` (fixSpec method)

**Done يعني:**
- ✅ max 2-3 iterations
- ✅ بعد الإصلاح: spec passes validation
- ✅ LLM يستخدم فقط للأخطاء الصعبة (بعد rules)

**Status:** ✅ موجود في `validators/auto-fix.js`

---

## 1️⃣1️⃣ Backend Scaffolder (Prisma+Postgres)

**Files:**
- `src/scaffolders/backend/prisma-scaffolder.js`

**Done يعني:**
- ✅ توليد schema.prisma من entity-specs
- ✅ توليد migrations
- ✅ توليد CRUD API endpoints (Next.js API routes)
- ✅ RBAC middleware
- ✅ audit logs table + hooks
- ✅ `pnpm prisma migrate dev` ينشئ DB + APIs تشتغل

**Status:** ❌ غير موجود (يحتاج إنشاء)

---

## 1️⃣2️⃣ Web Renderer (Next runnable)

**Files:**
- `core/renderers/renderer-web.js`
- `core/renderers/renderer-nextjs.js`

**Done يعني:**
- ✅ يولد shell (sidebar/header)
- ✅ يولد routing (Next.js App Router)
- ✅ يولد screens:
  - entityList → DataTablePro
  - entityDetail → Tabs + right panel
  - create/edit → FormBuilder
- ✅ يولد states (empty/loading/error/noPermission)
- ✅ RTL + tokens
- ✅ `pnpm dev` يفتح تطبيق فيه شاشات helpdesk تعمل UI

**Status:** ⚠️ موجود جزئيًا، يحتاج إكمال renderComponent

---

## 1️⃣3️⃣ Seed + Auth demo

**Files:**
- `prisma/seed.js`
- `app/auth/login/page.tsx`

**Done يعني:**
- ✅ login يعمل (email/password)
- ✅ يوجد users/roles (admin, agent, customer)
- ✅ يوجد demo data (tickets/articles/slas)
- ✅ يمكن الدخول كـAdmin وتشوف tickets جاهزة

**Status:** ❌ غير موجود (يحتاج إنشاء)

---

## 1️⃣4️⃣ Export + README + Logs

**Files:**
- `src/orchestrator/export-project.js`
- `output/<app>/README.md`
- `output/<app>/.env.example`
- `logs/generations/<timestamp>/`

**Done يعني:**
- ✅ `output/<app>/` جاهز تشغيل (Next + Prisma)
- ✅ README.md + .env.example موجودين
- ✅ `logs/generations/<ts>/` يحفظ:
  - prompt
  - product-spec
  - app-spec
  - errors + patches

**Status:** ⚠️ موجود جزئيًا في `generator/generate.js`، يحتاج إكمال

---

## 📊 Progress Summary

| # | المهمة | Status | Priority |
|---|--------|--------|----------|
| 0 | Repo Layout | ✅ | - |
| 1 | Schemas | ⚠️ | Critical |
| 2 | Catalog v1 (30 manifests) | ⚠️ | Critical |
| 3 | Retriever v1 | ✅ | - |
| 4 | Prompts الثلاثة | ⚠️ | Critical |
| 5 | Rules Matrix Apply | ✅ | - |
| 6 | Composer v1 | ⚠️ | Critical |
| 7 | Entity→CRUD Generator | ✅ | - |
| 8 | Validators | ✅ | - |
| 9 | Auto-fix | ✅ | - |
| 10 | Patch Loop | ✅ | - |
| 11 | Backend Scaffolder | ❌ | Critical |
| 12 | Web Renderer | ⚠️ | Critical |
| 13 | Seed + Auth | ❌ | High |
| 14 | Export + Logs | ⚠️ | Medium |

**الجاهزية:** ~60% ✅
**المطلوب:** 40% ⚠️❌

---

## 🎯 Definition of Done (MVP)

عندما تكتمل جميع المهام الـ14:

✅ Prompt واحد ("عايز helpdesk system")  
✅ يطلع product-spec.json صحيح  
✅ يطلع app-spec.json صحيح  
✅ يمر Validation (0 errors)  
✅ يطلع مشروع Next في `output/helpdesk-001/`  
✅ `pnpm install && pnpm prisma migrate dev` يعمل  
✅ `pnpm dev` يفتح تطبيق Helpdesk شغال  
✅ Login + Demo data موجودين  
✅ CRUD operations تعمل  

**النتيجة:** نظام يولّد Helpdesk project من Prompt واحد ✅

---

**Last Updated:** الآن

