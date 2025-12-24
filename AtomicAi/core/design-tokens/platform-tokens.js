/**
 * Platform-Agnostic Design Tokens
 * Design tokens that work across Web, Mobile, and Desktop
 */

export const platformTokens = {
  /**
   * Colors (semantic, not platform-specific)
   */
  colors: {
    // Semantic colors
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8'
    },
    success: {
      50: '#f0fdf4',
      500: '#22c55e',
      600: '#16a34a'
    },
    warning: {
      50: '#fffbeb',
      500: '#f59e0b',
      600: '#d97706'
    },
    error: {
      50: '#fef2f2',
      500: '#ef4444',
      600: '#dc2626'
    },
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827'
    }
  },

  /**
   * Spacing (relative units)
   */
  spacing: {
    scale: 1.25, // Multiplier for spacing scale
    base: 4, // Base unit in pixels
    values: {
      0: 0,
      1: 4,   // 0.25rem
      2: 8,   // 0.5rem
      3: 12,  // 0.75rem
      4: 16,  // 1rem
      5: 20,  // 1.25rem
      6: 24,  // 1.5rem
      8: 32,  // 2rem
      10: 40, // 2.5rem
      12: 48, // 3rem
      16: 64, // 4rem
      20: 80, // 5rem
      24: 96  // 6rem
    },
    // Semantic spacing
    semantic: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      '2xl': 48
    }
  },

  /**
   * Typography (intent-based, not platform-specific)
   */
  typography: {
    // Font families (platform-specific mapping in renderers)
    fontFamily: {
      sans: 'system-ui', // Mapped per platform
      serif: 'serif',
      mono: 'monospace'
    },
    // Font sizes (scale)
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 20,
      '2xl': 24,
      '3xl': 30,
      '4xl': 36,
      '5xl': 48,
      '6xl': 60
    },
    // Font weights
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    // Line heights (relative)
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75
    }
  },

  /**
   * Layout (intent-based)
   */
  layout: {
    // Container widths
    container: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536
    },
    // Breakpoints (for responsive)
    breakpoints: {
      mobile: 0,
      tablet: 768,
      desktop: 1024,
      wide: 1280
    }
  },

  /**
   * Border radius
   */
  borderRadius: {
    none: 0,
    sm: 4,
    base: 6,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999
  },

  /**
   * Shadows (elevation-based)
   */
  elevation: {
    0: 'none',
    1: { // Subtle elevation
      offset: { x: 0, y: 1 },
      blur: 2,
      spread: 0,
      opacity: 0.05
    },
    2: { // Card elevation
      offset: { x: 0, y: 2 },
      blur: 4,
      spread: 0,
      opacity: 0.1
    },
    3: { // Modal elevation
      offset: { x: 0, y: 8 },
      blur: 16,
      spread: 0,
      opacity: 0.15
    },
    4: { // High elevation
      offset: { x: 0, y: 16 },
      blur: 24,
      spread: 0,
      opacity: 0.2
    }
  },

  /**
   * Motion (duration and easing)
   */
  motion: {
    duration: {
      fast: 150,
      base: 200,
      slow: 300,
      slower: 500
    },
    easing: {
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  },

  /**
   * Density modes
   */
  density: {
    compact: {
      spacing: 0.875, // 87.5% of base
      fontSize: 0.9375, // 93.75% of base
      lineHeight: 1.4
    },
    comfortable: {
      spacing: 1, // 100% of base
      fontSize: 1,
      lineHeight: 1.5
    },
    airy: {
      spacing: 1.25, // 125% of base
      fontSize: 1.0625, // 106.25% of base
      lineHeight: 1.6
    }
  }
};

/**
 * Map tokens to platform-specific values
 */
export class TokenMapper {
  constructor(platform) {
    this.platform = platform; // 'web', 'mobile', 'desktop'
  }

  /**
   * Map font family
   */
  mapFontFamily(family) {
    const mappings = {
      web: {
        'system-ui': ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif']
      },
      mobile: {
        'system-ui': 'System' // iOS/Android system font
      },
      desktop: {
        'system-ui': ['system-ui', '-apple-system', 'sans-serif']
      }
    };

    return mappings[this.platform]?.[family] || family;
  }

  /**
   * Map spacing to platform units
   */
  mapSpacing(value) {
    if (this.platform === 'web') {
      return `${value / 4}rem`; // Convert to rem
    } else if (this.platform === 'mobile') {
      return value; // Pixels for mobile
    } else {
      return value; // Pixels for desktop
    }
  }

  /**
   * Map shadow to platform format
   */
  mapShadow(elevation) {
    if (elevation === 'none') return 'none';

    const shadow = platformTokens.elevation[elevation];
    if (!shadow) return 'none';

    if (this.platform === 'web') {
      return `${shadow.offset.x}px ${shadow.offset.y}px ${shadow.blur}px rgba(0, 0, 0, ${shadow.opacity})`;
    } else if (this.platform === 'mobile') {
      // React Native shadow
      return {
        shadowColor: '#000',
        shadowOffset: shadow.offset,
        shadowOpacity: shadow.opacity,
        shadowRadius: shadow.blur / 2,
        elevation: elevation // Android
      };
    } else {
      // Desktop (similar to web)
      return `${shadow.offset.x}px ${shadow.offset.y}px ${shadow.blur}px rgba(0, 0, 0, ${shadow.opacity})`;
    }
  }

  /**
   * Map all tokens for platform
   */
  mapAll() {
    return {
      colors: platformTokens.colors,
      spacing: this.mapSpacingScale(),
      typography: {
        ...platformTokens.typography,
        fontFamily: {
          sans: this.mapFontFamily('system-ui')
        }
      },
      layout: platformTokens.layout,
      borderRadius: platformTokens.borderRadius,
      elevation: platformTokens.elevation,
      motion: platformTokens.motion,
      density: platformTokens.density
    };
  }

  /**
   * Map spacing scale
   */
  mapSpacingScale() {
    const mapped = {};
    Object.entries(platformTokens.spacing.values).forEach(([key, value]) => {
      mapped[key] = this.mapSpacing(value);
    });
    return mapped;
  }
}

export default platformTokens;

