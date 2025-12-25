/**
 * ============================================
 * Molecule Tabs - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Tabs as AtomTabs, type AtomTabsProps } from "../atoms/Tabs";
import { Badge } from "../atoms/Badge";
import { Icon } from "../atoms/Icon";
import { cn } from "../utils/cn";

export interface MoleculeTabItem {
  key: string;
  label: string;
  icon?: string;
  count?: number;
  badge?: string | number;
  disabled?: boolean;
}

export interface MoleculeTabsProps extends Omit<AtomTabsProps, "items"> {
  items: MoleculeTabItem[];
  variant?: "line" | "pill" | "segmented" | "underlined";
  tone?: "neutral" | "primary" | "brand";
  withIcons?: boolean;
  withCounts?: boolean;
  overflow?: "wrap" | "scroll";
  sticky?: boolean;
  onTabChange?: (key: string) => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function Tabs({
  items,
  variant = "line",
  tone = "neutral",
  size = "md",
  withIcons = false,
  withCounts = true,
  overflow = "scroll",
  sticky = false,
  activeKey,
  defaultActiveKey,
  onTabChange,
  className,
  dataTestId,
  importRef,
  ...rest
}: MoleculeTabsProps) {
  const tabItems = items.map((item) => {
    const labelParts: React.ReactNode[] = [];
    
    if (withIcons && item.icon) {
      labelParts.push(
        <Icon key="icon" type={item.icon} size={size} className="molecule-tabs-item-icon" />
      );
    }
    
    labelParts.push(
      <span key="label" className="molecule-tabs-item-label">
        {item.label}
      </span>
    );
    
    if (withCounts && item.count !== undefined) {
      labelParts.push(
        <Badge key="count" count={item.count} size={size} className="molecule-tabs-item-count" />
      );
    } else if (item.badge) {
      labelParts.push(
        <Badge key="badge" count={item.badge} size={size} className="molecule-tabs-item-badge" />
      );
    }
    
    return {
      key: item.key,
      label: <div className="molecule-tabs-item-content">{labelParts}</div>,
      disabled: item.disabled,
    };
  });
  
  const moleculeClassName = cn(
    "molecule-tabs",
    `molecule-tabs--${variant}`,
    `molecule-tabs--${tone}`,
    `molecule-tabs--${overflow}`,
    sticky && "molecule-tabs--sticky",
    withIcons && "molecule-tabs--with-icons",
    withCounts && "molecule-tabs--with-counts",
    className
  );
  
  const atomVariant: AtomTabsProps["variant"] =
    variant === "pill" ? "card" :
    variant === "segmented" ? "card" :
    variant === "underlined" ? "line" :
    "line";
  
  return (
    <AtomTabs
      variant={atomVariant}
      size={size}
      items={tabItems}
      activeKey={activeKey}
      defaultActiveKey={defaultActiveKey}
      onChange={onTabChange}
      className={moleculeClassName}
      data-testid={dataTestId}
      importRef={importRef}
      {...rest}
    />
  );
}

