/**
 * ============================================
 * UI Core - Main Export
 * ============================================
 * 
 * Core UI system exports
 * ============================================
 */

// Types
export * from "./types/manifest";
export * from "./types/recipe";

// Recipes
export { buttonRecipe } from "./recipes/button.recipe";
export { tooltipRecipe } from "./recipes/tooltip.recipe";

// Tokens (CSS file path - imported separately)
export const TOKENS_CSS_PATH = "./tokens/tokens.css";

