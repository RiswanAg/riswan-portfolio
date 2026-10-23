# Portfolio redesign references

Research date: 23 October 2026.

## Direction

A personal portfolio for a game and immersive technology developer, intended for recruiters and collaborators. The current revision takes a cinematic game-title-screen direction: full-bleed Sneak Out artwork, orange condensed display type, a physical project deck and scroll-driven project storytelling. Page content supports light and charcoal themes.

Design settings: variance 8/10, motion 8/10, density 4/10. The user explicitly requested a more ambitious animated redesign after the first restrained version. The current implementation includes parallax, a sticky project stack, text reveal, scroll-driven marquee, 3D cards and expanding-dot buttons. Native scrolling remains available throughout.

## Pinterest collection

- [Creative developer / editorial portfolio search](https://www.pinterest.com/search/pins/?q=creative%20developer%20portfolio%20editorial%20website): visually reviewed the publicly visible results. Combined the prominent typography, irregular project presentation and restrained navigation. Pinterest presents a login wall for deeper browsing; no private boards were accessed or created.
- [Web Developer Portfolio / Minimal website inspiration](https://in.pinterest.com/pin/840132505522648891/): minimal developer presentation and clear hierarchy.
- [Creative Editorial Design for Online Portfolio](https://ca.pinterest.com/pin/creative-editorial-design-for-online-portfolio--101682904071881302/): indexed research lead for editorial composition. Detail page was not accessible through the search tool.
- [Orange Crew landing page](https://in.pinterest.com/pin/capture-more-leads-with-our-orange-crew-landing-page-design-in-2025--300122762689756388/): indexed research lead for orange accents. Detail fetch returned 403; no claims about unviewed details.

These are research references, not assets copied into the portfolio. All portfolio imagery is from this repository.

## Component and interaction sources

- [Interactive Hover Button on 21st.dev](https://preview.21st.dev/@dillionverma/components/interactive-hover-button): the actual Magic UI registry source is now integrated, with link, accessibility and reduced-motion adaptations.
- [3D Card Effect on 21st.dev](https://mcp.21st.dev/@manuarora700/components/3d-card-effect): the actual Aceternity UI registry source is now integrated in the hero, featured cards and archive. See `21ST-COMPONENTS.md` for exact sources, local paths and preserved upstream snapshots.
- [shadcn/ui Button](https://ui.shadcn.com/docs/components/button) and [official Button registry](https://ui.shadcn.com/r/styles/new-york-v4/button.json): official source added to `components/ui/button.tsx`; colours, sizing and shape are customised through the portfolio styles.
- [Official shadcn/ui Tabs registry](https://ui.shadcn.com/r/styles/new-york-v4/tabs.json): official source added to `components/ui/tabs.tsx`, backed by `radix-ui`. Keeps keyboard navigation, tab semantics and selection state.
- [Tailwind CSS](https://tailwindcss.com/docs): existing v4 setup retained for layout, responsive utilities and component styling.

## Existing-site audit and preservation

The original interface used cool navy/teal tokens, amber CTAs, geometric headings, a HUD status chip, ambient washes and a Spline robot. The current redesign builds its visual world from actual game artwork and purposeful scroll motion. The RH wordmark, professional identity, original project records, project URLs, section anchor IDs, CV, contacts, qualifications, awards and photo album behaviour remain.

Pre-existing uncommitted edits in `app/globals.css`, `components/sections/Journey.tsx`, `components/sections/Navbar.tsx`, `components/sections/PortfolioShowcase.tsx`, and the new JourneyAlbum are preserved. The new home uses the existing Journey and JourneyAlbum directly.

## Detector finding review

The detector's `border-accent-on-rounded` finding at `app/globals.css:298` is a false positive: `.loader` is a circular loading spinner for the older Spline component. Its partial border communicates rotation; it is not a rounded card with an accent border. The redesigned home does not mount that Spline component. Kept the functional spinner unchanged and added no ignore rules.
