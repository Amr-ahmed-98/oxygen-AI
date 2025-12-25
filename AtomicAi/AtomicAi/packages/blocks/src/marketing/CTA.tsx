/**
 * ============================================
 * Marketing Block: Call to Action
 * ============================================
 */

import React from "react";
import { AtomButton } from "@atomic-ai/ui";

export interface CTAProps {
  title: string;
  subtitle?: string;
  primaryAction: { text: string; href?: string; onClick?: () => void };
  secondaryAction?: { text: string; href?: string; onClick?: () => void };
  variant?: "centered" | "split";
}

export function CTA({
  title,
  subtitle,
  primaryAction,
  secondaryAction,
  variant = "centered",
}: CTAProps) {
  return (
    <section className="cta-section py-16 bg-primary-600 text-white">
      <div className="container mx-auto px-4">
        <div className={`flex flex-col ${variant === "split" ? "md:flex-row md:items-center md:justify-between" : "items-center text-center"} gap-6`}>
          <div>
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            {subtitle && <p className="text-primary-100">{subtitle}</p>}
          </div>
          <div className="flex gap-4">
            <AtomButton
              variant="solid"
              tone="neutral"
              size="lg"
              onClick={primaryAction.onClick}
            >
              {primaryAction.text}
            </AtomButton>
            {secondaryAction && (
              <AtomButton
                variant="outline"
                tone="neutral"
                size="lg"
                onClick={secondaryAction.onClick}
              >
                {secondaryAction.text}
              </AtomButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

