/**
 * ============================================
 * Atomic Image - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Image as AntImage, ImageProps as AntImageProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomImageProps extends AntImageProps {
  /**
   * Variant
   */
  variant?: "default" | "rounded" | "circle";
  
  /**
   * Size
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Image({
  variant = "default",
  size = "md",
  className,
  preview,
  importRef,
  ...rest
}: AtomImageProps) {
  const atomClassName = cn(
    "atom-image",
    `atom-image--${variant}`,
    `atom-image--${size}`,
    className
  );

  const imageStyle: React.CSSProperties = {
    borderRadius: variant === "circle" ? "50%" : variant === "rounded" ? "8px" : 0,
    ...rest.style,
  };

  return (
    <AntImage
      className={atomClassName}
      preview={preview !== false}
      style={imageStyle}
      {...rest}
    />
  );
}

