/**
 * ============================================
 * Molecule ConfirmDialog - Composed from Atoms
 * ============================================
 */

import React, { useState } from "react";
import { Modal } from "../atoms/Modal";
import { Heading } from "../atoms/Heading";
import { Text } from "../atoms/Text";
import { Button } from "../atoms/Button";
import { Icon } from "../atoms/Icon";
import { Checkbox } from "../atoms/Checkbox";
import { TextField } from "../atoms/TextField";
import { cn } from "../utils/cn";

export interface MoleculeConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  variant?: "danger" | "neutral" | "success" | "warning";
  size?: "sm" | "md" | "lg";
  layout?: "stack" | "split" | "centered";
  withIcon?: boolean;
  withChecklist?: boolean;
  checklistItems?: string[];
  confirmStyle?: "solid" | "soft" | "outline";
  requiresTyping?: boolean;
  confirmText?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function ConfirmDialog({
  open,
  title,
  description,
  variant = "neutral",
  size = "md",
  layout = "stack",
  withIcon = true,
  withChecklist = false,
  checklistItems = [],
  confirmStyle = "solid",
  requiresTyping = false,
  confirmText,
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  onConfirm,
  onCancel,
  className,
  dataTestId,
  importRef,
}: MoleculeConfirmDialogProps) {
  const [typedText, setTypedText] = useState("");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  const iconMap: Record<string, string> = {
    danger: "x-circle",
    success: "check-circle",
    warning: "exclamation-triangle",
    neutral: "info-circle",
  };
  
  const iconColor = variant === "danger" ? "danger" : variant === "success" ? "success" : variant === "warning" ? "warning" : "info";
  const canConfirm = requiresTyping ? typedText === confirmText : !withChecklist || checklistItems.every(item => checkedItems[item]);
  
  const moleculeClassName = cn(
    "molecule-confirm-dialog",
    `molecule-confirm-dialog--${variant}`,
    `molecule-confirm-dialog--${size}`,
    `molecule-confirm-dialog--${layout}`,
    className
  );
  
  return (
    <Modal
      open={open}
      onCancel={onCancel}
      footer={null}
      className={moleculeClassName}
      data-testid={dataTestId}
      importRef={importRef}
    >
      <div className="molecule-confirm-dialog-content">
        {withIcon && (
          <div className="molecule-confirm-dialog-icon">
            <Icon type={iconMap[variant] || "info-circle"} size={size} />
          </div>
        )}
        
        <div className="molecule-confirm-dialog-text">
          <Heading size={size}>{title}</Heading>
          {description && (
            <Text size={size} tone="secondary">
              {description}
            </Text>
          )}
        </div>
        
        {withChecklist && checklistItems.length > 0 && (
          <div className="molecule-confirm-dialog-checklist">
            {checklistItems.map((item) => (
              <Checkbox
                key={item}
                checked={checkedItems[item] || false}
                onChange={(e) => setCheckedItems({ ...checkedItems, [item]: e.target.checked })}
              >
                {item}
              </Checkbox>
            ))}
          </div>
        )}
        
        {requiresTyping && confirmText && (
          <div className="molecule-confirm-dialog-typing">
            <Text size={size}>
              Type <strong>{confirmText}</strong> to confirm:
            </Text>
            <TextField
              value={typedText}
              onChange={(e) => setTypedText(e.target.value)}
              size={size}
              placeholder={confirmText}
            />
          </div>
        )}
        
        <div className="molecule-confirm-dialog-actions">
          <Button variant="ghost" size={size} onClick={onCancel} importRef={importRef}>
            {cancelLabel}
          </Button>
          <Button
            variant={confirmStyle}
            tone={variant === "danger" ? "danger" : variant === "success" ? "success" : "primary"}
            size={size}
            onClick={onConfirm}
            disabled={!canConfirm}
            importRef={importRef}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

