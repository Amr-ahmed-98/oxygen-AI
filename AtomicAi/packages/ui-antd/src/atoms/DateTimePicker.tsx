/**
 * ============================================
 * Atomic DateTimePicker - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { DatePicker } from "antd";
import type { DatePickerProps } from "antd/es/date-picker";
import { cn } from "../utils/cn";

export interface AtomDateTimePickerProps extends Omit<DatePickerProps, "size" | "showTime"> {
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

export function DateTimePicker({
  size = "md",
  variant = "outline",
  className,
  importRef,
  ...rest
}: AtomDateTimePickerProps) {
  // Map size
  const antSize: DatePickerProps["size"] =
    size === "xs" ? "small" :
    size === "xl" ? "large" :
    "middle";

  const atomClassName = cn(
    "atom-datetimepicker",
    `atom-datetimepicker--${variant}`,
    `atom-datetimepicker--${size}`,
    className
  );

  return (
    <DatePicker
      size={antSize}
      showTime
      className={atomClassName}
      {...rest}
    />
  );
}

