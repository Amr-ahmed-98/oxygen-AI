/**
 * ============================================
 * Ant Design Button Adapter
 * ============================================
 * 
 * Maps AtomButton props → Ant Design Button
 */

import React from "react";
import { Button as AntButton } from "antd";
import type { AtomButtonProps } from "@atomic-ai/ui";

export function Button(props: AtomButtonProps) {
  const {
    variant = "solid",
    tone = "primary",
    size = "md",
    shape,
    fullWidth,
    disabled,
    loading,
    children,
    onClick,
    type = "button",
    className = "",
    ...rest
  } = props;

  // Map variant → Ant type
  const antType =
    variant === "solid" ? "primary" :
    variant === "outline" ? "default" :
    variant === "ghost" ? "text" :
    "default";

  // Map tone → danger
  const antDanger = tone === "danger";

  // Map size
  const antSize =
    size === "xs" ? "small" :
    size === "xl" ? "large" :
    "middle";

  // Map shape
  const antShape = shape === "pill" ? "round" : undefined;

  // Build className with variant/tone for extra styling
  const atomClassName = `atom-btn atom-btn--${variant} atom-btn--${tone} atom-btn--${size} ${shape ? `atom-btn--${shape}` : ""} ${className}`.trim();

  return (
    <AntButton
      type={antType}
      danger={antDanger}
      size={antSize}
      shape={antShape}
      block={fullWidth}
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      htmlType={type}
      className={atomClassName}
      {...rest}
    >
      {children}
    </AntButton>
  );
}

