# Component Registry

Unified registry of all components, sections, and templates in the Oxygen DNA System.

## Purpose

The registry provides:
- **Complete catalog** of all available components across all levels (atoms, molecules, sections)
- **Metadata** for each component (dependencies, tags, variants, categories)
- **Site type presets** with recommended section combinations
- **AI-ready** structured data for intelligent composition

## Structure

```json
{
  "levels": {
    "atoms": [...],
    "molecules": [...],
    "sections": [...]
  },
  "categories": {...},
  "siteTypePresets": {...}
}
```

## Usage

### Load Registry

```javascript
import registry from './registry.json';

// Get all sections
const sections = registry.levels.sections.sections;

// Get SaaS preset
const saasPreset = registry.siteTypePresets.saas;

// Find components by tag
const marketingComponents = sections.filter(s => 
  s.tags.includes('marketing')
);
```

### Get Component Metadata

```javascript
function getComponentMetadata(componentId) {
  // Search all levels
  for (const level of Object.values(registry.levels)) {
    const components = level.components || level.sections || [];
    const component = components.find(c => c.id === componentId);
    if (component) return component;
  }
  return null;
}
```

### Get Recommended Sections for Site Type

```javascript
function getRecommendedSections(siteType) {
  const preset = registry.siteTypePresets[siteType];
  if (!preset) return [];
  
  return preset.recommendedSections.map(sectionId => {
    return getComponentMetadata(sectionId);
  });
}
```

## Component Metadata

Each component includes:

- **id**: Unique identifier
- **name**: Display name
- **category**: Primary category
- **level**: Component level (atom/molecule/section)
- **manifestPath**: Path to manifest file (if available)
- **dependencies**: Array of component IDs this depends on
- **tags**: Array of tags for filtering
- **variants**: Available visual/functional variants

## Site Type Presets

Presets define recommended sections and theme for common site types:

- **saas**: Software as a Service sites
- **agency**: Creative agency sites
- **portfolio**: Portfolio/personal sites
- **ecommerce**: E-commerce stores
- **blog**: Blog/content sites

Each preset includes:
- `recommendedSections`: Array of section IDs in recommended order
- `recommendedTheme`: Theme ID to use
- `tags`: Relevant tags

## Benefits

### For AI Systems
- Structured catalog for intelligent selection
- Dependency tracking ensures valid compositions
- Tag-based filtering for context-aware suggestions

### For Developers
- Single source of truth for all components
- Easy discovery of available components
- Clear dependency relationships

### For Designers
- Site type presets provide starting points
- Category organization aids exploration
- Variant information shows flexibility

## Extending the Registry

To add a new component:

1. Add to appropriate level (atoms/molecules/sections)
2. Include all required metadata
3. Add to relevant categories
4. Update site type presets if needed
5. Create manifest file if it's a section

## Integration with Other Systems

The registry integrates with:

- **Manifests**: Provides paths to manifest files
- **Composer**: Uses presets and dependencies for validation
- **Renderers**: Uses metadata for code generation
- **AI Orchestrator**: Primary data source for component selection

