"use client"

import { PricingSection } from "@/components/features/pricing/PricingSection"
import { pricingData } from "@/lib/pricing-data"

export default function PricingPage() {
  return <PricingSection data={pricingData} />
}

