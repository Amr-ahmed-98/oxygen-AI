/**
 * ============================================
 * Molecule KeyValueRow - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Text } from "../atoms/Text";
import { Link } from "../atoms/Link";
import { cn } from "../utils/cn";

export interface MoleculeKeyValueRowProps {
  label: string;
  value: React.ReactNode;
  variant?: "default" | "inline" | "stacked";
  size?: "sm" | "md" | "lg";
  valueAsLink?: boolean;
  valueHref?: string;
  onValueClick?: () => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function KeyValueRow({
  label,
  value,
  variant = "default",
  size = "md",
  valueAsLink = false,
  valueHref,
  onValueClick,
  className,
  dataTestId,
  importRef,
}: MoleculeKeyValueRowProps) {
  const moleculeClassName = cn(
    "molecule-key-value-row",
    `molecule-key-value-row--${variant}`,
    `molecule-key-value-row--${size}`,
    className
  );
  
  const renderValue = () => {
    if (valueAsLink || valueHref) {
      return (
        <Link href={valueHref} onClick={onValueClick} size={size} importRef={importRef}>
          {value}
        </Link>
      );
    }
    if (typeof value === "string") {
      return <Text size={size}>{value}</Text>;
    }
    return value;
  };
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      <div className="molecule-key-value-row-label">
        <Text size={size} tone="secondary" weight="medium">
          {label}
        </Text>
      </div>
      <div className="molecule-key-value-row-value">
        {renderValue()}
      </div>
    </div>
  );
}

