/**
 * Site Spec Parser
 * Parses natural language brief into structured Site Spec JSON
 */

export class SiteSpecParser {
  constructor() {
    this.siteTypes = ['saas', 'agency', 'portfolio', 'ecommerce', 'blog'];
    this.themes = ['minimal-clean', 'saas-modern', 'agency-bold', 'portfolio-editorial', 'ecommerce-premium'];
  }

  /**
   * Parse brief into Site Spec
   * @param {string} brief - Natural language brief
   * @returns {Object} Site Spec JSON
   */
  parse(brief) {
    const spec = {
      siteType: this.detectSiteType(brief),
      theme: this.detectTheme(brief),
      brandTone: this.detectBrandTone(brief),
      audience: this.detectAudience(brief),
      primaryGoal: this.detectPrimaryGoal(brief),
      pages: this.extractPages(brief),
      sections: this.extractSections(brief),
      content: this.extractContent(brief),
      requirements: this.extractRequirements(brief)
    };

    return spec;
  }

  /**
   * Detect site type from brief
   */
  detectSiteType(brief) {
    const lowerBrief = brief.toLowerCase();
    
    if (lowerBrief.match(/\b(saas|software|app|platform|tool|service)\b/)) {
      return 'saas';
    }
    if (lowerBrief.match(/\b(agency|creative|design|studio|marketing)\b/)) {
      return 'agency';
    }
    if (lowerBrief.match(/\b(portfolio|personal|showcase|work|projects)\b/)) {
      return 'portfolio';
    }
    if (lowerBrief.match(/\b(ecommerce|shop|store|product|cart|checkout|buy|sell)\b/)) {
      return 'ecommerce';
    }
    if (lowerBrief.match(/\b(blog|news|article|content|post)\b/)) {
      return 'blog';
    }

    return 'saas'; // Default
  }

  /**
   * Detect theme preference
   */
  detectTheme(brief) {
    const lowerBrief = brief.toLowerCase();
    
    if (lowerBrief.match(/\b(minimal|clean|simple|minimalist)\b/)) {
      return 'theme-minimal-clean';
    }
    if (lowerBrief.match(/\b(bold|vibrant|colorful|striking)\b/)) {
      return 'theme-agency-bold';
    }
    if (lowerBrief.match(/\b(editorial|magazine|elegant|sophisticated)\b/)) {
      return 'theme-portfolio-editorial';
    }
    if (lowerBrief.match(/\b(premium|luxury|high-end|elegant)\b/)) {
      return 'theme-ecommerce-premium';
    }

    // Default based on site type
    return 'theme-saas-modern';
  }

  /**
   * Detect brand tone
   */
  detectBrandTone(brief) {
    const lowerBrief = brief.toLowerCase();
    
    if (lowerBrief.match(/\b(playful|fun|creative|lighthearted)\b/)) {
      return 'playful';
    }
    if (lowerBrief.match(/\b(professional|corporate|serious|business)\b/)) {
      return 'corporate';
    }
    if (lowerBrief.match(/\b(luxury|premium|exclusive|high-end)\b/)) {
      return 'luxury';
    }
    if (lowerBrief.match(/\b(minimal|clean|simple)\b/)) {
      return 'minimal';
    }

    return 'professional'; // Default
  }

  /**
   * Detect target audience
   */
  detectAudience(brief) {
    const lowerBrief = brief.toLowerCase();
    
    if (lowerBrief.match(/\b(b2b|business|enterprise|company|organization)\b/)) {
      return 'B2B';
    }
    if (lowerBrief.match(/\b(b2c|consumer|customer|individual|person)\b/)) {
      return 'B2C';
    }

    return 'B2B'; // Default
  }

  /**
   * Detect primary goal
   */
  detectPrimaryGoal(brief) {
    const lowerBrief = brief.toLowerCase();
    
    if (lowerBrief.match(/\b(lead|signup|trial|demo|contact|inquiry)\b/)) {
      return 'lead';
    }
    if (lowerBrief.match(/\b(purchase|buy|sell|cart|checkout|order)\b/)) {
      return 'purchase';
    }
    if (lowerBrief.match(/\b(booking|reservation|appointment|schedule)\b/)) {
      return 'booking';
    }
    if (lowerBrief.match(/\b(download|install|get|acquire)\b/)) {
      return 'download';
    }

    return 'lead'; // Default
  }

  /**
   * Extract required pages
   */
  extractPages(brief) {
    const pages = ['home']; // Always include home
    const lowerBrief = brief.toLowerCase();

    if (lowerBrief.match(/\b(about|team|story|mission)\b/)) {
      pages.push('about');
    }
    if (lowerBrief.match(/\b(pricing|plans|cost|price)\b/)) {
      pages.push('pricing');
    }
    if (lowerBrief.match(/\b(blog|news|articles|posts)\b/)) {
      pages.push('blog');
    }
    if (lowerBrief.match(/\b(contact|reach|get in touch)\b/)) {
      pages.push('contact');
    }
    if (lowerBrief.match(/\b(login|signin|register|signup|auth)\b/)) {
      pages.push('auth');
    }

    return pages;
  }

  /**
   * Extract required sections
   */
  extractSections(brief) {
    const sections = [];
    const lowerBrief = brief.toLowerCase();

    // Always include header and footer
    sections.push({ ref: 'header.simple', required: true });
    sections.push({ ref: 'footer.columns', required: true });

    // Hero
    if (lowerBrief.match(/\b(hero|banner|headline|main|above the fold)\b/)) {
      sections.push({ ref: 'hero.split.image', position: 1 });
    }

    // Features
    if (lowerBrief.match(/\b(features|benefits|capabilities|what we do)\b/)) {
      sections.push({ ref: 'features.icon.grid', position: 2 });
    }

    // Testimonials
    if (lowerBrief.match(/\b(testimonials|reviews|clients|customers|social proof)\b/)) {
      sections.push({ ref: 'testimonials.grid', position: 3 });
    }

    // Pricing
    if (lowerBrief.match(/\b(pricing|plans|cost|price|tiers)\b/)) {
      sections.push({ ref: 'pricing.cards.3', position: 4 });
    }

    // FAQ
    if (lowerBrief.match(/\b(faq|questions|answers|help)\b/)) {
      sections.push({ ref: 'faq.accordion', position: 5 });
    }

    // CTA
    if (lowerBrief.match(/\b(cta|call to action|get started|sign up)\b/)) {
      sections.push({ ref: 'cta.ribbon', position: 6 });
    }

    return sections.sort((a, b) => (a.position || 999) - (b.position || 999));
  }

  /**
   * Extract content requirements
   */
  extractContent(brief) {
    return {
      headline: this.extractHeadline(brief),
      description: this.extractDescription(brief),
      images: this.extractImageRequirements(brief),
      copy: this.extractCopyRequirements(brief)
    };
  }

  /**
   * Extract headline requirement
   */
  extractHeadline(brief) {
    // Try to extract quoted text as headline
    const quoted = brief.match(/"([^"]+)"/);
    if (quoted) {
      return quoted[1];
    }

    // Extract first sentence as potential headline
    const sentences = brief.match(/[^.!?]+[.!?]+/g);
    if (sentences && sentences.length > 0) {
      return sentences[0].trim();
    }

    return null;
  }

  /**
   * Extract description
   */
  extractDescription(brief) {
    // Use full brief as description for now
    return brief;
  }

  /**
   * Extract image requirements
   */
  extractImageRequirements(brief) {
    const lowerBrief = brief.toLowerCase();
    const images = [];

    if (lowerBrief.match(/\b(logo|brand)\b/)) {
      images.push({ type: 'logo', required: true });
    }
    if (lowerBrief.match(/\b(hero|banner|main image)\b/)) {
      images.push({ type: 'hero', required: true });
    }
    if (lowerBrief.match(/\b(product|mockup|screenshot)\b/)) {
      images.push({ type: 'product', required: false });
    }

    return images;
  }

  /**
   * Extract copy requirements
   */
  extractCopyRequirements(brief) {
    return {
      tone: this.detectBrandTone(brief),
      length: 'medium',
      style: 'professional'
    };
  }

  /**
   * Extract technical requirements
   */
  extractRequirements(brief) {
    const lowerBrief = brief.toLowerCase();
    const requirements = {};

    if (lowerBrief.match(/\b(responsive|mobile|tablet)\b/)) {
      requirements.responsive = true;
    }
    if (lowerBrief.match(/\b(seo|search|optimize)\b/)) {
      requirements.seo = true;
    }
    if (lowerBrief.match(/\b(accessibility|a11y|wcag)\b/)) {
      requirements.accessibility = true;
    }
    if (lowerBrief.match(/\b(dark mode|dark theme)\b/)) {
      requirements.darkMode = true;
    }
    if (lowerBrief.match(/\b(rtl|arabic|hebrew|right to left)\b/)) {
      requirements.rtl = true;
    }

    return requirements;
  }
}

export default SiteSpecParser;

