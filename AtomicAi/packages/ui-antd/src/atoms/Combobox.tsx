/**
 * ============================================
 * Atomic Combobox - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { AutoComplete, AutoCompleteProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomComboboxProps extends Omit<AutoCompleteProps, "size"> {
  /**
   * Size
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  
  /**
   * Variant
   */
  variant?: "outline" | "filled";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Combobox({
  size = "md",
  variant = "outline",
  className,
  importRef,
  ...rest
}: AtomComboboxProps) {
  // Map size
  const antSize: AutoCompleteProps["size"] =
    size === "xs" ? "small" :
    size === "xl" ? "large" :
    "middle";

  const atomClassName = cn(
    "atom-combobox",
    `atom-combobox--${variant}`,
    `atom-combobox--${size}`,
    className
  );

  return (
    <AutoComplete
      size={antSize}
      className={atomClassName}
      {...rest}
    />
  );
}

