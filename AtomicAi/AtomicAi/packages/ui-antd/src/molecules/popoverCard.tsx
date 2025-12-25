/**
 * ============================================
 * Molecule PopoverCard - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Popover } from "../atoms/Popover";
import { cn } from "../utils/cn";

export interface MoleculePopoverCardProps {
  content: React.ReactNode;
  title?: string;
  trigger?: "hover" | "click" | "focus";
  children: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function PopoverCard({
  content,
  title,
  trigger = "hover",
  children,
  placement = "bottom",
  className,
  dataTestId,
  importRef,
}: MoleculePopoverCardProps) {
  const moleculeClassName = cn("molecule-popover-card", className);
  
  return (
    <Popover
      content={content}
      title={title}
      trigger={trigger}
      placement={placement}
      className={moleculeClassName}
      data-testid={dataTestId}
      importRef={importRef}
    >
      {children}
    </Popover>
  );
}

