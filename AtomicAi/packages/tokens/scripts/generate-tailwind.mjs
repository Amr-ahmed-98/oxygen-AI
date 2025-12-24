import { writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { tokens } from "../src/tokens.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = `${__dirname}/../dist/tailwind/index.js`;

// Generate Tailwind config extension
const config = {
  theme: {
    extend: {
      spacing: tokens.spacing,
      borderRadius: tokens.radius,
      fontSize: tokens.typography.fontSizes,
      lineHeight: tokens.typography.lineHeights,
      fontWeight: tokens.typography.fontWeights,
      colors: {
        primary: tokens.colors.primary,
        neutral: tokens.colors.neutral,
        success: tokens.colors.success,
        warning: tokens.colors.warning,
        danger: tokens.colors.danger,
        info: tokens.colors.info,
      },
      boxShadow: tokens.shadows,
      zIndex: tokens.zIndex,
      transitionDuration: {
        fast: tokens.transitions.fast.split(" ")[0],
        base: tokens.transitions.base.split(" ")[0],
        slow: tokens.transitions.slow.split(" ")[0],
        slower: tokens.transitions.slower.split(" ")[0],
      },
    },
  },
};

const js = `/**
 * Tailwind CSS Configuration Extension
 * Auto-generated from tokens.ts
 */

export const tailwindConfig = ${JSON.stringify(config, null, 2)};
`;

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, js);
console.log("✅ Generated Tailwind config:", outputPath);

