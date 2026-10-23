# 21st.dev component integration

The motion revision uses actual published component implementations, adapted to this portfolio. It keeps all existing project routes and content.

## Interactive Hover Button

- Creator: Dillion Verma / Magic UI.
- 21st listing: https://preview.21st.dev/@dillionverma/components/interactive-hover-button
- Official registry: https://magicui.design/r/interactive-hover-button.json
- Local component: `components/ui/interactive-hover-button.tsx`.
- Used in the header, hero, featured project actions and archive expansion.
- Preserves the original expanding dot and opposing text/arrow transition. Adapted for Next.js links, download links, one accessible name, focus feedback, and reduced motion.
- Exact fetched source retained in `vendor/interactive-hover-button.upstream.txt`.

## 3D Card Effect

- Creator: Manu Arora / Aceternity UI.
- 21st listing: https://mcp.21st.dev/@manuarora700/components/3d-card-effect
- Official registry: https://ui.aceternity.com/registry/3d-card.json
- Local component: `components/ui/3d-card.tsx`.
- Used in the hero project deck, featured project stack and archive cards.
- Preserves the original perspective container, pointer-relative rotation, shared hover context and per-item translateZ layers. Adapted with bounded rotation, pointer-type checks, reduced-motion support and typed React props. Cursor coordinates never update React state.
- Exact fetched source retained in `vendor/3d-card.upstream.txt`.

Magic UI's 21st listing identifies its MIT licence. Aceternity's component is retrieved from its official public registry. Source attribution is retained in the local files; the original upstream snapshots are preserved alongside this note.

## Scroll choreography

- Hero artwork zoom, title parallax and foreground-deck parallax use Motion values tied to scroll progress.
- Manifesto words brighten in reading order with scroll.
- Featured project panels use real CSS sticky positioning with progress-driven scale. The next project physically overlaps the previous project; this is not a list of fade-in cards.
- One discipline marquee moves with scroll, rather than an endless autonomous loop.
- About, education and journey headings use viewport-triggered reveals.
- A fixed progress line reflects position in the full page.
- Mobile uses a normal project list, keeping all projects reachable without a pinned interaction. Reduced-motion mode removes the parallax, sticky stack and 3D tilt.

Design settings: variance 8/10, motion 8/10, density 4/10. Visual reference: a game title screen, a physical stack of game artwork, and a playable project showcase. Real local game imagery supplies the visual world.
