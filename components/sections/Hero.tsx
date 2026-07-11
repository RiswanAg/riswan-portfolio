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

  // Stagger the text-column entrance. On reduced motion everything is
  // instantly visible (no transforms).
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.09, delayChildren: 0.15 },
    },
  };
  const rise = {
    hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE },
    },
  };
  const nameLine = {
    hidden: reduceMotion ? { y: "0%" } : { y: "110%" },
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
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24"
    >
      {/* Ambient background — animated shadow drift, tinted to the accent palette */}
      <div className="pointer-events-none absolute inset-0">
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

      {/* Legibility scrims — sit above the scene, below the text */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent md:to-black/0" />

      {/* Text overlay keeps the Spline scene interactive except for the CTA row. */}
      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center py-16 md:items-start">
        <motion.div
          className="w-full max-w-2xl text-center md:text-left"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={rise}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#2EE6C6]/30 bg-[#2EE6C6]/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-[#2EE6C6] sm:text-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#2EE6C6] pulse-soft" />
            {PROFILE.availability}
          </motion.div>

          <h1 className="mb-3 font-black leading-[0.9] tracking-tight" aria-label={`${PROFILE.name}, Unity Developer and Game Technology Student`}>
            <span className="block overflow-hidden pb-1">
              <motion.span variants={nameLine} className="block">
                <span className="block bg-gradient-to-r from-white via-[#2EE6C6] to-[#7C5CFF] bg-clip-text text-5xl text-transparent sm:text-6xl md:text-7xl">
                  {PROFILE.name}
                </span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={rise}
            className="mb-4 text-xl font-bold leading-snug text-white sm:text-2xl lg:text-3xl"
          >
            Unity Developer &amp; Game Technology Student
          </motion.p>

          <motion.p
            variants={rise}
            className="mx-auto max-w-xl text-lg leading-relaxed text-[#93A2B8] md:mx-0 sm:text-xl"
          >
            {PROFILE.tagline}
          </motion.p>

          <motion.div
            variants={rise}
            className="pointer-events-auto mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start"
          >
            <a
              href="#portfolio-showcase"
              className="group inline-flex min-h-[48px] items-center gap-2 rounded-full bg-gradient-to-r from-[#2EE6C6] to-[#27C7E5] px-7 py-3 text-sm font-bold text-[#03140F] shadow-lg shadow-[#2EE6C6]/25 transition-all duration-200 hover:scale-[1.04] hover:shadow-xl hover:shadow-[#2EE6C6]/40 active:scale-[0.97]"
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
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.04] hover:border-[#2EE6C6]/50 hover:bg-white/[0.06] active:scale-[0.97]"
            >
              <Download size={16} strokeWidth={2} />
              Download CV
            </a>
          </motion.div>

          {/* Credibility strip — the facts a recruiter scans for */}
          <motion.div
            variants={rise}
            className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5 md:justify-start"
          >
            {HERO_HIGHLIGHTS.map((h) => (
              <span
                key={h}
                className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#93A2B8]"
              >
                <span className="h-1 w-1 flex-shrink-0 rounded-full bg-[#2EE6C6]" />
                {h}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-[#93A2B8]/60">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <ChevronDown size={18} className="scroll-bob text-[#2EE6C6]/80" strokeWidth={2} />
      </div>
    </section>
  );
}
