/**
 * ============================================
 * shadcn/ui Select Adapter
 * ============================================
 */

import React from "react";
import { cn } from "./utils";
import type { AtomSelectProps, SelectOption } from "@atomic-ai/ui";

const selectVariants = {
  variant: {
    outline: "border border-neutral-300 bg-transparent",
    filled: "border-0 bg-neutral-100",
  },
  size: {
    xs: "h-7 px-2 text-xs",
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-base",
    lg: "h-12 px-5 text-lg",
    xl: "h-14 px-6 text-xl",
  },
};

export function Select(props: AtomSelectProps) {
  const {
    variant = "outline",
    size = "md",
    placeholder,
    value,
    defaultValue,
    options,
    disabled,
    error,
    label,
    helperText,
    fullWidth,
    multiple,
    onChange,
    onBlur,
    className = "",
    ...rest
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (multiple) {
      const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
      onChange?.(selected);
    } else {
      onChange?.(e.target.value);
    }
  };

  return (
    <div className={cn("atom-select-wrapper", fullWidth && "w-full")}>
      {label && (
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          {label}
        </label>
      )}
      <select
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        multiple={multiple}
        onChange={handleChange}
        onBlur={onBlur}
        className={cn(
          "rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
          selectVariants.variant[variant],
          selectVariants.size[size],
          error && "border-danger-500 focus:ring-danger-500",
          disabled && "opacity-50 cursor-not-allowed",
          fullWidth && "w-full",
          className
        )}
        {...rest}
      >
        {placeholder && !multiple && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
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

