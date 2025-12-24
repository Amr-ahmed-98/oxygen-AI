/**
 * ============================================
 * AtomTextField - Unified TextField API
 * ============================================
 */

import React from "react";
import { getAdapter } from "../runtime/resolveAdapter";

const AntdTextField = React.lazy(() => import("@atomic-ai/adapters-antd/TextField"));
const ShadcnTextField = React.lazy(() => import("@atomic-ai/adapters-shadcn/TextField"));

export interface AtomTextFieldProps {
  variant?: "outline" | "filled" | "underline";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  helperText?: string;
  fullWidth?: boolean;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  onChange?: (value: string) => void;
  onBlur?: () => void;
  className?: string;
  [key: string]: any;
}

export function AtomTextField(props: AtomTextFieldProps) {
  const adapter = getAdapter();

  if (adapter === "antd") {
    return (
      <React.Suspense fallback={<input {...props} />}>
        <AntdTextField {...props} />
      </React.Suspense>
    );
  }

  return (
    <React.Suspense fallback={<input {...props} />}>
      <ShadcnTextField {...props} />
    </React.Suspense>
  );
}

