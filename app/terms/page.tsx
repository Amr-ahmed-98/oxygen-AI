"use client"

import { TermsSection } from "@/components/features/terms/TermsSection"
import { termsData } from "@/lib/terms-data"

export default function TermsPage() {
  return <TermsSection data={termsData} />
}

