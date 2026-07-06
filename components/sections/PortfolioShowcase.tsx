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
  Video,
  FileText,
} from "lucide-react";
import {
  PROJECTS,
  SKILL_GROUPS,
  CERTIFICATES,
  SKILL_LEVEL_FILL,
  type ProjectKind,
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
          <h2 className="bg-gradient-to-r from-white via-[#2EE6C6] to-[#7C5CFF] bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
            Portfolio Showcase
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#93A2B8] sm:text-base">
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
                    isActive ? "text-[#03140F] font-bold" : "text-[#93A2B8] hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="showcase-tab-indicator"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#2EE6C6] to-[#27C7E5]"
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

const KIND_SEGMENTS = [
  { id: "game", label: "Game", icon: Gamepad2 },
  { id: "video", label: "Video", icon: Video },
  { id: "other", label: "Others", icon: Layers },
] as const satisfies readonly { id: ProjectKind; label: string; icon: typeof Gamepad2 }[];

function ProjectsTab() {
  const [active, setActive] = useState<ProjectKind>("game");

  const counts = useMemo(() => {
    const c: Record<ProjectKind, number> = { game: 0, video: 0, other: 0 };
    for (const p of PROJECTS) c[p.kind] += 1;
    return c;
  }, []);

  const filtered = useMemo(
    () => PROJECTS.filter((p) => p.kind === active),
    [active]
  );

  return (
    <div>
      {/* Sub-filter — Game · Video · Others. Underline tabs, deliberately a
          lighter treatment than the solid-pill primary tabs above so the two
          navigation levels stay visually distinct. */}
      <div className="mb-10 flex justify-center">
        <div className="inline-flex items-center gap-7 border-b border-white/10 sm:gap-9">
          {KIND_SEGMENTS.map((seg) => {
            const Icon = seg.icon;
            const isActive = active === seg.id;
            return (
              <button
                key={seg.id}
                onClick={() => setActive(seg.id)}
                className={`relative flex min-h-[44px] items-center gap-2 px-0.5 pb-3 text-sm font-semibold transition-colors duration-200 ${
                  isActive ? "text-[#2EE6C6]" : "text-[#93A2B8] hover:text-white"
                }`}
              >
                <Icon size={16} />
                {seg.label}
                <span
                  className={`rounded-full px-1.5 text-[11px] font-bold tabular-nums transition-colors ${
                    isActive ? "bg-[#2EE6C6]/15 text-[#2EE6C6]" : "bg-white/8 text-[#93A2B8]"
                  }`}
                >
                  {counts[seg.id]}
                </span>
                {isActive && (
                  <motion.span
                    layoutId="showcase-filter-indicator"
                    className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-[#2EE6C6] to-[#27C7E5]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length > 0 ? (
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
      ) : (
        <motion.div
          key="empty"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto max-w-md rounded-3xl border border-dashed border-white/12 bg-white/[0.02] px-8 py-16 text-center"
        >
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C5CFF]/20 to-[#2EE6C6]/20 text-[#7C5CFF]">
            <Video size={26} />
          </span>
          <h3 className="mt-5 text-lg font-black text-white">Video reel coming soon</h3>
          <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-[#93A2B8]">
            Trailers, edits and motion work I&apos;ve produced — I&apos;m polishing the
            showcase now. Check back shortly.
          </p>
        </motion.div>
      )}
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
          className="group flex flex-col overflow-hidden rounded-3xl border border-white/8 bg-[#0E1626] transition-colors duration-200 hover:border-[#2EE6C6]/40"
        >
          {/* Certificate preview */}
          <div className={`relative aspect-[4/3] overflow-hidden border-b border-white/8 bg-black ${cert.imageFit === "contain" ? "bg-[#0E1626]" : ""}`}>
            {cert.image ? (
              <Image
                src={cert.image}
                alt={`${cert.name} certificate`}
                fill
                sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
                className={`transition-transform duration-500 group-hover:scale-105 ${
                  cert.imageFit === "contain" ? "object-contain p-3" : "object-cover object-top"
                }`}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#7C5CFF]/20 via-[#0E1626] to-[#2EE6C6]/10 transition-transform duration-500 group-hover:scale-105">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7C5CFF]/30 to-[#2EE6C6]/30 text-white">
                  <FileText size={26} />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#93A2B8]">
                  PDF Certificate
                </span>
              </div>
            )}
            <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-colors group-hover:border-[#2EE6C6]/50">
              {cert.url.toLowerCase().endsWith(".pdf") ? "View PDF" : "Verify"}
              <ExternalLink size={11} />
            </span>
          </div>

          {/* Meta */}
          <div className="flex items-start gap-3 p-6">
            <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#2EE6C6]/20 to-[#7C5CFF]/20 text-[#2EE6C6]">
              <BadgeCheck size={18} />
            </span>
            <div>
              <h3 className="text-base font-bold leading-snug text-white">{cert.name}</h3>
              <p className="mt-1 text-sm text-[#93A2B8]">{cert.org}</p>
              {cert.date && (
                <p className="mt-1 font-mono text-xs text-[#93A2B8]">{cert.date}</p>
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
          <p className="mx-auto mt-2 max-w-md text-sm text-[#93A2B8]">
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
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#2EE6C6]/20 to-[#7C5CFF]/20 text-[#2EE6C6]">
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
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#93A2B8]">
          Proficiency
        </span>
        {LEVEL_ORDER.map((lvl) => (
          <span key={lvl} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full bg-[#2EE6C6]"
              style={{ opacity: 0.35 + SKILL_LEVEL_FILL[lvl] * 0.65 }}
            />
            <span className="text-xs text-[#93A2B8]">{lvl}</span>
          </span>
        ))}
      </Reveal>
    </div>
  );
}
