/**
 * ============================================
 * Atomic TextField - React Native Wrapper
 * ============================================
 */

import React from "react";
import { TextInput } from "react-native-paper";
import { StyleSheet, ViewStyle } from "react-native";

export interface AtomTextFieldProps {
  /**
   * Size
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  
  /**
   * Variant
   */
  variant?: "outline" | "filled" | "underline";
  
  /**
   * Tone
   */
  tone?: "primary" | "neutral" | "error" | "success";
  
  /**
   * Density
   */
  density?: "compact" | "comfortable" | "spacious";
  
  /**
   * Placeholder
   */
  placeholder?: string;
  
  /**
   * Value
   */
  value?: string;
  
  /**
   * On change handler
   */
  onChangeText?: (text: string) => void;
  
  /**
   * Disabled
   */
  disabled?: boolean;
  
  /**
   * Import reference for Builder
   */
  importRef?: string;
  
  /**
   * Additional style
   */
  style?: ViewStyle;
}

export function TextField({
  size = "md",
  variant = "outline",
  tone = "neutral",
  density = "comfortable",
  placeholder,
  value,
  onChangeText,
  disabled,
  importRef,
  style,
}: AtomTextFieldProps) {
  // Map variant → Paper mode
  const mode = variant === "outline" ? "outlined" : variant === "filled" ? "flat" : "flat";
  
  // Map size → Paper density
  const dense = density === "compact";
  
  return (
    <TextInput
      mode={mode}
      dense={dense}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      disabled={disabled}
      style={style}
    />
  );
}

