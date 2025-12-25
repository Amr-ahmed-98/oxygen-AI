/**
 * ============================================
 * Molecule InlineEditRow - Composed from Atoms
 * ============================================
 */

import React, { useState } from "react";
import { Text } from "../atoms/Text";
import { TextField } from "../atoms/TextField";
import { IconButton } from "../atoms/IconButton";
import { Button } from "../atoms/Button";
import { cn } from "../utils/cn";

export interface MoleculeInlineEditRowProps {
  label: string;
  value: string;
  editing?: boolean;
  size?: "sm" | "md" | "lg";
  onSave?: (value: string) => void;
  onCancel?: () => void;
  onEdit?: () => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function InlineEditRow({
  label,
  value,
  editing = false,
  size = "md",
  onSave,
  onCancel,
  onEdit,
  className,
  dataTestId,
  importRef,
}: MoleculeInlineEditRowProps) {
  const [editValue, setEditValue] = useState(value);
  const [isEditing, setIsEditing] = useState(editing);
  
  const handleSave = () => {
    onSave?.(editValue);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
    onCancel?.();
  };
  
  const moleculeClassName = cn(
    "molecule-inline-edit-row",
    `molecule-inline-edit-row--${size}`,
    isEditing && "molecule-inline-edit-row--editing",
    className
  );
  
  if (isEditing) {
    return (
      <div className={moleculeClassName} data-testid={dataTestId}>
        <div className="molecule-inline-edit-row-label">
          <Text size={size}>{label}</Text>
        </div>
        <TextField
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          size={size}
          autoFocus
          importRef={importRef}
        />
        <div className="molecule-inline-edit-row-actions">
          <Button variant="ghost" size={size} onClick={handleCancel} importRef={importRef}>
            Cancel
          </Button>
          <Button variant="solid" size={size} onClick={handleSave} importRef={importRef}>
            Save
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      <div className="molecule-inline-edit-row-label">
        <Text size={size}>{label}</Text>
      </div>
      <div className="molecule-inline-edit-row-value">
        <Text size={size}>{value}</Text>
      </div>
      <IconButton
        icon="edit"
        variant="ghost"
        size={size}
        onClick={() => {
          setIsEditing(true);
          onEdit?.();
        }}
        aria-label="Edit"
        importRef={importRef}
      />
    </div>
  );
}

