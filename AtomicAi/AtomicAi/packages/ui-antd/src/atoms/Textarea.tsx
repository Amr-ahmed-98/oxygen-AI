/**
 * ============================================
 * Atomic Textarea - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Input } from "antd";
import { cn } from "../utils/cn";

const { TextArea: AntTextArea } = Input;

export interface AtomTextareaProps {
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Variant
   */
  variant?: "outline" | "filled";
  
  /**
   * Rows
   */
  rows?: number;
  
  /**
   * Auto size
   */
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  
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
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  
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

export function Textarea({
  size = "md",
  variant = "outline",
  rows = 4,
  autoSize,
  placeholder,
  value,
  onChange,
  disabled,
  className,
  importRef,
  ...rest
}: AtomTextareaProps) {
  const atomClassName = cn(
    "atom-textarea",
    `atom-textarea--${variant}`,
    `atom-textarea--${size}`,
    className
  );

  return (
    <AntTextArea
      className={atomClassName}
      rows={rows}
      autoSize={autoSize}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      {...rest}
    />
  );
}

