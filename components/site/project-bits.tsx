import Link from "next/link";
import { ArrowUpRight, Award, BrainCircuit, Clapperboard, Gamepad2 } from "lucide-react";
import type { Project } from "@/lib/data";
import { SmartImage } from "@/components/ui/SmartImage";
import { SpotlightCard } from "@/components/aceternity/spotlight-card";
import { cn } from "@/lib/utils";

const TONE: Record<Project["status"]["tone"], { dot: string; text: string }> = {
  live: { dot: "bg-accent", text: "text-accent-strong" },
  done: { dot: "bg-dim", text: "text-dim" },
  proto: { dot: "bg-amber", text: "text-amber-strong" },
};

export function StatusPill({ status, className }: { status: Project["status"]; className?: string }) {
  const tone = TONE[status.tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-surface/85 px-3 py-1 text-xs font-medium backdrop-blur",
        tone.text,
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        {status.tone === "live" && (
          <span className={cn("absolute inset-0 animate-ping rounded-full opacity-60", tone.dot)} />
        )}
        <span className={cn("relative h-1.5 w-1.5 rounded-full", tone.dot)} />
      </span>
      {status.label}
    </span>
  );
}

export function TechChip({ children, className }: { children: string; className?: string }) {
  return (
    <span className={cn("rounded-full border border-line bg-surface-2/60 px-2.5 py-1 font-mono text-xs text-dim", className)}>
      {children}
    </span>
  );
}

const KIND_ICON = { game: Gamepad2, video: Clapperboard, other: BrainCircuit } as const;

/** Shown when a project has no artwork yet (or it fails to load). */
function MediaFallback({ project }: { project: Project }) {
  const Icon = KIND_ICON[project.kind];
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div aria-hidden className="bg-grid absolute inset-0" />
      <div aria-hidden className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-3xl" />
      <span className="relative grid h-20 w-20 place-items-center rounded-3xl border border-accent/30 bg-surface/80 text-accent-strong shadow-soft">
        <Icon size={36} strokeWidth={1.5} aria-hidden />
      </span>
    </div>
  );
}

/** Project artwork with a palette-coloured blueprint fallback for missing images. */
export function ProjectMedia({
  project,
  sizes,
  eager = false,
  className,
}: {
  project: Project;
  sizes: string;
  eager?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-surface-2", className)}>
      <SmartImage
        src={project.image}
        alt=""
        sizes={sizes}
        eager={eager}
        className={cn(
          "transition-transform duration-700 ease-out group-hover/spot:scale-[1.04] motion-reduce:transition-none",
          // The opaque background stops the fallback showing through letterboxing.
          project.imageFit === "contain" ? "bg-surface-2 object-contain p-4" : "object-cover",
        )}
        fallback={<MediaFallback project={project} />}
      />
    </div>
  );
}

/** Compact card used in the archive and the "more projects" rail. */
export function ProjectCard({ project, className }: { project: Project; className?: string }) {
  return (
    <SpotlightCard as="article" className={cn("flex h-full flex-col", className)}>
      <ProjectMedia
        project={project}
        sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, calc(100vw - 40px)"
        className="aspect-[16/10] border-b border-line"
      />
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="truncate font-mono text-xs text-dim">{project.role.split(" · ")[0]}</p>
          <StatusPill status={project.status} className="shrink-0" />
        </div>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-ink">
          <Link
            href={`/projects/${project.slug}`}
            prefetch={false}
            className="after:absolute after:inset-0 after:z-[2] after:content-['']"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-dim">{project.description}</p>
        {project.award && (
          <p className="mt-3 flex items-start gap-1.5 text-xs font-medium text-amber-strong">
            <Award size={14} className="mt-px shrink-0" aria-hidden />
            {project.award}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 pt-5">
          <div className="flex min-w-0 flex-wrap gap-1.5">
            {project.tech.slice(0, 2).map((tool) => (
              <TechChip key={tool}>{tool}</TechChip>
            ))}
          </div>
          <span
            aria-hidden
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-ink transition-all duration-300 group-hover/spot:rotate-45 group-hover/spot:border-accent group-hover/spot:bg-accent group-hover/spot:text-on-accent"
          >
            <ArrowUpRight size={16} />
          </span>
        </div>
      </div>
    </SpotlightCard>
  );
}
