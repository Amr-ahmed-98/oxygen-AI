/**
 * ============================================
 * Atomic Calendar - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Calendar as AntCalendar, CalendarProps as AntCalendarProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomCalendarProps extends AntCalendarProps {
  /**
   * Variant
   */
  variant?: "default" | "fullscreen" | "card";
  
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Calendar({
  variant = "default",
  size = "md",
  className,
  importRef,
  ...rest
}: AtomCalendarProps) {
  const atomClassName = cn(
    "atom-calendar",
    `atom-calendar--${variant}`,
    `atom-calendar--${size}`,
    className
  );

  const fullscreen = variant === "fullscreen";

  return (
    <AntCalendar
      fullscreen={fullscreen}
      className={atomClassName}
      {...rest}
    />
  );
}

