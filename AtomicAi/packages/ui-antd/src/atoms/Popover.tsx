/**
 * ============================================
 * Atomic Popover - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Popover as AntPopover, PopoverProps as AntPopoverProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomPopoverProps extends AntPopoverProps {
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

export function Popover({
  variant = "default",
  size = "md",
  className,
  overlayClassName,
  importRef,
  ...rest
}: AtomPopoverProps) {
  const atomClassName = cn(
    "atom-popover",
    `atom-popover--${variant}`,
    `atom-popover--${size}`,
    className
  );

  const atomOverlayClassName = cn(
    "atom-popover-overlay",
    `atom-popover-overlay--${variant}`,
    overlayClassName
  );

  return (
    <AntPopover
      className={atomClassName}
      overlayClassName={atomOverlayClassName}
      {...rest}
    />
  );
}

