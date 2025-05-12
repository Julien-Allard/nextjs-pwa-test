import type { NextConfig } from "next";

export interface PWAConfig {
  /**
   * Output directory for the generated service worker and precache manifest.
   * @default "public"
   */
  dest?: string;
  /** Auto‑register the SW in the client. @default true */
  register?: boolean;
  /** Force new SW activation on install. @default true */
  skipWaiting?: boolean;
  /** Disable the plugin in development. @default process.env.NODE_ENV === "development" */
  disable?: boolean;

  /** exclude these globs or RegExps from the precache manifest */
  buildExcludes?: Array<string | RegExp>;
  /** exclude these public/ files from precaching via simple globs */
  publicExcludes?: string[];
  /** custom service worker filename (default: "sw.js") */
  sw?: string;
  /** URL scope for the SW (default: "/" or your basePath) */
  scope?: string;
  /** runtimeCaching rules for Workbox */
  runtimeCaching?: unknown[];
  /** cacheOnFrontEndNav option */
  cacheOnFrontEndNav?: boolean;
  /** reload page when online after being offline */
  reloadOnOnline?: boolean;
  /** directory for your own custom worker stubs (InjectManifest mode) */
  customWorkerDir?: string;

  /** allow any other plugin‑specific options */
  [key: string]: unknown;
}

declare module "next-pwa" {
  /**
   * Wrap your NextConfig to add PWA support.
   */
  function nextPWA(
    pwaOptions: PWAConfig
  ): (nextConfig: NextConfig) => NextConfig;

  export default nextPWA;
}
