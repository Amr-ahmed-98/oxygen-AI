/**
 * ============================================
 * Adapter Resolution
 * ============================================
 * 
 * Determines which adapter to use (antd or shadcn)
 * Based on environment variable or build plan
 */

export type Adapter = "antd" | "shadcn";

let cachedAdapter: Adapter | null = null;

export function getAdapter(): Adapter {
  if (cachedAdapter) {
    return cachedAdapter;
  }

  // Check environment variable
  const envAdapter = process.env.UI_ADAPTER as Adapter;
  if (envAdapter === "antd" || envAdapter === "shadcn") {
    cachedAdapter = envAdapter;
    return cachedAdapter;
  }

  // Default to shadcn
  cachedAdapter = "shadcn";
  return cachedAdapter;
}

export function setAdapter(adapter: Adapter): void {
  cachedAdapter = adapter;
}

