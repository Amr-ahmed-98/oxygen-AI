/**
 * ============================================
 * Molecule DocPreviewCard - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Image } from "../atoms/Image";
import { Text } from "../atoms/Text";
import { Icon } from "../atoms/Icon";
import { IconButton } from "../atoms/IconButton";
import { Link } from "../atoms/Link";
import { cn } from "../utils/cn";

export interface MoleculeDocPreviewCardProps {
  title: string;
  thumbnail?: string;
  description?: string;
  url?: string;
  onView?: () => void;
  onDownload?: () => void;
  size?: "sm" | "md" | "lg";
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function DocPreviewCard({
  title,
  thumbnail,
  description,
  url,
  onView,
  onDownload,
  size = "md",
  className,
  dataTestId,
  importRef,
}: MoleculeDocPreviewCardProps) {
  const moleculeClassName = cn("molecule-doc-preview-card", className);
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      {thumbnail && (
        <Image src={thumbnail} alt={title} className="molecule-doc-preview-card-thumbnail" importRef={importRef} />
      )}
      <div className="molecule-doc-preview-card-content">
        {url ? (
          <Link href={url} size={size} importRef={importRef}>
            <Text size={size} weight="medium">{title}</Text>
          </Link>
        ) : (
          <Text size={size} weight="medium">{title}</Text>
        )}
        {description && <Text size="sm" tone="secondary">{description}</Text>}
      </div>
      <div className="molecule-doc-preview-card-actions">
        {onView && <IconButton icon="eye" variant="ghost" size={size} onClick={onView} aria-label="View" importRef={importRef} />}
        {onDownload && <IconButton icon="download" variant="ghost" size={size} onClick={onDownload} aria-label="Download" importRef={importRef} />}
      </div>
    </div>
  );
}

