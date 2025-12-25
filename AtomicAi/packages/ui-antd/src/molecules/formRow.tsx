/**
 * ============================================
 * Molecule FormRow - Composed from Atoms
 * ============================================
 */

import React from "react";
import { FormField } from "./formField";
import { cn } from "../utils/cn";

export interface MoleculeFormRowProps {
  fields: Array<{
    label?: string;
    controlType?: "text" | "textarea" | "select" | "date" | "time" | "datetime" | "number" | "phone" | "currency" | "password" | "search";
    required?: boolean;
    error?: string;
    controlProps?: any;
  }>;
  layout?: "horizontal" | "vertical" | "grid";
  columns?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  dataTestId?: string;
  importRef?: string;
}

export function FormRow({
  fields,
  layout = "horizontal",
  columns = 2,
  size = "md",
  className,
  dataTestId,
  importRef,
}: MoleculeFormRowProps) {
  const moleculeClassName = cn(
    "molecule-form-row",
    `molecule-form-row--${layout}`,
    layout === "grid" && `molecule-form-row--columns-${columns}`,
    className
  );
  
  return (
    <div className={moleculeClassName} data-testid={dataTestId}>
      {fields.map((field, index) => (
        <FormField
          key={index}
          label={field.label}
          controlType={field.controlType}
          required={field.required}
          error={field.error}
          size={size}
          controlProps={field.controlProps}
          importRef={importRef}
        />
      ))}
    </div>
  );
}

