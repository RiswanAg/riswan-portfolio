import path from "node:path";
import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  // Pin the project root. Without this, a stray package-lock.json in a parent
  // folder (e.g. the user profile) makes Next.js pick the wrong workspace root.
  turbopack: {
    root: path.join(__dirname),
  },
  outputFileTracingRoot: path.join(__dirname),
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

export default nextConfig;

// Lets `next dev` use Cloudflare bindings (env vars, Images) locally.
// It does nothing during `next build`, and nothing on Vercel.
initOpenNextCloudflareForDev();
