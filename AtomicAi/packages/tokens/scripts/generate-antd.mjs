import { writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { tokens } from "../src/tokens.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = `${__dirname}/../dist/antd/index.ts`;

// Generate Ant Design theme config
let ts = `/**
 * Ant Design Theme Configuration
 * Auto-generated from tokens.ts
 */

import type { ThemeConfig } from "antd";

export const antdTheme: ThemeConfig = {
  token: {
    // Colors
    colorPrimary: "${tokens.colors.primary[600]}",
    colorSuccess: "${tokens.colors.success[600]}",
    colorWarning: "${tokens.colors.warning[600]}",
    colorError: "${tokens.colors.danger[600]}",
    colorInfo: "${tokens.colors.info[600]}",
    
    // Border Radius
    borderRadius: ${parseInt(tokens.radius.md)},
    borderRadiusLG: ${parseInt(tokens.radius.lg)},
    borderRadiusSM: ${parseInt(tokens.radius.sm)},
    
    // Font
    fontSize: ${parseInt(tokens.typography.fontSizes.md)},
    fontSizeLG: ${parseInt(tokens.typography.fontSizes.lg)},
    fontSizeSM: ${parseInt(tokens.typography.fontSizes.sm)},
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    
    // Spacing
    padding: ${parseInt(tokens.spacing[4])},
    paddingLG: ${parseInt(tokens.spacing[6])},
    paddingSM: ${parseInt(tokens.spacing[2])},
    paddingXS: ${parseInt(tokens.spacing[1])},
    
    // Line Height
    lineHeight: ${tokens.typography.lineHeights.normal},
    
    // Motion
    motionDurationFast: "${tokens.transitions.fast}",
    motionDurationMid: "${tokens.transitions.base}",
    motionDurationSlow: "${tokens.transitions.slow}",
  },
  components: {
    Button: {
      borderRadius: ${parseInt(tokens.radius.md)},
      controlHeight: ${parseInt(tokens.spacing[10])},
      controlHeightLG: ${parseInt(tokens.spacing[12])},
      controlHeightSM: ${parseInt(tokens.spacing[8])},
    },
    Input: {
      borderRadius: ${parseInt(tokens.radius.md)},
      controlHeight: ${parseInt(tokens.spacing[10])},
      controlHeightLG: ${parseInt(tokens.spacing[12])},
      controlHeightSM: ${parseInt(tokens.spacing[8])},
    },
    Select: {
      borderRadius: ${parseInt(tokens.radius.md)},
      controlHeight: ${parseInt(tokens.spacing[10])},
      controlHeightLG: ${parseInt(tokens.spacing[12])},
      controlHeightSM: ${parseInt(tokens.spacing[8])},
    },
  },
};

// Persona-specific themes
export const antdThemes = {
  enterprise: antdTheme,
  minimal: {
    ...antdTheme,
    token: {
      ...antdTheme.token,
      borderRadius: ${parseInt(tokens.radius.sm)},
      borderRadiusLG: ${parseInt(tokens.radius.md)},
      borderRadiusSM: ${parseInt(tokens.radius.sm)},
    },
  },
  neon: {
    ...antdTheme,
    token: {
      ...antdTheme.token,
      colorPrimary: "#00f0ff",
      colorSuccess: "#00ff88",
      colorWarning: "#ffaa00",
      colorError: "#ff0066",
    },
  },
} as const;

export type AntdThemeName = keyof typeof antdThemes;
`;

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, ts);
console.log("✅ Generated Ant Design theme:", outputPath);

