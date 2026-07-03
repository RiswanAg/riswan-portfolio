"use client";

import { useState, useMemo } from "react";
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
} from "lucide-react";
import { PROJECTS, SKILL_GROUPS, type Project } from "@/lib/data";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";

const TABS = [
  { id: "projects", label: "Projects", icon: Code2 },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "tech", label: "Tech Stack", icon: Layers },
] as const;

type TabId = (typeof TABS)[number]["id"];

// TODO: Replace with real certificates
const PLACEHOLDER_CERTIFICATES = [
  { name: "[Certificate Name]", org: "[Issuing Organization]", date: "[Date]" },
  { name: "[Certificate Name]", org: "[Issuing Organization]", date: "[Date]" },
  { name: "[Certificate Name]", org: "[Issuing Organization]", date: "[Date]" },
];

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
                  className={`relative z-10 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 sm:px-5 ${
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
            className={`rounded-full border px-4 py-1.5 text-xs font-medium tracking-wide transition-all duration-200 ${
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
      {PLACEHOLDER_CERTIFICATES.map((cert, i) => (
        <motion.div
          key={i}
          variants={item}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-4 rounded-3xl border border-white/8 bg-[#111111] p-6 transition-colors duration-200 hover:border-[#DF2531]/40"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#DF2531]/20 to-[#7A1018]/20 text-[#DF2531]">
              <BadgeCheck size={22} />
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] text-[#A3A3A3]">
              Placeholder
            </span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{cert.name}</h3>
            <p className="mt-1 text-sm text-[#A3A3A3]">{cert.org}</p>
            <p className="mt-1 font-mono text-xs text-[#A3A3A3]/60">{cert.date}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function TechStackTab() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2"
    >
      {SKILL_GROUPS.map((group) => {
        const Icon = CATEGORY_ICONS[group.category] ?? Layers;
        return (
          <motion.div
            key={group.category}
            variants={item}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-5 rounded-3xl border border-white/8 bg-[#111111] p-6 transition-colors duration-200 hover:border-[#DF2531]/40"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#DF2531]/20 to-[#7A1018]/20 text-[#DF2531]">
                <Icon size={22} />
              </span>
              <h3 className="text-lg font-bold text-white">{group.category}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] tracking-wide text-[#A3A3A3]"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
