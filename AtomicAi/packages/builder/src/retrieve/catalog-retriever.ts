/**
 * ============================================
 * Catalog Retriever
 * ============================================
 * 
 * Retrieves components from unified catalog index
 * Uses catalog/index.json (unified index)
 */

import { readFileSync, existsSync } from "fs";
import { join } from "path";
import type { CatalogItem } from "../compose/build-plan-composer";

const CATALOG_BASE = join(process.cwd(), "catalog");
const UNIFIED_INDEX = join(CATALOG_BASE, "index.json");
const ATOMS_BASE = join(process.cwd(), "atoms");
const BLOCKS_BASE = join(process.cwd(), "catalog", "blocks");

/**
 * Load unified catalog index
 */
function loadUnifiedIndex() {
  if (existsSync(UNIFIED_INDEX)) {
    try {
      const content = readFileSync(UNIFIED_INDEX, "utf-8");
      return JSON.parse(content);
    } catch (err) {
      console.warn("Could not load unified index, falling back to individual files");
      return null;
    }
  }
  return null;
}

export async function retrieveFromCatalog(
  appSpec: any,
  target: "hybrid" | "erp" | "marketing"
): Promise<CatalogItem[]> {
  const items: CatalogItem[] = [];
  
  // Try to load unified index first
  const unifiedIndex = loadUnifiedIndex();
  
  if (unifiedIndex && unifiedIndex.items) {
    // Use unified index
    console.log(`📚 Using unified catalog index (${unifiedIndex.totalItems} items)`);
    
    // Retrieve atoms
    const atomItems = unifiedIndex.items.filter((item: any) => item.type === "atom");
    for (const atom of atomItems.slice(0, 10)) { // Limit for now
      items.push({
        id: atom.id,
        type: "atom",
        variantId: atom.id,
        tags: atom.tags || [],
      });
    }
    
    // Retrieve blocks based on target
    const blockItems = unifiedIndex.items.filter((item: any) => item.type === "block");
    if (target === "hybrid" || target === "marketing") {
      const marketingBlocks = blockItems.filter((b: any) => 
        b.tags?.includes("marketing") || b.id?.includes("marketing")
      );
      marketingBlocks.forEach((block: any) => {
        items.push({
          id: block.id,
          type: "block",
          variantId: block.id,
          tags: block.tags || ["marketing"],
        });
      });
    }
    
    if (target === "hybrid" || target === "erp") {
      const erpBlocks = blockItems.filter((b: any) => 
        b.tags?.includes("erp") || b.id?.includes("erp")
      );
      erpBlocks.forEach((block: any) => {
        items.push({
          id: block.id,
          type: "block",
          variantId: block.id,
          tags: block.tags || ["erp"],
        });
      });
    }
    
    return items;
  }
  
  // Fallback to individual files (old method)
  console.log("📚 Using individual catalog files (fallback)");
  
  // Retrieve button
  try {
    const buttonIndex = JSON.parse(
      readFileSync(join(ATOMS_BASE, "button", "catalog_index_button_family_pack_v2.json"), "utf-8")
    );
    if (buttonIndex.items && buttonIndex.items.length > 0) {
      items.push({
        id: "atom.button",
        type: "atom",
        variantId: buttonIndex.items[0].id,
        tags: buttonIndex.items[0].tags || [],
      });
    }
  } catch (err) {
    console.warn("Could not load button catalog:", err);
  }

  // Retrieve textField
  try {
    const textFieldIndex = JSON.parse(
      readFileSync(join(ATOMS_BASE, "textField", "catalog_index_textField_pack_v2.json"), "utf-8")
    );
    if (textFieldIndex.items && textFieldIndex.items.length > 0) {
      items.push({
        id: "atom.textField",
        type: "atom",
        variantId: textFieldIndex.items[0].id,
        tags: textFieldIndex.items[0].tags || [],
      });
    }
  } catch (err) {
    console.warn("Could not load textField catalog:", err);
  }

  // Retrieve select
  try {
    const selectIndex = JSON.parse(
      readFileSync(join(ATOMS_BASE, "select", "catalog_index_select_pack_v2.json"), "utf-8")
    );
    if (selectIndex.items && selectIndex.items.length > 0) {
      items.push({
        id: "atom.select",
        type: "atom",
        variantId: selectIndex.items[0].id,
        tags: selectIndex.items[0].tags || [],
      });
    }
  } catch (err) {
    console.warn("Could not load select catalog:", err);
  }

  // Load blocks from catalog
  if (target === "hybrid" || target === "marketing") {
    try {
      const marketingBlocks = JSON.parse(
        readFileSync(join(BLOCKS_BASE, "marketing-blocks.json"), "utf-8")
      );
      marketingBlocks.items.forEach((block: any) => {
        items.push({
          id: block.id,
          type: "block",
          variantId: block.id,
          tags: block.tags || ["marketing"],
        });
      });
    } catch (err) {
      console.warn("Could not load marketing blocks catalog:", err);
      // Fallback
      items.push(
        { id: "hero.split.image", type: "block", tags: ["marketing"] },
        { id: "pricing.cards", type: "block", tags: ["marketing"] },
        { id: "faq.accordion", type: "block", tags: ["marketing"] }
      );
    }
  }

  if (target === "hybrid" || target === "erp") {
    try {
      const erpBlocks = JSON.parse(
        readFileSync(join(BLOCKS_BASE, "erp-blocks.json"), "utf-8")
      );
      erpBlocks.items.forEach((block: any) => {
        items.push({
          id: block.id,
          type: "block",
          variantId: block.id,
          tags: block.tags || ["erp"],
        });
      });
    } catch (err) {
      console.warn("Could not load ERP blocks catalog:", err);
      // Fallback
      items.push(
        { id: "appShell.sidebar", type: "block", tags: ["erp"] },
        { id: "table.listPage", type: "block", tags: ["erp"] },
        { id: "form.editPage", type: "block", tags: ["erp"] }
      );
    }
  }

  return items;
}

