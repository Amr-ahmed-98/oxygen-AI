/**
 * ============================================
 * AtomRadio - Unified Radio API
 * ============================================
 */

import React from "react";
import { getAdapter } from "../runtime/resolveAdapter";

const AntdRadio = React.lazy(() => import("@atomic-ai/adapters-antd/Radio"));
const ShadcnRadio = React.lazy(() => import("@atomic-ai/adapters-shadcn/Radio"));

export interface AtomRadioProps {
  value: string;
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  size?: "xs" | "sm" | "md" | "lg";
  onChange?: (value: string) => void;
  className?: string;
  [key: string]: any;
}

export interface AtomRadioGroupProps {
  value?: string;
  defaultValue?: string;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  onChange?: (value: string) => void;
  className?: string;
}

export function AtomRadio(props: AtomRadioProps) {
  const adapter = getAdapter();

  if (adapter === "antd") {
    return (
      <React.Suspense fallback={<input type="radio" {...props} />}>
        <AntdRadio {...props} />
      </React.Suspense>
    );
  }

  return (
    <React.Suspense fallback={<input type="radio" {...props} />}>
      <ShadcnRadio {...props} />
    </React.Suspense>
  );
}

export function AtomRadioGroup(props: AtomRadioGroupProps) {
  const adapter = getAdapter();

  if (adapter === "antd") {
    const AntdRadioGroup = React.lazy(() => import("@atomic-ai/adapters-antd/RadioGroup"));
    return (
      <React.Suspense fallback={<div>Loading...</div>}>
        <AntdRadioGroup {...props} />
      </React.Suspense>
    );
  }

  const ShadcnRadioGroup = React.lazy(() => import("@atomic-ai/adapters-shadcn/RadioGroup"));
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ShadcnRadioGroup {...props} />
    </React.Suspense>
  );
}

