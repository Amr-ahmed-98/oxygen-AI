/**
 * ============================================
 * Atomic Avatar - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Avatar as AntAvatar, AvatarProps as AntAvatarProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomAvatarProps extends Omit<AntAvatarProps, "size"> {
  /**
   * Size
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  
  /**
   * Variant
   */
  variant?: "circle" | "square" | "rounded";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Avatar({
  size = "md",
  variant = "circle",
  className,
  importRef,
  ...rest
}: AtomAvatarProps) {
  // Map size
  const antSize: AntAvatarProps["size"] =
    typeof size === "number" ? size :
    size === "xs" ? 24 :
    size === "sm" ? 32 :
    size === "lg" ? 64 :
    size === "xl" ? 96 :
    40;

  // Map variant to shape
  const shape: AntAvatarProps["shape"] = variant === "square" ? "square" : "circle";

  const atomClassName = cn(
    "atom-avatar",
    `atom-avatar--${variant}`,
    typeof size === "string" && `atom-avatar--${size}`,
    className
  );

  return (
    <AntAvatar
      size={antSize}
      shape={shape}
      className={atomClassName}
      {...rest}
    />
  );
}

