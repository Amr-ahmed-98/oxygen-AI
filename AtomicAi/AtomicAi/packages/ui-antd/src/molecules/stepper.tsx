/**
 * ============================================
 * Molecule Stepper - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Stepper as AtomStepper, type AtomStepperProps } from "../atoms/Stepper";
import { Icon } from "../atoms/Icon";
import { cn } from "../utils/cn";

export interface MoleculeStepperStep {
  title: string;
  description?: string;
  icon?: string;
  status?: "wait" | "process" | "finish" | "error";
}

export interface MoleculeStepperProps {
  items: MoleculeStepperStep[];
  current?: number;
  variant?: "numbers" | "icons" | "dots" | "minimal";
  tone?: "neutral" | "primary" | "success";
  size?: "sm" | "md" | "lg";
  layout?: "horizontal" | "vertical";
  clickable?: boolean;
  withDescriptions?: boolean;
  compact?: boolean;
  onStepChange?: (step: number) => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function Stepper({
  items,
  current = 0,
  variant = "numbers",
  tone = "neutral",
  size = "md",
  layout = "horizontal",
  clickable = false,
  withDescriptions = true,
  compact = false,
  onStepChange,
  className,
  dataTestId,
  importRef,
}: MoleculeStepperProps) {
  const steps: AtomStepperProps["items"] = items.map((item, index) => {
    let icon: React.ReactNode = undefined;
    
    if (variant === "icons" && item.icon) {
      icon = <Icon type={item.icon} size={size} />;
    } else if (variant === "dots") {
      icon = <div className="molecule-stepper-dot" />;
    }
    
    return {
      title: item.title,
      description: withDescriptions && !compact ? item.description : undefined,
      icon,
      status: item.status,
      onClick: clickable && onStepChange ? () => onStepChange(index) : undefined,
    };
  });
  
  const moleculeClassName = cn(
    "molecule-stepper",
    `molecule-stepper--${variant}`,
    `molecule-stepper--${tone}`,
    `molecule-stepper--${size}`,
    `molecule-stepper--${layout}`,
    clickable && "molecule-stepper--clickable",
    compact && "molecule-stepper--compact",
    className
  );
  
  return (
    <AtomStepper
      current={current}
      items={steps}
      direction={layout === "vertical" ? "vertical" : "horizontal"}
      size={size === "sm" ? "small" : undefined}
      className={moleculeClassName}
      data-testid={dataTestId}
      importRef={importRef}
    />
  );
}

