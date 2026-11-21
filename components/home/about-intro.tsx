"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useReducedMotion, useTransform } from "motion/react";
import { useSectionProgress } from "@/components/motion/use-section-progress";
import { ArrowDownRight, FileText } from "lucide-react";
import { ABOUT_HOME, PROFILE } from "@/lib/data";
import { Container } from "@/components/site/section-header";
import { PortraitReveal } from "./portrait-reveal";

const DESKTOP = "(min-width: 1024px)";

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * "About Me" opener. On desktop the section pins for one screen: the big
 * title shrinks and slides up out of view while the intro rises in under it.
 * On phones (and with reduced motion) it is ordinary stacked content.
 */
export function AboutIntro() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const desktop = useMediaQuery(DESKTOP);
  const pinned = desktop && !reduce;
  const scrollYProgress = useSectionProgress(ref);

  const titleScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.42]);
  const titleY = useTransform(scrollYProgress, [0, 0.5], ["0vh", "-36vh"]);
  const titleOpacity = useTransform(scrollYProgress, [0.32, 0.52], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["62vh", "0vh"]);
  const contentOpacity = useTransform(scrollYProgress, [0.08, 0.4], [0, 1]);

  const firstName = PROFILE.name.split(" ")[0];
  const lastName = PROFILE.name.split(" ").slice(1).join(" ");

  return (
    <section id="about" ref={ref} aria-labelledby="about-title" className={pinned ? "relative h-[210vh]" : "relative pb-10 pt-28"}>
      <div className={pinned ? "sticky top-0 flex h-svh items-center overflow-hidden" : ""}>
        <motion.h2
          id="about-title"
          style={pinned ? { scale: titleScale, y: titleY, opacity: titleOpacity } : undefined}
          className={
            pinned
              ? "pointer-events-none absolute inset-x-0 top-[38%] text-center text-[9rem] font-black leading-none tracking-tight text-ink xl:text-[11rem]"
              : "text-center text-6xl font-black tracking-tight text-ink sm:text-7xl"
          }
        >
          {ABOUT_HOME.heading}
        </motion.h2>

        <motion.div
          style={pinned ? { y: contentY, opacity: contentOpacity } : undefined}
          className="w-full"
        >
          <Container className="grid items-center gap-10 pt-14 lg:grid-cols-[1fr_minmax(0,26rem)_1fr] lg:gap-8 lg:pt-16">
            <div className="text-center lg:text-left">
              <p className="text-3xl font-extrabold tracking-tight text-accent sm:text-4xl">{ABOUT_HOME.greeting}</p>
              <p className="mt-2 text-5xl font-black leading-[0.95] tracking-tight text-ink sm:text-6xl xl:text-7xl">
                {firstName}
                <br />
                {lastName}
              </p>
              <p className="mt-4 font-mono text-sm text-dim">{PROFILE.roles.slice(0, 3).join(" · ")}</p>
              <a
                href={PROFILE.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-bold text-on-accent shadow-[0_10px_30px_-10px_var(--accent)] transition-transform hover:-translate-y-0.5 active:scale-[0.97]"
              >
                <FileText size={16} aria-hidden /> View CV
              </a>
            </div>

            <PortraitReveal
              base="/about/portrait-main.webp"
              reveal="/about/portrait-reveal.webp"
              alt={`Portrait of ${PROFILE.name}`}
              className="mx-auto max-w-[19rem] sm:max-w-[22rem] lg:max-w-none"
            />

            <div className="text-center lg:text-left">
              <p className="text-base leading-relaxed text-dim sm:text-lg">{ABOUT_HOME.bio}</p>
              <p className="mt-5 border-l-2 border-amber pl-4 text-left text-sm font-medium italic text-ink">
                “{ABOUT_HOME.quote}”
              </p>
              <a
                href="#portfolio-showcase"
                className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-bold text-on-accent shadow-[0_10px_30px_-10px_var(--accent)] transition-transform hover:-translate-y-0.5 active:scale-[0.97]"
              >
                <ArrowDownRight size={16} aria-hidden /> View Projects
              </a>
            </div>
          </Container>
        </motion.div>
      </div>
    </section>
  );
}
