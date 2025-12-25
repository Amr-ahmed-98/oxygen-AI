/**
 * ============================================
 * Molecule AttachmentList - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Icon } from "../atoms/Icon";
import { Text } from "../atoms/Text";
import { IconButton } from "../atoms/IconButton";
import { Link } from "../atoms/Link";
import { cn } from "../utils/cn";

export interface MoleculeAttachment {
  id: string;
  name: string;
  size?: string;
  url?: string;
}

export interface MoleculeAttachmentListProps {
  attachments: MoleculeAttachment[];
  onRemove?: (id: string) => void;
  onDownload?: (id: string) => void;
  size?: "sm" | "md" | "lg";
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function AttachmentList({
  attachments,
  onRemove,
  onDownload,
  size = "md",
  className,
  dataTestId,
  importRef,
}: MoleculeAttachmentListProps) {
  const moleculeClassName = cn("molecule-attachment-list", className);
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      {attachments.map((attachment) => (
        <div key={attachment.id} className="molecule-attachment-item">
          <Icon type="file" size={size} />
          <div className="molecule-attachment-info">
            {attachment.url ? (
              <Link href={attachment.url} size={size} importRef={importRef}>
                {attachment.name}
              </Link>
            ) : (
              <Text size={size}>{attachment.name}</Text>
            )}
            {attachment.size && (
              <Text size="sm" tone="secondary">{attachment.size}</Text>
            )}
          </div>
          {onDownload && (
            <IconButton icon="download" variant="ghost" size={size} onClick={() => onDownload(attachment.id)} aria-label="Download" importRef={importRef} />
          )}
          {onRemove && (
            <IconButton icon="trash" variant="ghost" tone="danger" size={size} onClick={() => onRemove(attachment.id)} aria-label="Remove" importRef={importRef} />
          )}
        </div>
      ))}
    </div>
  );
}

