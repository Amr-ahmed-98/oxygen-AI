/**
 * ============================================
 * Molecule TableHeaderBar - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Heading } from "../atoms/Heading";
import { Button } from "../atoms/Button";
import { ActionMenu } from "./actionMenu";
import { cn } from "../utils/cn";

export interface MoleculeTableHeaderBarProps {
  title?: string;
  actions?: Array<{ key: string; label: string; icon?: string }>;
  menuActions?: Array<{ key: string; label: string; icon?: string }>;
  size?: "sm" | "md" | "lg";
  onAction?: (key: string) => void;
  className?: string;
  dataTestId?: string;
  importRef?: string;
}

export function TableHeaderBar({
  title,
  actions = [],
  menuActions = [],
  size = "md",
  onAction,
  className,
  dataTestId,
  importRef,
}: MoleculeTableHeaderBarProps) {
  const moleculeClassName = cn("molecule-table-header-bar", className);
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      {title && <Heading size={size}>{title}</Heading>}
      <div className="molecule-table-header-bar-actions">
        {actions.map((action) => (
          <Button
            key={action.key}
            variant="solid"
            size={size}
            icon={action.icon ? <span>{action.icon}</span> : undefined}
            onClick={() => onAction?.(action.key)}
            importRef={importRef}
          >
            {action.label}
          </Button>
        ))}
        {menuActions.length > 0 && (
          <ActionMenu
            items={menuActions}
            variant="kebab"
            size={size}
            onAction={onAction}
            importRef={importRef}
          />
        )}
      </div>
    </div>
  );
}

