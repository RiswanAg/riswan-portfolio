"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PROFILE } from "@/lib/data";
import { ChevronDown } from "lucide-react";
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
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#DF2531]/30 bg-[#DF2531]/10 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-[#DF2531] sm:text-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#DF2531] pulse-soft" />
            {PROFILE.availability}
          </motion.div>

          <h1 className="mb-6 text-7xl font-black leading-[0.9] tracking-tight sm:text-8xl lg:text-[7rem] xl:text-[8rem]">
            <span className="block overflow-hidden pb-1">
              <motion.span
                variants={nameLine}
                className="block bg-gradient-to-r from-[#FFFFFF] via-[#DF2531] to-[#7A1018] bg-clip-text text-transparent"
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
            className="mb-5 min-h-[1.5em] font-mono text-base tracking-wide text-[#DF2531]/90 sm:text-lg lg:text-xl"
          >
            <TypingText words={PROFILE.roles} />
          </motion.p>

          <motion.p
            variants={rise}
            className="mx-auto max-w-xl text-lg leading-relaxed text-[#A3A3A3] md:mx-0 sm:text-xl"
          >
            {PROFILE.tagline}
          </motion.p>
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
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-[#A3A3A3]/60">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <ChevronDown size={18} className="scroll-bob text-[#DF2531]/80" strokeWidth={2} />
      </div>
    </section>
  );
}
