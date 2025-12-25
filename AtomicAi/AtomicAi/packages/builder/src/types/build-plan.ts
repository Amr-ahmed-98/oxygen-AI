/**
 * ============================================
 * Build Plan Types - Hybrid System
 * ============================================
 */

export type Adapter = "antd" | "shadcn";
export type Persona = "enterprise" | "minimal" | "neon" | "glass" | "startup" | "dark" | "colorful" | "elegant" | "modern" | "playful";
export type Platform = "web" | "mobile" | "desktop";
export type WebFramework = "react" | "vue" | "svelte" | "angular";
export type MobileFramework = "react-native" | "flutter" | "swiftui" | "compose";
export type DesktopFramework = "electron" | "tauri" | "maui" | "wails";
export type BackendPack = "node" | "python" | "dotnet" | "java" | "php";

export interface BuildPlan {
  target: "hybrid" | "erp" | "marketing";
  platform: Platform;
  persona: Persona;
  rtl?: boolean;
  webFramework?: WebFramework;
  mobileFramework?: MobileFramework;
  desktopFramework?: DesktopFramework;
  backendPack?: BackendPack;
  apps: AppConfig[];
  atoms: AtomConfig;
  blocks: BlockConfig;
}

export interface AppConfig {
  name: string;
  platform: Platform;
  adapter: Adapter;
  framework?: WebFramework | MobileFramework | DesktopFramework;
  pages: string[];
  routes?: string[];
  blocks?: string[];
}

export interface AtomConfig {
  button?: { variantId: string };
  textField?: { variantId: string };
  select?: { variantId: string };
  [key: string]: { variantId: string } | undefined;
}

export interface BlockConfig {
  marketing?: string[];
  erp?: string[];
}

