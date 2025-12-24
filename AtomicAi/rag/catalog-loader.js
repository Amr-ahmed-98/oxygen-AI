/**
 * Catalog Loader for RAG
 * Loads all manifests and prepares them for embedding/search
 */

import fs from 'fs';
import path from 'path';

export class CatalogLoader {
  constructor(catalogPath = './catalog') {
    this.catalogPath = catalogPath;
    this.manifests = new Map();
    this.index = {
      byLevel: { atom: [], molecule: [], organism: [], section: [], layout: [], page: [] },
      byCategory: {},
      byTag: {},
      byPlatform: { web: [], mobile: [], desktop: [] }
    };
  }

  /**
   * Load all manifests from catalog
   */
  async loadAll() {
    const levels = ['atoms-complete', 'molecules-complete', 'organisms-complete', 'layouts-complete', 'pages-complete'];
    
    for (const level of levels) {
      await this.loadLevel(level);
    }

    // Load sections
    await this.loadSections();

    return {
      manifests: Array.from(this.manifests.values()),
      index: this.index,
      total: this.manifests.size
    };
  }

  /**
   * Load manifests from a level directory
   */
  async loadLevel(levelName) {
    const manifestPath = path.join(this.catalogPath, '..', levelName, 'manifests');
    
    if (!fs.existsSync(manifestPath)) {
      return;
    }

    const files = fs.readdirSync(manifestPath)
      .filter(f => f.endsWith('.manifest.json'));

    for (const file of files) {
      try {
        const content = JSON.parse(fs.readFileSync(path.join(manifestPath, file), 'utf-8'));
        this.addManifest(content);
      } catch (error) {
        console.warn(`Failed to load manifest: ${file}`, error);
      }
    }
  }

  /**
   * Load sections from molecules-complete
   */
  async loadSections() {
    const sectionsPath = path.join(this.catalogPath, '..', 'molecules-complete', 'sections');
    
    if (!fs.existsSync(sectionsPath)) {
      return;
    }

    const files = fs.readdirSync(sectionsPath)
      .filter(f => f.endsWith('.manifest.json'));

    for (const file of files) {
      try {
        const content = JSON.parse(fs.readFileSync(path.join(sectionsPath, file), 'utf-8'));
        this.addManifest(content);
      } catch (error) {
        console.warn(`Failed to load section: ${file}`, error);
      }
    }
  }

  /**
   * Add manifest to index
   */
  addManifest(manifest) {
    this.manifests.set(manifest.id, manifest);

    // Index by level
    const level = manifest.level || 'section';
    if (this.index.byLevel[level]) {
      this.index.byLevel[level].push(manifest.id);
    }

    // Index by category
    if (manifest.category) {
      manifest.category.forEach(cat => {
        if (!this.index.byCategory[cat]) {
          this.index.byCategory[cat] = [];
        }
        this.index.byCategory[cat].push(manifest.id);
      });
    }

    // Index by tag
    if (manifest.tags) {
      manifest.tags.forEach(tag => {
        if (!this.index.byTag[tag]) {
          this.index.byTag[tag] = [];
        }
        this.index.byTag[tag].push(manifest.id);
      });
    }

    // Index by platform
    if (manifest.platformSupport) {
      Object.keys(manifest.platformSupport).forEach(platform => {
        if (manifest.platformSupport[platform]) {
          this.index.byPlatform[platform].push(manifest.id);
        }
      });
    }
  }

  /**
   * Search manifests by query
   */
  search(query, options = {}) {
    const {
      level,
      category,
      tags = [],
      platform,
      limit = 10
    } = options;

    let results = Array.from(this.manifests.values());

    // Filter by level
    if (level) {
      results = results.filter(m => m.level === level);
    }

    // Filter by category
    if (category) {
      results = results.filter(m => m.category?.includes(category));
    }

    // Filter by tags (any match)
    if (tags.length > 0) {
      results = results.filter(m => 
        tags.some(tag => m.tags?.includes(tag))
      );
    }

    // Filter by platform
    if (platform) {
      results = results.filter(m => 
        m.platformSupport?.[platform] === true
      );
    }

    // Text search in title, description, tags
    if (query) {
      const queryLower = query.toLowerCase();
      results = results
        .map(m => ({
          manifest: m,
          score: this.calculateScore(m, queryLower)
        }))
        .filter(r => r.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(r => r.manifest);
    } else {
      results = results.slice(0, limit);
    }

    return results;
  }

  /**
   * Calculate relevance score
   */
  calculateScore(manifest, query) {
    let score = 0;

    // Title match (highest weight)
    if (manifest.title?.toLowerCase().includes(query)) {
      score += 10;
    }

    // Description match
    if (manifest.description?.toLowerCase().includes(query)) {
      score += 5;
    }

    // Tag match
    if (manifest.tags?.some(tag => tag.toLowerCase().includes(query))) {
      score += 3;
    }

    // Category match
    if (manifest.category?.some(cat => cat.toLowerCase().includes(query))) {
      score += 2;
    }

    return score;
  }

  /**
   * Get manifest by ID
   */
  getById(id) {
    return this.manifests.get(id);
  }

  /**
   * Get related manifests (by category/tags)
   */
  getRelated(manifestId, limit = 5) {
    const manifest = this.getById(manifestId);
    if (!manifest) return [];

    const categories = manifest.category || [];
    const tags = manifest.tags || [];

    const related = this.search(null, {
      category: categories[0],
      tags: tags.slice(0, 2),
      limit: limit + 1
    }).filter(m => m.id !== manifestId);

    return related.slice(0, limit);
  }

  /**
   * Export for embedding
   */
  exportForEmbedding() {
    return Array.from(this.manifests.values()).map(m => ({
      id: m.id,
      level: m.level,
      title: m.title,
      description: m.description,
      category: m.category,
      tags: m.tags,
      whenToUse: m.whenToUse,
      whenNotToUse: m.whenNotToUse,
      slots: m.slots ? Object.keys(m.slots) : [],
      props: m.props ? Object.keys(m.props) : [],
      dependencies: m.dependencies || [],
      platformSupport: m.platformSupport || {}
    }));
  }
}

export default CatalogLoader;

