/**
 * ============================================
 * Molecule PasswordStrengthRow - Composed from Atoms
 * ============================================
 */

import React from "react";
import { ProgressIndicator } from "./progress";
import { Text } from "../atoms/Text";
import { cn } from "../utils/cn";

export interface MoleculePasswordStrengthRowProps {
  strength: number;
  label?: string;
  showLabel?: boolean;
  showPercentage?: boolean;
  size?: "sm" | "md" | "lg";
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

const strengthLabels = {
  0: "Very weak",
  25: "Weak",
  50: "Fair",
  75: "Good",
  100: "Strong",
};

export function PasswordStrengthRow({
  strength,
  label,
  showLabel = true,
  showPercentage = false,
  size = "md",
  className,
  dataTestId,
  importRef,
}: MoleculePasswordStrengthRowProps) {
  const strengthLevel = strength < 25 ? "danger" : strength < 50 ? "warning" : strength < 75 ? "info" : "success";
  const displayLabel = label || strengthLabels[Math.floor(strength / 25) * 25 as keyof typeof strengthLabels] || "Unknown";
  
  const moleculeClassName = cn(
    "molecule-password-strength-row",
    `molecule-password-strength-row--${size}`,
    className
  );
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      {showLabel && (
        <Text size={size} tone="secondary">
          {displayLabel}
        </Text>
      )}
      <ProgressIndicator
        percent={strength}
        tone={strengthLevel}
        withLabel={false}
        withPercentage={showPercentage}
        importRef={importRef}
      />
    </div>
  );
}

