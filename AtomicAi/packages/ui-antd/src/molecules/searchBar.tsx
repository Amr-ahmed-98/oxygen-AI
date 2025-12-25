/**
 * ============================================
 * Molecule SearchBar - Composed from Atoms
 * ============================================
 */

import React, { useState } from "react";
import { SearchInput } from "../atoms/SearchInput";
import { Button } from "../atoms/Button";
import { IconButton } from "../atoms/IconButton";
import { Badge } from "../atoms/Badge";
import { Select } from "../atoms/Select";
import { cn } from "../utils/cn";

export interface MoleculeSearchBarProps {
  value?: string;
  placeholder?: string;
  variant?: "flat" | "card" | "inline" | "glass";
  tone?: "neutral" | "primary" | "info" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  density?: "comfortable" | "compact";
  withScope?: boolean;
  scopeOptions?: Array<{ label: string; value: string }>;
  scope?: string;
  withFilters?: boolean;
  filterCount?: number;
  withSubmit?: boolean;
  onQueryChange?: (query: string) => void;
  onSubmit?: (query: string) => void;
  onOpenFilters?: () => void;
  onScopeChange?: (scope: string) => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function SearchBar({
  value = "",
  placeholder = "Search...",
  variant = "card",
  tone = "neutral",
  size = "md",
  density = "comfortable",
  withScope = false,
  scopeOptions = [],
  scope,
  withFilters = true,
  filterCount = 0,
  withSubmit = false,
  onQueryChange,
  onSubmit,
  onOpenFilters,
  onScopeChange,
  className,
  dataTestId,
  importRef,
}: MoleculeSearchBarProps) {
  const [query, setQuery] = useState(value);
  
  const handleChange = (newValue: string) => {
    setQuery(newValue);
    onQueryChange?.(newValue);
  };
  
  const handleSubmit = () => {
    onSubmit?.(query);
  };
  
  const handleClear = () => {
    setQuery("");
    onQueryChange?.("");
  };
  
  const moleculeClassName = cn(
    "molecule-search-bar",
    `molecule-search-bar--${variant}`,
    `molecule-search-bar--${tone}`,
    `molecule-search-bar--${size}`,
    `molecule-search-bar--${density}`,
    withScope && "molecule-search-bar--with-scope",
    withFilters && "molecule-search-bar--with-filters",
    withSubmit && "molecule-search-bar--with-submit",
    className
  );
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      {withScope && scopeOptions.length > 0 && (
        <Select
          size={size}
          value={scope}
          options={scopeOptions}
          onChange={(value) => onScopeChange?.(value as string)}
          style={{ minWidth: 120 }}
          importRef={importRef}
        />
      )}
      
      <div className="molecule-search-bar-input-wrapper">
        <SearchInput
          value={query}
          placeholder={placeholder}
          size={size}
          onChange={(e) => handleChange(e.target.value)}
          onPressEnter={handleSubmit}
          onClear={handleClear}
          allowClear
          importRef={importRef}
        />
      </div>
      
      {withFilters && (
        <div className="molecule-search-bar-filters">
          {filterCount > 0 ? (
            <Badge count={filterCount} size={size}>
              <IconButton
                icon="filter"
                variant="ghost"
                tone={tone}
                size={size}
                onClick={onOpenFilters}
                aria-label={`Filters (${filterCount} active)`}
                importRef={importRef}
              />
            </Badge>
          ) : (
            <IconButton
              icon="filter"
              variant="ghost"
              tone={tone}
              size={size}
              onClick={onOpenFilters}
              aria-label="Open filters"
              importRef={importRef}
            />
          )}
        </div>
      )}
      
      {withSubmit && (
        <Button variant="solid" tone={tone} size={size} onClick={handleSubmit} importRef={importRef}>
          Search
        </Button>
      )}
    </div>
  );
}

