/**
 * ============================================
 * Molecule WizardStepper - Composed from Atoms
 * ============================================
 */

import React from "react";
import { Stepper } from "./stepper";
import { cn } from "../utils/cn";

export interface MoleculeWizardStepperStep {
  title: string;
  description?: string;
  icon?: string;
  status?: "wait" | "process" | "finish" | "error";
}

export interface MoleculeWizardStepperProps {
  steps: MoleculeWizardStepperStep[];
  current?: number;
  variant?: "numbers" | "icons" | "dots";
  size?: "sm" | "md" | "lg";
  layout?: "horizontal" | "vertical";
  onStepChange?: (step: number) => void;
  importRef?: string;
  className?: string;
  dataTestId?: string;
}

export function WizardStepper({
  steps,
  current = 0,
  variant = "numbers",
  size = "md",
  layout = "horizontal",
  onStepChange,
  className,
  dataTestId,
  importRef,
}: MoleculeWizardStepperProps) {
  const moleculeClassName = cn("molecule-wizard-stepper", className);
  
  return (
    <Stepper
      items={steps}
      current={current}
      variant={variant}
      size={size}
      layout={layout}
      clickable={!!onStepChange}
      onStepChange={onStepChange}
      className={moleculeClassName}
      dataTestId={dataTestId}
      importRef={importRef}
    />
  );
}

