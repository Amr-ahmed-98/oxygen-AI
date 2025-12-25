/**
 * ============================================
 * Molecule ModalHeader - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Heading } from "../atoms/Heading";
import { Text } from "../atoms/Text";
import { IconButton } from "../atoms/IconButton";
import { Button } from "../atoms/Button";
import { Badge } from "../atoms/Badge";
import { Breadcrumbs } from "./breadcrumbs";
import { ActionMenu } from "./actionMenu";
import { cn } from "../utils/cn";

export interface MoleculeModalHeaderAction {
  key: string;
  label: string;
  icon?: string;
  variant?: "solid" | "outline" | "ghost";
  tone?: "primary" | "danger" | "neutral";
}

export interface MoleculeModalHeaderProps {
  title: string;
  subtitle?: string;
  variant?: "flat" | "divider" | "sticky" | "glass";
  size?: "sm" | "md" | "lg";
  layout?: "split" | "centered" | "stack";
  withSubtitle?: boolean;
  withClose?: boolean;
  actions?: MoleculeModalHeaderAction[];
  menuActions?: Array<{ key: string; label: string; icon?: string }>;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  withBreadcrumbs?: boolean;
  badge?: string | number;
  onClose?: () => void;
  onAction?: (key: string) => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function ModalHeader({
  title,
  subtitle,
  variant = "divider",
  size = "md",
  layout = "split",
  withSubtitle = false,
  withClose = true,
  actions = [],
  menuActions = [],
  breadcrumbs = [],
  withBreadcrumbs = false,
  badge,
  onClose,
  onAction,
  className,
  dataTestId,
  importRef,
}: MoleculeModalHeaderProps) {
  const moleculeClassName = cn(
    "molecule-modal-header",
    `molecule-modal-header--${variant}`,
    `molecule-modal-header--${size}`,
    `molecule-modal-header--${layout}`,
    className
  );
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      <div className="molecule-modal-header-content">
        {withBreadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs
            items={breadcrumbs.map(b => ({ label: b.label, href: b.href }))}
            size={size}
            variant="minimal"
            importRef={importRef}
          />
        )}
        <div className="molecule-modal-header-text">
          <div className="molecule-modal-header-title-row">
            <Heading size={size} className="molecule-modal-header-title">
              {title}
            </Heading>
            {badge !== undefined && (
              <Badge count={badge} size={size} className="molecule-modal-header-badge" />
            )}
          </div>
          {withSubtitle && subtitle && (
            <Text size={size} tone="secondary" className="molecule-modal-header-subtitle">
              {subtitle}
            </Text>
          )}
        </div>
      </div>
      
      <div className="molecule-modal-header-actions">
        {actions.map((action) => (
          <Button
            key={action.key}
            variant={action.variant || "ghost"}
            tone={action.tone || "neutral"}
            size={size}
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
            onAction={(key) => onAction?.(key)}
            importRef={importRef}
          />
        )}
        
        {withClose && (
          <IconButton
            icon="x"
            variant="ghost"
            size={size}
            onClick={onClose}
            aria-label="Close"
            importRef={importRef}
          />
        )}
      </div>
    </div>
  );
}

