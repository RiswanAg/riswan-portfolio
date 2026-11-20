# Deployment (Cloudflare Workers)

The site runs on Cloudflare Workers through the [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare).
Every page, sitemap and social card is prerendered at build time. Only the guestbook API (`/api/guestbook`) runs per request.

| File | What it does |
|---|---|
| `wrangler.jsonc` | Worker name (`riswan-portfolio`), static assets, the Images binding for `next/image` |
| `open-next.config.ts` | Read-only cache served from static assets (no R2 or KV needed, because nothing uses ISR) |
| `package.json` scripts | `cf:build`, `cf:preview`, `cf:deploy`, `cf-typegen` |

The free Workers plan is enough. The compressed Worker is about 2.2 MB, under the free plan's 3 MB limit.

## First-time setup (Cloudflare dashboard)

1. Sign in at <https://dash.cloudflare.com> (create a free account if needed).
2. Go to **Workers & Pages → Create → Import a repository**, connect GitHub, and pick `RiswanAg/riswan-portfolio`.
3. Build settings:
   - **Build command:** `npx opennextjs-cloudflare build`
   - **Deploy command:** `npx opennextjs-cloudflare deploy`
   - **Production branch:** `main`
   - The project name must be `riswan-portfolio`, matching `name` in `wrangler.jsonc`.
4. Under **Settings → Build → Build variables and secrets**, add:
   - `NEXT_PUBLIC_SITE_URL` = your production URL, for example `https://riswan-portfolio.<your-subdomain>.workers.dev` or your own domain.

   It's needed at **build** time because canonical URLs, the sitemap and social cards are baked into the build. Without it they point to `http://localhost:3000`.
5. Save and deploy. After the first deploy, the URL appears on the Worker's overview page. If you didn't know it at step 4, set the variable now and redeploy.

From then on, every push to `main` deploys to production. Other branches get preview URLs if you turn that on under **Settings → Build → Branch control**.

## Guestbook secrets (optional)

Under the Worker's **Settings → Variables and secrets** (runtime), add these as **Secret** values:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Until they're set, the guestbook shows "opens soon" and the rest of the site works normally. See `docs/guestbook-setup.md`.

## Custom domain

Go to **Worker → Settings → Domains & Routes → Add → Custom domain**. The domain's DNS must be on Cloudflare (free). Then update `NEXT_PUBLIC_SITE_URL` to the new domain and redeploy.

## Local checks before shipping

```bash
npm ci
npm run lint
npm run build          # plain Next.js build
npm run cf:preview     # Workers build + local preview on http://localhost:8787
```

Spot-check `/`, one `/projects/<slug>` page, `/opengraph-image`, `/projects/<slug>/opengraph-image`, `/sitemap.xml` and `/robots.txt`.

Deploying from your own machine is optional: `npx wrangler login`, then `npm run cf:deploy`. The dashboard's Git integration does the same thing on every push.

## After it's live

- Check social cards with [opengraph.xyz](https://www.opengraph.xyz/) or LinkedIn's Post Inspector.
- Validate structured data with Google's [Rich Results Test](https://search.google.com/test/rich-results).
- Add the production URL as a property in [Google Search Console](https://search.google.com/search-console) and submit `<url>/sitemap.xml`.

## Rollback

Go to **Worker → Deployments**, pick the last good version and choose **Rollback**. Or `git revert` the bad commit and push to `main`.

## Notes

- **Images:** `next/image` resizes through Cloudflare Images (the `IMAGES` binding). The free plan includes a monthly allowance of transformations, which is plenty for a portfolio.
- **Social card assets:** the font and portrait used by `lib/og.tsx` are embedded in `lib/og-assets.ts`, because Workers has no filesystem. After changing a file in `assets/og/`, run `node scripts/gen-og-assets.mjs`.
- **Adding ISR later:** if a page ever uses `revalidate`, switch `open-next.config.ts` to the R2 incremental cache (see the OpenNext caching docs).
- **Next.js version:** the adapter supports Next `>=16.4.5`. Check its peer range before upgrading Next.
- **Vercel:** the old Vercel project (team `riswanportfolio`) is still connected to the repo and redeploys on every push. Disconnect it in Vercel → Project → Settings → Git once Cloudflare is live. https://riswan-portfolio.vercel.app is **not** this site: it belongs to someone else.
- **Videos:** `.gitignore` excludes `public/**/*.mp4`, so any `previewVideo` path in `lib/data.ts` 404s in production unless the video is hosted elsewhere.
