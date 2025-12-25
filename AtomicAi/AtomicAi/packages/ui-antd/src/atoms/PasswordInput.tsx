/**
 * ============================================
 * Atomic PasswordInput - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Input } from "antd";
import { cn } from "../utils/cn";

const { Password } = Input;

export interface AtomPasswordInputProps {
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Variant
   */
  variant?: "outline" | "filled";
  
  /**
   * Placeholder
   */
  placeholder?: string;
  
  /**
   * Value
   */
  value?: string;
  
  /**
   * On change handler
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  
  /**
   * Disabled
   */
  disabled?: boolean;
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
  
  className?: string;
}

export function PasswordInput({
  size = "md",
  variant = "outline",
  placeholder,
  value,
  onChange,
  disabled,
  className,
  importRef,
  ...rest
}: AtomPasswordInputProps) {
  const atomClassName = cn(
    "atom-password-input",
    `atom-password-input--${variant}`,
    `atom-password-input--${size}`,
    className
  );

  return (
    <Password
      className={atomClassName}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      {...rest}
    />
  );
}

