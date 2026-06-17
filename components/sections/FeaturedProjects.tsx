import { PROJECTS, type Project } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge, StatusBadge } from "@/components/ui/Badges";

function GithubIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  return (
    <div
      className={`group flex h-full flex-col overflow-hidden rounded-3xl border border-white/8 bg-[#0b0e14] transition-all duration-500 hover:-translate-y-2 hover:border-emerald-400/25 hover:shadow-2xl hover:shadow-emerald-950/40 ${
        featured ? "lg:flex-row" : ""
      }`}
    >
      {/* Visual */}
      <div
        className={`relative overflow-hidden ${
          featured ? "h-56 lg:h-auto lg:w-1/2" : "h-48"
        }`}
      >
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
          <SmartImage
            src={project.image}
            alt={project.title}
            sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 50vw"}
            fallback={
              <div
                className={`relative h-full w-full bg-gradient-to-br ${project.fallbackGradient}`}
              >
                <div className="absolute inset-0 bg-grid-tight opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-90 drop-shadow-[0_0_24px_rgba(255,255,255,0.18)]">
                    {project.fallbackIcon}
                  </span>
                </div>
              </div>
            }
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-transparent to-transparent" />
        <div className="absolute left-4 top-4">
          <StatusBadge status={project.status} />
        </div>
      </div>

      {/* Body */}
      <div className={`flex flex-1 flex-col gap-4 p-6 ${featured ? "lg:w-1/2 lg:p-8" : ""}`}>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <TechBadge key={t}>{t}</TechBadge>
          ))}
        </div>

        <h3
          className={`font-black leading-snug text-white transition-colors group-hover:text-emerald-300 ${
            featured ? "text-2xl" : "text-xl"
          }`}
        >
          {project.title}
        </h3>

        <p className="text-sm leading-relaxed text-slate-400">
          {project.description}
        </p>

        <div className="mt-auto">
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400/80">
            My Contribution
          </p>
          <p className="text-sm leading-relaxed text-slate-500">
            {project.contribution}
          </p>
        </div>

        <div className="flex gap-3 pt-1">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-sm font-semibold text-slate-300 transition-all hover:scale-[1.02] hover:border-white/25 hover:text-white active:scale-[0.97]"
          >
            <GithubIcon />
            GitHub
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-lime-400 to-emerald-400 py-2.5 text-sm font-semibold text-[#04130c] transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/25 active:scale-[0.97]"
          >
            <ExternalIcon />
            Demo
          </a>
        </div>
      </div>
    </div>
  );
}

export function FeaturedProjects() {
  const featured = PROJECTS.find((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="projects" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="What I've built" title="Featured Projects" />

        {featured && (
          <Reveal className="mb-8">
            <ProjectCard project={featured} featured />
          </Reveal>
        )}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
