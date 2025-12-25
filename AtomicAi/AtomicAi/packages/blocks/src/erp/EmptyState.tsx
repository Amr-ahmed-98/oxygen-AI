/**
 * ============================================
 * ERP Block: Empty State
 * ============================================
 */

import React from "react";
import { AtomButton } from "@atomic-ai/ui";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <div className="empty-state flex flex-col items-center justify-center py-16 px-4">
      {icon && <div className="mb-4 text-6xl text-neutral-300">{icon}</div>}
      <h3 className="text-xl font-semibold text-neutral-700 mb-2">{title}</h3>
      {description && <p className="text-neutral-500 text-center max-w-md mb-6">{description}</p>}
      {action && (
        <AtomButton variant="solid" tone="primary" onClick={action.onClick}>
          {action.label}
        </AtomButton>
      )}
    </div>
  );
}

