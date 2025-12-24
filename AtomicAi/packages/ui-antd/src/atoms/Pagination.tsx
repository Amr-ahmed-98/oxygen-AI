/**
 * ============================================
 * Atomic Pagination - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Pagination as AntPagination, PaginationProps as AntPaginationProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomPaginationProps extends AntPaginationProps {
  /**
   * Variant
   */
  variant?: "default" | "simple" | "mini";
  
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Pagination({
  variant = "default",
  size = "md",
  className,
  importRef,
  ...rest
}: AtomPaginationProps) {
  const atomClassName = cn(
    "atom-pagination",
    `atom-pagination--${variant}`,
    `atom-pagination--${size}`,
    className
  );

  const simple = variant === "simple";
  const sizeProp: AntPaginationProps["size"] = size === "sm" ? "small" : undefined;

  return (
    <AntPagination
      simple={simple}
      size={sizeProp}
      className={atomClassName}
      {...rest}
    />
  );
}

