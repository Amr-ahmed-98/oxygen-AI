/**
 * ============================================
 * Atomic Checkbox - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Checkbox as AntCheckbox, CheckboxProps as AntCheckboxProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomCheckboxProps extends Omit<AntCheckboxProps, "size"> {
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Variant
   */
  variant?: "default" | "filled";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Checkbox({
  size = "md",
  variant = "default",
  className,
  importRef,
  ...rest
}: AtomCheckboxProps) {
  const atomClassName = cn(
    "atom-checkbox",
    `atom-checkbox--${variant}`,
    `atom-checkbox--${size}`,
    className
  );

  return (
    <AntCheckbox
      className={atomClassName}
      {...rest}
    />
  );
}

