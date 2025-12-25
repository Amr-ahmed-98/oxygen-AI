"use client";

import { setAdapter } from "@atomic-ai/ui";
import { Hero, Pricing } from "@atomic-ai/blocks";
import { useEffect } from "react";

// Set adapter to shadcn for marketing site
useEffect(() => {
  setAdapter("shadcn");
}, []);

export default function Home() {
  return (
    <main>
      <Hero
        title="Welcome to Our Platform"
        subtitle="Build amazing products with Atomic AI"
        ctaText="Get Started"
        variant="centered"
      />
      <Pricing
        title="Choose Your Plan"
        plans={[
          {
            name: "Starter",
            price: "$9",
            period: "month",
            features: ["Feature 1", "Feature 2", "Feature 3"],
            ctaText: "Get Started",
          },
          {
            name: "Pro",
            price: "$29",
            period: "month",
            features: ["All Starter", "Feature 4", "Feature 5"],
            ctaText: "Get Started",
            popular: true,
          },
          {
            name: "Enterprise",
            price: "$99",
            period: "month",
            features: ["All Pro", "Feature 6", "Feature 7"],
            ctaText: "Contact Sales",
          },
        ]}
      />
    </main>
  );
}

