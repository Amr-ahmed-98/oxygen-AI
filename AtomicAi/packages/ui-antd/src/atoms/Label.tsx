/**
 * ============================================
 * Atomic Label - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Typography } from "antd";
import { cn } from "../utils/cn";

const { Text } = Typography;

export interface AtomLabelProps {
  /**
   * Label content
   */
  children: React.ReactNode;
  
  /**
   * Required indicator
   */
  required?: boolean;
  
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Color
   */
  color?: "primary" | "secondary" | "neutral" | "error";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
  
  className?: string;
  htmlFor?: string;
}

export function Label({
  children,
  required = false,
  size = "md",
  color = "neutral",
  className,
  htmlFor,
  importRef,
  ...rest
}: AtomLabelProps) {
  const atomClassName = cn(
    "atom-label",
    `atom-label--${size}`,
    `atom-label--${color}`,
    required && "atom-label--required",
    className
  );

  return (
    <label htmlFor={htmlFor} className={atomClassName} {...rest}>
      <Text className={atomClassName}>
        {children}
        {required && <span className="atom-label-required"> *</span>}
      </Text>
    </label>
  );
}

