"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Small seeded PRNG so server and client render identical point fields. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const POINTS = (() => {
  const rand = mulberry32(42);
  return Array.from({ length: 46 }, () => ({
    x: +(rand() * 100).toFixed(2),
    y: +(rand() * 100).toFixed(2),
    r: +(0.6 + rand() * 1.3).toFixed(2),
    t: +(3 + rand() * 6).toFixed(2),
    d: +(-rand() * 8).toFixed(2),
    warm: rand() > 0.82,
  }));
})();

/**
 * The visual layers of one screen of background, back to front:
 * aurora light fields → survey points (dark only) → contour lines with
 * scroll parallax → contour "torch" that follows the pointer → vignette →
 * grain. Colours come from the --bd-* tokens, so it follows whichever theme
 * scope it sits in. Pointer and scroll values arrive as CSS variables set by
 * useBackdropInput on an ancestor (see PageBackdrop).
 */
export function BackdropScene({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="bd-base absolute inset-0" />
      <div className="bd-aurora bd-aurora-a" />
      <div className="bd-aurora bd-aurora-b" />
      <svg className="bd-points absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {POINTS.map((p, i) => (
          <circle
            key={i}
            className="bd-point"
            cx={`${p.x}%`}
            cy={`${p.y}%`}
            r={p.r}
            fill={p.warm ? "#ffb703" : "#8ecae6"}
            style={{ ["--t" as string]: `${p.t}s`, ["--d" as string]: `${p.d}s` }}
          />
        ))}
      </svg>
      <div className="bd-halo absolute inset-0" />
      <div className="bd-contours absolute inset-0" />
      <div className="bd-glint absolute inset-0" />
      <div className="bd-vignette absolute inset-0" />
      <div className="bd-grain absolute inset-0" />
    </div>
  );
}

/**
 * Feeds --mx/--my/--spot (pointer torch) and --py (contour parallax) to the
 * element `target` points at. The torch only lights for fine pointers.
 */
export function useBackdropInput(target: React.RefObject<HTMLElement | null>, parallax = 0.12) {
  useEffect(() => {
    const el = target.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const top = el.getBoundingClientRect().top;
        el.style.setProperty("--py", `${(top * parallax).toFixed(1)}px`);
      });
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      el.style.setProperty("--mx", `${event.clientX}px`);
      el.style.setProperty("--my", `${event.clientY}px`);
      el.style.setProperty("--spot", "260px");
    };
    const onLeave = () => el.style.setProperty("--spot", "0px");

    if (!reduce) {
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }
    if (finePointer) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [target, parallax]);
}

/**
 * One continuous background for the whole home page, so no section ever
 * shows a seam. Two copies of the scene are stacked: the theme's own scene,
 * and a forced-dark one on top. The dark copy dissolves while the element
 * with id `fadeOutId` (the PORTFOLIO sweep) scrolls through, revealing the
 * light half. Without that element (reduced motion) it switches when the
 * `fallbackId` section reaches the middle of the screen.
 */
export function PageBackdrop({ fadeOutId, fallbackId }: { fadeOutId: string; fallbackId: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const darkLayer = useRef<HTMLDivElement>(null);
  useBackdropInput(ref);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const layer = darkLayer.current;
      if (!layer) return;
      const vh = window.innerHeight;
      const sweep = document.getElementById(fadeOutId);
      let opacity: number;
      if (sweep) {
        const box = sweep.getBoundingClientRect();
        const progress = (vh - box.top) / box.height; // 0 entering → 1 pinned end
        opacity = Math.min(1, Math.max(0, 1 - (progress - 0.45) / 0.35));
      } else {
        const next = document.getElementById(fallbackId);
        opacity = next && next.getBoundingClientRect().top < vh * 0.5 ? 0 : 1;
      }
      layer.style.opacity = opacity.toFixed(3);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [fadeOutId, fallbackId]);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="sticky top-0 h-svh">
        <BackdropScene />
        <div ref={darkLayer} className="dark absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none">
          <BackdropScene />
        </div>
      </div>
    </div>
  );
}
