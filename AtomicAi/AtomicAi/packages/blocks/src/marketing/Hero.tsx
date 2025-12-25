/**
 * ============================================
 * Marketing Block: Hero Section
 * ============================================
 */

import React from "react";
import { AtomButton } from "@atomic-ai/ui";

export interface HeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  imageUrl?: string;
  variant?: "split" | "centered" | "image";
}

export function Hero({
  title,
  subtitle,
  ctaText = "Get Started",
  ctaHref = "#",
  imageUrl,
  variant = "centered",
}: HeroProps) {
  return (
    <section className="hero-section">
      <div className="hero-container">
        {variant === "split" && imageUrl && (
          <div className="hero-image">
            <img src={imageUrl} alt={title} />
          </div>
        )}
        <div className="hero-content">
          <h1 className="hero-title">{title}</h1>
          {subtitle && <p className="hero-subtitle">{subtitle}</p>}
          {ctaText && (
            <div className="hero-cta">
              <AtomButton variant="solid" tone="primary" size="lg">
                {ctaText}
              </AtomButton>
            </div>
          )}
        </div>
        {variant === "image" && imageUrl && (
          <div className="hero-image">
            <img src={imageUrl} alt={title} />
          </div>
        )}
      </div>
    </section>
  );
}

