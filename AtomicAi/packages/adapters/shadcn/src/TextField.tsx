/**
 * ============================================
 * shadcn/ui TextField Adapter
 * ============================================
 */

import React from "react";
import { cn } from "./utils";
import type { AtomTextFieldProps } from "@atomic-ai/ui";

const textFieldVariants = {
  variant: {
    outline: "border border-neutral-300 bg-transparent",
    filled: "border-0 bg-neutral-100",
    underline: "border-0 border-b-2 border-neutral-300 rounded-none",
  },
  size: {
    xs: "h-7 px-2 text-xs",
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-5 text-lg",
    xl: "h-14 px-6 text-xl",
  },
};

export function TextField(props: AtomTextFieldProps) {
  const {
    variant = "outline",
    size = "md",
    placeholder,
    value,
    defaultValue,
    disabled,
    error,
    label,
    helperText,
    fullWidth,
    type = "text",
    onChange,
    onBlur,
    className = "",
    ...rest
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={cn("atom-textfield-wrapper", fullWidth && "w-full")}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={handleChange}
        onBlur={onBlur}
        className={cn(
          "rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
          textFieldVariants.variant[variant],
          textFieldVariants.size[size],
          error && "border-danger-500 focus:ring-danger-500",
          disabled && "opacity-50 cursor-not-allowed",
          fullWidth && "w-full",
          className
        )}
        {...rest}
      />
      {helperText && (
        <div
          className={cn(
            "mt-1 text-sm",
            error ? "text-danger-600" : "text-neutral-500"
          )}
        >
          {helperText}
        </div>
      )}
    </div>
  );
}

