/**
 * ============================================
 * ERP Block: Bulk Actions
 * ============================================
 */

import React from "react";
import { AtomButton } from "@atomic-ai/ui";

export interface BulkAction {
  label: string;
  action: () => void;
  variant?: "solid" | "outline" | "ghost";
  tone?: "primary" | "danger" | "neutral";
}

export interface BulkActionsProps {
  selectedCount: number;
  actions: BulkAction[];
  onClear?: () => void;
}

export function BulkActions({ selectedCount, actions, onClear }: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="bulk-actions p-4 bg-primary-50 border-b border-primary-200">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-primary-900">
          {selectedCount} item{selectedCount > 1 ? "s" : ""} selected
        </span>
        <div className="flex gap-2">
          {actions.map((action, index) => (
            <AtomButton
              key={index}
              variant={action.variant || "outline"}
              tone={action.tone || "primary"}
              size="sm"
              onClick={action.action}
            >
              {action.label}
            </AtomButton>
          ))}
          {onClear && (
            <AtomButton variant="ghost" tone="neutral" size="sm" onClick={onClear}>
              Clear
            </AtomButton>
          )}
        </div>
      </div>
    </div>
  );
}

