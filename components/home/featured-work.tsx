import Link from "next/link";
import { ArrowUpRight, Award } from "lucide-react";
import { FEATURED_PROJECT_SLUGS, PROJECTS, type Project } from "@/lib/data";
import { SpotlightCard } from "@/components/aceternity/spotlight-card";
import { Reveal } from "@/components/motion/reveal";
import { Container, SectionHeader } from "@/components/site/section-header";
import { ProjectMedia, StatusPill, TechChip } from "@/components/site/project-bits";
import { cn } from "@/lib/utils";
import { ProjectArchive } from "./project-archive";

const featured = FEATURED_PROJECT_SLUGS.map((slug) => PROJECTS.find((project) => project.slug === slug)).filter(
  (project): project is Project => Boolean(project),
);

/* Bento rhythm for any number of featured projects: wide, narrow / narrow, wide. */
const SPANS = ["lg:col-span-4", "lg:col-span-2", "lg:col-span-2", "lg:col-span-4"];

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const wide = SPANS[index % SPANS.length] === "lg:col-span-4";
  return (
    <Reveal delay={(index % 2) * 0.08} className={cn("md:col-span-1", SPANS[index % SPANS.length])}>
      <SpotlightCard as="article" className="flex h-full flex-col">
        <ProjectMedia
          project={project}
          eager={index === 0}
          sizes={wide ? "(min-width: 1024px) 740px, (min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"}
          className={cn("border-b border-line", wide ? "aspect-[16/9]" : "aspect-[16/11]")}
        />
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-xs text-dim">{project.role}</p>
            <StatusPill status={project.status} />
          </div>
          <h3 className={cn("mt-4 font-semibold tracking-tight text-ink", wide ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl")}>
            <Link
              href={`/projects/${project.slug}`}
              prefetch={false}
              className="after:absolute after:inset-0 after:z-[2] after:content-['']"
            >
              {project.title}
            </Link>
          </h3>
          <p className={cn("mt-3 text-base leading-relaxed text-dim", wide ? "line-clamp-3" : "line-clamp-4")}>
            {project.description}
          </p>
          {project.award && (
            <p className="mt-4 flex items-start gap-2 text-sm font-medium text-amber-strong">
              <Award size={16} className="mt-0.5 shrink-0" aria-hidden />
              {project.award}
            </p>
          )}
          <div className="mt-auto flex items-end justify-between gap-4 pt-6">
            <div className="flex flex-wrap gap-1.5">
              {project.tech.slice(0, wide ? 4 : 3).map((tool) => (
                <TechChip key={tool}>{tool}</TechChip>
              ))}
            </div>
            <span
              aria-hidden
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-canvas transition-all duration-300 group-hover/spot:rotate-45 group-hover/spot:bg-amber group-hover/spot:text-on-accent"
            >
              <ArrowUpRight size={18} />
            </span>
          </div>
        </div>
      </SpotlightCard>
    </Reveal>
  );
}

export function FeaturedWork() {
  return (
    <section id="portfolio-showcase" className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          index="01"
          eyebrow="Selected work"
          title={
            <>
              Ideas turned into <span className="text-accent-strong">working software.</span>
            </>
          }
          action={
            <a href="#work-archive" className="inline-flex items-center gap-2 text-sm font-semibold text-ink underline-offset-4 hover:underline">
              Browse all {PROJECTS.length} projects <ArrowUpRight size={16} aria-hidden />
            </a>
          }
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {featured.map((project, index) => (
            <FeaturedCard key={project.slug} project={project} index={index} />
          ))}
        </div>
        <ProjectArchive exclude={featured.map((project) => project.slug)} />
      </Container>
    </section>
  );
}
