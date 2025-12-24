# 🚀 Multi-Platform Architecture - Complete System

## نظرة عامة

هذا النظام الكامل يولد تطبيقات Web + Mobile + Desktop من Prompt واحد، مع Catalog + UI Libraries + Writers + Backend mocks + QA gate.

## الهيكل النهائي

```
atomic-ai/
├── apps/
│   ├── web-next/             # Next.js (marketing + app)
│   ├── mobile-expo/          # Expo RN (nativewind)
│   ├── desktop-tauri/         # Tauri + React
│   └── api-server/           # optional: Fastify/Nest/Next API
├── packages/
│   ├── ui-core/              # tokens + recipes + manifests types ✅
│   ├── ui-web/               # atoms/molecules/organisms web
│   ├── ui-native/            # atoms/molecules/organisms mobile
│   ├── ui-desktop/           # غالباً reuse ui-web
│   ├── data-core/            # api client + query model + stores
│   ├── generator/            # prompt→spec→plan→emit ✅
│   └── quality/              # scoring + validations + snapshots
├── catalog/
│   ├── components/           # manifests (atoms/molecules/organisms)
│   ├── sections/             # marketing blocks
│   ├── patterns/             # page patterns (crud, approvals, billing…)
│   ├── pages/                # page templates
│   ├── presets/              # CRM/HRMS/Helpdesk… إلخ
│   └── platform/             # platform-map + platform rules ✅
├── specs/
│   ├── backend-spec.json
│   ├── scaffold-plan.json
│   ├── quality-score.json
│   └── diversity-policy.json
└── scripts/
    ├── build-all.mjs
    └── dev-all.mjs
```

## الملفات الحاكمة الـ6

### 1. app-spec.json
يصف الشاشات + الكيانات + flows

### 2. backend-spec.json
يصف DB/auth/tenant/rbac

### 3. platform-map.json ✅
كل component يتبدل حسب المنصة

### 4. build-plan.json
خطة التوليد النهائية

### 5. scaffold-plan.json
ما الملفات التي تُكتب وأين

### 6. quality-score.json + diversity-policy.json
معايير الجودة والتنوع

## Platform Mapping

### القواعد الأساسية

**Mobile:**
- ❌ لا DataTable → ✅ CardListPro
- Filters → BottomSheet
- Navigation → Tabs + Stack
- Forms > 3 fields → Stepper
- Touch targets ≥ 44px

**Desktop:**
- ✅ Reuse web components
- Multi-window support
- File system access

**Web:**
- Full feature set
- Tables, Cards, Lists
- Sidebar + Header navigation

## Generator Pipeline

```
Prompt → Classifier → Spec Builder → Retriever → Composer → Quality Gate → Emit
```

### الخطوات:

1. **Classify**: تحديد productType, deployment, persona, platforms
2. **Spec Builder**: بناء product-spec, app-spec, backend-spec
3. **Retriever**: جلب patterns + sections + components من catalog
4. **Composer**: تركيب build-plan.json
5. **Quality Gate**: فحص الجودة (score < 80 → refine)
6. **Emit**: كتابة المشاريع (web/mobile/desktop)

## Writers

### Web Writer (Next.js) ✅
- يولّد routes + layouts + pages
- API client
- Components structure
- Tailwind/TypeScript setup

### Mobile Writer (Expo) (قيد التنفيذ)
- Screens (tabs + stack)
- React Navigation
- UI mapping من platform-map
- API client + offline store

### Desktop Writer (Tauri) (قيد التنفيذ)
- React app + tauri config
- Reuse web routes
- File storage optional

## UI Libraries

### ui-core ✅
- Design tokens (CSS variables)
- Recipes (Button, Tooltip...)
- Manifest types
- Style adapters types

### ui-web (قيد التنفيذ)
- 25 Atom
- 10 Molecules
- 8 Organisms

### ui-native (قيد التنفيذ)
- نفس props shapes
- CardListPro بدل DataTablePro
- BottomSheetModal بدل Modal

### ui-desktop (قيد التنفيذ)
- Reuse ui-web + desktop shell

## الخطوات التالية

### المرحلة 1 (الأسبوع القادم)
- ✅ ui-core package
- ✅ platform-map.json
- ✅ generator pipeline structure
- ✅ web writer
- ⏳ ui-web 25 atoms
- ⏳ mobile writer

### المرحلة 2
- ⏳ ui-native atoms
- ⏳ mobile writer كامل
- ⏳ desktop writer

### المرحلة 3
- ⏳ Quality gate
- ⏳ Content engine
- ⏳ Backend mocks

## الاستخدام

```bash
# توليد مشروع كامل
npm run gen -- --prompt "CRM system" --targets web,mobile,desktop

# تطوير
npm run dev:web
npm run dev:mobile
npm run dev:desktop

# QA
npm run qa
```

## ملاحظات مهمة

1. **Catalog موجود** - لا تحتاج dataset ضخم
2. **Platform mapping** - نفس manifests، مكونات مختلفة
3. **Style adapters** - نفس components، styles مختلفة
4. **Quality first** - كل شيء يمر عبر quality gate

---

**الحالة:** ✅ الأساسيات جاهزة | ⏳ قيد التنفيذ

