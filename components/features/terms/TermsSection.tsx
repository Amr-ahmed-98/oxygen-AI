"use client"

import { cn } from "@/lib/utils"

interface TermsData {
  title: string
  lastUpdated: string
  sections: Array<{
    id: string
    title: string
    content: string
  }>
}

interface TermsSectionProps {
  readonly data: TermsData
}

export function TermsSection({ data }: TermsSectionProps) {
  return (
    <div className="dark min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
            {data.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            Last updated: {data.lastUpdated}
          </p>
        </div>

        {/* Terms Content */}
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-invert max-w-none space-y-8">
            {data.sections.map((section) => (
              <div
                key={section.id}
                className="border-b border-sidebar-border pb-8 last:border-b-0"
              >
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {section.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-12 p-6 bg-sidebar-accent/20 rounded-lg border border-sidebar-border">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Questions About These Terms?
            </h3>
            <p className="text-muted-foreground mb-4">
              If you have any questions or concerns about these Terms of Service, please contact us.
            </p>
            <a
              href="mailto:legal@oxygenai.com"
              className="text-primary hover:text-primary/80 font-medium underline-offset-4 hover:underline cursor-pointer"
            >
              legal@oxygenai.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

