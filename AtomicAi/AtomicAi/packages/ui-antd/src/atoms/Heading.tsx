/**
 * ============================================
 * Atomic Heading - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Typography } from "antd";
import { cn } from "../utils/cn";

const { Title } = Typography;

export interface AtomHeadingProps {
  /**
   * Heading content
   */
  children: React.ReactNode;
  
  /**
   * Heading level
   */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  
  /**
   * Variant
   */
  variant?: "display" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  
  /**
   * Weight
   */
  weight?: "normal" | "medium" | "semibold" | "bold";
  
  /**
   * Color
   */
  color?: "primary" | "secondary" | "neutral";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
  
  className?: string;
}

export function Heading({
  children,
  level = 1,
  variant,
  weight = "bold",
  color = "neutral",
  className,
  importRef,
  ...rest
}: AtomHeadingProps) {
  const headingLevel = variant ? parseInt(variant.replace("h", "")) || level : level;
  const atomClassName = cn(
    "atom-heading",
    `atom-heading--${variant || `h${headingLevel}`}`,
    `atom-heading--${weight}`,
    `atom-heading--${color}`,
    className
  );

  return (
    <Title level={headingLevel} className={atomClassName} {...rest}>
      {children}
    </Title>
  );
}

