/**
 * ============================================
 * Molecule SortBar - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Select } from "../atoms/Select";
import { IconButton } from "../atoms/IconButton";
import { Text } from "../atoms/Text";
import { cn } from "../utils/cn";

export interface MoleculeSortOption {
  key: string;
  label: string;
  direction?: "asc" | "desc";
}

export interface MoleculeSortBarProps {
  options: MoleculeSortOption[];
  value?: string;
  direction?: "asc" | "desc";
  size?: "sm" | "md" | "lg";
  onSortChange?: (key: string, direction: "asc" | "desc") => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function SortBar({
  options,
  value,
  direction = "asc",
  size = "md",
  onSortChange,
  className,
  dataTestId,
  importRef,
}: MoleculeSortBarProps) {
  const [currentDirection, setCurrentDirection] = React.useState<"asc" | "desc">(direction);
  
  const moleculeClassName = cn("molecule-sort-bar", className);
  
  const handleDirectionToggle = () => {
    const newDirection = currentDirection === "asc" ? "desc" : "asc";
    setCurrentDirection(newDirection);
    if (value) {
      onSortChange?.(value, newDirection);
    }
  };
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      <Text size={size} tone="secondary">
        Sort by:
      </Text>
      <Select
        value={value}
        options={options.map(opt => ({ label: opt.label, value: opt.key }))}
        onChange={(val) => onSortChange?.(val as string, currentDirection)}
        size={size}
        style={{ minWidth: 150 }}
        importRef={importRef}
      />
      <IconButton
        icon={currentDirection === "asc" ? "arrow-up" : "arrow-down"}
        variant="ghost"
        size={size}
        onClick={handleDirectionToggle}
        aria-label={`Sort ${currentDirection}`}
        importRef={importRef}
      />
    </div>
  );
}

