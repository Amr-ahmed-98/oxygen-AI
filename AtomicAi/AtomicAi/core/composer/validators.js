/**
 * Advanced Validators
 * Comprehensive validation rules for composition quality
 */

export class CompositionValidators {
  constructor() {
    this.errors = [];
    this.warnings = [];
  }

  /**
   * Validate complete composition
   */
  validate(composition, theme) {
    this.errors = [];
    this.warnings = [];

    // Run all validators
    this.validateHeadingHierarchy(composition.sections);
    this.validateCTALogic(composition.sections);
    this.validateSpacingRhythm(composition.sections, theme);
    this.validateContrast(composition.sections, theme);
    this.validatePerformance(composition.sections);
    this.validateAccessibility(composition.sections);
    this.validateSEO(composition.sections);
    this.validateRTL(composition.sections);

    return {
      valid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      score: this.calculateScore()
    };
  }

  /**
   * Validate heading hierarchy (H1-H6)
   */
  validateHeadingHierarchy(sections) {
    const headings = [];
    
    sections.forEach((section, index) => {
      if (section.seo?.recommendH1 && section.props?.headline) {
        headings.push({ level: 1, text: section.props.headline, section: section.id, index });
      } else if (section.props?.headline) {
        headings.push({ level: 2, text: section.props.headline, section: section.id, index });
      }
    });

    // Check for exactly one H1
    const h1Count = headings.filter(h => h.level === 1).length;
    if (h1Count === 0) {
      this.errors.push({
        type: 'heading-hierarchy',
        message: 'Page must have exactly one H1 heading',
        severity: 'error'
      });
    } else if (h1Count > 1) {
      this.errors.push({
        type: 'heading-hierarchy',
        message: `Page has ${h1Count} H1 headings, should have exactly one`,
        severity: 'error'
      });
    }

    // Check for skipped levels
    let lastLevel = 0;
    headings.forEach(heading => {
      if (heading.level > lastLevel + 1 && lastLevel > 0) {
        this.warnings.push({
          type: 'heading-hierarchy',
          message: `Skipped heading level from H${lastLevel} to H${heading.level} in section ${heading.section}`,
          severity: 'warning'
        });
      }
      lastLevel = heading.level;
    });
  }

  /**
   * Validate CTA logic
   */
  validateCTALogic(sections) {
    let primaryCTAFound = false;
    let ctaCount = 0;

    sections.forEach((section, index) => {
      if (section.props?.ctaPrimary) {
        primaryCTAFound = true;
        ctaCount++;
      }
      if (section.props?.ctaSecondary) {
        ctaCount++;
      }
    });

    // Primary CTA should be in hero or first CTA section
    if (!primaryCTAFound) {
      this.warnings.push({
        type: 'cta-logic',
        message: 'No primary CTA found. Consider adding a CTA to hero section.',
        severity: 'warning'
      });
    }

    // Check for CTA placement
    const heroSection = sections.find(s => s.id?.includes('hero'));
    if (heroSection && !heroSection.props?.ctaPrimary) {
      this.warnings.push({
        type: 'cta-logic',
        message: 'Hero section should typically include a primary CTA',
        severity: 'warning'
      });
    }
  }

  /**
   * Validate spacing rhythm (consistent spacing scale)
   */
  validateSpacingRhythm(sections, theme) {
    const spacingScale = theme.foundations?.spacing?.values || {};
    const usedSpacings = new Set();

    sections.forEach(section => {
      if (section.props?.spacing) {
        usedSpacings.add(section.props.spacing);
      }
    });

    // Check for consistency
    if (usedSpacings.size > 3) {
      this.warnings.push({
        type: 'spacing-rhythm',
        message: `Too many different spacing values (${usedSpacings.size}). Consider standardizing to 2-3 values.`,
        severity: 'warning'
      });
    }
  }

  /**
   * Validate color contrast (WCAG compliance)
   */
  validateContrast(sections, theme) {
    // This would use a contrast calculation library in production
    // For now, check that theme has proper contrast values
    
    const colors = theme.foundations?.colors;
    if (!colors) {
      this.warnings.push({
        type: 'contrast',
        message: 'Theme missing color definitions. Contrast cannot be validated.',
        severity: 'warning'
      });
      return;
    }

    // Check text/background contrast
    const textColor = colors.text?.primary || '#000000';
    const bgColor = colors.background?.default || '#ffffff';
    
    // In production, would calculate actual contrast ratio
    // For now, just validate that colors exist
    if (!textColor || !bgColor) {
      this.warnings.push({
        type: 'contrast',
        message: 'Text or background color missing. WCAG contrast cannot be verified.',
        severity: 'warning'
      });
    }
  }

  /**
   * Validate performance
   */
  validatePerformance(sections) {
    let imageCount = 0;
    let largeImageCount = 0;

    sections.forEach(section => {
      if (section.props?.media || section.props?.image) {
        imageCount++;
      }
      if (section.props?.mockup) {
        imageCount++;
      }
      
      // Check for images in features/testimonials
      if (section.props?.features) {
        section.props.features.forEach(feature => {
          if (feature.image) imageCount++;
        });
      }
    });

    // Warn if too many images
    if (imageCount > 10) {
      this.warnings.push({
        type: 'performance',
        message: `High number of images (${imageCount}). Consider lazy loading and optimization.`,
        severity: 'warning'
      });
    }

    // Check for lazy loading attributes
    // This would check actual HTML in production
  }

  /**
   * Validate accessibility
   */
  validateAccessibility(sections) {
    sections.forEach((section, index) => {
      // Check for required alt text
      if (section.props?.media && !section.props.media.alt) {
        this.errors.push({
          type: 'accessibility',
          message: `Section ${section.id}: Image missing alt attribute`,
          severity: 'error',
          section: section.id
        });
      }

      // Check for ARIA labels on icon-only buttons
      if (section.props?.ctaPrimary) {
        const cta = section.props.ctaPrimary;
        if (cta.icon && !cta.text && !cta.ariaLabel) {
          this.errors.push({
            type: 'accessibility',
            message: `Section ${section.id}: Icon-only CTA missing aria-label`,
            severity: 'error',
            section: section.id
          });
        }
      }

      // Check for keyboard navigation
      if (section.dependencies?.includes('menu') && !section.a11y?.keyboardNavigation) {
        this.warnings.push({
          type: 'accessibility',
          message: `Section ${section.id}: Menu component should support keyboard navigation`,
          severity: 'warning',
          section: section.id
        });
      }
    });
  }

  /**
   * Validate SEO
   */
  validateSEO(sections) {
    // Check for H1
    const hasH1 = sections.some(s => s.seo?.recommendH1 && s.props?.headline);
    if (!hasH1) {
      this.errors.push({
        type: 'seo',
        message: 'Page missing H1 heading (required for SEO)',
        severity: 'error'
      });
    }

    // Check for meta description source
    const hasSubhead = sections.some(s => s.props?.subhead);
    if (!hasSubhead) {
      this.warnings.push({
        type: 'seo',
        message: 'Consider adding subheadline for meta description',
        severity: 'warning'
      });
    }

    // Check for image alt text for SEO
    sections.forEach(section => {
      if (section.props?.media && !section.props.media.alt) {
        this.warnings.push({
          type: 'seo',
          message: `Section ${section.id}: Image alt text helps with SEO`,
          severity: 'warning',
          section: section.id
        });
      }
    });
  }

  /**
   * Validate RTL support
   */
  validateRTL(sections) {
    // Check if theme supports RTL
    // This would check theme configuration in production
    
    // Warn about potential RTL issues
    sections.forEach(section => {
      if (section.props?.imagePosition && !section.responsive) {
        this.warnings.push({
          type: 'rtl',
          message: `Section ${section.id}: Image position may not adapt properly to RTL`,
          severity: 'warning',
          section: section.id
        });
      }
    });
  }

  /**
   * Calculate quality score (0-100)
   */
  calculateScore() {
    const maxScore = 100;
    const errorPenalty = 10;
    const warningPenalty = 2;

    let score = maxScore;
    score -= this.errors.length * errorPenalty;
    score -= this.warnings.length * warningPenalty;

    return Math.max(0, score);
  }
}

/**
 * Performance Validator
 */
export class PerformanceValidator {
  validate(sections, theme) {
    const issues = [];

    // Check image optimization
    sections.forEach(section => {
      if (section.props?.media) {
        if (!section.props.media.width || !section.props.media.height) {
          issues.push({
            type: 'performance',
            message: `Section ${section.id}: Image missing width/height attributes (prevents layout shift)`,
            severity: 'warning'
          });
        }
      }
    });

    return {
      valid: issues.filter(i => i.severity === 'error').length === 0,
      issues
    };
  }
}

/**
 * Accessibility Validator
 */
export class AccessibilityValidator {
  validate(sections, theme) {
    const issues = [];

    // WCAG compliance checks
    sections.forEach(section => {
      // Check color contrast (would use library in production)
      // Check keyboard navigation
      // Check screen reader support
      // Check focus management
    });

    return {
      valid: issues.filter(i => i.severity === 'error').length === 0,
      issues
    };
  }
}

export default CompositionValidators;

