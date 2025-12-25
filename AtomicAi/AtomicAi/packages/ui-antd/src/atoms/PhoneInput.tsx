/**
 * ============================================
 * Atomic PhoneInput - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Input } from "antd";
import { cn } from "../utils/cn";

export interface AtomPhoneInputProps {
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

export function PhoneInput({
  size = "md",
  variant = "outline",
  placeholder = "+1 (555) 000-0000",
  value,
  onChange,
  disabled,
  className,
  importRef,
  ...rest
}: AtomPhoneInputProps) {
  const atomClassName = cn(
    "atom-phone-input",
    `atom-phone-input--${variant}`,
    `atom-phone-input--${size}`,
    className
  );

  // Format phone number
  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/\D/g, "");
    if (phoneNumber.length < 4) return phoneNumber;
    if (phoneNumber.length < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: { ...e.target, value: formatted },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  return (
    <Input
      className={atomClassName}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      disabled={disabled}
      {...rest}
    />
  );
}

