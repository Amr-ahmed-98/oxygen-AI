/**
 * ============================================
 * Molecule StatGroup - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Text } from "../atoms/Text";
import { Heading } from "../atoms/Heading";
import { Icon } from "../atoms/Icon";
import { Badge } from "../atoms/Badge";
import { cn } from "../utils/cn";

export interface MoleculeStat {
  label: string;
  value: string | number;
  icon?: string;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
  badge?: string | number;
}

export interface MoleculeStatGroupProps {
  stats: MoleculeStat[];
  variant?: "horizontal" | "grid" | "vertical";
  columns?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  dataTestId?: string;
  importRef?: string;
}

export function StatGroup({
  stats,
  variant = "horizontal",
  columns = 4,
  size = "md",
  className,
  dataTestId,
  importRef,
}: MoleculeStatGroupProps) {
  const moleculeClassName = cn(
    "molecule-stat-group",
    `molecule-stat-group--${variant}`,
    variant === "grid" && `molecule-stat-group--columns-${columns}`,
    className
  );
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      {stats.map((stat, index) => (
        <div key={index} className="molecule-stat-group-item">
          {stat.icon && (
            <Icon type={stat.icon} size={size} className="molecule-stat-group-icon" />
          )}
          <div className="molecule-stat-group-content">
            <Text size={size} tone="secondary">
              {stat.label}
            </Text>
            <div className="molecule-stat-group-value-row">
              <Heading size={size} className="molecule-stat-group-value">
                {stat.value}
              </Heading>
              {stat.badge && (
                <Badge count={stat.badge} size={size} />
              )}
            </div>
            {stat.trend && (
              <Text
                size="sm"
                tone={stat.trend.direction === "up" ? "success" : "danger"}
              >
                {stat.trend.direction === "up" ? "↑" : "↓"} {stat.trend.value}%
              </Text>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

