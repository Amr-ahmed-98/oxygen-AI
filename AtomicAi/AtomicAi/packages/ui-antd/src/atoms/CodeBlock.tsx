/**
 * ============================================
 * Atomic CodeBlock - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Typography } from "antd";
import { cn } from "../utils/cn";

const { Paragraph } = Typography;

export interface AtomCodeBlockProps {
  /**
   * Code content
   */
  children: React.ReactNode;
  
  /**
   * Language
   */
  language?: string;
  
  /**
   * Variant
   */
  variant?: "default" | "inline" | "block";
  
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
  
  className?: string;
}

export function CodeBlock({
  children,
  language,
  variant = "block",
  size = "md",
  className,
  importRef,
  ...rest
}: AtomCodeBlockProps) {
  const atomClassName = cn(
    "atom-code-block",
    `atom-code-block--${variant}`,
    `atom-code-block--${size}`,
    className
  );

  const codeStyle: React.CSSProperties = {
    fontFamily: "monospace",
    backgroundColor: variant === "inline" ? "#f5f5f5" : "#1e1e1e",
    color: variant === "inline" ? "#000" : "#d4d4d4",
    padding: variant === "inline" ? "2px 6px" : "16px",
    borderRadius: variant === "inline" ? "4px" : "8px",
    fontSize: size === "sm" ? "12px" : size === "lg" ? "16px" : "14px",
    display: variant === "inline" ? "inline" : "block",
    overflow: variant === "block" ? "auto" : "visible",
  };

  if (variant === "inline") {
    return (
      <code className={atomClassName} style={codeStyle} {...rest}>
        {children}
      </code>
    );
  }

  return (
    <pre className={atomClassName} style={codeStyle} {...rest}>
      <code>{children}</code>
    </pre>
  );
}

