/**
 * ============================================
 * Atomic Badge - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Badge as AntBadge, BadgeProps as AntBadgeProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomBadgeProps extends Omit<AntBadgeProps, "status"> {
  /**
   * Badge variant
   */
  variant?: "dot" | "count" | "text";
  
  /**
   * Status (for dot variant)
   */
  status?: "success" | "processing" | "default" | "error" | "warning";
  
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Tone
   */
  tone?: "primary" | "success" | "warning" | "danger" | "info" | "neutral";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Badge({
  variant = "count",
  status,
  size = "md",
  tone = "primary",
  className,
  children,
  importRef,
  ...rest
}: AtomBadgeProps) {
  const atomClassName = cn(
    "atom-badge",
    `atom-badge--${variant}`,
    `atom-badge--${size}`,
    `atom-badge--${tone}`,
    className
  );

  // Map tone to status for dot variant
  const badgeStatus = variant === "dot" && !status
    ? (tone === "success" ? "success" :
       tone === "warning" ? "warning" :
       tone === "danger" ? "error" :
       "default")
    : status;

  return (
    <AntBadge
      status={badgeStatus}
      className={atomClassName}
      {...rest}
    >
      {children}
    </AntBadge>
  );
}

