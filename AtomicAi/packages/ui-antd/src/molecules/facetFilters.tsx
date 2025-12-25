/**
 * ============================================
 * Molecule FacetFilters - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Checkbox } from "../atoms/Checkbox";
import { Text } from "../atoms/Text";
import { Button } from "../atoms/Button";
import { cn } from "../utils/cn";

export interface MoleculeFacetFilter {
  key: string;
  label: string;
  count?: number;
  selected?: boolean;
}

export interface MoleculeFacetFiltersProps {
  facets: Record<string, MoleculeFacetFilter[]>;
  onFacetChange?: (facet: string, key: string, selected: boolean) => void;
  size?: "sm" | "md" | "lg";
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function FacetFilters({
  facets,
  onFacetChange,
  size = "md",
  className,
  dataTestId,
  importRef,
}: MoleculeFacetFiltersProps) {
  const moleculeClassName = cn("molecule-facet-filters", className);
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      {Object.entries(facets).map(([facetKey, items]) => (
        <div key={facetKey} className="molecule-facet-filter-group">
          <Text size={size} weight="medium">{facetKey}</Text>
          {items.map((item) => (
            <Checkbox
              key={item.key}
              checked={item.selected}
              onChange={(e) => onFacetChange?.(facetKey, item.key, e.target.checked)}
            >
              {item.label} {item.count !== undefined && `(${item.count})`}
            </Checkbox>
          ))}
        </div>
      ))}
    </div>
  );
}

