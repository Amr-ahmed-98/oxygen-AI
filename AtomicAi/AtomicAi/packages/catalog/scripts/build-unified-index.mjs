/**
 * ============================================
 * Build Unified Catalog Index
 * ============================================
 * 
 * Merges all catalog_index_*.json files into a single unified index
 */

import { readdirSync, readFileSync, writeFileSync, statSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ATOMS_BASE = join(__dirname, "../../../atoms");
const CATALOG_BASE = join(__dirname, "../../../catalog");
const OUTPUT_PATH = join(CATALOG_BASE, "index.json");

/**
 * Find all catalog_index_*.json files
 */
function findCatalogIndexFiles() {
  const files = [];
  
  // Search in atoms directory
  function searchDir(dir, basePath = "") {
    try {
      const entries = readdirSync(dir);
      
      for (const entry of entries) {
        const fullPath = join(dir, entry);
        const stat = statSync(fullPath);
        
        if (stat.isDirectory()) {
          searchDir(fullPath, join(basePath, entry));
        } else if (entry.startsWith("catalog_index_") && entry.endsWith(".json")) {
          files.push({
            path: fullPath,
            relativePath: join(basePath, entry),
            atomName: basePath || entry.replace(/^catalog_index_|_pack_v\d+\.json$/g, ""),
          });
        }
      }
    } catch (err) {
      // Skip if directory doesn't exist
    }
  }
  
  searchDir(ATOMS_BASE);
  
  return files;
}

/**
 * Load and merge catalog index files
 */
function buildUnifiedIndex() {
  console.log("🔍 Finding catalog index files...");
  const files = findCatalogIndexFiles();
  console.log(`✅ Found ${files.length} catalog index files`);
  
  const unifiedIndex = {
    version: "1.0.0",
    generatedAt: new Date().toISOString(),
    totalItems: 0,
    items: [],
    byType: {
      atoms: [],
      molecules: [],
      organisms: [],
      blocks: [],
    },
    byTag: {},
  };
  
  // Load each file
  for (const file of files) {
    try {
      console.log(`📦 Loading: ${file.relativePath}`);
      const content = readFileSync(file.path, "utf-8");
      const data = JSON.parse(content);
      
      if (data.items && Array.isArray(data.items)) {
        for (const item of data.items) {
          // Add source info
          const enrichedItem = {
            ...item,
            source: file.relativePath,
            atomName: file.atomName,
          };
          
          unifiedIndex.items.push(enrichedItem);
          unifiedIndex.totalItems++;
          
          // Group by type
          const type = item.type || "atom";
          if (unifiedIndex.byType[type]) {
            unifiedIndex.byType[type].push(enrichedItem.id);
          }
          
          // Group by tags
          if (item.tags && Array.isArray(item.tags)) {
            for (const tag of item.tags) {
              if (!unifiedIndex.byTag[tag]) {
                unifiedIndex.byTag[tag] = [];
              }
              unifiedIndex.byTag[tag].push(enrichedItem.id);
            }
          }
        }
      }
    } catch (err) {
      console.warn(`⚠️  Failed to load ${file.relativePath}:`, err.message);
    }
  }
  
  // Load blocks
  try {
    const marketingBlocks = JSON.parse(
      readFileSync(join(CATALOG_BASE, "blocks", "marketing-blocks.json"), "utf-8")
    );
    if (marketingBlocks.items) {
      for (const block of marketingBlocks.items) {
        unifiedIndex.items.push({
          ...block,
          type: "block",
          source: "catalog/blocks/marketing-blocks.json",
        });
        unifiedIndex.totalItems++;
        unifiedIndex.byType.blocks.push(block.id);
      }
    }
  } catch (err) {
    console.warn("⚠️  Could not load marketing blocks:", err.message);
  }
  
  try {
    const erpBlocks = JSON.parse(
      readFileSync(join(CATALOG_BASE, "blocks", "erp-blocks.json"), "utf-8")
    );
    if (erpBlocks.items) {
      for (const block of erpBlocks.items) {
        unifiedIndex.items.push({
          ...block,
          type: "block",
          source: "catalog/blocks/erp-blocks.json",
        });
        unifiedIndex.totalItems++;
        unifiedIndex.byType.blocks.push(block.id);
      }
    }
  } catch (err) {
    console.warn("⚠️  Could not load ERP blocks:", err.message);
  }
  
  // Write unified index
  writeFileSync(OUTPUT_PATH, JSON.stringify(unifiedIndex, null, 2));
  
  console.log(`\n✅ Unified catalog index created:`);
  console.log(`   📍 ${OUTPUT_PATH}`);
  console.log(`   📊 Total items: ${unifiedIndex.totalItems}`);
  console.log(`   🔹 Atoms: ${unifiedIndex.byType.atoms.length}`);
  console.log(`   🔹 Molecules: ${unifiedIndex.byType.molecules.length}`);
  console.log(`   🔹 Organisms: ${unifiedIndex.byType.organisms.length}`);
  console.log(`   🔹 Blocks: ${unifiedIndex.byType.blocks.length}`);
  console.log(`   🏷️  Unique tags: ${Object.keys(unifiedIndex.byTag).length}`);
}

// Run
buildUnifiedIndex();

