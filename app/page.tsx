"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = ["about", "projects", "skills", "achievements", "contact"];

const PROJECTS = [
  {
    title: "Smart Farming Simulation Game",
    description:
      "An AI-driven farming simulation featuring real-time crop management, dynamic weather systems, and smart automation mechanics built in Unity.",
    contributions: [
      "Designed AI crop growth & weather simulation systems",
      "Built inventory & resource management UI in Unity",
      "Implemented NPC behaviour trees for farm automation",
    ],
    tech: ["Unity", "C#", "AI", "Simulation"],
    color: { from: "#10b981", to: "#0d9488" },
    imgBg: "from-emerald-900/60 to-teal-900/60",
    imgIcon: "🌾",
    github: "#",
    demo: "#",
  },
  {
    title: "Library Management System",
    description:
      "A full-featured library management system with CRUD operations, user authentication, and persistent MySQL database integration.",
    contributions: [
      "Architected relational schema with MySQL",
      "Built CRUD interface with C++ and OOP principles",
      "Implemented user authentication & session handling",
    ],
    tech: ["C++", "MySQL", "OOP"],
    color: { from: "#06b6d4", to: "#3b82f6" },
    imgBg: "from-cyan-900/60 to-blue-900/60",
    imgIcon: "📚",
    github: "#",
    demo: "#",
  },
  {
    title: "Rabbit Invasion Racing",
    description:
      "A 3D racing game built with OpenGL featuring custom GLSL shaders, real-time physics simulation, and dynamic obstacle spawning.",
    contributions: [
      "Wrote custom vertex & fragment GLSL shaders",
      "Implemented real-time collision detection & physics",
      "Designed procedural obstacle and level generation",
    ],
    tech: ["OpenGL", "C++", "GLSL", "Physics"],
    color: { from: "#f59e0b", to: "#ef4444" },
    imgBg: "from-amber-900/60 to-red-900/60",
    imgIcon: "🐇",
    github: "#",
    demo: "#",
  },
  {
    title: "2D Platformer Game",
    description:
      "A polished 2D platformer built in GDevelop with hand-crafted level design, fluid character animations, and progressive difficulty.",
    contributions: [
      "Designed 10+ levels with escalating challenge",
      "Created character sprite sheets & animation states",
      "Tuned physics parameters for satisfying game feel",
    ],
    tech: ["GDevelop", "Game Design", "Level Design", "Animation"],
    color: { from: "#8b5cf6", to: "#ec4899" },
    imgBg: "from-violet-900/60 to-pink-900/60",
    imgIcon: "🕹️",
    github: "#",
    demo: "#",
  },
];

const SKILLS = [
  { name: "Unity", icon: "🎮", category: "Engine" },
  { name: "C#", icon: "⚙️", category: "Language" },
  { name: "C++", icon: "💻", category: "Language" },
  { name: "Blender", icon: "🎨", category: "3D Tool" },
  { name: "MySQL", icon: "🗄️", category: "Database" },
  { name: "GitHub", icon: "🐙", category: "Version Control" },
  { name: "Game Design", icon: "🕹️", category: "Design" },
  { name: "UI/UX", icon: "✨", category: "Design" },
  { name: "AI Basics", icon: "🤖", category: "AI" },
];

const ACHIEVEMENTS = [
  {
    icon: "🏆",
    year: "2023 – 2024",
    title: "Dean's List — Semester 1, 2 & 3",
    description:
      "Consistently recognised on the Dean's List across three consecutive semesters, reflecting sustained academic excellence.",
  },
  {
    icon: "⚽",
    year: "2022",
    title: "National Football Participation",
    description:
      "Selected to represent at the national level in football, demonstrating elite teamwork and competitive discipline.",
  },
  {
    icon: "🥉",
    year: "2020",
    title: "3rd Place — Sabah COVID-19 Infographic",
    description:
      "Awarded 3rd Place in the Sabah COVID-19 Infographic Competition for outstanding visual communication and creative design.",
  },
];

// ─── Scroll-reveal hook ────────────────────────────────────────────────────────

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Section heading ───────────────────────────────────────────────────────────

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <Reveal className="text-center mb-16">
      <p className="text-indigo-400 text-xs tracking-[0.25em] uppercase mb-3">
        {eyebrow}
      </p>
      <h2 className="text-4xl md:text-5xl font-black text-white">{title}</h2>
    </Reveal>
  );
}

// ─── Portfolio ─────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden">
      {/* Subtle grid overlay */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,.04) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#030712]/90 backdrop-blur-md border-b border-white/5 shadow-xl shadow-black/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="text-xl font-black bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent tracking-tight"
          >
            RH.
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="text-slate-400 hover:text-indigo-400 transition-colors text-sm capitalize tracking-wide"
              >
                {s}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            className="md:hidden w-8 h-8 flex flex-col justify-center gap-[5px] group"
          >
            <span
              className={`block h-0.5 bg-slate-400 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block h-0.5 bg-slate-400 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 bg-slate-400 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? "max-h-64" : "max-h-0"}`}
        >
          <div className="px-6 pb-6 flex flex-col gap-4 border-t border-white/5 pt-4 bg-[#030712]/95">
            {NAV_LINKS.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="text-slate-400 hover:text-indigo-400 transition-colors text-sm capitalize text-left"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center px-6 pt-20"
      >
        {/* Glow blobs */}
        <div
          aria-hidden
          className="absolute top-1/3 left-1/4 w-[480px] h-[480px] rounded-full bg-indigo-700/10 blur-3xl pulse-glow pointer-events-none"
        />
        <div
          aria-hidden
          className="absolute bottom-1/4 right-1/3 w-[360px] h-[360px] rounded-full bg-cyan-700/10 blur-3xl pulse-glow pointer-events-none"
          style={{ animationDelay: "1.5s" }}
        />

        <div className="relative max-w-6xl mx-auto w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12 py-16">
          {/* Left — text content */}
          <div className="flex-1 text-center md:text-left">
            {/* Badge */}
            <div className="anim-fade-in-up inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs tracking-[0.2em] uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Game Developer Portfolio
            </div>

            {/* Name */}
            <h1 className="anim-fade-in-up anim-delay-1 text-6xl sm:text-7xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-6">
              <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent">
                Riswan
              </span>
              <br />
              <span className="text-white">Hamua</span>
            </h1>

            {/* Tagline */}
            <p className="anim-fade-in-up anim-delay-2 text-base md:text-lg text-slate-400 mb-10 leading-relaxed">
              Game Technology Student&nbsp;&nbsp;·&nbsp;&nbsp;Unity Developer
              <br className="hidden sm:block" />
              &nbsp;&nbsp;·&nbsp;&nbsp;Interactive Simulation Developer
            </p>

            {/* CTAs */}
            <div className="anim-fade-in-up anim-delay-3 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={() => scrollTo("projects")}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold hover:from-indigo-500 hover:to-indigo-400 transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-indigo-500/20 active:scale-[0.97]"
              >
                View Projects
              </button>
              <a
                href="/cv.pdf"
                download
                className="px-8 py-4 rounded-xl border border-indigo-500/40 text-indigo-300 font-bold hover:bg-indigo-500/10 hover:border-indigo-400/60 transition-all hover:scale-[1.03] active:scale-[0.97]"
              >
                Download CV
              </a>
              <button
                onClick={() => scrollTo("contact")}
                className="px-8 py-4 rounded-xl border border-slate-700 text-slate-300 font-bold hover:bg-slate-800/60 hover:border-slate-600 transition-all hover:scale-[1.03] active:scale-[0.97]"
              >
                Contact Me
              </button>
            </div>
          </div>

          {/* Right — profile photo */}
          <div className="anim-fade-in-up anim-delay-2 flex-shrink-0 flex items-center justify-center">
            {/* Outer glow ring */}
            <div className="relative group">
              {/* Animated gradient ring */}
              <div
                className="absolute -inset-[3px] rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-[2px]"
                style={{
                  background:
                    "conic-gradient(from 0deg, #6366f1, #06b6d4, #a855f7, #6366f1)",
                  animation: "spin 6s linear infinite",
                }}
              />
              {/* Inner dark ring spacer */}
              <div className="relative rounded-full p-[3px] bg-[#030712]">
                <div className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden bg-[#0f172a] border border-white/5">
                  <Image
                    src="/profile.jpg"
                    alt="Riswan Hamua"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/profile.svg";
                    }}
                  />
                  {/* Subtle inner vignette */}
                  <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
                </div>
              </div>

              {/* Floating status badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0f172a] border border-indigo-500/30 shadow-xl shadow-black/40 whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-slate-300 font-medium">Open to opportunities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-700">
          <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-slate-700 to-transparent" />
        </div>
      </section>

      {/* ── About ──────────────────────────────────────────────────────── */}
      <section id="about" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Get to know me" title="About Me" />

          <div className="grid md:grid-cols-2 gap-14 items-center">
            <Reveal className="space-y-5 text-slate-300 leading-relaxed">
              <p className="text-lg">
                I&apos;m{" "}
                <span className="text-indigo-400 font-semibold">
                  Riswan Hamua
                </span>
                , a Game Technology student passionate about building immersive
                digital experiences where technology, art, and interactivity
                converge.
              </p>
              <p>
                My core focus is{" "}
                <span className="text-cyan-400 font-medium">
                  Unity game development
                </span>{" "}
                — crafting everything from simulation systems to interactive
                environments using C# and modern game-engine workflows.
              </p>
              <p>
                I&apos;m particularly drawn to{" "}
                <span className="text-emerald-400 font-medium">
                  Smart Farming Simulations
                </span>{" "}
                and AI-driven game mechanics — building systems that feel alive,
                adaptive, and meaningful. Beyond the screen, I enjoy blending
                systems thinking with real-world applications.
              </p>
            </Reveal>

            <Reveal delay={150}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Primary Engine", value: "Unity & C#", icon: "🎮" },
                  { label: "Interest", value: "AI & Simulation", icon: "🤖" },
                  { label: "Passion", value: "Game Design", icon: "🕹️" },
                  { label: "Research", value: "Smart Farming", icon: "🌱" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-5 rounded-2xl bg-[#0f172a] border border-white/5 hover:border-indigo-500/30 transition-all hover:-translate-y-1 cursor-default"
                  >
                    <div className="text-2xl mb-3">{item.icon}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">
                      {item.label}
                    </div>
                    <div className="text-slate-200 font-semibold text-sm">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Currently Building ─────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#040c18]">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden border border-emerald-500/20 bg-[#060f1a]">
              {/* Animated background glow */}
              <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pulse-glow pointer-events-none" />
              <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-teal-600/8 rounded-full blur-3xl pulse-glow pointer-events-none" style={{ animationDelay: "1.5s" }} />

              {/* Grid texture */}
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(16,185,129,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,.05) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                }}
              />

              <div className="relative z-10 p-8 md:p-12">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
                    </span>
                    <span className="text-emerald-400 text-xs font-semibold tracking-[0.25em] uppercase">
                      Currently Building
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium">
                    In Active Development
                  </span>
                </div>

                <div className="grid lg:grid-cols-2 gap-10 items-center">
                  {/* Left — project info */}
                  <div className="flex flex-col gap-6">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">
                        Smart Farming{" "}
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                          Simulation Game
                        </span>
                      </h2>
                      <p className="text-slate-400 leading-relaxed">
                        A Unity-based interactive simulation blending smart agriculture with immersive gameplay — featuring AI-driven drone monitoring, real-time disease detection, and multiplayer cooperative farming.
                      </p>
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {["Unity", "C#", "Photon (Multiplayer)", "AI / ML", "Blender"].map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Progress bar */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[11px] text-slate-500 uppercase tracking-widest">Development Progress</span>
                        <span className="text-emerald-400 text-sm font-bold">45%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-1000"
                          style={{ width: "45%" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right — feature list */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: "🚁", label: "Drone Monitoring", desc: "Autonomous UAV crop surveillance" },
                      { icon: "🦠", label: "Disease Detection", desc: "AI-powered plant pathology system" },
                      { icon: "🌱", label: "Smart Agriculture", desc: "Sensor-driven precision farming" },
                      { icon: "🎮", label: "Interactive Sim", desc: "Real-time decision gameplay" },
                      { icon: "👥", label: "Multiplayer", desc: "Co-op & competitive farming" },
                      { icon: "🗺️", label: "Unity Engine", desc: "Custom shaders & physics" },
                    ].map((f) => (
                      <div
                        key={f.label}
                        className="flex flex-col gap-1.5 p-4 rounded-2xl bg-white/3 border border-white/6 hover:border-emerald-500/25 hover:bg-emerald-500/5 transition-all duration-200 group"
                      >
                        <span className="text-2xl">{f.icon}</span>
                        <span className="text-white text-sm font-semibold leading-tight group-hover:text-emerald-300 transition-colors">
                          {f.label}
                        </span>
                        <span className="text-slate-500 text-xs leading-snug">{f.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Projects ───────────────────────────────────────────────────── */}
      <section id="projects" className="py-28 px-6 bg-[#040c18]">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="What I've built" title="Projects" />

          <div className="grid lg:grid-cols-2 gap-8">
            {PROJECTS.map((project, i) => (
              <Reveal key={project.title} delay={i * 90}>
                <div className="group relative rounded-3xl overflow-hidden border border-white/6 bg-[#080f1e] hover:border-white/12 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/60 flex flex-col h-full">

                  {/* ── Image / preview area ── */}
                  <div className={`relative h-48 bg-gradient-to-br ${project.imgBg} overflow-hidden flex-shrink-0`}>
                    {/* Animated gradient overlay on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: `linear-gradient(135deg, ${project.color.from}22, ${project.color.to}22)`,
                      }}
                    />
                    {/* Grid texture */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
                        backgroundSize: "24px 24px",
                      }}
                    />
                    {/* Centered icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span
                        className="text-7xl select-none transition-transform duration-500 group-hover:scale-110 drop-shadow-2xl"
                        style={{ filter: "drop-shadow(0 0 24px rgba(255,255,255,.15))" }}
                      >
                        {project.imgIcon}
                      </span>
                    </div>
                    {/* Bottom fade into card body */}
                    <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-[#080f1e] to-transparent" />

                    {/* Accent line */}
                    <div
                      className="absolute bottom-0 inset-x-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                      style={{
                        background: `linear-gradient(90deg, ${project.color.from}, ${project.color.to})`,
                      }}
                    />
                  </div>

                  {/* ── Card body ── */}
                  <div className="flex flex-col flex-1 p-7 gap-5">

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/8 text-slate-400 text-[11px] font-mono tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3
                      className="text-xl font-black text-white leading-snug transition-colors duration-300"
                      style={{ ["--hover-color" as string]: project.color.from }}
                    >
                      <span className="group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
                        style={{
                          backgroundImage: `linear-gradient(90deg, ${project.color.from}, ${project.color.to})`,
                          WebkitBackgroundClip: "text",
                        }}
                      >
                        {project.title}
                      </span>
                    </h3>

                    {/* Description */}
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {project.description}
                    </p>

                    {/* Key contributions */}
                    <div className="flex flex-col gap-2 flex-1">
                      <p className="text-[10px] text-slate-500 uppercase tracking-[0.18em] font-semibold mb-1">
                        Key Contributions
                      </p>
                      {project.contributions.map((c) => (
                        <div key={c} className="flex items-start gap-2.5">
                          <span
                            className="mt-[5px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: project.color.from }}
                          />
                          <span className="text-slate-400 text-sm leading-relaxed">{c}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 pt-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/10 hover:border-white/25 bg-white/3 hover:bg-white/6 text-slate-300 hover:text-white text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.026 2.747-1.026.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
                        </svg>
                        GitHub
                      </a>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] hover:shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${project.color.from}, ${project.color.to})`,
                          boxShadow: `0 0 0 0 ${project.color.from}`,
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.boxShadow = `0 8px 24px ${project.color.from}44`)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.boxShadow = "none")
                        }
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                          <polyline points="15 3 21 3 21 9"/>
                          <line x1="10" y1="14" x2="21" y2="3"/>
                        </svg>
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ─────────────────────────────────────────────────────── */}
      <section id="skills" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="What I work with" title="Skills" />

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-4">
            {SKILLS.map((skill, i) => (
              <Reveal key={skill.name} delay={i * 50}>
                <div className="flex flex-col items-center p-5 rounded-2xl bg-[#0f172a] border border-white/5 hover:border-indigo-500/35 hover:bg-[#131e36] transition-all hover:-translate-y-1 cursor-default group">
                  <span className="text-3xl mb-3">{skill.icon}</span>
                  <span className="text-slate-200 font-semibold text-sm text-center leading-tight">
                    {skill.name}
                  </span>
                  <span className="text-slate-600 text-[10px] mt-1 uppercase tracking-wider">
                    {skill.category}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Achievements ───────────────────────────────────────────────── */}
      <section id="achievements" className="py-28 px-6 bg-[#040c18]">
        <div className="max-w-6xl mx-auto">
          <SectionHeading eyebrow="Recognition" title="Achievements" />

          <div className="grid md:grid-cols-3 gap-6">
            {ACHIEVEMENTS.map((a, i) => (
              <Reveal key={a.title} delay={i * 120}>
                <div className="p-7 rounded-2xl bg-[#0f172a] border border-white/5 hover:border-indigo-500/25 transition-all hover:-translate-y-1 cursor-default group h-full flex flex-col gap-4">
                  <div className="text-4xl">{a.icon}</div>
                  <div>
                    <div className="text-[10px] text-indigo-400 uppercase tracking-[0.2em] mb-2">
                      {a.year}
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {a.title}
                    </h3>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1">
                    {a.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Resume ─────────────────────────────────────────────────────── */}
      <section id="resume" className="py-28 px-6">
        <div className="max-w-xl mx-auto">
          <Reveal>
            <div className="relative p-12 rounded-3xl bg-[#0f172a] border border-indigo-500/20 text-center overflow-hidden">
              {/* Glow */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-br from-indigo-600/8 to-cyan-600/8 pointer-events-none"
              />
              <div
                aria-hidden
                className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"
              />

              <div className="relative z-10">
                <div className="text-5xl mb-6">📄</div>
                <h2 className="text-3xl font-black text-white mb-3">
                  Resume / CV
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  Download my full resume to explore my education, technical
                  skills, and project highlights in detail.
                </p>
                <a
                  href="/cv.pdf"
                  download
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 text-white font-bold hover:from-indigo-500 hover:to-indigo-400 transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-indigo-500/20 active:scale-[0.97]"
                >
                  <span>↓</span>
                  Download CV
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Contact ────────────────────────────────────────────────────── */}
      <section id="contact" className="py-28 px-6 bg-[#040c18]">
        <div className="max-w-4xl mx-auto">
          <SectionHeading eyebrow="Let's connect" title="Contact" />

          <Reveal className="text-center mb-12">
            <p className="text-slate-400 text-lg">
              Open to opportunities, collaborations, and conversations.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              {
                icon: "✉️",
                label: "Email",
                display: "riswanjunior98@gmail.com",
                href: "mailto:riswanjunior98@gmail.com",
              },
              {
                icon: "💼",
                label: "LinkedIn",
                display: "linkedin.com/in/riswan-hamua",
                href: "https://linkedin.com/in/riswan-hamua",
              },
              {
                icon: "🐙",
                label: "GitHub",
                display: "github.com/riswan-hamua",
                href: "https://github.com/riswan-hamua",
              },
            ].map((c, i) => (
              <Reveal key={c.label} delay={i * 100}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-[#0f172a] border border-white/5 hover:border-indigo-500/35 hover:bg-[#131e36] transition-all hover:-translate-y-1 group text-center"
                >
                  <span className="text-4xl">{c.icon}</span>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">
                      {c.label}
                    </div>
                    <div className="text-slate-300 group-hover:text-indigo-300 transition-colors text-sm font-medium break-all">
                      {c.display}
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="font-black text-lg bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            Riswan Hamua
          </span>
          <p className="text-slate-600 text-xs">
            © 2026 Riswan Hamua · Game Technology Student · Built with Next.js
          </p>
        </div>
      </footer>
    </div>
  );
}
