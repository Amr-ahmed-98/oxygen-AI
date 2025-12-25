/**
 * ============================================
 * Molecule ContextMenu - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Dropdown, MenuProps } from "antd";
import { cn } from "../utils/cn";

export interface MoleculeContextMenuItem {
  key: string;
  label: string;
  icon?: string;
  shortcut?: string;
  danger?: boolean;
  disabled?: boolean;
  children?: MoleculeContextMenuItem[];
}

export interface MoleculeContextMenuProps {
  items: MoleculeContextMenuItem[];
  trigger?: "contextMenu" | "click" | "hover";
  onAction?: (key: string) => void;
  children: React.ReactNode;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function ContextMenu({
  items,
  trigger = "contextMenu",
  onAction,
  children,
  className,
  dataTestId,
  importRef,
}: MoleculeContextMenuProps) {
  const moleculeClassName = cn("molecule-context-menu", className);
  
  const menuItems: MenuProps["items"] = items.map((item) => ({
    key: item.key,
    label: item.label,
    icon: item.icon ? <span>{item.icon}</span> : undefined,
    danger: item.danger,
    disabled: item.disabled,
    children: item.children?.map((child) => ({
      key: child.key,
      label: child.label,
      icon: child.icon ? <span>{child.icon}</span> : undefined,
      danger: child.danger,
      disabled: child.disabled,
    })),
  }));
  
  const menuProps: MenuProps = {
    items: menuItems,
    onClick: ({ key }) => onAction?.(key as string),
  };
  
  return (
    <Dropdown
      menu={menuProps}
      trigger={trigger === "contextMenu" ? ["contextMenu"] : trigger === "hover" ? ["hover"] : ["click"]}
      className={moleculeClassName}
      data-testid={dataTestId}
    >
      {children}
    </Dropdown>
  );
}

