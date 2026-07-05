"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { PROFILE, HERO_HIGHLIGHTS, CONTACTS } from "@/lib/data";
import { ChevronDown, Download, ArrowRight } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { TypingText } from "@/components/ui/typing-text";

// Cinematic ease-out, shared with the intro curtain for a continuous feel.
const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

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

  // Subtle parallax on the photo cluster — transform only, rAF-throttled.
  useEffect(() => {
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
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24"
    >
      {/* Optional ambient hero video — silently absent until /hero-bg.mp4 exists */}
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.18] motion-reduce:hidden"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col-reverse items-center justify-between gap-12 py-16 md:flex-row">
        {/* Text column */}
        <motion.div
          className="flex-1 text-center md:text-left"
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

          <h1 className="mb-6 text-7xl font-black leading-[0.9] tracking-tight sm:text-8xl lg:text-[7rem] xl:text-[8rem]">
            <span className="block overflow-hidden pb-1">
              <motion.span
                variants={nameLine}
                className="block bg-gradient-to-r from-[#FFFFFF] via-[#2EE6C6] to-[#7C5CFF] bg-clip-text text-transparent"
              >
                Riswan
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span variants={nameLine} className="block text-white">
                Hamua
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={rise}
            className="mb-5 min-h-[1.5em] font-mono text-base tracking-wide text-[#2EE6C6]/90 sm:text-lg lg:text-xl"
          >
            <TypingText words={PROFILE.roles} />
          </motion.p>

          <motion.p
            variants={rise}
            className="mx-auto max-w-xl text-lg leading-relaxed text-[#93A2B8] md:mx-0 sm:text-xl"
          >
            {PROFILE.tagline}
          </motion.p>

          {/* Primary conversion row — CV, work, socials. Recruiters act here. */}
          <motion.div
            variants={rise}
            className="mt-9 flex flex-wrap items-center justify-center gap-3 md:justify-start"
          >
            <a
              href={PROFILE.cv}
              download
              className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-gradient-to-r from-[#2EE6C6] to-[#27C7E5] px-7 py-3 text-sm font-bold text-[#03140F] shadow-lg shadow-[#2EE6C6]/25 transition-all duration-200 hover:scale-[1.04] hover:shadow-xl hover:shadow-[#2EE6C6]/40 active:scale-[0.97]"
            >
              <Download size={16} strokeWidth={2.5} />
              Download CV
            </a>
            <a
              href="#portfolio-showcase"
              className="group inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.04] hover:border-[#2EE6C6]/50 hover:bg-white/[0.06] active:scale-[0.97]"
            >
              View My Work
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
            <span className="mx-1 hidden h-6 w-px bg-white/10 sm:block" />
            {CONTACTS.filter(
              (c) => (c.label === "GitHub" || c.label === "LinkedIn") && c.logo
            ).map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={c.label}
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] transition-all duration-200 hover:scale-110 hover:border-[#2EE6C6]/50"
              >
                <Image
                  src={c.logo!}
                  alt={c.label}
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px] object-contain opacity-60 transition-opacity group-hover:opacity-100"
                />
              </a>
            ))}
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

        {/* Spline column */}
        <div
          ref={parallaxRef}
          className="relative h-[22rem] w-full flex-shrink-0 sm:h-[30rem] md:h-[36rem] md:flex-[1.3] md:translate-x-6 lg:h-[44rem] lg:translate-x-12 xl:translate-x-16"
        >
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="h-full w-full"
          />
        </div>
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
