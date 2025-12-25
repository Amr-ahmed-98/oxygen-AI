/**
 * ============================================
 * Molecule InlineMessage - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Icon } from "../atoms/Icon";
import { Text } from "../atoms/Text";
import { Link } from "../atoms/Link";
import { Button } from "../atoms/Button";
import { cn } from "../utils/cn";

export interface MoleculeInlineMessageProps {
  title?: string;
  description?: string;
  variant?: "filled" | "soft" | "outline" | "minimal";
  tone?: "info" | "success" | "warning" | "error" | "neutral";
  size?: "sm" | "md" | "lg";
  withIcon?: boolean;
  icon?: string;
  actionType?: "none" | "link" | "button";
  actionLabel?: string;
  actionLink?: string;
  onAction?: () => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function InlineMessage({
  title,
  description,
  variant = "soft",
  tone = "info",
  size = "md",
  withIcon = true,
  icon,
  actionType = "none",
  actionLabel,
  actionLink,
  onAction,
  className,
  dataTestId,
  importRef,
}: MoleculeInlineMessageProps) {
  const defaultIconMap: Record<string, string> = {
    info: "info-circle",
    success: "check-circle",
    warning: "exclamation-triangle",
    error: "x-circle",
    neutral: "info",
  };
  
  const displayIcon = icon || defaultIconMap[tone] || "info-circle";
  
  const moleculeClassName = cn(
    "molecule-inline-message",
    `molecule-inline-message--${variant}`,
    `molecule-inline-message--${tone}`,
    `molecule-inline-message--${size}`,
    className
  );
  
  return (
    <div className={moleculeClassName} role="alert" data-testid={dataTestId}>
      {withIcon && (
        <Icon type={displayIcon} size={size} className="molecule-inline-message-icon" />
      )}
      <div className="molecule-inline-message-content">
        {title && (
          <Text size={size} className="molecule-inline-message-title">
            {title}
          </Text>
        )}
        {description && (
          <Text size={size} tone="secondary" className="molecule-inline-message-description">
            {description}
          </Text>
        )}
      </div>
      {actionType !== "none" && actionLabel && (
        <div className="molecule-inline-message-action">
          {actionType === "link" ? (
            <Link href={actionLink} onClick={onAction} size={size} tone={tone} importRef={importRef}>
              {actionLabel}
            </Link>
          ) : (
            <Button variant="ghost" tone={tone} size={size} onClick={onAction} importRef={importRef}>
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

