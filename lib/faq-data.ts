export const faqData = {
  title: "Frequently Asked Questions",
  subtitle: "Everything you need to know about OxyGen AI",
  categories: [
    {
      id: "general",
      name: "General",
      questions: [
        {
          id: "what-is-oxygen",
          question: "What is OxyGen AI?",
          answer: "OxyGen AI is a DNA-driven UI generator that helps you build websites, apps, and design systems using AI. It uses a unique DNA token system combined with dataset-driven components to generate, preview, edit, and export production-ready UI code."
        },
        {
          id: "how-it-works",
          question: "How does it work?",
          answer: "Simply describe what you want to build in natural language. Our AI analyzes your request, selects appropriate components from our dataset, applies DNA themes for consistent styling, and generates clean, exportable code for your chosen framework (React, Vue, Angular, Flutter, etc.)."
        },
        {
          id: "what-frameworks",
          question: "What frameworks and languages are supported?",
          answer: "We support a wide range of frameworks including React, Vue, Angular, Next.js, Nuxt, Svelte for web; Flutter, React Native, Ionic for mobile; Electron, Tauri for desktop; and Node.js, Python, Go, Rust for backend. Higher tier plans unlock more framework options."
        },
        {
          id: "free-plan",
          question: "Is there a free plan?",
          answer: "Yes! Our Starter plan is free and includes 200 build credits per month, 5 projects, and access to HTML, React, and Vue exports with Tailwind CSS. Perfect for testing and small projects."
        }
      ]
    },
    {
      id: "pricing",
      name: "Pricing & Plans",
      questions: [
        {
          id: "build-credits",
          question: "What are Build Credits?",
          answer: "One Build Credit equals one complete generation job: from your prompt to generated components, assembled pages, and an export bundle for your chosen stack. Each build job consumes one credit regardless of complexity."
        },
        {
          id: "credit-overage",
          question: "What happens if I exceed my credit limit?",
          answer: "You can purchase additional credit packs, or generation will pause at your plan limit. Overages are optional and only billed if you opt-in. Credit packs are available in 500, 2000, and 6000 credit bundles."
        },
        {
          id: "annual-discount",
          question: "Do you offer annual billing discounts?",
          answer: "Yes! Annual billing saves you up to 20% compared to monthly billing. The discount varies by plan, with higher savings on premium tiers."
        },
        {
          id: "plan-upgrade",
          question: "Can I upgrade or downgrade my plan?",
          answer: "Yes, you can change your plan at any time. Upgrades take effect immediately, while downgrades apply at the end of your current billing period. Unused credits don't roll over."
        }
      ]
    },
    {
      id: "features",
      name: "Features & Capabilities",
      questions: [
        {
          id: "dna-themes",
          question: "What are DNA themes?",
          answer: "DNA themes are design system tokens that define the visual personality of your UI. They include foundations (colors, typography), interaction patterns, component anatomy, and personality traits. Themes ensure consistency across all generated components."
        },
        {
          id: "export-formats",
          question: "What export formats are available?",
          answer: "Export formats vary by plan. Starter includes HTML/CSS and Tailwind snippets. Builder adds Bootstrap. Studio includes MUI and Chakra UI. Team and Enterprise support all formats plus custom adapters for internal frameworks."
        },
        {
          id: "accessibility",
          question: "Is accessibility supported?",
          answer: "Yes! All plans include basic accessibility checks (contrast, focus outlines). Pro+ plans add comprehensive accessibility audits with checklists for contrast, labels, keyboard navigation, and ARIA hints."
        },
        {
          id: "mobile-support",
          question: "Can I generate mobile apps?",
          answer: "Yes! Builder plan and above support Flutter and React Native. Studio+ adds Ionic, SwiftUI, and Kotlin. All mobile exports include native language support (Dart, TypeScript, JavaScript, Swift, Kotlin)."
        }
      ]
    },
    {
      id: "technical",
      name: "Technical",
      questions: [
        {
          id: "custom-frameworks",
          question: "Can I use custom frameworks?",
          answer: "Enterprise plans support custom adapters for internal or proprietary frameworks. Contact our sales team to discuss your specific framework requirements and custom integration options."
        },
        {
          id: "on-premise",
          question: "Do you offer on-premise deployment?",
          answer: "Yes, Enterprise plans include on-premise and VPC deployment options for organizations with strict security and compliance requirements. This includes private model connectors and data retention controls."
        },
        {
          id: "api-access",
          question: "Is there an API?",
          answer: "API access is available on Studio and above plans. This allows you to integrate OxyGen AI into your CI/CD pipelines, automate UI generation, and build custom workflows."
        },
        {
          id: "data-security",
          question: "How is my data secured?",
          answer: "We take security seriously. All data is encrypted in transit and at rest. Enterprise plans include SSO/SCIM, audit logs, and compliance support. On-premise options are available for maximum data control."
        }
      ]
    }
  ]
} as const

