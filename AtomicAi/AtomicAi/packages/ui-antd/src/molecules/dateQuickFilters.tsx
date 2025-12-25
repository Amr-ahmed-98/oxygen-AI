/**
 * ============================================
 * Molecule DateQuickFilters - Composed from Atoms
 * ============================================
 */

import React, { useState } from "react";
import { Button } from "../atoms/Button";
import { DateRange } from "../atoms/DateRange";
import { cn } from "../utils/cn";

export interface MoleculeDateQuickFiltersProps {
  value?: string;
  presets?: Array<{ key: string; label: string; value: [string, string] }>;
  withCompare?: boolean;
  size?: "sm" | "md" | "lg";
  onRangeChange?: (range: [string, string]) => void;
  onCompareToggle?: (enabled: boolean) => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

const defaultPresets = [
  { key: "today", label: "Today", value: ["today", "today"] as [string, string] },
  { key: "7d", label: "Last 7 days", value: ["7d", "today"] as [string, string] },
  { key: "30d", label: "Last 30 days", value: ["30d", "today"] as [string, string] },
  { key: "thisMonth", label: "This month", value: ["thisMonth", "today"] as [string, string] },
  { key: "custom", label: "Custom", value: ["custom", "custom"] as [string, string] },
];

export function DateQuickFilters({
  value,
  presets = defaultPresets,
  withCompare = false,
  size = "md",
  onRangeChange,
  onCompareToggle,
  className,
  dataTestId,
  importRef,
}: MoleculeDateQuickFiltersProps) {
  const [selectedPreset, setSelectedPreset] = useState(value || presets[0]?.key);
  const [compareEnabled, setCompareEnabled] = useState(false);
  
  const moleculeClassName = cn("molecule-date-quick-filters", className);
  
  const handlePresetClick = (preset: typeof presets[0]) => {
    setSelectedPreset(preset.key);
    onRangeChange?.(preset.value);
  };
  
  const handleCustomRange = (range: [string, string]) => {
    setSelectedPreset("custom");
    onRangeChange?.(range);
  };
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      <div className="molecule-date-quick-filters-presets">
        {presets.map((preset) => (
          <Button
            key={preset.key}
            variant={selectedPreset === preset.key ? "solid" : "ghost"}
            size={size}
            onClick={() => handlePresetClick(preset)}
            importRef={importRef}
          >
            {preset.label}
          </Button>
        ))}
      </div>
      
      {selectedPreset === "custom" && (
        <DateRange
          onChange={handleCustomRange}
          size={size}
          importRef={importRef}
        />
      )}
      
      {withCompare && (
        <Button
          variant={compareEnabled ? "solid" : "ghost"}
          size={size}
          onClick={() => {
            const newValue = !compareEnabled;
            setCompareEnabled(newValue);
            onCompareToggle?.(newValue);
          }}
          importRef={importRef}
        >
          Compare
        </Button>
      )}
    </div>
  );
}

