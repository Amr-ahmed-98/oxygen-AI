/**
 * ============================================
 * ERP Block: Table List Page
 * ============================================
 */

import React from "react";
import { AtomButton } from "@atomic-ai/ui";

export interface TablePageProps {
  title: string;
  addButtonText?: string;
  onAdd?: () => void;
  filters?: React.ReactNode;
  children: React.ReactNode;
}

export function TablePage({
  title,
  addButtonText = "Add New",
  onAdd,
  filters,
  children,
}: TablePageProps) {
  return (
    <div className="table-page">
      <div className="table-page-header">
        <h1 className="table-page-title">{title}</h1>
        {onAdd && (
          <AtomButton variant="solid" tone="primary" onClick={onAdd}>
            {addButtonText}
          </AtomButton>
        )}
      </div>
      {filters && <div className="table-page-filters">{filters}</div>}
      <div className="table-page-content">{children}</div>
    </div>
  );
}

