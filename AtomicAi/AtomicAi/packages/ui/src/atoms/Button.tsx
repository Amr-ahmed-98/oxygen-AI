/**
 * ============================================
 * AtomButton - Unified Button API
 * ============================================
 * 
 * Single API for Button component
 * Uses adapter pattern to render with antd or shadcn
 */

import React from "react";
import { getAdapter } from "../runtime/resolveAdapter";

// Import adapters dynamically
// Note: These will be resolved at runtime based on adapter selection
// In production, use proper package imports:
// const AntdButton = React.lazy(() => import("@atomic-ai/adapters-antd/Button"));
// const ShadcnButton = React.lazy(() => import("@atomic-ai/adapters-shadcn/Button"));
const AntdButton = React.lazy(() => import("@atomic-ai/adapters-antd/Button"));
const ShadcnButton = React.lazy(() => import("@atomic-ai/adapters-shadcn/Button"));

export interface AtomButtonProps {
  variant?: "solid" | "outline" | "ghost" | "link";
  tone?: "primary" | "neutral" | "success" | "warning" | "danger";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  shape?: "rounded" | "pill";
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  [key: string]: any; // Allow additional props
}

export function AtomButton(props: AtomButtonProps) {
  const adapter = getAdapter();

  if (adapter === "antd") {
    return (
      <React.Suspense fallback={<button {...props} />}>
        <AntdButton {...props} />
      </React.Suspense>
    );
  }

  return (
    <React.Suspense fallback={<button {...props} />}>
      <ShadcnButton {...props} />
    </React.Suspense>
  );
}

