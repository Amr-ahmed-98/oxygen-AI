/**
 * ============================================
 * Molecule QueryBuilderMini - Composed from Atoms
 * ============================================
 */

import React from "react";
import { QueryRuleRow } from "./queryRuleRow";
import { Button } from "../atoms/Button";
import { cn } from "../utils/cn";

export interface MoleculeQueryRule {
  id: string;
  field?: string;
  operator?: string;
  value?: string;
}

export interface MoleculeQueryBuilderMiniProps {
  rules: MoleculeQueryRule[];
  fields?: Array<{ label: string; value: string }>;
  operators?: Array<{ label: string; value: string }>;
  onRuleChange?: (id: string, rule: MoleculeQueryRule) => void;
  onRuleRemove?: (id: string) => void;
  onAddRule?: () => void;
  size?: "sm" | "md" | "lg";
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function QueryBuilderMini({
  rules,
  fields = [],
  operators = [],
  onRuleChange,
  onRuleRemove,
  onAddRule,
  size = "md",
  className,
  dataTestId,
  importRef,
}: MoleculeQueryBuilderMiniProps) {
  const moleculeClassName = cn("molecule-query-builder-mini", className);
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      {rules.map((rule) => (
        <QueryRuleRow
          key={rule.id}
          field={rule.field}
          operator={rule.operator}
          value={rule.value}
          fields={fields}
          operators={operators}
          onFieldChange={(field) => onRuleChange?.(rule.id, { ...rule, field })}
          onOperatorChange={(operator) => onRuleChange?.(rule.id, { ...rule, operator })}
          onValueChange={(value) => onRuleChange?.(rule.id, { ...rule, value })}
          onRemove={() => onRuleRemove?.(rule.id)}
          size={size}
          importRef={importRef}
        />
      ))}
      {onAddRule && (
        <Button variant="ghost" size={size} onClick={onAddRule} importRef={importRef}>
          Add rule
        </Button>
      )}
    </div>
  );
}

