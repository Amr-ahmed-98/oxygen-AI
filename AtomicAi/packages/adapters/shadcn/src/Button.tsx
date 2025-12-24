/**
 * ============================================
 * shadcn/ui Button Adapter
 * ============================================
 * 
 * Maps AtomButton props → shadcn Button
 * Uses Tailwind classes + CVA for variants
 */

import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "./utils";
import type { AtomButtonProps } from "@atomic-ai/ui";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "bg-primary-600 text-white hover:bg-primary-700",
        outline: "border border-primary-600 bg-transparent text-primary-600 hover:bg-primary-50",
        ghost: "hover:bg-primary-50 text-primary-600",
        link: "text-primary-600 underline-offset-4 hover:underline",
      },
      tone: {
        primary: "",
        neutral: "",
        success: "",
        warning: "",
        danger: "",
      },
      size: {
        xs: "h-7 px-2 text-xs",
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
        xl: "h-14 px-8 text-xl",
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        tone: "danger",
        class: "bg-danger-600 text-white hover:bg-danger-700",
      },
      {
        variant: "outline",
        tone: "danger",
        class: "border-danger-600 text-danger-600 hover:bg-danger-50",
      },
      {
        variant: "solid",
        tone: "success",
        class: "bg-success-600 text-white hover:bg-success-700",
      },
      {
        variant: "outline",
        tone: "success",
        class: "border-success-600 text-success-600 hover:bg-success-50",
      },
    ],
    defaultVariants: {
      variant: "solid",
      tone: "primary",
      size: "md",
    },
  }
);

export function Button(props: AtomButtonProps & { asChild?: boolean }) {
  const {
    variant = "solid",
    tone = "primary",
    size = "md",
    shape,
    fullWidth,
    disabled,
    loading,
    children,
    onClick,
    type = "button",
    className = "",
    asChild,
    ...rest
  } = props;

  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      type={type}
      className={cn(
        buttonVariants({ variant, tone, size }),
        shape === "pill" && "rounded-full",
        fullWidth && "w-full",
        loading && "opacity-75 cursor-wait",
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
      {...rest}
    >
      {loading && <span className="mr-2">⏳</span>}
      {children}
    </Comp>
  );
}

