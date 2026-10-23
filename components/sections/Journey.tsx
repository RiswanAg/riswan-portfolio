"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
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
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { EXPERIENCES, ACHIEVEMENTS, PROJECTS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JourneyAlbum } from "@/components/ui/JourneyAlbum";

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

function JourneyPanel({ m }: { m: Milestone }) {
  const [open, setOpen] = useState(false);
  const meta = KIND_META[m.kind];
  const Icon = m.icon;
  return (
    <article className="mx-auto mb-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-line bg-surface sm:mb-16">
      <JourneyAlbum photos={m.gallery} title={m.subtitle || m.title} />
      <div className="p-5 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: "#03140F", background: meta.color }}>
            <Icon size={13} aria-hidden />{m.highlight}
          </span>
          <span className="font-mono text-xs text-dim">{m.period} · {meta.label}</span>
        </div>
        <h3 className="mt-4 text-2xl font-bold leading-tight text-ink sm:text-3xl">{m.title}</h3>
        {m.subtitle && <p className="mt-2 text-sm font-medium text-dim">{m.subtitle}</p>}
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink sm:text-base">{m.summary}</p>
        {open && <p id={`story-${m.key}`} className="mt-4 max-w-2xl border-t border-line pt-4 text-sm leading-relaxed text-dim">{m.description}</p>}
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
          {m.description !== m.summary && (
            <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls={`story-${m.key}`} className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-dim hover:text-ink">
              <Plus size={14} className={open ? "rotate-45" : ""} />
              {open ? "Show less" : "The full story"}
            </button>
          )}
          {m.link && <Link href={m.link.href} className="inline-flex min-h-11 items-center gap-2 text-xs font-bold text-accent-strong">{m.link.label}<ArrowUpRight size={15} /></Link>}
        </div>
      </div>
    </article>
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
        className="absolute left-0 top-0.5 flex h-8 w-8 items-center justify-center rounded-full border bg-surface"
        style={{ borderColor: `${meta.color}55`, color: meta.color }}
      >
        <Icon size={14} strokeWidth={2.2} />
      </span>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="font-mono text-xs tracking-[0.15em] text-dim">
          {m.period}
        </span>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em]"
          style={{ color: "#03140F", background: meta.color }}
        >
          {m.highlight}
        </span>
      </div>
      <h4 className="mt-1.5 text-lg font-bold leading-snug text-ink">{m.title}</h4>
      {m.subtitle && (
        <p className="mt-0.5 text-sm text-dim">{m.subtitle}</p>
      )}
      <p className="mt-1 max-w-xl text-sm leading-relaxed text-dim">
        {m.summary}
      </p>

      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl overflow-hidden text-sm leading-relaxed text-dim"
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
            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-dim transition-colors hover:text-ink"
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
  "experience-4-msn-agrileap",
  "experience-3-pencak-dice",
  "award-1-itex-2026-silver",
  "award-2-ftmk-sneakout-silver",
  "experience-1-nextgen-digital-ninja",
]);

export function Journey() {
  const milestones = useMemo(() => buildMilestones(), []);
  const cinematic = milestones.filter(
    (m) => CINEMATIC_KEYS.has(m.key) && m.hasPhotos
  );
  const rest = milestones.filter(
    (m) => !CINEMATIC_KEYS.has(m.key) || !m.hasPhotos
  );

  return (
    <section id="experience" className="relative overflow-hidden px-0 py-24">
      <div aria-hidden className="aurora -left-24 top-8 h-72 w-72 bg-amber/15" />
      <div aria-hidden className="aurora -right-16 bottom-0 h-64 w-64 bg-accent/10" />

      <div className="px-6">
        <SectionHeading eyebrow="Where I've Been" title="My Journey" />
      </div>

      <div className="relative px-4 sm:px-6">
        {cinematic.map((m) => (
          <JourneyPanel key={m.kind + m.title} m={m} />
        ))}
      </div>

      {rest.length > 0 && (
        <div className="relative mx-auto mt-8 w-full max-w-3xl px-6">
          <h3 className="mb-10 text-center font-mono text-xs uppercase tracking-[0.3em] text-dim">
            More milestones
          </h3>
          <ul className="relative flex flex-col gap-10 before:absolute before:bottom-2 before:left-4 before:top-2 before:w-px before:bg-line">
            {rest.map((m) => (
              <TimelineItem key={m.kind + m.title} m={m} />
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
