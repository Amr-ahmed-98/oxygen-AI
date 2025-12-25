/**
 * ============================================
 * Atomic Tooltip - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Tooltip as AntTooltip, TooltipProps as AntTooltipProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomTooltipProps extends AntTooltipProps {
  /**
   * Variant
   */
  variant?: "default" | "light" | "dark";
  
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Tooltip({
  variant = "default",
  size = "md",
  className,
  overlayClassName,
  importRef,
  ...rest
}: AtomTooltipProps) {
  const atomClassName = cn(
    "atom-tooltip",
    `atom-tooltip--${variant}`,
    `atom-tooltip--${size}`,
    className
  );

  const atomOverlayClassName = cn(
    "atom-tooltip-overlay",
    `atom-tooltip-overlay--${variant}`,
    overlayClassName
  );

  return (
    <AntTooltip
      className={atomClassName}
      overlayClassName={atomOverlayClassName}
      {...rest}
    />
  );
}

