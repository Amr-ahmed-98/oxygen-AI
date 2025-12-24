/**
 * ============================================
 * Web Writer - Next.js Project Generator
 * ============================================
 * 
 * Generates complete Next.js project from scaffold plan
 * ============================================
 */

import type { ScaffoldPlan, BuildPlan } from "../pipeline";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export interface WebWriterConfig {
  outputDir: string;
  appDir: boolean; // Next.js 13+ app directory
  useTypeScript: boolean;
  useTailwind: boolean;
  packageManager: "npm" | "yarn" | "pnpm";
}

export async function writeWebProject(
  scaffoldPlan: ScaffoldPlan,
  buildPlan: BuildPlan,
  config: WebWriterConfig
): Promise<void> {
  const { outputDir } = config;
  
  // Create directory structure
  await mkdir(outputDir, { recursive: true });
  
  // Write package.json
  await writePackageJson(outputDir, config);
  
  // Write tsconfig.json (if TypeScript)
  if (config.useTypeScript) {
    await writeTsConfig(outputDir);
  }
  
  // Write Next.js config
  await writeNextConfig(outputDir, config);
  
  // Write Tailwind config (if enabled)
  if (config.useTailwind) {
    await writeTailwindConfig(outputDir);
  }
  
  // Write app directory structure
  if (config.appDir) {
    await writeAppDirectory(outputDir, buildPlan, config);
  } else {
    await writePagesDirectory(outputDir, buildPlan, config);
  }
  
  // Write API routes
  await writeApiRoutes(outputDir, buildPlan, config);
  
  // Write components
  await writeComponents(outputDir, buildPlan, config);
  
  // Write lib utilities
  await writeLibFiles(outputDir, buildPlan, config);
  
  // Write global styles
  await writeGlobalStyles(outputDir, config);
  
  console.log(`✅ Web project generated at: ${outputDir}`);
}

async function writePackageJson(outputDir: string, config: WebWriterConfig): Promise<void> {
  const packageJson = {
    name: "generated-app",
    version: "1.0.0",
    private: true,
    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
      lint: "next lint"
    },
    dependencies: {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      next: "^14.0.0",
      ...(config.useTailwind && {
        tailwindcss: "^3.3.0",
        autoprefixer: "^10.4.16",
        postcss: "^8.4.31"
      })
    },
    devDependencies: {
      ...(config.useTypeScript && {
        typescript: "^5.3.0",
        "@types/react": "^18.2.0",
        "@types/react-dom": "^18.2.0",
        "@types/node": "^20.10.0"
      }),
      eslint: "^8.54.0",
      "eslint-config-next": "^14.0.0"
    }
  };
  
  await writeFile(
    join(outputDir, "package.json"),
    JSON.stringify(packageJson, null, 2)
  );
}

async function writeTsConfig(outputDir: string): Promise<void> {
  const tsconfig = {
    compilerOptions: {
      target: "ES2020",
      lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      forceConsistentCasingInFileNames: true,
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
        "@/*": ["./*"]
      }
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    exclude: ["node_modules"]
  };
  
  await writeFile(
    join(outputDir, "tsconfig.json"),
    JSON.stringify(tsconfig, null, 2)
  );
}

async function writeNextConfig(outputDir: string, config: WebWriterConfig): Promise<void> {
  const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
`;
  
  await writeFile(
    join(outputDir, "next.config.js"),
    nextConfig
  );
}

async function writeTailwindConfig(outputDir: string): Promise<void> {
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
`;
  
  await writeFile(
    join(outputDir, "tailwind.config.js"),
    tailwindConfig
  );
  
  const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;
  
  await writeFile(
    join(outputDir, "postcss.config.js"),
    postcssConfig
  );
}

async function writeAppDirectory(
  outputDir: string,
  buildPlan: BuildPlan,
  config: WebWriterConfig
): Promise<void> {
  const appDir = join(outputDir, "app");
  await mkdir(appDir, { recursive: true });
  
  // Write layout.tsx
  const layout = config.useTypeScript ? `export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
` : `export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
`;
  
  await writeFile(
    join(appDir, "layout.tsx"),
    layout
  );
  
  // Write page.tsx
  const page = config.useTypeScript ? `export default function Home() {
  return (
    <main>
      <h1>Welcome</h1>
    </main>
  )
}
` : `export default function Home() {
  return (
    <main>
      <h1>Welcome</h1>
    </main>
  )
}
`;
  
  await writeFile(
    join(appDir, "page.tsx"),
    page
  );
}

async function writePagesDirectory(
  outputDir: string,
  buildPlan: BuildPlan,
  config: WebWriterConfig
): Promise<void> {
  const pagesDir = join(outputDir, "pages");
  await mkdir(pagesDir, { recursive: true });
  
  const index = config.useTypeScript ? `export default function Home() {
  return (
    <main>
      <h1>Welcome</h1>
    </main>
  )
}
` : `export default function Home() {
  return (
    <main>
      <h1>Welcome</h1>
    </main>
  )
}
`;
  
  await writeFile(
    join(pagesDir, "index.tsx"),
    index
  );
}

async function writeApiRoutes(
  outputDir: string,
  buildPlan: BuildPlan,
  config: WebWriterConfig
): Promise<void> {
  // TODO: Generate API routes from backend spec
  const apiDir = config.appDir
    ? join(outputDir, "app", "api")
    : join(outputDir, "pages", "api");
  
  await mkdir(apiDir, { recursive: true });
}

async function writeComponents(
  outputDir: string,
  buildPlan: BuildPlan,
  config: WebWriterConfig
): Promise<void> {
  const componentsDir = join(outputDir, "components");
  await mkdir(componentsDir, { recursive: true });
  
  // TODO: Generate components from build plan
}

async function writeLibFiles(
  outputDir: string,
  buildPlan: BuildPlan,
  config: WebWriterConfig
): Promise<void> {
  const libDir = join(outputDir, "lib");
  await mkdir(libDir, { recursive: true });
  
  // Write API client
  const apiClient = `export const apiClient = {
  async get(url: string) {
    const res = await fetch(url);
    return res.json();
  },
  async post(url: string, data: any) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
`;
  
  await writeFile(
    join(libDir, "api-client.ts"),
    apiClient
  );
}

async function writeGlobalStyles(
  outputDir: string,
  config: WebWriterConfig
): Promise<void> {
  const stylesDir = config.appDir
    ? join(outputDir, "app")
    : join(outputDir, "styles");
  
  await mkdir(stylesDir, { recursive: true });
  
  const globalCss = config.useTailwind
    ? `@tailwind base;
@tailwind components;
@tailwind utilities;
`
    : `* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
}
`;
  
  const cssPath = config.appDir
    ? join(stylesDir, "globals.css")
    : join(stylesDir, "globals.css");
  
  await writeFile(cssPath, globalCss);
}

