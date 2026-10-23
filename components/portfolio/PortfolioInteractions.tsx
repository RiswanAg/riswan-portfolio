"use client";

import { useEffect, useRef, useState, type AnchorHTMLAttributes } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Copy, Menu, Moon, Sun, X } from "lucide-react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { CardContainer, CardBody } from "@/components/ui/3d-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  CERTIFICATES,
  NAV_LINKS,
  PROJECTS,
  SKILL_GROUPS,
  type Project,
} from "@/lib/data";

export function SectionAnchor({
  section,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { section: string }) {
  return (
    <a {...props} href={`/#${section}`}>
      {children}
    </a>
  );
}

export function PortfolioNav() {
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function close(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  return (
    <header className="portfolio-nav">
      <div className="portfolio-container flex min-h-20 items-center justify-between gap-5">
        <Link
          href="/"
          aria-label="RH. Riswan Hamua home"
          className="portfolio-logo"
        >
          RH<span>.</span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {NAV_LINKS.map((link) => (
            <SectionAnchor
              key={link.id}
              section={link.id}
              className="portfolio-nav-link"
            >
              {link.label}
            </SectionAnchor>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeButton />
          <InteractiveHoverButton
            href="/#contact"
            className="nav-21st-button hidden sm:inline-flex"
          >
            Let’s talk
          </InteractiveHoverButton>
          <button
            ref={menuButton}
            onClick={() => setOpen(!open)}
            type="button"
            aria-expanded={open}
            aria-controls="portfolio-mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="portfolio-icon-button portfolio-mobile-toggle"
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="portfolio-mobile-menu"
          aria-label="Mobile navigation"
          className="portfolio-mobile-menu lg:hidden"
        >
          {NAV_LINKS.map((link) => (
            <SectionAnchor
              key={link.id}
              section={link.id}
              onClick={() => setOpen(false)}
            >
              {link.label}
              <ArrowUpRight size={18} />
            </SectionAnchor>
          ))}
          <SectionAnchor section="contact" onClick={() => setOpen(false)}>
            Let’s talk
            <ArrowUpRight size={18} />
          </SectionAnchor>
        </nav>
      )}
    </header>
  );
}

function ThemeButton() {
  const input = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (input.current)
      input.current.checked =
        document.documentElement.classList.contains("dark");
  }, []);
  return (
    <label className="portfolio-theme" title="Switch colour theme">
      <input
        ref={input}
        type="checkbox"
        role="switch"
        aria-label="Dark theme"
        onChange={(event) => {
          const dark = event.target.checked;
          document.documentElement.classList.toggle("dark", dark);
          try {
            localStorage.setItem("theme", dark ? "dark" : "light");
          } catch {
            /* Theme works without storage. */
          }
        }}
      />
      <Moon className="portfolio-moon" size={18} aria-hidden />
      <Sun className="portfolio-sun" size={18} aria-hidden />
    </label>
  );
}

const PROJECT_COPY: Record<string, string> = {
  pencak: "Preserving Silat through full-body virtual reality.",
  "smart-farming": "Smart farming, reimagined as a holographic world.",
  "sneak-out": "A multiplayer escape rooted in Malaysian dorm life.",
  overtime: "An IT office. Co-op chaos. One game-jam winner.",
};

export function WorkCard({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  const localImage =
    project.image &&
    !["marblerun", "mars-marine", "signspeak-bim"].includes(project.slug);
  return (
    <CardContainer
      containerClassName="archive-3d-container"
      className="archive-3d-body"
    >
      <CardBody>
        <article className={`work-card ${large ? "work-card-large" : ""}`}>
          <Link
            href={`/projects/${project.slug}`}
            prefetch={false}
            className={`work-card-image work-image-${project.slug}`}
          >
            {localImage ? (
              <SmartImage
                src={project.image}
                alt={project.title}
                sizes={
                  large
                    ? "(min-width: 1440px) 690px, (min-width: 768px) 50vw, calc(100vw - 40px)"
                    : "(min-width: 1440px) 550px, (min-width: 768px) 42vw, calc(100vw - 40px)"
                }
                className={
                  project.imageFit === "contain"
                    ? "object-contain"
                    : "object-cover"
                }
                fallback={
                  <div className="project-type-art">
                    <span>{project.tech[0]}</span>
                    <strong>{project.title}</strong>
                    <ArrowUpRight size={40} />
                  </div>
                }
              />
            ) : (
              <div className="project-type-art">
                <span>{project.tech[0]}</span>
                <strong>{project.title}</strong>
                <ArrowUpRight size={40} />
              </div>
            )}
            <span className="work-card-arrow" aria-hidden>
              <ArrowUpRight size={23} />
            </span>
          </Link>
          <div className="work-card-meta">
            <span>{project.tech.slice(0, 2).join(" / ")}</span>
            <span>{project.status.label}</span>
          </div>
          <div className="work-card-title">
            <h3>
              <Link href={`/projects/${project.slug}`} prefetch={false}>
                {project.title}
              </Link>
            </h3>
            {project.award && (
              <span className="work-award">
                {project.award.split(" · ")[0]}
              </span>
            )}
          </div>
          <p className="work-card-description">
            {PROJECT_COPY[project.slug] ?? project.role.replace(/ · /g, " / ")}
          </p>
        </article>
      </CardBody>
    </CardContainer>
  );
}

const FILTERS = [
  { value: "all", label: "All work" },
  { value: "game", label: "Games & immersive" },
  { value: "video", label: "Motion & film" },
  { value: "other", label: "Experiments" },
];
const ARCHIVE_PROJECTS = PROJECTS.filter(
  (project) =>
    !["pencak", "smart-farming", "sneak-out", "overtime"].includes(
      project.slug,
    ),
);

export function WorkArchive() {
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(false);
  const projects = ARCHIVE_PROJECTS.filter(
    (project) => filter === "all" || project.kind === filter,
  );
  const visible = expanded ? projects : projects.slice(0, 4);
  return (
    <Tabs defaultValue="projects" className="work-archive">
      <TabsList
        variant="line"
        className="portfolio-tabs"
        aria-label="Portfolio collections"
      >
        <TabsTrigger value="projects">
          More projects <span>{ARCHIVE_PROJECTS.length}</span>
        </TabsTrigger>
        <TabsTrigger value="certificates">
          Certificates <span>{CERTIFICATES.length}</span>
        </TabsTrigger>
        <TabsTrigger value="stack">My toolkit</TabsTrigger>
      </TabsList>
      <TabsContent value="projects" className="pt-8">
        <div
          className="work-filter"
          role="group"
          aria-label="Filter projects by discipline"
        >
          {FILTERS.map((item) => (
            <button
              key={item.value}
              type="button"
              aria-pressed={filter === item.value}
              onClick={() => {
                setFilter(item.value);
                setExpanded(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="archive-grid">
          {visible.map((project) => (
            <WorkCard key={project.slug} project={project} />
          ))}
        </div>
        {projects.length > 4 && (
          <div className="mt-12 text-center">
            <InteractiveHoverButton onClick={() => setExpanded(!expanded)}>
              {expanded ? "Show less" : `View all ${projects.length} projects`}
            </InteractiveHoverButton>
          </div>
        )}
      </TabsContent>
      <TabsContent value="certificates" className="pt-10">
        <div className="certificate-grid">
          {CERTIFICATES.map((certificate) => (
            <a
              key={certificate.name}
              href={certificate.url}
              target="_blank"
              rel="noopener noreferrer"
              className="certificate-item"
            >
              {certificate.image && (
                <div className="certificate-image">
                  <Image
                    src={certificate.image}
                    alt={certificate.name}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-contain"
                  />
                </div>
              )}
              <div className="flex items-start justify-between gap-4">
                <h3>{certificate.name}</h3>
                <ArrowUpRight size={18} className="shrink-0" />
              </div>
              <p>{certificate.org}</p>
            </a>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="stack" className="pt-10">
        <div className="toolkit-grid">
          {SKILL_GROUPS.map((group) => (
            <div key={group.category}>
              <h3 className="mb-6 text-lg font-semibold">{group.category}</h3>
              <ul className="space-y-4">
                {group.skills.map((skill) => (
                  <li key={skill.name} className="flex items-center gap-3">
                    <span className="toolkit-logo">
                      <Image
                        src={skill.logo}
                        alt=""
                        width={25}
                        height={25}
                        className="object-contain"
                      />
                    </span>
                    <span className="flex-1 text-sm">{skill.name}</span>
                    <span className="text-xs text-dim">{skill.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  return (
    <div className="flex items-center gap-3">
      <button
        className="copy-email"
        type="button"
        aria-label="Copy email address"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email);
            setState("copied");
          } catch {
            setState("error");
          }
          if (timer.current) clearTimeout(timer.current);
          timer.current = setTimeout(() => setState("idle"), 3000);
        }}
      >
        {state === "copied" ? <Check size={17} /> : <Copy size={17} />}
      </button>
      <span className="text-xs" role="status">
        {state === "copied"
          ? "Email copied"
          : state === "error"
            ? "Select the email to copy it"
            : "Copy email"}
      </span>
    </div>
  );
}
