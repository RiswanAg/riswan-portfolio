# Riswan Hamua · Portfolio

Personal portfolio of **Riswan Hamua**, web developer and AI engineer. It covers selected projects (web, AI/computer vision, VR and games), skills, education, awards and contact links.

**Hosting:** Cloudflare Workers (see [`docs/DEPLOY.md`](docs/DEPLOY.md)).

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) with React 19 and TypeScript
- Tailwind CSS v4, plus hand-written CSS in `app/*.css`
- [Framer Motion](https://motion.dev) for scroll and hover motion
- [Spline](https://spline.design) 3D scene in the hero (desktop only, lazy-loaded)
- Radix UI primitives and Lucide icons
- Hosted on [Cloudflare Workers](https://workers.cloudflare.com) via [OpenNext](https://opennext.js.org/cloudflare)

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev     # http://localhost:3000
```

| Script          | What it does                                  |
| --------------- | --------------------------------------------- |
| `npm run dev`   | Start the dev server with hot reload          |
| `npm run build` | Production build (type-checks and prerenders) |
| `npm run start` | Serve the production build                    |
| `npm run lint`  | Run ESLint                                    |

## Project structure

```
app/
  layout.tsx                 Root layout: fonts, site metadata, Person JSON-LD
  page.tsx                   Home page
  projects/[slug]/           Project detail pages (statically generated)
    opengraph-image.tsx      Per-project social card
  opengraph-image.tsx        Site social card (also twitter-image.tsx)
  sitemap.ts, robots.ts      sitemap.xml and robots.txt
  icon.png, apple-icon.png, favicon.ico
components/
  portfolio/                 Home page sections
  sections/, ui/             Shared sections and UI components
lib/
  data.ts                    All page content: profile, projects, skills, journey, contacts
  site.ts                    SEO config: canonical URL, site title/description, JSON-LD
  og.tsx                     Renderer for the generated social cards
assets/og/                   Font and portrait used by the social cards
public/                      Images, certificates and the CV
docs/                        Design notes and the deployment guide
```

## Editing content

All copy and project data live in [`lib/data.ts`](lib/data.ts). To add a project, add an entry to `PROJECTS` and put its images under `public/projects/<slug>/`. The detail page, sitemap entry, social card and structured data are all generated from that entry.

Keep source images at most about 2560 px on the long side. `next/image` resizes them for each screen, but huge originals slow down the first optimization and bloat the repo.

## SEO

- Metadata (title template, description, Open Graph, Twitter cards, canonical URLs) is set in `app/layout.tsx` and in `generateMetadata` on project pages.
- The canonical origin comes from `lib/site.ts`, in this order: the `NEXT_PUBLIC_SITE_URL` env var, then Vercel's production domain (`VERCEL_PROJECT_PRODUCTION_URL`), then `http://localhost:3000`. On Cloudflare, set `NEXT_PUBLIC_SITE_URL` as a build variable.
- Vercel preview deployments are `noindex` and their robots.txt disallows everything, so only production is indexed.
- Social cards are generated with `next/og`, using the site palette and display font. The font and portrait are embedded in `lib/og-assets.ts` (regenerate with `node scripts/gen-og-assets.mjs`).
- Structured data: `Person` + `WebSite` on every page, and `CreativeWork` + `BreadcrumbList` on project pages.

## Deployment

The site runs on Cloudflare Workers through the OpenNext adapter. Once the repo is connected in the Cloudflare dashboard, every push to `main` deploys to production. `npm run cf:preview` runs the Workers build locally. See [`docs/DEPLOY.md`](docs/DEPLOY.md) for setup and the checklist.
