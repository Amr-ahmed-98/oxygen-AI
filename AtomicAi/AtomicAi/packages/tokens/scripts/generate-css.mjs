import { writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { tokens } from "../src/tokens.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = `${__dirname}/../dist/css/vars.css`;

// Generate CSS variables
let css = `/**
 * Design Tokens - CSS Variables
 * Auto-generated from tokens.ts
 */

:root {
`;

// Spacing
Object.entries(tokens.spacing).forEach(([key, value]) => {
  css += `  --space-${key}: ${value};\n`;
});

// Radius
Object.entries(tokens.radius).forEach(([key, value]) => {
  css += `  --radius-${key}: ${value};\n`;
});

// Typography - Font Sizes
Object.entries(tokens.typography.fontSizes).forEach(([key, value]) => {
  css += `  --font-${key}: ${value};\n`;
});

// Typography - Line Heights
Object.entries(tokens.typography.lineHeights).forEach(([key, value]) => {
  css += `  --leading-${key}: ${value};\n`;
});

// Typography - Font Weights
Object.entries(tokens.typography.fontWeights).forEach(([key, value]) => {
  css += `  --weight-${key}: ${value};\n`;
});

// Colors
Object.entries(tokens.colors).forEach(([colorName, shades]) => {
  Object.entries(shades).forEach(([shade, value]) => {
    css += `  --${colorName}-${shade}: ${value};\n`;
  });
});

// Shadows
Object.entries(tokens.shadows).forEach(([key, value]) => {
  css += `  --shadow-${key}: ${value};\n`;
});

// Z-Index
Object.entries(tokens.zIndex).forEach(([key, value]) => {
  const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
  css += `  --z-${kebabKey}: ${value};\n`;
});

// Transitions
Object.entries(tokens.transitions).forEach(([key, value]) => {
  css += `  --transition-${key}: ${value};\n`;
});

// Semantic colors
css += `
  --color-bg: var(--neutral-50);
  --color-fg: var(--neutral-900);
  --color-muted: var(--neutral-500);
  --color-border: var(--neutral-200);
  --color-surface: #ffffff;
  
  --focus-ring: 0 0 0 3px rgba(37, 99, 235, 0.25);
  --focus-ring-offset: 0 0 0 2px #ffffff, 0 0 0 4px rgba(37, 99, 235, 0.25);
}

/* Theme Overrides */
:root[data-theme="enterprise"] {
  --radius-md: 8px;
  --radius-lg: 12px;
  --color-bg: #ffffff;
  --color-fg: #0f172a;
}

:root[data-theme="minimal"] {
  --radius-md: 4px;
  --radius-lg: 8px;
  --shadow-md: 0 1px 3px rgba(0, 0, 0, 0.08);
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg: var(--neutral-900);
    --color-fg: var(--neutral-50);
    --color-muted: var(--neutral-400);
    --color-border: var(--neutral-700);
    --color-surface: var(--neutral-800);
  }
}
`;

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, css);
console.log("✅ Generated CSS variables:", outputPath);

