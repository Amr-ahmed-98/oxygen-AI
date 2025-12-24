/**
 * React Renderer
 * Renders components as React functional components
 */

export class ReactRenderer {
  constructor(options = {}) {
    this.options = {
      useTypeScript: false,
      useNamedExports: true,
      includeProps: true,
      ...options
    };
  }

  /**
   * Render a component to React
   * @param {Object} component - Component data from manifest
   * @param {Object} props - Component properties
   * @param {Object} theme - Theme configuration
   * @returns {Object} - { component, imports, types }
   */
  render(component, props = {}, theme = {}) {
    const componentName = this.toPascalCase(component.id);
    const imports = this.generateImports(component, theme);
    const componentCode = this.generateComponent(component, props, componentName);
    const types = this.options.useTypeScript ? this.generateTypes(component) : null;

    return {
      component: componentCode,
      imports: imports.join('\n'),
      types,
      metadata: {
        componentId: component.id,
        componentName,
        renderer: 'react',
        theme: theme.id || 'default'
      }
    };
  }

  /**
   * Generate React imports
   */
  generateImports(component, theme) {
    const imports = ['import React from \'react\';'];
    
    // Add style imports if needed
    if (this.options.includeStyles) {
      imports.push(`import './${component.id}.css';`);
    }
    
    // Add dependencies
    if (component.dependencies) {
      component.dependencies.forEach(dep => {
        const depName = this.toPascalCase(dep);
        imports.push(`import { ${depName} } from './${dep}';`);
      });
    }
    
    return imports;
  }

  /**
   * Generate React component code
   */
  generateComponent(component, props, componentName) {
    const ext = this.options.useTypeScript ? 'tsx' : 'jsx';
    const propsType = this.options.useTypeScript ? `: ${componentName}Props` : '';
    const propsInterface = this.generatePropsInterface(component);
    
    let code = '';
    
    // Props interface/type
    if (this.options.useTypeScript && propsInterface) {
      code += `export interface ${componentName}Props {\n`;
      code += propsInterface;
      code += '}\n\n';
    }
    
    // Component function
    code += `export const ${componentName} = (props${propsType}) => {\n`;
    
    // Destructure props
    const propKeys = Object.keys(component.props || {});
    if (propKeys.length > 0) {
      const defaultProps = this.generateDefaultProps(component);
      code += `  const {\n`;
      propKeys.forEach(key => {
        code += `    ${key} = ${defaultProps[key] || 'undefined'},\n`;
      });
      code += `    ...rest\n`;
      code += `  } = props;\n\n`;
    }
    
    // Generate JSX based on component type
    code += `  return (\n`;
    code += this.generateJSX(component, props);
    code += `  );\n`;
    code += '};\n\n';
    
    code += `export default ${componentName};\n`;
    
    return code;
  }

  /**
   * Generate JSX
   */
  generateJSX(component, props) {
    const componentId = component.id;
    const slots = component.slots || {};
    
    switch (component.type) {
      case 'section':
        return this.generateSectionJSX(component, props, slots);
      case 'molecule':
        return this.generateMoleculeJSX(component, props, slots);
      case 'atom':
        return this.generateAtomJSX(component, props);
      default:
        return `    <div className="${componentId}">${component.name}</div>\n`;
    }
  }

  /**
   * Generate section JSX
   */
  generateSectionJSX(component, props, slots) {
    const componentId = component.id;
    let jsx = `    <section className="${componentId}"`;
    
    if (props.id) {
      jsx += ` id={${props.id}}`;
    }
    
    jsx += '>\n';
    
    if (slots.badge && props.badge) {
      jsx += `      <div className="${componentId}__badge">{${props.badge}}</div>\n`;
    }
    
    if (slots.headline && props.headline) {
      const headingTag = component.seo?.recommendH1 ? 'h1' : 'h2';
      jsx += `      <${headingTag} className="${componentId}__headline"`;
      if (props.id && component.a11y?.headlineShouldBeH1) {
        jsx += ` id={\`${props.id}-headline\`}`;
      }
      jsx += `>{${props.headline}}</${headingTag}>\n`;
    }
    
    if (slots.subhead && props.subhead) {
      jsx += `      <p className="${componentId}__subhead">{${props.subhead}}</p>\n`;
    }
    
    if (slots.ctaPrimary && props.ctaPrimary) {
      jsx += `      <div className="${componentId}__ctas">\n`;
      jsx += this.generateButtonJSX(props.ctaPrimary, `${componentId}__cta-primary`);
      if (slots.ctaSecondary && props.ctaSecondary) {
        jsx += this.generateButtonJSX(props.ctaSecondary, `${componentId}__cta-secondary`);
      }
      jsx += `      </div>\n`;
    }
    
    if (slots.media && props.media) {
      jsx += `      <div className="${componentId}__media">\n`;
      jsx += `        <img src={${props.media.src}} alt={${props.media.alt || '\'\''}}`;
      if (props.media.width) jsx += ` width={${props.media.width}}`;
      if (props.media.height) jsx += ` height={${props.media.height}}`;
      jsx += ` className="${componentId}__image" loading="lazy" />\n`;
      jsx += `      </div>\n`;
    }
    
    jsx += `    </section>\n`;
    return jsx;
  }

  /**
   * Generate molecule JSX
   */
  generateMoleculeJSX(component, props, slots) {
    const componentId = component.id;
    
    if (component.id === 'input') {
      let jsx = `    <div className="${componentId}">\n`;
      
      if (props.label) {
        jsx += `      <label htmlFor={${props.id}} className="${componentId}__label">\n`;
        if (props.required) jsx += `        <span className="required">*</span> `;
        jsx += `        {${props.label}}\n`;
        jsx += `      </label>\n`;
      }
      
      jsx += `      <div className="${componentId}__wrapper">\n`;
      if (props.leadingIcon) {
        jsx += `        <span className="${componentId}__icon ${componentId}__icon--leading">{${props.leadingIcon}}</span>\n`;
      }
      
      jsx += `        <input\n`;
      jsx += `          type={${props.type || '\'text\''}}\n`;
      jsx += `          id={${props.id}}\n`;
      jsx += `          name={${props.name || props.id}}\n`;
      if (props.value) jsx += `          value={${props.value}}\n`;
      if (props.placeholder) jsx += `          placeholder={${props.placeholder}}\n`;
      if (props.required) jsx += `          required\n          aria-required={true}\n`;
      if (props.disabled) jsx += `          disabled\n          aria-disabled={true}\n`;
      if (props.readonly) jsx += `          readOnly\n`;
      if (props.errorMessage) jsx += `          aria-invalid={true}\n          aria-describedby={\`${props.id}-error\`}\n`;
      if (props.helpText && !props.errorMessage) jsx += `          aria-describedby={\`${props.id}-help\`}\n`;
      jsx += `          className="${componentId}__input"\n`;
      jsx += `        />\n`;
      
      if (props.trailingIcon) {
        jsx += `        <span className="${componentId}__icon ${componentId}__icon--trailing">{${props.trailingIcon}}</span>\n`;
      }
      jsx += `      </div>\n`;
      
      if (props.helpText && !props.errorMessage) {
        jsx += `      <p id={\`${props.id}-help\`} className="${componentId}__help">{${props.helpText}}</p>\n`;
      }
      
      if (props.errorMessage) {
        jsx += `      <p id={\`${props.id}-error\`} className="${componentId}__error" role="alert">{${props.errorMessage}}</p>\n`;
      }
      
      jsx += `    </div>\n`;
      return jsx;
    }
    
    return `    <div className="${componentId}">Molecule: ${component.id}</div>\n`;
  }

  /**
   * Generate atom JSX
   */
  generateAtomJSX(component, props) {
    const componentId = component.id;
    
    if (component.id === 'button') {
      const Tag = props.href ? 'a' : 'button';
      const attrs = [];
      
      if (props.href) {
        attrs.push(`href={${props.href}}`);
      } else {
        attrs.push(`type={${props.type || '\'button\''}}`);
      }
      
      if (props.disabled) {
        attrs.push('disabled', 'aria-disabled={true}');
        if (Tag === 'a') attrs.push('tabIndex={-1}');
      }
      
      if (props.loading) {
        attrs.push('aria-busy={true}');
      }
      
      if (component.constraints?.ariaLabelRequiredWhenIconOnly && props.iconOnly) {
        attrs.push(`aria-label={${props['aria-label'] || props.children}}`);
      }
      
      const classNames = [
        componentId,
        props.variant && `${componentId}--${props.variant}`,
        props.size && `${componentId}--size-${props.size}`,
        props.fullWidth && `${componentId}--full-width`,
        props.disabled && `${componentId}--disabled`,
        props.loading && `${componentId}--loading`
      ].filter(Boolean).join(' ');
      
      let jsx = `    <${Tag} className="${classNames}" ${attrs.join(' ')}>\n`;
      
      if (props.loading) {
        jsx += `      <span className="spinner" aria-hidden="true"></span>\n`;
      }
      
      if (props.icon && props.iconPosition !== 'right') {
        jsx += `      <span className="${componentId}__icon ${componentId}__icon--leading" aria-hidden="true">{${props.icon}}</span>\n`;
      }
      
      if (!props.iconOnly) {
        jsx += `      <span className="${componentId}__text">{${props.children || props.text || ''}}</span>\n`;
      }
      
      if (props.icon && props.iconPosition === 'right') {
        jsx += `      <span className="${componentId}__icon ${componentId}__icon--trailing" aria-hidden="true">{${props.icon}}</span>\n`;
      }
      
      jsx += `    </${Tag}>\n`;
      return jsx;
    }
    
    return `    <div className="${componentId}">Atom: ${component.id}</div>\n`;
  }

  /**
   * Generate button JSX helper
   */
  generateButtonJSX(buttonProps, className) {
    const props = typeof buttonProps === 'string' ? { children: buttonProps } : buttonProps;
    return `        <button className="${className}" type="button">{${props.children || props.text || ''}}</button>\n`;
  }

  /**
   * Generate props interface for TypeScript
   */
  generatePropsInterface(component) {
    if (!component.props) return '';
    
    let interfaceCode = '';
    Object.entries(component.props).forEach(([key, prop]) => {
      const type = this.jsTypeToTS(prop.type, prop.range);
      const optional = prop.required ? '' : '?';
      interfaceCode += `  ${key}${optional}: ${type};\n`;
    });
    
    return interfaceCode;
  }

  /**
   * Convert JS type to TypeScript
   */
  jsTypeToTS(type, range) {
    switch (type) {
      case 'string':
        if (range && Array.isArray(range)) {
          return range.map(r => `'${r}'`).join(' | ');
        }
        return 'string';
      case 'number':
        return 'number';
      case 'boolean':
        return 'boolean';
      case 'array':
        return 'any[]';
      case 'object':
        return 'Record<string, any>';
      default:
        return 'any';
    }
  }

  /**
   * Generate default props
   */
  generateDefaultProps(component) {
    const defaults = {};
    if (component.props) {
      Object.entries(component.props).forEach(([key, prop]) => {
        if (prop.default !== undefined) {
          defaults[key] = this.formatDefaultValue(prop.default, prop.type);
        }
      });
    }
    return defaults;
  }

  /**
   * Format default value for JS
   */
  formatDefaultValue(value, type) {
    if (type === 'string') {
      return `'${value}'`;
    }
    if (type === 'boolean' || type === 'number') {
      return String(value);
    }
    return JSON.stringify(value);
  }

  /**
   * Generate TypeScript types file
   */
  generateTypes(component) {
    const componentName = this.toPascalCase(component.id);
    return `export interface ${componentName}Props {
  // Generated from manifest
}
`;
  }

  /**
   * Convert kebab-case to PascalCase
   */
  toPascalCase(str) {
    return str
      .split(/[-_]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
}

export default ReactRenderer;

