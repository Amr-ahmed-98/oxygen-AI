/**
 * ============================================
 * AtomCheckbox - Unified Checkbox API
 * ============================================
 */

import React from "react";
import { getAdapter } from "../runtime/resolveAdapter";

const AntdCheckbox = React.lazy(() => import("@atomic-ai/adapters-antd/Checkbox"));
const ShadcnCheckbox = React.lazy(() => import("@atomic-ai/adapters-shadcn/Checkbox"));

export interface AtomCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: string;
  size?: "xs" | "sm" | "md" | "lg";
  onChange?: (checked: boolean) => void;
  className?: string;
  [key: string]: any;
}

export function AtomCheckbox(props: AtomCheckboxProps) {
  const adapter = getAdapter();

  if (adapter === "antd") {
    return (
      <React.Suspense fallback={<input type="checkbox" {...props} />}>
        <AntdCheckbox {...props} />
      </React.Suspense>
    );
  }

  return (
    <React.Suspense fallback={<input type="checkbox" {...props} />}>
      <ShadcnCheckbox {...props} />
    </React.Suspense>
  );
}

