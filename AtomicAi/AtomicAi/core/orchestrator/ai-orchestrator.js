/**
 * AI Orchestrator
 * Main orchestrator that coordinates the entire site generation pipeline
 */

import { SiteSpecParser } from './site-spec-parser.js';
import { CatalogRetriever } from './catalog-retriever.js';
import { Composer } from '../composer/composer.js';
import { CSSVariablesRenderer } from '../renderers/renderer-css-variables.js';

export class AIOrchestrator {
  constructor(options = {}) {
    this.parser = new SiteSpecParser();
    this.catalog = new CatalogRetriever();
    this.composer = new Composer(options.composerOptions || {});
    this.renderer = new CSSVariablesRenderer(options.rendererOptions || {});
  }

  /**
   * Generate complete site from brief
   * @param {string} brief - Natural language brief
   * @param {Object} options - Generation options
   * @returns {Promise<Object>} Generated site with pages, CSS, etc.
   */
  async generateSite(brief, options = {}) {
    // Step 1: Parse brief to Site Spec
    const siteSpec = this.parser.parse(brief);
    
    // Step 2: Retrieve sections from catalog
    const sections = await this.catalog.getRecommendedSections(siteSpec);
    
    // Step 3: Get theme
    const themeId = this.catalog.getTheme(siteSpec);
    const theme = await this.loadTheme(themeId);
    
    // Step 4: Compose pages
    const composition = this.composer.compose(sections, theme);
    
    if (!composition.valid) {
      throw new Error(`Composition validation failed: ${JSON.stringify(composition.errors)}`);
    }
    
    // Step 5: Fill content slots (simplified - would use AI/content generator in production)
    const filledSections = this.fillContentSlots(composition.sections, siteSpec);
    
    // Step 6: Render pages
    const pages = await this.renderPages(filledSections, theme);
    
    // Step 7: QA Pass
    const qaResult = await this.runQA(pages, siteSpec);
    
    return {
      siteSpec,
      pages,
      theme,
      qa: qaResult,
      metadata: {
        generatedAt: new Date().toISOString(),
        siteType: siteSpec.siteType,
        theme: themeId,
        pageCount: pages.length
      }
    };
  }

  /**
   * Load theme
   */
  async loadTheme(themeId) {
    try {
      const theme = await import(`../themes/${themeId}.json`);
      return theme.default || theme;
    } catch (error) {
      throw new Error(`Theme not found: ${themeId}`);
    }
  }

  /**
   * Fill content slots with generated/real content
   */
  fillContentSlots(sections, siteSpec) {
    // In production, this would use an AI content generator
    // For now, use placeholders or site spec content
    return sections.map(section => {
      const filled = { ...section };
      
      // Fill headline if missing
      if (!filled.props?.headline && siteSpec.content?.headline) {
        filled.props = filled.props || {};
        filled.props.headline = siteSpec.content.headline;
      }
      
      // Fill subhead if missing
      if (!filled.props?.subhead && siteSpec.content?.description) {
        filled.props.subhead = siteSpec.content.description.substring(0, 180);
      }
      
      return filled;
    });
  }

  /**
   * Render all pages
   */
  async renderPages(sections, theme) {
    const pages = [];
    
    // Group sections into pages (simplified - assumes single page for now)
    const page = {
      id: 'home',
      sections: sections
    };
    
    // Render each section
    const renderedSections = [];
    for (const section of sections) {
      const rendered = this.renderer.render(section, section.props || {}, theme);
      renderedSections.push(rendered);
    }
    
    // Combine into page HTML/CSS
    const pageHTML = this.combineSectionHTML(renderedSections);
    const pageCSS = this.combineSectionCSS(renderedSections);
    
    pages.push({
      id: page.id,
      html: pageHTML,
      css: pageCSS,
      sections: renderedSections
    });
    
    return pages;
  }

  /**
   * Combine section HTML into page
   */
  combineSectionHTML(renderedSections) {
    const htmlParts = [];
    
    htmlParts.push('<!DOCTYPE html>');
    htmlParts.push('<html lang="en">');
    htmlParts.push('<head>');
    htmlParts.push('  <meta charset="UTF-8">');
    htmlParts.push('  <meta name="viewport" content="width=device-width, initial-scale=1.0">');
    htmlParts.push('  <title>Generated Site</title>');
    htmlParts.push('  <style>');
    htmlParts.push('    /* CSS will be injected here */');
    htmlParts.push('  </style>');
    htmlParts.push('</head>');
    htmlParts.push('<body>');
    
    // Add each section's HTML
    renderedSections.forEach(section => {
      htmlParts.push(section.html);
    });
    
    htmlParts.push('</body>');
    htmlParts.push('</html>');
    
    return htmlParts.join('\n');
  }

  /**
   * Combine section CSS
   */
  combineSectionCSS(renderedSections) {
    const cssParts = [];
    
    // Add base reset and variables
    cssParts.push('/* Base Styles */');
    cssParts.push('* { box-sizing: border-box; margin: 0; padding: 0; }');
    cssParts.push('body { font-family: system-ui, -apple-system, sans-serif; }');
    cssParts.push('');
    
    // Add each section's CSS
    renderedSections.forEach(section => {
      cssParts.push(`/* ${section.metadata.componentId} */`);
      cssParts.push(section.css);
      cssParts.push('');
    });
    
    return cssParts.join('\n');
  }

  /**
   * Run QA validation
   */
  async runQA(pages, siteSpec) {
    const issues = [];
    const warnings = [];
    
    // Check for required pages
    const requiredPages = siteSpec.pages || ['home'];
    const generatedPageIds = pages.map(p => p.id);
    requiredPages.forEach(required => {
      if (!generatedPageIds.includes(required)) {
        warnings.push(`Required page not generated: ${required}`);
      }
    });
    
    // Check HTML validity (basic checks)
    pages.forEach(page => {
      // Check for H1
      if (!page.html.includes('<h1')) {
        warnings.push(`Page ${page.id}: No H1 found`);
      }
      
      // Check for images without alt
      const imagesWithoutAlt = (page.html.match(/<img(?!.*alt=)/g) || []).length;
      if (imagesWithoutAlt > 0) {
        issues.push(`Page ${page.id}: ${imagesWithoutAlt} image(s) without alt attribute`);
      }
    });
    
    // Check accessibility requirements
    if (siteSpec.requirements?.accessibility) {
      // Additional a11y checks would go here
    }
    
    return {
      passed: issues.length === 0,
      issues,
      warnings,
      score: this.calculateQualityScore(issues, warnings)
    };
  }

  /**
   * Calculate quality score
   */
  calculateQualityScore(issues, warnings) {
    const maxScore = 100;
    const issuePenalty = 10;
    const warningPenalty = 2;
    
    let score = maxScore;
    score -= issues.length * issuePenalty;
    score -= warnings.length * warningPenalty;
    
    return Math.max(0, score);
  }
}

export default AIOrchestrator;

