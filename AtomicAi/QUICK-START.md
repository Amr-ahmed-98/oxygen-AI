# Quick Start Guide

## 🚀 بدء سريع

### 1. استخدام Generator

```javascript
import { AppGenerator } from './generator/generate.js';

const generator = new AppGenerator({
  llmClient: yourLLMClient,
  catalogLoader: yourCatalogLoader,
  renderers: {
    web: webRenderer,
    mobile: mobileRenderer,
    desktop: desktopRenderer
  }
});

// Generate from preset
const result = await generator.generate({
  presetId: 'helpdesk-b2b-workflow'
});
```

### 2. استخدام Validators

```javascript
import SpecValidators from './validators/spec-validators.js';

const validators = new SpecValidators();
const errors = validators.validate(appSpec);

errors.forEach(error => {
  console.log(`${error.severity}: ${error.code}`);
  console.log(`  ${error.message}`);
  console.log(`  Hint: ${error.hint}`);
});
```

### 3. استخدام Auto-Fix

```javascript
import AutoFixSystem from './validators/auto-fix.js';

const autoFix = new AutoFixSystem(llmClient);
const result = await autoFix.fixSpec(appSpec, errors, context);

console.log(`Fixed in ${result.iterations} iterations`);
console.log(`Remaining errors: ${result.errors.length}`);
```

### 4. استخدام Product Composer

```javascript
import { ProductComposer } from './composer/product-composer.js';

const composer = new ProductComposer();
const app = await composer.compose(productSpec, catalogLoader);
```

## 📋 Presets المتاحة

1. **helpdesk-b2b-workflow** - Helpdesk مع workflow automation
2. **crm-saas-multitenant-b2b-complete** - CRM SaaS متعدد المستأجرين
3. **pos-retail-offline-complete** - POS مع offline-first

## 🎯 Patterns المتاحة (30)

راجع `catalog/patterns/priority-patterns.json` للقائمة الكاملة.

## 📖 الوثائق الكاملة

- **PRACTICAL-GENERATOR-COMPLETE.md** - النظام الكامل
- **PRODUCT-TYPES-COMPLETE.md** - Product Types
- **validators/README.md** - Validators
- **generator/README.md** - Generator

