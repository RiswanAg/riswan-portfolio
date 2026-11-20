# Deployment

## How the site is deployed today

Checked on 2026-11-20 through the GitHub API (read-only):

- **Host:** Vercel, project `riswan-portfolio` under the Vercel team `riswanportfolio`.
- **Trigger:** Vercel's GitHub integration on [RiswanAg/riswan-portfolio](https://github.com/RiswanAg/riswan-portfolio). Each push to `main` creates a **Production** deployment (created by `vercel[bot]`; the latest one is commit `e8cd928`). Pushes to other branches and pull requests get **Preview** deployments.
- **Production URL:** https://riswan-portfolio.vercel.app (also set as the repo homepage).
- **Build:** Vercel's Next.js preset (`npm install`, then `next build`). There is no `vercel.json`, so no custom config is needed.
- **Env vars:** none are required. `NEXT_PUBLIC_SITE_URL` is optional (see below).

## Release checklist

1. **Merge the topic branches** into `main` locally and fix any conflicts.
2. **Verify locally:**
   ```bash
   npm ci
   npm run lint
   npm run build
   npm run start   # check http://localhost:3000
   ```
   Spot-check: `/robots.txt`, `/sitemap.xml`, `/opengraph-image`, one `/projects/<slug>` page, and `/projects/<slug>/opengraph-image`.
3. **(Optional) Preview first:** push a branch, `git push origin <branch>`, and open the Preview URL Vercel posts on the commit or PR. Previews are `noindex` by design.
4. **Ship:** `git push origin main`. Vercel builds and promotes the deployment to production automatically, usually within 1–2 minutes. Watch it at vercel.com → riswanportfolio → riswan-portfolio → Deployments, or with `gh api repos/RiswanAg/riswan-portfolio/commits/main/status`.
5. **After it's live:**
   - Check the social cards with the [opengraph.xyz](https://www.opengraph.xyz/) or [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) preview for `https://riswan-portfolio.vercel.app`.
   - Validate structured data with Google's [Rich Results Test](https://search.google.com/test/rich-results).
   - In [Google Search Console](https://search.google.com/search-console), add the property `https://riswan-portfolio.vercel.app` (verify with the HTML-tag method, or set `verification.google` in `app/layout.tsx` metadata), then submit `https://riswan-portfolio.vercel.app/sitemap.xml`.
   - Run Lighthouse (Chrome DevTools → Lighthouse) on the home page and one project page.

## Rollback

In Vercel → Deployments, open the last good production deployment and choose **Instant Rollback**, or run `git revert` on the bad commit and push to `main`.

## Custom domain (later)

1. Add the domain in Vercel → Project → Settings → Domains and follow the DNS steps.
2. Set `NEXT_PUBLIC_SITE_URL=https://<domain>` for the Production environment. If the custom domain is the primary production domain, `VERCEL_PROJECT_PRODUCTION_URL` picks it up anyway, but the explicit variable is clearer.
3. Redeploy, then add the new domain as a property in Search Console.

## Notes

- **Vercel image optimization:** all images go through `next/image`, and Vercel's plan includes a monthly quota of image transformations. Keeping source images at 2560 px or smaller (see the README) keeps each transformation fast.
- **Video files are not in git:** `.gitignore` excludes `public/**/*.mp4`. Any `previewVideo` path in `lib/data.ts` therefore 404s in production unless the video is hosted elsewhere (YouTube, Vercel Blob) or the ignore rule is changed.
