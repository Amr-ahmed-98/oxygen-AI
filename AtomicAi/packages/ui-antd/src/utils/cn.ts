/**
 * ============================================
 * Class Name Utility
 * ============================================
 * 
 * Combines class names, filters out falsy values
 */

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

