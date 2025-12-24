/**
 * ============================================
 * Button Recipe - Style Recipe Definition
 * ============================================
 * 
 * Platform-agnostic button style recipe
 * Works with any style engine via adapters
 * ============================================
 */

import type { RecipeInput } from "../types/recipe";

export const buttonRecipe: RecipeInput = {
  base: [
    "btn",
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-2",
    "select-none",
    "font-medium",
    "transition-colors",
    "cursor-pointer",
    "border",
    "border-transparent"
  ],
  variants: {
    variant: {
      solid: ["btn--solid"],
      outline: ["btn--outline"],
      ghost: ["btn--ghost"],
      link: ["btn--link"]
    },
    tone: {
      primary: ["btn--primary"],
      neutral: ["btn--neutral"],
      success: ["btn--success"],
      warning: ["btn--warning"],
      danger: ["btn--danger"]
    },
    size: {
      xs: ["btn--xs"],
      sm: ["btn--sm"],
      md: ["btn--md"],
      lg: ["btn--lg"],
      xl: ["btn--xl"]
    },
    fullWidth: {
      true: ["w-full"],
      false: []
    }
  },
  states: {
    disabled: ["btn--disabled", "opacity-60", "cursor-not-allowed"],
    loading: ["btn--loading", "opacity-85"],
    focusVisible: ["focus-ring"]
  },
  compound: [
    {
      when: { variant: "link" },
      classes: ["btn--noPadding", "underline"]
    },
    {
      when: { variant: "solid", tone: "primary" },
      classes: ["bg-primary-600", "text-white", "hover:bg-primary-700"]
    },
    {
      when: { variant: "outline", tone: "primary" },
      classes: ["bg-transparent", "border-primary-600", "text-primary-600"]
    }
  ],
  defaultVariants: {
    variant: "solid",
    tone: "primary",
    size: "md",
    fullWidth: "false"
  }
};

