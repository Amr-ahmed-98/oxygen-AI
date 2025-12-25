/**
 * ============================================
 * Molecule ActivityItem - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Avatar } from "../atoms/Avatar";
import { Text } from "../atoms/Text";
import { Badge } from "../atoms/Badge";
import { Icon } from "../atoms/Icon";
import { Link } from "../atoms/Link";
import { IconButton } from "../atoms/IconButton";
import { cn } from "../utils/cn";

export interface MoleculeActivityItemProps {
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
  variant?: "default" | "compact" | "detailed";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  onActorClick?: () => void;
  onMore?: () => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function ActivityItem({
  actor,
  action,
  timestamp,
  meta,
  variant = "default",
  size = "md",
  onClick,
  onActorClick,
  onMore,
  className,
  dataTestId,
  importRef,
}: MoleculeActivityItemProps) {
  const moleculeClassName = cn(
    "molecule-activity-item",
    `molecule-activity-item--${variant}`,
    `molecule-activity-item--${size}`,
    className
  );
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId} onClick={onClick}>
      {actor && (
        <div className="molecule-activity-item-actor">
          {actor.href || onActorClick ? (
            <Link href={actor.href} onClick={onActorClick} importRef={importRef}>
              <Avatar src={actor.avatar} alt={actor.name} size={size} />
            </Link>
          ) : (
            <Avatar src={actor.avatar} alt={actor.name} size={size} />
          )}
        </div>
      )}
      
      <div className="molecule-activity-item-content">
        <div className="molecule-activity-item-main">
          {actor && (
            <Link href={actor.href} onClick={onActorClick} size={size} importRef={importRef}>
              <Text size={size} weight="medium">
                {actor.name}
              </Text>
            </Link>
          )}
          <Text size={size}>{action}</Text>
          {meta?.icon && <Icon type={meta.icon} size={size} />}
          {meta?.badge && (
            <Badge count={meta.badge} size={size} />
          )}
        </div>
        
        {meta?.secondaryText && (
          <Text size={size} tone="secondary">
            {meta.secondaryText}
          </Text>
        )}
        
        {timestamp && (
          <Text size={size} tone="secondary">
            {timestamp}
          </Text>
        )}
      </div>
      
      {onMore && (
        <IconButton
          icon="more-vertical"
          variant="ghost"
          size={size}
          onClick={onMore}
          aria-label="More actions"
          importRef={importRef}
        />
      )}
    </div>
  );
}

