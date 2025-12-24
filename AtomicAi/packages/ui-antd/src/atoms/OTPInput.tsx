/**
 * ============================================
 * Atomic OTPInput - Ant Design Wrapper
 * ============================================
 */

import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { cn } from "../utils/cn";

export interface AtomOTPInputProps {
  /**
   * Number of digits
   */
  length?: number;
  
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Variant
   */
  variant?: "outline" | "filled";
  
  /**
   * Value
   */
  value?: string;
  
  /**
   * On change handler
   */
  onChange?: (value: string) => void;
  
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

export function OTPInput({
  length = 6,
  size = "md",
  variant = "outline",
  value,
  onChange,
  disabled,
  className,
  importRef,
  ...rest
}: AtomOTPInputProps) {
  const [otp, setOtp] = useState<string[]>(() => {
    if (value) {
      return value.split("").slice(0, length);
    }
    return new Array(length).fill("");
  });

  useEffect(() => {
    if (value !== undefined) {
      setOtp(value.split("").slice(0, length));
    }
  }, [value, length]);

  const handleChange = (index: number, inputValue: string) => {
    if (!/^\d*$/.test(inputValue)) return; // Only numbers

    const newOtp = [...otp];
    newOtp[index] = inputValue.slice(-1); // Only last character
    setOtp(newOtp);

    const otpValue = newOtp.join("");
    if (onChange) {
      onChange(otpValue);
    }

    // Auto-focus next input
    if (inputValue && index < length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const atomClassName = cn(
    "atom-otp-input",
    `atom-otp-input--${variant}`,
    `atom-otp-input--${size}`,
    className
  );

  return (
    <div className={atomClassName} style={{ display: "flex", gap: "8px" }}>
      {otp.map((digit, index) => (
        <Input
          key={index}
          id={`otp-input-${index}`}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={disabled}
          maxLength={1}
          style={{ width: "48px", textAlign: "center" }}
          {...rest}
        />
      ))}
    </div>
  );
}

