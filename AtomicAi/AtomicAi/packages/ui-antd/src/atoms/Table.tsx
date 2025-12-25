/**
 * ============================================
 * Atomic Table - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Table as AntTable, TableProps as AntTableProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomTableProps<T = any> extends Omit<AntTableProps<T>, "size"> {
  /**
   * Size
   */
  size?: "xs" | "sm" | "md" | "lg";
  
  /**
   * Variant
   */
  variant?: "bordered" | "striped" | "minimal";
  
  /**
   * Density
   */
  density?: "compact" | "comfortable" | "spacious";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Table<T = any>({
  size = "md",
  variant = "bordered",
  density = "comfortable",
  className,
  importRef,
  ...rest
}: AtomTableProps<T>) {
  // Map size
  const antSize: AntTableProps<T>["size"] =
    size === "xs" ? "small" :
    size === "lg" ? "large" :
    "middle";

  const atomClassName = cn(
    "atom-table",
    `atom-table--${variant}`,
    `atom-table--${size}`,
    `atom-table--${density}`,
    className
  );

  return (
    <AntTable<T>
      size={antSize}
      className={atomClassName}
      {...rest}
    />
  );
}

