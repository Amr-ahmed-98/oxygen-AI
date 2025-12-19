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
        "5 DNA themes for components",
        "Buttons + Cards + Inputs generator",
        "Token export (JSON)",
        "Basic accessibility checklist",
        "Dataset sampler (read-only view up to 25k entries)"
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
        "5 DNA themes for components",
        "Buttons + Cards + Inputs generator",
        "Token export (JSON)",
        "Basic accessibility checklist",
        "Dataset sampler (read-only view up to 25k entries)",
        "Full Design System Kit (core components)",
        "Page composer (sections + layout rules)",
        "Responsive generator",
        "Contrast + focus QA warnings",
        "Export: Tailwind components / Bootstrap mapping / HTML",
        "Dataset factory: tags + dedupe"
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
        "5 DNA themes for components",
        "Buttons + Cards + Inputs generator",
        "Token export (JSON)",
        "Basic accessibility checklist",
        "Dataset sampler (read-only view up to 25k entries)",
        "Full Design System Kit (core components)",
        "Page composer (sections + layout rules)",
        "Responsive generator",
        "Contrast + focus QA warnings",
        "Export: Tailwind components / Bootstrap mapping / HTML",
        "Dataset factory: tags + dedupe",
        "Adapters: MUI / Chakra exports",
        "Theme DNA applied across ALL components",
        "Motion pack: 50 animations + 50 hover styles (toggle)",
        "Design QA: spacing rhythm + type scale validation",
        "Asset pipeline (icons/shadows/gradients) via tokens"
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
        "5 DNA themes for components",
        "Buttons + Cards + Inputs generator",
        "Token export (JSON)",
        "Basic accessibility checklist",
        "Dataset sampler (read-only view up to 25k entries)",
        "Full Design System Kit (core components)",
        "Page composer (sections + layout rules)",
        "Responsive generator",
        "Contrast + focus QA warnings",
        "Export: Tailwind components / Bootstrap mapping / HTML",
        "Dataset factory: tags + dedupe",
        "Adapters: MUI / Chakra exports",
        "Theme DNA applied across ALL components",
        "Motion pack: 50 animations + 50 hover styles (toggle)",
        "Design QA: spacing rhythm + type scale validation",
        "Asset pipeline (icons/shadows/gradients) via tokens",
        "Shared libraries (tokens + presets)",
        "Role-based access (viewer/editor/admin)",
        "Versioned export bundles (diffable)",
        "Brand kits + auto theme mapping",
        "Dataset governance rules"
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
        "5 DNA themes for components",
        "Buttons + Cards + Inputs generator",
        "Token export (JSON)",
        "Basic accessibility checklist",
        "Dataset sampler (read-only view up to 25k entries)",
        "Full Design System Kit (core components)",
        "Page composer (sections + layout rules)",
        "Responsive generator",
        "Contrast + focus QA warnings",
        "Export: Tailwind components / Bootstrap mapping / HTML",
        "Dataset factory: tags + dedupe",
        "Adapters: MUI / Chakra exports",
        "Theme DNA applied across ALL components",
        "Motion pack: 50 animations + 50 hover styles (toggle)",
        "Design QA: spacing rhythm + type scale validation",
        "Asset pipeline (icons/shadows/gradients) via tokens",
        "Shared libraries (tokens + presets)",
        "Role-based access (viewer/editor/admin)",
        "Versioned export bundles (diffable)",
        "Brand kits + auto theme mapping",
        "Dataset governance rules",
        "Custom adapters (internal frameworks)",
        "SSO/SCIM options",
        "On-prem / VPC deployment",
        "Audit logs + retention",
        "Custom dataset ingestion & cleaning pipeline",
        "Human-in-the-loop review workflows"
      ]
    }
  ]
} as const
