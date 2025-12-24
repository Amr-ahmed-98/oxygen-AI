#!/usr/bin/env node

/**
 * ============================================
 * Builder CLI
 * ============================================
 * 
 * Usage: pnpm build:ai "PROMPT..."
 */

import { promptToPlan } from "../prompt/prompt-to-plan";
import { emitPlanToFiles } from "../emit/plan-to-files";
import { writeFileSync } from "fs";
import { join } from "path";

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.error("❌ Please provide a prompt");
    console.log("Usage: pnpm build:ai \"Build a CRM SaaS...\"");
    process.exit(1);
  }
  
  const prompt = args.join(" ");
  console.log(`\n🚀 Processing prompt: "${prompt}"\n`);
  
  try {
    // Step 1: Prompt → Plan
    console.log("📝 Converting prompt to build plan...");
    const plan = await promptToPlan({ text: prompt });
    
    // Save plan
    const planPath = join(process.cwd(), "build-plan.json");
    writeFileSync(planPath, JSON.stringify(plan, null, 2));
    console.log(`✅ Build plan saved: ${planPath}\n`);
    
    // Step 2: Plan → Files
    console.log("🏗️  Generating project files...");
    await emitPlanToFiles(plan, {
      outputDir: join(process.cwd(), "generated"),
      overwrite: false,
    });
    
    console.log("\n✅ Done! Generated projects:");
    plan.apps.forEach((app) => {
      console.log(`   - ${app.name} (${app.adapter})`);
    });
    console.log("\n📦 Next steps:");
    console.log("   1. cd generated/[app-name]");
    console.log("   2. pnpm install");
    console.log("   3. pnpm dev");
    console.log("");
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

main();

