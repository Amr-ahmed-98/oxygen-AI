/**
 * ============================================
 * Atomic Loading - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Spin, SpinProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomLoadingProps extends SpinProps {
  /**
   * Variant
   */
  variant?: "spinner" | "dots" | "skeleton";
  
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Loading({
  variant = "spinner",
  size = "md",
  className,
  importRef,
  ...rest
}: AtomLoadingProps) {
  const atomClassName = cn(
    "atom-loading",
    `atom-loading--${variant}`,
    `atom-loading--${size}`,
    className
  );

  const sizeProp: SpinProps["size"] = size === "sm" ? "small" : size === "lg" ? "large" : undefined;

  return (
    <Spin
      size={sizeProp}
      className={atomClassName}
      {...rest}
    />
  );
}

