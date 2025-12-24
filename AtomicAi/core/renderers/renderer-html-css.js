/**
 * HTML/CSS Renderer
 * Renders components as clean, production-ready HTML and CSS
 */

export class HTMLCSSRenderer {
  constructor(options = {}) {
    this.options = {
      useCSSVariables: true,
      minify: false,
      separateCSS: false,
      ...options
    };
  }

  /**
   * Render a component to HTML/CSS
   * @param {Object} component - Component data from manifest
   * @param {Object} props - Component properties
   * @param {Object} theme - Theme configuration
   * @returns {Object} - { html, css, assets }
   */
  render(component, props = {}, theme = {}) {
    const componentId = component.id || 'component';
    const cssClasses = this.generateCSSClasses(componentId, props, theme);
    const html = this.generateHTML(component, props, cssClasses);
    const css = this.generateCSS(component, props, theme, cssClasses);

    return {
      html: this.options.minify ? this.minifyHTML(html) : html,
      css: this.options.minify ? this.minifyCSS(css) : css,
      assets: this.extractAssets(component, props),
      metadata: {
        componentId,
        renderer: 'html-css',
        theme: theme.id || 'default'
      }
    };
  }

  /**
   * Generate CSS classes based on component and props
   */
  generateCSSClasses(componentId, props, theme) {
    const classes = [`${componentId}`];
    
    if (props.variant) {
      classes.push(`${componentId}--${props.variant}`);
    }
    
    if (props.size) {
      classes.push(`${componentId}--size-${props.size}`);
    }
    
    if (props.disabled) {
      classes.push(`${componentId}--disabled`);
    }
    
    return classes.join(' ');
  }

  /**
   * Generate HTML structure
   */
  generateHTML(component, props, cssClasses) {
    // Base HTML structure based on component type
    switch (component.type) {
      case 'section':
        return this.renderSection(component, props, cssClasses);
      case 'molecule':
        return this.renderMolecule(component, props, cssClasses);
      case 'atom':
        return this.renderAtom(component, props, cssClasses);
      default:
        return this.renderGeneric(component, props, cssClasses);
    }
  }

  /**
   * Render section component
   */
  renderSection(component, props, cssClasses) {
    const slots = component.slots || {};
    let html = `<section class="${cssClasses}"`;
    
    // Add ARIA attributes
    if (component.a11y) {
      if (props.id) html += ` id="${props.id}"`;
      if (component.a11y.headlineShouldBeH1 && slots.headline) {
        html += ` aria-labelledby="${props.id}-headline"`;
      }
    }
    
    html += '>\n';
    
    // Render slots
    if (slots.badge && props.badge) {
      html += `  <div class="${component.id}__badge">${props.badge}</div>\n`;
    }
    
    if (slots.headline && props.headline) {
      const headingTag = component.seo?.recommendH1 ? 'h1' : 'h2';
      html += `  <${headingTag} class="${component.id}__headline"`;
      if (props.id && component.a11y?.headlineShouldBeH1) {
        html += ` id="${props.id}-headline"`;
      }
      html += `>${this.escapeHTML(props.headline)}</${headingTag}>\n`;
    }
    
    if (slots.subhead && props.subhead) {
      html += `  <p class="${component.id}__subhead">${this.escapeHTML(props.subhead)}</p>\n`;
    }
    
    if (slots.ctaPrimary && props.ctaPrimary) {
      html += `  <div class="${component.id}__ctas">\n`;
      html += this.renderButton(props.ctaPrimary, `${component.id}__cta-primary`);
      if (slots.ctaSecondary && props.ctaSecondary) {
        html += this.renderButton(props.ctaSecondary, `${component.id}__cta-secondary`);
      }
      html += `  </div>\n`;
    }
    
    if (slots.media && props.media) {
      html += `  <div class="${component.id}__media">\n`;
      html += `    <img src="${props.media.src}" alt="${props.media.alt || ''}"`;
      if (props.media.width) html += ` width="${props.media.width}"`;
      if (props.media.height) html += ` height="${props.media.height}"`;
      html += ` class="${component.id}__image" loading="lazy">\n`;
      html += `  </div>\n`;
    }
    
    html += '</section>';
    return html;
  }

  /**
   * Render molecule component
   */
  renderMolecule(component, props, cssClasses) {
    // Input component example
    if (component.id === 'input') {
      let html = `<div class="${cssClasses}">\n`;
      
      if (props.label) {
        html += `  <label for="${props.id}" class="${component.id}__label">`;
        if (props.required) html += '<span class="required">*</span> ';
        html += `${this.escapeHTML(props.label)}</label>\n`;
      }
      
      html += `  <div class="${component.id}__wrapper">\n`;
      if (props.leadingIcon) {
        html += `    <span class="${component.id}__icon ${component.id}__icon--leading">${props.leadingIcon}</span>\n`;
      }
      
      html += `    <input`;
      html += ` type="${props.type || 'text'}"`;
      html += ` id="${props.id}"`;
      html += ` name="${props.name || props.id}"`;
      if (props.value) html += ` value="${this.escapeHTML(props.value)}"`;
      if (props.placeholder) html += ` placeholder="${this.escapeHTML(props.placeholder)}"`;
      if (props.required) html += ` required aria-required="true"`;
      if (props.disabled) html += ` disabled aria-disabled="true"`;
      if (props.readonly) html += ` readonly`;
      if (props.errorMessage) html += ` aria-invalid="true" aria-describedby="${props.id}-error"`;
      if (props.helpText && !props.errorMessage) html += ` aria-describedby="${props.id}-help"`;
      html += ` class="${component.id}__input">\n`;
      
      if (props.trailingIcon) {
        html += `    <span class="${component.id}__icon ${component.id}__icon--trailing">${props.trailingIcon}</span>\n`;
      }
      html += `  </div>\n`;
      
      if (props.helpText && !props.errorMessage) {
        html += `  <p id="${props.id}-help" class="${component.id}__help">${this.escapeHTML(props.helpText)}</p>\n`;
      }
      
      if (props.errorMessage) {
        html += `  <p id="${props.id}-error" class="${component.id}__error" role="alert">${this.escapeHTML(props.errorMessage)}</p>\n`;
      }
      
      html += '</div>';
      return html;
    }
    
    return `<div class="${cssClasses}">Component: ${component.id}</div>`;
  }

  /**
   * Render atom component
   */
  renderAtom(component, props, cssClasses) {
    // Button component example
    if (component.id === 'button') {
      const tag = props.href ? 'a' : 'button';
      const attrs = [];
      
      if (props.href) {
        attrs.push(`href="${props.href}"`);
      } else {
        attrs.push(`type="${props.type || 'button'}"`);
      }
      
      if (props.disabled) {
        attrs.push('disabled', 'aria-disabled="true"');
        if (tag === 'a') attrs.push('tabindex="-1"');
      }
      
      if (props.loading) {
        attrs.push('aria-busy="true"');
      }
      
      if (component.constraints?.ariaLabelRequiredWhenIconOnly && props.iconOnly) {
        attrs.push(`aria-label="${this.escapeHTML(props['aria-label'] || props.children)}"`);
      }
      
      const fullWidthClass = props.fullWidth ? `${component.id}--full-width` : '';
      const allClasses = [cssClasses, fullWidthClass].filter(Boolean).join(' ');
      
      let html = `<${tag} class="${allClasses}" ${attrs.join(' ')}>`;
      
      if (props.loading) {
        html += '<span class="spinner" aria-hidden="true"></span> ';
      }
      
      if (props.icon && props.iconPosition !== 'right') {
        html += `<span class="${component.id}__icon ${component.id}__icon--leading" aria-hidden="true">${props.icon}</span> `;
      }
      
      if (!props.iconOnly) {
        html += `<span class="${component.id}__text">${this.escapeHTML(props.children || props.text || '')}</span>`;
      }
      
      if (props.icon && props.iconPosition === 'right') {
        html += ` <span class="${component.id}__icon ${component.id}__icon--trailing" aria-hidden="true">${props.icon}</span>`;
      }
      
      html += `</${tag}>`;
      return html;
    }
    
    return `<div class="${cssClasses}">Atom: ${component.id}</div>`;
  }

  /**
   * Render generic component
   */
  renderGeneric(component, props, cssClasses) {
    return `<div class="${cssClasses}">${component.id}</div>`;
  }

  /**
   * Render button helper
   */
  renderButton(buttonProps, cssClass) {
    const props = typeof buttonProps === 'string' ? { children: buttonProps } : buttonProps;
    return `    <button class="${cssClass}" type="button">${this.escapeHTML(props.children || props.text || '')}</button>\n`;
  }

  /**
   * Generate CSS from component and theme
   */
  generateCSS(component, props, theme, cssClasses) {
    const componentId = component.id;
    const foundations = theme.foundations || {};
    const colors = foundations.colors || {};
    const spacing = foundations.spacing || {};
    const typography = foundations.typography || {};
    
    let css = '';
    
    if (this.options.useCSSVariables) {
      css += this.generateCSSVariables(theme);
    }
    
    // Base component styles
    css += `.${componentId} {\n`;
    css += `  /* Base styles */\n`;
    css += '}\n\n';
    
    // Variant styles
    if (component.variants) {
      component.variants.forEach(variant => {
        css += `.${componentId}--${variant} {\n`;
        css += `  /* ${variant} variant styles */\n`;
        css += '}\n\n';
      });
    }
    
    // Size styles
    if (component.props?.size?.range) {
      component.props.size.range.forEach(size => {
        css += `.${componentId}--size-${size} {\n`;
        css += `  /* ${size} size styles */\n`;
        css += '}\n\n';
      });
    }
    
    // Responsive styles
    if (component.responsive) {
      css += this.generateResponsiveCSS(component, props, theme);
    }
    
    return css;
  }

  /**
   * Generate CSS variables from theme
   */
  generateCSSVariables(theme) {
    const foundations = theme.foundations || {};
    let css = ':root {\n';
    
    // Color variables
    if (foundations.colors) {
      Object.entries(foundations.colors).forEach(([category, values]) => {
        if (typeof values === 'object' && values !== null) {
          Object.entries(values).forEach(([key, value]) => {
            if (typeof value === 'string') {
              css += `  --color-${category}-${key}: ${value};\n`;
            }
          });
        }
      });
    }
    
    // Spacing variables
    if (foundations.spacing?.values) {
      Object.entries(foundations.spacing.values).forEach(([key, value]) => {
        css += `  --spacing-${key}: ${value};\n`;
      });
    }
    
    css += '}\n\n';
    return css;
  }

  /**
   * Generate responsive CSS
   */
  generateResponsiveCSS(component, props, theme) {
    let css = '';
    const responsive = component.responsive || {};
    
    if (responsive.mobile) {
      css += `@media (max-width: 768px) {\n`;
      css += `  .${component.id} {\n`;
      css += `    /* Mobile styles */\n`;
      css += `  }\n`;
      css += '}\n\n';
    }
    
    if (responsive.tablet) {
      css += `@media (min-width: 769px) and (max-width: 1024px) {\n`;
      css += `  .${component.id} {\n`;
      css += `    /* Tablet styles */\n`;
      css += `  }\n`;
      css += '}\n\n';
    }
    
    if (responsive.desktop) {
      css += `@media (min-width: 1025px) {\n`;
      css += `  .${component.id} {\n`;
      css += `    /* Desktop styles */\n`;
      css += `  }\n`;
      css += '}\n\n';
    }
    
    return css;
  }

  /**
   * Extract assets (images, fonts, etc.)
   */
  extractAssets(component, props) {
    const assets = {
      images: [],
      fonts: [],
      icons: []
    };
    
    // Extract images from slots
    if (component.slots) {
      Object.values(component.slots).forEach(slot => {
        if (slot.type === 'image' && props[slot.key]) {
          assets.images.push(props[slot.key]);
        }
      });
    }
    
    return assets;
  }

  /**
   * Escape HTML
   */
  escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Minify HTML
   */
  minifyHTML(html) {
    return html
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .trim();
  }

  /**
   * Minify CSS
   */
  minifyCSS(css) {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*{\s*/g, '{')
      .replace(/;\s*/g, ';')
      .replace(/\s*}\s*/g, '}')
      .trim();
  }
}

export default HTMLCSSRenderer;

