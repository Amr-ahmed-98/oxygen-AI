/**
 * ============================================
 * Atomic IconButton - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Button } from "antd";
import { Icon } from "./Icon";
import { cn } from "../utils/cn";

export interface AtomIconButtonProps {
  /**
   * Icon name/type
   */
  icon: string;
  
  /**
   * Variant
   */
  variant?: "solid" | "outline" | "ghost" | "text";
  
  /**
   * Tone
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
   * Loading
   */
  loading?: boolean;
  
  /**
   * Disabled
   */
  disabled?: boolean;
  
  /**
   * On click handler
   */
  onClick?: () => void;
  
  /**
   * Aria label
   */
  "aria-label": string;
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
  
  className?: string;
}

export function IconButton({
  icon,
  variant = "solid",
  tone = "primary",
  size = "md",
  shape = "rounded",
  loading = false,
  disabled = false,
  onClick,
  "aria-label": ariaLabel,
  className,
  importRef,
  ...rest
}: AtomIconButtonProps) {
  // Map variant → Ant type
  const antType =
    variant === "solid" ? "primary" :
    variant === "outline" ? "default" :
    variant === "ghost" ? "default" :
    variant === "text" ? "text" :
    "default";

  // Map tone → danger
  const antDanger = tone === "danger";

  // Map size
  const antSize =
    size === "xs" ? "small" :
    size === "xl" ? "large" :
    "middle";

  // Map shape
  const antShape = shape === "pill" ? "round" : undefined;

  const atomClassName = cn(
    "atom-icon-button",
    `atom-icon-button--${variant}`,
    `atom-icon-button--${tone}`,
    `atom-icon-button--${size}`,
    `atom-icon-button--${shape}`,
    className
  );

  return (
    <Button
      type={antType}
      danger={antDanger}
      size={antSize}
      shape={antShape}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      icon={<Icon type={icon} size={size} />}
      aria-label={ariaLabel}
      className={atomClassName}
      {...rest}
    />
  );
}

