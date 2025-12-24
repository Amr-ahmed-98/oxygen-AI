"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQData {
  title: string
  subtitle: string
  categories: Array<{
    id: string
    name: string
    questions: Array<{
      id: string
      question: string
      answer: string
    }>
  }>
}

interface FAQSectionProps {
  readonly data: FAQData
}

export function FAQSection({ data }: FAQSectionProps) {
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set())

  const toggleQuestion = (questionId: string) => {
    const newOpen = new Set(openQuestions)
    if (newOpen.has(questionId)) {
      newOpen.delete(questionId)
    } else {
      newOpen.add(questionId)
    }
    setOpenQuestions(newOpen)
  }

  return (
    <div className="dark min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
            {data.title}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* FAQ Categories */}
        <div className="max-w-4xl mx-auto space-y-12">
          {data.categories.map((category) => (
            <div key={category.id} className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground border-b border-sidebar-border pb-2">
                {category.name}
              </h2>
              
              <div className="space-y-3">
                {category.questions.map((item) => {
                  const isOpen = openQuestions.has(item.id)
                  return (
                    <div
                      key={item.id}
                      className="border border-sidebar-border rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleQuestion(item.id)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-sidebar-accent/30 transition-colors cursor-pointer"
                      >
                        <span className="font-semibold text-foreground pr-4">
                          {item.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-6 py-4 bg-sidebar-accent/20 border-t border-sidebar-border">
                          <p className="text-muted-foreground leading-relaxed">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Still have questions?
          </p>
          <a
            href="mailto:support@oxygenai.com"
            className="text-primary hover:text-primary/80 font-medium underline-offset-4 hover:underline cursor-pointer"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}

