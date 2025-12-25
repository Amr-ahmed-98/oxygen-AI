/**
 * ============================================
 * shadcn/ui Checkbox Adapter
 * ============================================
 */

import React from "react";
import { cn } from "./utils";
import type { AtomCheckboxProps } from "@atomic-ai/ui";

const checkboxSizes = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export function Checkbox(props: AtomCheckboxProps) {
  const {
    checked,
    defaultChecked,
    disabled,
    label,
    size = "md",
    onChange,
    className = "",
    ...rest
  } = props;

  return (
    <label className={cn("flex items-center gap-2 cursor-pointer", disabled && "opacity-50 cursor-not-allowed")}>
      <input
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className={cn(
          "rounded border-neutral-300 text-primary-600 focus:ring-2 focus:ring-primary-500",
          checkboxSizes[size],
          className
        )}
        {...rest}
      />
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
}

