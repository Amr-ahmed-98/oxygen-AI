/**
 * ============================================
 * Molecule BulkActionsBar - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Text } from "../atoms/Text";
import { Badge } from "../atoms/Badge";
import { Button } from "../atoms/Button";
import { IconButton } from "../atoms/IconButton";
import { ActionMenu } from "./actionMenu";
import { cn } from "../utils/cn";

export interface MoleculeBulkAction {
  key: string;
  label: string;
  icon?: string;
  variant?: "solid" | "outline" | "ghost";
  tone?: "primary" | "danger" | "neutral";
}

export interface MoleculeBulkActionsBarProps {
  selectedCount: number;
  primaryActions?: MoleculeBulkAction[];
  secondaryActions?: MoleculeBulkAction[];
  variant?: "sticky" | "inline" | "floating";
  size?: "sm" | "md" | "lg";
  onAction?: (key: string) => void;
  onClear?: () => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function BulkActionsBar({
  selectedCount,
  primaryActions = [],
  secondaryActions = [],
  variant = "sticky",
  size = "md",
  onAction,
  onClear,
  className,
  dataTestId,
  importRef,
}: MoleculeBulkActionsBarProps) {
  if (selectedCount === 0) return null;
  
  const moleculeClassName = cn(
    "molecule-bulk-actions-bar",
    `molecule-bulk-actions-bar--${variant}`,
    `molecule-bulk-actions-bar--${size}`,
    className
  );
  
  const allSecondaryActions = [
    ...secondaryActions.map(a => ({ key: a.key, label: a.label, icon: a.icon })),
    { key: "clear", label: "Clear selection", icon: "x" },
  ];
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      <div className="molecule-bulk-actions-bar-info">
        <Badge count={selectedCount} size={size} />
        <Text size={size}>
          {selectedCount} {selectedCount === 1 ? "item" : "items"} selected
        </Text>
      </div>
      
      <div className="molecule-bulk-actions-bar-actions">
        {primaryActions.map((action) => (
          <Button
            key={action.key}
            variant={action.variant || "solid"}
            tone={action.tone || "primary"}
            size={size}
            icon={action.icon ? <span>{action.icon}</span> : undefined}
            onClick={() => onAction?.(action.key)}
            importRef={importRef}
          >
            {action.label}
          </Button>
        ))}
        
        {allSecondaryActions.length > 0 && (
          <ActionMenu
            items={allSecondaryActions.map(a => ({
              key: a.key,
              label: a.label,
              icon: a.icon,
              danger: a.key === "clear",
            }))}
            variant="kebab"
            size={size}
            onAction={(key) => {
              if (key === "clear") {
                onClear?.();
              } else {
                onAction?.(key);
              }
            }}
            importRef={importRef}
          />
        )}
      </div>
    </div>
  );
}

