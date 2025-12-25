/**
 * ============================================
 * Molecule ChangelogRow - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Text } from "../atoms/Text";
import { Badge } from "../atoms/Badge";
import { Icon } from "../atoms/Icon";
import { cn } from "../utils/cn";

export interface MoleculeChangelogRowProps {
  version: string;
  date: string;
  changes: string[];
  type?: "feature" | "bugfix" | "breaking";
  size?: "sm" | "md" | "lg";
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function ChangelogRow({
  version,
  date,
  changes,
  type = "feature",
  size = "md",
  className,
  dataTestId,
  importRef,
}: MoleculeChangelogRowProps) {
  const moleculeClassName = cn("molecule-changelog-row", className);
  const typeColors = {
    feature: "primary",
    bugfix: "success",
    breaking: "danger",
  };
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      <div className="molecule-changelog-row-header">
        <Text size={size} weight="medium">{version}</Text>
        <Badge tone={typeColors[type]} size={size}>{type}</Badge>
        <Text size={size} tone="secondary">{date}</Text>
      </div>
      <ul className="molecule-changelog-row-changes">
        {changes.map((change, index) => (
          <li key={index}>
            <Text size={size}>{change}</Text>
          </li>
        ))}
      </ul>
    </div>
  );
}

