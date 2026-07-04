"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Award,
  Layers,
  Gamepad2,
  Palette,
  Sparkles,
  Terminal,
  BadgeCheck,
  ExternalLink,
} from "lucide-react";
import {
  PROJECTS,
  SKILL_GROUPS,
  CERTIFICATES,
  SKILL_LEVEL_FILL,
  type Project,
  type SkillLevel,
} from "@/lib/data";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SkillRing } from "@/components/ui/SkillRing";

const TABS = [
  { id: "projects", label: "Projects", icon: Code2 },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "tech", label: "Tech Stack", icon: Layers },
] as const;

type TabId = (typeof TABS)[number]["id"];

const CATEGORY_ICONS: Record<string, typeof Gamepad2> = {
  "Game Development": Gamepad2,
  "Creative Tools": Palette,
  "AI Tools": Sparkles,
  Development: Terminal,
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
};

export function PortfolioShowcase() {
  const [activeTab, setActiveTab] = useState<TabId>("projects");

  return (
    <section id="portfolio-showcase" className="relative z-10 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <h2 className="bg-gradient-to-r from-white via-[#DF2531] to-[#7A1018] bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
            Portfolio Showcase
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#A3A3A3] sm:text-base">
            Explore my projects, certifications, and technical expertise across multiple game engines and tools.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-10 flex justify-center">
          <div className="relative inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1.5">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative z-10 flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 sm:px-5 ${
                    isActive ? "text-white" : "text-[#A3A3A3] hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="showcase-tab-indicator"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#DF2531] to-[#7A1018]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {activeTab === "projects" && <ProjectsTab />}
              {activeTab === "certificates" && <CertificatesTab />}
              {activeTab === "tech" && <TechStackTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

const ALL_FILTER = "All";

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
  return [ALL_FILTER, ...popularTech, "Completed", "In Development"];
}

function ProjectsTab() {
  const [active, setActive] = useState(ALL_FILTER);
  const filters = useMemo(() => getFilters(PROJECTS), []);

  const filtered = useMemo(() => {
    if (active === ALL_FILTER) return PROJECTS;
    if (active === "Completed") return PROJECTS.filter((p) => p.status.tone === "done");
    if (active === "In Development") return PROJECTS.filter((p) => p.status.tone === "live");
    return PROJECTS.filter((p) => p.tech.includes(active));
  }, [active]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`inline-flex min-h-[40px] items-center rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 ${
              active === f
                ? "border-[#DF2531]/50 bg-[#DF2531]/15 text-white"
                : "border-white/8 bg-white/3 text-[#A3A3A3] hover:border-white/20 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div
        key={active}
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filtered.map((project) => (
          <motion.div key={project.slug} variants={item}>
            <ProjectCard project={project} href={`/projects/${project.slug}`} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function CertificatesTab() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {CERTIFICATES.map((cert) => (
        <motion.a
          key={cert.url}
          href={cert.url}
          target="_blank"
          rel="noopener noreferrer"
          variants={item}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="group flex flex-col overflow-hidden rounded-3xl border border-white/8 bg-[#111111] transition-colors duration-200 hover:border-[#DF2531]/40"
        >
          {/* Certificate preview */}
          <div className="relative aspect-[4/3] overflow-hidden border-b border-white/8 bg-black">
            <Image
              src={cert.image}
              alt={`${cert.name} certificate`}
              fill
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-colors group-hover:border-[#DF2531]/50">
              Verify
              <ExternalLink size={11} />
            </span>
          </div>

          {/* Meta */}
          <div className="flex items-start gap-3 p-6">
            <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#DF2531]/20 to-[#7A1018]/20 text-[#DF2531]">
              <BadgeCheck size={18} />
            </span>
            <div>
              <h3 className="text-base font-bold leading-snug text-white">{cert.name}</h3>
              <p className="mt-1 text-sm text-[#A3A3A3]">{cert.org}</p>
              {cert.date && (
                <p className="mt-1 font-mono text-xs text-[#A3A3A3]">{cert.date}</p>
              )}
            </div>
          </div>
        </motion.a>
      ))}
    </motion.div>
  );
}

const LEVEL_ORDER: SkillLevel[] = ["Expert", "Advanced", "Proficient", "Familiar"];

function TechStackTab() {
  const featured = SKILL_GROUPS.flatMap((g) => g.skills).filter(
    (s) => s.level === "Expert"
  );
  const supporting = SKILL_GROUPS.map((g) => ({
    category: g.category,
    skills: g.skills.filter((s) => s.level !== "Expert"),
  })).filter((g) => g.skills.length > 0);

  return (
    <div className="flex flex-col gap-16">
      {/* Core expertise — signature skills, large rings */}
      <div>
        <Reveal className="mb-9 text-center">
          <h3 className="text-2xl font-black text-white sm:text-3xl">
            Core Expertise
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#A3A3A3]">
            The tools I reach for first — where I do my strongest work.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-10">
            {featured.map((skill) => (
              <SkillRing key={skill.name} skill={skill} variant="featured" />
            ))}
          </div>
        </Reveal>
      </div>

      {/* Supporting toolkit — grouped by category, compact rings */}
      <div className="flex flex-col gap-12">
        {supporting.map((group, gi) => {
          const Icon = CATEGORY_ICONS[group.category] ?? Layers;
          return (
            <Reveal key={group.category} delay={gi * 80}>
              <div className="mb-7 flex items-center justify-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#DF2531]/20 to-[#7A1018]/20 text-[#DF2531]">
                  <Icon size={16} />
                </span>
                <h4 className="text-base font-bold text-white">
                  {group.category}
                </h4>
              </div>
              <div className="grid grid-cols-2 justify-items-center gap-x-6 gap-y-9 sm:grid-cols-3 md:grid-cols-4">
                {group.skills.map((skill) => (
                  <SkillRing key={skill.name} skill={skill} />
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Proficiency legend */}
      <Reveal className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-white/8 pt-8">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#A3A3A3]">
          Proficiency
        </span>
        {LEVEL_ORDER.map((lvl) => (
          <span key={lvl} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full bg-[#DF2531]"
              style={{ opacity: 0.35 + SKILL_LEVEL_FILL[lvl] * 0.65 }}
            />
            <span className="text-xs text-[#A3A3A3]">{lvl}</span>
          </span>
        ))}
      </Reveal>
    </div>
  );
}
