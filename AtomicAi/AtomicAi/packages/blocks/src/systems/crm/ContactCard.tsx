/**
 * ============================================
 * CRM Contact Card Block
 * ============================================
 */

import React from "react";
import { CardHeader, Avatar, KeyValueRow, Button, ActionMenu } from "@atomic-ai/ui-antd";

export interface ContactCardProps {
  contact: {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    company?: string;
    title?: string;
    avatar?: string;
    tags?: string[];
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function ContactCard({ contact, onEdit, onDelete }: ContactCardProps) {
  return (
    <div className="block-contact-card">
      <CardHeader
        title={contact.name}
        subtitle={contact.title}
        icon={contact.avatar ? <Avatar src={contact.avatar} alt={contact.name} /> : undefined}
        actions={[{ key: "edit", label: "Edit", icon: "edit" }]}
        menuActions={[{ key: "delete", label: "Delete", icon: "trash", danger: true }]}
        onAction={(key) => {
          if (key === "edit") onEdit?.(contact.id);
          if (key === "delete") onDelete?.(contact.id);
        }}
      />
      
      <div className="block-contact-card-content">
        {contact.email && <KeyValueRow label="Email" value={contact.email} />}
        {contact.phone && <KeyValueRow label="Phone" value={contact.phone} />}
        {contact.company && <KeyValueRow label="Company" value={contact.company} />}
      </div>
      
      {contact.tags && contact.tags.length > 0 && (
        <div className="block-contact-card-tags">
          {contact.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}

