import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Award, Check, CheckCircle2, ChevronDown, Circle, FileText, PlayCircle } from "lucide-react";
import { PROJECTS } from "@/lib/data";
import { GithubIcon, ItchIcon } from "@/components/ui/BrandIcons";
import { Gallery } from "@/components/ui/Gallery";
import { SITE_NAME, jsonLdScript, metaDescription, projectJsonLd } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";
import { SiteNav } from "@/components/site/site-nav";
import { SiteFooter } from "@/components/site/site-footer";
import { Container, Eyebrow } from "@/components/site/section-header";
import { ProjectCard, StatusPill, TechChip } from "@/components/site/project-bits";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) return {};
  const path = `/projects/${project.slug}`;
  const title = project.title; // root template adds " | Riswan Hamua"
  const description = metaDescription(project.description);
  // og:image / twitter:image come from the opengraph-image.tsx and
  // twitter-image.tsx files next to this page.
  return {
    title,
    description,
    keywords: [project.title, ...project.tech, "Riswan Hamua", "Portfolio"],
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      siteName: SITE_NAME,
      title: `${project.title} | Riswan Hamua`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Riswan Hamua`,
      description,
    },
  };
}

const isSet = (url?: string) => Boolean(url && url !== "#");

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const related = PROJECTS.filter(
    (p) => p.slug !== slug && p.tech.some((t) => project.tech.includes(t)),
  ).slice(0, 3);

  const media = project.gallery ?? [{ type: "image" as const, src: project.image }];
  const milestonesDone = project.milestones?.filter((m) => m.done).length ?? 0;
  const progress = project.milestones ? Math.round((milestonesDone / project.milestones.length) * 100) : 0;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(projectJsonLd(project)) }}
      />
      <SiteNav />
      <main id="main" className="relative flex-1 overflow-hidden pb-24 pt-28 sm:pt-32">
        <div aria-hidden className="bg-grid absolute inset-x-0 top-0 -z-10 h-[34rem]" />
        <div aria-hidden className="absolute -right-24 top-10 -z-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
        <Container>
          <Link
            href="/#portfolio-showcase"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface/70 px-4 text-sm font-medium text-dim backdrop-blur transition-colors hover:text-ink"
          >
            <ArrowLeft size={16} aria-hidden /> All projects
          </Link>

          <header className="mt-10 max-w-4xl animate-rise">
            <div className="flex flex-wrap items-center gap-3">
              <StatusPill status={project.status} />
              <span className="font-mono text-sm text-dim">{project.role}</span>
            </div>
            <h1 className="mt-5 text-5xl font-semibold leading-[1.02] tracking-tighter text-ink sm:text-7xl">
              {project.title}
            </h1>
            {project.award && (
              <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber/15 px-4 py-1.5 text-sm font-semibold text-amber-strong">
                <Award size={16} aria-hidden /> {project.award}
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <TechChip key={t}>{t}</TechChip>
              ))}
            </div>
          </header>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_22rem]">
            <Reveal>
              <Gallery project={project} media={media} />
            </Reveal>

            <aside className="flex flex-col gap-5">
              <Reveal className="rounded-3xl border border-line bg-surface p-6">
                <Eyebrow>About</Eyebrow>
                <p className="mt-4 text-base leading-relaxed text-ink">{project.description}</p>
              </Reveal>
              <Reveal delay={0.05} className="rounded-3xl border border-line bg-surface p-6">
                <Eyebrow>What I did</Eyebrow>
                <p className="mt-4 text-sm leading-relaxed text-dim">{project.contribution}</p>
              </Reveal>
              <Reveal delay={0.1} className="flex flex-col gap-3">
                {isSet(project.demo) && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-h-12 items-center justify-center gap-2 rounded-full bg-amber px-5 text-sm font-semibold text-on-accent transition-transform active:scale-[0.97]"
                  >
                    {project.demo.includes("itch.io") ? (
                      <>
                        <ItchIcon /> Play on itch.io
                      </>
                    ) : project.kind === "video" ? (
                      <>
                        <PlayCircle size={17} aria-hidden /> Watch on YouTube
                      </>
                    ) : (
                      <>
                        <ArrowUpRight size={17} aria-hidden /> Live demo
                      </>
                    )}
                  </a>
                )}
                {isSet(project.github) && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-line-2 bg-surface px-5 text-sm font-semibold text-ink transition-colors hover:bg-surface-2"
                  >
                    <GithubIcon /> View on GitHub
                  </a>
                )}
                {isSet(project.docs) && (
                  <a
                    href={project.docs}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-line-2 bg-surface px-5 text-sm font-semibold text-ink transition-colors hover:bg-surface-2"
                  >
                    <FileText size={17} aria-hidden /> Documentation
                  </a>
                )}
              </Reveal>
            </aside>
          </div>

          {(project.achievements || project.highlights || project.milestones || project.technicalDetails) && (
            <div className="mt-20 space-y-14">
              {project.achievements && (
                <Reveal>
                  <Eyebrow>Results</Eyebrow>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {project.achievements.map((a) => (
                      <div key={a.label} className="rounded-3xl border border-line bg-surface p-6">
                        <p className="text-3xl font-semibold tracking-tight text-accent-strong">{a.value}</p>
                        <p className="mt-1 text-sm text-dim">{a.label}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              )}

              {project.highlights && (
                <Reveal>
                  <Eyebrow>Highlights</Eyebrow>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-4 text-sm leading-relaxed text-dim">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent/15 text-accent-strong">
                          <Check size={12} strokeWidth={3} aria-hidden />
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {project.milestones && (
                <Reveal>
                  <div className="flex items-end justify-between gap-4">
                    <Eyebrow>Development timeline</Eyebrow>
                    <span className="font-mono text-sm text-dim">
                      {milestonesDone}/{project.milestones.length} done
                    </span>
                  </div>
                  <div
                    className="mt-5 h-2 w-full overflow-hidden rounded-full bg-surface-2"
                    role="progressbar"
                    aria-label="Milestones completed"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div className="h-full rounded-full bg-gradient-to-r from-accent to-amber" style={{ width: `${progress}%` }} />
                  </div>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {project.milestones.map((m) => (
                      <li key={m.label} className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4 text-sm">
                        {m.done ? (
                          <CheckCircle2 size={18} className="shrink-0 text-accent-strong" aria-label="Done" />
                        ) : (
                          <Circle size={18} className="shrink-0 text-dim" aria-label="Planned" />
                        )}
                        <span className={m.done ? "text-ink" : "text-dim"}>{m.label}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {project.technicalDetails && (
                <Reveal>
                  <details className="group rounded-3xl border border-line bg-surface p-6">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                      <Eyebrow>Technical details</Eyebrow>
                      <ChevronDown size={18} className="text-dim transition-transform duration-300 group-open:rotate-180" aria-hidden />
                    </summary>
                    <p className="mt-5 text-sm leading-relaxed text-dim sm:text-base">{project.technicalDetails}</p>
                  </details>
                </Reveal>
              )}
            </div>
          )}

          {related.length > 0 && (
            <section className="mt-24">
              <Eyebrow>More projects</Eyebrow>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">You might also like</h2>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 0.06}>
                    <ProjectCard project={p} />
                  </Reveal>
                ))}
              </div>
            </section>
          )}
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
