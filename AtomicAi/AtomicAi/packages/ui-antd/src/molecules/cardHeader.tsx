/**
 * ============================================
 * Molecule CardHeader - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Heading } from "../atoms/Heading";
import { Text } from "../atoms/Text";
import { Badge } from "../atoms/Badge";
import { Icon } from "../atoms/Icon";
import { Button } from "../atoms/Button";
import { IconButton } from "../atoms/IconButton";
import { ActionMenu } from "./actionMenu";
import { cn } from "../utils/cn";

export interface MoleculeCardHeaderAction {
  key: string;
  label: string;
  icon?: string;
  variant?: "solid" | "outline" | "ghost";
  tone?: "primary" | "danger" | "neutral";
}

export interface MoleculeCardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  badge?: string | number;
  variant?: "simple" | "split" | "centered";
  size?: "sm" | "md" | "lg";
  actions?: MoleculeCardHeaderAction[];
  menuActions?: Array<{ key: string; label: string; icon?: string; danger?: boolean }>;
  onAction?: (key: string) => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function CardHeader({
  title,
  subtitle,
  icon,
  badge,
  variant = "split",
  size = "md",
  actions = [],
  menuActions = [],
  onAction,
  className,
  dataTestId,
  importRef,
}: MoleculeCardHeaderProps) {
  const moleculeClassName = cn(
    "molecule-card-header",
    `molecule-card-header--${variant}`,
    `molecule-card-header--${size}`,
    className
  );
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      <div className="molecule-card-header-content">
        {icon && <Icon type={icon} size={size} className="molecule-card-header-icon" />}
        <div className="molecule-card-header-text">
          <div className="molecule-card-header-title-row">
            <Heading size={size} className="molecule-card-header-title">
              {title}
            </Heading>
            {badge !== undefined && (
              <Badge count={badge} size={size} className="molecule-card-header-badge" />
            )}
          </div>
          {subtitle && (
            <Text size={size} tone="secondary" className="molecule-card-header-subtitle">
              {subtitle}
            </Text>
          )}
        </div>
      </div>
      
      {(actions.length > 0 || menuActions.length > 0) && (
        <div className="molecule-card-header-actions">
          {actions.map((action) => (
            <Button
              key={action.key}
              variant={action.variant || "ghost"}
              tone={action.tone || "neutral"}
              size={size}
              onClick={() => onAction?.(action.key)}
              importRef={importRef}
            >
              {action.icon && <Icon type={action.icon} size={size} />}
              {action.label}
            </Button>
          ))}
          
          {menuActions.length > 0 && (
            <ActionMenu
              items={menuActions}
              variant="kebab"
              size={size}
              onAction={(key) => onAction?.(key)}
              importRef={importRef}
            />
          )}
        </div>
      )}
    </div>
  );
}

