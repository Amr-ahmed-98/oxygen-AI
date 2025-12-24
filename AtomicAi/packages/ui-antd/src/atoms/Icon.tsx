/**
 * ============================================
 * Atomic Icon - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { createFromIconfontCN } from "@ant-design/icons";
import { cn } from "../utils/cn";

export interface AtomIconProps {
  /**
   * Icon name/type
   */
  type: string;
  
  /**
   * Size
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  
  /**
   * Color
   */
  color?: string;
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
  
  className?: string;
  style?: React.CSSProperties;
}

// Create icon component (you can customize the script URL)
// For now, using a placeholder - replace with your actual iconfont URL
let IconFont: React.ComponentType<{ type: string; className?: string; style?: React.CSSProperties }>;

try {
  IconFont = createFromIconfontCN({
    scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js", // Replace with your iconfont URL
  });
} catch {
  // Fallback if iconfont fails
  IconFont = ({ type, className, style, ...rest }: any) => (
    <span className={className} style={style} {...rest}>
      {type}
    </span>
  );
}

export function Icon({
  type,
  size = "md",
  color,
  className,
  style,
  importRef,
  ...rest
}: AtomIconProps) {
  const sizeMap: Record<string, number> = {
    xs: 12,
    sm: 16,
    md: 20,
    lg: 24,
    xl: 32,
  };

  const iconSize = typeof size === "number" ? size : sizeMap[size] || sizeMap.md;

  const atomClassName = cn(
    "atom-icon",
    typeof size === "string" && `atom-icon--${size}`,
    className
  );

  const iconStyle: React.CSSProperties = {
    fontSize: iconSize,
    color,
    ...style,
  };

  return (
    <IconFont
      type={type}
      className={atomClassName}
      style={iconStyle}
      {...rest}
    />
  );
}

