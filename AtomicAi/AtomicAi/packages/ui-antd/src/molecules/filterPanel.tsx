/**
 * ============================================
 * Molecule FilterPanel - Composed from Atoms
 * ============================================
 */

import React from "react";
import { FilterBar } from "./filterBar";
import { Button } from "../atoms/Button";
import { cn } from "../utils/cn";

export interface MoleculeFilterPanelProps {
  filters?: any[];
  onApply?: () => void;
  onReset?: () => void;
  size?: "sm" | "md" | "lg";
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function FilterPanel({
  filters = [],
  onApply,
  onReset,
  size = "md",
  className,
  dataTestId,
  importRef,
}: MoleculeFilterPanelProps) {
  const moleculeClassName = cn("molecule-filter-panel", className);
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      <FilterBar
        chips={filters}
        size={size}
        onApply={onApply}
        onReset={onReset}
        importRef={importRef}
      />
    </div>
  );
}

