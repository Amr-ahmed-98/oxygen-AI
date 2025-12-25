/**
 * ============================================
 * Molecule FilterBar - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Tag, Badge } from "antd";
import { Select } from "../atoms/Select";
import { DateRange } from "../atoms/DateRange";
import { Button } from "../atoms/Button";
import { SearchInput } from "../atoms/SearchInput";
import { cn } from "../utils/cn";

export interface MoleculeFilterBarProps {
  chips?: Array<{ key: string; label: string; onRemove?: () => void }>;
  selectFilters?: Array<{ key: string; label: string; options: Array<{ label: string; value: string }>; value?: string }>;
  withDateRange?: boolean;
  dateRange?: [string, string];
  withSearch?: boolean;
  searchValue?: string;
  activeCount?: number;
  variant?: "inline" | "collapse" | "drawer";
  size?: "sm" | "md" | "lg";
  onChange?: (key: string, value: any) => void;
  onApply?: () => void;
  onReset?: () => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function FilterBar({
  chips = [],
  selectFilters = [],
  withDateRange = false,
  dateRange,
  withSearch = false,
  searchValue,
  activeCount = 0,
  variant = "inline",
  size = "md",
  onChange,
  onApply,
  onReset,
  className,
  dataTestId,
  importRef,
}: MoleculeFilterBarProps) {
  const moleculeClassName = cn(
    "molecule-filter-bar",
    `molecule-filter-bar--${variant}`,
    `molecule-filter-bar--${size}`,
    className
  );
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      {withSearch && (
        <SearchInput
          value={searchValue}
          placeholder="Search..."
          size={size}
          onChange={(e) => onChange?.("search", e.target.value)}
          importRef={importRef}
        />
      )}
      
      {chips.map((chip) => (
        <Tag
          key={chip.key}
          closable={!!chip.onRemove}
          onClose={(e) => {
            e.preventDefault();
            chip.onRemove?.();
          }}
          className="molecule-filter-bar-chip"
        >
          {chip.label}
        </Tag>
      ))}
      
      {selectFilters.map((filter) => (
        <Select
          key={filter.key}
          placeholder={filter.label}
          value={filter.value}
          options={filter.options}
          onChange={(value) => onChange?.(filter.key, value)}
          size={size}
          style={{ minWidth: 150 }}
          importRef={importRef}
        />
      ))}
      
      {withDateRange && (
        <DateRange
          value={dateRange}
          onChange={(range) => onChange?.("dateRange", range)}
          size={size}
          importRef={importRef}
        />
      )}
      
      <div className="molecule-filter-bar-actions">
        {activeCount > 0 && (
          <Badge count={activeCount}>
            <Button variant="ghost" size={size} onClick={onReset} importRef={importRef}>
              Reset
            </Button>
          </Badge>
        )}
        {onApply && (
          <Button variant="solid" tone="primary" size={size} onClick={onApply} importRef={importRef}>
            Apply
          </Button>
        )}
      </div>
    </div>
  );
}

