/**
 * ============================================
 * Molecule RepeatableRow - Composed from Atoms
 * ============================================
 */

import React from "react";
import { IconButton } from "../atoms/IconButton";
import { cn } from "../utils/cn";

export interface MoleculeRepeatableRowProps {
  children: React.ReactNode;
  onRemove?: () => void;
  onAdd?: () => void;
  canRemove?: boolean;
  canAdd?: boolean;
  size?: "sm" | "md" | "lg";
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function RepeatableRow({
  children,
  onRemove,
  onAdd,
  canRemove = true,
  canAdd = true,
  size = "md",
  className,
  dataTestId,
  importRef,
}: MoleculeRepeatableRowProps) {
  const moleculeClassName = cn("molecule-repeatable-row", className);
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      <div className="molecule-repeatable-row-content">
        {children}
      </div>
      <div className="molecule-repeatable-row-actions">
        {canRemove && onRemove && (
          <IconButton
            icon="trash"
            variant="ghost"
            tone="danger"
            size={size}
            onClick={onRemove}
            aria-label="Remove"
            importRef={importRef}
          />
        )}
        {canAdd && onAdd && (
          <IconButton
            icon="plus"
            variant="ghost"
            size={size}
            onClick={onAdd}
            aria-label="Add"
            importRef={importRef}
          />
        )}
      </div>
    </div>
  );
}

