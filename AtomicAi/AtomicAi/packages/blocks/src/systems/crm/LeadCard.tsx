/**
 * ============================================
 * CRM Lead Card Block
 * ============================================
 */

import React from "react";
import {
  CardHeader,
  KeyValueRow,
  AvatarGroup,
  ActivityItem,
  Button,
  IconButton,
  ActionMenu,
} from "@atomic-ai/ui-antd";

export interface LeadCardProps {
  lead: {
    id: string;
    name: string;
    company?: string;
    email?: string;
    phone?: string;
    status: string;
    value?: number;
    source?: string;
    assignedTo?: Array<{ name: string; avatar?: string }>;
    lastActivity?: string;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onConvert?: (id: string) => void;
}

export function LeadCard({ lead, onEdit, onDelete, onConvert }: LeadCardProps) {
  return (
    <div className="block-lead-card">
      <CardHeader
        title={lead.name}
        subtitle={lead.company}
        actions={[
          { key: "edit", label: "Edit", icon: "edit" },
          { key: "convert", label: "Convert to Deal", icon: "arrow-right" },
        ]}
        menuActions={[
          { key: "delete", label: "Delete", icon: "trash", danger: true },
        ]}
        onAction={(key) => {
          if (key === "edit") onEdit?.(lead.id);
          if (key === "convert") onConvert?.(lead.id);
          if (key === "delete") onDelete?.(lead.id);
        }}
      />
      
      <div className="block-lead-card-content">
        {lead.email && <KeyValueRow label="Email" value={lead.email} />}
        {lead.phone && <KeyValueRow label="Phone" value={lead.phone} />}
        <KeyValueRow label="Status" value={lead.status} />
        {lead.source && <KeyValueRow label="Source" value={lead.source} />}
        {lead.value && <KeyValueRow label="Value" value={`$${lead.value.toLocaleString()}`} />}
      </div>
      
      {lead.assignedTo && lead.assignedTo.length > 0 && (
        <div className="block-lead-card-assigned">
          <AvatarGroup avatars={lead.assignedTo.map(u => ({ alt: u.name, src: u.avatar }))} />
        </div>
      )}
      
      {lead.lastActivity && (
        <ActivityItem
          action={`Last activity: ${lead.lastActivity}`}
          timestamp={lead.lastActivity}
        />
      )}
    </div>
  );
}

