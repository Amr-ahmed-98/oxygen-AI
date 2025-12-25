/**
 * ============================================
 * Atomic Progress - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Progress as AntProgress, ProgressProps as AntProgressProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomProgressProps extends Omit<AntProgressProps, "type"> {
  /**
   * Progress type
   */
  type?: "line" | "circle" | "dashboard";
  
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Status
   */
  status?: "success" | "exception" | "active" | "normal";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Progress({
  type = "line",
  size = "md",
  status = "normal",
  className,
  importRef,
  ...rest
}: AtomProgressProps) {
  const atomClassName = cn(
    "atom-progress",
    `atom-progress--${type}`,
    `atom-progress--${size}`,
    className
  );

  return (
    <AntProgress
      type={type}
      status={status}
      className={atomClassName}
      {...rest}
    />
  );
}

