/**
 * ============================================
 * AtomSelect - Unified Select API
 * ============================================
 */

import React from "react";
import { getAdapter } from "../runtime/resolveAdapter";

const AntdSelect = React.lazy(() => import("@atomic-ai/adapters-antd/Select"));
const ShadcnSelect = React.lazy(() => import("@atomic-ai/adapters-shadcn/Select"));

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface AtomSelectProps {
  variant?: "outline" | "filled";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  options: SelectOption[];
  disabled?: boolean;
  error?: boolean;
  label?: string;
  helperText?: string;
  fullWidth?: boolean;
  multiple?: boolean;
  onChange?: (value: string | string[]) => void;
  onBlur?: () => void;
  className?: string;
  [key: string]: any;
}

export function AtomSelect(props: AtomSelectProps) {
  const adapter = getAdapter();

  if (adapter === "antd") {
    return (
      <React.Suspense fallback={<select {...props} />}>
        <AntdSelect {...props} />
      </React.Suspense>
    );
  }

  return (
    <React.Suspense fallback={<select {...props} />}>
      <ShadcnSelect {...props} />
    </React.Suspense>
  );
}

