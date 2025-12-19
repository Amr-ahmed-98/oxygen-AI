export const pricingData = {
  metadata: {
    product: "Oxygen UI Factory",
    ideaTagline: "DNA-driven UI generator for websites, apps, and design systems",
    version: "2.0.0",
    currency: "USD",
    billingCycles: ["monthly", "annual"],
    notes: [
      "Plans target a DNA+Dataset workflow: choose a theme, pick components, then export clean bundles (tokens + components).",
      "Credits are consumed by generation jobs (component/section/page/app). Local models can reduce cloud credit usage.",
      "Framework availability expands per plan to keep the early UX simple and progressively unlock more outputs."
    ]
  },
  plans: [
    {
      id: "starter",
      name: "Starter",
      badge: "Prototype",
      price: {
        monthly: 19,
        annual: 190
      },
      included: {
        creditsPerMonth: 200,
        projects: 5,
        teamSeats: 1,
        exportsPerMonth: 60,
        customDomains: 0,
        storageGB: 2,
        computeMinutes: 0
      },
      limits: {
        maxDatasetEntries: 50000,
        maxComponentsPerExport: 80,
        maxPagesPerProject: 8
      },
      frameworkAccess: {
        web: {
          frameworks: ["html", "react", "vue"],
          css: ["tailwind", "css"]
        },
        mobile: {
          frameworks: [],
          nativeLanguages: []
        },
        desktop: {
          frameworks: []
        },
        backend: {
          languages: ["node", "python"]
        }
      },
      features: [
        "5 DNA themes + Basic components",
        "Token export (JSON)",
        "Basic accessibility checks"
      ]
    },
    {
      id: "builder",
      name: "Builder",
      badge: "Web",
      price: {
        monthly: 39,
        annual: 390
      },
      included: {
        creditsPerMonth: 650,
        projects: 20,
        teamSeats: 1,
        exportsPerMonth: 250,
        customDomains: 3,
        storageGB: 10,
        computeMinutes: 60
      },
      limits: {
        maxDatasetEntries: 250000,
        maxComponentsPerExport: 300,
        maxPagesPerProject: 40
      },
      frameworkAccess: {
        web: {
          frameworks: ["nextjs", "react", "vue", "svelte", "angular"],
          css: ["tailwind", "bootstrap", "css"]
        },
        mobile: {
          frameworks: ["flutter", "react-native"],
          nativeLanguages: ["dart", "javascript"]
        },
        desktop: {
          frameworks: ["electron"]
        },
        backend: {
          languages: ["node", "python", "go"]
        }
      },
      features: [
        "All Starter features",
        "Full Design System Kit",
        "Page composer + Responsive generator",
        "Multi-framework exports (React, Vue, Angular, Flutter)"
      ]
    },
    {
      id: "studio",
      name: "Studio",
      badge: "Multi-Framework",
      price: {
        monthly: 79,
        annual: 790
      },
      included: {
        creditsPerMonth: 1500,
        projects: 60,
        teamSeats: 3,
        exportsPerMonth: 600,
        customDomains: 10,
        storageGB: 30,
        computeMinutes: 240
      },
      limits: {
        maxDatasetEntries: 750000,
        maxComponentsPerExport: 1200,
        maxPagesPerProject: 200
      },
      frameworkAccess: {
        web: {
          frameworks: ["nextjs", "nuxt", "react", "vue", "svelte", "angular"],
          css: ["tailwind", "bootstrap", "materialui", "chakra", "css"]
        },
        mobile: {
          frameworks: ["flutter", "react-native", "ionic"],
          nativeLanguages: ["dart", "typescript", "javascript"]
        },
        desktop: {
          frameworks: ["electron", "tauri"]
        },
        backend: {
          languages: ["node", "python", "go", "rust"]
        }
      },
      features: [
        "All Builder features",
        "MUI / Chakra exports",
        "Motion pack (100+ animations)",
        "Design QA + Asset pipeline"
      ]
    },
    {
      id: "team",
      name: "Team",
      badge: "Agency",
      price: {
        monthly: 149,
        annual: 1490
      },
      included: {
        creditsPerMonth: 3500,
        projects: 200,
        teamSeats: 10,
        exportsPerMonth: 2000,
        customDomains: 30,
        storageGB: 120,
        computeMinutes: 900
      },
      limits: {
        maxDatasetEntries: 3000000,
        maxComponentsPerExport: 5000,
        maxPagesPerProject: 1000
      },
      frameworkAccess: {
        web: {
          frameworks: ["nextjs", "nuxt", "react", "vue", "svelte", "angular"],
          css: ["tailwind", "bootstrap", "materialui", "chakra", "css"]
        },
        mobile: {
          frameworks: ["flutter", "react-native", "swiftui", "kotlin", "ionic"],
          nativeLanguages: ["dart", "typescript", "swift", "kotlin"]
        },
        desktop: {
          frameworks: ["electron", "tauri", "qt"]
        },
        backend: {
          languages: ["node", "python", "go", "rust", "java", "csharp"]
        }
      },
      features: [
        "All Studio features",
        "Team collaboration (10 seats)",
        "Shared libraries + Brand kits",
        "Versioned exports + Governance"
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise",
      badge: "Custom",
      price: {
        monthly: null,
        annual: null
      },
      included: {
        creditsPerMonth: "custom",
        projects: "custom",
        teamSeats: "custom",
        exportsPerMonth: "custom",
        customDomains: "custom",
        storageGB: "custom",
        computeMinutes: "custom"
      },
      limits: {
        maxDatasetEntries: "custom",
        maxComponentsPerExport: "custom",
        maxPagesPerProject: "custom"
      },
      frameworkAccess: {
        web: {
          frameworks: ["any"],
          css: ["any"]
        },
        mobile: {
          frameworks: ["any"],
          nativeLanguages: ["any"]
        },
        desktop: {
          frameworks: ["any"]
        },
        backend: {
          languages: ["any"]
        }
      },
      features: [
        "All Team features",
        "Custom adapters + SSO/SCIM",
        "On-prem / VPC deployment",
        "Enterprise SLA + Support"
      ]
    }
  ]
} as const
