import Image from "next/image";
import {
  Briefcase,
  Trophy,
  Award,
  Gamepad2,
  Star,
  Zap,
  PenTool,
  GraduationCap,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { EXPERIENCES, ACHIEVEMENTS, PROJECTS, EDUCATION } from "@/lib/data";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/site/section-header";
import { cn } from "@/lib/utils";
import { existingPublicFiles, publicFileExists } from "@/lib/public-assets";

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
const NO_PHOTOS_YET = new Set<string>([
  "award-6-covid-infographic",
  "experience-5-kopi-saigon-internship",
  "experience-6-norham-coffee-freelance",
]);

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
  "experience-5-kopi-saigon-internship",
  "experience-6-norham-coffee-freelance",
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
  const expSort = [2025.1, 2024.9, 2026.5, 2026.6, 2026.95, 2026.9];
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

// ── Shared exports ───────────────────────────────────────────────────────────
// The home page reuses the milestone model: work items feed the Experience
// timeline below, awards feed the portfolio "Awards" tab and the photo collage.

/** Every milestone, newest first. Photos are filtered to files that exist. */
export const MILESTONES: Milestone[] = buildMilestones().map((m) => ({
  ...m,
  gallery: m.hasPhotos ? existingPublicFiles(m.gallery) : [],
}));

export type { Milestone };

// ── Two-column timeline (Education | Experience) ────────────────────────────

type TimelineEntry = {
  key: string;
  title: string;
  subtitle: string;
  period: string;
  summary: string;
  badges: string[];
  logo?: string;
  photo?: string;
  icon: LucideIcon;
  link?: { href: string; label: string };
};

function TimelineColumn({
  id,
  title,
  icon: Icon,
  entries,
  tone,
}: {
  id: string;
  title: string;
  icon: LucideIcon;
  entries: TimelineEntry[];
  tone: "accent" | "amber";
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28">
      <Reveal className="flex items-center gap-3">
        <span
          className={cn(
            "grid h-10 w-10 place-items-center rounded-xl",
            tone === "accent" ? "bg-accent/15 text-accent" : "bg-amber/15 text-amber",
          )}
        >
          <Icon size={19} aria-hidden />
        </span>
        <h3 id={`${id}-title`} className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {title}
        </h3>
      </Reveal>

      <ol className="mt-8">
        {entries.map((entry, index) => {
          const last = index === entries.length - 1;
          return (
            <Reveal as="li" key={entry.key} delay={index * 0.09} className="relative pb-9 pl-12 last:pb-0">
              {!last && <span aria-hidden className="absolute bottom-0 left-[15px] top-9 w-px bg-gradient-to-b from-line-2 to-line" />}
              <span
                aria-hidden
                className={cn(
                  "absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-full border-2 bg-canvas font-mono text-xs font-bold",
                  tone === "accent" ? "border-accent text-accent" : "border-amber text-amber",
                )}
              >
                {index + 1}
              </span>

              <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
                <div className="flex min-w-0 items-center gap-3">
                  {entry.logo ? (
                    <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-lg bg-white p-1">
                      <Image src={entry.logo} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
                    </span>
                  ) : entry.photo ? (
                    <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg border border-line">
                      <Image src={entry.photo} alt="" fill sizes="36px" className="object-cover" />
                    </span>
                  ) : (
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-surface text-dim">
                      <entry.icon size={16} aria-hidden />
                    </span>
                  )}
                  <p className="min-w-0 text-sm font-semibold text-ink">{entry.subtitle}</p>
                </div>
                <span className="shrink-0 rounded-full border border-line-2 bg-surface px-2.5 py-1 font-mono text-[11px] text-dim">
                  {entry.period}
                </span>
              </div>

              <h4 className="mt-3 text-lg font-bold leading-snug text-ink">{entry.title}</h4>
              {entry.badges.length > 0 && (
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {entry.badges.map((badge) => (
                    <li
                      key={badge}
                      className={cn(
                        "rounded-md px-2 py-0.5 text-[11px] font-semibold",
                        tone === "accent" ? "bg-accent/12 text-accent-strong" : "bg-amber/12 text-amber-strong",
                      )}
                    >
                      {badge}
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-2.5 text-sm leading-relaxed text-dim">{entry.summary}</p>
              {entry.link && (
                <a
                  href={entry.link.href}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-strong hover:underline"
                >
                  {entry.link.label}
                  <ArrowUpRight size={14} aria-hidden />
                </a>
              )}
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}

export function Journey() {
  const education: TimelineEntry[] = EDUCATION.map((e) => ({
    key: e.institution,
    title: e.qualification,
    subtitle: e.institution,
    period: e.period,
    summary: e.summary,
    badges: [e.grade, e.highlight].filter((badge, i, all): badge is string => Boolean(badge) && all.indexOf(badge) === i),
    logo: publicFileExists(e.logo) ? e.logo : undefined,
    icon: GraduationCap,
  }));

  const experience: TimelineEntry[] = MILESTONES.filter((m) => m.kind === "work").map((m) => ({
    key: m.key,
    title: m.title,
    subtitle: m.subtitle,
    period: m.period,
    summary: m.summary,
    badges: [m.highlight],
    photo: m.gallery[0],
    icon: m.icon,
    link: m.link,
  }));

  return (
    <div id="experience" className="relative scroll-mt-24 py-20 sm:py-28">
      <Container className="grid gap-16 lg:grid-cols-2 lg:gap-14">
        <TimelineColumn id="education" title="Education" icon={GraduationCap} entries={education} tone="accent" />
        <TimelineColumn id="experience-list" title="Experience" icon={Briefcase} entries={experience} tone="amber" />
      </Container>
    </div>
  );
}
