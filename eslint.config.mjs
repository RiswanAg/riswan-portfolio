import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Cloudflare (OpenNext / Wrangler) build output.
    ".open-next/**",
    ".wrangler/**",
    "cloudflare-env.d.ts",
    // Vendored agent skills and tooling, not part of the site.
    ".agents/**",
    ".claude/**",
    ".codex/**",
    ".impeccable/**",
  ]),
]);

export default eslintConfig;
