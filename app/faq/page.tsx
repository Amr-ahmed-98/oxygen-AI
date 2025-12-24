"use client"

import { FAQSection } from "@/components/features/faq/FAQSection"
import { faqData } from "@/lib/faq-data"

export default function FAQPage() {
  return <FAQSection data={faqData} />
}

