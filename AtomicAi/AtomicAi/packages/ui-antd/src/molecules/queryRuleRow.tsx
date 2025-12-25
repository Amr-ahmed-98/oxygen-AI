/**
 * ============================================
 * Molecule QueryRuleRow - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Select } from "../atoms/Select";
import { TextField } from "../atoms/TextField";
import { IconButton } from "../atoms/IconButton";
import { cn } from "../utils/cn";

export interface MoleculeQueryRuleRowProps {
  field?: string;
  operator?: string;
  value?: string;
  fields?: Array<{ label: string; value: string }>;
  operators?: Array<{ label: string; value: string }>;
  onFieldChange?: (field: string) => void;
  onOperatorChange?: (operator: string) => void;
  onValueChange?: (value: string) => void;
  onRemove?: () => void;
  size?: "sm" | "md" | "lg";
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function QueryRuleRow({
  field,
  operator,
  value,
  fields = [],
  operators = [],
  onFieldChange,
  onOperatorChange,
  onValueChange,
  onRemove,
  size = "md",
  className,
  dataTestId,
  importRef,
}: MoleculeQueryRuleRowProps) {
  const moleculeClassName = cn("molecule-query-rule-row", className);
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      <Select
        value={field}
        options={fields}
        onChange={(val) => onFieldChange?.(val as string)}
        placeholder="Field"
        size={size}
        style={{ minWidth: 150 }}
        importRef={importRef}
      />
      <Select
        value={operator}
        options={operators}
        onChange={(val) => onOperatorChange?.(val as string)}
        placeholder="Operator"
        size={size}
        style={{ minWidth: 120 }}
        importRef={importRef}
      />
      <TextField
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        placeholder="Value"
        size={size}
        importRef={importRef}
      />
      {onRemove && (
        <IconButton icon="trash" variant="ghost" tone="danger" size={size} onClick={onRemove} aria-label="Remove rule" importRef={importRef} />
      )}
    </div>
  );
}

