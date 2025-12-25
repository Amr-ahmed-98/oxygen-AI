/**
 * ============================================
 * Tooltip Recipe - Style Recipe Definition
 * ============================================
 */

import type { RecipeInput } from "../types/recipe";

export const tooltipRecipe: RecipeInput = {
  base: [
    "tooltip",
    "inline-block",
    "relative"
  ],
  variants: {
    tone: {
      neutral: ["tooltip--neutral"],
      dark: ["tooltip--dark"]
    },
    size: {
      sm: ["tooltip--sm"],
      md: ["tooltip--md"]
    }
  },
  states: {
    visible: ["tooltip--visible"]
  },
  defaultVariants: {
    tone: "neutral",
    size: "sm"
  }
};

