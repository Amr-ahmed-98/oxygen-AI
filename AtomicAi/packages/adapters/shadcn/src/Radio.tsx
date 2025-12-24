/**
 * ============================================
 * shadcn/ui Radio Adapter
 * ============================================
 */

import React from "react";
import { cn } from "./utils";
import type { AtomRadioProps, AtomRadioGroupProps } from "@atomic-ai/ui";

const radioSizes = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export function Radio(props: AtomRadioProps) {
  const {
    value,
    checked,
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
        type="radio"
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          "border-neutral-300 text-primary-600 focus:ring-2 focus:ring-primary-500",
          radioSizes[size],
          className
        )}
        {...rest}
      />
      {label && <span className="text-sm">{label}</span>}
    </label>
  );
}

export function RadioGroup(props: AtomRadioGroupProps) {
  const { value, defaultValue, options, onChange, className = "" } = props;
  const [selectedValue, setSelectedValue] = React.useState<string | undefined>(value || defaultValue);

  const handleChange = (val: string) => {
    setSelectedValue(val);
    onChange?.(val);
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {options.map((opt) => (
        <Radio
          key={opt.value}
          value={opt.value}
          checked={selectedValue === opt.value}
          disabled={opt.disabled}
          label={opt.label}
          onChange={handleChange}
        />
      ))}
    </div>
  );
}

