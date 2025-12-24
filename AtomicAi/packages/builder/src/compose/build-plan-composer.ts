/**
 * ============================================
 * Build Plan Composer
 * ============================================
 * 
 * Composes build plan from app spec + catalog retrieval
 */

import type { BuildPlan, AppConfig, AtomConfig, BlockConfig } from "../types/build-plan";
import type { AppSpec } from "../types/app-spec";

export interface CatalogItem {
  id: string;
  type: "atom" | "molecule" | "organism" | "block";
  variantId?: string;
  tags?: string[];
}

export async function composeBuildPlan(
  appSpec: AppSpec,
  catalogItems: CatalogItem[],
  target: "hybrid" | "erp" | "marketing" = "hybrid"
): Promise<BuildPlan> {
  // Determine apps based on target
  const apps: AppConfig[] = [];
  
  if (target === "hybrid" || target === "marketing") {
    apps.push({
      name: "marketing-web",
      adapter: "shadcn",
      pages: extractMarketingPages(appSpec),
      blocks: ["hero.split.image", "pricing.cards", "faq.accordion"],
    });
  }
  
  if (target === "hybrid" || target === "erp") {
    apps.push({
      name: "erp-web",
      adapter: "antd",
      pages: extractErpPages(appSpec),
      blocks: ["appShell.sidebar", "table.listPage", "form.editPage"],
    });
  }

  // Extract atom variants from catalog
  const atoms: AtomConfig = {};
  catalogItems
    .filter((item) => item.type === "atom")
    .forEach((item) => {
      if (item.id.startsWith("atom.button")) {
        atoms.button = { variantId: item.variantId || "default" };
      } else if (item.id.startsWith("atom.textField")) {
        atoms.textField = { variantId: item.variantId || "default" };
      } else if (item.id.startsWith("atom.select")) {
        atoms.select = { variantId: item.variantId || "default" };
      }
    });

  // Extract blocks
  const blocks: BlockConfig = {
    marketing: catalogItems
      .filter((item) => item.type === "block" && item.tags?.includes("marketing"))
      .map((item) => item.id),
    erp: catalogItems
      .filter((item) => item.type === "block" && item.tags?.includes("erp"))
      .map((item) => item.id),
  };

  return {
    target,
    persona: "enterprise", // TODO: Extract from appSpec
    apps,
    atoms,
    blocks,
  };
}

function extractMarketingPages(appSpec: AppSpec): string[] {
  // Extract marketing pages from app spec
  return appSpec.pages
    .filter((page) => ["home", "pricing", "faq", "about"].includes(page.type))
    .map((page) => page.id);
}

function extractErpPages(appSpec: AppSpec): string[] {
  // Extract ERP pages from app spec
  return appSpec.pages
    .filter((page) => ["auth", "dashboard", "customers", "orders", "settings"].includes(page.type))
    .map((page) => page.id);
}

