/**
 * ============================================
 * Atomic Slider - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Slider as AntSlider, SliderProps as AntSliderProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomSliderProps extends AntSliderProps {
  /**
   * Variant
   */
  variant?: "default" | "range";
  
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Slider({
  variant = "default",
  size = "md",
  className,
  importRef,
  ...rest
}: AtomSliderProps) {
  const atomClassName = cn(
    "atom-slider",
    `atom-slider--${variant}`,
    `atom-slider--${size}`,
    className
  );

  return (
    <AntSlider
      className={atomClassName}
      range={variant === "range"}
      {...rest}
    />
  );
}

