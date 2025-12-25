/**
 * ============================================
 * Atomic FileUpload - Ant Design Wrapper
 * ============================================
 */

import React from "react";
import { Upload, UploadProps } from "antd";
import { cn } from "../utils/cn";

export interface AtomFileUploadProps extends UploadProps {
  /**
   * Variant
   */
  variant?: "button" | "drag" | "picture" | "picture-card";
  
  /**
   * Size
   */
  size?: "sm" | "md" | "lg";
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
}

export function FileUpload({
  variant = "button",
  size = "md",
  className,
  importRef,
  ...rest
}: AtomFileUploadProps) {
  const atomClassName = cn(
    "atom-file-upload",
    `atom-file-upload--${variant}`,
    `atom-file-upload--${size}`,
    className
  );

  const listType: UploadProps["listType"] = 
    variant === "picture" ? "picture" :
    variant === "picture-card" ? "picture-card" :
    "text";

  const dragger = variant === "drag";

  if (dragger) {
    const { Dragger } = Upload;
    return (
      <Dragger
        className={atomClassName}
        {...rest}
      />
    );
  }

  return (
    <Upload
      listType={listType}
      className={atomClassName}
      {...rest}
    />
  );
}

