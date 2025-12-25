/**
 * ============================================
 * Molecule Pagination - Composed from Atoms
 * ============================================
 */

import React, { useState } from "react";
import { Button } from "../atoms/Button";
import { IconButton } from "../atoms/IconButton";
import { Select } from "../atoms/Select";
import { TextField } from "../atoms/TextField";
import { Text } from "../atoms/Text";
import { cn } from "../utils/cn";

export interface MoleculePaginationProps {
  current?: number;
  total?: number;
  totalItems?: number;
  pageSizeOptions?: number[];
  pageSize?: number;
  variant?: "numbers" | "simple" | "compact" | "minimal";
  tone?: "neutral" | "primary";
  size?: "sm" | "md" | "lg";
  density?: "comfortable" | "compact";
  withPageSize?: boolean;
  withJumpTo?: boolean;
  withTotal?: boolean;
  alignment?: "start" | "center" | "end" | "space-between";
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function Pagination({
  current = 1,
  total = 1,
  totalItems,
  pageSizeOptions = [10, 20, 50, 100],
  pageSize = 10,
  variant = "numbers",
  tone = "neutral",
  size = "md",
  density = "compact",
  withPageSize = true,
  withJumpTo = false,
  withTotal = true,
  alignment = "end",
  onPageChange,
  onPageSizeChange,
  className,
  dataTestId,
  importRef,
}: MoleculePaginationProps) {
  const [jumpToPage, setJumpToPage] = useState("");
  
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= total) {
      onPageChange?.(page);
    }
  };
  
  const handleJumpTo = () => {
    const page = parseInt(jumpToPage, 10);
    if (!isNaN(page) && page >= 1 && page <= total) {
      handlePageChange(page);
      setJumpToPage("");
    }
  };
  
  const moleculeClassName = cn(
    "molecule-pagination",
    `molecule-pagination--${variant}`,
    `molecule-pagination--${tone}`,
    `molecule-pagination--${size}`,
    `molecule-pagination--${density}`,
    `molecule-pagination--${alignment}`,
    className
  );
  
  const getPageNumbers = () => {
    if (variant === "simple" || variant === "minimal") return [];
    const pages: (number | string)[] = [];
    const maxVisible = 7;
    if (total <= maxVisible) {
      for (let i = 1; i <= total; i++) pages.push(i);
    } else {
      if (current <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push("ellipsis");
        pages.push(total);
      } else if (current >= total - 3) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = total - 4; i <= total; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = current - 1; i <= current + 1; i++) pages.push(i);
        pages.push("ellipsis");
        pages.push(total);
      }
    }
    return pages;
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      {withTotal && totalItems !== undefined && (
        <Text size={size} tone="secondary">
          Total: {totalItems}
        </Text>
      )}
      
      <div className="molecule-pagination-controls">
        <IconButton
          icon="chevron-left"
          variant="ghost"
          tone={tone}
          size={size}
          disabled={current === 1}
          onClick={() => handlePageChange(current - 1)}
          aria-label="Previous page"
          importRef={importRef}
        />
        
        {variant === "numbers" && pageNumbers.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <span key={`ellipsis-${index}`} className="molecule-pagination-ellipsis">
                ...
              </span>
            );
          }
          const pageNum = page as number;
          return (
            <Button
              key={pageNum}
              variant={current === pageNum ? "solid" : "ghost"}
              tone={current === pageNum ? tone : "neutral"}
              size={size}
              onClick={() => handlePageChange(pageNum)}
              aria-label={`Page ${pageNum}`}
              aria-current={current === pageNum ? "page" : undefined}
              importRef={importRef}
            >
              {pageNum}
            </Button>
          );
        })}
        
        <IconButton
          icon="chevron-right"
          variant="ghost"
          tone={tone}
          size={size}
          disabled={current === total}
          onClick={() => handlePageChange(current + 1)}
          aria-label="Next page"
          importRef={importRef}
        />
      </div>
      
      {withPageSize && (
        <div className="molecule-pagination-page-size">
          <Select
            size={size}
            value={pageSize}
            options={pageSizeOptions.map(opt => ({ label: `${opt} per page`, value: opt }))}
            onChange={(value) => onPageSizeChange?.(value as number)}
            importRef={importRef}
          />
        </div>
      )}
      
      {withJumpTo && (
        <div className="molecule-pagination-jump-to">
          <Text size={size} tone="secondary">Jump to:</Text>
          <TextField
            size={size}
            value={jumpToPage}
            onChange={(e) => setJumpToPage(e.target.value)}
            style={{ width: 60, marginLeft: 8 }}
            onPressEnter={handleJumpTo}
            importRef={importRef}
          />
        </div>
      )}
    </div>
  );
}

