# App Generator

النظام الرئيسي لتوليد التطبيقات الكاملة من المواصفات.

## Pipeline

```
Input (Brief/Preset/Spec)
    ↓
1. Normalize Spec (merge preset + apply rules)
    ↓
2. Retrieve Catalog Context (RAG)
    ↓
3. Compose App Spec
    ↓
4. Validate & Auto-fix (loop)
    ↓
5. Render (Web/Mobile/Desktop)
    ↓
6. Export Project
    ↓
Output (Generated Project)
```

## Usage

### Basic Usage

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

// Generate from brief
const result2 = await generator.generate(
  'عايز HRMS on-prem للحكومة عربي RTL'
);

// Generate from spec
const result3 = await generator.generate({
  productType: 'CRM',
  // ... spec properties
});
```

### Output Structure

```javascript
{
  spec: {
    // Complete app spec
    routes: [...],
    screens: [...],
    entities: [...],
    navigation: {...}
  },
  rendered: {
    web: {...},
    mobile: {...},
    desktop: {...}
  },
  exported: {
    projectName: 'supportflow',
    timestamp: '2024-01-01T00:00:00',
    structure: {
      'app-spec.json': {...},
      'package.json': {...},
      'README.md': '...',
      'build.sh': '...',
      web: {...},
      mobile: {...},
      desktop: {...}
    }
  },
  warnings: [...]
}
```

## LLM Client Interface

Your LLM client should implement:

```javascript
async generate(prompt) {
  // prompt.system - system message
  // prompt.user - user message (can be string or function)
  
  // Call your LLM API (OpenAI, Anthropic, etc.)
  const response = await callLLMAPI({
    system: prompt.system,
    user: typeof prompt.user === 'function' 
      ? prompt.user(context) 
      : prompt.user
  });
  
  // Return JSON string or parsed object
  return response;
}
```

## Catalog Loader Interface

Your catalog loader should implement:

```javascript
async catalogLoader(componentId) {
  // Load component manifest
  // e.g., 'patterns/data.table.pro'
  // Return manifest object or null
  return manifest;
}
```

## Renderers Interface

Your renderers should implement:

```javascript
async render(appSpec) {
  // Generate code for platform
  // Return rendered code structure
  return {
    // Platform-specific structure
  };
}
```

