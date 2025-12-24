/**
 * ============================================
 * Marketing Block: Pricing Section
 * ============================================
 */

import React from "react";
import { AtomButton } from "@atomic-ai/ui";

export interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  features: string[];
  ctaText: string;
  popular?: boolean;
}

export interface PricingProps {
  title?: string;
  subtitle?: string;
  plans: PricingPlan[];
}

export function Pricing({ title = "Pricing", subtitle, plans }: PricingProps) {
  return (
    <section className="pricing-section">
      <div className="pricing-container">
        {title && <h2 className="pricing-title">{title}</h2>}
        {subtitle && <p className="pricing-subtitle">{subtitle}</p>}
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card ${plan.popular ? "pricing-card--popular" : ""}`}
            >
              {plan.popular && <div className="pricing-badge">Popular</div>}
              <h3 className="pricing-plan-name">{plan.name}</h3>
              <div className="pricing-price">
                <span className="pricing-amount">{plan.price}</span>
                {plan.period && <span className="pricing-period">/{plan.period}</span>}
              </div>
              <ul className="pricing-features">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <AtomButton
                variant={plan.popular ? "solid" : "outline"}
                tone="primary"
                size="lg"
                fullWidth
              >
                {plan.ctaText}
              </AtomButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

