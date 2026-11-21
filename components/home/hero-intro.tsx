"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useTransform } from "motion/react";
import { useSectionProgress } from "@/components/motion/use-section-progress";
import { ChevronDown } from "lucide-react";
import { PROFILE } from "@/lib/data";
import { cn } from "@/lib/utils";
import { NightScene } from "./night-scene";

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
  const scrollYProgress = useSectionProgress(ref);

  const photoScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.38]);
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "9%"]);
  const titleOpacity = useTransform(scrollYProgress, [0.08, 0.32, 0.72, 0.9], [0, 1, 1, 0]);
  const titleScale = useTransform(scrollYProgress, [0.08, 0.4, 0.9], [0.86, 1, 1.08]);
  const titleY = useTransform(scrollYProgress, [0.08, 0.4], ["14vh", "0vh"]);
  const titleBlur = useTransform(scrollYProgress, [0.08, 0.32], ["blur(14px)", "blur(0px)"]);
  // the whole scene dissolves into the page backdrop instead of shading to a flat colour
  const sceneOpacity = useTransform(scrollYProgress, [0.62, 0.98], [1, 0]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <section
      id="hero"
      ref={ref}
      aria-label="Introduction"
      className={reduce ? "relative h-svh" : "relative h-[260vh]"}
    >
      <motion.div
        style={reduce ? undefined : { opacity: sceneOpacity }}
        className={cn(
          "sticky top-0 h-svh overflow-hidden bg-canvas",
          // without the scroll dissolve, feather the bottom edge into the backdrop
          reduce && "[mask-image:linear-gradient(to_bottom,black_78%,transparent)]",
        )}
      >
        <motion.div
          aria-hidden
          className="absolute inset-0 will-change-transform"
          style={reduce ? undefined : { scale: photoScale, y: photoY }}
        >
          {photo ? (
            <Image src={photo} alt="" fill loading="eager" sizes="100vw" className="object-cover" />
          ) : (
            <NightScene progress={scrollYProgress} still={Boolean(reduce)} />
          )}
        </motion.div>

        {/* Readability: darken the top edge under the nav and the bottom edge. */}
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(1_26_41/0.5),transparent_24%,transparent_72%,rgb(1_26_41/0.7))]" />

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

      </motion.div>
    </section>
  );
}
