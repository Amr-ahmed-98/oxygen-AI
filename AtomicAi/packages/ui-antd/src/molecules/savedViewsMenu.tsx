/**
 * ============================================
 * Molecule SavedViewsMenu - Composed from Atoms
 * ============================================
 */

import React from "react";
import { ActionMenu } from "./actionMenu";
import { cn } from "../utils/cn";

export interface MoleculeSavedView {
  key: string;
  label: string;
  icon?: string;
}

export interface MoleculeSavedViewsMenuProps {
  views: MoleculeSavedView[];
  currentView?: string;
  onViewSelect?: (key: string) => void;
  onSave?: () => void;
  size?: "sm" | "md" | "lg";
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function SavedViewsMenu({
  views,
  currentView,
  onViewSelect,
  onSave,
  size = "sm",
  className,
  dataTestId,
  importRef,
}: MoleculeSavedViewsMenuProps) {
  const moleculeClassName = cn("molecule-saved-views-menu", className);
  
  const menuItems = [
    ...views.map(v => ({
      key: v.key,
      label: v.label,
      icon: v.icon,
    })),
    { key: "save", label: "Save current view", icon: "save" },
  ];
  
  return (
    <ActionMenu
      items={menuItems}
      variant="button"
      size={size}
      onAction={(key) => {
        if (key === "save") {
          onSave?.();
        } else {
          onViewSelect?.(key);
        }
      }}
      className={moleculeClassName}
      dataTestId={dataTestId}
      importRef={importRef}
    />
  );
}

