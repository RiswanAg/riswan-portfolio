"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PROFILE, HERO_HIGHLIGHTS } from "@/lib/data";
import { ArrowRight, ChevronDown, Download } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { useMediaQuery } from "@/lib/use-media-query";
import { Component as EtherealShadow } from "@/components/ui/etheral-shadow";

// Cinematic ease-out, shared with the intro curtain for a continuous feel.
const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // Phones never mount the Spline scene (WebGL + ~2 MB runtime) and get a
  // static background instead of the animated SVG-filter shadow — both are
  // the main sources of mobile jank. `false` during SSR/hydration, so the
  // heavy work only ever starts on desktop-sized viewports.
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Essential hero content must remain visible even if motion never starts.
  // `initial={false}` below keeps the server-rendered and hydrated states safe.
  const container = {
    show: {
      transition: { staggerChildren: 0.09, delayChildren: 0.15 },
    },
  };
  const rise = {
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE },
    },
  };
  const nameLine = {
    show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
  };

  // Subtle parallax on the Spline scene — transform only, rAF-throttled.
  // Desktop only: the scene doesn't exist on mobile.
  useEffect(() => {
    if (!isDesktop) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (parallaxRef.current) {
          parallaxRef.current.style.transform = `translate3d(0, ${y * 0.06}px, 0)`;
        }
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isDesktop]);

  return (
    <section
      id="hero"
      className="relative flex min-h-dvh items-center overflow-hidden px-6 pt-20 sm:pt-24"
    >
      {/* Ambient background — animated shadow drift, tinted to the accent palette */}
      <div className="pointer-events-none absolute inset-0 opacity-40 dark:opacity-100">
        <EtherealShadow
          color="rgba(124, 92, 255, 0.5)"
          animation={
            reduceMotion || !isDesktop ? undefined : { scale: 60, speed: 80 }
          }
          noise={{ opacity: 0.35, scale: 1.2 }}
          sizing="fill"
        />
      </div>

      {/* Interactive Spline scene — desktop only. On phones the WebGL robot is
          the single biggest cause of lag, so it is never mounted there. */}
      {isDesktop && (
        <div
          ref={parallaxRef}
          className="absolute inset-y-0 right-0 md:w-[72%] lg:w-[62%] xl:w-[58%]"
        >
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="h-full w-full"
          />
        </div>
      )}

      {/* Legibility scrims — fade the scene into the page. They track the theme
          canvas (near-black in dark, light in light) so the text side stays
          readable whichever way the toggle is set. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-canvas/40 via-transparent to-canvas" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-canvas/70 via-canvas/20 to-transparent md:to-transparent" />

      {/* Text overlay keeps the Spline scene interactive except for the CTA row. */}
      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center py-10 sm:py-16 md:items-start">
        <motion.div
          className="w-full max-w-2xl text-center md:text-left"
          variants={container}
          initial={false}
          animate="show"
        >
          <motion.div
            variants={rise}
            className="hud-chip mb-5 inline-flex items-center gap-2.5 border border-accent/25 bg-gradient-to-br from-accent/[0.12] via-accent/[0.04] to-transparent px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-accent-strong backdrop-blur-sm sm:mb-7 sm:text-sm"
          >
            <span className="flex items-end gap-[3px]" aria-hidden="true">
              <span className="hud-bar h-1.5 w-[3px] bg-accent" />
              <span className="hud-bar h-2.5 w-[3px] bg-accent" />
              <span className="hud-bar h-1.5 w-[3px] bg-accent" />
            </span>
            {PROFILE.availability}
          </motion.div>

          <h1 className="mb-3 font-black leading-[0.9] tracking-tight" aria-label={`${PROFILE.name}, Game Developer and Game Technology Student`}>
            <span className="block overflow-hidden pb-1">
              <motion.span variants={nameLine} className="block">
                <span className="block text-5xl text-ink sm:text-6xl md:text-7xl">
                  {PROFILE.name}
                  <span className="text-accent-strong">.</span>
                </span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={rise}
            className="mb-4 text-xl font-bold leading-snug text-ink sm:text-2xl lg:text-3xl"
          >
            Game Developer &amp; Game Technology Student
          </motion.p>

          <motion.p
            variants={rise}
            className="mx-auto max-w-xl text-lg leading-relaxed text-dim md:mx-0 sm:text-xl"
          >
            {PROFILE.tagline}
          </motion.p>

          <motion.div
            variants={rise}
            className="pointer-events-auto mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8 md:justify-start"
          >
            <a
              href="#portfolio-showcase"
              className="group inline-flex min-h-[48px] items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-bold text-on-accent transition-[transform,background-color,box-shadow] duration-200 hover:scale-[1.02] hover:bg-accent-strong active:scale-[0.98] dark:bg-gradient-to-r dark:from-accent dark:to-cyan dark:shadow-lg dark:shadow-accent/25 dark:hover:shadow-xl dark:hover:shadow-accent/40"
            >
              View Unity Projects
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
                strokeWidth={2.5}
              />
            </a>
            <a
              href={PROFILE.cv}
              download
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-line-2 bg-veil px-7 py-3 text-sm font-semibold text-ink transition-[transform,border-color,background-color] duration-200 hover:scale-[1.04] hover:border-accent/50 hover:bg-veil-2 active:scale-[0.97]"
            >
              <Download size={16} strokeWidth={2} />
              Download CV
            </a>
          </motion.div>

          {/* Credibility strip — the facts a recruiter scans for */}
          <motion.div
            variants={rise}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 sm:mt-9 md:justify-start"
          >
            {HERO_HIGHLIGHTS.map((h) => (
              <span
                key={h}
                className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-dim"
              >
                <span className="h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                {h}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue — hidden on short mobile viewports so it never crowds
          or overlaps the credibility strip above it. */}
      <div className="absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-dim/60 min-[400px]:flex sm:bottom-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <ChevronDown size={18} className="scroll-bob text-accent-strong/80" strokeWidth={2} />
      </div>
    </section>
  );
}
