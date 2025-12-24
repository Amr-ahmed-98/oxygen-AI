/**
 * ============================================
 * Atomic DateRange - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { DatePicker } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import { cn } from "../utils/cn";

const { RangePicker } = DatePicker;

export interface AtomDateRangeProps extends Omit<RangePickerProps, "size"> {
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

export function DateRange({
  size = "md",
  variant = "outline",
  className,
  importRef,
  ...rest
}: AtomDateRangeProps) {
  // Map size
  const antSize: RangePickerProps["size"] =
    size === "xs" ? "small" :
    size === "xl" ? "large" :
    "middle";

  const atomClassName = cn(
    "atom-daterange",
    `atom-daterange--${variant}`,
    `atom-daterange--${size}`,
    className
  );

  return (
    <RangePicker
      size={antSize}
      className={atomClassName}
      {...rest}
    />
  );
}

