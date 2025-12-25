# RAG System for LLM Integration

RAG (Retrieval-Augmented Generation) system for integrating with ChatGPT API/LLM models.

## Overview

This system enables AI to generate application specifications by:
1. **Retrieving** relevant component manifests from the catalog
2. **Augmenting** the LLM prompt with context
3. **Generating** app specs (not raw code)

## Components

### Catalog Loader (`catalog-loader.js`)
Loads and indexes all manifests for RAG retrieval.

**Features:**
- Loads manifests from all levels
- Indexes by level, category, tags, platform
- Search functionality
- Related component discovery

### LLM Integration (`llm-integration.js`)
Integrates with ChatGPT API to generate specs.

**Features:**
- RAG-based prompt building
- Spec generation from briefs
- Iterative refinement (validate → fix)
- Context-aware generation

## Usage

### Initialize RAG System

```javascript
import { CatalogLoader } from './rag/catalog-loader.js';
import { LLMIntegration } from './rag/llm-integration.js';

// Load catalog
const catalogLoader = new CatalogLoader('./catalog');
const catalog = await catalogLoader.loadAll();

// Initialize LLM
const llm = new LLMIntegration('your-openai-api-key', catalogLoader);

// Generate spec from brief
const brief = `
  Build an ERP system for invoice management.
  Include customers, invoices, payments.
  Support Arabic (RTL) and English.
  Multi-tenant with role-based permissions.
`;

const appSpec = await llm.generateAppSpec(brief);
```

### Search Components

```javascript
// Search for relevant components
const components = catalogLoader.search('invoice table', {
  level: 'organism',
  category: 'data-ui',
  tags: ['erp', 'table'],
  platform: 'web',
  limit: 10
});

console.log(components); // Array of matching manifests
```

### Iterative Refinement

```javascript
import { SpecValidator } from './validators/spec-validator.js';

const validator = new SpecValidator();

// Generate and validate
let spec = await llm.generateAppSpec(brief);
let result = await llm.validateAndFix(spec, validator);

if (result.fixed) {
  console.log('Spec was automatically fixed');
}

// Use validated spec
const validatedSpec = result.spec;
```

## Dataset Generation

The system automatically generates datasets:

### 1. Operational Dataset (Generated automatically)

**Manifests** - All component manifests are ready for embedding:
- Component descriptions
- Usage guidelines
- Props and slots
- Platform support

**Usage:**
```javascript
// Export for embedding
const embeddings = catalogLoader.exportForEmbedding();

// This can be embedded using OpenAI embeddings API
// Then used for semantic search
```

### 2. Improvement Dataset (Optional)

**Pairs (Prompt → Spec):**
```javascript
// Log successful generations
const log = {
  brief: "Build invoice management system...",
  spec: appSpec,
  timestamp: Date.now(),
  validated: true
};

// Save for future fine-tuning or few-shot examples
```

**Bad → Fixed:**
```javascript
// Log validation fixes
const fixLog = {
  originalSpec: invalidSpec,
  errors: validationErrors,
  fixedSpec: correctedSpec,
  fixes: ["Added missing route", "Fixed entity reference"]
};
```

## Benefits

### For LLM Integration
- **Context-aware** - LLM sees relevant components only
- **Structured output** - Generates specs, not raw code
- **Validated** - Auto-fixes common errors
- **Platform-aware** - Considers web/mobile/desktop differences

### For Dataset
- **Rich metadata** - Complete component information
- **Usage examples** - When to use/not use each component
- **Relationships** - Dependencies and compositions
- **Platform support** - Multi-platform capabilities

## Architecture

```
Brief → RAG Retrieval → LLM Prompt → App Spec → Validator → Fixed Spec → Renderer → Code
         ↑
         Catalog (Manifests)
```

## Next Steps

1. **Embedding Generation** - Generate embeddings for manifests
2. **Vector Database** - Store embeddings for semantic search
3. **Fine-tuning** - Optional fine-tuning on spec generation
4. **Few-shot Examples** - Add example pairs to prompts

