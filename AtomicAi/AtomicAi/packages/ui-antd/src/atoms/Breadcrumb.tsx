/**
 * ============================================
 * Atomic Breadcrumb - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Breadcrumb as AntBreadcrumb, BreadcrumbProps as AntBreadcrumbProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomBreadcrumbProps extends AntBreadcrumbProps {
  /**
   * Variant
   */
  variant?: "default" | "separator" | "icon";
  
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Breadcrumb({
  variant = "default",
  size = "md",
  className,
  importRef,
  ...rest
}: AtomBreadcrumbProps) {
  const atomClassName = cn(
    "atom-breadcrumb",
    `atom-breadcrumb--${variant}`,
    `atom-breadcrumb--${size}`,
    className
  );

  return (
    <AntBreadcrumb
      className={atomClassName}
      {...rest}
    />
  );
}

