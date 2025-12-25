/**
 * ============================================
 * Atomic CurrencyInput - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { InputNumber, InputNumberProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomCurrencyInputProps extends Omit<InputNumberProps, "size" | "formatter" | "parser"> {
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Variant
   */
  variant?: "outline" | "filled";
  
  /**
   * Currency code
   */
  currency?: string;
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function CurrencyInput({
  size = "md",
  variant = "outline",
  currency = "USD",
  className,
  importRef,
  ...rest
}: AtomCurrencyInputProps) {
  const atomClassName = cn(
    "atom-currency-input",
    `atom-currency-input--${variant}`,
    `atom-currency-input--${size}`,
    className
  );

  // Format currency
  const formatter = (value: number | undefined) => {
    if (!value) return "";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(value);
  };

  const parser = (value: string | undefined) => {
    if (!value) return 0;
    return parseFloat(value.replace(/[^0-9.-]+/g, ""));
  };

  return (
    <InputNumber
      className={atomClassName}
      formatter={formatter}
      parser={parser}
      {...rest}
    />
  );
}

