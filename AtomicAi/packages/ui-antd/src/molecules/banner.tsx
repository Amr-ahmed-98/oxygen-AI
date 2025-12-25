/**
 * ============================================
 * Molecule Banner - Composed from Atoms
 * ============================================
 */

import React, { useState } from "react";
import { Icon } from "../atoms/Icon";
import { Text } from "../atoms/Text";
import { Button } from "../atoms/Button";
import { IconButton } from "../atoms/IconButton";
import { Link } from "../atoms/Link";
import { cn } from "../utils/cn";

export interface MoleculeBannerProps {
  message: React.ReactNode;
  icon?: string;
  variant?: "soft" | "filled" | "outline" | "glass" | "minimal";
  tone?: "info" | "success" | "warning" | "danger" | "neutral" | "brand";
  size?: "sm" | "md" | "lg";
  layout?: "inline" | "split" | "centered";
  placement?: "static" | "sticky" | "fixed";
  dismissible?: boolean;
  withCta?: boolean;
  ctaLabel?: string;
  ctaLink?: string;
  onDismiss?: () => void;
  onCta?: () => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function Banner({
  message,
  icon,
  variant = "soft",
  tone = "info",
  size = "md",
  layout = "split",
  placement = "static",
  dismissible = true,
  withCta = false,
  ctaLabel = "Learn more",
  ctaLink,
  onDismiss,
  onCta,
  className,
  dataTestId,
  importRef,
}: MoleculeBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  
  const defaultIconMap: Record<string, string> = {
    info: "info-circle",
    success: "check-circle",
    warning: "exclamation-triangle",
    danger: "x-circle",
    neutral: "info",
    brand: "star",
  };
  
  const displayIcon = icon || defaultIconMap[tone] || "info-circle";
  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };
  
  const moleculeClassName = cn(
    "molecule-banner",
    `molecule-banner--${variant}`,
    `molecule-banner--${tone}`,
    `molecule-banner--${size}`,
    `molecule-banner--${layout}`,
    `molecule-banner--${placement}`,
    className
  );
  
  return (
    <div className={moleculeClassName} role="alert" data-testid={dataTestId}>
      <div className="molecule-banner-content">
        {displayIcon && (
          <Icon type={displayIcon} size={size} className="molecule-banner-icon" />
        )}
        <div className="molecule-banner-message">
          {typeof message === "string" ? <Text size={size}>{message}</Text> : message}
        </div>
        {withCta && (
          <div className="molecule-banner-cta">
            {ctaLink ? (
              <Link href={ctaLink} onClick={onCta} size={size} tone={tone} importRef={importRef}>
                {ctaLabel}
              </Link>
            ) : (
              <Button variant="ghost" tone={tone} size={size} onClick={onCta} importRef={importRef}>
                {ctaLabel}
              </Button>
            )}
          </div>
        )}
      </div>
      {dismissible && (
        <IconButton
          icon="x"
          variant="ghost"
          tone="neutral"
          size={size}
          onClick={handleDismiss}
          aria-label="Dismiss banner"
          importRef={importRef}
        />
      )}
    </div>
  );
}

