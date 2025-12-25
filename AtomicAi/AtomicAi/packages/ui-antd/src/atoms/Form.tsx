/**
 * ============================================
 * Atomic Form - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Form as AntForm, FormProps as AntFormProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomFormProps extends AntFormProps {
  /**
   * Variant
   */
  variant?: "outline" | "filled" | "minimal";
  
  /**
   * Density
   */
  density?: "compact" | "comfortable" | "spacious";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Form({
  variant = "outline",
  density = "comfortable",
  className,
  importRef,
  ...rest
}: AtomFormProps) {
  const atomClassName = cn(
    "atom-form",
    `atom-form--${variant}`,
    `atom-form--${density}`,
    className
  );

  return (
    <AntForm
      className={atomClassName}
      {...rest}
    />
  );
}

