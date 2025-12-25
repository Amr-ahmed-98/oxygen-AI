/**
 * ============================================
 * Ant Design Checkbox Adapter
 * ============================================
 */

import React from "react";
import { Checkbox as AntCheckbox } from "antd";
import type { AtomCheckboxProps } from "@atomic-ai/ui";

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

  const atomClassName = `atom-checkbox atom-checkbox--${size} ${className}`.trim();

  return (
    <AntCheckbox
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.checked)}
      className={atomClassName}
      {...rest}
    >
      {label}
    </AntCheckbox>
  );
}

