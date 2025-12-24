/**
 * ============================================
 * Atomic Switch - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Switch as AntSwitch, SwitchProps as AntSwitchProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomSwitchProps extends Omit<AntSwitchProps, "size"> {
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Variant
   */
  variant?: "default" | "filled";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Switch({
  size = "md",
  variant = "default",
  className,
  importRef,
  ...rest
}: AtomSwitchProps) {
  const atomClassName = cn(
    "atom-switch",
    `atom-switch--${variant}`,
    `atom-switch--${size}`,
    className
  );

  return (
    <AntSwitch
      className={atomClassName}
      {...rest}
    />
  );
}

