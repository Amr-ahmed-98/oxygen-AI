/**
 * ============================================
 * Molecule ViewToggle - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Button } from "../atoms/Button";
import { IconButton } from "../atoms/IconButton";
import { cn } from "../utils/cn";

export interface MoleculeViewToggleOption {
  key: string;
  label?: string;
  icon: string;
}

export interface MoleculeViewToggleProps {
  options: MoleculeViewToggleOption[];
  value?: string;
  variant?: "buttons" | "icons";
  size?: "sm" | "md" | "lg";
  onViewChange?: (key: string) => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function ViewToggle({
  options,
  value,
  variant = "icons",
  size = "md",
  onViewChange,
  className,
  dataTestId,
  importRef,
}: MoleculeViewToggleProps) {
  const moleculeClassName = cn(
    "molecule-view-toggle",
    `molecule-view-toggle--${variant}`,
    className
  );
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      {options.map((option) => {
        const isActive = value === option.key;
        
        if (variant === "icons") {
          return (
            <IconButton
              key={option.key}
              icon={option.icon}
              variant={isActive ? "solid" : "ghost"}
              size={size}
              onClick={() => onViewChange?.(option.key)}
              aria-label={option.label || option.key}
              aria-pressed={isActive}
              importRef={importRef}
            />
          );
        }
        
        return (
          <Button
            key={option.key}
            variant={isActive ? "solid" : "ghost"}
            size={size}
            icon={<span>{option.icon}</span>}
            onClick={() => onViewChange?.(option.key)}
            importRef={importRef}
          >
            {option.label || option.key}
          </Button>
        );
      })}
    </div>
  );
}

