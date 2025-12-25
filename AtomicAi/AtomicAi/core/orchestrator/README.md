# AI Orchestrator

Complete pipeline for generating ThemeForest-quality websites from natural language briefs.

## Components

### Site Spec Parser (`site-spec-parser.js`)
Converts natural language briefs into structured Site Spec JSON.

**Features:**
- Detects site type (SaaS, Agency, Portfolio, E-commerce, Blog)
- Identifies theme preferences
- Extracts brand tone and audience
- Determines primary goals
- Extracts required pages and sections
- Identifies content requirements

### Catalog Retriever (`catalog-retriever.js`)
Retrieves appropriate sections and components from the registry.

**Features:**
- Loads recommended sections based on site type
- Retrieves section manifests
- Validates dependencies
- Finds alternative sections
- Filters by tags

### AI Orchestrator (`ai-orchestrator.js`)
Main orchestrator that coordinates the entire generation pipeline.

**Pipeline:**
1. Parse brief → Site Spec
2. Retrieve sections from catalog
3. Load theme
4. Compose pages with validation
5. Fill content slots
6. Render to HTML/CSS
7. Run QA validation

## Usage

### Basic Usage

```javascript
import { AIOrchestrator } from './orchestrator/ai-orchestrator.js';

const orchestrator = new AIOrchestrator();

const brief = `
  Build a modern SaaS landing page for a project management tool.
  Include hero section, features grid, testimonials, pricing with monthly/yearly toggle,
  FAQ section, and newsletter signup. Use a clean, professional design.
`;

const result = await orchestrator.generateSite(brief);

console.log(result.pages); // Array of rendered pages
console.log(result.siteSpec); // Parsed site specification
console.log(result.qa); // QA validation results
```

### Advanced Usage

```javascript
const orchestrator = new AIOrchestrator({
  composerOptions: {
    siteType: 'saas',
    strict: true
  },
  rendererOptions: {
    prefix: 'myapp',
    minify: true,
    generateClasses: true
  }
});

const result = await orchestrator.generateSite(brief, {
  generateContent: true, // Use AI to generate content
  optimizeImages: true,
  includeAnalytics: true
});
```

## Site Spec Format

The parser generates Site Spec JSON:

```json
{
  "siteType": "saas",
  "theme": "theme-saas-modern",
  "brandTone": "professional",
  "audience": "B2B",
  "primaryGoal": "lead",
  "pages": ["home", "pricing", "contact"],
  "sections": [
    { "ref": "hero.split.image", "position": 1 },
    { "ref": "features.icon.grid", "position": 2 }
  ],
  "content": {
    "headline": "...",
    "description": "..."
  },
  "requirements": {
    "responsive": true,
    "seo": true,
    "accessibility": true
  }
}
```

## Output Format

The orchestrator returns:

```javascript
{
  siteSpec: {...},      // Parsed site specification
  pages: [              // Rendered pages
    {
      id: "home",
      html: "...",      // Complete HTML
      css: "...",       // Combined CSS
      sections: [...]   // Individual section renders
    }
  ],
  theme: {...},         // Theme configuration
  qa: {                 // QA results
    passed: true,
    issues: [],
    warnings: [],
    score: 95
  },
  metadata: {
    generatedAt: "...",
    siteType: "saas",
    theme: "theme-saas-modern",
    pageCount: 1
  }
}
```

## Integration with AI Content Generation

In production, you would integrate with an AI content generator:

```javascript
async fillContentSlots(sections, siteSpec) {
  const contentGenerator = new AIContentGenerator();
  
  for (const section of sections) {
    if (section.slots?.headline && !section.props?.headline) {
      section.props.headline = await contentGenerator.generateHeadline(
        siteSpec.brandTone,
        siteSpec.primaryGoal
      );
    }
    
    // Generate other content...
  }
  
  return sections;
}
```

## QA Validation

The QA pass checks:
- Required pages generated
- HTML structure (H1, semantic HTML)
- Accessibility (alt tags, ARIA labels)
- SEO (meta tags, headings)
- Performance (image optimization, CSS size)

## Benefits

### For AI Systems
- Structured pipeline ensures quality
- Validation prevents bad outputs
- Consistent format for content generation

### For Developers
- Complete site generation from brief
- Production-ready output
- Built-in validation and QA

### For Users
- Natural language input
- ThemeForest-quality output
- Consistent, professional results

