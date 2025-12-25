/**
 * ============================================
 * Molecule IntegrationTile - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Icon } from "../atoms/Icon";
import { Text } from "../atoms/Text";
import { Button } from "../atoms/Button";
import { Badge } from "../atoms/Badge";
import { cn } from "../utils/cn";

export interface MoleculeIntegrationTileProps {
  name: string;
  description?: string;
  icon?: string;
  connected?: boolean;
  badge?: string;
  onClick?: () => void;
  onConnect?: () => void;
  size?: "sm" | "md" | "lg";
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function IntegrationTile({
  name,
  description,
  icon,
  connected = false,
  badge,
  onClick,
  onConnect,
  size = "md",
  className,
  dataTestId,
  importRef,
}: MoleculeIntegrationTileProps) {
  const moleculeClassName = cn(
    "molecule-integration-tile",
    connected && "molecule-integration-tile--connected",
    className
  );
  
  return (
    <div className={moleculeClassName} onClick={onClick} data-testid={dataTestId} role={onClick ? "button" : undefined}>
      {icon && <Icon type={icon} size="lg" className="molecule-integration-tile-icon" />}
      <div className="molecule-integration-tile-content">
        <div className="molecule-integration-tile-header">
          <Text size={size} weight="medium">{name}</Text>
          {badge && <Badge count={badge} size={size} />}
        </div>
        {description && <Text size="sm" tone="secondary">{description}</Text>}
        {!connected && onConnect && (
          <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); onConnect(); }} importRef={importRef}>
            Connect
          </Button>
        )}
      </div>
    </div>
  );
}

