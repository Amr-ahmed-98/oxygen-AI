/**
 * ============================================
 * Atomic Tabs - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Tabs as AntTabs, TabsProps as AntTabsProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomTabsProps extends AntTabsProps {
  /**
   * Variant
   */
  variant?: "default" | "card" | "line";
  
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Tabs({
  variant = "default",
  size = "md",
  className,
  importRef,
  ...rest
}: AtomTabsProps) {
  const atomClassName = cn(
    "atom-tabs",
    `atom-tabs--${variant}`,
    `atom-tabs--${size}`,
    className
  );

  const type: AntTabsProps["type"] = variant === "card" ? "card" : "line";
  const sizeProp: AntTabsProps["size"] = size === "sm" ? "small" : size === "lg" ? "large" : undefined;

  return (
    <AntTabs
      type={type}
      size={sizeProp}
      className={atomClassName}
      {...rest}
    />
  );
}

