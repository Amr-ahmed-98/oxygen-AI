/**
 * ============================================
 * Molecule KPICard - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Heading } from "../atoms/Heading";
import { Text } from "../atoms/Text";
import { Icon } from "../atoms/Icon";
import { Badge } from "../atoms/Badge";
import { cn } from "../utils/cn";

export interface MoleculeKPICardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
  icon?: string;
  badge?: string | number;
  variant?: "default" | "compact" | "detailed";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function KPICard({
  title,
  value,
  trend,
  icon,
  badge,
  variant = "default",
  size = "md",
  onClick,
  className,
  dataTestId,
  importRef,
}: MoleculeKPICardProps) {
  const moleculeClassName = cn(
    "molecule-kpi-card",
    `molecule-kpi-card--${variant}`,
    `molecule-kpi-card--${size}`,
    onClick && "molecule-kpi-card--clickable",
    className
  );
  
  return (
    <div className={moleculeClassName} onClick={onClick} data-testid={dataTestId} role={onClick ? "button" : undefined}>
      {icon && (
        <Icon type={icon} size={size} className="molecule-kpi-card-icon" />
      )}
      <div className="molecule-kpi-card-content">
        <Text size={size} tone="secondary">
          {title}
        </Text>
        <div className="molecule-kpi-card-value-row">
          <Heading size={size} className="molecule-kpi-card-value">
            {value}
          </Heading>
          {badge && (
            <Badge count={badge} size={size} />
          )}
        </div>
        {trend && (
          <Text
            size="sm"
            tone={trend.direction === "up" ? "success" : "danger"}
          >
            {trend.direction === "up" ? "↑" : "↓"} {trend.value}%
          </Text>
        )}
      </div>
    </div>
  );
}

