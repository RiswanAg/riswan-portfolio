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
  /** Folder name — used as the lookup key into ACCENT_LAYOUT below. */
  key: string;
  /** False when no real photos have been uploaded yet — renders text-only. */
  hasPhotos: boolean;
};

// Folders with no real photos uploaded yet — these panels render as
// text-only (no image frame, no placeholder cards) until photos are added.
// Once you drop photos into /public/journey/<folder>/{1,2,3}.jpg, remove the
// folder name from this set to switch that panel back to the photo layout.
const NO_PHOTOS_YET = new Set<string>(["award-6-covid-infographic"]);

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

// Photo folders are named after each milestone so it's obvious which is which:
//   /public/journey/experience-1-nextgen-digital-ninja/{1,2,3}.jpg
//   /public/journey/award-1-itex-2026-silver/{1,2,3}.jpg
// The arrays below are 1:1 with EXPERIENCES / ACHIEVEMENTS in lib/data.ts.
const EXPERIENCE_FOLDERS = [
  "experience-1-nextgen-digital-ninja",
  "experience-2-game-jams",
];

const AWARD_FOLDERS = [
  "award-1-itex-2026-silver",
  "award-2-ftmk-sneakout-silver",
  "award-3-game-jam-wins",
  "award-4-deans-list",
  "award-5-national-football",
  "award-6-covid-infographic",
];

const galleryPaths = (folder: string): string[] => [
  `/journey/${folder}/1.jpg`,
  `/journey/${folder}/2.jpg`,
  `/journey/${folder}/3.jpg`,
];

function buildMilestones(): Milestone[] {
  const expSort = [2025.1, 2024.9];
  const achSort = [2026.4, 2025.4, 2025.2, 2026.3, 2022.1, 2020.1];

  const work: Milestone[] = EXPERIENCES.map((e, i) => {
    const folder = EXPERIENCE_FOLDERS[i] ?? `experience-${i + 1}`;
    return {
      kind: "work",
      sort: expSort[i] ?? 2000,
      icon: Briefcase,
      period: e.period,
      title: e.role,
      subtitle: e.organisation,
      summary: e.summary,
      highlight: e.highlight,
      description: e.description,
      // Real uploaded photos win when available; otherwise fall back to the
      // project thumbnails, then a predictable placeholder folder.
      gallery: e.gallery
        ? [...e.gallery, `/journey/${folder}/3.jpg`]
        : e.bgImages
          ? [e.bgImages.left, e.bgImages.right, `/journey/${folder}/3.jpg`]
          : galleryPaths(folder),
      key: folder,
      hasPhotos: !NO_PHOTOS_YET.has(folder),
    };
  });

  const awards: Milestone[] = ACHIEVEMENTS.map((a, i) => {
    const project = a.projectSlug
      ? PROJECTS.find((p) => p.slug === a.projectSlug)
      : undefined;
    const folder = AWARD_FOLDERS[i] ?? `award-${i + 1}`;
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
        ? [...a.gallery, `/journey/${folder}/3.jpg`]
        : galleryPaths(folder),
      link: project
        ? { href: `/projects/${project.slug}`, label: `Explore ${project.title}` }
        : undefined,
      key: folder,
      hasPhotos: !NO_PHOTOS_YET.has(folder),
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
  maxWidth,
  maxHeight,
}: {
  src: string;
  y: MotionValue<string> | string;
  rotate: number;
  /** Position only (e.g. "top-2 right-0") — size is controlled by maxWidth/maxHeight below. */
  className: string;
  color: string;
  floatDelay?: number;
  floatDuration?: number;
  reduceMotion?: boolean;
  /** Upper bound on rendered width, in px. See EXPERIENCE_FOLDERS / AWARD_FOLDERS accent size table below to tweak per-photo. */
  maxWidth: number;
  /** Upper bound on rendered height, in px. The box always keeps the photo's true aspect ratio — whichever of maxWidth/maxHeight is hit first wins, so a tall portrait photo shrinks in width rather than getting cropped or padded. */
  maxHeight: number;
}) {
  // Until the real image loads, fall back to a 3:4 box so layout doesn't
  // jump; once we know the true dimensions the card reshapes to match, so
  // nothing gets cropped or letterboxed — the box always matches the photo's
  // real aspect ratio exactly.
  const [ratio, setRatio] = useState<number | null>(null);
  const effectiveRatio = ratio ?? 3 / 4;
  const width = Math.min(maxWidth, maxHeight * effectiveRatio);

  return (
    // Outer layer: scroll-driven parallax + tilt + positioning.
    <motion.div style={{ y, rotate, width }} className={`absolute ${className}`}>
      {/* Inner layer: continuous idle float (bob), independent of scroll. */}
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
        transition={{
          duration: floatDuration,
          repeat: Infinity,
          ease: "easeInOut",
          delay: floatDelay,
        }}
        style={{ aspectRatio: effectiveRatio }}
        className="relative w-full overflow-hidden rounded-2xl border border-white/15 bg-[#0B1120] shadow-2xl shadow-black/60"
      >
        <SmartImage
          src={src}
          alt=""
          sizes="320px"
          className="object-contain"
          fallback={<PhotoPlaceholder color={color} label="Add photo" />}
          onLoad={(img) => {
            if (img.naturalWidth && img.naturalHeight) {
              setRatio(img.naturalWidth / img.naturalHeight);
            }
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ── Floating photo layout — each of the 2 floating photos is tuned separately ──
// Every panel has 2 floating accent photos: the TOP one (pinned near the top
// corner of the hero) and the BOTTOM one (pinned near the bottom corner).
// They're controlled by two independent tables below, both keyed by the
// folder name in /public/journey/<key>/ (matches Milestone.key, set to the
// same folder name in buildMilestones() above). Edit ACCENT_TOP_LAYOUT to
// resize/reposition a top photo, ACCENT_BOTTOM_LAYOUT for a bottom photo —
// they don't affect each other.
//
//   width / height — upper bound in px. The box always keeps the photo's
//                    true aspect ratio, so whichever bound is hit first wins
//                    (no cropping, no letterboxing).
//   position       — Tailwind position classes, e.g. "top-4 right-0" or
//                    "-bottom-6 left-10". Replaces the default left/right
//                    side entirely, so you have full manual control.
//   rotate         — tilt, in degrees (negative tilts left).
//
// Example — make the ITEX top photo bigger and move it further right:
//   "award-1-itex-2026-silver": { width: 340, position: "top-0 -right-8" },
type AccentSpot = { width: number; height: number; position: string; rotate: number };
type AccentOverride = Partial<AccentSpot>;

const DEFAULT_TOP = { width: 288, height: 280 };
const DEFAULT_BOTTOM = { width: 208, height: 300 };

const ACCENT_TOP_LAYOUT: Record<string, AccentOverride> = {
  "award-1-itex-2026-silver": {width: 400, height: 320, position: "top-0 -right-0"},
  "award-2-ftmk-sneakout-silver": {width: 200, height: 400},
  "award-3-game-jam-wins": {},
  "award-4-deans-list": { width: 350, height: 350},
  "award-5-national-football": {},
  "award-6-covid-infographic": {},
  "experience-1-nextgen-digital-ninja": {},
  "experience-2-game-jams": {},
};

const ACCENT_BOTTOM_LAYOUT: Record<string, AccentOverride> = {
  "award-1-itex-2026-silver": {width: 400, height: 250, position: "bottom-0 -right-20"},
  "award-2-ftmk-sneakout-silver": {width: 400, height: 250},
  "award-3-game-jam-wins": {width: 400, height: 250, position: "top-0 -right-50"},
  "award-4-deans-list": { width: 400, height: 400, position: "bottom-0 -right-30" },
  "award-5-national-football": {width: 400, height: 250, position: "bottom-2 -right-5"},
  "award-6-covid-infographic": {},
  "experience-1-nextgen-digital-ninja": {},
  "experience-2-game-jams": {width: 400, height: 250, position: "bottom-2 -right-5"},
};

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

  // Merge this panel's manual overrides — ACCENT_TOP_LAYOUT and
  // ACCENT_BOTTOM_LAYOUT are independent tables, each keyed by folder name —
  // on top of the flip-aware defaults.
  const top: AccentSpot = {
    ...DEFAULT_TOP,
    position: flip ? "-left-4 top-2 lg:left-0" : "-right-4 top-2 lg:right-0",
    rotate: flip ? 4 : -4,
    ...ACCENT_TOP_LAYOUT[m.key],
  };
  const bottom: AccentSpot = {
    ...DEFAULT_BOTTOM,
    position: flip ? "bottom-10 left-8 lg:left-10" : "bottom-10 right-8 lg:right-10",
    rotate: flip ? -5 : 5,
    ...ACCENT_BOTTOM_LAYOUT[m.key],
  };

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
            className={`relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50 lg:w-[82%] ${
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
              rotate={top.rotate}
              color={meta.color}
              reduceMotion={!!reduceMotion}
              floatDuration={5.5}
              floatDelay={0}
              maxWidth={top.width}
              maxHeight={top.height}
              className={`hidden md:block ${top.position}`}
            />
          )}
          {accents[1] && (
            <FloatingPhoto
              src={accents[1]}
              y={reduceMotion ? "0%" : accent2Y}
              rotate={bottom.rotate}
              color={meta.color}
              reduceMotion={!!reduceMotion}
              floatDuration={6.5}
              floatDelay={0.8}
              maxWidth={bottom.width}
              maxHeight={bottom.height}
              className={`hidden lg:block ${bottom.position}`}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ── Compact milestone (timeline row) ───────────────────────────────────────────
// Everything that isn't a headline moment renders as a short scannable row
// instead of a full-height cinematic panel, keeping the section a reasonable
// scroll length so visitors actually reach the contact CTA.

function TimelineItem({ m }: { m: Milestone }) {
  const [open, setOpen] = useState(false);
  const meta = KIND_META[m.kind];
  const Icon = m.icon;

  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-12"
    >
      <span
        className="absolute left-0 top-0.5 flex h-8 w-8 items-center justify-center rounded-full border bg-[#0E1626]"
        style={{ borderColor: `${meta.color}55`, color: meta.color }}
      >
        <Icon size={14} strokeWidth={2.2} />
      </span>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-mono text-xs tracking-[0.15em] text-[#93A2B8]">
          {m.period}
        </span>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]"
          style={{ color: "#03140F", background: meta.color }}
        >
          {m.highlight}
        </span>
      </div>
      <h4 className="mt-1.5 text-lg font-bold leading-snug text-white">{m.title}</h4>
      {m.subtitle && (
        <p className="mt-0.5 text-sm text-[#93A2B8]">{m.subtitle}</p>
      )}
      <p className="mt-1 max-w-xl text-sm leading-relaxed text-[#93A2B8]">
        {m.summary}
      </p>

      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl overflow-hidden text-sm leading-relaxed text-[#93A2B8]"
          >
            <span className="mt-2 block">{m.description}</span>
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
        {m.description !== m.summary && (
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#93A2B8] transition-colors hover:text-white"
          >
            <Plus
              size={13}
              className={`transition-transform duration-300 ${open ? "rotate-45" : ""}`}
            />
            {open ? "Show less" : "Full story"}
          </button>
        )}
        {m.link && (
          <Link
            href={m.link.href}
            className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors hover:brightness-125"
            style={{ color: meta.color }}
          >
            {m.link.label}
            <ArrowUpRight size={13} strokeWidth={2.6} />
          </Link>
        )}
      </div>
    </motion.li>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

// Headline moments that earn the full-height cinematic photo treatment.
// Everything else collapses into the compact timeline below them.
const CINEMATIC_KEYS = new Set<string>([
  "award-1-itex-2026-silver",
  "award-2-ftmk-sneakout-silver",
  "experience-1-nextgen-digital-ninja",
]);

export function Journey() {
  const milestones = useMemo(buildMilestones, []);
  const cinematic = milestones.filter(
    (m) => CINEMATIC_KEYS.has(m.key) && m.hasPhotos
  );
  const rest = milestones.filter(
    (m) => !CINEMATIC_KEYS.has(m.key) || !m.hasPhotos
  );

  return (
    <section id="experience" className="relative overflow-hidden px-0 py-24">
      <div aria-hidden className="aurora -left-24 top-8 h-72 w-72 bg-[#7C5CFF]/15" />
      <div aria-hidden className="aurora -right-16 bottom-0 h-64 w-64 bg-[#2EE6C6]/10" />

      <div className="px-6">
        <SectionHeading eyebrow="Where I've Been" title="My Journey" />
      </div>

      <div className="relative">
        {cinematic.map((m, i) => (
          <JourneyPanel key={m.kind + m.title} m={m} index={i} />
        ))}
      </div>

      {rest.length > 0 && (
        <div className="relative mx-auto mt-8 w-full max-w-3xl px-6">
          <h3 className="mb-10 text-center font-mono text-xs uppercase tracking-[0.3em] text-[#93A2B8]">
            More milestones
          </h3>
          <ul className="relative flex flex-col gap-10 before:absolute before:bottom-2 before:left-4 before:top-2 before:w-px before:bg-white/10">
            {rest.map((m) => (
              <TimelineItem key={m.kind + m.title} m={m} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
