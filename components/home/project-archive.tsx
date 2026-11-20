"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { PROJECTS, type ProjectKind } from "@/lib/data";
import { ProjectCard } from "@/components/site/project-bits";
import { cn } from "@/lib/utils";

const KIND_LABEL: Record<ProjectKind, string> = {
  game: "Games & XR",
  video: "Film & motion",
  other: "Software & AI",
};

type Filter = "all" | ProjectKind;
const INITIAL_COUNT = 6;
const INITIAL_COUNT_PHONE = 3;

export function ProjectArchive({ exclude }: { exclude: string[] }) {
  const reduce = useReducedMotion();
  const pool = useMemo(() => PROJECTS.filter((project) => !exclude.includes(project.slug)), [exclude]);
  const kinds = useMemo(
    () => (Object.keys(KIND_LABEL) as ProjectKind[]).filter((kind) => pool.some((project) => project.kind === kind)),
    [pool],
  );
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState(false);

  const filtered = filter === "all" ? pool : pool.filter((project) => project.kind === filter);
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT);
  const filters: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: pool.length },
    ...kinds.map((kind) => ({
      id: kind,
      label: KIND_LABEL[kind],
      count: pool.filter((project) => project.kind === kind).length,
    })),
  ];

  if (pool.length === 0) return null;

  return (
    <div id="work-archive" className="mt-24 scroll-mt-28">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">More projects</h3>
          <p className="mt-2 text-dim">Games, simulations, films and software, filtered by type.</p>
        </div>
        <LayoutGroup id="archive-filter">
          <div role="group" aria-label="Filter projects" className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 md:mx-0 md:rounded-full md:border md:border-line md:bg-surface md:p-1">
            {filters.map((item) => {
              const active = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => {
                    setFilter(item.id);
                    setExpanded(false);
                  }}
                  className={cn(
                    "relative shrink-0 rounded-full border border-line px-4 py-2 text-sm font-medium transition-colors md:border-transparent",
                    active ? "text-canvas" : "text-dim hover:text-ink",
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="archive-filter-pill"
                      className="absolute inset-0 -z-0 rounded-full bg-ink"
                      transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">
                    {item.label} <span className="font-mono text-xs opacity-70">{item.count}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>
      </div>

      <motion.ul layout={!reduce} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, index) => (
            <motion.li
              key={project.slug}
              className={cn(!expanded && index >= INITIAL_COUNT_PHONE && "max-sm:hidden")}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {filtered.length > INITIAL_COUNT_PHONE && (
        <div className={cn("mt-10 flex justify-center", filtered.length <= INITIAL_COUNT && "sm:hidden")}>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-line-2 bg-surface px-6 text-sm font-semibold text-ink transition-colors hover:bg-surface-2"
          >
            {expanded ? "Show fewer" : `Show all ${filtered.length}`}
            <ChevronDown size={16} className={cn("transition-transform", expanded && "rotate-180")} aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}
