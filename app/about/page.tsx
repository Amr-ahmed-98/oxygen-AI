"use client"

import { AboutSection } from "@/components/features/about/AboutSection"
import { aboutData } from "@/lib/about-data"

export default function AboutPage() {
  return <AboutSection data={aboutData} />
}

