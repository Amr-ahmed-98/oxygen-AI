/**
 * i18n Service
 * Internationalization service with RTL support
 */

export class I18nService {
  constructor(config = {}) {
    this.config = {
      defaultLocale: 'en',
      supportedLocales: ['en'],
      rtl: {
        enabled: false,
        locales: ['ar', 'he']
      },
      ...config
    };
    this.currentLocale = this.config.defaultLocale;
    this.translations = {};
    this.direction = this.getDirection(this.currentLocale);
  }

  /**
   * Set locale
   */
  setLocale(locale) {
    if (!this.config.supportedLocales.includes(locale)) {
      console.warn(`Locale ${locale} not supported`);
      return;
    }

    this.currentLocale = locale;
    this.direction = this.getDirection(locale);
    
    // Update document direction if in browser
    if (typeof document !== 'undefined') {
      document.documentElement.dir = this.direction;
      document.documentElement.lang = locale;
    }
  }

  /**
   * Get current locale
   */
  getLocale() {
    return this.currentLocale;
  }

  /**
   * Get direction (LTR/RTL)
   */
  getDirection(locale) {
    if (this.config.rtl?.enabled && this.config.rtl.locales.includes(locale)) {
      return 'rtl';
    }
    return 'ltr';
  }

  /**
   * Check if RTL
   */
  isRTL() {
    return this.direction === 'rtl';
  }

  /**
   * Load translations
   */
  loadTranslations(locale, translations) {
    this.translations[locale] = translations;
  }

  /**
   * Translate key
   */
  t(key, params = {}) {
    const translation = this.translations[this.currentLocale]?.[key] || key;

    // Replace params
    return translation.replace(/\{\{(\w+)\}\}/g, (match, param) => {
      return params[param] || match;
    });
  }

  /**
   * Format number
   */
  formatNumber(number, options = {}) {
    return new Intl.NumberFormat(this.currentLocale, options).format(number);
  }

  /**
   * Format date
   */
  formatDate(date, options = {}) {
    return new Intl.DateTimeFormat(this.currentLocale, options).format(date);
  }

  /**
   * Format currency
   */
  formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat(this.currentLocale, {
      style: 'currency',
      currency
    }).format(amount);
  }

  /**
   * Get text alignment
   */
  getTextAlign(align = 'start') {
    if (align === 'start') {
      return this.isRTL() ? 'right' : 'left';
    } else if (align === 'end') {
      return this.isRTL() ? 'left' : 'right';
    }
    return align;
  }

  /**
   * Get logical properties (for RTL)
   */
  getLogicalProperty(property, ltrValue, rtlValue = null) {
    if (this.isRTL() && rtlValue !== null) {
      return rtlValue;
    }
    return ltrValue;
  }
}

export default I18nService;

