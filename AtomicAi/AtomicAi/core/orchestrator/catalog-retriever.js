/**
 * Catalog Retriever
 * Retrieves appropriate sections/components from registry based on Site Spec
 */

import registry from '../registry/registry.json';

export class CatalogRetriever {
  constructor() {
    this.registry = registry;
  }

  /**
   * Get recommended sections for site spec
   * @param {Object} siteSpec - Site Spec JSON
   * @returns {Array} Array of section manifests
   */
  async getRecommendedSections(siteSpec) {
    // Get preset from registry
    const preset = this.registry.siteTypePresets[siteSpec.siteType];
    if (!preset) {
      throw new Error(`No preset found for site type: ${siteSpec.siteType}`);
    }

    // Start with preset recommendations
    let sectionIds = [...preset.recommendedSections];

    // Override with explicit sections from site spec if provided
    if (siteSpec.sections && siteSpec.sections.length > 0) {
      sectionIds = siteSpec.sections.map(s => s.ref);
    }

    // Load section manifests
    const sections = [];
    for (const sectionId of sectionIds) {
      try {
        const manifest = await this.loadSectionManifest(sectionId);
        if (manifest) {
          sections.push(manifest);
        }
      } catch (error) {
        console.warn(`Failed to load section: ${sectionId}`, error);
      }
    }

    return sections;
  }

  /**
   * Load section manifest by ID
   */
  async loadSectionManifest(sectionId) {
    // Find section in registry
    const sectionData = this.findSectionInRegistry(sectionId);
    if (!sectionData) {
      throw new Error(`Section not found in registry: ${sectionId}`);
    }

    // Load manifest file
    const manifestPath = sectionData.manifestPath || `../sections/${sectionId}.manifest.json`;
    
    try {
      const manifest = await import(manifestPath);
      return manifest.default || manifest;
    } catch (error) {
      // Try sections directory
      try {
        const manifest = await import(`../sections/${sectionId}.manifest.json`);
        return manifest.default || manifest;
      } catch (e) {
        throw new Error(`Manifest file not found for: ${sectionId}`);
      }
    }
  }

  /**
   * Find section in registry
   */
  findSectionInRegistry(sectionId) {
    const sections = this.registry.levels.sections.sections;
    return sections.find(s => s.id === sectionId);
  }

  /**
   * Get theme for site spec
   */
  getTheme(siteSpec) {
    if (siteSpec.theme) {
      return siteSpec.theme;
    }

    // Get from preset
    const preset = this.registry.siteTypePresets[siteSpec.siteType];
    if (preset && preset.recommendedTheme) {
      return preset.recommendedTheme;
    }

    return 'theme-saas-modern'; // Default
  }

  /**
   * Get template for site spec
   */
  getTemplate(siteSpec) {
    const templateId = `template-${siteSpec.siteType}-${siteSpec.primaryGoal || 'landing'}`;
    return templateId;
  }

  /**
   * Filter sections by tags
   */
  filterSectionsByTags(sections, tags) {
    if (!tags || tags.length === 0) {
      return sections;
    }

    return sections.filter(section => {
      const sectionTags = section.tags || [];
      return tags.some(tag => sectionTags.includes(tag));
    });
  }

  /**
   * Validate section dependencies
   */
  validateDependencies(sections) {
    const errors = [];
    const availableComponents = new Set();

    // Collect all available component IDs
    ['atoms', 'molecules', 'sections'].forEach(level => {
      const components = this.registry.levels[level]?.components || this.registry.levels[level]?.sections || [];
      components.forEach(c => availableComponents.add(c.id));
    });

    // Validate each section's dependencies
    sections.forEach(section => {
      const dependencies = section.dependencies || [];
      dependencies.forEach(dep => {
        if (!availableComponents.has(dep)) {
          errors.push({
            section: section.id,
            dependency: dep,
            message: `Dependency ${dep} not found for section ${section.id}`
          });
        }
      });
    });

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Get alternative sections (for variety)
   */
  getAlternativeSections(sectionId, count = 3) {
    const sectionData = this.findSectionInRegistry(sectionId);
    if (!sectionData) {
      return [];
    }

    // Find sections with similar tags
    const tags = sectionData.tags || [];
    const category = sectionData.category || [];

    const sections = this.registry.levels.sections.sections;
    const alternatives = sections
      .filter(s => {
        if (s.id === sectionId) return false;
        const sTags = s.tags || [];
        const sCategory = s.category || [];
        
        // Check for tag overlap
        const tagOverlap = tags.some(tag => sTags.includes(tag));
        const categoryMatch = category.some(cat => sCategory.includes(cat));
        
        return tagOverlap || categoryMatch;
      })
      .slice(0, count);

    return alternatives.map(s => s.id);
  }
}

export default CatalogRetriever;

