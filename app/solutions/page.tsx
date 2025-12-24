"use client"

import { SolutionsSection } from "@/components/features/solutions/SolutionsSection"
import { solutionsData } from "@/lib/solutions-data"

export default function SolutionsPage() {
  return <SolutionsSection data={solutionsData} />
}

