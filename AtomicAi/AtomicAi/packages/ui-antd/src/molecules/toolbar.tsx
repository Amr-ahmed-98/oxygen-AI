/**
 * ============================================
 * Molecule Toolbar - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Button } from "../atoms/Button";
import { IconButton } from "../atoms/IconButton";
import { cn } from "../utils/cn";

export interface MoleculeToolbarAction {
  key: string;
  label?: string;
  icon: string;
  variant?: "solid" | "outline" | "ghost";
  tone?: "primary" | "danger" | "neutral";
}

export interface MoleculeToolbarProps {
  actions: MoleculeToolbarAction[];
  variant?: "buttons" | "icons" | "mixed";
  size?: "sm" | "md" | "lg";
  onAction?: (key: string) => void;
  className?: string;
  dataTestId?: string;
  importRef?: string;
}

export function Toolbar({
  actions,
  variant = "mixed",
  size = "md",
  onAction,
  className,
  dataTestId,
  importRef,
}: MoleculeToolbarProps) {
  const moleculeClassName = cn("molecule-toolbar", className);
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      {actions.map((action) => {
        if (variant === "icons" || (!action.label && action.icon)) {
          return (
            <IconButton
              key={action.key}
              icon={action.icon}
              variant={action.variant || "ghost"}
              tone={action.tone || "neutral"}
              size={size}
              onClick={() => onAction?.(action.key)}
              aria-label={action.label || action.key}
              importRef={importRef}
            />
          );
        }
        return (
          <Button
            key={action.key}
            variant={action.variant || "solid"}
            tone={action.tone || "primary"}
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

