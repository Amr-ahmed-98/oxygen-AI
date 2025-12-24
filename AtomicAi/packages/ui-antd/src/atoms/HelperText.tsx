/**
 * ============================================
 * Atomic HelperText - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Typography } from "antd";
import { cn } from "../utils/cn";

const { Text } = Typography;

export interface AtomHelperTextProps {
  /**
   * Helper text content
   */
  children: React.ReactNode;
  
  /**
   * Variant
   */
  variant?: "default" | "error" | "success" | "warning";
  
  /**
   * Size
   */
  size?: "xs" | "sm" | "md";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
  
  className?: string;
}

export function HelperText({
  children,
  variant = "default",
  size = "sm",
  className,
  importRef,
  ...rest
}: AtomHelperTextProps) {
  const atomClassName = cn(
    "atom-helper-text",
    `atom-helper-text--${variant}`,
    `atom-helper-text--${size}`,
    className
  );

  const colorMap: Record<string, string> = {
    error: "#ff4d4f",
    success: "#52c41a",
    warning: "#faad14",
    default: "#8c8c8c",
  };

  return (
    <Text
      className={atomClassName}
      style={{ color: colorMap[variant], fontSize: size === "xs" ? "12px" : size === "sm" ? "13px" : "14px" }}
      {...rest}
    >
      {children}
    </Text>
  );
}

