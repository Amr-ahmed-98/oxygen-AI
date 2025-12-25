/**
 * ============================================
 * Molecule ActivityFeed - Composed from Atoms
 * ============================================
 */

import React, { useState } from "react";
import { Button } from "../atoms/Button";
import { Text } from "../atoms/Text";
import { ActivityItem } from "./activityItem";
import { FilterChipsRow } from "./filterChipsRow";
import { EmptyStateCompact } from "./emptyStateCompact";
import { cn } from "../utils/cn";

export interface MoleculeActivityItem {
  id: string;
  actor?: {
    name: string;
    avatar?: string;
    href?: string;
  };
  action: string;
  timestamp?: string;
  meta?: {
    badge?: string | number;
    secondaryText?: string;
    icon?: string;
  };
}

export interface MoleculeActivityFeedProps {
  items: MoleculeActivityItem[];
  variant?: "flat" | "grouped" | "compact" | "with-filters";
  density?: "comfortable" | "compact";
  withGrouping?: boolean;
  withInfinite?: boolean;
  withFilters?: boolean;
  loading?: boolean;
  onLoadMore?: () => void;
  onFilterChange?: (filters: any) => void;
  onItemOpen?: (item: MoleculeActivityItem) => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function ActivityFeed({
  items,
  variant = "grouped",
  density = "compact",
  withGrouping = true,
  withInfinite = false,
  withFilters = true,
  loading = false,
  onLoadMore,
  onFilterChange,
  onItemOpen,
  className,
  dataTestId,
  importRef,
}: MoleculeActivityFeedProps) {
  const [filters, setFilters] = useState<any[]>([]);
  
  const moleculeClassName = cn(
    "molecule-activity-feed",
    `molecule-activity-feed--${variant}`,
    `molecule-activity-feed--${density}`,
    withGrouping && "molecule-activity-feed--grouped",
    withInfinite && "molecule-activity-feed--infinite",
    className
  );
  
  const groupedItems = withGrouping
    ? items.reduce((acc, item) => {
        const date = item.timestamp?.split("T")[0] || "Today";
        if (!acc[date]) acc[date] = [];
        acc[date].push(item);
        return acc;
      }, {} as Record<string, MoleculeActivityItem[]>)
    : { "": items };
  
  if (items.length === 0 && !loading) {
    return (
      <div className={moleculeClassName} data-testid={dataTestId}>
        <EmptyStateCompact
          message="No activities yet"
          variant="simple"
          importRef={importRef}
        />
      </div>
    );
  }
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      {withFilters && (
        <FilterChipsRow
          chips={filters.map((f, i) => ({
            key: `filter-${i}`,
            label: f.label,
            onRemove: () => {
              const newFilters = filters.filter((_, idx) => idx !== i);
              setFilters(newFilters);
              onFilterChange?.(newFilters);
            },
          }))}
          size="md"
          onClearAll={() => {
            setFilters([]);
            onFilterChange?.([]);
          }}
          importRef={importRef}
        />
      )}
      
      {Object.entries(groupedItems).map(([date, groupItems]) => (
        <div key={date} className="molecule-activity-feed-group">
          {withGrouping && date && (
            <Text size="sm" tone="secondary" weight="medium">
              {date}
            </Text>
          )}
          {groupItems.map((item) => (
            <ActivityItem
              key={item.id}
              actor={item.actor}
              action={item.action}
              timestamp={item.timestamp}
              meta={item.meta}
              variant={variant === "compact" ? "compact" : "default"}
              onClick={() => onItemOpen?.(item)}
              importRef={importRef}
            />
          ))}
        </div>
      ))}
      
      {withInfinite && onLoadMore && (
        <div className="molecule-activity-feed-load-more">
          <Button
            variant="ghost"
            size="md"
            onClick={onLoadMore}
            loading={loading}
            importRef={importRef}
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}

