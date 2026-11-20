"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import { FEATURED_PROJECT_SLUGS, HERO_HIGHLIGHTS, PROFILE, PROJECTS } from "@/lib/data";
import { FlipWords } from "@/components/aceternity/flip-words";
import { Spotlight } from "@/components/aceternity/spotlight";
import { BorderBeam } from "@/components/magicui/border-beam";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Container } from "@/components/site/section-header";

// Sizes the rotating role line so the longest role always fits on one line.
const LONGEST_ROLE = Math.max(...PROFILE.roles.map((role) => role.length));

const spotlightProject = PROJECTS.find((project) => project.slug === FEATURED_PROJECT_SLUGS[0]);

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section ref={ref} id="hero" className="relative isolate overflow-hidden pb-20 pt-32 sm:pt-36 lg:min-h-[100svh] lg:pb-24 lg:pt-40">
      {/* Backdrop: grid, spotlight and two soft palette glows. */}
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <Spotlight className="-top-40 left-0 text-accent md:-top-24 md:left-40" />
      <div aria-hidden className="absolute -right-32 top-24 -z-10 h-80 w-80 rounded-full bg-amber/15 blur-3xl" />
      <div aria-hidden className="absolute -left-24 bottom-0 -z-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

      <Container className="grid items-center gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-10">
        <motion.div style={reduce ? undefined : { y: copyY, opacity: fade }}>
          <p className="inline-flex animate-rise items-center gap-2.5 rounded-full border border-line bg-surface/70 py-1.5 pl-2 pr-4 text-sm text-dim backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-accent" />
            </span>
            {PROFILE.status}
          </p>

          <h1 className="mt-7 text-5xl font-semibold leading-[0.98] tracking-tighter text-ink sm:text-7xl lg:text-[5.5rem]">
            <span className="block animate-rise [animation-delay:80ms]">{PROFILE.name}</span>
            <span
              className="hero-role mt-2 block animate-rise text-accent-strong [animation-delay:160ms]"
              style={{ ["--chars" as string]: LONGEST_ROLE }}
            >
              <FlipWords words={PROFILE.roles} />
            </span>
          </h1>

          <p className="mt-7 max-w-xl animate-rise text-lg leading-relaxed text-dim [animation-delay:240ms] sm:text-xl">
            {PROFILE.tagline}
          </p>

          <div className="mt-9 flex animate-rise flex-wrap items-center gap-3 [animation-delay:320ms]">
            <InteractiveHoverButton href="#portfolio-showcase" variant="amber">
              Explore my work
            </InteractiveHoverButton>
            <InteractiveHoverButton href={PROFILE.cv} download variant="outline">
              Download CV
            </InteractiveHoverButton>
          </div>

          <ul className="mt-10 flex animate-rise flex-wrap gap-x-6 gap-y-3 [animation-delay:400ms]">
            {HERO_HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-dim">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-accent/15 text-accent-strong">
                  <Check size={12} strokeWidth={3} aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-[19rem] sm:max-w-sm lg:max-w-none"
          style={reduce ? undefined : { y: portraitY }}
        >
          <div className="animate-rise [animation-delay:200ms]">
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-2 shadow-soft">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-surface-2">
              <Image
                src={PROFILE.image}
                alt={`Portrait of ${PROFILE.name}`}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 400px, 384px"
                className="object-cover object-[center_28%]"
              />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
            </div>
            <BorderBeam size={140} duration={9} />
          </div>

          {spotlightProject && (
            <Link
              href={`/projects/${spotlightProject.slug}`}
              className="group absolute -bottom-6 -left-4 flex max-w-[16rem] items-center gap-3 rounded-2xl border border-line bg-surface/90 p-3 pr-4 shadow-soft backdrop-blur-xl transition-transform hover:-translate-y-0.5 sm:-left-10"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber text-on-accent">
                <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block font-mono text-xs text-dim">{spotlightProject.status.label}</span>
                <span className="block truncate text-sm font-semibold text-ink">{spotlightProject.title}</span>
              </span>
            </Link>
          )}
          </div>
        </motion.div>
      </Container>

      <a
        href="#stats"
        aria-label="Scroll to the next section"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 place-items-center rounded-full border border-line p-2.5 text-dim transition-colors hover:text-ink lg:grid"
      >
        <ArrowDown size={16} />
      </a>
    </section>
  );
}
