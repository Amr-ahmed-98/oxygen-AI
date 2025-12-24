/**
 * Layout Rules
 * Defines spacing rhythm, max widths, and layout constraints
 */

export const layoutRules = {
  /**
   * Spacing rhythm - consistent spacing scale
   */
  spacing: {
    rhythm: 1.25, // Base spacing multiplier
    section: {
      min: 'md', // Minimum spacing between sections
      default: 'lg',
      max: 'xl'
    },
    element: {
      min: 'sm',
      default: 'md',
      max: 'lg'
    },
    vertical: {
      // Vertical spacing between major sections
      heroToContent: 'xl',
      contentToContent: 'lg',
      contentToFooter: 'xl'
    }
  },

  /**
   * Max widths for containers
   */
  maxWidths: {
    narrow: '4xl',    // 896px - Articles, blog posts
    content: '5xl',   // 1024px - Main content
    wide: '6xl',      // 1152px - Features, sections
    full: '7xl',      // 1280px - Hero sections
    ultra: 'full'     // 100% - Full width sections
  },

  /**
   * Section order presets by site type
   */
  sectionOrder: {
    saas: [
      'announcement-bar',
      'header',
      'hero',
      'logos-cloud',
      'features',
      'testimonials',
      'pricing',
      'faq',
      'cta',
      'footer'
    ],
    agency: [
      'header',
      'hero',
      'services',
      'portfolio',
      'testimonials',
      'team',
      'cta',
      'footer'
    ],
    portfolio: [
      'header',
      'hero',
      'projects',
      'about',
      'skills',
      'contact',
      'footer'
    ],
    ecommerce: [
      'announcement-bar',
      'header',
      'hero',
      'featured-products',
      'categories',
      'testimonials',
      'newsletter',
      'footer'
    ],
    blog: [
      'header',
      'hero',
      'featured-posts',
      'posts-list',
      'sidebar',
      'newsletter',
      'footer'
    ]
  },

  /**
   * Spacing rules between sections
   */
  sectionSpacing: {
    'hero-to-content': 'xl',
    'content-to-content': 'lg',
    'content-to-cta': 'xl',
    'cta-to-footer': 'xl'
  },

  /**
   * Container padding rules
   */
  containerPadding: {
    mobile: 'sm',
    tablet: 'md',
    desktop: 'lg'
  },

  /**
   * Grid rules
   */
  grid: {
    maxColumns: 12,
    gutters: {
      mobile: 'sm',
      tablet: 'md',
      desktop: 'lg'
    }
  }
};

export default layoutRules;

