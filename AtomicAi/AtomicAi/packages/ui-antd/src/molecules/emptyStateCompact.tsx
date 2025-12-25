/**
 * ============================================
 * Molecule EmptyStateCompact - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Icon } from "../atoms/Icon";
import { Text } from "../atoms/Text";
import { Button } from "../atoms/Button";
import { Link } from "../atoms/Link";
import { cn } from "../utils/cn";

export interface MoleculeEmptyStateCompactProps {
  message: string;
  icon?: string;
  variant?: "simple" | "card" | "soft" | "minimal";
  size?: "sm" | "md" | "lg";
  actionType?: "none" | "button" | "link";
  actionLabel?: string;
  actionLink?: string;
  onAction?: () => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function EmptyStateCompact({
  message,
  icon = "inbox",
  variant = "simple",
  size = "md",
  actionType = "none",
  actionLabel,
  actionLink,
  onAction,
  className,
  dataTestId,
  importRef,
}: MoleculeEmptyStateCompactProps) {
  const moleculeClassName = cn(
    "molecule-empty-state-compact",
    `molecule-empty-state-compact--${variant}`,
    `molecule-empty-state-compact--${size}`,
    className
  );
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      {icon && (
        <Icon type={icon} size={size === "sm" ? "md" : size === "lg" ? "lg" : "md"} className="molecule-empty-state-compact-icon" />
      )}
      <Text size={size} tone="secondary" className="molecule-empty-state-compact-message">
        {message}
      </Text>
      {actionType !== "none" && actionLabel && (
        <div className="molecule-empty-state-compact-action">
          {actionType === "link" ? (
            <Link href={actionLink} onClick={onAction} size={size} importRef={importRef}>
              {actionLabel}
            </Link>
          ) : (
            <Button variant="ghost" size={size} onClick={onAction} importRef={importRef}>
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

