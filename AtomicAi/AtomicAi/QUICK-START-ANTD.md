# 🚀 Quick Start - Ant Design Integration

## ✅ النظام المتكامل جاهز!

تم بناء نظام متكامل مع Ant Design كـEngine:

### 📦 المكونات

1. **packages/ui-antd/** - Wrappers فعلية فوق AntD
2. **packages/tokens/** - Personas + AntD themes
3. **packages/builder/** - يستخدم ui-antd
4. **apps/playground/** - للتجربة

---

## 🚀 الاستخدام السريع

### 1. Build Packages

```bash
# Build tokens
pnpm build:tokens

# Build UI AntD library
pnpm build:ui-antd

# Build builder
pnpm build:builder
```

### 2. استخدام المكتبة

```tsx
// ✅ استخدم ui-antd بدلاً من antd مباشرة
import { Button, TextField, Select, Table, Form } from "@atomic-ai/ui-antd";
import { createAntdTheme } from "@atomic-ai/ui-antd/theme";
import { ConfigProvider } from "antd";

// Setup theme
const theme = createAntdTheme({ 
  persona: "enterprise", 
  rtl: false 
});

// Use in app
<ConfigProvider theme={theme}>
  <Button variant="solid" tone="primary">Click me</Button>
  <TextField placeholder="Enter text" />
  <Table columns={columns} dataSource={data} />
</ConfigProvider>
```

### 3. Playground

```bash
cd apps/playground
pnpm install
pnpm dev
```

افتح `http://localhost:3000` لرؤية جميع المكونات.

### 4. Generate Project

```bash
pnpm build:ai "Build CRM SaaS with enterprise theme"
```

---

## 📝 Wrapper Pattern

### ❌ لا تستخدم AntD مباشرة:

```tsx
import { Button } from "antd"; // ❌
```

### ✅ استخدم ui-antd:

```tsx
import { Button } from "@atomic-ai/ui-antd/atoms/Button"; // ✅
```

**الفائدة**:
- Unified API (variant/tone/size/shape/density)
- Tokens integration
- Import references للـBuilder

---

## 🎨 Theming

### Personas المتاحة:

- `enterprise` - Professional, corporate
- `minimal` - Clean, minimal
- `glass` - Glassmorphism
- `neon` - Vibrant, neon

### الاستخدام:

```tsx
import { createAntdTheme } from "@atomic-ai/ui-antd/theme";

const theme = createAntdTheme({ 
  persona: "enterprise", 
  rtl: false 
});
```

---

## 📦 Atoms المتاحة

- ✅ Button (variant, tone, size, shape, density)
- ✅ TextField
- ✅ Select
- ✅ DatePicker
- ✅ Table
- ✅ Form

---

## 🎯 Builder Integration

الـBuilder يستخدم `@atomic-ai/ui-antd` تلقائياً:

```json
{
  "persona": "enterprise",
  "apps": [
    {
      "name": "erp-web",
      "adapter": "antd"
    }
  ]
}
```

**النتيجة**:
- Layout يستخدم `createAntdTheme`
- Pages تستخدم `@atomic-ai/ui-antd`
- Theme من persona تلقائياً

---

**الحالة**: ✅ **جاهز للاستخدام**

