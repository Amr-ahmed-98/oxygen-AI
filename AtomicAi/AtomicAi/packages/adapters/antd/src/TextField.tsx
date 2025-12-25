/**
 * ============================================
 * Ant Design TextField Adapter
 * ============================================
 */

import React from "react";
import { Input } from "antd";
import type { AtomTextFieldProps } from "@atomic-ai/ui";

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

  // Map size
  const antSize =
    size === "xs" ? "small" :
    size === "xl" ? "large" :
    "middle";

  // Map variant → status
  const status = error ? "error" : undefined;

  // Map variant → variant prop (Ant 5.x)
  const antVariant = variant === "filled" ? "filled" : "outlined";

  const atomClassName = `atom-textfield atom-textfield--${variant} atom-textfield--${size} ${className}`.trim();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={`atom-textfield-wrapper ${fullWidth ? "atom-textfield-wrapper--full" : ""}`}>
      {label && <label className="atom-textfield-label">{label}</label>}
      <Input
        variant={antVariant}
        size={antSize}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        status={status}
        type={type}
        onChange={handleChange}
        onBlur={onBlur}
        className={atomClassName}
        style={fullWidth ? { width: "100%" } : undefined}
        {...rest}
      />
      {helperText && (
        <div className={`atom-textfield-helper ${error ? "atom-textfield-helper--error" : ""}`}>
          {helperText}
        </div>
      )}
    </div>
  );
}

