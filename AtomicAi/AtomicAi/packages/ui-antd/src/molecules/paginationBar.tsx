/**
 * ============================================
 * Molecule PaginationBar - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Pagination } from "./pagination";
import { cn } from "../utils/cn";

export interface MoleculePaginationBarProps {
  current?: number;
  total?: number;
  totalItems?: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  variant?: "numbers" | "simple" | "compact";
  size?: "sm" | "md" | "lg";
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function PaginationBar({
  current = 1,
  total = 1,
  totalItems,
  pageSize = 10,
  pageSizeOptions = [10, 20, 50, 100],
  variant = "numbers",
  size = "md",
  onPageChange,
  onPageSizeChange,
  className,
  dataTestId,
  importRef,
}: MoleculePaginationBarProps) {
  const moleculeClassName = cn("molecule-pagination-bar", className);
  
  return (
    <Pagination
      current={current}
      total={total}
      totalItems={totalItems}
      pageSize={pageSize}
      pageSizeOptions={pageSizeOptions}
      variant={variant}
      size={size}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      className={moleculeClassName}
      dataTestId={dataTestId}
      importRef={importRef}
    />
  );
}

