# 🚀 Quick Start - Hybrid System

## خطوات سريعة للبدء

### 1. Build Packages
```bash
# Build all packages
pnpm build:tokens
pnpm build:ui
pnpm build:adapters
pnpm build:blocks
pnpm build:builder
```

### 2. Generate Project
```bash
pnpm build:ai "Build a CRM SaaS: marketing site + ERP dashboard. Enterprise theme, pages: Home/Pricing/FAQ + Dashboard/Customers/Orders"
```

### 3. Run Generated Project
```bash
# Marketing site
cd generated/marketing-web
pnpm install
pnpm dev

# ERP site (في terminal آخر)
cd generated/erp-web
pnpm install
pnpm dev
```

---

## 📝 مثال Prompt

```
"Build a CRM SaaS: marketing site + ERP dashboard. 
Enterprise theme, RTL support, pages: 
Home/Pricing/FAQ + Dashboard/Customers/Orders/Settings"
```

---

## ✅ الناتج المتوقع

```
generated/
├── build-plan.json
├── marketing-web/     # Next.js + shadcn/ui
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── pricing/page.tsx
│   │   │   └── faq/page.tsx
│   │   └── styles/
│   └── package.json
└── erp-web/          # Next.js + Ant Design
    ├── src/
    │   ├── app/
    │   │   ├── layout.tsx
    │   │   ├── dashboard/page.tsx
    │   │   ├── customers/page.tsx
    │   │   └── orders/page.tsx
    │   └── styles/
    └── package.json
```

---

## 🎯 الميزات

- ✅ Prompt → Plan → Files تلقائي
- ✅ Atoms API موحدة (6 components)
- ✅ Marketing Blocks (9 blocks)
- ✅ ERP Blocks (7 blocks)
- ✅ Adapters (antd + shadcn)

---

**جاهز للاستخدام!** 🎉

