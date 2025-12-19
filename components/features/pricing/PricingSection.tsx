"use client"

import { useState } from "react"
import { Check, Globe, Smartphone, Monitor, Server } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { cn } from "@/lib/utils"

const formatWebFramework = (fw: string) => {
  const map: Record<string, string> = {
    html: "HTML",
    nextjs: "Next.js",
    nuxt: "Nuxt",
    react: "React",
    vue: "Vue",
    svelte: "Svelte",
    angular: "Angular",
    any: "Any"
  }
  return map[fw] || fw
}

const formatCSS = (css: string) => {
  const map: Record<string, string> = {
    tailwind: "Tailwind",
    bootstrap: "Bootstrap",
    materialui: "MUI",
    chakra: "Chakra UI",
    css: "CSS",
    any: "Any CSS"
  }
  return map[css] || css
}

const formatMobileFramework = (fw: string) => {
  const map: Record<string, string> = {
    flutter: "Flutter",
    "react-native": "React Native",
    ionic: "Ionic",
    swiftui: "SwiftUI",
    kotlin: "Kotlin",
    any: "Any"
  }
  return map[fw] || fw
}

const formatLanguage = (lang: string) => {
  const map: Record<string, string> = {
    dart: "Dart",
    typescript: "TypeScript",
    javascript: "JavaScript",
    swift: "Swift",
    kotlin: "Kotlin",
    node: "Node.js",
    python: "Python",
    go: "Go",
    rust: "Rust",
    java: "Java",
    csharp: "C#",
    any: "Any"
  }
  return map[lang] || lang
}

const formatDesktopFramework = (fw: string) => {
  const map: Record<string, string> = {
    electron: "Electron",
    tauri: "Tauri",
    qt: "Qt",
    any: "Any"
  }
  return map[fw] || fw
}

interface PricingData {
  metadata: {
    currency: string
    billingCycles: string[]
    notes?: string[]
  }
  plans: Array<{
    id: string
    name: string
    badge: string | null
    price: {
      monthly: number | null
      annual: number | null
    }
    included: {
      creditsPerMonth: number | string
      projects: number | string
      teamSeats: number | string
      exportsPerMonth?: number | string
      [key: string]: any
    }
    limits?: {
      [key: string]: any
    }
    frameworkAccess?: {
      web: {
        frameworks: string[]
        css: string[]
      }
      mobile: {
        frameworks: string[]
        nativeLanguages: string[]
      }
      desktop: {
        frameworks: string[]
      }
      backend: {
        languages: string[]
      }
    }
    features: string[]
  }>
}

interface PricingSectionProps {
  readonly data: PricingData
}

export function PricingSection({ data }: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  const handleCTAAction = (planId: string) => {
    if (planId === "enterprise") {
      console.log("Contact sales for Enterprise plan")
      // Implement contact sales logic
    } else {
      console.log(`Upgrade to ${planId}`)
      // Implement checkout logic
    }
  }

  const getPrice = (plan: PricingData["plans"][0]) => {
    if (billingCycle === "annual" && plan.price.annual !== null) {
      // Annual price is total, so divide by 12 for per month display
      return Math.round(plan.price.annual / 12)
    }
    return plan.price.monthly
  }

  const getPriceDisplay = (plan: PricingData["plans"][0]) => {
    const price = getPrice(plan)
    if (price === null) return "Custom"
    if (price === 0) return "$0"
    return `$${price}`
  }

  const getAnnualDiscount = (plan: PricingData["plans"][0]) => {
    if (plan.price.monthly === null || plan.price.annual === null) return 0
    const monthlyTotal = plan.price.monthly * 12
    const discount = ((monthlyTotal - plan.price.annual) / monthlyTotal) * 100
    return Math.round(discount)
  }

  return (
    <div className="dark min-h-screen bg-background">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">
            Pricing
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Start for free. Upgrade as you go.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={cn(
            "text-sm font-medium transition-colors",
            billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"
          )}>
            Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
            className={cn(
              "relative w-14 h-7 rounded-full transition-colors cursor-pointer",
              billingCycle === "annual" ? "bg-primary" : "bg-sidebar-accent"
            )}
            aria-label="Toggle billing cycle"
          >
            <span
              className={cn(
                "absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform",
                billingCycle === "annual" ? "translate-x-7" : "translate-x-0"
              )}
            />
          </button>
          <span className={cn(
            "text-sm font-medium transition-colors",
            billingCycle === "annual" ? "text-foreground" : "text-muted-foreground"
          )}>
            Annual
          </span>
        </div>

        {billingCycle === "annual" && data.plans[0]?.price.monthly !== null && (
          <p className="text-center text-sm text-muted-foreground mb-8">
            Save up to {getAnnualDiscount(data.plans[0])}% on annual billing
          </p>
        )}

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {data.plans.map((plan) => {
            const priceDisplay = getPriceDisplay(plan)
            const isRecommended = plan.badge === "Multi-Framework" || plan.badge === "Web"
            const isEnterprise = plan.id === "enterprise"

            return (
              <Card
                key={plan.id}
                className={cn(
                  "relative p-6 flex flex-col h-full",
                  isRecommended && "border-2 border-primary shadow-lg shadow-primary/20"
                )}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className={cn(
                    "absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-semibold",
                    isRecommended 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-sidebar-accent text-foreground"
                  )}>
                    {plan.badge}
                  </div>
                )}

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-4">
                  {isEnterprise ? (
                    <div className="text-3xl font-bold text-foreground mb-1">
                      Custom
                    </div>
                  ) : (
                    <>
                      <div className="text-3xl font-bold text-foreground mb-1">
                        {priceDisplay}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        per month
                        {billingCycle === "annual" && plan.price.annual !== null && (
                          <span className="block mt-1">
                            billed annually (${plan.price.annual}/year)
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>

                {/* Key Metrics */}
                {!isEnterprise && (
                  <div className="mb-6 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Credits</span>
                      <span className="text-foreground font-medium">
                        {typeof plan.included.creditsPerMonth === "number" 
                          ? plan.included.creditsPerMonth.toLocaleString() 
                          : plan.included.creditsPerMonth}
                        {typeof plan.included.creditsPerMonth === "number" && " / month"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Projects</span>
                      <span className="text-foreground font-medium">
                        {plan.included.projects === "custom" || plan.included.projects === "Unlimited"
                          ? "Unlimited" 
                          : plan.included.projects}
                      </span>
                    </div>
                    {plan.included.teamSeats && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Team Seats</span>
                        <span className="text-foreground font-medium">
                          {plan.included.teamSeats === "custom" 
                            ? "Custom" 
                            : plan.included.teamSeats}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* Framework & Language Access */}
                {plan.frameworkAccess && (
                  <div className="mb-6 space-y-3">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Code Available
                    </h4>
                    <div className="space-y-2.5">
                      {/* Web Frameworks */}
                      {plan.frameworkAccess.web.frameworks.length > 0 && (
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Globe className="w-3.5 h-3.5" />
                            <span className="font-medium">Web</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pl-5">
                            {plan.frameworkAccess.web.frameworks.map((fw) => (
                              <span
                                key={fw}
                                className="px-2 py-0.5 bg-sidebar-accent/50 text-foreground rounded text-xs font-medium"
                              >
                                {formatWebFramework(fw)}
                              </span>
                            ))}
                          </div>
                          {plan.frameworkAccess.web.css.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pl-5">
                              {plan.frameworkAccess.web.css.map((css) => (
                                <span
                                  key={css}
                                  className="px-2 py-0.5 bg-primary/20 text-primary rounded text-xs font-medium"
                                >
                                  {formatCSS(css)}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Mobile Frameworks */}
                      {plan.frameworkAccess.mobile.frameworks.length > 0 && (
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Smartphone className="w-3.5 h-3.5" />
                            <span className="font-medium">Mobile</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pl-5">
                            {plan.frameworkAccess.mobile.frameworks.map((fw) => (
                              <span
                                key={fw}
                                className="px-2 py-0.5 bg-sidebar-accent/50 text-foreground rounded text-xs font-medium"
                              >
                                {formatMobileFramework(fw)}
                              </span>
                            ))}
                          </div>
                          {plan.frameworkAccess.mobile.nativeLanguages.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pl-5">
                              {plan.frameworkAccess.mobile.nativeLanguages.map((lang) => (
                                <span
                                  key={lang}
                                  className="px-2 py-0.5 bg-secondary/30 text-secondary-foreground rounded text-xs font-medium"
                                >
                                  {formatLanguage(lang)}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Desktop Frameworks */}
                      {plan.frameworkAccess.desktop.frameworks.length > 0 && (
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Monitor className="w-3.5 h-3.5" />
                            <span className="font-medium">Desktop</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pl-5">
                            {plan.frameworkAccess.desktop.frameworks.map((fw) => (
                              <span
                                key={fw}
                                className="px-2 py-0.5 bg-sidebar-accent/50 text-foreground rounded text-xs font-medium"
                              >
                                {formatDesktopFramework(fw)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Backend Languages */}
                      {plan.frameworkAccess.backend.languages.length > 0 && (
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Server className="w-3.5 h-3.5" />
                            <span className="font-medium">Backend</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5 pl-5">
                            {plan.frameworkAccess.backend.languages.map((lang) => (
                              <span
                                key={lang}
                                className="px-2 py-0.5 bg-secondary/30 text-secondary-foreground rounded text-xs font-medium"
                              >
                                {formatLanguage(lang)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Features */}
                <div className="flex-1 space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  onClick={() => handleCTAAction(plan.id)}
                  className={cn(
                    "w-full",
                    isRecommended
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-sidebar-accent text-primary-foreground hover:bg-sidebar-accent/80"
                  )}
                >
                  {isEnterprise ? "Contact Sales" : `Get ${plan.name}`}
                </Button>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

