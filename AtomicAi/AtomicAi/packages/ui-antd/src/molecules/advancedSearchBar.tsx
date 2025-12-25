/**
 * ============================================
 * Molecule AdvancedSearchBar - Composed from Atoms
 * ============================================
 */

import React from "react";
import { SearchBar } from "./searchBar";
import { cn } from "../utils/cn";

export interface MoleculeAdvancedSearchBarProps {
  value?: string;
  placeholder?: string;
  withScope?: boolean;
  scopeOptions?: Array<{ label: string; value: string }>;
  withFilters?: boolean;
  filterCount?: number;
  onQueryChange?: (query: string) => void;
  onSubmit?: (query: string) => void;
  onOpenFilters?: () => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function AdvancedSearchBar({
  value,
  placeholder = "Search...",
  withScope = true,
  scopeOptions = [],
  withFilters = true,
  filterCount = 0,
  onQueryChange,
  onSubmit,
  onOpenFilters,
  className,
  dataTestId,
  importRef,
}: MoleculeAdvancedSearchBarProps) {
  const moleculeClassName = cn("molecule-advanced-search-bar", className);
  
  return (
    <SearchBar
      value={value}
      placeholder={placeholder}
      variant="card"
      withScope={withScope}
      scopeOptions={scopeOptions}
      withFilters={withFilters}
      filterCount={filterCount}
      onQueryChange={onQueryChange}
      onSubmit={onSubmit}
      onOpenFilters={onOpenFilters}
      className={moleculeClassName}
      dataTestId={dataTestId}
      importRef={importRef}
    />
  );
}

