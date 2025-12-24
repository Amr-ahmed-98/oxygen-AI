/**
 * ============================================
 * Mobile Writer - Expo React Native Generator
 * ============================================
 * 
 * Generates complete Expo project from scaffold plan
 * ============================================
 */

import type { ScaffoldPlan, BuildPlan } from "../pipeline";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export interface MobileWriterConfig {
  outputDir: string;
  useTypeScript: boolean;
  useNativeWind: boolean;
  packageManager: "npm" | "yarn" | "pnpm";
}

export async function writeMobileProject(
  scaffoldPlan: ScaffoldPlan,
  buildPlan: BuildPlan,
  config: MobileWriterConfig
): Promise<void> {
  const { outputDir } = config;
  
  // Create directory structure
  await mkdir(outputDir, { recursive: true });
  
  // Write package.json
  await writePackageJson(outputDir, config);
  
  // Write app.json (Expo config)
  await writeAppJson(outputDir, config);
  
  // Write tsconfig.json (if TypeScript)
  if (config.useTypeScript) {
    await writeTsConfig(outputDir);
  }
  
  // Write NativeWind config (if enabled)
  if (config.useNativeWind) {
    await writeNativeWindConfig(outputDir);
  }
  
  // Write app directory (Expo Router)
  await writeAppDirectory(outputDir, buildPlan, config);
  
  // Write components
  await writeComponents(outputDir, buildPlan, config);
  
  // Write lib utilities
  await writeLibFiles(outputDir, buildPlan, config);
  
  // Write babel config
  await writeBabelConfig(outputDir, config);
  
  console.log(`✅ Mobile project generated at: ${outputDir}`);
}

async function writePackageJson(outputDir: string, config: MobileWriterConfig): Promise<void> {
  const packageJson = {
    name: "generated-mobile-app",
    version: "1.0.0",
    main: "expo-router/entry",
    scripts: {
      start: "expo start",
      android: "expo start --android",
      ios: "expo start --ios",
      web: "expo start --web"
    },
    dependencies: {
      "expo": "~49.0.0",
      "expo-router": "^2.0.0",
      "react": "18.2.0",
      "react-native": "0.72.6",
      "@react-navigation/native": "^6.1.0",
      ...(config.useNativeWind && {
        "nativewind": "^4.0.0",
        "tailwindcss": "^3.3.0"
      })
    },
    devDependencies: {
      ...(config.useTypeScript && {
        "typescript": "^5.3.0",
        "@types/react": "^18.2.0"
      }),
      ...(config.useNativeWind && {
        "tailwindcss-react-native": "^2.0.0"
      })
    }
  };
  
  await writeFile(
    join(outputDir, "package.json"),
    JSON.stringify(packageJson, null, 2)
  );
}

async function writeAppJson(outputDir: string, config: MobileWriterConfig): Promise<void> {
  const appJson = {
    expo: {
      name: "Generated Mobile App",
      slug: "generated-mobile-app",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/icon.png",
      userInterfaceStyle: "light",
      splash: {
        image: "./assets/splash.png",
        resizeMode: "contain",
        backgroundColor: "#ffffff"
      },
      assetBundlePatterns: [
        "**/*"
      ],
      ios: {
        supportsTablet: true
      },
      android: {
        adaptiveIcon: {
          foregroundImage: "./assets/adaptive-icon.png",
          backgroundColor: "#ffffff"
        }
      },
      web: {
        favicon: "./assets/favicon.png"
      },
      plugins: [
        "expo-router"
      ],
      scheme: "generated-app"
    }
  };
  
  await writeFile(
    join(outputDir, "app.json"),
    JSON.stringify(appJson, null, 2)
  );
}

async function writeTsConfig(outputDir: string): Promise<void> {
  const tsconfig = {
    extends: "expo/tsconfig.base",
    compilerOptions: {
      strict: true,
      paths: {
        "@/*": ["./*"]
      }
    },
    include: ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
  };
  
  await writeFile(
    join(outputDir, "tsconfig.json"),
    JSON.stringify(tsconfig, null, 2)
  );
}

async function writeNativeWindConfig(outputDir: string): Promise<void> {
  const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
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
}

async function writeAppDirectory(
  outputDir: string,
  buildPlan: BuildPlan,
  config: MobileWriterConfig
): Promise<void> {
  const appDir = join(outputDir, "app");
  await mkdir(appDir, { recursive: true });
  
  // Write _layout.tsx (root layout)
  const rootLayout = config.useTypeScript ? `import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
` : `import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
`;
  
  await writeFile(
    join(appDir, "_layout.tsx"),
    rootLayout
  );
  
  // Write (tabs) directory
  const tabsDir = join(appDir, "(tabs)");
  await mkdir(tabsDir, { recursive: true });
  
  // Write tabs _layout.tsx
  const tabsLayout = config.useTypeScript ? `import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
        }}
      />
    </Tabs>
  );
}
` : `import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
        }}
      />
    </Tabs>
  );
}
`;
  
  await writeFile(
    join(tabsDir, "_layout.tsx"),
    tabsLayout
  );
  
  // Write index.tsx
  const index = config.useTypeScript ? `import { View, Text } from 'react-native';

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Mobile App</Text>
    </View>
  );
}
` : `import { View, Text } from 'react-native';

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Mobile App</Text>
    </View>
  );
}
`;
  
  await writeFile(
    join(tabsDir, "index.tsx"),
    index
  );
}

async function writeComponents(
  outputDir: string,
  buildPlan: BuildPlan,
  config: MobileWriterConfig
): Promise<void> {
  const componentsDir = join(outputDir, "components");
  await mkdir(componentsDir, { recursive: true });
  
  // TODO: Generate components from build plan using platform-map
}

async function writeLibFiles(
  outputDir: string,
  buildPlan: BuildPlan,
  config: MobileWriterConfig
): Promise<void> {
  const libDir = join(outputDir, "lib");
  await mkdir(libDir, { recursive: true });
  
  // Write API client
  const apiClient = config.useTypeScript ? `export const apiClient = {
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
` : `export const apiClient = {
  async get(url) {
    const res = await fetch(url);
    return res.json();
  },
  async post(url, data) {
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

async function writeBabelConfig(outputDir: string, config: MobileWriterConfig): Promise<void> {
  const babelConfig = {
    presets: ["babel-preset-expo"],
    ...(config.useNativeWind && {
      plugins: ["nativewind/babel"]
    })
  };
  
  await writeFile(
    join(outputDir, "babel.config.js"),
    `module.exports = ${JSON.stringify(babelConfig, null, 2)};`
  );
}

