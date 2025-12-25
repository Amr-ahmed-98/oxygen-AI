/**
 * ============================================
 * Molecule CommentComposer - Composed from Atoms
 * ============================================
 */

import React, { useState } from "react";
import { Textarea } from "../atoms/Textarea";
import { Button } from "../atoms/Button";
import { IconButton } from "../atoms/IconButton";
import { Avatar } from "../atoms/Avatar";
import { cn } from "../utils/cn";

export interface MoleculeCommentComposerProps {
  avatar?: string;
  placeholder?: string;
  value?: string;
  onSubmit?: (comment: string) => void;
  onCancel?: () => void;
  size?: "sm" | "md" | "lg";
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function CommentComposer({
  avatar,
  placeholder = "Write a comment...",
  value: initialValue = "",
  onSubmit,
  onCancel,
  size = "md",
  className,
  dataTestId,
  importRef,
}: MoleculeCommentComposerProps) {
  const [value, setValue] = useState(initialValue);
  
  const moleculeClassName = cn("molecule-comment-composer", className);
  
  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit?.(value);
      setValue("");
    }
  };
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      {avatar && <Avatar src={avatar} size={size} className="molecule-comment-composer-avatar" importRef={importRef} />}
      <div className="molecule-comment-composer-input">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          size={size}
          rows={3}
          importRef={importRef}
        />
        <div className="molecule-comment-composer-actions">
          {onCancel && (
            <Button variant="ghost" size={size} onClick={onCancel} importRef={importRef}>
              Cancel
            </Button>
          )}
          <Button variant="solid" size={size} onClick={handleSubmit} disabled={!value.trim()} importRef={importRef}>
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}

