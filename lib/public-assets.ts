// Server-only helpers (node:fs). Import from server components and route handlers only.
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

const PUBLIC_DIR = path.join(process.cwd(), "public");

/** True when a site path such as "/journey/x/1.jpg" exists under /public. */
export function publicFileExists(src: string): boolean {
  if (!src.startsWith("/")) return true; // remote URLs are trusted as given
  return existsSync(path.join(PUBLIC_DIR, src));
}

/** Keeps only the paths that exist under /public, in their original order. */
export function existingPublicFiles(paths: string[]): string[] {
  return paths.filter(publicFileExists);
}

/** Image files in a /public sub-folder, as site paths, sorted by name. */
export function publicImagesIn(folder: string): string[] {
  const dir = path.join(PUBLIC_DIR, folder);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((file) => `/${folder}/${file}`.replace(/\\/g, "/"));
}
