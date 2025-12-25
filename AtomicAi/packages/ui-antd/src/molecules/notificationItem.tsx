/**
 * ============================================
 * Molecule NotificationItem - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Avatar } from "../atoms/Avatar";
import { Text } from "../atoms/Text";
import { Icon } from "../atoms/Icon";
import { Badge } from "../atoms/Badge";
import { IconButton } from "../atoms/IconButton";
import { cn } from "../utils/cn";

export interface MoleculeNotificationItemProps {
  title: string;
  description?: string;
  avatar?: string;
  icon?: string;
  time?: string;
  unread?: boolean;
  onClick?: () => void;
  onDismiss?: () => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function NotificationItem({
  title,
  description,
  avatar,
  icon,
  time,
  unread = false,
  onClick,
  onDismiss,
  className,
  dataTestId,
  importRef,
}: MoleculeNotificationItemProps) {
  const moleculeClassName = cn(
    "molecule-notification-item",
    unread && "molecule-notification-item--unread",
    onClick && "molecule-notification-item--clickable",
    className
  );
  
  return (
    <div className={moleculeClassName} onClick={onClick} data-testid={dataTestId}>
      {avatar && <Avatar src={avatar} size="md" className="molecule-notification-item-avatar" importRef={importRef} />}
      {icon && <Icon type={icon} size="md" className="molecule-notification-item-icon" />}
      <div className="molecule-notification-item-content">
        <Text weight="medium">{title}</Text>
        {description && <Text size="sm" tone="secondary">{description}</Text>}
        {time && <Text size="xs" tone="secondary">{time}</Text>}
      </div>
      {onDismiss && (
        <IconButton icon="x" variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); onDismiss(); }} aria-label="Dismiss" importRef={importRef} />
      )}
    </div>
  );
}

