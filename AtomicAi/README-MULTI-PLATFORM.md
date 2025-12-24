# 🚀 Atomic AI - Multi-Platform Generator

## نظرة عامة

نظام كامل لتوليد تطبيقات Web + Mobile + Desktop من Prompt واحد.

## الميزات

✅ **Multi-Platform**: Web (Next.js) + Mobile (Expo) + Desktop (Tauri)  
✅ **UI System**: Core tokens + Recipes + Style adapters  
✅ **Platform Mapping**: نفس Catalog، مكونات مختلفة لكل منصة  
✅ **Quality Gate**: فحص الجودة قبل التوليد  
✅ **Generator Pipeline**: Prompt → Spec → Plan → Emit  

## البنية

```
atomic-ai/
├── packages/
│   ├── ui-core/          # ✅ Tokens + Recipes + Types
│   ├── generator/         # ✅ Pipeline + Writers
│   └── ...
├── catalog/
│   └── platform/         # ✅ platform-map.json + rules
└── scripts/
    └── gen.mjs           # ✅ CLI Generator
```

## الاستخدام السريع

### توليد مشروع كامل

```bash
npm run gen -- --prompt "CRM system with users and orders" --targets web,mobile,desktop
```

### تطوير المشاريع

```bash
# Web
npm run dev:web

# Mobile
npm run dev:mobile

# Desktop
npm run dev:desktop
```

## Platform Mapping

النظام يستخدم `platform-map.json` لتحويل المكونات حسب المنصة:

- **Web**: DataTablePro, Modal, Sidebar
- **Mobile**: CardListPro, BottomSheetModal, BottomNav
- **Desktop**: Reuse Web + Desktop shell

## Quality Gate

كل مشروع يمر عبر Quality Gate:
- ✅ Build plan completeness
- ✅ Platform compatibility
- ✅ Accessibility checks
- ✅ Performance checks
- ✅ Security checks

## الخطوات التالية

1. ✅ الأساسيات جاهزة
2. ⏳ بناء UI Libraries (ui-web, ui-native)
3. ⏳ إكمال Writers
4. ⏳ Content Engine
5. ⏳ Backend Mocks

---

**الحالة:** ✅ الأساسيات | ⏳ قيد التنفيذ

