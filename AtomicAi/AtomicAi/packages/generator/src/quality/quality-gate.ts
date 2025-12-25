/**
 * ============================================
 * Quality Gate - Quality Assurance System
 * ============================================
 * 
 * Validates build plans and scaffold plans
 * Ensures quality standards before emission
 * ============================================
 */

import type { BuildPlan, ScaffoldPlan } from "../pipeline";

export interface QualityResult {
  score: number; // 0-100
  passed: boolean;
  issues: QualityIssue[];
  warnings: string[];
  suggestions: string[];
}

export interface QualityIssue {
  severity: "error" | "warning" | "info";
  category: string;
  message: string;
  fix?: string;
}

export interface QualityConfig {
  minScore: number; // Default: 80
  strictMode: boolean;
  checkA11y: boolean;
  checkPerformance: boolean;
  checkSecurity: boolean;
}

const DEFAULT_CONFIG: QualityConfig = {
  minScore: 80,
  strictMode: false,
  checkA11y: true,
  checkPerformance: true,
  checkSecurity: true
};

/**
 * Main quality gate function
 */
export async function runQualityGate(
  buildPlan: BuildPlan,
  scaffoldPlan: ScaffoldPlan,
  config: Partial<QualityConfig> = {}
): Promise<QualityResult> {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const issues: QualityIssue[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];
  
  let score = 100;
  
  // Check 1: Build Plan Completeness
  const buildPlanCheck = checkBuildPlan(buildPlan);
  issues.push(...buildPlanCheck.issues);
  warnings.push(...buildPlanCheck.warnings);
  score -= buildPlanCheck.deduction;
  
  // Check 2: Scaffold Plan Completeness
  const scaffoldCheck = checkScaffoldPlan(scaffoldPlan);
  issues.push(...scaffoldCheck.issues);
  warnings.push(...scaffoldCheck.warnings);
  score -= scaffoldCheck.deduction;
  
  // Check 3: Platform Compatibility
  const platformCheck = checkPlatformCompatibility(buildPlan);
  issues.push(...platformCheck.issues);
  warnings.push(...platformCheck.warnings);
  score -= platformCheck.deduction;
  
  // Check 4: Accessibility (if enabled)
  if (finalConfig.checkA11y) {
    const a11yCheck = checkAccessibility(buildPlan);
    issues.push(...a11yCheck.issues);
    warnings.push(...a11yCheck.warnings);
    score -= a11yCheck.deduction;
  }
  
  // Check 5: Performance (if enabled)
  if (finalConfig.checkPerformance) {
    const perfCheck = checkPerformance(buildPlan);
    issues.push(...perfCheck.issues);
    warnings.push(...perfCheck.warnings);
    suggestions.push(...perfCheck.suggestions);
    score -= perfCheck.deduction;
  }
  
  // Check 6: Security (if enabled)
  if (finalConfig.checkSecurity) {
    const securityCheck = checkSecurity(scaffoldPlan);
    issues.push(...securityCheck.issues);
    warnings.push(...securityCheck.warnings);
    score -= securityCheck.deduction;
  }
  
  // Ensure score is between 0-100
  score = Math.max(0, Math.min(100, score));
  
  const passed = score >= finalConfig.minScore;
  
  // Generate suggestions
  if (!passed) {
    suggestions.push(
      "Consider adding more components to improve functionality",
      "Ensure all required pages are included",
      "Add error handling and loading states"
    );
  }
  
  return {
    score,
    passed,
    issues,
    warnings,
    suggestions
  };
}

function checkBuildPlan(buildPlan: BuildPlan): {
  issues: QualityIssue[];
  warnings: string[];
  deduction: number;
} {
  const issues: QualityIssue[] = [];
  const warnings: string[] = [];
  let deduction = 0;
  
  // Check if platforms are specified
  if (!buildPlan.platforms || buildPlan.platforms.length === 0) {
    issues.push({
      severity: "error",
      category: "build-plan",
      message: "No platforms specified in build plan",
      fix: "Add at least one platform: web, mobile, or desktop"
    });
    deduction += 20;
  }
  
  // Check if pages exist
  if (!buildPlan.pages || buildPlan.pages.length === 0) {
    warnings.push("No pages defined in build plan");
    deduction += 10;
  }
  
  // Check if components exist
  if (!buildPlan.components || buildPlan.components.length === 0) {
    warnings.push("No components defined in build plan");
    deduction += 10;
  }
  
  // Check if routes exist
  if (!buildPlan.routes || buildPlan.routes.length === 0) {
    warnings.push("No routes defined in build plan");
    deduction += 5;
  }
  
  return { issues, warnings, deduction };
}

function checkScaffoldPlan(scaffoldPlan: ScaffoldPlan): {
  issues: QualityIssue[];
  warnings: string[];
  deduction: number;
} {
  const issues: QualityIssue[] = [];
  const warnings: string[] = [];
  let deduction = 0;
  
  // Check if files are defined
  if (!scaffoldPlan.files || scaffoldPlan.files.length === 0) {
    issues.push({
      severity: "error",
      category: "scaffold-plan",
      message: "No files defined in scaffold plan",
      fix: "Add files to be generated"
    });
    deduction += 30;
  }
  
  // Check if dependencies are defined
  if (!scaffoldPlan.dependencies || scaffoldPlan.dependencies.length === 0) {
    warnings.push("No dependencies defined in scaffold plan");
    deduction += 5;
  }
  
  return { issues, warnings, deduction };
}

function checkPlatformCompatibility(buildPlan: BuildPlan): {
  issues: QualityIssue[];
  warnings: string[];
  deduction: number;
} {
  const issues: QualityIssue[] = [];
  const warnings: string[] = [];
  let deduction = 0;
  
  // Check mobile-specific rules
  if (buildPlan.platforms?.includes("mobile")) {
    // Check if DataTable is used (should be CardList on mobile)
    const hasDataTable = buildPlan.components?.some(
      (c: any) => c.type === "organism" && c.id === "organism.dataTablePro"
    );
    
    if (hasDataTable) {
      issues.push({
        severity: "warning",
        category: "platform-compatibility",
        message: "DataTablePro should be replaced with CardListPro on mobile",
        fix: "Use platform-map to transform DataTablePro to CardListPro for mobile"
      });
      deduction += 5;
    }
  }
  
  return { issues, warnings, deduction };
}

function checkAccessibility(buildPlan: BuildPlan): {
  issues: QualityIssue[];
  warnings: string[];
  deduction: number;
} {
  const issues: QualityIssue[] = [];
  const warnings: string[] = [];
  let deduction = 0;
  
  // Check if interactive components have labels
  const interactiveComponents = buildPlan.components?.filter(
    (c: any) => c.type === "atom" && ["button", "link", "input"].includes(c.id)
  ) || [];
  
  if (interactiveComponents.length > 0) {
    warnings.push("Ensure all interactive components have proper ARIA labels");
    deduction += 5;
  }
  
  return { issues, warnings, deduction };
}

function checkPerformance(buildPlan: BuildPlan): {
  issues: QualityIssue[];
  warnings: string[];
  suggestions: string[];
  deduction: number;
} {
  const issues: QualityIssue[] = [];
  const warnings: string[] = [];
  const suggestions: string[] = [];
  let deduction = 0;
  
  // Check component count
  const componentCount = buildPlan.components?.length || 0;
  if (componentCount > 100) {
    warnings.push("High component count may impact performance");
    suggestions.push("Consider code splitting and lazy loading");
    deduction += 5;
  }
  
  // Check page count
  const pageCount = buildPlan.pages?.length || 0;
  if (pageCount > 50) {
    warnings.push("High page count may impact build time");
    suggestions.push("Consider route-based code splitting");
    deduction += 3;
  }
  
  return { issues, warnings, suggestions, deduction };
}

function checkSecurity(scaffoldPlan: ScaffoldPlan): {
  issues: QualityIssue[];
  warnings: string[];
  deduction: number;
} {
  const issues: QualityIssue[] = [];
  const warnings: string[] = [];
  let deduction = 0;
  
  // Check for sensitive files
  const sensitivePatterns = ["secret", "key", "password", "token"];
  const hasSensitiveFiles = scaffoldPlan.files?.some((f: any) =>
    sensitivePatterns.some(pattern => f.path?.toLowerCase().includes(pattern))
  );
  
  if (hasSensitiveFiles) {
    issues.push({
      severity: "warning",
      category: "security",
      message: "Potential sensitive files detected",
      fix: "Ensure sensitive files are not committed to version control"
    });
    deduction += 10;
  }
  
  return { issues, warnings, deduction };
}

/**
 * Refine build plan based on quality issues
 */
export function refineBuildPlan(
  buildPlan: BuildPlan,
  issues: QualityIssue[]
): BuildPlan {
  const refined = { ...buildPlan };
  
  // Apply fixes based on issues
  issues.forEach(issue => {
    if (issue.fix && issue.severity === "error") {
      // Apply automatic fixes
      if (issue.category === "build-plan" && issue.message.includes("platforms")) {
        refined.platforms = refined.platforms || ["web"];
      }
    }
  });
  
  return refined;
}

