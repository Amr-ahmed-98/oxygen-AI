# Entity to Screens Generator

## Overview

Generates screens and routes automatically from entity specs **without LLM** - provides deterministic, fast generation.

## Features

- ✅ **Automatic Screen Generation**: List, Create, Edit, Detail for each entity
- ✅ **Automatic Route Generation**: Standard CRUD routes
- ✅ **Platform Adaptations**: Web/Mobile/Desktop defaults
- ✅ **Entity View Rules**: Applies rules from platform-defaults.json
- ✅ **Template-based**: Uses screen snippets for consistency

## Usage

```javascript
import { EntityToScreensGenerator } from './entity-to-screens-generator.js';

const generator = new EntityToScreensGenerator();

// Generate screens for an entity
const screens = generator.generateScreensForEntity(
  entitySpec,
  'helpdesk.tickets',
  appSpec
);

// Generate routes for an entity
const routes = generator.generateRoutesForEntity(
  entitySpec,
  'helpdesk.tickets'
);
```

## How It Works

### 1. Entity → Screens

For each entity, generates 4 screens:
- `screen.<moduleId>.list` - List screen
- `screen.<moduleId>.create` - Create screen
- `screen.<moduleId>.edit` - Edit screen
- `screen.<moduleId>.detail` - Detail screen

### 2. Screen Templates

Uses pre-defined snippets from `specs/templates/screen-snippets.json`:
- `entityList` - List screen template
- `entityDetail` - Detail screen template
- `workflowApproval` - Approval screen template

### 3. Platform Defaults

Applies defaults from `core/platform-defaults.json`:
- Web: dataTablePro, detailWithRightPanel, sidebar
- Mobile: cardList, tabsTop, bottomSheet filters
- Desktop: dataTablePro, shortcuts, contextMenu

### 4. Entity View Rules

Applies deterministic rules:
- If `entity.views.list.layout === 'dataTable'`:
  - Web/Desktop: dataTablePro
  - Mobile: cardList
- If `entity.fields.length > 10`:
  - Mobile form: stepper

## Integration with Product Composer

The Product Composer automatically uses this generator:

```javascript
// In product-composer.js
async generateScreens(modules, spec, catalogLoader) {
  const generator = new EntityToScreensGenerator();
  // ... uses generator to create screens
}
```

## Benefits

1. **Speed**: No LLM calls for screen generation
2. **Consistency**: Deterministic output
3. **Quality**: Applies best practices automatically
4. **Maintainability**: Easy to update templates

## Customization

To customize screen generation:

1. **Modify Templates**: Edit `specs/templates/screen-snippets.json`
2. **Modify Defaults**: Edit `core/platform-defaults.json`
3. **Add Rules**: Add to `platform-defaults.json` → `entityViewRules`

---

**Status:** ✅ Complete and Integrated

