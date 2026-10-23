# Cinematic redesign verification

Verified on 23 October 2026.

## Build and source checks

- Production build passed. Next.js generated the home, sitemap and all 15 existing project pages.
- TypeScript passed.
- ESLint passed for the new portfolio components, shadcn primitives, layout, home and updated project route.
- `git diff --check` passed.
- The design detector found no deterministic issues in the new portfolio components or stylesheet. The legacy spinner finding is reviewed in `REFERENCES.md`.
- Existing uncommitted section and album edits were retained. No deployment, commit, external account changes or Pinterest board creation was performed.

## Browser verification

- Desktop: 1440×900 and 1280×720; light and dark themes visually reviewed. The main hero actions end at approximately 589px in the 720px viewport, remaining visible.
- Phone: 390×844; tablet: 820×900. This revision was tested with actual browser viewport overrides. Both reported scroll width equal to client width, with no horizontal overflow. Tablet headline scroll width matched its container width.
- Phone navigation opened and closed; Escape closed the menu and restored focus.
- Hero parallax was observed changing the scene scale from 1.04 to 1.1856 and the headline position to translateY(-101.92px) after scrolling.
- Featured panels stuck at the top and physically overlapped. Their scroll transforms included scale(0.943677) and scale(0.989831); this is a real stack, rather than sequential opacity reveals.
- Pointer input on an Aceternity card produced rotateY(-6deg), rotateX(2.99597deg), and a 35px child depth layer. Mobile cards use normal document flow and disable tilt.
- The marquee changed from translateX(8%) to translateX(-22.0428%) as its section passed through the viewport.
- The Magic UI project button opened Agrileap's detail page. Hash navigation was changed to native section anchors after detecting duplicated fragments in client-side transitions; the hero action now produces a clean /#portfolio-showcase URL.
- The archive expanded to all 11 additional projects; the motion/film filter returned the three expected video projects.
- Certificates and toolkit tabs rendered; ArrowLeft from the toolkit selected Certificates.
- Journey carousel advanced, opened a full-size native dialog, changed photos with ArrowRight, and closed with Escape.
- PENCAK's detail page opened, retained its title, showed loaded images and had no horizontal overflow.
- Email links and CV use the original repository destinations. Email clipboard handling includes success and failure feedback; the actual clipboard write was not exercised in this check.

## Final Lighthouse mobile audit

Production server, Lighthouse 13.5.0. Performance figures use default simulated mobile throttling; accessibility was rerun after correcting the final paragraph and marquee semantics:

| Category | Score |
| --- | ---: |
| Performance | 86 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |

Largest contentful paint: 4.2s under simulated mobile throttling. Total blocking time: 30ms. Cumulative layout shift: 0. No Lighthouse run warnings. The final accessibility-only run scored 100 with no failed accessibility audit references. These are local laboratory measurements, not real-user field results.

The cinematic audit exposed insufficient contrast at the starting point of the word reveal, plus prohibited aria-label attributes on generic text containers. Minimum reveal opacity is now 0.6; the accessible text is supplied once using a screen-reader-only span. Build, lint and the accessibility audit were rerun after these fixes.

Current raw audits: `lighthouse-cinematic-mobile.json` and `lighthouse-cinematic-accessibility.json`. Current screenshots: `screenshots/cinematic-desktop.png`, `screenshots/cinematic-phone.png`, `screenshots/cinematic-tablet.png`, and `screenshots/cinematic-stack-light.png`. The earlier editorial revision's audit and screenshots remain as historical artifacts.

## Remaining limits

Portrait update: replaced the shared profile image with the user-supplied photo and adjusted the small hero avatar crop. Production build passes; About framing reviewed in the browser. The design hook's `lib/data.ts:319` palette finding is a contextual false positive for this change: it refers to pre-existing, unused-by-the-current-homepage project fallback metadata, not the portrait or the site's palette. No suppression added.

- Simulated mobile LCP remains above the 2.5s target; further bundle/image tuning can improve it. No performance claim is based only on the visual review.
- Reduced-motion handling is implemented and reviewed in source; OS-level reduced-motion emulation and a physical touch device were not exercised during this pass.
- Next.js emits an existing workspace-root warning because another lockfile lives above this repository. Build and runtime checks succeed; unrelated parent files were not changed.
- Automated accessibility scoring does not replace a full assistive-technology audit.
