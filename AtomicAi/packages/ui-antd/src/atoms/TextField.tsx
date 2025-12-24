/**
 * ============================================
 * Atomic TextField - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Input, InputProps as AntInputProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomTextFieldProps extends Omit<AntInputProps, "size"> {
  /**
   * Size
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  
  /**
   * Variant
   */
  variant?: "outline" | "filled" | "underline";
  
  /**
   * Tone
   */
  tone?: "primary" | "neutral" | "error" | "success";
  
  /**
   * Density
   */
  density?: "compact" | "comfortable" | "spacious";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function TextField({
  size = "md",
  variant = "outline",
  tone = "neutral",
  density = "comfortable",
  className,
  importRef,
  ...rest
}: AtomTextFieldProps) {
  // Map size
  const antSize: AntInputProps["size"] =
    size === "xs" ? "small" :
    size === "xl" ? "large" :
    "middle";

  const atomClassName = cn(
    "atom-textfield",
    `atom-textfield--${variant}`,
    `atom-textfield--${tone}`,
    `atom-textfield--${size}`,
    `atom-textfield--${density}`,
    className
  );

  return (
    <Input
      size={antSize}
      className={atomClassName}
      {...rest}
    />
  );
}

