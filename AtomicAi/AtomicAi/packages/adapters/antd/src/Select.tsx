/**
 * ============================================
 * Ant Design Select Adapter
 * ============================================
 */

import React from "react";
import { Select as AntSelect } from "antd";
import type { AtomSelectProps, SelectOption } from "@atomic-ai/ui";

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

  // Map size
  const antSize =
    size === "xs" ? "small" :
    size === "xl" ? "large" :
    "middle";

  // Map variant
  const antVariant = variant === "filled" ? "filled" : "outlined";

  // Map status
  const status = error ? "error" : undefined;

  // Convert options to Ant format
  const antOptions = options.map((opt) => ({
    value: opt.value,
    label: opt.label,
    disabled: opt.disabled,
  }));

  const atomClassName = `atom-select atom-select--${variant} atom-select--${size} ${className}`.trim();

  return (
    <div className={`atom-select-wrapper ${fullWidth ? "atom-select-wrapper--full" : ""}`}>
      {label && <label className="atom-select-label">{label}</label>}
      <AntSelect
        variant={antVariant}
        size={antSize}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        options={antOptions}
        disabled={disabled}
        status={status}
        mode={multiple ? "multiple" : undefined}
        onChange={onChange}
        onBlur={onBlur}
        className={atomClassName}
        style={fullWidth ? { width: "100%" } : undefined}
        {...rest}
      />
      {helperText && (
        <div className={`atom-select-helper ${error ? "atom-select-helper--error" : ""}`}>
          {helperText}
        </div>
      )}
    </div>
  );
}

