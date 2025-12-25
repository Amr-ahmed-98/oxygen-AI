/**
 * ============================================
 * Ant Design Switch Adapter
 * ============================================
 */

import React from "react";
import { Switch as AntSwitch } from "antd";
import type { AtomSwitchProps } from "@atomic-ai/ui";

export function Switch(props: AtomSwitchProps) {
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

  const antSize = size === "xs" ? "small" : undefined;

  const atomClassName = `atom-switch atom-switch--${size} ${className}`.trim();

  return (
    <div className="atom-switch-wrapper">
      {label && <label className="atom-switch-label">{label}</label>}
      <AntSwitch
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        size={antSize}
        onChange={onChange}
        className={atomClassName}
        {...rest}
      />
    </div>
  );
}

