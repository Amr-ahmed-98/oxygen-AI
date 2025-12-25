/**
 * ============================================
 * Molecule FormField - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Label, type AtomLabelProps } from "../atoms/Label";
import { HelperText, type AtomHelperTextProps } from "../atoms/HelperText";
import { TextField } from "../atoms/TextField";
import { Textarea } from "../atoms/Textarea";
import { Select } from "../atoms/Select";
import { DatePicker } from "../atoms/DatePicker";
import { TimePicker } from "../atoms/TimePicker";
import { DateTimePicker } from "../atoms/DateTimePicker";
import { NumberInput } from "../atoms/NumberInput";
import { PhoneInput } from "../atoms/PhoneInput";
import { CurrencyInput } from "../atoms/CurrencyInput";
import { PasswordInput } from "../atoms/PasswordInput";
import { SearchInput } from "../atoms/SearchInput";
import { cn } from "../utils/cn";

export interface MoleculeFormFieldProps {
  label?: string;
  helperText?: string;
  error?: string;
  variant?: "stacked" | "inline" | "floating" | "compact-row";
  tone?: "neutral" | "primary" | "info" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  density?: "comfortable" | "compact";
  controlType?: "text" | "textarea" | "select" | "date" | "time" | "datetime" | "number" | "phone" | "currency" | "password" | "search";
  required?: boolean;
  optional?: boolean;
  state?: "default" | "error" | "success" | "warning" | "disabled" | "readonly" | "loading";
  withHintIcon?: boolean;
  helperMode?: "hint" | "validation" | "none";
  labelPosition?: "top" | "start";
  showCounter?: boolean;
  maxLength?: number;
  currentLength?: number;
  id?: string;
  onValueChange?: (value: any) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
  controlProps?: any;
  children?: React.ReactNode;
}

export function FormField({
  label,
  helperText,
  error,
  variant = "stacked",
  tone = "neutral",
  size = "md",
  density = "comfortable",
  controlType = "text",
  required = false,
  optional = false,
  state = "default",
  withHintIcon = false,
  helperMode = "hint",
  labelPosition = "top",
  showCounter = false,
  maxLength,
  currentLength,
  id,
  onValueChange,
  onBlur,
  onFocus,
  className,
  dataTestId,
  importRef,
  controlProps = {},
  children,
}: MoleculeFormFieldProps) {
  const effectiveState = error ? "error" : state;
  
  const displayHelperText = effectiveState === "error" && error
    ? error
    : helperMode === "hint" && helperText
    ? helperText
    : undefined;
  
  const helperVariant: AtomHelperTextProps["variant"] =
    effectiveState === "error" ? "error" :
    effectiveState === "success" ? "success" :
    effectiveState === "warning" ? "warning" :
    "default";
  
  const moleculeClassName = cn(
    "molecule-form-field",
    `molecule-form-field--${variant}`,
    `molecule-form-field--${tone}`,
    `molecule-form-field--${size}`,
    `molecule-form-field--${density}`,
    `molecule-form-field--${effectiveState}`,
    `molecule-form-field--label-${labelPosition}`,
    required && "molecule-form-field--required",
    optional && "molecule-form-field--optional",
    className
  );
  
  const controlId = id || `form-field-${Math.random().toString(36).substr(2, 9)}`;
  const helperId = `${controlId}-helper`;
  
  const renderControl = () => {
    if (children) return children;
    
    const commonProps = {
      id: controlId,
      size: size === "sm" ? "sm" : size === "lg" ? "lg" : "md",
      disabled: effectiveState === "disabled",
      ...controlProps,
      onChange: (value: any, event?: any) => {
        onValueChange?.(value, event);
        controlProps.onChange?.(value, event);
      },
      onBlur: (e?: any) => {
        onBlur?.(e);
        controlProps.onBlur?.(e);
      },
      onFocus: (e?: any) => {
        onFocus?.(e);
        controlProps.onFocus?.(e);
      },
      "aria-describedby": displayHelperText ? helperId : undefined,
    };
    
    switch (controlType) {
      case "textarea": return <Textarea {...commonProps} />;
      case "select": return <Select {...commonProps} />;
      case "date": return <DatePicker {...commonProps} />;
      case "time": return <TimePicker {...commonProps} />;
      case "datetime": return <DateTimePicker {...commonProps} />;
      case "number": return <NumberInput {...commonProps} />;
      case "phone": return <PhoneInput {...commonProps} />;
      case "currency": return <CurrencyInput {...commonProps} />;
      case "password": return <PasswordInput {...commonProps} />;
      case "search": return <SearchInput {...commonProps} />;
      default: return <TextField {...commonProps} />;
    }
  };
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      {label && (
        <Label
          htmlFor={controlId}
          required={required}
          size={size}
          color={effectiveState === "error" ? "error" : "neutral"}
          importRef={importRef}
        >
          {label}
          {optional && <span className="molecule-form-field-optional"> (optional)</span>}
        </Label>
      )}
      <div className="molecule-form-field-control">
        {renderControl()}
        {showCounter && maxLength && (
          <span className="molecule-form-field-counter">
            {currentLength || 0} / {maxLength}
          </span>
        )}
      </div>
      {displayHelperText && helperMode !== "none" && (
        <HelperText
          id={helperId}
          variant={helperVariant}
          size={size === "sm" ? "xs" : "sm"}
          importRef={importRef}
        >
          {displayHelperText}
        </HelperText>
      )}
    </div>
  );
}

