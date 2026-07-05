"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import {
  Briefcase,
  Trophy,
  Award,
  Gamepad2,
  Star,
  Zap,
  PenTool,
  Plus,
  ImageIcon,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { EXPERIENCES, ACHIEVEMENTS, PROJECTS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";

// ── Unified milestone model ───────────────────────────────────────────────────
// Experience, Education and Awards collapse into one chronological photo story.
// Each milestone is a full-bleed cinematic panel: a cluster of photos that
// parallax in as you scroll, with just the year, an outcome badge and a title
// floating over them. The full paragraph stays hidden until tapped.

type Kind = "work" | "award";

type Milestone = {
  kind: Kind;
  sort: number;
  icon: LucideIcon;
  period: string;
  title: string;
  subtitle: string;
  summary: string;
  highlight: string;
  description: string;
  /** Photo cluster — 2 to 4 paths. Missing files show a labelled placeholder. */
  gallery: string[];
  /** Optional link through to a related portfolio project. */
  link?: { href: string; label: string };
};

const KIND_META: Record<Kind, { label: string; color: string }> = {
  work: { label: "Experience", color: "#2EE6C6" },
  award: { label: "Award", color: "#27C7E5" },
};

const ACHIEVEMENT_ICONS: Record<string, LucideIcon> = {
  award: Award,
  trophy: Trophy,
  gamepad: Gamepad2,
  star: Star,
  zap: Zap,
  "pen-tool": PenTool,
};

// Photo folders use simple, predictable names so real files are easy to drop in:
//   /public/journey/experience-1/{1,2,3}.jpg   (1-based, in the data.ts order)
//   /public/journey/award-1/{1,2,3}.jpg
const galleryPaths = (folder: string): string[] => [
  `/journey/${folder}/1.jpg`,
  `/journey/${folder}/2.jpg`,
  `/journey/${folder}/3.jpg`,
];

function buildMilestones(): Milestone[] {
  const expSort = [2025.1, 2024.9];
  const achSort = [2026.4, 2025.4, 2025.2, 2026.3, 2022.1, 2020.1];

  const work: Milestone[] = EXPERIENCES.map((e, i) => ({
    kind: "work",
    sort: expSort[i] ?? 2000,
    icon: Briefcase,
    period: e.period,
    title: e.role,
    subtitle: e.organisation,
    summary: e.summary,
    highlight: e.highlight,
    description: e.description,
    // Reuse the real photos/thumbnails already wired into each experience for
    // slots 1-2, then a predictable placeholder folder for slot 3.
    gallery: e.bgImages
      ? [e.bgImages.left, e.bgImages.right, `/journey/experience-${i + 1}/3.jpg`]
      : galleryPaths(`experience-${i + 1}`),
  }));

  const awards: Milestone[] = ACHIEVEMENTS.map((a, i) => {
    const project = a.projectSlug
      ? PROJECTS.find((p) => p.slug === a.projectSlug)
      : undefined;
    return {
      kind: "award" as const,
      sort: achSort[i] ?? 2000,
      icon: ACHIEVEMENT_ICONS[a.icon] ?? Award,
      period: a.year,
      title: a.title,
      subtitle: "",
      summary: a.summary,
      highlight: a.highlight,
      description: a.description,
      // Real photos win when available; otherwise a placeholder folder + a
      // third placeholder slot rounds out the cluster.
      gallery: a.gallery
        ? [...a.gallery, `/journey/award-${i + 1}/3.jpg`]
        : galleryPaths(`award-${i + 1}`),
      link: project
        ? { href: `/projects/${project.slug}`, label: `Explore ${project.title}` }
        : undefined,
    };
  });

  return [...work, ...awards].sort((a, b) => b.sort - a.sort);
}

// ── Placeholder tile (shows until a real photo is dropped in) ──────────────────

function PhotoPlaceholder({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#0B1120]">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(120% 100% at 50% 0%, ${color}22, transparent 70%)`,
        }}
      />
      <ImageIcon size={26} style={{ color }} className="relative opacity-70" />
      <span className="relative px-3 text-center font-mono text-[10px] uppercase tracking-[0.15em] text-slate-500">
        {label}
      </span>
    </div>
  );
}

// ── Small floating photo card (parallax accent) ────────────────────────────────

function FloatingPhoto({
  src,
  y,
  rotate,
  className,
  color,
  floatDelay = 0,
  floatDuration = 5,
  reduceMotion = false,
}: {
  src: string;
  y: MotionValue<string> | string;
  rotate: number;
  className: string;
  color: string;
  floatDelay?: number;
  floatDuration?: number;
  reduceMotion?: boolean;
}) {
  return (
    // Outer layer: scroll-driven parallax + tilt + positioning.
    <motion.div style={{ y, rotate }} className={`absolute ${className}`}>
      {/* Inner layer: continuous idle float (bob), independent of scroll. */}
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
        className="relative h-full w-full overflow-hidden rounded-2xl border border-white/15 bg-[#0B1120] shadow-2xl shadow-black/60"
      >
        <SmartImage
          src={src}
          alt=""
          sizes="240px"
          fallback={<PhotoPlaceholder color={color} label="Add photo" />}
        />
      </motion.div>
    </motion.div>
  );
}

// ── One cinematic panel ────────────────────────────────────────────────────────

function JourneyPanel({ m, index }: { m: Milestone; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const meta = KIND_META[m.kind];
  const Icon = m.icon;
  const flip = index % 2 === 1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Parallax: hero drifts slowly, accents drift faster in the opposite sense.
  const heroY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const accent1Y = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);
  const accent2Y = useTransform(scrollYProgress, [0, 1], ["55%", "-25%"]);

  const [hero, ...accents] = m.gallery;

  return (
    <div
      ref={ref}
      className="relative flex min-h-[85vh] items-center py-16"
    >
      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="relative">
          {/* Hero photo */}
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`relative h-[58vh] min-h-[380px] w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 lg:w-[82%] ${
              flip ? "lg:ml-auto" : ""
            }`}
          >
            <motion.div
              style={{ y: reduceMotion ? 0 : heroY, scale: reduceMotion ? 1 : heroScale }}
              className="absolute inset-0"
            >
              <SmartImage
                src={hero}
                alt={m.title}
                sizes="(min-width: 1024px) 82vw, 100vw"
                eager={index < 2}
                fallback={<PhotoPlaceholder color={meta.color} label={m.title} />}
              />
            </motion.div>

            {/* Legibility scrim */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1"
              style={{ background: `linear-gradient(90deg, ${meta.color}, transparent)` }}
            />

            {/* Text overlay */}
            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="absolute inset-x-0 bottom-0 p-6 sm:p-10"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: "#03140F", background: meta.color }}
                >
                  <Icon size={13} strokeWidth={2.6} />
                  {m.highlight}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">
                  {m.period} · {meta.label}
                </span>
              </div>

              <h3 className="mt-3 max-w-2xl text-2xl font-black leading-tight text-white sm:text-3xl lg:text-4xl">
                {m.title}
              </h3>
              {m.subtitle && (
                <p className="mt-1 text-sm font-medium text-white/60">{m.subtitle}</p>
              )}
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">
                {m.summary}
              </p>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-2xl overflow-hidden text-sm leading-relaxed text-white/70"
                  >
                    <span className="mt-3 block border-t border-white/15 pt-3">
                      {m.description}
                    </span>
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
                {m.description !== m.summary && (
                  <button
                    onClick={() => setOpen((o) => !o)}
                    aria-expanded={open}
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60 transition-colors hover:text-white"
                  >
                    <Plus
                      size={13}
                      className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                    />
                    {open ? "Show less" : "The full story"}
                  </button>
                )}
                {m.link && (
                  <Link
                    href={m.link.href}
                    className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-transform duration-200 hover:scale-[1.05]"
                    style={{ color: "#03140F", background: meta.color }}
                  >
                    {m.link.label}
                    <ArrowUpRight size={13} strokeWidth={2.6} />
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Floating accent photos — opposite side of the hero */}
          {accents[0] && (
            <FloatingPhoto
              src={accents[0]}
              y={reduceMotion ? "0%" : accent1Y}
              rotate={flip ? 4 : -4}
              color={meta.color}
              reduceMotion={!!reduceMotion}
              floatDuration={5.5}
              floatDelay={0}
              className={`hidden aspect-[3/4] w-40 md:block lg:w-52 ${
                flip ? "-left-2 top-10 lg:left-0" : "-right-2 top-10 lg:right-0"
              }`}
            />
          )}
          {accents[1] && (
            <FloatingPhoto
              src={accents[1]}
              y={reduceMotion ? "0%" : accent2Y}
              rotate={flip ? -5 : 5}
              color={meta.color}
              reduceMotion={!!reduceMotion}
              floatDuration={6.5}
              floatDelay={0.8}
              className={`hidden aspect-square w-36 lg:block ${
                flip ? "bottom-8 left-8" : "bottom-8 right-8"
              }`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export function Journey() {
  const milestones = useMemo(buildMilestones, []);

  return (
    <section id="experience" className="relative overflow-hidden px-0 py-24">
      <div aria-hidden className="aurora -left-24 top-8 h-72 w-72 bg-[#7C5CFF]/15" />
      <div aria-hidden className="aurora -right-16 bottom-0 h-64 w-64 bg-[#2EE6C6]/10" />

      <div className="px-6">
        <SectionHeading eyebrow="Where I've Been" title="My Journey" />
        <p className="mx-auto -mt-8 mb-4 max-w-xl text-center text-sm leading-relaxed text-[#93A2B8]">
          Keep scrolling — the story unfolds in pictures.
        </p>
      </div>

      <div className="relative">
        {milestones.map((m, i) => (
          <JourneyPanel key={m.kind + m.title} m={m} index={i} />
        ))}
      </div>
    </section>
  );
}
