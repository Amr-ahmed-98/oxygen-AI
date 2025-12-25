/**
 * ============================================
 * Molecule AvatarGroup - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Avatar } from "../atoms/Avatar";
import { Text } from "../atoms/Text";
import { cn } from "../utils/cn";

export interface MoleculeAvatarGroupItem {
  src?: string;
  alt: string;
  name?: string;
}

export interface MoleculeAvatarGroupProps {
  avatars: MoleculeAvatarGroupItem[];
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "overlap" | "stack";
  showMore?: boolean;
  onMoreClick?: () => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function AvatarGroup({
  avatars,
  max = 4,
  size = "md",
  variant = "overlap",
  showMore = true,
  onMoreClick,
  className,
  dataTestId,
  importRef,
}: MoleculeAvatarGroupProps) {
  const displayAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;
  
  const moleculeClassName = cn(
    "molecule-avatar-group",
    `molecule-avatar-group--${variant}`,
    className
  );
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      {displayAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          src={avatar.src}
          alt={avatar.alt}
          size={size}
          className="molecule-avatar-group-item"
          importRef={importRef}
        />
      ))}
      {showMore && remaining > 0 && (
        <div
          className="molecule-avatar-group-more"
          onClick={onMoreClick}
          role="button"
          tabIndex={0}
        >
          <Text size={size}>+{remaining}</Text>
        </div>
      )}
    </div>
  );
}

