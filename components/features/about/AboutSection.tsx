"use client"

import { Check } from "lucide-react"
import { Card } from "@/components/ui/Card"
import { cn } from "@/lib/utils"

type ValueItem = {
  readonly title: string
  readonly description: string
}

type TeamMember = {
  readonly name: string
  readonly role: string
}

type StatItem = {
  readonly label: string
  readonly value: string
}

interface AboutData {
  readonly title: string
  readonly subtitle: string
  readonly mission: {
    readonly title: string
    readonly description: string
  }
  readonly story: {
    readonly title: string
    readonly description: string
  }
  readonly values: readonly ValueItem[]
  readonly team: {
    readonly title: string
    readonly description: string
    readonly members: readonly TeamMember[]
  }
  readonly stats: readonly StatItem[]
}

interface AboutSectionProps {
  readonly data: AboutData
}

export function AboutSection({ data }: AboutSectionProps) {
  return (
    <div className="dark min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
            {data.title}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {data.stats.map((stat) => (
            <Card key={stat.label} className="p-6 text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </Card>
          ))}
        </div>

        {/* Mission */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {data.mission.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {data.mission.description}
            </p>
          </Card>
        </div>

        {/* Story */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {data.story.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {data.story.description}
            </p>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {data.values.map((value) => (
              <Card key={value.title} className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              {data.team.title}
            </h2>
            <p className="text-muted-foreground mb-6">
              {data.team.description}
            </p>
            <div className="space-y-4">
              {data.team.members.map((member) => (
                <div key={member.name} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-foreground">
                      {member.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {member.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

