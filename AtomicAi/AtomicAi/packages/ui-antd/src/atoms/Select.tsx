/**
 * ============================================
 * Atomic Select - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Select as AntSelect, SelectProps as AntSelectProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomSelectProps extends Omit<AntSelectProps, "size"> {
  /**
   * Size
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  
  /**
   * Variant
   */
  variant?: "outline" | "filled";
  
  /**
   * Tone
   */
  tone?: "primary" | "neutral";
  
  /**
   * Density
   */
  density?: "compact" | "comfortable" | "spacious";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Select({
  size = "md",
  variant = "outline",
  tone = "neutral",
  density = "comfortable",
  className,
  importRef,
  ...rest
}: AtomSelectProps) {
  // Map size
  const antSize: AntSelectProps["size"] =
    size === "xs" ? "small" :
    size === "xl" ? "large" :
    "middle";

  const atomClassName = cn(
    "atom-select",
    `atom-select--${variant}`,
    `atom-select--${tone}`,
    `atom-select--${size}`,
    `atom-select--${density}`,
    className
  );

  return (
    <AntSelect
      size={antSize}
      className={atomClassName}
      {...rest}
    />
  );
}

