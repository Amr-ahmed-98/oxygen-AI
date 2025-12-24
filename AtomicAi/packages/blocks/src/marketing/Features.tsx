/**
 * ============================================
 * Marketing Block: Features Grid
 * ============================================
 */

import React from "react";
import { AtomButton } from "@atomic-ai/ui";

export interface Feature {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

export interface FeaturesProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
}

export function Features({
  title = "Features",
  subtitle,
  features,
  columns = 3,
}: FeaturesProps) {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section className="features-section py-16">
      <div className="container mx-auto px-4">
        {title && <h2 className="text-3xl font-bold text-center mb-4">{title}</h2>}
        {subtitle && <p className="text-center text-neutral-600 mb-12">{subtitle}</p>}
        <div className={`grid ${gridCols[columns]} gap-8`}>
          {features.map((feature, index) => (
            <div key={index} className="feature-card p-6 rounded-lg border border-neutral-200">
              {feature.icon && <div className="mb-4">{feature.icon}</div>}
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-neutral-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

