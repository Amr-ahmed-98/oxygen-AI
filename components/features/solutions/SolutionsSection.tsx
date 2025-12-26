"use client"

import { useState } from "react"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Solution {
  readonly id: string
  readonly name: string
  readonly title: string
  readonly description: string
  readonly icon: string
  readonly category: string
  readonly audience: string
  readonly modules: readonly string[]
  readonly features: readonly string[]
  readonly integrations: readonly string[]
}

interface SolutionsData {
  readonly solutions: readonly Solution[]
}

interface SolutionsSectionProps {
  readonly data: SolutionsData
}

export function SolutionsSection({ data }: SolutionsSectionProps) {
  const categories = Array.from(new Set(data.solutions.map(s => s.category))).sort()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredSolutions = selectedCategory
    ? data.solutions.filter(s => s.category === selectedCategory)
    : data.solutions

  return (
    <div className="dark min-h-screen bg-background">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
            Solutions
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Pre-built solutions for every business need. Choose a solution and start building instantly.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
              selectedCategory === null
                ? "bg-primary text-primary-foreground"
                : "bg-sidebar-accent/50 text-foreground hover:bg-sidebar-accent"
            )}
          >
            All Solutions ({data.solutions.length})
          </button>
          {categories.map((category) => {
            const count = data.solutions.filter(s => s.category === category).length
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer",
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-sidebar-accent/50 text-foreground hover:bg-sidebar-accent"
                )}
              >
                {category} ({count})
              </button>
            )
          })}
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filteredSolutions.map((solution) => (
            <Card
              key={solution.id}
              className="relative p-6 flex flex-col h-full group hover:border-primary/50 transition-all cursor-pointer"
            >
              {/* Icon & Category */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{solution.icon}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-foreground">
                        {solution.name}
                      </h3>
                      <span className="text-xs px-2 py-0.5 bg-sidebar-accent/50 text-muted-foreground rounded">
                        {solution.audience}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {solution.category}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>

              {/* Title */}
              <h4 className="text-lg font-semibold text-foreground mb-2">
                {solution.title}
              </h4>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-6 flex-1">
                {solution.description}
              </p>

              {/* Key Modules */}
              <div className="mb-4">
                <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Key Modules
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {solution.modules.slice(0, 3).map((module) => (
                    <span
                      key={module}
                      className="px-2 py-1 bg-sidebar-accent/30 text-foreground rounded text-xs font-medium"
                    >
                      {module}
                    </span>
                  ))}
                  {solution.modules.length > 3 && (
                    <span className="px-2 py-1 bg-sidebar-accent/30 text-muted-foreground rounded text-xs">
                      +{solution.modules.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6 space-y-2">
                {solution.features.slice(0, 3).map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-xs text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                asChild
                className="w-full bg-sidebar-accent text-foreground hover:bg-sidebar-accent/80"
              >
                <Link href={`/solutions/${solution.id}`}>
                  Explore {solution.name}
                </Link>
              </Button>
            </Card>
          ))}
        </div>

        {/* Categories Filter (Optional - can be added later) */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            All solutions include: Authentication, RBAC, Notifications, Settings, and more
          </p>
        </div>
      </div>
    </div>
  )
}

