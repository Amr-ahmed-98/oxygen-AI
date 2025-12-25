/**
 * ============================================
 * Atomic Radio - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Radio as AntRadio, RadioProps as AntRadioProps, RadioGroupProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomRadioProps extends Omit<AntRadioProps, "size"> {
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Variant
   */
  variant?: "default" | "button";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Radio({
  size = "md",
  variant = "default",
  className,
  importRef,
  ...rest
}: AtomRadioProps) {
  const atomClassName = cn(
    "atom-radio",
    `atom-radio--${variant}`,
    `atom-radio--${size}`,
    className
  );

  return (
    <AntRadio
      className={atomClassName}
      {...rest}
    />
  );
}

export const RadioGroup = AntRadio.Group;
export type { RadioGroupProps };

