/**
 * ============================================
 * Atomic DatePicker - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { DatePicker as AntDatePicker, DatePickerProps as AntDatePickerProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomDatePickerProps extends Omit<AntDatePickerProps, "size"> {
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

export function DatePicker({
  size = "md",
  variant = "outline",
  tone = "neutral",
  density = "comfortable",
  className,
  importRef,
  ...rest
}: AtomDatePickerProps) {
  // Map size
  const antSize: AntDatePickerProps["size"] =
    size === "xs" ? "small" :
    size === "xl" ? "large" :
    "middle";

  const atomClassName = cn(
    "atom-datepicker",
    `atom-datepicker--${variant}`,
    `atom-datepicker--${tone}`,
    `atom-datepicker--${size}`,
    `atom-datepicker--${density}`,
    className
  );

  return (
    <AntDatePicker
      size={antSize}
      className={atomClassName}
      {...rest}
    />
  );
}

