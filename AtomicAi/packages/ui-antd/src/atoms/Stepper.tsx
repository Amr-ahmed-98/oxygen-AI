/**
 * ============================================
 * Atomic Stepper - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Steps, StepsProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomStepperProps extends StepsProps {
  /**
   * Variant
   */
  variant?: "default" | "navigation" | "inline";
  
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Stepper({
  variant = "default",
  size = "md",
  className,
  importRef,
  ...rest
}: AtomStepperProps) {
  const atomClassName = cn(
    "atom-stepper",
    `atom-stepper--${variant}`,
    `atom-stepper--${size}`,
    className
  );

  const sizeProp: StepsProps["size"] = size === "sm" ? "small" : undefined;

  return (
    <Steps
      size={sizeProp}
      className={atomClassName}
      {...rest}
    />
  );
}

