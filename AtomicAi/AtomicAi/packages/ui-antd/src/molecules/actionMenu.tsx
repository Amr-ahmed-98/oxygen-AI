/**
 * ============================================
 * Molecule ActionMenu - Composed from Atoms
 * ============================================
 * 
 * IconButton trigger with dropdown menu items; supports grouped actions,
 * destructive items, and compact modes.
 */

import React, { useState } from "react";
import { Dropdown, MenuProps } from "antd";
import { IconButton } from "../atoms/IconButton";
import { cn } from "../utils/cn";

export interface MoleculeActionMenuProps {
  items: Array<{
    key: string;
    label: React.ReactNode;
    icon?: string;
    danger?: boolean;
    disabled?: boolean;
    shortcut?: string;
    badge?: string | number;
  }>;
  variant?: "kebab" | "ellipsis" | "button";
  tone?: "neutral" | "primary";
  size?: "sm" | "md" | "lg";
  density?: "comfortable" | "compact";
  withIcons?: boolean;
  withShortcuts?: boolean;
  grouped?: boolean;
  dangerStyle?: "text" | "highlight" | "none";
  onAction?: (key: string) => void;
  "aria-label"?: string;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function ActionMenu({
  items,
  variant = "kebab",
  tone = "neutral",
  size = "sm",
  density = "compact",
  withIcons = true,
  withShortcuts = false,
  grouped = true,
  dangerStyle = "highlight",
  onAction,
  "aria-label": ariaLabel = "More actions",
  className,
  dataTestId,
  importRef,
}: MoleculeActionMenuProps) {
  const [open, setOpen] = useState(false);
  
  const iconMap: Record<string, string> = {
    kebab: "more-vertical",
    ellipsis: "more-horizontal",
    button: "more-vertical",
  };
  
  const menuItems: MenuProps["items"] = items.map((item) => ({
    key: item.key,
    label: (
      <div className={cn("molecule-action-menu-item")}>
        {withIcons && item.icon && <span className="molecule-action-menu-item-icon">{item.icon}</span>}
        <span className="molecule-action-menu-item-label">{item.label}</span>
        {withShortcuts && item.shortcut && (
          <span className="molecule-action-menu-item-shortcut">{item.shortcut}</span>
        )}
        {item.badge && <span className="molecule-action-menu-item-badge">{item.badge}</span>}
      </div>
    ),
    danger: item.danger && dangerStyle !== "none",
    disabled: item.disabled,
  }));
  
  const menuProps: MenuProps = {
    items: menuItems,
    onClick: ({ key }) => {
      onAction?.(key);
      setOpen(false);
    },
  };
  
  const moleculeClassName = cn(
    "molecule-action-menu",
    `molecule-action-menu--${variant}`,
    `molecule-action-menu--${tone}`,
    `molecule-action-menu--${size}`,
    `molecule-action-menu--${density}`,
    grouped && "molecule-action-menu--grouped",
    className
  );
  
  return (
    <Dropdown
      menu={menuProps}
      trigger={["click"]}
      open={open}
      onOpenChange={setOpen}
      className={moleculeClassName}
      data-testid={dataTestId}
    >
      <div>
        <IconButton
          icon={iconMap[variant]}
          variant="ghost"
          tone={tone}
          size={size}
          aria-label={ariaLabel}
          importRef={importRef}
        />
      </div>
    </Dropdown>
  );
}

