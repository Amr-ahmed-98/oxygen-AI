/**
 * ============================================
 * Atomic NumberInput - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { InputNumber, InputNumberProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomNumberInputProps extends Omit<InputNumberProps, "size"> {
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Variant
   */
  variant?: "outline" | "filled";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function NumberInput({
  size = "md",
  variant = "outline",
  className,
  importRef,
  ...rest
}: AtomNumberInputProps) {
  const atomClassName = cn(
    "atom-number-input",
    `atom-number-input--${variant}`,
    `atom-number-input--${size}`,
    className
  );

  return (
    <InputNumber
      className={atomClassName}
      {...rest}
    />
  );
}

