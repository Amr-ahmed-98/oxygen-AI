/**
 * ============================================
 * Atomic Kbd - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { cn } from "../utils/cn";

export interface AtomKbdProps {
  /**
   * Keyboard key content
   */
  children: React.ReactNode;
  
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Variant
   */
  variant?: "default" | "outline" | "filled";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
  
  className?: string;
}

export function Kbd({
  children,
  size = "md",
  variant = "outline",
  className,
  importRef,
  ...rest
}: AtomKbdProps) {
  const atomClassName = cn(
    "atom-kbd",
    `atom-kbd--${variant}`,
    `atom-kbd--${size}`,
    className
  );

  const kbdStyle: React.CSSProperties = {
    fontFamily: "monospace",
    backgroundColor: variant === "filled" ? "#f5f5f5" : "transparent",
    border: variant === "outline" ? "1px solid #d9d9d9" : "none",
    borderRadius: "4px",
    padding: size === "sm" ? "2px 6px" : size === "lg" ? "6px 12px" : "4px 8px",
    fontSize: size === "sm" ? "11px" : size === "lg" ? "14px" : "12px",
    fontWeight: 600,
    boxShadow: variant === "outline" ? "0 1px 2px rgba(0, 0, 0, 0.1)" : "none",
  };

  return (
    <kbd className={atomClassName} style={kbdStyle} {...rest}>
      {children}
    </kbd>
  );
}

