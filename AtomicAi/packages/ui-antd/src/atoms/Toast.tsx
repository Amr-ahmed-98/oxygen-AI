/**
 * ============================================
 * Atomic Toast - Ant Design Wrapper
 * ============================================
 * 
 * Uses Ant Design message/notification API
 */

import { message, notification } from "antd";
import type { MessageArgsProps, NotificationArgsProps } from "antd";

export interface AtomToastProps {
  /**
   * Toast type
   */
  type?: "success" | "info" | "warning" | "error";
  
  /**
   * Toast content
   */
  content: string;
  
  /**
   * Duration in seconds
   */
  duration?: number;
  
  /**
   * Variant (message or notification)
   */
  variant?: "message" | "notification";
  
  /**
   * Title (for notification variant)
   */
  title?: string;
}

/**
 * Show toast message
 */
export function showToast({
  type = "info",
  content,
  duration = 3,
  variant = "message",
  title,
}: AtomToastProps) {
  if (variant === "notification") {
    notification[type]({
      message: title || content,
      description: title ? content : undefined,
      duration,
    });
  } else {
    message[type](content, duration);
  }
}

/**
 * Toast helper functions
 */
export const Toast = {
  success: (content: string, options?: Partial<AtomToastProps>) =>
    showToast({ type: "success", content, ...options }),
  info: (content: string, options?: Partial<AtomToastProps>) =>
    showToast({ type: "info", content, ...options }),
  warning: (content: string, options?: Partial<AtomToastProps>) =>
    showToast({ type: "warning", content, ...options }),
  error: (content: string, options?: Partial<AtomToastProps>) =>
    showToast({ type: "error", content, ...options }),
};

