/**
 * ============================================
 * Molecule ChartCard - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Heading } from "../atoms/Heading";
import { Text } from "../atoms/Text";
import { IconButton } from "../atoms/IconButton";
import { Button } from "../atoms/Button";
import { Badge } from "../atoms/Badge";
import { EmptyStateCompact } from "./emptyStateCompact";
import { Skeleton } from "./skeleton";
import { cn } from "../utils/cn";

export interface MoleculeChartCardProps {
  title?: string;
  chartType?: "line" | "bar" | "area" | "pie" | "table";
  variant?: "card" | "flat" | "with-tabs" | "compact";
  density?: "comfortable" | "compact";
  withLegend?: boolean;
  withRange?: boolean;
  withActions?: boolean;
  state?: "ready" | "loading" | "empty" | "error";
  children?: React.ReactNode;
  onRangeChange?: () => void;
  onExport?: () => void;
  onRefresh?: () => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function ChartCard({
  title,
  chartType = "line",
  variant = "card",
  density = "compact",
  withLegend = true,
  withRange = true,
  withActions = true,
  state = "ready",
  children,
  onRangeChange,
  onExport,
  onRefresh,
  className,
  dataTestId,
  importRef,
}: MoleculeChartCardProps) {
  const moleculeClassName = cn(
    "molecule-chart-card",
    `molecule-chart-card--${variant}`,
    `molecule-chart-card--${density}`,
    `molecule-chart-card--${chartType}`,
    `molecule-chart-card--${state}`,
    className
  );
  
  if (state === "loading") {
    return (
      <div className={moleculeClassName} data-testid={dataTestId}>
        {title && <Heading size="md">{title}</Heading>}
        <Skeleton variant="card" count={1} importRef={importRef} />
      </div>
    );
  }
  
  if (state === "empty") {
    return (
      <div className={moleculeClassName} data-testid={dataTestId}>
        {title && <Heading size="md">{title}</Heading>}
        <EmptyStateCompact
          message="No data available"
          variant="simple"
          importRef={importRef}
        />
      </div>
    );
  }
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      <div className="molecule-chart-card-header">
        {title && <Heading size="md">{title}</Heading>}
        {withActions && (
          <div className="molecule-chart-card-actions">
            {withRange && (
              <Button variant="ghost" size="sm" onClick={onRangeChange} importRef={importRef}>
                Date Range
              </Button>
            )}
            <IconButton
              icon="download"
              variant="ghost"
              size="sm"
              onClick={onExport}
              aria-label="Export"
              importRef={importRef}
            />
            <IconButton
              icon="refresh"
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              aria-label="Refresh"
              importRef={importRef}
            />
          </div>
        )}
      </div>
      
      <div className="molecule-chart-card-content">
        {children}
      </div>
      
      {withLegend && (
        <div className="molecule-chart-card-legend">
          {/* Legend content */}
        </div>
      )}
    </div>
  );
}

