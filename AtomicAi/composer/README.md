# Product Composer

Composes complete applications from Product Specs using Rules Matrix and Product Packs.

## Overview

The Product Composer takes a product specification and:
1. Applies rules from the rules matrix
2. Loads the appropriate product pack
3. Merges modules from pack and spec
4. Generates routes, screens, and navigation
5. Adapts UI for different platforms (web/mobile/desktop)

## Usage

```javascript
import { ProductComposer } from './product-composer.js';
import preset from '../catalog/presets/hrms-enterprise-onprem-rtl.preset.json';

const composer = new ProductComposer();
const catalogLoader = async (id) => { /* load component */ };

const app = await composer.compose(preset, catalogLoader);
```

## Output

The composer returns a complete app specification with:

- **app**: App configuration (name, platforms, locale, theme)
- **security**: Security settings (auth, rbac, multiTenant)
- **navigation**: Navigation structure (web, mobile, desktop)
- **modules**: List of module IDs
- **routes**: Generated routes with permissions
- **screens**: Screen specifications with platform adaptations
- **features**: List of enabled features
- **constraints**: List of constraints

## Rules Matrix

Rules are applied automatically based on:
- Delivery mode (multiTenantSaaS, onPremise, etc.)
- Business model (subscription, usage-based, etc.)
- Platform (web, mobile, desktop)
- Vertical (HealthTech, FinTech, etc.)

## Product Packs

Product packs define:
- Core modules
- Product-specific modules
- Primary UI patterns
- Platform adaptations
- Workflows and integrations

## Extension

To extend the composer:

1. Add rules to `catalog/rules/rules-matrix.json`
2. Create product packs in `catalog/product-packs/`
3. Create presets in `catalog/presets/`

