#!/usr/bin/env node

/**
 * ============================================
 * Generator CLI - Main Entry Point
 * ============================================
 * 
 * Usage:
 *   npm run gen -- --prompt "CRM system" --targets web,mobile,desktop
 * ============================================
 */

import { runPipeline } from "../packages/generator/src/pipeline/index.js";
import { writeWebProject } from "../packages/generator/src/writers/web-writer.js";
import { writeMobileProject } from "../packages/generator/src/writers/mobile-writer.js";
import { writeDesktopProject } from "../packages/generator/src/writers/desktop-writer.js";
import { runQualityGate } from "../packages/generator/src/quality/quality-gate.js";
import { mkdir } from "fs/promises";
import { join } from "path";

const args = process.argv.slice(2);

// Parse arguments
const promptIndex = args.indexOf("--prompt");
const targetsIndex = args.indexOf("--targets");
const outputIndex = args.indexOf("--output");

const prompt = promptIndex >= 0 ? args[promptIndex + 1] : null;
const targets = targetsIndex >= 0 
  ? args[targetsIndex + 1].split(",").map(t => t.trim())
  : ["web"];
const outputDir = outputIndex >= 0 
  ? args[outputIndex + 1]
  : "./generated";

if (!prompt) {
  console.error("❌ Error: --prompt is required");
  console.log("\nUsage:");
  console.log("  npm run gen -- --prompt \"Your prompt here\" --targets web,mobile,desktop");
  process.exit(1);
}

console.log("🚀 Starting generation...");
console.log(`📝 Prompt: ${prompt}`);
console.log(`🎯 Targets: ${targets.join(", ")}`);
console.log(`📁 Output: ${outputDir}\n`);

async function main() {
  try {
    // Step 1: Run pipeline
    console.log("Step 1: Running pipeline...");
    const result = await runPipeline(
      { text: prompt },
      {
        platforms: targets,
        productType: "saas",
        deployment: "saas",
        persona: "enterprise"
      }
    );
    
    console.log(`✅ Pipeline completed (Quality Score: ${result.qualityScore})`);
    
    if (!result.qualityScore || result.qualityScore < 80) {
      console.warn("⚠️  Quality score below threshold. Proceeding anyway...");
    }
    
    // Step 2: Generate projects
    console.log("\nStep 2: Generating projects...");
    
    if (targets.includes("web")) {
      console.log("  📱 Generating Web (Next.js)...");
      await writeWebProject(
        result.scaffoldPlan,
        result.buildPlan,
        {
          outputDir: join(outputDir, "web"),
          appDir: true,
          useTypeScript: true,
          useTailwind: true,
          packageManager: "npm"
        }
      );
    }
    
    if (targets.includes("mobile")) {
      console.log("  📱 Generating Mobile (Expo)...");
      await writeMobileProject(
        result.scaffoldPlan,
        result.buildPlan,
        {
          outputDir: join(outputDir, "mobile"),
          useTypeScript: true,
          useNativeWind: true,
          packageManager: "npm"
        }
      );
    }
    
    if (targets.includes("desktop")) {
      console.log("  💻 Generating Desktop (Tauri)...");
      await writeDesktopProject(
        result.scaffoldPlan,
        result.buildPlan,
        {
          outputDir: join(outputDir, "desktop"),
          useTypeScript: true,
          useTailwind: true,
          packageManager: "npm"
        }
      );
    }
    
    console.log("\n✅ Generation complete!");
    console.log(`📁 Projects generated at: ${outputDir}`);
    console.log("\nNext steps:");
    console.log("  1. cd into the generated project directory");
    console.log("  2. npm install");
    console.log("  3. npm run dev");
    
  } catch (error) {
    console.error("❌ Error during generation:", error);
    process.exit(1);
  }
}

main();

