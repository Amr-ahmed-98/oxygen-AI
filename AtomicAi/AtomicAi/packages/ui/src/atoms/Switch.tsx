/**
 * ============================================
 * AtomSwitch - Unified Switch API
 * ============================================
 */

import React from "react";
import { getAdapter } from "../runtime/resolveAdapter";

const AntdSwitch = React.lazy(() => import("@atomic-ai/adapters-antd/Switch"));
const ShadcnSwitch = React.lazy(() => import("@atomic-ai/adapters-shadcn/Switch"));

export interface AtomSwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  label?: string;
  size?: "xs" | "sm" | "md" | "lg";
  onChange?: (checked: boolean) => void;
  className?: string;
  [key: string]: any;
}

export function AtomSwitch(props: AtomSwitchProps) {
  const adapter = getAdapter();

  if (adapter === "antd") {
    return (
      <React.Suspense fallback={<input type="checkbox" role="switch" {...props} />}>
        <AntdSwitch {...props} />
      </React.Suspense>
    );
  }

  return (
    <React.Suspense fallback={<input type="checkbox" role="switch" {...props} />}>
      <ShadcnSwitch {...props} />
    </React.Suspense>
  );
}

