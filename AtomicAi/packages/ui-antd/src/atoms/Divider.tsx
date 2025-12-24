/**
 * ============================================
 * Atomic Divider - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Divider as AntDivider, DividerProps as AntDividerProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomDividerProps extends AntDividerProps {
  /**
   * Variant
   */
  variant?: "solid" | "dashed" | "dotted";
  
  /**
   * Orientation
   */
  orientation?: "left" | "right" | "center";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Divider({
  variant = "solid",
  orientation = "center",
  className,
  importRef,
  ...rest
}: AtomDividerProps) {
  const atomClassName = cn(
    "atom-divider",
    `atom-divider--${variant}`,
    className
  );

  return (
    <AntDivider
      type={variant === "dashed" ? "dashed" : "horizontal"}
      orientation={orientation}
      className={atomClassName}
      {...rest}
    />
  );
}

