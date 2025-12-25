/**
 * ============================================
 * Molecule ProgressIndicator - Composed from Atoms
 * ============================================
 * 
 * Progress indicator with label and percentage
 */

import React from "react";
import { Progress as AtomProgress, type AtomProgressProps } from "../atoms/Progress";
import { Text } from "../atoms/Text";
import { cn } from "../utils/cn";

export interface MoleculeProgressIndicatorProps extends AtomProgressProps {
  /**
   * Show label
   */
  withLabel?: boolean;
  
  /**
   * Label text
   */
  label?: string;
  
  /**
   * Show percentage
   */
  withPercentage?: boolean;
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
  
  className?: string;
  dataTestId?: string;
}

export function ProgressIndicator({
  withLabel = true,
  label,
  withPercentage = true,
  percent = 0,
  className,
  dataTestId,
  importRef,
  ...rest
}: MoleculeProgressIndicatorProps) {
  const moleculeClassName = cn(
    "molecule-progress-indicator",
    className
  );
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      {(withLabel && label) && (
        <div className="molecule-progress-indicator-header">
          <Text>{label}</Text>
          {withPercentage && (
            <Text tone="secondary">{percent}%</Text>
          )}
        </div>
      )}
      <AtomProgress percent={percent} importRef={importRef} {...rest} />
    </div>
  );
}

