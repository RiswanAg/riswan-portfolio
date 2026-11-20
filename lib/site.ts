// ─── Site-wide SEO config ───────────────────────────────────────────────────
// One place for the canonical URL and the facts search engines and social
// cards read. Page copy stays in `lib/data.ts`; this file only describes the
// site itself.

import { CONTACTS, PROFILE, type Project } from "@/lib/data";

/**
 * Canonical origin, without a trailing slash.
 *
 * Order: an explicit `NEXT_PUBLIC_SITE_URL` (set this when a custom domain is
 * added), then Vercel's production domain for the project (set automatically
 * at build time on Vercel), then the current production URL.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://riswan-portfolio.vercel.app")
).replace(/\/+$/, "");

/** Preview deployments must not compete with production in search results. */
export const IS_INDEXABLE = process.env.VERCEL_ENV !== "preview";

export const SITE_NAME = `${PROFILE.name} Portfolio`;
export const SITE_TITLE = `${PROFILE.name} | Web Developer & AI Engineer`;
export const SITE_DESCRIPTION =
  "Portfolio of Riswan Hamua, a web developer and AI engineer from UTeM, Malaysia. Websites, interactive applications, computer vision and machine learning projects.";

export const SITE_KEYWORDS = [
  PROFILE.name,
  "Web Developer",
  "AI Engineer",
  "Web Development",
  "Next.js",
  "React",
  "TypeScript",
  "Machine Learning",
  "Computer Vision",
  "Interactive Applications",
  "UTeM",
  "Malaysia",
  "Portfolio",
];

/** Absolute URL for a site path ("/projects/x" → "https://…/projects/x"). */
export function absoluteUrl(path = "/"): string {
  return new URL(path, `${SITE_URL}/`).toString();
}

/** Public profile links (GitHub, LinkedIn, …) for `sameAs`. */
export const SAME_AS = CONTACTS.map((c) => c.href).filter((href) =>
  href.startsWith("https://")
);

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Shorten copy for `<meta name="description">` (~160 characters). */
export function metaDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}

/** Person + WebSite graph for the root layout. */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: PROFILE.name,
        url: SITE_URL,
        image: absoluteUrl(PROFILE.image),
        jobTitle: "Web Developer & AI Engineer",
        description: PROFILE.tagline,
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Universiti Teknikal Malaysia Melaka (UTeM)",
          url: "https://www.utem.edu.my",
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "MY",
        },
        knowsAbout: [
          "Web Development",
          "AI Engineering",
          "Machine Learning",
          "Computer Vision",
          "Python",
          "TypeScript",
          "React",
          "Next.js",
          "Interactive Applications",
        ],
        sameAs: SAME_AS,
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        inLanguage: "en",
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
      },
    ],
  };
}

/** CreativeWork + breadcrumb graph for a project detail page. */
export function projectJsonLd(project: Project) {
  const url = absoluteUrl(`/projects/${project.slug}`);
  const sameAs = [project.github, project.demo].filter(
    (href) => href && href !== "#" && href.startsWith("http")
  );
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        name: project.title,
        url,
        description: project.description,
        image: absoluteUrl(project.image),
        keywords: project.tech.join(", "),
        creator: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: project.title, item: url },
        ],
      },
    ],
  };
}

/** Serialize JSON-LD for a `<script>` tag, escaping `<` against injection. */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
