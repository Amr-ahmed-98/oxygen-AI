/**
 * ============================================
 * Quality Gate
 * ============================================
 * 
 * Validates generated projects:
 * - Build check
 * - Lint check
 * - Type check
 * - File structure validation
 */

import { execSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

export interface QualityGateResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
  checks: {
    build: boolean;
    lint: boolean;
    typecheck: boolean;
    structure: boolean;
  };
}

/**
 * Run quality gate on generated project
 */
export async function runQualityGate(
  projectPath: string
): Promise<QualityGateResult> {
  const result: QualityGateResult = {
    passed: true,
    errors: [],
    warnings: [],
    checks: {
      build: false,
      lint: false,
      typecheck: false,
      structure: false,
    },
  };

  // Check 1: File structure
  try {
    result.checks.structure = validateStructure(projectPath);
    if (!result.checks.structure) {
      result.errors.push("Project structure validation failed");
      result.passed = false;
    }
  } catch (err: any) {
    result.errors.push(`Structure check failed: ${err.message}`);
    result.passed = false;
  }

  // Check 2: Build
  try {
    result.checks.build = await checkBuild(projectPath);
    if (!result.checks.build) {
      result.errors.push("Build failed");
      result.passed = false;
    }
  } catch (err: any) {
    result.warnings.push(`Build check skipped: ${err.message}`);
  }

  // Check 3: Lint
  try {
    result.checks.lint = await checkLint(projectPath);
    if (!result.checks.lint) {
      result.warnings.push("Lint check found issues");
    }
  } catch (err: any) {
    result.warnings.push(`Lint check skipped: ${err.message}`);
  }

  // Check 4: Type check
  try {
    result.checks.typecheck = await checkTypecheck(projectPath);
    if (!result.checks.typecheck) {
      result.warnings.push("Type check found issues");
    }
  } catch (err: any) {
    result.warnings.push(`Type check skipped: ${err.message}`);
  }

  return result;
}

/**
 * Validate project structure
 */
function validateStructure(projectPath: string): boolean {
  const requiredFiles = [
    "package.json",
    "tsconfig.json",
    "src/app/layout.tsx",
    "src/app/page.tsx",
  ];

  for (const file of requiredFiles) {
    if (!existsSync(join(projectPath, file))) {
      return false;
    }
  }

  return true;
}

/**
 * Check if project builds
 */
async function checkBuild(projectPath: string): Promise<boolean> {
  try {
    execSync("npm run build", {
      cwd: projectPath,
      stdio: "ignore",
      timeout: 60000,
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Check lint
 */
async function checkLint(projectPath: string): Promise<boolean> {
  try {
    execSync("npm run lint", {
      cwd: projectPath,
      stdio: "ignore",
      timeout: 30000,
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Check typecheck
 */
async function checkTypecheck(projectPath: string): Promise<boolean> {
  try {
    execSync("npx tsc --noEmit", {
      cwd: projectPath,
      stdio: "ignore",
      timeout: 30000,
    });
    return true;
  } catch {
    return false;
  }
}

