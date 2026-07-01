"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/data";
import { SmartImage } from "@/components/ui/SmartImage";
import { TechBadge, StatusBadge } from "@/components/ui/Badges";

// ── Icons ─────────────────────────────────────────────────────────────────────

function CloseIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {dir === "left" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
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
function PlayIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

// ── Expanded panel (full-screen overlay) ──────────────────────────────────────

function ExpandedPanel({
  project,
  originRect,
  onClose,
}: {
  project: Project;
  originRect: DOMRect;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const media = project.gallery ?? [{ type: "image" as const, src: project.image }];
  const active = media[activeIndex];
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < media.length - 1;

  const gap = 16;
  const target = {
    left: gap,
    top: gap,
    width: window.innerWidth - gap * 2,
    height: window.innerHeight - gap * 2,
    borderRadius: 28,
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && hasNext) setActiveIndex((i) => i + 1);
      if (e.key === "ArrowLeft" && hasPrev) setActiveIndex((i) => i - 1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, hasPrev, hasNext]);

  useEffect(() => {
    if (active.type === "video" && videoRef.current) videoRef.current.load();
  }, [activeIndex, active.type]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-40 bg-black/85 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      />

      {/* Panel — starts at card rect, expands to full screen */}
      <motion.div
        className="fixed z-50 flex flex-col overflow-hidden border border-white/10 bg-[#111111] shadow-2xl shadow-black/70 lg:flex-row"
        initial={{
          left: originRect.left,
          top: originRect.top,
          width: originRect.width,
          height: originRect.height,
          borderRadius: 24,
        }}
        animate={target}
        exit={{
          left: originRect.left,
          top: originRect.top,
          width: originRect.width,
          height: originRect.height,
          borderRadius: 24,
          opacity: 0,
          transition: { type: "spring", stiffness: 280, damping: 30 },
        }}
        transition={{ type: "spring", stiffness: 280, damping: 30 }}
      >
        {/* Left: media */}
        <div className="flex flex-col bg-black/60 lg:w-[58%]">
          <div className="relative flex aspect-video w-full items-center justify-center bg-black">
            {active.type === "youtube" ? (
              <iframe
                key={active.src}
                src={`https://www.youtube.com/embed/${active.src}?autoplay=1`}
                title={active.caption ?? project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            ) : active.type === "video" ? (
              <video ref={videoRef} src={active.src} controls autoPlay playsInline className="h-full w-full object-contain" />
            ) : (
              <Image src={active.src} alt={active.caption ?? project.title} fill className="object-contain" sizes="(max-width: 1024px) 100vw, 58vw" />
            )}

            {hasPrev && (
              <button onClick={() => setActiveIndex((i) => i - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/60 p-2 text-white backdrop-blur-sm transition-all hover:border-white/40">
                <ChevronIcon dir="left" />
              </button>
            )}
            {hasNext && (
              <button onClick={() => setActiveIndex((i) => i + 1)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/60 p-2 text-white backdrop-blur-sm transition-all hover:border-white/40">
                <ChevronIcon dir="right" />
              </button>
            )}
          </div>

          {active.caption && <p className="px-4 py-2 text-center text-xs text-[#A3A3A3]/60">{active.caption}</p>}

          {media.length > 1 && (
            <div className="flex gap-2 overflow-x-auto p-3">
              {media.map((m, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${i === activeIndex ? "border-[#DF2531]" : "border-white/10 opacity-40 hover:opacity-70"}`}
                >
                  {m.type === "youtube" ? (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-red-950/60 text-slate-300">
                      <PlayIcon /><span className="text-[8px] font-bold uppercase tracking-widest text-red-400">YT</span>
                    </div>
                  ) : m.type === "video" ? (
                    <div className="flex h-full w-full items-center justify-center bg-black/60 text-slate-300"><PlayIcon /></div>
                  ) : (
                    <Image src={m.src} alt="" fill className="object-cover" sizes="80px" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: details */}
        <div className="flex flex-col gap-5 overflow-y-auto p-7 lg:w-[42%]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <StatusBadge status={project.status} />
              <h2 className="mt-3 text-2xl font-black leading-tight text-white">{project.title}</h2>
            </div>
            <button onClick={onClose} className="mt-1 shrink-0 rounded-full border border-white/10 p-2 text-[#A3A3A3] transition-all hover:border-white/30 hover:text-white">
              <CloseIcon />
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => <TechBadge key={t}>{t}</TechBadge>)}
          </div>

          <p className="text-sm leading-relaxed text-[#A3A3A3]">{project.description}</p>

          <div className="rounded-2xl border border-white/6 bg-white/3 p-4">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#DF2531]/80">My Contribution</p>
            <p className="text-sm leading-relaxed text-[#A3A3A3]/70">{project.contribution}</p>
          </div>

          <div className="mt-auto flex gap-3 pt-2">
            {project.github !== "#" && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-sm font-semibold text-[#A3A3A3] transition-all hover:border-white/25 hover:text-white">
                <GithubIcon />GitHub
              </a>
            )}
            {project.demo !== "#" && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#DF2531] to-[#7A1018] py-2.5 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#DF2531]/30">
                <ExternalIcon />Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ── Card ──────────────────────────────────────────────────────────────────────

export function ProjectCard({ project, featured, href }: { project: Project; featured?: boolean; href?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoVisible, setVideoVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [originRect, setOriginRect] = useState<DOMRect | null>(null);

  const handleMouseEnter = () => {
    if (project.previewVideo) {
      setVideoVisible(true);
      videoRef.current?.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setVideoVisible(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleClick = () => {
    if (href) return; // Let Link handle it
    if (cardRef.current) setOriginRect(cardRef.current.getBoundingClientRect());
    setExpanded(true);
  };

  const cardContent = (
    <>
      {/* Visual */}
      <div className={`relative overflow-hidden ${featured ? "h-56 lg:h-auto lg:w-1/2" : "h-52"}`}>
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
          <SmartImage
            src={project.image}
            alt={project.title}
            sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
            fallback={
              <div className={`relative h-full w-full bg-gradient-to-br ${project.fallbackGradient}`}>
                <div className="absolute inset-0 bg-grid-tight opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-90 drop-shadow-[0_0_24px_rgba(255,255,255,0.18)]">{project.fallbackIcon}</span>
                </div>
              </div>
            }
          />
        </div>

        {project.previewVideo && (
          <video
            ref={videoRef}
            src={project.previewVideo}
            muted loop playsInline preload="none"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${videoVisible ? "opacity-100" : "opacity-0"}`}
          />
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
        <div className="absolute left-4 top-4"><StatusBadge status={project.status} /></div>
        <div className="absolute inset-0 flex items-end justify-center pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full border border-white/20 bg-black/60 px-4 py-1.5 text-xs font-medium tracking-wide text-white backdrop-blur-sm">
            {href ? "View project" : "Click to explore"}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className={`flex flex-1 flex-col gap-4 p-6 ${featured ? "lg:w-1/2 lg:p-8" : ""}`}>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => <TechBadge key={t}>{t}</TechBadge>)}
        </div>
        <h3 className={`font-black leading-snug text-white transition-colors group-hover:text-[#DF2531] ${featured ? "text-2xl" : "text-xl"}`}>
          {project.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-[#A3A3A3]">{project.description}</p>
        <div className="mt-auto">
          <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#DF2531]/80">My Contribution</p>
          <p className="line-clamp-2 text-sm leading-relaxed text-[#A3A3A3]/70">{project.contribution}</p>
        </div>
      </div>
    </>
  );

  const cardClass = `group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-white/8 bg-[#111111] transition-[border-color,box-shadow] duration-300 hover:border-[#DF2531]/30 hover:shadow-2xl hover:shadow-[#DF2531]/10 ${featured ? "lg:flex-row" : ""}`;

  if (href) {
    return (
      <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
        <Link
          href={href}
          className={cardClass}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {cardContent}
        </Link>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        ref={cardRef}
        className={cardClass}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        whileHover={{ y: -6 }}
        animate={{ opacity: expanded ? 0.4 : 1 }}
        transition={{ duration: 0.25 }}
      >
        {cardContent}
      </motion.div>

      <AnimatePresence>
        {expanded && originRect && (
          <ExpandedPanel
            project={project}
            originRect={originRect}
            onClose={() => setExpanded(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
