/**
 * ============================================
 * Atomic Link - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Typography } from "antd";
import { cn } from "../utils/cn";

const { Link: AntLink } = Typography;

export interface AtomLinkProps {
  /**
   * Link content
   */
  children: React.ReactNode;
  
  /**
   * Link URL
   */
  href?: string;
  
  /**
   * Variant
   */
  variant?: "default" | "primary" | "secondary" | "underline" | "button";
  
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * External link
   */
  external?: boolean;
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
  
  className?: string;
  onClick?: () => void;
}

export function Link({
  children,
  href,
  variant = "default",
  size = "md",
  external = false,
  className,
  onClick,
  importRef,
  ...rest
}: AtomLinkProps) {
  const atomClassName = cn(
    "atom-link",
    `atom-link--${variant}`,
    `atom-link--${size}`,
    className
  );

  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <AntLink
      href={href}
      className={atomClassName}
      onClick={onClick}
      {...linkProps}
      {...rest}
    >
      {children}
    </AntLink>
  );
}

