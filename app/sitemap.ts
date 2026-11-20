import type { MetadataRoute } from "next";
import { PROFILE, PROJECTS } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

// Prerendered at build time, so `lastModified` is the last deploy.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl(PROFILE.image)],
    },
    ...PROJECTS.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: project.featured ? 0.8 : 0.6,
      images: [absoluteUrl(project.image)],
    })),
  ];
}
