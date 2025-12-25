/**
 * ============================================
 * Atomic Skeleton - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Skeleton as AntSkeleton, SkeletonProps as AntSkeletonProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomSkeletonProps extends AntSkeletonProps {
  /**
   * Variant
   */
  variant?: "text" | "circular" | "rectangular";
  
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Skeleton({
  variant = "text",
  size = "md",
  className,
  importRef,
  ...rest
}: AtomSkeletonProps) {
  const atomClassName = cn(
    "atom-skeleton",
    `atom-skeleton--${variant}`,
    `atom-skeleton--${size}`,
    className
  );

  return (
    <AntSkeleton
      className={atomClassName}
      {...rest}
    />
  );
}

