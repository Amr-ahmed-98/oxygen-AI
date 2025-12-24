/**
 * Composer
 * Main composition engine that validates and composes pages
 */

import { layoutRules } from './layout-rules.js';
import { compositionRules } from './composition-rules.js';
import { CompositionValidators } from './validators.js';

export class Composer {
  constructor(options = {}) {
    this.options = {
      siteType: 'saas', // saas, agency, portfolio, ecommerce, blog
      theme: null,
      strict: true, // Enforce all rules strictly
      ...options
    };
    this.errors = [];
    this.warnings = [];
    this.validators = new CompositionValidators();
  }

  /**
   * Compose a page from sections
   * @param {Array} sections - Array of section manifests
   * @param {Object} theme - Theme configuration
   * @returns {Object} - Composed page with validation results
   */
  compose(sections = [], theme = null) {
    this.errors = [];
    this.warnings = [];
    
    // Validate sections
    this.validateSections(sections);
    
    // Validate composition rules
    this.validateComposition(sections);
    
    // Apply layout rules
    const composed = this.applyLayoutRules(sections, theme);
    
    // Apply spacing
    const withSpacing = this.applySpacing(composed);
    
    // Validate heading hierarchy
    this.validateHeadingHierarchy(sections);
    
    // Run advanced validators
    const advancedValidation = this.validators.validate(withSpacing, theme);
    this.errors.push(...advancedValidation.errors);
    this.warnings.push(...advancedValidation.warnings);
    
    return {
      sections: withSpacing,
      valid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      score: advancedValidation.score,
      metadata: {
        siteType: this.options.siteType,
        sectionCount: sections.length,
        theme: theme?.id || 'default',
        qualityScore: advancedValidation.score
      }
    };
  }

  /**
   * Validate individual sections
   */
  validateSections(sections) {
    sections.forEach((section, index) => {
      // Check required slots
      if (section.slots) {
        Object.entries(section.slots).forEach(([slotName, slot]) => {
          if (slot.required && !section.props?.[slotName]) {
            this.errors.push({
              type: 'missing-required-slot',
              section: section.id,
              slot: slotName,
              index
            });
          }
        });
      }

      // Check constraints
      if (section.constraints) {
        this.validateConstraints(section, index);
      }
    });
  }

  /**
   * Validate section constraints
   */
  validateConstraints(section, index) {
    const { constraints, props } = section;

    if (constraints.headlineRequired && !props?.headline) {
      this.errors.push({
        type: 'constraint-violation',
        section: section.id,
        constraint: 'headlineRequired',
        index
      });
    }

    if (constraints.maxCtas && props?.ctas?.length > constraints.maxCtas) {
      this.errors.push({
        type: 'constraint-violation',
        section: section.id,
        constraint: 'maxCtas',
        value: props.ctas.length,
        max: constraints.maxCtas,
        index
      });
    }

    if (constraints.minSpacing) {
      // Spacing validation would go here
    }
  }

  /**
   * Validate composition rules
   */
  validateComposition(sections) {
    const { validCombinations, frequency } = compositionRules;

    // Check section frequency
    const sectionCounts = {};
    sections.forEach(section => {
      sectionCounts[section.id] = (sectionCounts[section.id] || 0) + 1;
    });

    Object.entries(frequency).forEach(([sectionId, rules]) => {
      const count = sectionCounts[sectionId] || 0;
      if (count < rules.min) {
        this.errors.push({
          type: 'frequency-violation',
          section: sectionId,
          issue: 'below-minimum',
          count,
          min: rules.min
        });
      }
      if (count > rules.max) {
        this.errors.push({
          type: 'frequency-violation',
          section: sectionId,
          issue: 'above-maximum',
          count,
          max: rules.max
        });
      }
    });

    // Check valid combinations
    sections.forEach((section, index) => {
      if (index > 0) {
        const prevSection = sections[index - 1];
        const combination = validCombinations[section.id];
        
        if (combination && !combination.canFollow?.includes(prevSection.id)) {
          this.warnings.push({
            type: 'combination-warning',
            section: section.id,
            previous: prevSection.id,
            index,
            message: `${section.id} typically doesn't follow ${prevSection.id}`
          });
        }
      }

      if (index < sections.length - 1) {
        const nextSection = sections[index + 1];
        const combination = validCombinations[section.id];
        
        if (combination && !combination.canPrecede?.includes(nextSection.id)) {
          this.warnings.push({
            type: 'combination-warning',
            section: section.id,
            next: nextSection.id,
            index,
            message: `${section.id} typically doesn't precede ${nextSection.id}`
          });
        }
      }
    });
  }

  /**
   * Apply layout rules
   */
  applyLayoutRules(sections, theme) {
    const { maxWidths, sectionOrder } = layoutRules;
    const siteTypeOrder = sectionOrder[this.options.siteType] || [];

    return sections.map((section, index) => {
      const composed = { ...section };

      // Apply max width if not specified
      if (!composed.props?.maxWidth) {
        if (section.type === 'hero') {
          composed.props = {
            ...composed.props,
            maxWidth: maxWidths.full
          };
        } else if (section.type === 'section') {
          composed.props = {
            ...composed.props,
            maxWidth: maxWidths.wide
          };
        }
      }

      // Apply section order hint
      const orderIndex = siteTypeOrder.indexOf(section.id);
      if (orderIndex !== -1) {
        composed.metadata = {
          ...composed.metadata,
          recommendedOrder: orderIndex,
          actualOrder: index
        };

        if (orderIndex !== index) {
          this.warnings.push({
            type: 'order-suggestion',
            section: section.id,
            recommended: orderIndex,
            actual: index
          });
        }
      }

      return composed;
    });
  }

  /**
   * Apply spacing between sections
   */
  applySpacing(sections) {
    const { sectionSpacing } = layoutRules;

    return sections.map((section, index) => {
      const composed = { ...section };

      if (index === 0) {
        // First section
        composed.props = {
          ...composed.props,
          spacing: section.props?.spacing || layoutRules.spacing.section.default
        };
      } else {
        const prevSection = sections[index - 1];
        
        // Determine spacing based on section types
        let spacing = layoutRules.spacing.section.default;
        
        if (prevSection.id === 'hero' && section.id !== 'header') {
          spacing = sectionSpacing['hero-to-content'];
        } else if (prevSection.id === 'cta' || section.id === 'footer') {
          spacing = sectionSpacing['cta-to-footer'];
        } else {
          spacing = sectionSpacing['content-to-content'];
        }

        composed.props = {
          ...composed.props,
          spacing,
          spacingTop: spacing
        };
      }

      return composed;
    });
  }

  /**
   * Validate heading hierarchy
   */
  validateHeadingHierarchy(sections) {
    const result = compositionRules.headingHierarchy.validate(sections);
    
    if (!result.valid) {
      result.errors.forEach(error => {
        this.errors.push({
          type: 'heading-hierarchy',
          message: error
        });
      });
    }
  }

  /**
   * Lint a composition (non-destructive validation)
   */
  lint(sections) {
    this.errors = [];
    this.warnings = [];
    
    this.validateSections(sections);
    this.validateComposition(sections);
    this.validateHeadingHierarchy(sections);
    
    return {
      valid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      score: this.calculateScore()
    };
  }

  /**
   * Calculate composition quality score
   */
  calculateScore() {
    const maxScore = 100;
    let score = maxScore;
    
    // Deduct for errors
    score -= this.errors.length * 10;
    
    // Deduct for warnings
    score -= this.warnings.length * 2;
    
    return Math.max(0, Math.min(maxScore, score));
  }

  /**
   * Suggest improvements
   */
  suggestImprovements(sections) {
    const suggestions = [];
    const { sectionOrder } = layoutRules;
    const recommendedOrder = sectionOrder[this.options.siteType] || [];

    // Check for missing recommended sections
    recommendedOrder.forEach(sectionId => {
      if (!sections.find(s => s.id === sectionId)) {
        suggestions.push({
          type: 'missing-section',
          section: sectionId,
          message: `Consider adding a ${sectionId} section for ${this.options.siteType} sites`
        });
      }
    });

    // Check section order
    sections.forEach((section, index) => {
      const recommendedIndex = recommendedOrder.indexOf(section.id);
      if (recommendedIndex !== -1 && recommendedIndex !== index) {
        suggestions.push({
          type: 'order-improvement',
          section: section.id,
          current: index,
          recommended: recommendedIndex,
          message: `Move ${section.id} to position ${recommendedIndex} for better flow`
        });
      }
    });

    return suggestions;
  }
}

export default Composer;

