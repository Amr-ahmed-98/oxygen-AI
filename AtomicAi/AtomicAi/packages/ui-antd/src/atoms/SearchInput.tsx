/**
 * ============================================
 * Atomic SearchInput - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Input } from "antd";
import { cn } from "../utils/cn";

const { Search } = Input;

export interface AtomSearchInputProps {
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
   * On search handler
   */
  onSearch?: (value: string) => void;
  
  /**
   * Loading
   */
  loading?: boolean;
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
  
  className?: string;
}

export function SearchInput({
  size = "md",
  variant = "outline",
  placeholder = "Search...",
  value,
  onChange,
  onSearch,
  loading,
  className,
  importRef,
  ...rest
}: AtomSearchInputProps) {
  const atomClassName = cn(
    "atom-search-input",
    `atom-search-input--${variant}`,
    `atom-search-input--${size}`,
    className
  );

  return (
    <Search
      className={atomClassName}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onSearch={onSearch}
      loading={loading}
      {...rest}
    />
  );
}

