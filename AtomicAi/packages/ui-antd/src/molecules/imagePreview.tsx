/**
 * ============================================
 * Molecule ImagePreview - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Image } from "../atoms/Image";
import { IconButton } from "../atoms/IconButton";
import { cn } from "../utils/cn";

export interface MoleculeImagePreviewProps {
  src: string;
  alt?: string;
  withControls?: boolean;
  onRemove?: () => void;
  onEdit?: () => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function ImagePreview({
  src,
  alt,
  withControls = true,
  onRemove,
  onEdit,
  className,
  dataTestId,
  importRef,
}: MoleculeImagePreviewProps) {
  const moleculeClassName = cn("molecule-image-preview", className);
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      <Image src={src} alt={alt} className="molecule-image-preview-image" importRef={importRef} />
      {withControls && (
        <div className="molecule-image-preview-controls">
          {onEdit && <IconButton icon="edit" variant="ghost" size="sm" onClick={onEdit} aria-label="Edit" importRef={importRef} />}
          {onRemove && <IconButton icon="trash" variant="ghost" tone="danger" size="sm" onClick={onRemove} aria-label="Remove" importRef={importRef} />}
        </div>
      )}
    </div>
  );
}

