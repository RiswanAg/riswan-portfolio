"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import {
  Briefcase,
  Trophy,
  Award,
  Gamepad2,
  Star,
  Zap,
  PenTool,
  Plus,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { EXPERIENCES, ACHIEVEMENTS, PROJECTS } from "@/lib/data";
import { Container, SectionHeader } from "@/components/site/section-header";
import { PhotoStrip } from "@/components/home/photo-strip";
import { cn } from "@/lib/utils";

// ── Unified milestone model ───────────────────────────────────────────────────
// Experience, Education and Awards collapse into one chronological photo story.
// Featured milestones use a photo album with the story below the images.
// The full paragraph stays hidden until tapped.

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
  /** Ordered photos for the milestone album. */
  gallery: string[];
  /** Optional link through to a related portfolio project. */
  link?: { href: string; label: string };
  /** Stable folder name and milestone identifier. */
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
  work: { label: "Experience", color: "#219EBC" },
  award: { label: "Award", color: "#FFB703" },
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
  "experience-3-pencak-dice",
  "experience-4-msn-agrileap",
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
  const expSort = [2025.1, 2024.9, 2026.5, 2026.6];
  const achSort = [2026.4, 2025.4, 2025.2, 2026.3, 2022.1, 2020.1];

  const work: Milestone[] = EXPERIENCES.map((e, i) => {
    const folder = EXPERIENCE_FOLDERS[i] ?? `experience-${i + 1}`;
    const project = e.projectSlug
      ? PROJECTS.find((p) => p.slug === e.projectSlug)
      : undefined;
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
      // project thumbnails, then a predictable placeholder folder. A supplied
      // `gallery` is taken literally, so a milestone with only two photos
      // renders hero + one accent instead of leaving an empty third slot.
      gallery: e.gallery
        ? e.gallery
        : e.bgImages
          ? [e.bgImages.left, e.bgImages.right, `/journey/${folder}/3.jpg`]
          : galleryPaths(folder),
      link: project
        ? { href: `/projects/${project.slug}`, label: `Explore ${project.title}` }
        : undefined,
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

// ── Timeline row ─────────────────────────────────────────────────────────────
// After the Aceternity UI "Timeline" (21st.dev/aceternity/timeline): a sticky
// date column, a line that draws itself with scroll, and compact cards with a
// three-photo strip instead of full-height albums.

const KIND_STYLE: Record<Kind, { badge: string; dot: string }> = {
  work: { badge: "bg-accent/12 text-accent-strong", dot: "border-accent/40 text-accent-strong" },
  award: { badge: "bg-amber/15 text-amber-strong", dot: "border-amber/50 text-amber-strong" },
};

function TimelineItem({ m }: { m: Milestone }) {
  const [open, setOpen] = useState(false);
  const meta = KIND_META[m.kind];
  const style = KIND_STYLE[m.kind];
  const Icon = m.icon;
  const reduce = useReducedMotion();
  const storyId = `story-${m.key}`;

  return (
    <li className="relative grid gap-x-10 md:grid-cols-[10rem_1fr]">
      <div className="mb-3 pl-14 md:sticky md:top-28 md:mb-0 md:self-start md:pl-0 md:pt-1.5 md:text-right">
        <p className="font-mono text-sm text-ink">{m.period}</p>
        <p className="mt-1 text-xs text-dim">{meta.label}</p>
      </div>

      <motion.article
        initial={false}
        whileInView={reduce ? undefined : { opacity: [0, 1], x: [16, 0] }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative pl-14"
      >
        <span
          aria-hidden
          className={cn(
            "absolute left-0 top-0 grid h-9 w-9 place-items-center rounded-full border bg-canvas",
            style.dot,
          )}
        >
          <Icon size={15} strokeWidth={2.2} />
        </span>

        <div className="rounded-3xl border border-line bg-surface p-5 shadow-soft sm:p-7">
          <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", style.badge)}>
            {m.highlight}
          </span>
          <h3 className="mt-4 text-xl font-semibold leading-snug tracking-tight text-ink sm:text-2xl">{m.title}</h3>
          {m.subtitle && <p className="mt-1 text-sm font-medium text-dim">{m.subtitle}</p>}
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-dim">{m.summary}</p>

          {m.hasPhotos && <PhotoStrip photos={m.gallery} title={m.subtitle || m.title} />}

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={storyId}
                initial={reduce ? false : { height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={reduce ? undefined : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="mt-5 max-w-2xl border-t border-line pt-5 text-sm leading-relaxed text-dim sm:text-base">
                  {m.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {(m.description !== m.summary || m.link) && (
            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
              {m.description !== m.summary && (
                <button
                  type="button"
                  onClick={() => setOpen((value) => !value)}
                  aria-expanded={open}
                  aria-controls={storyId}
                  className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink hover:text-accent-strong"
                >
                  <Plus size={15} className={cn("transition-transform duration-300", open && "rotate-45")} aria-hidden />
                  {open ? "Show less" : "The full story"}
                </button>
              )}
              {m.link && (
                <Link
                  href={m.link.href}
                  className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent-strong hover:underline"
                >
                  {m.link.label}
                  <ArrowUpRight size={15} aria-hidden />
                </Link>
              )}
            </div>
          )}
        </div>
      </motion.article>
    </li>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

export function Journey() {
  const milestones = useMemo(() => buildMilestones(), []);
  const list = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="experience" className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          index="03"
          eyebrow="Journey"
          title={
            <>
              Experience, awards and <span className="text-accent-strong">the work behind them.</span>
            </>
          }
        />
        <ol ref={list} className="relative space-y-10 sm:space-y-14">
          {/* The track and its scroll-drawn fill, aligned with the icon centres. */}
          <span aria-hidden className="absolute bottom-0 left-[17px] top-2 w-px bg-line-2 md:left-[calc(10rem+2.5rem+17px)]" />
          <motion.span
            aria-hidden
            className="absolute bottom-0 left-[17px] top-2 w-px origin-top bg-gradient-to-b from-accent via-cyan to-amber md:left-[calc(10rem+2.5rem+17px)]"
            style={reduce ? { scaleY: 1 } : { scaleY: progress }}
          />
          {milestones.map((m) => (
            <TimelineItem key={m.kind + m.title} m={m} />
          ))}
        </ol>
      </Container>
    </section>
  );
}
