/**
 * ============================================
 * Atomic Drawer - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Drawer as AntDrawer, DrawerProps as AntDrawerProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomDrawerProps extends AntDrawerProps {
  /**
   * Variant
   */
  variant?: "default" | "right" | "left" | "top" | "bottom";
  
  /**
   * Size
   */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Drawer({
  variant = "right",
  size = "md",
  className,
  placement,
  importRef,
  ...rest
}: AtomDrawerProps) {
  const atomClassName = cn(
    "atom-drawer",
    `atom-drawer--${variant}`,
    `atom-drawer--${size}`,
    className
  );

  // Map variant to placement
  const drawerPlacement: AntDrawerProps["placement"] = placement || 
    (variant === "left" ? "left" :
     variant === "top" ? "top" :
     variant === "bottom" ? "bottom" :
     "right");

  // Map size to width/height
  const sizeMap: Record<string, string | number> = {
    sm: 320,
    md: 480,
    lg: 640,
    xl: 800,
    full: "100%",
  };

  const width = drawerPlacement === "left" || drawerPlacement === "right" 
    ? sizeMap[size] || sizeMap.md 
    : undefined;
  const height = drawerPlacement === "top" || drawerPlacement === "bottom"
    ? sizeMap[size] || sizeMap.md
    : undefined;

  return (
    <AntDrawer
      placement={drawerPlacement}
      width={width}
      height={height}
      className={atomClassName}
      {...rest}
    />
  );
}

