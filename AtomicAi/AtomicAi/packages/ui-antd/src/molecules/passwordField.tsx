/**
 * ============================================
 * Molecule PasswordField - Composed from Atoms
 * ============================================
 */

import React, { useState } from "react";
import { PasswordInput } from "../atoms/PasswordInput";
import { IconButton } from "../atoms/IconButton";
import { HelperText } from "../atoms/HelperText";
import { ProgressIndicator } from "./progress";
import { cn } from "../utils/cn";

export interface MoleculePasswordFieldProps {
  value?: string;
  variant?: "default" | "with-rules" | "with-strength" | "full";
  size?: "sm" | "md" | "lg";
  density?: "comfortable" | "compact";
  withCapsLockHint?: boolean;
  togglePlacement?: "inside" | "outside";
  strengthAlgorithm?: "simple" | "zxcvbn" | "policy-based";
  rules?: Array<{ text: string; passed: boolean }>;
  onChange?: (value: string) => void;
  onToggleVisibility?: (visible: boolean) => void;
  onStrengthChange?: (strength: number) => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function PasswordField({
  value,
  variant = "default",
  size = "md",
  density = "compact",
  withCapsLockHint = true,
  togglePlacement = "inside",
  strengthAlgorithm = "policy-based",
  rules = [],
  onChange,
  onToggleVisibility,
  onStrengthChange,
  className,
  dataTestId,
  importRef,
}: MoleculePasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const [capsLock, setCapsLock] = useState(false);
  const [strength, setStrength] = useState(0);
  
  const calculateStrength = (pwd: string): number => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score += 25;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score += 25;
    if (/\d/.test(pwd)) score += 25;
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 25;
    return score;
  };
  
  const handleChange = (newValue: string) => {
    onChange?.(newValue);
    if (variant === "with-strength" || variant === "full") {
      const newStrength = calculateStrength(newValue);
      setStrength(newStrength);
      onStrengthChange?.(newStrength);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (withCapsLockHint && e.getModifierState("CapsLock")) {
      setCapsLock(true);
    } else {
      setCapsLock(false);
    }
  };
  
  const moleculeClassName = cn(
    "molecule-password-field",
    `molecule-password-field--${variant}`,
    `molecule-password-field--${size}`,
    `molecule-password-field--${density}`,
    className
  );
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      <div className="molecule-password-field-input-wrapper">
        <PasswordInput
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          size={size}
          visibilityToggle={togglePlacement === "inside"}
          importRef={importRef}
        />
        {togglePlacement === "outside" && (
          <IconButton
            icon={visible ? "eye-off" : "eye"}
            variant="ghost"
            size={size}
            onClick={() => {
              const newVisible = !visible;
              setVisible(newVisible);
              onToggleVisibility?.(newVisible);
            }}
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            importRef={importRef}
          />
        )}
      </div>
      
      {withCapsLockHint && capsLock && (
        <HelperText variant="warning" size="sm" importRef={importRef}>
          Caps Lock is on
        </HelperText>
      )}
      
      {(variant === "with-strength" || variant === "full") && value && (
        <ProgressIndicator
          percent={strength}
          withLabel={false}
          withPercentage={false}
          importRef={importRef}
        />
      )}
      
      {(variant === "with-rules" || variant === "full") && rules.length > 0 && (
        <div className="molecule-password-field-rules">
          {rules.map((rule, index) => (
            <HelperText
              key={index}
              variant={rule.passed ? "success" : "default"}
              size="sm"
              importRef={importRef}
            >
              {rule.text}
            </HelperText>
          ))}
        </div>
      )}
    </div>
  );
}

