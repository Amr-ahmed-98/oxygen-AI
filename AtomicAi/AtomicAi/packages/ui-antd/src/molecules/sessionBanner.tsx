/**
 * ============================================
 * Molecule SessionBanner - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Banner } from "./banner";
import { cn } from "../utils/cn";

export interface MoleculeSessionBannerProps {
  message: string;
  variant?: "warning" | "info" | "success";
  size?: "sm" | "md" | "lg";
  withAction?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function SessionBanner({
  message,
  variant = "warning",
  size = "md",
  withAction = true,
  actionLabel = "Refresh session",
  onAction,
  onDismiss,
  className,
  dataTestId,
  importRef,
}: MoleculeSessionBannerProps) {
  const moleculeClassName = cn("molecule-session-banner", className);
  
  return (
    <Banner
      message={message}
      variant="soft"
      tone={variant}
      size={size}
      withCta={withAction}
      ctaLabel={actionLabel}
      onCta={onAction}
      onDismiss={onDismiss}
      className={moleculeClassName}
      dataTestId={dataTestId}
      importRef={importRef}
    />
  );
}

