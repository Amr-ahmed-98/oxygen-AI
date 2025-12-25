/**
 * ============================================
 * Plan to Files Emitter
 * ============================================
 * 
 * Converts build-plan.json → actual project files
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import type { BuildPlan } from "../types/build-plan";
import { runQualityGate } from "../quality/quality-gate";

export interface EmitOptions {
  outputDir?: string;
  overwrite?: boolean;
  runQualityGate?: boolean;
}

export async function emitPlanToFiles(
  plan: BuildPlan,
  options: EmitOptions = {}
): Promise<void> {
  const outputDir = options.outputDir || join(process.cwd(), "generated");
  const overwrite = options.overwrite || false;
  
  // Create output directory
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  
  // Save build-plan.json
  writeFileSync(
    join(outputDir, "build-plan.json"),
    JSON.stringify(plan, null, 2)
  );
  
  // Emit each app
  for (const app of plan.apps) {
    await emitApp(app, plan, outputDir, overwrite);
  }
  
  console.log(`✅ Generated projects in: ${outputDir}`);
  
  // Run quality gate (optional)
  if (options.runQualityGate !== false) {
    console.log("🔍 Running quality gate...");
    for (const app of plan.apps) {
      const appDir = join(outputDir, app.name);
      if (existsSync(appDir)) {
        const qualityResult = await runQualityGate(appDir);
        if (qualityResult.passed) {
          console.log(`✅ Quality gate passed for ${app.name}`);
        } else {
          console.warn(`⚠️  Quality gate issues for ${app.name}:`, qualityResult.errors);
        }
      }
    }
  }
}

async function emitApp(
  app: BuildPlan["apps"][0],
  plan: BuildPlan,
  outputDir: string,
  overwrite: boolean
): Promise<void> {
  const appDir = join(outputDir, app.name);
  
  if (existsSync(appDir) && !overwrite) {
    console.warn(`⚠️  ${app.name} already exists, skipping...`);
    return;
  }
  
  // Create app directory
  mkdirSync(appDir, { recursive: true });
  
  // Emit package.json
  emitPackageJson(app, plan, appDir);
  
  // Emit Next.js config
  emitNextConfig(app, appDir);
  
  // Emit tsconfig.json
  emitTsConfig(app, appDir);
  
  // Emit layout
  emitLayout(app, plan, appDir);
  
  // Emit pages
  for (const page of app.pages) {
    emitPage(app, page, plan, appDir);
  }
  
  // Emit styles
  emitStyles(app, appDir);
  
  // Emit .env.local with adapter
  emitEnvFile(app, appDir);
  
  console.log(`✅ Generated ${app.name}`);
}

function emitPackageJson(
  app: BuildPlan["apps"][0],
  plan: BuildPlan,
  appDir: string
): void {
  const isMarketing = app.name === "marketing-web";
  
  const packageJson = {
    name: `@atomic-ai/${app.name}`,
    version: "0.1.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      lint: "next lint",
    },
    dependencies: {
      "@atomic-ai/ui": "workspace:*",
      "@atomic-ai/tokens": "workspace:*",
      "@atomic-ai/blocks": "workspace:*",
      next: "14.0.0",
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      ...(isMarketing
        ? {
            "@atomic-ai/adapters-shadcn": "workspace:*",
            tailwindcss: "^3.3.0",
            autoprefixer: "^10.4.16",
            postcss: "^8.4.31",
          }
        : {
            "@atomic-ai/ui-antd": "workspace:*",
            "@atomic-ai/tokens": "workspace:*",
            antd: "^5.12.0",
          }),
    },
    devDependencies: {
      "@types/node": "^20.10.0",
      "@types/react": "^18.2.0",
      "@types/react-dom": "^18.2.0",
      typescript: "^5.3.0",
      eslint: "^8.54.0",
      "eslint-config-next": "14.0.0",
    },
  };
  
  writeFileSync(
    join(appDir, "package.json"),
    JSON.stringify(packageJson, null, 2)
  );
}

function emitNextConfig(
  app: BuildPlan["apps"][0],
  appDir: string
): void {
  const isMarketing = app.name === "marketing-web";
  
  const config = {
    reactStrictMode: true,
    transpilePackages: [
      "@atomic-ai/ui",
      "@atomic-ai/ui-antd",
      "@atomic-ai/tokens",
      "@atomic-ai/blocks",
      isMarketing ? "@atomic-ai/adapters-shadcn" : "@atomic-ai/adapters-antd",
    ],
  };
  
  writeFileSync(
    join(appDir, "next.config.js"),
    `/** @type {import('next').NextConfig} */\nconst nextConfig = ${JSON.stringify(config, null, 2)};\n\nmodule.exports = nextConfig;`
  );
}

function emitTsConfig(
  app: BuildPlan["apps"][0],
  appDir: string
): void {
  const tsconfig = {
    compilerOptions: {
      target: "ES2020",
      lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: "esnext",
      moduleResolution: "bundler",
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: "preserve",
      incremental: true,
      plugins: [{ name: "next" }],
      paths: {
        "@/*": ["./src/*"],
      },
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    exclude: ["node_modules"],
  };
  
  writeFileSync(
    join(appDir, "tsconfig.json"),
    JSON.stringify(tsconfig, null, 2)
  );
}

function emitLayout(
  app: BuildPlan["apps"][0],
  plan: BuildPlan,
  appDir: string
): void {
  const isMarketing = app.name === "marketing-web";
  const srcDir = join(appDir, "src", "app");
  const stylesDir = join(appDir, "src", "styles");
  mkdirSync(srcDir, { recursive: true });
  mkdirSync(stylesDir, { recursive: true });
  
  const rtlAttr = plan.rtl ? ' dir="rtl"' : '';
  const langAttr = plan.rtl ? ' lang="ar"' : ' lang="en"';
  const rtlMeta = plan.rtl ? '\n        <meta name="viewport" content="width=device-width, initial-scale=1" />' : '';
  const rtlDirection = plan.rtl ? ' direction="rtl"' : '';
  
  if (isMarketing) {
    const layout = `import "@atomic-ai/tokens/css";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html${langAttr}${rtlAttr}>
      <head>
        <title>Marketing Site</title>
        <meta name="description" content="Generated by Atomic AI" />${rtlMeta}
      </head>
      <body>{children}</body>
    </html>
  );
}
`;
    writeFileSync(join(srcDir, "layout.tsx"), layout);
  } else {
    const layout = `"use client";

import { ConfigProvider } from "antd";
import { createAntdTheme } from "@atomic-ai/ui-antd/theme";
import "@atomic-ai/tokens/css";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createAntdTheme({ 
    persona: "${plan.persona}", 
    rtl: ${plan.rtl || false} 
  });

  return (
    <html${langAttr}${rtlAttr}>
      <head>
        <title>ERP Dashboard</title>
        <meta name="description" content="Generated by Atomic AI" />${rtlMeta}
      </head>
      <body>
        <ConfigProvider theme={theme}${rtlDirection}>{children}</ConfigProvider>
      </body>
    </html>
  );
}
`;
    writeFileSync(join(srcDir, "layout.tsx"), layout);
  }
}

function emitPage(
  app: BuildPlan["apps"][0],
  pageName: string,
  plan: BuildPlan,
  appDir: string
): void {
  const isMarketing = app.name === "marketing-web";
  const srcDir = join(appDir, "src", "app");
  
  // Ensure src/app exists
  mkdirSync(srcDir, { recursive: true });
  
  // Use routes if available, otherwise use pages
  const routes = app.routes || [];
  const route = routes.find((r) => r === `/${pageName}` || (pageName === "home" && r === "/"));
  const pagePath = route || (pageName === "home" ? "/" : `/${pageName}`);
  
  // Create page directory based on route
  const pageDir = pagePath === "/" ? srcDir : join(srcDir, pagePath.slice(1));
  if (pagePath !== "/") {
    mkdirSync(pageDir, { recursive: true });
  }
  
  const pageFile = pagePath === "/" ? "page.tsx" : join(pagePath.slice(1), "page.tsx");
  
  if (isMarketing) {
    const pageContent = generateMarketingPage(pageName, plan);
    writeFileSync(join(srcDir, pageFile), pageContent);
  } else {
    const pageContent = generateErpPage(pageName, plan);
    writeFileSync(join(srcDir, pageFile), pageContent);
  }
}

function generateMarketingPage(
  pageName: string,
  plan: BuildPlan
): string {
  const blocks = plan.blocks.marketing || [];
  
  let imports = `"use client";\n\nimport { setAdapter } from "@atomic-ai/ui";\nimport { useEffect } from "react";\n`;
  
  if (blocks.includes("hero.split.image")) {
    imports += `import { Hero } from "@atomic-ai/blocks";\n`;
  }
  if (blocks.includes("pricing.cards")) {
    imports += `import { Pricing } from "@atomic-ai/blocks";\n`;
  }
  
  imports += `\nuseEffect(() => {\n  setAdapter("shadcn");\n}, []);\n\n`;
  
  let content = `export default function ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Page() {\n  return (\n    <main>\n`;
  
  if (pageName === "home" && blocks.includes("hero.split.image")) {
    content += `      <Hero\n        title="Welcome to Our Platform"\n        subtitle="Build amazing products with Atomic AI"\n        ctaText="Get Started"\n        variant="centered"\n      />\n`;
  }
  
  if (pageName === "pricing" && blocks.includes("pricing.cards")) {
    content += `      <Pricing\n        title="Choose Your Plan"\n        plans={[\n          { name: "Starter", price: "$9", period: "month", features: ["Feature 1", "Feature 2"], ctaText: "Get Started" },\n          { name: "Pro", price: "$29", period: "month", features: ["All Starter", "Feature 3"], ctaText: "Get Started", popular: true },\n        ]}\n      />\n`;
  }
  
  content += `    </main>\n  );\n}\n`;
  
  return imports + content;
}

function generateErpPage(
  pageName: string,
  plan: BuildPlan
): string {
  const blocks = plan.blocks.erp || [];
  
  let imports = `"use client";\n\n`;
  
  if (blocks.includes("appShell.sidebar")) {
    imports += `import { AppShell } from "@atomic-ai/blocks";\n`;
  }
  if (blocks.includes("table.listPage")) {
    imports += `import { TablePage } from "@atomic-ai/blocks";\n`;
  }
  // Import atoms based on what's used in blocks
  imports += `import { Button, Table, Alert, Text, Heading, Label, Link, Badge, Form, TextField, Select, Checkbox, Radio, Switch } from "@atomic-ai/ui-antd";\n\n`;
  
  let content = `export default function ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Page() {\n  return (\n    <div style={{ padding: "24px" }}>\n`;
  
  if (blocks.includes("appShell.sidebar")) {
    content += `    <AppShell\n      sidebar={\n        <nav>\n          <ul>\n            <li>Dashboard</li>\n            <li>Customers</li>\n            <li>Orders</li>\n          </ul>\n        </nav>\n      }\n      header={<div>${pageName} Header</div>}\n    >\n`;
  }
  
  if (blocks.includes("table.listPage")) {
    content += `      <TablePage title="${pageName}" addButtonText="Add New">\n        <div>Content for ${pageName}</div>\n      </TablePage>\n`;
  } else {
    content += `      <Heading level={1}>${pageName.charAt(0).toUpperCase() + pageName.slice(1)}</Heading>\n      <Text>Welcome to ${pageName} page</Text>\n      <Button variant="solid" tone="primary">Get Started</Button>\n`;
  }
  
  if (blocks.includes("appShell.sidebar")) {
    content += `    </AppShell>\n`;
  } else {
    // Add basic content if no blocks
    if (!blocks.includes("table.listPage") && !blocks.includes("form.editPage")) {
      content += `      <Heading level={1}>${pageName.charAt(0).toUpperCase() + pageName.slice(1)}</Heading>\n      <Text>Welcome to ${pageName} page</Text>\n      <Button variant="solid" tone="primary">Get Started</Button>\n`;
    }
    content += `    </div>\n  );\n`;
  }
  
  content += `}\n`;
  
  return imports + content;
}

function emitStyles(
  app: BuildPlan["apps"][0],
  appDir: string
): void {
  const isMarketing = app.name === "marketing-web";
  const stylesDir = join(appDir, "src", "styles");
  mkdirSync(stylesDir, { recursive: true });
  
  if (isMarketing) {
    // Tailwind config
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */\nmodule.exports = {\n  content: [\n    "./src/**/*.{js,ts,jsx,tsx,mdx}",\n    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",\n    "../../packages/blocks/src/**/*.{js,ts,jsx,tsx}",\n  ],\n  theme: { extend: {} },\n  plugins: [],\n};\n`;
    writeFileSync(join(appDir, "tailwind.config.js"), tailwindConfig);
    
    // PostCSS config
    const postcssConfig = `module.exports = {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n};\n`;
    writeFileSync(join(appDir, "postcss.config.js"), postcssConfig);
  }
  
  // Global styles
  const globals = isMarketing
    ? `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@import "@atomic-ai/tokens/css";\n`
    : `@import "@atomic-ai/tokens/css";\n`;
  
  writeFileSync(join(stylesDir, "globals.css"), globals);
}

function emitEnvFile(
  app: BuildPlan["apps"][0],
  appDir: string
): void {
  const adapter = app.adapter.toUpperCase();
  const envContent = `UI_ADAPTER=${app.adapter}\n`;
  writeFileSync(join(appDir, ".env.local"), envContent);
}

