/**
 * ============================================
 * Desktop Writer - Tauri Generator
 * ============================================
 * 
 * Generates complete Tauri + React project from scaffold plan
 * Reuses web components with desktop shell
 * ============================================
 */

import type { ScaffoldPlan, BuildPlan } from "../pipeline";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export interface DesktopWriterConfig {
  outputDir: string;
  useTypeScript: boolean;
  useTailwind: boolean;
  packageManager: "npm" | "yarn" | "pnpm";
}

export async function writeDesktopProject(
  scaffoldPlan: ScaffoldPlan,
  buildPlan: BuildPlan,
  config: DesktopWriterConfig
): Promise<void> {
  const { outputDir } = config;
  
  // Create directory structure
  await mkdir(outputDir, { recursive: true });
  
  // Write package.json
  await writePackageJson(outputDir, config);
  
  // Write tauri.conf.json
  await writeTauriConfig(outputDir, config);
  
  // Write tsconfig.json (if TypeScript)
  if (config.useTypeScript) {
    await writeTsConfig(outputDir);
  }
  
  // Write Tailwind config (if enabled)
  if (config.useTailwind) {
    await writeTailwindConfig(outputDir);
  }
  
  // Write src directory (React app - reuse web structure)
  await writeSrcDirectory(outputDir, buildPlan, config);
  
  // Write tauri directory (Rust backend)
  await writeTauriDirectory(outputDir, config);
  
  // Write components (reuse web)
  await writeComponents(outputDir, buildPlan, config);
  
  // Write lib utilities
  await writeLibFiles(outputDir, buildPlan, config);
  
  console.log(`✅ Desktop project generated at: ${outputDir}`);
}

async function writePackageJson(outputDir: string, config: DesktopWriterConfig): Promise<void> {
  const packageJson = {
    name: "generated-desktop-app",
    version: "1.0.0",
    private: true,
    type: "module",
    scripts: {
      dev: "vite",
      build: "tsc && vite build",
      preview: "vite preview",
      tauri: "tauri",
      "tauri:dev": "tauri dev",
      "tauri:build": "tauri build"
    },
    dependencies: {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      "@tauri-apps/api": "^1.5.0",
      ...(config.useTailwind && {
        tailwindcss: "^3.3.0",
        autoprefixer: "^10.4.16",
        postcss: "^8.4.31"
      })
    },
    devDependencies: {
      "@tauri-apps/cli": "^1.5.0",
      "@vitejs/plugin-react": "^4.2.0",
      vite: "^5.0.0",
      ...(config.useTypeScript && {
        typescript: "^5.3.0",
        "@types/react": "^18.2.0",
        "@types/react-dom": "^18.2.0"
      }),
      ...(config.useTailwind && {
        tailwindcss: "^3.3.0",
        autoprefixer: "^10.4.16",
        postcss: "^8.4.31"
      })
    }
  };
  
  await writeFile(
    join(outputDir, "package.json"),
    JSON.stringify(packageJson, null, 2)
  );
}

async function writeTauriConfig(outputDir: string, config: DesktopWriterConfig): Promise<void> {
  const tauriConfig = {
    build: {
      beforeDevCommand: "npm run dev",
      beforeBuildCommand: "npm run build",
      devPath: "http://localhost:1420",
      distPath: "../dist",
      withGlobalTauri: false
    },
    package: {
      productName: "Generated Desktop App",
      version: "1.0.0"
    },
    tauri: {
      allowlist: {
        all: false,
        shell: {
          all: false,
          open: true
        },
        fs: {
          all: false,
          readFile: true,
          writeFile: true,
          readDir: true
        }
      },
      windows: [
        {
          title: "Generated Desktop App",
          width: 1200,
          height: 800,
          resizable: true,
          fullscreen: false
        }
      ],
      security: {
        csp: null
      }
    }
  };
  
  await writeFile(
    join(outputDir, "src-tauri", "tauri.conf.json"),
    JSON.stringify(tauriConfig, null, 2)
  );
}

async function writeTsConfig(outputDir: string): Promise<void> {
  const tsconfig = {
    compilerOptions: {
      target: "ES2020",
      useDefineForClassFields: true,
      lib: ["ES2020", "DOM", "DOM.Iterable"],
      module: "ESNext",
      skipLibCheck: true,
      moduleResolution: "bundler",
      allowImportingTsExtensions: true,
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: "react-jsx",
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noFallthroughCasesInSwitch: true
    },
    include: ["src"],
    references: [{ path: "./tsconfig.node.json" }]
  };
  
  await writeFile(
    join(outputDir, "tsconfig.json"),
    JSON.stringify(tsconfig, null, 2)
  );
}

async function writeTailwindConfig(outputDir: string): Promise<void> {
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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

async function writeSrcDirectory(
  outputDir: string,
  buildPlan: BuildPlan,
  config: DesktopWriterConfig
): Promise<void> {
  const srcDir = join(outputDir, "src");
  await mkdir(srcDir, { recursive: true });
  
  // Write main.tsx
  const main = config.useTypeScript ? `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
` : `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`;
  
  await writeFile(
    join(srcDir, "main.tsx"),
    main
  );
  
  // Write App.tsx
  const app = config.useTypeScript ? `import { useState } from 'react'

function App() {
  return (
    <div className="app">
      <h1>Welcome to Desktop App</h1>
    </div>
  )
}

export default App
` : `import { useState } from 'react'

function App() {
  return (
    <div className="app">
      <h1>Welcome to Desktop App</h1>
    </div>
  )
}

export default App
`;
  
  await writeFile(
    join(srcDir, "App.tsx"),
    app
  );
  
  // Write index.html
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Generated Desktop App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;
  
  await writeFile(
    join(outputDir, "index.html"),
    indexHtml
  );
  
  // Write vite.config.ts
  const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      ignored: ['**/src-tauri/**'],
    },
  },
})
`;
  
  await writeFile(
    join(outputDir, "vite.config.ts"),
    viteConfig
  );
}

async function writeTauriDirectory(
  outputDir: string,
  config: DesktopWriterConfig
): Promise<void> {
  const tauriDir = join(outputDir, "src-tauri");
  await mkdir(tauriDir, { recursive: true });
  
  // Write Cargo.toml (Rust package)
  const cargoToml = `[package]
name = "generated-desktop-app"
version = "1.0.0"
description = "Generated Desktop App"
authors = ["Generated"]
license = ""
repository = ""
edition = "2021"

[build-dependencies]
tauri-build = { version = "1.5", features = [] }

[dependencies]
tauri = { version = "1.5", features = [] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"

[features]
default = ["custom-protocol"]
custom-protocol = ["tauri/custom-protocol"]
`;
  
  await writeFile(
    join(tauriDir, "Cargo.toml"),
    cargoToml
  );
  
  // Write main.rs (Rust entry point)
  const mainRs = `#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn main() {
  tauri::Builder::default()
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
`;
  
  await writeFile(
    join(tauriDir, "src", "main.rs"),
    mainRs
  );
}

async function writeComponents(
  outputDir: string,
  buildPlan: BuildPlan,
  config: DesktopWriterConfig
): Promise<void> {
  const componentsDir = join(outputDir, "src", "components");
  await mkdir(componentsDir, { recursive: true });
  
  // TODO: Generate components from build plan (reuse web components)
}

async function writeLibFiles(
  outputDir: string,
  buildPlan: BuildPlan,
  config: DesktopWriterConfig
): Promise<void> {
  const libDir = join(outputDir, "src", "lib");
  await mkdir(libDir, { recursive: true });
  
  // Write API client (with Tauri support)
  const apiClient = config.useTypeScript ? `import { invoke } from '@tauri-apps/api/tauri';

export const apiClient = {
  async get(url: string) {
    // Use Tauri invoke for native calls, or fetch for web
    if (window.__TAURI__) {
      return invoke('api_get', { url });
    }
    const res = await fetch(url);
    return res.json();
  },
  async post(url: string, data: any) {
    if (window.__TAURI__) {
      return invoke('api_post', { url, data });
    }
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
` : `import { invoke } from '@tauri-apps/api/tauri';

export const apiClient = {
  async get(url) {
    if (window.__TAURI__) {
      return invoke('api_get', { url });
    }
    const res = await fetch(url);
    return res.json();
  },
  async post(url, data) {
    if (window.__TAURI__) {
      return invoke('api_post', { url, data });
    }
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

