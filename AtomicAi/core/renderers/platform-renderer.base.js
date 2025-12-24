/**
 * Platform Renderer Base
 * Base class for platform-specific renderers (Web, Mobile, Desktop)
 */

export class PlatformRenderer {
  constructor(platform, options = {}) {
    this.platform = platform; // 'web', 'mobile', 'desktop'
    this.options = options;
  }

  /**
   * Render app from spec
   */
  async renderApp(appSpec) {
    throw new Error('Not implemented - implement in subclass');
  }

  /**
   * Render module
   */
  async renderModule(moduleSpec, entitySpecs) {
    throw new Error('Not implemented - implement in subclass');
  }

  /**
   * Render entity views
   */
  async renderEntityViews(entitySpec) {
    throw new Error('Not implemented - implement in subclass');
  }

  /**
   * Render component
   */
  async renderComponent(componentSpec, props, theme) {
    throw new Error('Not implemented - implement in subclass');
  }

  /**
   * Generate file structure
   */
  generateFileStructure(appSpec) {
    throw new Error('Not implemented - implement in subclass');
  }

  /**
   * Get platform-specific adaptions
   */
  getPlatformAdaptations(entitySpec) {
    const adaptations = entitySpec.module?.platformAdaptations?.[this.platform];
    return adaptations || {};
  }

  /**
   * Map design tokens
   */
  mapDesignTokens(tokens) {
    const { TokenMapper } = require('../design-tokens/platform-tokens.js');
    const mapper = new TokenMapper(this.platform);
    return mapper.mapAll();
  }
}

export default PlatformRenderer;

