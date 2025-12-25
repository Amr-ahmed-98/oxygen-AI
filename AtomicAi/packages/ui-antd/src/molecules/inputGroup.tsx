/**
 * ============================================
 * Molecule InputGroup - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Input } from "antd";
import { TextField } from "../atoms/TextField";
import { Button } from "../atoms/Button";
import { IconButton } from "../atoms/IconButton";
import { Badge } from "../atoms/Badge";
import { Select } from "../atoms/Select";
import { Icon } from "../atoms/Icon";
import { Text } from "../atoms/Text";
import { cn } from "../utils/cn";

export interface MoleculeInputGroupProps {
  value?: string;
  placeholder?: string;
  variant?: "outline" | "soft" | "solid" | "minimal";
  tone?: "neutral" | "primary" | "info" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  density?: "comfortable" | "compact";
  prefix?: "none" | "icon" | "text" | "select" | "badge";
  prefixContent?: string | React.ReactNode;
  prefixSelectOptions?: Array<{ label: string; value: string }>;
  prefixSelectValue?: string;
  suffix?: "none" | "icon" | "text" | "button" | "iconButton" | "badge";
  suffixContent?: string | React.ReactNode;
  suffixButtonLabel?: string;
  suffixIcon?: string;
  suffixBadgeCount?: number;
  onValueChange?: (value: string) => void;
  onAction?: (type: "prefix" | "suffix") => void;
  onPrefixSelectChange?: (value: string) => void;
  disabled?: boolean;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function InputGroup({
  value,
  placeholder,
  variant = "outline",
  tone = "neutral",
  size = "md",
  density = "comfortable",
  prefix = "none",
  prefixContent,
  prefixSelectOptions = [],
  prefixSelectValue,
  suffix = "none",
  suffixContent,
  suffixButtonLabel,
  suffixIcon,
  suffixBadgeCount,
  onValueChange,
  onAction,
  onPrefixSelectChange,
  disabled = false,
  className,
  dataTestId,
  importRef,
}: MoleculeInputGroupProps) {
  const moleculeClassName = cn(
    "molecule-input-group",
    `molecule-input-group--${variant}`,
    `molecule-input-group--${tone}`,
    `molecule-input-group--${size}`,
    `molecule-input-group--${density}`,
    prefix !== "none" && "molecule-input-group--with-prefix",
    suffix !== "none" && "molecule-input-group--with-suffix",
    className
  );
  
  const renderPrefix = () => {
    if (prefix === "none") return null;
    switch (prefix) {
      case "icon":
        return (
          <span className="molecule-input-group-prefix">
            <Icon type={prefixContent as string || "search"} size={size} />
          </span>
        );
      case "text":
        return (
          <span className="molecule-input-group-prefix">
            <Text size={size} tone="secondary">{prefixContent}</Text>
          </span>
        );
      case "select":
        return (
          <span className="molecule-input-group-prefix">
            <Select
              size={size}
              value={prefixSelectValue}
              options={prefixSelectOptions}
              onChange={(val) => onPrefixSelectChange?.(val as string)}
              style={{ minWidth: 100 }}
              importRef={importRef}
            />
          </span>
        );
      case "badge":
        return (
          <span className="molecule-input-group-prefix">
            <Badge count={prefixContent as number} size={size} />
          </span>
        );
      default: return null;
    }
  };
  
  const renderSuffix = () => {
    if (suffix === "none") return null;
    switch (suffix) {
      case "icon":
        return (
          <span className="molecule-input-group-suffix">
            <Icon type={suffixIcon || suffixContent as string || "info"} size={size} />
          </span>
        );
      case "text":
        return (
          <span className="molecule-input-group-suffix">
            <Text size={size} tone="secondary">{suffixContent}</Text>
          </span>
        );
      case "button":
        return (
          <span className="molecule-input-group-suffix">
            <Button variant="ghost" tone={tone} size={size} onClick={() => onAction?.("suffix")} importRef={importRef}>
              {suffixButtonLabel || suffixContent}
            </Button>
          </span>
        );
      case "iconButton":
        return (
          <span className="molecule-input-group-suffix">
            <IconButton
              icon={suffixIcon || suffixContent as string || "search"}
              variant="ghost"
              tone={tone}
              size={size}
              onClick={() => onAction?.("suffix")}
              aria-label="Action"
              importRef={importRef}
            />
          </span>
        );
      case "badge":
        return (
          <span className="molecule-input-group-suffix">
            <Badge count={suffixBadgeCount || suffixContent as number} size={size} />
          </span>
        );
      default: return null;
    }
  };
  
  return (
    <Input.Group compact className={moleculeClassName} data-testid={dataTestId}>
      {renderPrefix()}
      <TextField
        value={value}
        placeholder={placeholder}
        size={size}
        variant={variant === "soft" ? "filled" : "outline"}
        tone={tone}
        density={density}
        disabled={disabled}
        onChange={(e) => onValueChange?.(e.target.value)}
        className="molecule-input-group-input"
        importRef={importRef}
      />
      {renderSuffix()}
    </Input.Group>
  );
}

