/**
 * ============================================
 * Atomic Text - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Typography } from "antd";
import { cn } from "../utils/cn";

const { Text: AntText } = Typography;

export interface AtomTextProps {
  /**
   * Text content
   */
  children: React.ReactNode;
  
  /**
   * Variant
   */
  variant?: "body" | "caption" | "overline" | "code";
  
  /**
   * Size
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  
  /**
   * Weight
   */
  weight?: "normal" | "medium" | "semibold" | "bold";
  
  /**
   * Color
   */
  color?: "primary" | "secondary" | "success" | "warning" | "danger" | "neutral";
  
  /**
   * Truncate
   */
  truncate?: boolean;
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
  
  className?: string;
}

export function Text({
  children,
  variant = "body",
  size = "md",
  weight = "normal",
  color = "neutral",
  truncate = false,
  className,
  importRef,
  ...rest
}: AtomTextProps) {
  const atomClassName = cn(
    "atom-text",
    `atom-text--${variant}`,
    `atom-text--${size}`,
    `atom-text--${weight}`,
    `atom-text--${color}`,
    truncate && "atom-text--truncate",
    className
  );

  return (
    <AntText className={atomClassName} {...rest}>
      {children}
    </AntText>
  );
}

