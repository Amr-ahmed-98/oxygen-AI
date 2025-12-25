# 🎯 Hybrid Component Library System

## النظام: ERP + Marketing في نظام واحد

### 📦 البنية

```
repo/
├── apps/
│   ├── marketing-web/        # Next.js + Tailwind + shadcn/ui
│   └── erp-web/              # Next.js + Ant Design
│
├── packages/
│   ├── tokens/               # Design tokens موحدة
│   ├── ui/                   # Atoms API موحدة (Button, TextField, Select)
│   ├── adapters/
│   │   ├── antd/             # Adapter: Atom* → Ant Design
│   │   └── shadcn/           # Adapter: Atom* → shadcn/ui
│   ├── blocks/
│   │   ├── marketing/        # Hero, Pricing, FAQ, Testimonials...
│   │   └── erp/              # AppShell, Table, Form patterns...
│   └── builder/              # Prompt → Plan → Emit
│
└── catalog/
    └── atoms/                # Dataset موجود (button, textField, select)
```

---

## 🔄 كيف يعمل النظام

### 1. **Tokens موحدة**
- `packages/tokens/` → CSS variables + Ant theme config
- نفس المصدر، output مختلف حسب المحرك

### 2. **Atoms API موحدة**
- `packages/ui/atoms/Button.tsx` → API واحدة
- تحت الـhood: يستخدم adapter (antd أو shadcn)

### 3. **Adapters**
- `packages/adapters/antd/Button.tsx` → Wrapper على Ant Button
- `packages/adapters/shadcn/Button.tsx` → Wrapper على shadcn Button
- Mapping: variant/tone/size → props المحرك

### 4. **Builder**
- Prompt → Classify → Retrieve Dataset → Build Plan → Emit
- `build-plan.json` يحدد: adapter, pages, blocks, variants

---

## 🎨 Mapping Rules

### Button
```typescript
// Dataset variant → Ant
variant: "solid" → type: "primary"
variant: "outline" → type: "default"
variant: "ghost" → type: "text"
tone: "danger" → danger: true

// Dataset variant → shadcn
variant: "solid" → variant: "default"
variant: "outline" → variant: "outline"
variant: "ghost" → variant: "ghost"
```

### TextField
```typescript
// Dataset → Ant
size: "xs" → size: "small"
size: "md" → size: "middle"
size: "xl" → size: "large"

// Dataset → shadcn
size: "xs" → className: "h-8"
size: "md" → className: "h-10"
size: "xl" → className: "h-12"
```

---

## 🚀 Usage

```bash
# Install
pnpm install

# Dev
pnpm dev:marketing  # marketing-web
pnpm dev:erp       # erp-web

# Build
pnpm build:all

# Generate
pnpm gen "Build an ERP dashboard for invoice management"
```

---

## 📝 Build Plan Example

```json
{
  "target": "hybrid",
  "persona": "persona.enterprise",
  "apps": [
    {
      "name": "marketing-web",
      "adapter": "shadcn",
      "pages": ["home", "pricing", "faq"]
    },
    {
      "name": "erp-web",
      "adapter": "antd",
      "pages": ["auth", "dashboard", "customers", "orders"]
    }
  ],
  "atoms": {
    "button": { "variantId": "tfv_button_solid_primary_md" },
    "textField": { "variantId": "tfv_textField_outline_md" },
    "select": { "variantId": "tfv_select_outline_md" }
  },
  "blocks": {
    "marketing": ["hero.split.image", "pricing.cards", "faq.accordion"],
    "erp": ["appShell.sidebar", "table.listPage", "form.editPage"]
  }
}
```

