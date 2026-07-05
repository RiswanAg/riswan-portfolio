"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { PROFILE, HERO_HIGHLIGHTS } from "@/lib/data";
import { ChevronDown } from "lucide-react";
import { SplineScene } from "@/components/ui/splite";
import { TypingText } from "@/components/ui/typing-text";
import { Component as EtherealShadow } from "@/components/ui/etheral-shadow";
import { VideoText } from "@/components/ui/video-text";

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
      {/* Ambient background — animated shadow drift, tinted to the accent palette */}
      <div className="pointer-events-none absolute inset-0">
        <EtherealShadow
          color="rgba(124, 92, 255, 0.5)"
          animation={reduceMotion ? undefined : { scale: 60, speed: 80 }}
          noise={{ opacity: 0.35, scale: 1.2 }}
          sizing="fill"
        />
      </div>

      {/* Interactive Spline scene — right-anchored, full height, wide drag/orbit zone */}
      <div
        ref={parallaxRef}
        className="absolute inset-y-0 right-0 w-full sm:w-[85%] md:w-[72%] lg:w-[62%] xl:w-[58%]"
      >
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="h-full w-full"
        />
      </div>

      {/* Legibility scrims — sit above the scene, below the text */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent md:to-black/0" />

      {/* Text overlay — purely decorative (no links live here anymore), so it never
          intercepts pointer events and the scene can track the cursor underneath it too. */}
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

          <h1 className="mb-6 font-black leading-[0.9] tracking-tight">
            <span className="block overflow-hidden pb-1">
              <motion.span
                variants={nameLine}
                className="block h-[10vw] min-h-[3.5rem] w-full"
              >
                <VideoText
                  src="https://cdn.magicui.design/ocean-small.webm"
                  fontSize={8}
                  fontWeight={900}
                  fontFamily="var(--font-heading), sans-serif"
                >
                  Riswan
                </VideoText>
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-1">
              <motion.span
                variants={nameLine}
                className="block h-[10vw] min-h-[3.5rem] w-full"
              >
                <VideoText
                  src="https://cdn.magicui.design/ocean-small.webm"
                  fontSize={8}
                  fontWeight={900}
                  fontFamily="var(--font-heading), sans-serif"
                >
                  Hamua
                </VideoText>
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
