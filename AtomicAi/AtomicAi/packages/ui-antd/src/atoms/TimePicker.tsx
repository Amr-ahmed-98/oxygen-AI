/**
 * ============================================
 * Atomic TimePicker - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { TimePicker as AntTimePicker, TimePickerProps as AntTimePickerProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomTimePickerProps extends Omit<AntTimePickerProps, "size"> {
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

export function TimePicker({
  size = "md",
  variant = "outline",
  className,
  importRef,
  ...rest
}: AtomTimePickerProps) {
  // Map size
  const antSize: AntTimePickerProps["size"] =
    size === "xs" ? "small" :
    size === "xl" ? "large" :
    "middle";

  const atomClassName = cn(
    "atom-timepicker",
    `atom-timepicker--${variant}`,
    `atom-timepicker--${size}`,
    className
  );

  return (
    <AntTimePicker
      size={antSize}
      className={atomClassName}
      {...rest}
    />
  );
}

