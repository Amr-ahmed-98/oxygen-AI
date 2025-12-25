/**
 * Next.js Renderer
 * Renders components optimized for Next.js with App Router support
 */

import { ReactRenderer } from './renderer-react.js';

export class NextJSRenderer extends ReactRenderer {
  constructor(options = {}) {
    super({
      ...options,
      useAppRouter: options.useAppRouter !== false, // Default to App Router
      useServerComponents: options.useServerComponents !== false
    });
  }

  /**
   * Render a component for Next.js
   * @param {Object} component - Component data from manifest
   * @param {Object} props - Component properties
   * @param {Object} theme - Theme configuration
   * @returns {Object} - { component, imports, types, metadata }
   */
  render(component, props = {}, theme = {}) {
    const baseResult = super.render(component, props, theme);
    
    // Add Next.js specific optimizations
    const nextImports = this.generateNextImports(component);
    const metadata = this.generateMetadata(component, props);
    const componentCode = this.optimizeForNextJS(baseResult.component, component);
    
    return {
      ...baseResult,
      component: componentCode,
      imports: [baseResult.imports, ...nextImports].filter(Boolean).join('\n'),
      metadata,
      nextjs: {
        serverComponent: this.options.useServerComponents,
        appRouter: this.options.useAppRouter,
        ...metadata
      }
    };
  }

  /**
   * Generate Next.js specific imports
   */
  generateNextImports(component) {
    const imports = [];
    
    // Add Next.js Image if component uses images
    if (this.hasImages(component)) {
      imports.push("import Image from 'next/image';");
    }
    
    // Add Next.js Link if component uses links
    if (this.hasLinks(component)) {
      imports.push("import Link from 'next/link';");
    }
    
    // Add metadata export for pages
    if (component.type === 'section' && component.seo) {
      imports.push("import { Metadata } from 'next';");
    }
    
    return imports;
  }

  /**
   * Optimize component code for Next.js
   */
  optimizeForNextJS(componentCode, component) {
    let optimized = componentCode;
    
    // Replace img tags with Next.js Image
    if (this.hasImages(component)) {
      optimized = optimized.replace(
        /<img\s+([^>]*?)>/g,
        (match, attrs) => {
          // Extract src, alt, width, height
          const srcMatch = attrs.match(/src=\{([^}]+)\}/);
          const altMatch = attrs.match(/alt=\{([^}]+)\}/);
          const widthMatch = attrs.match(/width=\{([^}]+)\}/);
          const heightMatch = attrs.match(/height=\{([^}]+)\}/);
          
          let newAttrs = '';
          if (srcMatch) newAttrs += `src={${srcMatch[1]}} `;
          if (altMatch) newAttrs += `alt={${altMatch[1]}} `;
          if (widthMatch) newAttrs += `width={${widthMatch[1]}} `;
          if (heightMatch) newAttrs += `height={${heightMatch[1]}} `;
          newAttrs += 'loading="lazy"';
          
          return `<Image ${newAttrs} />`;
        }
      );
    }
    
    // Add 'use client' directive if component is interactive
    if (this.isInteractive(component) && this.options.useAppRouter) {
      optimized = "'use client';\n\n" + optimized;
    }
    
    return optimized;
  }

  /**
   * Generate Next.js metadata
   */
  generateMetadata(component, props) {
    if (component.type !== 'section' || !component.seo) {
      return null;
    }
    
    const metadata = {
      title: props.headline || component.name,
      description: props.subhead || component.description
    };
    
    if (props.media?.src) {
      metadata.openGraph = {
        images: [props.media.src]
      };
    }
    
    return metadata;
  }

  /**
   * Check if component uses images
   */
  hasImages(component) {
    if (!component.slots) return false;
    return Object.values(component.slots).some(slot => slot.type === 'image');
  }

  /**
   * Check if component uses links
   */
  hasLinks(component) {
    if (!component.slots) return false;
    return Object.values(component.slots).some(slot => 
      slot.type === 'link' || slot.type === 'button'
    );
  }

  /**
   * Check if component is interactive (requires client-side JS)
   */
  isInteractive(component) {
    // Check if component has interactive props or behaviors
    const interactiveProps = ['onClick', 'onChange', 'onSubmit', 'href'];
    if (component.props) {
      return Object.keys(component.props).some(key => 
        interactiveProps.some(prop => key.toLowerCase().includes(prop.toLowerCase()))
      );
    }
    
    // Check component type
    return ['button', 'input', 'form', 'menu', 'modal', 'dropdown'].some(type =>
      component.id?.toLowerCase().includes(type)
    );
  }

  /**
   * Generate file structure for Next.js App Router
   */
  generateFileStructure(component, props, theme) {
    const componentName = this.toPascalCase(component.id);
    const basePath = this.options.useAppRouter 
      ? `app/components/${component.id}`
      : `components/${component.id}`;
    
    return {
      [`${basePath}/${componentName}.${this.options.useTypeScript ? 'tsx' : 'jsx'}`]: this.render(component, props, theme).component,
      [`${basePath}/${componentName}.module.css`]: this.generateCSSModule(component, theme),
      [`${basePath}/index.${this.options.useTypeScript ? 'ts' : 'js'}`]: `export { default } from './${componentName}';`
    };
  }

  /**
   * Generate CSS Module
   */
  generateCSSModule(component, theme) {
    // Generate CSS Module styles
    return `.${component.id} {\n  /* Component styles */\n}\n`;
  }
}

export default NextJSRenderer;

