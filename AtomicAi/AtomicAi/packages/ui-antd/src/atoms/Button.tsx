/**
 * ============================================
 * Atomic Button - Ant Design Wrapper
 * ============================================
 * 
 * Unified Button API wrapping Ant Design
 * Supports: variant, tone, size, shape, density, state
 */

import React from "react";
import { Button as AntButton, ButtonProps as AntButtonProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomButtonProps extends Omit<AntButtonProps, "type" | "size" | "danger"> {
  /**
   * Visual style variant
   */
  variant?: "solid" | "outline" | "ghost" | "text" | "link";
  
  /**
   * Color tone
   */
  tone?: "primary" | "success" | "warning" | "danger" | "info" | "neutral";
  
  /**
   * Size
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  
  /**
   * Shape
   */
  shape?: "square" | "rounded" | "pill";
  
  /**
   * Density (affects padding)
   */
  density?: "compact" | "comfortable" | "spacious";
  
  /**
   * Loading state
   */
  loading?: boolean;
  
  /**
   * Disabled state
   */
  disabled?: boolean;
  
  /**
   * Full width
   */
  fullWidth?: boolean;
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Button({
  variant = "solid",
  tone = "primary",
  size = "md",
  shape = "rounded",
  density = "comfortable",
  fullWidth = false,
  loading = false,
  disabled = false,
  children,
  className,
  importRef,
  ...rest
}: AtomButtonProps) {
  // Map variant → Ant type
  const antType: AntButtonProps["type"] =
    variant === "solid" ? "primary" :
    variant === "outline" ? "default" :
    variant === "ghost" ? "default" :
    variant === "text" ? "text" :
    variant === "link" ? "link" :
    "default";

  // Map tone → danger
  const antDanger = tone === "danger";

  // Map size
  const antSize: AntButtonProps["size"] =
    size === "xs" ? "small" :
    size === "xl" ? "large" :
    "middle";

  // Map shape
  const antShape: AntButtonProps["shape"] =
    shape === "pill" ? "round" :
    shape === "square" ? undefined :
    "default";

  // Build className with atomic classes
  const atomClassName = cn(
    "atom-btn",
    `atom-btn--${variant}`,
    `atom-btn--${tone}`,
    `atom-btn--${size}`,
    `atom-btn--${shape}`,
    `atom-btn--${density}`,
    className
  );

  return (
    <AntButton
      type={antType}
      danger={antDanger}
      size={antSize}
      shape={antShape}
      block={fullWidth}
      loading={loading}
      disabled={disabled}
      className={atomClassName}
      {...rest}
    >
      {children}
    </AntButton>
  );
}

