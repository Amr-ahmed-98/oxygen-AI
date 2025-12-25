/**
 * ============================================
 * ERP Block: Filters Bar
 * ============================================
 */

import React from "react";
import { AtomTextField, AtomSelect, AtomButton } from "@atomic-ai/ui";

export interface FilterField {
  type: "text" | "select" | "date";
  name: string;
  label: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
}

export interface FiltersBarProps {
  fields: FilterField[];
  onFilter?: (filters: Record<string, any>) => void;
  onReset?: () => void;
}

export function FiltersBar({ fields, onFilter, onReset }: FiltersBarProps) {
  const [filters, setFilters] = React.useState<Record<string, any>>({});

  const handleChange = (name: string, value: any) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onFilter?.(filters);
  };

  const handleReset = () => {
    setFilters({});
    onReset?.();
  };

  return (
    <div className="filters-bar p-4 bg-neutral-50 border-b border-neutral-200">
      <div className="flex flex-wrap gap-4 items-end">
        {fields.map((field) => (
          <div key={field.name} className="flex-1 min-w-[200px]">
            {field.type === "text" && (
              <AtomTextField
                label={field.label}
                placeholder={field.placeholder}
                value={filters[field.name] || ""}
                onChange={(value) => handleChange(field.name, value)}
                size="sm"
              />
            )}
            {field.type === "select" && (
              <AtomSelect
                label={field.label}
                placeholder={field.placeholder}
                options={field.options || []}
                value={filters[field.name]}
                onChange={(value) => handleChange(field.name, value)}
                size="sm"
              />
            )}
          </div>
        ))}
        <div className="flex gap-2">
          <AtomButton variant="solid" tone="primary" size="sm" onClick={handleApply}>
            Apply
          </AtomButton>
          {onReset && (
            <AtomButton variant="outline" tone="neutral" size="sm" onClick={handleReset}>
              Reset
            </AtomButton>
          )}
        </div>
      </div>
    </div>
  );
}

