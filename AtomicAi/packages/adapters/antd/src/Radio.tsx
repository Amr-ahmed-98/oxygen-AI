/**
 * ============================================
 * Ant Design Radio Adapter
 * ============================================
 */

import React from "react";
import { Radio as AntRadio, RadioGroup as AntRadioGroup } from "antd";
import type { AtomRadioProps, AtomRadioGroupProps } from "@atomic-ai/ui";

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

  const atomClassName = `atom-radio atom-radio--${size} ${className}`.trim();

  return (
    <AntRadio
      value={value}
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      className={atomClassName}
      {...rest}
    >
      {label}
    </AntRadio>
  );
}

export function RadioGroup(props: AtomRadioGroupProps) {
  const { value, defaultValue, options, onChange, className = "" } = props;

  return (
    <AntRadioGroup
      value={value}
      defaultValue={defaultValue}
      onChange={(e) => onChange?.(e.target.value)}
      className={`atom-radio-group ${className}`.trim()}
    >
      {options.map((opt) => (
        <AntRadio key={opt.value} value={opt.value} disabled={opt.disabled}>
          {opt.label}
        </AntRadio>
      ))}
    </AntRadioGroup>
  );
}

