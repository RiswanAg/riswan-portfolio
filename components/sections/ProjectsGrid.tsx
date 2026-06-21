"use client";

import { useState, useMemo } from "react";
import type { Project } from "@/lib/data";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";

const ALL = "All";

function getFilters(projects: Project[]) {
  const techCounts: Record<string, number> = {};
  for (const p of projects) {
    for (const t of p.tech) {
      techCounts[t] = (techCounts[t] ?? 0) + 1;
    }
  }
  // Only show tech tags that appear in more than one project
  const popularTech = Object.entries(techCounts)
    .filter(([, count]) => count > 1)
    .map(([tech]) => tech)
    .sort();
  return [ALL, ...popularTech, "Completed", "In Development"];
}

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(ALL);
  const filters = useMemo(() => getFilters(projects), [projects]);

  const filtered = useMemo(() => {
    if (active === ALL) return projects;
    if (active === "Completed") return projects.filter((p) => p.status.tone === "done");
    if (active === "In Development") return projects.filter((p) => p.status.tone === "live");
    return projects.filter((p) => p.tech.includes(active));
  }, [active, projects]);

  return (
    <section className="px-6 pb-28">
      <div className="mx-auto max-w-6xl">
        {/* Filter pills */}
        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 ${
                active === f
                  ? "border-[#4988C4]/50 bg-[#4988C4]/15 text-[#BDE8F5]"
                  : "border-white/8 bg-white/3 text-slate-400 hover:border-white/20 hover:text-slate-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Count label */}
        <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.18em] text-slate-600">
          {filtered.length === projects.length
            ? `${projects.length} projects`
            : `${filtered.length} of ${projects.length} projects`}
        </p>

        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-2xl">🔍</p>
            <p className="mt-3 text-slate-500">No projects match that filter.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <ProjectCard
                  project={p}
                  href={`/projects/${p.slug}`}
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
