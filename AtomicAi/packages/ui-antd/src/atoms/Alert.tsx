/**
 * ============================================
 * Atomic Alert - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Alert as AntAlert, AlertProps as AntAlertProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomAlertProps extends Omit<AntAlertProps, "type"> {
  /**
   * Alert type
   */
  type?: "success" | "info" | "warning" | "error";
  
  /**
   * Variant
   */
  variant?: "filled" | "outline" | "minimal";
  
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Alert({
  type = "info",
  variant = "outline",
  size = "md",
  className,
  importRef,
  ...rest
}: AtomAlertProps) {
  const atomClassName = cn(
    "atom-alert",
    `atom-alert--${variant}`,
    `atom-alert--${size}`,
    className
  );

  return (
    <AntAlert
      type={type}
      className={atomClassName}
      {...rest}
    />
  );
}

