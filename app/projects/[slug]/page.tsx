import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS } from "@/lib/data";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { TechBadge, StatusBadge } from "@/components/ui/Badges";
import { SmartImage } from "@/components/ui/SmartImage";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { Gallery } from "@/components/ui/Gallery";

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
      <main className="min-h-screen bg-[#050608]">
        <div className="mx-auto max-w-6xl px-6 pb-28 pt-28">
          {/* Back nav */}
          <Reveal>
            <Link
              href="/projects"
              className="mb-8 inline-flex items-center gap-2 rounded-lg border border-white/8 bg-white/3 px-4 py-2 text-sm text-slate-400 transition-all hover:border-white/20 hover:text-slate-200"
            >
              <BackArrow /> All Projects
            </Link>
          </Reveal>

          {/* Header */}
          <Reveal delay={60}>
            <div className="mb-8 flex flex-wrap items-start gap-4">
              <StatusBadge status={project.status} />
            </div>
            <h1 className="mb-4 text-4xl font-black leading-tight text-white md:text-5xl">
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
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                    About
                  </p>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {project.description}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={180}>
                <div className="rounded-2xl border border-white/6 bg-white/3 p-5">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400/80">
                    My Contribution
                  </p>
                  <p className="text-sm leading-relaxed text-slate-400">
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
                      className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-3 text-sm font-semibold text-slate-300 transition-all hover:border-white/25 hover:text-white"
                    >
                      <GithubIcon /> View on GitHub
                    </a>
                  )}
                  {project.demo !== "#" && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-lime-400 to-emerald-400 py-3 text-sm font-semibold text-[#04130c] transition-all hover:shadow-lg hover:shadow-emerald-500/25"
                    >
                      <ExternalIcon /> Live Demo
                    </a>
                  )}
                </div>
              </Reveal>
            </div>
          </div>

          {/* Related projects */}
          {related.length > 0 && (
            <div className="mt-24">
              <Reveal>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500">
                  More projects
                </p>
                <h2 className="mb-8 text-2xl font-black text-white">
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
