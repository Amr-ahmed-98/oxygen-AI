/**
 * ============================================
 * Atomic Button - React Native Wrapper
 * ============================================
 * 
 * Unified Button API for React Native
 * Uses React Native Paper as base
 */

import React from "react";
import { Button as PaperButton } from "react-native-paper";
import { StyleSheet, ViewStyle, TextStyle } from "react-native";

export interface AtomButtonProps {
  /**
   * Visual style variant
   */
  variant?: "solid" | "outline" | "ghost" | "text";
  
  /**
   * Color tone
   */
  tone?: "primary" | "success" | "warning" | "danger" | "info" | "neutral";
  
  /**
   * Size
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  
  /**
   * Shape
   */
  shape?: "square" | "rounded" | "pill";
  
  /**
   * Density
   */
  density?: "compact" | "comfortable" | "spacious";
  
  /**
   * Loading state
   */
  loading?: boolean;
  
  /**
   * Disabled state
   */
  disabled?: boolean;
  
  /**
   * Full width
   */
  fullWidth?: boolean;
  
  /**
   * Button text
   */
  children: React.ReactNode;
  
  /**
   * On press handler
   */
  onPress?: () => void;
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
  
  /**
   * Additional style
   */
  style?: ViewStyle;
}

export function Button({
  variant = "solid",
  tone = "primary",
  size = "md",
  shape = "rounded",
  density = "comfortable",
  fullWidth = false,
  loading = false,
  disabled = false,
  children,
  onPress,
  importRef,
  style,
}: AtomButtonProps) {
  // Map variant → Paper mode
  const mode = variant === "solid" ? "contained" : variant === "outline" ? "outlined" : "text";
  
  // Map tone → Paper button color
  const buttonColor = getButtonColor(tone);
  
  // Map size → Paper button size
  const buttonSize = size === "xs" ? "small" : size === "xl" ? "large" : undefined;
  
  // Build style
  const buttonStyle = [
    styles.base,
    fullWidth && styles.fullWidth,
    shape === "pill" && styles.pill,
    style,
  ].filter(Boolean);

  return (
    <PaperButton
      mode={mode}
      buttonColor={variant === "solid" ? buttonColor : undefined}
      textColor={variant === "outline" || variant === "text" ? buttonColor : undefined}
      compact={buttonSize === "small"}
      loading={loading}
      disabled={disabled}
      onPress={onPress}
      style={buttonStyle}
    >
      {children}
    </PaperButton>
  );
}

function getButtonColor(tone: AtomButtonProps["tone"]): string {
  const colors = {
    primary: "#3b82f6",
    success: "#22c55e",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#0ea5e9",
    neutral: "#6b7280",
  };
  return colors[tone || "primary"];
}

const styles = StyleSheet.create({
  base: {
    minWidth: 80,
  },
  fullWidth: {
    width: "100%",
  },
  pill: {
    borderRadius: 9999,
  },
});

