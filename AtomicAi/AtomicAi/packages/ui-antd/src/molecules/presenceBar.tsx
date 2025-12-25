/**
 * ============================================
 * Molecule PresenceBar - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Avatar } from "../atoms/Avatar";
import { Text } from "../atoms/Text";
import { Badge } from "../atoms/Badge";
import { cn } from "../utils/cn";

export interface MoleculePresenceUser {
  id: string;
  name: string;
  avatar?: string;
  status: "online" | "away" | "busy" | "offline";
}

export interface MoleculePresenceBarProps {
  users: MoleculePresenceUser[];
  maxVisible?: number;
  size?: "sm" | "md" | "lg";
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

const statusColors = {
  online: "success",
  away: "warning",
  busy: "danger",
  offline: "neutral",
};

export function PresenceBar({
  users,
  maxVisible = 5,
  size = "md",
  className,
  dataTestId,
  importRef,
}: MoleculePresenceBarProps) {
  const moleculeClassName = cn("molecule-presence-bar", className);
  const visibleUsers = users.slice(0, maxVisible);
  const remaining = users.length - maxVisible;
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      {visibleUsers.map((user) => (
        <div key={user.id} className="molecule-presence-bar-user">
          <Avatar src={user.avatar} alt={user.name} size={size} className="molecule-presence-bar-avatar" importRef={importRef}>
            <Badge status={statusColors[user.status] as any} />
          </Avatar>
          <Text size="sm">{user.name}</Text>
        </div>
      ))}
      {remaining > 0 && (
        <Text size="sm" tone="secondary">+{remaining} more</Text>
      )}
    </div>
  );
}

