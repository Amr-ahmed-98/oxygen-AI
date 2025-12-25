/**
 * ============================================
 * Molecule FileUpload - Composed from Atoms
 * ============================================
 */

import React from "react";
import { FileUpload as AtomFileUpload, type AtomFileUploadProps } from "../atoms/FileUpload";
import { Text } from "../atoms/Text";
import { Icon } from "../atoms/Icon";
import { cn } from "../utils/cn";

export interface MoleculeFileUploadProps extends AtomFileUploadProps {
  variant?: "dropzone" | "button" | "inline";
  withPreview?: boolean;
  maxFiles?: number;
  className?: string;
  dataTestId?: string;
  importRef?: string;
}

export function FileUpload({
  variant = "dropzone",
  withPreview = false,
  maxFiles,
  className,
  dataTestId,
  importRef,
  ...rest
}: MoleculeFileUploadProps) {
  const moleculeClassName = cn(
    "molecule-file-upload",
    `molecule-file-upload--${variant}`,
    className
  );
  
  if (variant === "dropzone") {
    return (
      <div className={moleculeClassName} data-testid={dataTestId}>
        <AtomFileUpload
          {...rest}
          importRef={importRef}
        >
          <div className="molecule-file-upload-dropzone">
            <Icon type="upload" size="lg" />
            <Text>Click or drag files to upload</Text>
            {maxFiles && (
              <Text size="sm" tone="secondary">
                Max {maxFiles} files
              </Text>
            )}
          </div>
        </AtomFileUpload>
      </div>
    );
  }
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      <AtomFileUpload {...rest} importRef={importRef} />
    </div>
  );
}

