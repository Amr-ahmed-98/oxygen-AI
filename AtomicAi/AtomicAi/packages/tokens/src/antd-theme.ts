/**
 * ============================================
 * Ant Design Theme Generator
 * ============================================
 * 
 * Generates Ant Design theme configs from personas
 */

import { readFileSync } from "fs";
import { join } from "path";
import type { ThemeConfig } from "antd";

export type Persona = "enterprise" | "minimal" | "glass" | "neon";

export interface PersonaConfig {
  name: string;
  displayName: string;
  description: string;
  colors: {
    primary: Record<string, string>;
    neutral: Record<string, string>;
  };
  radius: Record<string, string>;
  typography: {
    fontFamily: string;
    fontWeight: Record<string, number>;
  };
  shadows: Record<string, string>;
}

/**
 * Load persona config
 */
export function loadPersona(persona: Persona): PersonaConfig {
  const filePath = join(__dirname, "personas", `${persona}.json`);
  const content = readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}

/**
 * Convert persona to Ant Design theme
 */
export function personaToAntdTheme(persona: Persona, rtl = false): ThemeConfig {
  const config = loadPersona(persona);
  
  return {
    token: {
      // Primary color
      colorPrimary: config.colors.primary[500] || "#3b82f6",
      
      // Success/Warning/Error/Info
      colorSuccess: "#22c55e",
      colorWarning: "#f59e0b",
      colorError: "#ef4444",
      colorInfo: "#0ea5e9",
      
      // Typography
      fontFamily: config.typography.fontFamily,
      fontSize: 14,
      lineHeight: 1.5,
      
      // Border radius
      borderRadius: parseInt(config.radius.md || "6px", 10),
      
      // Motion
      motionDurationFast: "150ms",
      motionDurationMid: "200ms",
      motionDurationSlow: "300ms",
    },
    algorithm: rtl ? undefined : undefined,
  };
}

/**
 * Export themes for all personas
 */
export const antdThemes = {
  enterprise: personaToAntdTheme("enterprise"),
  minimal: personaToAntdTheme("minimal"),
  glass: personaToAntdTheme("glass"),
  neon: personaToAntdTheme("neon"),
} as const;

