/**
 * ============================================
 * Prompt to Plan Converter
 * ============================================
 * 
 * Converts user prompt → build-plan.json
 * Simple rule-based approach (can be replaced with LLM later)
 */

import type { BuildPlan, Persona } from "../types/build-plan";

export interface PromptInput {
  text: string;
  context?: Record<string, any>;
}

export async function promptToPlan(prompt: PromptInput): Promise<BuildPlan> {
  const text = prompt.text.toLowerCase();
  
  // Determine platform
  const platform = determinePlatform(text);
  
  // Determine target
  const target = determineTarget(text);
  
  // Determine persona
  const persona = determinePersona(text);
  
  // Determine frameworks
  const webFramework = determineWebFramework(text);
  const mobileFramework = determineMobileFramework(text);
  const desktopFramework = determineDesktopFramework(text);
  const backendPack = determineBackendPack(text);
  
  // Extract pages and routes
  const marketingPages = extractMarketingPages(text);
  const erpPages = extractErpPages(text);
  const marketingRoutes = pagesToRoutes(marketingPages);
  const erpRoutes = pagesToRoutes(erpPages);
  
  // Check for RTL
  const rtl = /(rtl|arabic|arab|hebrew|right.to.left)/i.test(text);
  
  // Build apps config based on platform
  const apps = [];
  
  if (platform === "web") {
    if (target === "hybrid" || target === "marketing") {
      apps.push({
        name: "marketing-web",
        platform: "web" as const,
        adapter: "shadcn" as const,
        framework: webFramework,
        pages: marketingPages,
        routes: marketingRoutes,
        blocks: determineMarketingBlocks(text),
      });
    }
    
    if (target === "hybrid" || target === "erp") {
      apps.push({
        name: "erp-web",
        platform: "web" as const,
        adapter: "antd" as const,
        framework: webFramework,
        pages: erpPages,
        routes: erpRoutes,
        blocks: determineErpBlocks(text),
      });
    }
  } else if (platform === "mobile") {
    apps.push({
      name: "mobile-app",
      platform: "mobile" as const,
      adapter: "react-native" as const,
      framework: mobileFramework,
      pages: erpPages.length > 0 ? erpPages : marketingPages,
      routes: erpRoutes.length > 0 ? erpRoutes : marketingRoutes,
      blocks: determineErpBlocks(text),
    });
  } else if (platform === "desktop") {
    apps.push({
      name: "desktop-app",
      platform: "desktop" as const,
      adapter: "antd" as const,
      framework: desktopFramework,
      pages: erpPages,
      routes: erpRoutes,
      blocks: determineErpBlocks(text),
    });
  }
  
  // Default atoms (from catalog)
  const atoms = {
    button: { variantId: "atom.button" },
    textField: { variantId: "atom.textField" },
    select: { variantId: "atom.select" },
  };
  
  // Blocks
  const blocks = {
    marketing: apps.find(a => a.name === "marketing-web")?.blocks || [],
    erp: apps.find(a => a.name === "erp-web")?.blocks || [],
  };
  
  return {
    target,
    platform,
    persona,
    rtl,
    webFramework,
    mobileFramework,
    desktopFramework,
    backendPack,
    apps,
    atoms,
    blocks,
  };
}

function pagesToRoutes(pages: string[]): string[] {
  return pages.map((page) => {
    if (page === "home") return "/";
    return `/${page}`;
  });
}

function determineTarget(text: string): "hybrid" | "erp" | "marketing" {
  const hasMarketing = /(marketing|landing|home|pricing|faq|about|blog)/.test(text);
  const hasErp = /(erp|crm|dashboard|admin|saas|management|customers|orders|invoices|settings)/.test(text);
  
  if (hasMarketing && hasErp) return "hybrid";
  if (hasErp) return "erp";
  if (hasMarketing) return "marketing";
  
  // Default to hybrid if unclear
  return "hybrid";
}

function determinePersona(text: string): Persona {
  if (/(enterprise|corporate|business)/.test(text)) return "enterprise";
  if (/(minimal|clean|simple)/.test(text)) return "minimal";
  if (/(glass|glassmorphism|frosted)/.test(text)) return "glass";
  if (/(neon|vibrant|glow)/.test(text)) return "neon";
  if (/(startup|fresh)/.test(text)) return "startup";
  if (/(dark|night|black)/.test(text)) return "dark";
  if (/(colorful|rainbow|multicolor)/.test(text)) return "colorful";
  if (/(elegant|sophisticated|luxury)/.test(text)) return "elegant";
  if (/(modern|contemporary|current)/.test(text)) return "modern";
  if (/(playful|fun|casual)/.test(text)) return "playful";
  
  return "enterprise"; // Default
}

function extractMarketingPages(text: string): string[] {
  const pages: string[] = [];
  
  if (/(home|landing|main)/.test(text)) pages.push("home");
  if (/pricing/.test(text)) pages.push("pricing");
  if (/faq/.test(text)) pages.push("faq");
  if (/about/.test(text)) pages.push("about");
  if (/blog/.test(text)) pages.push("blog");
  if (/contact/.test(text)) pages.push("contact");
  
  // Default pages if none specified
  if (pages.length === 0) {
    pages.push("home", "pricing", "faq");
  }
  
  return pages;
}

function extractErpPages(text: string): string[] {
  const pages: string[] = [];
  
  if (/(auth|login|signin)/.test(text)) pages.push("auth");
  if (/(dashboard|home)/.test(text)) pages.push("dashboard");
  if (/(customers|clients|users)/.test(text)) pages.push("customers");
  if (/(orders|transactions)/.test(text)) pages.push("orders");
  if (/(invoices|billing)/.test(text)) pages.push("invoices");
  if (/settings/.test(text)) pages.push("settings");
  
  // Default pages if none specified
  if (pages.length === 0) {
    pages.push("auth", "dashboard", "customers", "orders", "settings");
  }
  
  return pages;
}

function determineMarketingBlocks(text: string): string[] {
  const blocks: string[] = [];
  
  if (/(hero|banner)/.test(text)) blocks.push("hero.split.image");
  if (/pricing/.test(text)) blocks.push("pricing.cards");
  if (/faq/.test(text)) blocks.push("faq.accordion");
  if (/(features|benefits)/.test(text)) blocks.push("features.grid");
  if (/(testimonials|reviews)/.test(text)) blocks.push("testimonials.cards");
  if (/(cta|call.to.action)/.test(text)) blocks.push("cta.strip");
  if (/footer/.test(text)) blocks.push("footer.mega");
  if (/navbar/.test(text)) blocks.push("navbar.main");
  
  // Default blocks
  if (blocks.length === 0) {
    blocks.push("hero.split.image", "pricing.cards", "faq.accordion");
  }
  
  return blocks;
}

function determineErpBlocks(text: string): string[] {
  const blocks: string[] = [];
  
  blocks.push("appShell.sidebar"); // Always needed for ERP
  if (/(table|list|data)/.test(text)) blocks.push("table.listPage");
  if (/(form|create|edit)/.test(text)) blocks.push("form.editPage");
  if (/(filter|search)/.test(text)) blocks.push("filters.bar");
  if (/(bulk|actions)/.test(text)) blocks.push("bulk.actions");
  if (/(empty|no.data)/.test(text)) blocks.push("empty.state");
  if (/(loading|skeleton)/.test(text)) blocks.push("loading.skeleton");
  
  // Default blocks
  if (blocks.length === 1) {
    blocks.push("table.listPage", "form.editPage");
  }
  
  return blocks;
}

function determinePlatform(text: string): "web" | "mobile" | "desktop" {
  if (/(mobile|ios|android|app|phone|tablet)/.test(text)) return "mobile";
  if (/(desktop|electron|tauri|native|application)/.test(text)) return "desktop";
  return "web"; // Default
}

function determineWebFramework(text: string): "react" | "vue" | "svelte" | "angular" {
  if (/(vue|nuxt)/.test(text)) return "vue";
  if (/(svelte|sveltekit)/.test(text)) return "svelte";
  if (/(angular)/.test(text)) return "angular";
  return "react"; // Default
}

function determineMobileFramework(text: string): "react-native" | "flutter" | "swiftui" | "compose" {
  if (/(flutter|dart)/.test(text)) return "flutter";
  if (/(swift|swiftui|ios native)/.test(text)) return "swiftui";
  if (/(kotlin|compose|android native)/.test(text)) return "compose";
  return "react-native"; // Default
}

function determineDesktopFramework(text: string): "electron" | "tauri" | "maui" | "wails" {
  if (/(tauri|rust)/.test(text)) return "tauri";
  if (/(maui|\.net|dotnet)/.test(text)) return "maui";
  if (/(wails|go)/.test(text)) return "wails";
  return "electron"; // Default
}

function determineBackendPack(text: string): "node" | "python" | "dotnet" | "java" | "php" | undefined {
  if (/(python|django|fastapi|flask)/.test(text)) return "python";
  if (/(\.net|dotnet|asp\.net|csharp)/.test(text)) return "dotnet";
  if (/(java|spring|kotlin backend)/.test(text)) return "java";
  if (/(php|laravel|symfony)/.test(text)) return "php";
  if (/(node|express|nest|typescript backend)/.test(text)) return "node";
  return undefined; // Optional
}

