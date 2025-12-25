/**
 * ============================================
 * Atomic Modal - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Modal as AntModal, ModalProps as AntModalProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomModalProps extends AntModalProps {
  /**
   * Variant
   */
  variant?: "default" | "centered" | "fullscreen";
  
  /**
   * Size
   */
  size?: "sm" | "md" | "lg" | "xl" | "full";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function Modal({
  variant = "default",
  size = "md",
  className,
  wrapClassName,
  importRef,
  ...rest
}: AtomModalProps) {
  const atomClassName = cn(
    "atom-modal",
    `atom-modal--${variant}`,
    `atom-modal--${size}`,
    className
  );

  const atomWrapClassName = cn(
    "atom-modal-wrap",
    `atom-modal-wrap--${variant}`,
    wrapClassName
  );

  // Map size to width
  const widthMap: Record<string, number | string> = {
    sm: 400,
    md: 520,
    lg: 800,
    xl: 1200,
    full: "100%",
  };

  return (
    <AntModal
      className={atomClassName}
      wrapClassName={atomWrapClassName}
      width={widthMap[size] || widthMap.md}
      centered={variant === "centered"}
      {...rest}
    />
  );
}

