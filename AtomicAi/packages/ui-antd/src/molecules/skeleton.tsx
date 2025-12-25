/**
 * ============================================
 * Molecule Skeleton - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Skeleton as AtomSkeleton, type AtomSkeletonProps } from "../atoms/Skeleton";
import { cn } from "../utils/cn";

export interface MoleculeSkeletonProps extends AtomSkeletonProps {
  variant?: "text" | "card" | "list" | "table" | "form";
  count?: number;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function Skeleton({
  variant = "text",
  count = 3,
  className,
  dataTestId,
  importRef,
  ...rest
}: MoleculeSkeletonProps) {
  const moleculeClassName = cn(
    "molecule-skeleton",
    `molecule-skeleton--${variant}`,
    className
  );
  
  if (variant === "list" || variant === "table") {
    return (
      <div className={moleculeClassName} data-testid={dataTestId}>
        {Array.from({ length: count }).map((_, index) => (
          <AtomSkeleton key={index} active importRef={importRef} {...rest} />
        ))}
      </div>
    );
  }
  
  return (
    <AtomSkeleton
      className={moleculeClassName}
      data-testid={dataTestId}
      active
      importRef={importRef}
      {...rest}
    />
  );
}

