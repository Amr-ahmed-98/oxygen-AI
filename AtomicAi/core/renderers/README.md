# Renderers

Production-ready code generators that transform component manifests into actual code.

## Available Renderers

1. **renderer-html-css.js** - Clean HTML/CSS output
2. **renderer-react.js** - React functional components
3. **renderer-nextjs.js** - Next.js optimized components (extends React renderer)

## Features

### HTML/CSS Renderer

- Clean, semantic HTML
- CSS Variables support
- Responsive CSS generation
- Accessibility attributes
- Minification support
- Asset extraction

### React Renderer

- Functional components
- TypeScript support
- Props interfaces
- Proper JSX structure
- Accessibility built-in
- Dependency management

### Next.js Renderer

- App Router support
- Server Components compatible
- Next.js Image optimization
- Next.js Link integration
- Metadata generation
- 'use client' directives

## Usage

```javascript
import { HTMLCSSRenderer } from './renderers/renderer-html-css.js';
import { ReactRenderer } from './renderers/renderer-react.js';
import { NextJSRenderer } from './renderers/renderer-nextjs.js';

// Load component manifest
const manifest = await import('./manifests/input.manifest.json');
const theme = await import('./themes/theme-saas-modern.json');

// HTML/CSS
const htmlRenderer = new HTMLCSSRenderer({ minify: true });
const htmlOutput = htmlRenderer.render(manifest, props, theme);

// React
const reactRenderer = new ReactRenderer({ useTypeScript: true });
const reactOutput = reactRenderer.render(manifest, props, theme);

// Next.js
const nextRenderer = new NextJSRenderer({ useAppRouter: true });
const nextOutput = nextRenderer.render(manifest, props, theme);
```

## Output Structure

Each renderer returns:
- **component/code**: The generated code
- **imports**: Required imports
- **types**: TypeScript types (if applicable)
- **assets**: Extracted assets (images, fonts, etc.)
- **metadata**: Renderer metadata

## Benefits

- **Production-ready**: Clean, optimized code
- **Framework-agnostic**: Multiple output formats
- **Consistent**: Same manifest, different outputs
- **Maintainable**: Generated from single source of truth
- **Accessible**: Built-in a11y support
- **SEO-friendly**: Semantic HTML and metadata

