/**
 * CSS Variables Renderer
 * Generates clean CSS using CSS variables (tokens) instead of inline styles
 */

export class CSSVariablesRenderer {
  constructor(options = {}) {
    this.options = {
      generateClasses: true, // Generate utility classes
      minify: false,
      prefix: 'oxy', // CSS class prefix
      ...options
    };
  }

  /**
   * Render component to HTML + CSS
   * @param {Object} manifest - Component manifest
   * @param {Object} props - Component properties
   * @param {Object} theme - Theme configuration
   * @returns {Object} { html, css, classes }
   */
  render(manifest, props = {}, theme = {}) {
    const componentId = this.sanitizeId(manifest.id);
    const classes = this.generateClasses(manifest, props, theme);
    const html = this.generateHTML(manifest, props, classes, theme);
    const css = this.generateCSS(manifest, props, classes, theme);
    
    return {
      html,
      css,
      classes,
      metadata: {
        componentId: manifest.id,
        renderer: 'css-variables',
        theme: theme.id || 'default'
      }
    };
  }

  /**
   * Generate CSS classes for component
   */
  generateClasses(manifest, props, theme) {
    const componentId = this.sanitizeId(manifest.id);
    const classes = {
      base: `${this.options.prefix}-${componentId}`,
      variants: {},
      modifiers: {}
    };

    // Add variant classes
    if (props.variant) {
      classes.variants.variant = `${classes.base}--${props.variant}`;
    }

    // Add prop-based modifier classes
    Object.keys(props).forEach(key => {
      if (key !== 'variant' && props[key] !== undefined && props[key] !== null) {
        const value = String(props[key]).toLowerCase().replace(/\s+/g, '-');
        classes.modifiers[key] = `${classes.base}--${key}-${value}`;
      }
    });

    return classes;
  }

  /**
   * Generate HTML structure
   */
  generateHTML(manifest, props, classes, theme) {
    const componentId = this.sanitizeId(manifest.id);
    const baseClass = classes.base;
    const variantClass = classes.variants.variant || '';
    const modifierClasses = Object.values(classes.modifiers).join(' ');
    const allClasses = [baseClass, variantClass, modifierClasses].filter(Boolean).join(' ');

    // Generate HTML based on component type
    if (manifest.type === 'section') {
      return this.generateSectionHTML(manifest, props, allClasses, theme);
    }

    return this.generateComponentHTML(manifest, props, allClasses, theme);
  }

  /**
   * Generate section HTML
   */
  generateSectionHTML(manifest, props, classes, theme) {
    const { slots = {} } = manifest;
    
    let html = `<section class="${classes}"`;
    
    // Add data attributes
    html += ` data-component="${manifest.id}"`;
    if (props.variant) {
      html += ` data-variant="${props.variant}"`;
    }
    html += '>\n';

    // Container
    html += `  <div class="${this.options.prefix}-container">\n`;

    // Headline
    if (slots.headline && props.headline) {
      const headingLevel = manifest.seo?.recommendH1 ? 'h1' : 'h2';
      html += `    <${headingLevel} class="${this.options.prefix}-headline">${this.escapeHtml(props.headline)}</${headingLevel}>\n`;
    }

    // Subhead
    if (slots.subhead && props.subhead) {
      html += `    <p class="${this.options.prefix}-subhead">${this.escapeHtml(props.subhead)}</p>\n`;
    }

    // Content slots
    html += this.renderContentSlots(manifest, props, theme);

    html += `  </div>\n`;
    html += `</section>\n`;

    return html;
  }

  /**
   * Generate component HTML
   */
  generateComponentHTML(manifest, props, classes, theme) {
    // Default implementation - override in subclasses
    return `<div class="${classes}" data-component="${manifest.id}"></div>`;
  }

  /**
   * Render content slots
   */
  renderContentSlots(manifest, props, theme) {
    let html = '';
    const { slots = {} } = manifest;

    // Handle arrays (features, testimonials, etc.)
    if (manifest.id.includes('features') && props.features) {
      html += `    <div class="${this.options.prefix}-features-grid">\n`;
      props.features.forEach((feature, index) => {
        html += this.renderFeatureItem(feature, index, theme);
      });
      html += `    </div>\n`;
    }

    // Handle CTAs
    if (props.ctaPrimary) {
      html += this.renderButton(props.ctaPrimary, 'primary', theme);
    }
    if (props.ctaSecondary) {
      html += this.renderButton(props.ctaSecondary, 'secondary', theme);
    }

    return html;
  }

  /**
   * Render feature item
   */
  renderFeatureItem(feature, index, theme) {
    return `      <div class="${this.options.prefix}-feature-item" data-index="${index}">
        ${feature.icon ? `<span class="${this.options.prefix}-feature-icon" aria-hidden="true">${feature.icon}</span>` : ''}
        <h3 class="${this.options.prefix}-feature-title">${this.escapeHtml(feature.title || '')}</h3>
        ${feature.description ? `<p class="${this.options.prefix}-feature-description">${this.escapeHtml(feature.description)}</p>` : ''}
      </div>\n`;
  }

  /**
   * Render button
   */
  renderButton(cta, variant, theme) {
    const text = typeof cta === 'string' ? cta : (cta.text || '');
    const href = cta.href || '#';
    const buttonClass = `${this.options.prefix}-btn ${this.options.prefix}-btn--${variant}`;
    
    return `    <a href="${href}" class="${buttonClass}">${this.escapeHtml(text)}</a>\n`;
  }

  /**
   * Generate CSS with CSS variables
   */
  generateCSS(manifest, props, classes, theme) {
    const componentId = this.sanitizeId(manifest.id);
    const baseClass = `.${classes.base}`;
    let css = '';

    // CSS Variables from theme
    css += `/* CSS Variables for ${manifest.id} */\n`;
    css += `${baseClass} {\n`;
    css += this.generateCSSVariables(theme);
    css += '}\n\n';

    // Base styles
    css += `${baseClass} {\n`;
    css += this.generateBaseStyles(manifest, theme);
    css += '}\n\n';

    // Variant styles
    Object.entries(classes.variants).forEach(([key, className]) => {
      css += `.${className} {\n`;
      css += this.generateVariantStyles(manifest, props.variant, theme);
      css += '}\n\n';
    });

    // Modifier styles
    Object.entries(classes.modifiers).forEach(([key, className]) => {
      css += `.${className} {\n`;
      css += this.generateModifierStyles(manifest, key, props[key], theme);
      css += '}\n\n';
    });

    // Responsive styles
    if (manifest.responsive) {
      css += this.generateResponsiveStyles(manifest, classes, theme);
    }

    if (this.options.minify) {
      css = this.minifyCSS(css);
    }

    return css;
  }

  /**
   * Generate CSS variables from theme
   */
  generateCSSVariables(theme) {
    let vars = '';
    const foundations = theme.foundations || {};

    // Colors
    if (foundations.colors) {
      Object.entries(foundations.colors).forEach(([colorName, colorValue]) => {
        if (typeof colorValue === 'object') {
          Object.entries(colorValue).forEach(([shade, value]) => {
            vars += `  --color-${colorName}-${shade}: ${value};\n`;
          });
        } else {
          vars += `  --color-${colorName}: ${colorValue};\n`;
        }
      });
    }

    // Typography
    if (foundations.typography) {
      if (foundations.typography.fontSize) {
        Object.entries(foundations.typography.fontSize).forEach(([size, value]) => {
          vars += `  --font-size-${size}: ${value};\n`;
        });
      }
      if (foundations.typography.fontWeight) {
        Object.entries(foundations.typography.fontWeight).forEach(([weight, value]) => {
          vars += `  --font-weight-${weight}: ${value};\n`;
        });
      }
    }

    // Spacing
    if (foundations.spacing) {
      if (foundations.spacing.values) {
        Object.entries(foundations.spacing.values).forEach(([size, value]) => {
          vars += `  --spacing-${size}: ${value};\n`;
        });
      }
    }

    // Border radius
    if (foundations.borderRadius) {
      Object.entries(foundations.borderRadius).forEach(([size, value]) => {
        if (size !== 'system') {
          vars += `  --radius-${size}: ${value};\n`;
        }
      });
    }

    // Shadows
    if (foundations.shadows) {
      Object.entries(foundations.shadows).forEach(([size, value]) => {
        if (size !== 'system') {
          vars += `  --shadow-${size}: ${value};\n`;
        }
      });
    }

    return vars;
  }

  /**
   * Generate base styles
   */
  generateBaseStyles(manifest, theme) {
    return `  display: block;\n  width: 100%;\n`;
  }

  /**
   * Generate variant styles
   */
  generateVariantStyles(manifest, variant, theme) {
    // Variant-specific styles
    return '';
  }

  /**
   * Generate modifier styles
   */
  generateModifierStyles(manifest, propName, propValue, theme) {
    // Modifier-specific styles
    return '';
  }

  /**
   * Generate responsive styles
   */
  generateResponsiveStyles(manifest, classes, theme) {
    let css = '';
    const { responsive } = manifest;

    if (responsive.mobile) {
      css += `@media (max-width: 768px) {\n`;
      css += `  .${classes.base} {\n`;
      css += this.generateResponsiveRules(responsive.mobile, theme);
      css += `  }\n`;
      css += `}\n\n`;
    }

    if (responsive.tablet) {
      css += `@media (min-width: 769px) and (max-width: 1024px) {\n`;
      css += `  .${classes.base} {\n`;
      css += this.generateResponsiveRules(responsive.tablet, theme);
      css += `  }\n`;
      css += `}\n\n`;
    }

    if (responsive.desktop) {
      css += `@media (min-width: 1025px) {\n`;
      css += `  .${classes.base} {\n`;
      css += this.generateResponsiveRules(responsive.desktop, theme);
      css += `  }\n`;
      css += `}\n\n`;
    }

    return css;
  }

  /**
   * Generate responsive rules
   */
  generateResponsiveRules(breakpointRules, theme) {
    let rules = '';
    // Convert breakpoint rules to CSS
    return rules;
  }

  /**
   * Utility: Sanitize ID for CSS class
   */
  sanitizeId(id) {
    return id.replace(/[^a-z0-9]/gi, '-').toLowerCase();
  }

  /**
   * Utility: Escape HTML
   */
  escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, m => map[m]);
  }

  /**
   * Minify CSS
   */
  minifyCSS(css) {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/\s*([{}:;,])\s*/g, '$1') // Remove spaces around punctuation
      .trim();
  }
}

export default CSSVariablesRenderer;

