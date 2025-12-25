/**
 * ============================================
 * Molecule FilterChipsRow - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Tag } from "antd";
import { IconButton } from "../atoms/IconButton";
import { cn } from "../utils/cn";

export interface MoleculeFilterChip {
  key: string;
  label: string;
  onRemove?: () => void;
}

export interface MoleculeFilterChipsRowProps {
  chips: MoleculeFilterChip[];
  size?: "sm" | "md" | "lg";
  onClearAll?: () => void;
  className?: string;
  dataTestId?: string;
  importRef?: string;
}

export function FilterChipsRow({
  chips,
  size = "md",
  onClearAll,
  className,
  dataTestId,
  importRef,
}: MoleculeFilterChipsRowProps) {
  if (chips.length === 0) return null;
  
  const moleculeClassName = cn("molecule-filter-chips-row", className);
  const tagSize = size === "sm" ? "small" : size === "lg" ? undefined : "default";
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      {chips.map((chip) => (
        <Tag
          key={chip.key}
          closable={!!chip.onRemove}
          onClose={(e) => {
            e.preventDefault();
            chip.onRemove?.();
          }}
          size={tagSize}
          className="molecule-filter-chip"
        >
          {chip.label}
        </Tag>
      ))}
      {onClearAll && (
        <IconButton
          icon="x"
          variant="ghost"
          size={size}
          onClick={onClearAll}
          aria-label="Clear all filters"
          importRef={importRef}
        />
      )}
    </div>
  );
}

