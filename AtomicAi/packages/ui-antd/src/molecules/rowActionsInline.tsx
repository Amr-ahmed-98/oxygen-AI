/**
 * ============================================
 * Molecule RowActionsInline - Composed from Atoms
 * ============================================
 */

import React from "react";
import { IconButton } from "../atoms/IconButton";
import { Button } from "../atoms/Button";
import { ActionMenu } from "./actionMenu";
import { cn } from "../utils/cn";

export interface MoleculeRowAction {
  key: string;
  label: string;
  icon: string;
  variant?: "button" | "icon";
  tone?: "primary" | "danger" | "neutral";
}

export interface MoleculeRowActionsInlineProps {
  actions: MoleculeRowAction[];
  variant?: "buttons" | "icons" | "menu";
  size?: "sm" | "md" | "lg";
  onAction?: (key: string) => void;
  className?: string;
  dataTestId?: string;
  importRef?: string;
}

export function RowActionsInline({
  actions,
  variant = "icons",
  size = "sm",
  onAction,
  className,
  dataTestId,
  importRef,
}: MoleculeRowActionsInlineProps) {
  const moleculeClassName = cn("molecule-row-actions-inline", className);
  
  if (variant === "menu") {
    return (
      <ActionMenu
        items={actions.map(a => ({ key: a.key, label: a.label, icon: a.icon }))}
        variant="kebab"
        size={size}
        onAction={onAction}
        className={className}
        dataTestId={dataTestId}
        importRef={importRef}
      />
    );
  }
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      {actions.map((action) => {
        if (variant === "icons" || action.variant === "icon") {
          return (
            <IconButton
              key={action.key}
              icon={action.icon}
              variant="ghost"
              tone={action.tone || "neutral"}
              size={size}
              onClick={() => onAction?.(action.key)}
              aria-label={action.label}
              importRef={importRef}
            />
          );
        }
        return (
          <Button
            key={action.key}
            variant="ghost"
            tone={action.tone || "neutral"}
            size={size}
            icon={<span>{action.icon}</span>}
            onClick={() => onAction?.(action.key)}
            importRef={importRef}
          >
            {action.label}
          </Button>
        );
      })}
    </div>
  );
}

