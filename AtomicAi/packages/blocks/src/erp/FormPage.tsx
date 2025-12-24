/**
 * ============================================
 * ERP Block: Form Edit Page
 * ============================================
 */

import React from "react";
import { AtomButton } from "@atomic-ai/ui";

export interface FormPageProps {
  title: string;
  mode?: "create" | "edit";
  onSubmit?: () => void;
  onCancel?: () => void;
  children: React.ReactNode;
}

export function FormPage({
  title,
  mode = "create",
  onSubmit,
  onCancel,
  children,
}: FormPageProps) {
  return (
    <div className="form-page">
      <div className="form-page-header">
        <h1 className="form-page-title">{title}</h1>
      </div>
      <div className="form-page-content">
        <form onSubmit={(e) => { e.preventDefault(); onSubmit?.(); }}>
          {children}
          <div className="form-page-actions">
            <AtomButton type="submit" variant="solid" tone="primary">
              {mode === "create" ? "Create" : "Save"}
            </AtomButton>
            {onCancel && (
              <AtomButton type="button" variant="outline" tone="neutral" onClick={onCancel}>
                Cancel
              </AtomButton>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

