/**
 * ============================================
 * Molecule MultiSelect - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Select } from "../atoms/Select";
import { Tag } from "antd";
import { cn } from "../utils/cn";

export interface MoleculeMultiSelectProps {
  options: Array<{ label: string; value: string }>;
  value?: string[];
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  onChange?: (value: string[]) => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function MultiSelect({
  options,
  value = [],
  placeholder = "Select items",
  size = "md",
  onChange,
  className,
  dataTestId,
  importRef,
}: MoleculeMultiSelectProps) {
  const moleculeClassName = cn("molecule-multi-select", className);
  
  return (
    <Select
      mode="multiple"
      value={value}
      options={options}
      placeholder={placeholder}
      size={size}
      onChange={(val) => onChange?.(val as string[])}
      className={moleculeClassName}
      data-testid={dataTestId}
      importRef={importRef}
    />
  );
}

