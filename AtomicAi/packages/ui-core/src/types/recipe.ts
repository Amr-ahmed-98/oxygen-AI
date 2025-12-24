/**
 * ============================================
 * Recipe Types - Style Recipe System
 * ============================================
 * 
 * Recipe system for style-agnostic component definitions
 * Works with CSS vars, Tailwind, CSS Modules, Styled Components
 * ============================================
 */

export type StyleEngine = "cssvars" | "tailwind" | "cssmodules" | "styled" | "nativewind";

export interface StyleContext {
  engine: StyleEngine;
  module?: Record<string, string>;
  theme?: string;
}

export interface RecipeInput {
  base?: string[];
  variants?: Record<string, Record<string, string[]>>;
  compound?: Array<{
    when: Record<string, string>;
    classes: string[];
  }>;
  states?: Record<string, string[]>;
  defaultVariants?: Record<string, string>;
}

export interface ResolvedClasses {
  classes: string[];
  inlineStyles?: Record<string, string>;
}

export type ClassResolver = (
  recipe: RecipeInput,
  context: StyleContext,
  props: Record<string, string>
) => ResolvedClasses;

