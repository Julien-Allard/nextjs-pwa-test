import type { NextConfig } from "next";
import nextPWA from "next-pwa";

const withPWA = nextPWA({
  dest: "public",
  register: true, // auto-inject registration
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",

  additionalManifestEntries: [{ url: "/offline.html", revision: "v1" }],

  fallbacks: {
    document: "/offline.html",
  },

  buildExcludes: [
    /middleware-manifest\.json$/,
    /build-manifest\.json$/,
    /app-build-manifest\.json$/,
    /routes-manifest\.json$/,
  ],
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // …your existing Next.js options
};

export default withPWA(nextConfig);
