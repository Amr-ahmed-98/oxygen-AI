# Composer

Rules engine for composing pages and validating component/section combinations.

## Components

### layout-rules.js
Defines spacing rhythm, max widths, and layout constraints.

### composition-rules.js
Rules for valid section combinations, frequencies, and composition patterns.

### composer.js
Main composition engine that validates and composes pages.

## Features

### Layout Rules

- **Spacing Rhythm**: Consistent spacing scale
- **Max Widths**: Container width constraints
- **Section Order Presets**: Recommended section orders by site type
- **Grid Rules**: Grid system constraints

### Composition Rules

- **Valid Combinations**: Which sections can follow/precede others
- **Frequency Rules**: Min/max occurrences per page
- **Heading Hierarchy**: Enforces proper h1-h6 structure
- **Contrast Rules**: WCAG contrast validation
- **Sizing Consistency**: Consistent component sizing

### Composer Engine

- **Validation**: Validates sections and compositions
- **Layout Application**: Applies layout rules automatically
- **Spacing**: Calculates optimal spacing between sections
- **Linting**: Non-destructive validation and scoring
- **Suggestions**: Recommends improvements

## Usage

```javascript
import { Composer } from './composer/composer.js';

const composer = new Composer({
  siteType: 'saas',
  theme: themeData,
  strict: true
});

// Compose a page
const result = composer.compose(sections, theme);

if (result.valid) {
  // Use composed sections
  console.log(result.sections);
} else {
  // Handle errors
  console.error(result.errors);
}

// Lint without modifying
const lintResult = composer.lint(sections);
console.log(`Quality score: ${lintResult.score}/100`);

// Get suggestions
const suggestions = composer.suggestImprovements(sections);
```

## Site Types

Supported site types with predefined section orders:
- `saas` - Software as a Service
- `agency` - Creative agency
- `portfolio` - Portfolio/personal site
- `ecommerce` - E-commerce store
- `blog` - Blog/news site

## Benefits

- **Consistency**: Enforces design system rules
- **Quality**: Validates compositions for best practices
- **Accessibility**: Built-in a11y validation
- **SEO**: Heading hierarchy enforcement
- **Guidance**: Suggestions for improvements

