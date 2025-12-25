/**
 * ============================================
 * Theme Provider - Ant Design Integration
 * ============================================
 * 
 * Maps personas/tokens → Ant Design theme
 */

import { ThemeConfig } from "antd";

export type Persona = "enterprise" | "minimal" | "glass" | "neon" | "startup" | "dark" | "colorful" | "elegant" | "modern" | "playful";

export interface ThemeOptions {
  persona?: Persona;
  rtl?: boolean;
}

/**
 * Generate Ant Design theme from persona
 */
export function createAntdTheme(options: ThemeOptions = {}): ThemeConfig {
  const { persona = "enterprise", rtl = false } = options;

  // Base theme
  const baseTheme: ThemeConfig = {
    token: {
      // Colors (will be overridden by persona)
      colorPrimary: "#3b82f6",
      colorSuccess: "#22c55e",
      colorWarning: "#f59e0b",
      colorError: "#ef4444",
      colorInfo: "#0ea5e9",
      
      // Typography
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      fontSize: 14,
      lineHeight: 1.5,
      
      // Spacing
      borderRadius: 6,
      
      // Motion
      motionDurationFast: "150ms",
      motionDurationMid: "200ms",
      motionDurationSlow: "300ms",
    },
    algorithm: rtl ? undefined : undefined, // Can add dark mode algorithm here
  };

  // Apply persona overrides
  switch (persona) {
    case "enterprise":
      return {
        ...baseTheme,
        token: {
          ...baseTheme.token,
          colorPrimary: "#2563eb",
          borderRadius: 8,
        },
      };
    
    case "minimal":
      return {
        ...baseTheme,
        token: {
          ...baseTheme.token,
          colorPrimary: "#64748b",
          borderRadius: 4,
        },
      };
    
    case "glass":
      return {
        ...baseTheme,
        token: {
          ...baseTheme.token,
          colorPrimary: "#0ea5e9",
          borderRadius: 12,
        },
      };
    
    case "neon":
      return {
        ...baseTheme,
        token: {
          ...baseTheme.token,
          colorPrimary: "#00f0ff",
          borderRadius: 10,
        },
      };
    
    case "startup":
      return {
        ...baseTheme,
        token: {
          ...baseTheme.token,
          colorPrimary: "#06b6d4",
          borderRadius: 8,
        },
      };
    
    case "dark":
      return {
        ...baseTheme,
        token: {
          ...baseTheme.token,
          colorPrimary: "#60a5fa",
          borderRadius: 8,
        },
      };
    
    case "colorful":
      return {
        ...baseTheme,
        token: {
          ...baseTheme.token,
          colorPrimary: "#f59e0b",
          borderRadius: 12,
        },
      };
    
    case "elegant":
      return {
        ...baseTheme,
        token: {
          ...baseTheme.token,
          colorPrimary: "#8b5cf6",
          borderRadius: 10,
        },
      };
    
    case "modern":
      return {
        ...baseTheme,
        token: {
          ...baseTheme.token,
          colorPrimary: "#10b981",
          borderRadius: 10,
        },
      };
    
    case "playful":
      return {
        ...baseTheme,
        token: {
          ...baseTheme.token,
          colorPrimary: "#f87171",
          borderRadius: 12,
        },
      };
    
    default:
      return baseTheme;
  }
}

/**
 * Get theme from persona name
 */
export function getThemeFromPersona(persona: Persona, rtl = false): ThemeConfig {
  return createAntdTheme({ persona, rtl });
}

