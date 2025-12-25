/**
 * ============================================
 * Manifest Types - TypeScript Definitions
 * ============================================
 * 
 * Type definitions for component manifests
 * Used by AI, generators, and quality gates
 * ============================================
 */

export type AtomType = "atom";
export type MoleculeType = "molecule";
export type OrganismType = "organism";
export type PatternType = "pattern";
export type PageType = "page";

export type ComponentType = AtomType | MoleculeType | OrganismType | PatternType | PageType;

export type Platform = "web" | "mobile" | "desktop";

export type PropType = "string" | "number" | "boolean" | "object" | "array" | "function";

export interface PropDefinition {
  type: PropType;
  enum?: string[];
  default?: any;
  required?: boolean;
  description?: string;
  constraints?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface VariantDefinition {
  [key: string]: string[];
}

export interface StateDefinition {
  name: string;
  description?: string;
  triggers?: string[];
}

export interface A11yDefinition {
  keyboard?: boolean;
  aria?: string[];
  focusVisible?: boolean;
  screenReader?: boolean;
}

export interface TokenReference {
  uses: string[];
  fallbackTheme?: string;
}

export interface ExampleDefinition {
  label: string;
  props: Record<string, any>;
  description?: string;
}

export interface CodeReference {
  entry: string;
  style?: string;
  recipe?: string;
  test?: string;
}

export interface ComponentManifest {
  id: string;
  type: ComponentType;
  version: string;
  description: string;
  platforms: Platform[];
  rtl?: boolean;
  a11y?: A11yDefinition;
  props?: Record<string, PropDefinition>;
  variants?: VariantDefinition;
  states?: string[] | StateDefinition[];
  tokens?: TokenReference;
  examples?: ExampleDefinition[];
  codeRef?: CodeReference;
  dependencies?: string[];
  related?: string[];
}

export interface AtomManifest extends ComponentManifest {
  type: "atom";
}

export interface MoleculeManifest extends ComponentManifest {
  type: "molecule";
  atoms?: string[];
}

export interface OrganismManifest extends ComponentManifest {
  type: "organism";
  molecules?: string[];
  atoms?: string[];
}

export interface PatternManifest extends ComponentManifest {
  type: "pattern";
  organisms?: string[];
  useCases?: string[];
}

export interface PageManifest extends ComponentManifest {
  type: "page";
  patterns?: string[];
  layout?: string;
  routes?: string[];
}

