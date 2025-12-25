/**
 * ============================================
 * Molecule ColumnVisibilityMenu - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Dropdown, Checkbox } from "antd";
import { IconButton } from "../atoms/IconButton";
import { cn } from "../utils/cn";

export interface MoleculeColumn {
  key: string;
  label: string;
  visible: boolean;
}

export interface MoleculeColumnVisibilityMenuProps {
  columns: MoleculeColumn[];
  onToggle?: (key: string, visible: boolean) => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  dataTestId?: string;
  importRef?: string;
}

export function ColumnVisibilityMenu({
  columns,
  onToggle,
  size = "sm",
  className,
  dataTestId,
  importRef,
}: MoleculeColumnVisibilityMenuProps) {
  const moleculeClassName = cn("molecule-column-visibility-menu", className);
  
  const menuItems = columns.map((col) => ({
    key: col.key,
    label: (
      <Checkbox
        checked={col.visible}
        onChange={(e) => onToggle?.(col.key, e.target.checked)}
      >
        {col.label}
      </Checkbox>
    ),
  }));
  
  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={["click"]}
      className={moleculeClassName}
      data-testid={dataTestId}
    >
      <div>
        <IconButton
          icon="columns"
          variant="ghost"
          size={size}
          aria-label="Column visibility"
          importRef={importRef}
        />
      </div>
    </Dropdown>
  );
}

