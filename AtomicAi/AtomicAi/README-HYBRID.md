# 🎯 Hybrid Component Library System

## نظرة عامة

نظام Hybrid يجمع بين:
- **ERP Pack**: Ant Design (للجداول والفورمات والـCRUD)
- **Marketing Pack**: shadcn/ui + Tailwind (للصفحات التسويقية)

**الهدف**: Prompt واحد → ERP أو Marketing أو Hybrid حسب الحاجة

---

## 🚀 Quick Start

### 1. Install
```bash
pnpm install
```

### 2. Build Packages
```bash
pnpm build:tokens
pnpm build:ui
pnpm build:adapters
pnpm build:blocks
```

### 3. Run Apps
```bash
# Marketing site (shadcn/ui)
pnpm dev:marketing

# ERP site (Ant Design)
pnpm dev:erp
```

---

## 📦 البنية

```
repo/
├── apps/
│   ├── marketing-web/        # Next.js + Tailwind + shadcn/ui
│   └── erp-web/              # Next.js + Ant Design
│
├── packages/
│   ├── tokens/               # Design tokens موحدة
│   ├── ui/                   # Atoms API موحدة
│   ├── adapters/
│   │   ├── antd/             # Adapter: Atom* → Ant
│   │   └── shadcn/           # Adapter: Atom* → shadcn
│   ├── blocks/               # Marketing + ERP blocks
│   └── builder/              # Build plan composer
│
└── catalog/
    └── atoms/                # Dataset (button, textField, select)
```

---

## 💡 الاستخدام

### استخدام Atoms API

```tsx
import { AtomButton, AtomTextField, AtomSelect } from "@atomic-ai/ui";

// نفس API يعمل مع antd و shadcn
<AtomButton variant="solid" tone="primary" size="md">
  Click Me
</AtomButton>

<AtomTextField placeholder="Enter text..." size="md" />

<AtomSelect
  options={[
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
  ]}
/>
```

### استخدام Blocks

```tsx
import { Hero, Pricing } from "@atomic-ai/blocks";

<Hero
  title="Welcome"
  subtitle="Build amazing products"
  ctaText="Get Started"
/>

<Pricing
  plans={[
    { name: "Starter", price: "$9", features: [...], ctaText: "Get Started" },
  ]}
/>
```

---

## 🎨 Mapping Rules

### Button
- `variant: "solid"` → Ant: `type: "primary"` | shadcn: `variant: "default"`
- `variant: "outline"` → Ant: `type: "default"` | shadcn: `variant: "outline"`
- `tone: "danger"` → Ant: `danger: true` | shadcn: `tone: "danger"` (CVA)

### TextField
- `size: "xs"` → Ant: `size: "small"` | shadcn: `h-7 px-2 text-xs`
- `size: "md"` → Ant: `size: "middle"` | shadcn: `h-10 px-4 text-base`

---

## 📝 Build Plan

```json
{
  "target": "hybrid",
  "persona": "enterprise",
  "apps": [
    {
      "name": "marketing-web",
      "adapter": "shadcn",
      "pages": ["home", "pricing", "faq"]
    },
    {
      "name": "erp-web",
      "adapter": "antd",
      "pages": ["auth", "dashboard", "customers"]
    }
  ],
  "atoms": {
    "button": { "variantId": "tfv_button_solid_primary_md" },
    "textField": { "variantId": "tfv_textField_outline_md" }
  }
}
```

---

## ✅ الميزات

- ✅ **Tokens موحدة**: CSS vars + Ant theme + Tailwind config
- ✅ **Atoms API موحدة**: Button, TextField, Select
- ✅ **Adapters**: antd + shadcn مع mapping كامل
- ✅ **Blocks**: Marketing + ERP blocks جاهزة
- ✅ **Dataset Integration**: ربط مع Dataset الموجود
- ✅ **Builder**: Build plan composer + Catalog retriever

---

## 🔧 التطوير

### Build All
```bash
pnpm build:all
```

### Type Check
```bash
pnpm typecheck
```

### Lint
```bash
pnpm lint
```

---

## 📚 التوثيق

- [HYBRID-SYSTEM-ARCHITECTURE.md](./HYBRID-SYSTEM-ARCHITECTURE.md) - تفاصيل البنية
- [HYBRID-SYSTEM-COMPLETE.md](./HYBRID-SYSTEM-COMPLETE.md) - قائمة الإنجازات

---

**الحالة**: ✅ **جاهز للاستخدام**

