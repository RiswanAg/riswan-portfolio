"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import { PROFILE } from "@/lib/data";

/**
 * Full-screen cinematic opener. The section is 260vh tall with a sticky
 * viewport inside it, so scrolling drives one timeline:
 *   0 → 0.35  photo slowly pushes in, headline rises out of the haze
 *   0.35 → 0.7  headline holds while the photo keeps drifting
 *   0.7 → 1   everything sinks into the navy of the next section
 * With reduced motion it is a single static screen with the headline shown.
 */
export function HeroIntro({ photo }: { photo: string | null }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const photoScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.38]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "9%"]);
  const titleOpacity = useTransform(scrollYProgress, [0.08, 0.32, 0.72, 0.9], [0, 1, 1, 0]);
  const titleScale = useTransform(scrollYProgress, [0.08, 0.4, 0.9], [0.86, 1, 1.08]);
  const titleY = useTransform(scrollYProgress, [0.08, 0.4], ["14vh", "0vh"]);
  const titleBlur = useTransform(scrollYProgress, [0.08, 0.32], ["blur(14px)", "blur(0px)"]);
  const shade = useTransform(scrollYProgress, [0.62, 0.98], [0, 1]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      aria-label="Introduction"
      className={reduce ? "relative h-svh" : "relative h-[260vh]"}
    >
      <div className="sticky top-0 h-svh overflow-hidden bg-canvas">
        <motion.div
          aria-hidden
          className="absolute inset-0 will-change-transform"
          style={reduce ? undefined : { scale: photoScale, y: photoY }}
        >
          {photo ? (
            <Image src={photo} alt="" fill loading="eager" sizes="100vw" className="object-cover" />
          ) : (
            <PlaceholderScene />
          )}
        </motion.div>

        {/* Readability: darken the top edge under the nav and the bottom edge. */}
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(1_26_41/0.55),transparent_28%,transparent_60%,rgb(1_26_41/0.85))]" />

        <div className="relative flex h-full items-center justify-center px-5 text-center">
          <motion.h1
            className="max-w-6xl text-[13vw] font-black uppercase leading-[0.92] tracking-tight text-white drop-shadow-[0_8px_40px_rgb(1_26_41/0.6)] sm:text-[9vw] lg:text-[7.4vw]"
            style={reduce ? undefined : { opacity: titleOpacity, scale: titleScale, y: titleY, filter: titleBlur }}
          >
            <span className="sr-only">
              {PROFILE.name}, {PROFILE.roles.slice(0, 2).join(" and ")}.{" "}
            </span>
            Welcome to my <span className="text-amber">portfolio</span>
          </motion.h1>
        </div>

        <motion.a
          href="#about-home"
          style={reduce ? undefined : { opacity: cueOpacity }}
          className="absolute inset-x-0 bottom-8 mx-auto flex w-fit flex-col items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/80 transition-colors hover:text-white"
        >
          Scroll to explore
          <ChevronDown size={18} aria-hidden />
        </motion.a>

        {!reduce && <motion.div aria-hidden className="absolute inset-0 bg-canvas" style={{ opacity: shade }} />}
      </div>
    </section>
  );
}

/** Shown until public/hero.jpg exists: a night sky over contour "terrain". */
function PlaceholderScene() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_100%,#0e6c85_0%,#023047_38%,#011a29_75%)]">
      <div className="contours absolute inset-0 [--contour:rgb(142_202_230/0.1)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(60%_70%_at_50%_100%,rgb(255_183_3/0.22),transparent_70%)]" />
      <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[42%] w-full">
        <path
          d="M0 400V260l120-70 90 40 150-130 110 90 80-50 170 140 120-110 160 120 110-80 140 100 90-40 100 60v130z"
          fill="#011a29"
          opacity="0.85"
        />
        <path d="M0 400V320l180-60 140 50 200-90 160 80 220-70 180 70 160-40 200 60v80z" fill="#011a29" />
      </svg>
    </div>
  );
}
