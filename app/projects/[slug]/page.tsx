import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/lib/data";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { TechBadge, StatusBadge } from "@/components/ui/Badges";
import { SmartImage } from "@/components/ui/SmartImage";
import { ItchIcon } from "@/components/ui/BrandIcons";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { Gallery } from "@/components/ui/Gallery";
import { FileText, Check, CheckCircle2, Circle, ChevronDown } from "lucide-react";

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
  return {
    title: `${project.title} | Riswan Hamua`,
    description: project.description,
    openGraph: {
      title: `${project.title} | Riswan Hamua`,
      description: project.description,
      images: project.image ? [{ url: project.image }] : [],
    },
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

function BackArrow() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const related = PROJECTS.filter(
    (p) =>
      p.slug !== slug &&
      p.tech.some((t) => project.tech.includes(t))
  ).slice(0, 3);

  const media = project.gallery ?? [{ type: "image" as const, src: project.image }];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-canvas">
        <div className="mx-auto max-w-6xl px-6 pb-28 pt-28">
          {/* Back nav */}
          <Reveal>
            <Link
              href="/#portfolio-showcase"
              className="mb-8 inline-flex items-center gap-2 rounded-lg border border-line bg-veil px-4 py-2 text-sm text-dim transition-all hover:border-line-2 hover:text-ink"
            >
              <BackArrow /> All Projects
            </Link>
          </Reveal>

          {/* Header */}
          <Reveal delay={60}>
            <div className="mb-8 flex flex-wrap items-start gap-4">
              <StatusBadge status={project.status} />
            </div>
            <h1 className="mb-4 text-4xl font-black leading-tight text-ink md:text-5xl">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <TechBadge key={t}>{t}</TechBadge>
              ))}
            </div>
          </Reveal>

          {/* Main content: gallery + sidebar */}
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
            {/* Gallery */}
            <Reveal delay={120}>
              <Gallery project={project} media={media} />
            </Reveal>

            {/* Sidebar */}
            <div className="flex flex-col gap-6">
              <Reveal delay={150}>
                <div>
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                    About
                  </p>
                  <p className="text-sm leading-relaxed text-dim">
                    {project.description}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={180}>
                <div className="rounded-2xl border border-line bg-veil p-5">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent-strong/80">
                    What I Did
                  </p>
                  <p className="text-sm leading-relaxed text-dim">
                    {project.contribution}
                  </p>
                </div>
              </Reveal>

              {/* CTA buttons */}
              <Reveal delay={210}>
                <div className="flex flex-col gap-3">
                  {project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl border border-line bg-veil py-3 text-sm font-semibold text-dim transition-all hover:border-line-2 hover:text-ink"
                    >
                      <GithubIcon /> View on GitHub
                    </a>
                  )}
                  {project.demo !== "#" && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-cyan py-3 text-sm font-bold text-on-accent transition-all hover:shadow-lg hover:shadow-accent/30"
                    >
                      {project.demo.includes("itch.io") ? (
                        <><ItchIcon /> Go to itch.io</>
                      ) : project.kind === "video" ? (
                        <><ExternalIcon /> Watch on YouTube</>
                      ) : (
                        <><ExternalIcon /> Live Demo</>
                      )}
                    </a>
                  )}
                  {project.docs && project.docs !== "#" && (
                    <a
                      href={project.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl border border-line bg-veil py-3 text-sm font-semibold text-dim transition-all hover:border-line-2 hover:text-ink"
                    >
                      <FileText size={16} /> Documentation
                    </a>
                  )}
                </div>
              </Reveal>
            </div>
          </div>

          {/* Extra project detail: results, highlights, timeline, technical deep-dive */}
          {(project.achievements || project.highlights || project.milestones || project.technicalDetails) && (
            <div className="mt-16 space-y-10">
              {project.achievements && (
                <Reveal>
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                    Results
                  </p>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {project.achievements.map((a) => (
                      <div
                        key={a.label}
                        className="rounded-2xl border border-line bg-veil p-5 text-center"
                      >
                        <p className="text-2xl font-black text-accent-strong">{a.value}</p>
                        <p className="mt-1 text-xs text-dim">{a.label}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              )}

              {project.highlights && (
                <Reveal delay={60}>
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                    Highlights
                  </p>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {project.highlights.map((h) => (
                      <li
                        key={h}
                        className="flex items-start gap-2.5 rounded-xl border border-line bg-veil px-4 py-3 text-sm text-dim"
                      >
                        <Check size={16} className="mt-0.5 shrink-0 text-accent-strong" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {project.milestones && (
                <Reveal delay={120}>
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                    Development Timeline
                  </p>
                  <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-veil">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-cyan transition-all duration-700"
                      style={{
                        width: `${Math.round(
                          (project.milestones.filter((m) => m.done).length /
                            project.milestones.length) *
                            100
                        )}%`,
                      }}
                    />
                  </div>
                  <ul className="space-y-2.5">
                    {project.milestones.map((m) => (
                      <li
                        key={m.label}
                        className="flex items-center gap-3 rounded-xl border border-line bg-veil px-4 py-3 text-sm"
                      >
                        {m.done ? (
                          <CheckCircle2 size={16} className="shrink-0 text-accent-strong" />
                        ) : (
                          <Circle size={16} className="shrink-0 text-dim" />
                        )}
                        <span className={m.done ? "text-dim" : "text-dim"}>
                          {m.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {project.technicalDetails && (
                <Reveal delay={180}>
                  <details className="group rounded-2xl border border-line bg-veil p-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-accent-strong/80">
                      Technical Details
                      <ChevronDown
                        size={16}
                        className="text-dim transition-transform duration-300 group-open:rotate-180"
                      />
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-dim">
                      {project.technicalDetails}
                    </p>
                  </details>
                </Reveal>
              )}
            </div>
          )}

          {/* Related projects */}
          {related.length > 0 && (
            <div className="mt-24">
              <Reveal>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                  More projects
                </p>
                <h2 className="mb-8 text-2xl font-black text-ink">
                  You might also like
                </h2>
              </Reveal>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 70}>
                    <ProjectCard project={p} href={`/projects/${p.slug}`} />
                  </Reveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
