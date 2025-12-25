/**
 * ============================================
 * Molecule InlineValidationRow - Composed from Atoms
 * ============================================
 */

import React from "react";
import { HelperText } from "../atoms/HelperText";
import { Icon } from "../atoms/Icon";
import { cn } from "../utils/cn";

export interface MoleculeInlineValidationRule {
  text: string;
  passed: boolean;
}

export interface MoleculeInlineValidationRowProps {
  rules: MoleculeInlineValidationRule[];
  variant?: "list" | "inline";
  size?: "sm" | "md" | "lg";
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function InlineValidationRow({
  rules,
  variant = "list",
  size = "sm",
  className,
  dataTestId,
  importRef,
}: MoleculeInlineValidationRowProps) {
  const moleculeClassName = cn(
    "molecule-inline-validation-row",
    `molecule-inline-validation-row--${variant}`,
    className
  );
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      {rules.map((rule, index) => (
        <div key={index} className="molecule-inline-validation-rule">
          <Icon
            type={rule.passed ? "check-circle" : "x-circle"}
            size={size}
            className={rule.passed ? "text-success" : "text-error"}
          />
          <HelperText
            variant={rule.passed ? "success" : "error"}
            size={size}
            importRef={importRef}
          >
            {rule.text}
          </HelperText>
        </div>
      ))}
    </div>
  );
}

