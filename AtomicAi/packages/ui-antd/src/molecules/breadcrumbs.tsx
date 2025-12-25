/**
 * ============================================
 * Molecule Breadcrumbs - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Link } from "../atoms/Link";
import { Text } from "../atoms/Text";
import { Icon } from "../atoms/Icon";
import { IconButton } from "../atoms/IconButton";
import { cn } from "../utils/cn";

export interface MoleculeBreadcrumbItem {
  label: string;
  href?: string;
  icon?: string;
  onClick?: () => void;
}

export interface MoleculeBreadcrumbsProps {
  items: MoleculeBreadcrumbItem[];
  variant?: "default" | "withIcons" | "minimal" | "card";
  tone?: "neutral" | "muted" | "brand";
  size?: "sm" | "md" | "lg";
  maxItems?: 3 | 4 | 5 | 6 | 8 | "auto";
  collapse?: "none" | "middle" | "menu";
  separator?: "slash" | "chevron" | "dot";
  withAction?: boolean;
  onAction?: () => void;
  onNavigate?: (item: MoleculeBreadcrumbItem, index: number) => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function Breadcrumbs({
  items,
  variant = "default",
  tone = "muted",
  size = "md",
  maxItems = "auto",
  collapse = "middle",
  separator = "chevron",
  withAction = false,
  onAction,
  onNavigate,
  className,
  dataTestId,
  importRef,
}: MoleculeBreadcrumbsProps) {
  const separatorIcon = separator === "chevron" ? "chevron-right" : separator === "slash" ? "slash" : "dot";
  
  const displayItems = (() => {
    if (collapse === "none" || items.length <= (typeof maxItems === "number" ? maxItems : 5)) {
      return items;
    }
    if (collapse === "menu") {
      return [items[0], { label: "...", href: undefined, icon: undefined }, items[items.length - 1]];
    }
    const max = typeof maxItems === "number" ? maxItems : 5;
    if (items.length <= max) return items;
    const first = Math.floor(max / 2);
    const last = max - first - 1;
    return [
      ...items.slice(0, first),
      { label: "...", href: undefined, icon: undefined },
      ...items.slice(items.length - last),
    ];
  })();
  
  const moleculeClassName = cn(
    "molecule-breadcrumbs",
    `molecule-breadcrumbs--${variant}`,
    `molecule-breadcrumbs--${tone}`,
    `molecule-breadcrumbs--${size}`,
    `molecule-breadcrumbs--separator-${separator}`,
    collapse !== "none" && "molecule-breadcrumbs--collapsed",
    withAction && "molecule-breadcrumbs--with-action",
    className
  );
  
  return (
    <nav className={moleculeClassName} aria-label="Breadcrumb" data-testid={dataTestId}>
      <ol className="molecule-breadcrumbs-list">
        {displayItems.map((item, index) => {
          const isLast = index === displayItems.length - 1;
          const actualIndex = items.findIndex(i => i === item);
          const isEllipsis = item.label === "...";
          
          return (
            <li key={index} className="molecule-breadcrumbs-item">
              {!isLast && (
                <>
                  {isEllipsis ? (
                    <span className="molecule-breadcrumbs-ellipsis">...</span>
                  ) : (
                    <>
                      {variant === "withIcons" && item.icon && (
                        <Icon type={item.icon} size={size} className="molecule-breadcrumbs-icon" />
                      )}
                      {item.href || item.onClick ? (
                        <Link
                          href={item.href}
                          onClick={() => {
                            onNavigate?.(item, actualIndex);
                            item.onClick?.();
                          }}
                          size={size}
                          tone={tone}
                          importRef={importRef}
                        >
                          {item.label}
                        </Link>
                      ) : (
                        <Text size={size} tone={isLast ? "primary" : "secondary"} aria-current={isLast ? "page" : undefined}>
                          {item.label}
                        </Text>
                      )}
                    </>
                  )}
                  <Icon type={separatorIcon} size={size} className="molecule-breadcrumbs-separator" />
                </>
              )}
              {isLast && (
                <>
                  {variant === "withIcons" && item.icon && (
                    <Icon type={item.icon} size={size} className="molecule-breadcrumbs-icon" />
                  )}
                  <Text size={size} tone="primary" aria-current="page">
                    {item.label}
                  </Text>
                </>
              )}
            </li>
          );
        })}
      </ol>
      {withAction && onAction && (
        <div className="molecule-breadcrumbs-action">
          <IconButton
            icon="more-vertical"
            variant="ghost"
            tone={tone}
            size={size}
            onClick={onAction}
            aria-label="Breadcrumb actions"
            importRef={importRef}
          />
        </div>
      )}
    </nav>
  );
}

