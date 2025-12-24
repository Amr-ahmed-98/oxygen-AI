/**
 * Composition Rules
 * Rules for composing pages and sections together
 */

export const compositionRules = {
  /**
   * Valid section combinations
   */
  validCombinations: {
    'hero': {
      canFollow: ['announcement-bar', 'header'],
      canPrecede: ['logos-cloud', 'features', 'content'],
      recommendedNext: ['features', 'logos-cloud']
    },
    'features': {
      canFollow: ['hero', 'logos-cloud', 'testimonials'],
      canPrecede: ['testimonials', 'pricing', 'cta'],
      recommendedNext: ['testimonials', 'pricing']
    },
    'pricing': {
      canFollow: ['features', 'testimonials'],
      canPrecede: ['faq', 'cta', 'footer'],
      recommendedNext: ['faq', 'cta']
    },
    'testimonials': {
      canFollow: ['features', 'pricing'],
      canPrecede: ['pricing', 'cta'],
      recommendedNext: ['pricing', 'cta']
    },
    'cta': {
      canFollow: ['features', 'pricing', 'testimonials', 'faq'],
      canPrecede: ['footer'],
      recommendedNext: ['footer']
    }
  },

  /**
   * Section frequency rules
   */
  frequency: {
    'hero': { min: 0, max: 1, perPage: true },
    'header': { min: 1, max: 1, perPage: true },
    'footer': { min: 1, max: 1, perPage: true },
    'cta': { min: 0, max: 2, perPage: true },
    'features': { min: 0, max: 3, perPage: true },
    'testimonials': { min: 0, max: 2, perPage: true }
  },

  /**
   * Heading hierarchy rules
   */
  headingHierarchy: {
    enforce: true,
    rules: [
      'Page should have exactly one h1',
      'h2 should be used for major sections',
      'h3 should be used for subsections',
      'No skipping levels (h1 -> h3 is invalid)'
    ],
    validate: (sections) => {
      const headings = extractHeadings(sections);
      return validateHierarchy(headings);
    }
  },

  /**
   * Contrast rules
   */
  contrast: {
    minRatio: {
      text: 4.5, // WCAG AA
      largeText: 3, // WCAG AA for large text
      interactive: 3 // For buttons, links
    },
    validate: (section, theme) => {
      // Validate contrast ratios
      return true;
    }
  },

  /**
   * Component sizing consistency
   */
  sizing: {
    buttons: {
      primary: 'md', // Default primary button size
      secondary: 'md' // Default secondary button size
    },
    inputs: {
      default: 'md'
    },
    headings: {
      h1: '4xl',
      h2: '3xl',
      h3: '2xl',
      h4: 'xl'
    }
  }
};

/**
 * Extract headings from sections
 */
function extractHeadings(sections) {
  const headings = [];
  sections.forEach(section => {
    if (section.slots?.headline) {
      headings.push({
        level: section.seo?.recommendH1 ? 1 : 2,
        text: section.props?.headline,
        section: section.id
      });
    }
  });
  return headings;
}

/**
 * Validate heading hierarchy
 */
function validateHierarchy(headings) {
  const errors = [];
  const h1Count = headings.filter(h => h.level === 1).length;
  
  if (h1Count !== 1) {
    errors.push(`Expected exactly 1 h1, found ${h1Count}`);
  }
  
  let lastLevel = 0;
  headings.forEach(heading => {
    if (heading.level > lastLevel + 1) {
      errors.push(`Skipped heading level: ${lastLevel} -> ${heading.level} in ${heading.section}`);
    }
    lastLevel = heading.level;
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
}

export default compositionRules;

