/**
 * ============================================
 * Molecule SSOButtonsRow - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";
import { Text } from "../atoms/Text";
import { cn } from "../utils/cn";

export interface MoleculeSSOButton {
  provider: string;
  label: string;
  icon?: string;
}

export interface MoleculeSSOButtonsRowProps {
  providers: MoleculeSSOButton[];
  size?: "sm" | "md" | "lg";
  variant?: "outline" | "ghost";
  onProviderClick?: (provider: string) => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function SSOButtonsRow({
  providers,
  size = "md",
  variant = "outline",
  onProviderClick,
  className,
  dataTestId,
  importRef,
}: MoleculeSSOButtonsRowProps) {
  const moleculeClassName = cn("molecule-sso-buttons-row", className);
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      <Text size="sm" tone="secondary">
        Or continue with:
      </Text>
      <div className="molecule-sso-buttons-row-buttons">
        {providers.map((provider) => (
          <Button
            key={provider.provider}
            variant={variant}
            size={size}
            icon={provider.icon ? <Icon type={provider.icon} size={size} /> : undefined}
            onClick={() => onProviderClick?.(provider.provider)}
            importRef={importRef}
          >
            {provider.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

