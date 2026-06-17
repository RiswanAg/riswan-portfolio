// ─── Portfolio content ──────────────────────────────────────────────────────
// All page copy + data lives here so sections stay presentational.

export const PROFILE = {
  name: "Riswan Hamua",
  roles: [
    "Game Technology Student",
    "Unity Developer",
    "Interactive Simulation Developer",
  ],
  tagline:
    "I build interactive simulations and games that turn complex systems — from smart agriculture to real-time mechanics — into something you can play.",
  availability: "Open to Internship Opportunities",
  image: "/profile.png", // graceful fallback to /profile.svg if missing
  imageFallback: "/profile.svg",
  cv: "/cv.pdf",
};

export const NAV_LINKS = [
  { id: "building", label: "Building" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
] as const;

// ─── Stats bar ────────────────────────────────────────────────────────────────
// `value` drives the count-up animation when numeric; text stats render as-is.

export type Stat = {
  label: string;
  value?: number; // numeric → animated counter
  suffix?: string;
  display?: string; // non-numeric stats
};

export const STATS: Stat[] = [
  { label: "Dean's List", value: 3, suffix: " Semesters" },
  { label: "Projects", value: 4, suffix: "+" },
  { label: "Specialization", display: "Unity & C++" },
  { label: "Field", display: "Game Technology" },
];

// ─── Currently building: Smart Farming Simulation ──────────────────────────────

export const BUILDING = {
  status: "In Active Development",
  version: "v0.1",
  title: "Smart Farming Simulation",
  kicker: "Currently Building",
  pitch:
    "A Unity-based interactive simulation that teaches modern oil-palm nursery management — blending IoT soil data, drone scouting, and AI disease detection into a hands-on learning experience.",
  image: "/smart-farming-showcase.png", // graceful styled fallback if missing
  hud: ["SOIL 62%", "DRONE ONLINE", "NURSERY · BLOCK A", "AI SCAN: READY"],
  features: [
    {
      icon: "🎮",
      label: "Unity Simulation",
      desc: "Built as a real-time, interactive 3D smart-farming simulation.",
    },
    {
      icon: "🌴",
      label: "Oil Palm Nursery",
      desc: "An authentic nursery environment and crop lifecycle to manage.",
    },
    {
      icon: "📡",
      label: "IoT Soil Monitoring",
      desc: "Live soil & moisture sensor data feeds the gameplay loop.",
    },
    {
      icon: "🚁",
      label: "Drone Monitoring",
      desc: "Aerial scouting system for field overview and inspection.",
    },
    {
      icon: "🔬",
      label: "Disease Detection",
      desc: "AI-assisted plant disease identification mechanics.",
    },
    {
      icon: "📚",
      label: "Interactive Learning",
      desc: "A gamified, hands-on educational loop for real agronomy skills.",
    },
  ],
};

// ─── Featured projects ──────────────────────────────────────────────────────

export type Project = {
  title: string;
  description: string;
  tech: string[];
  contribution: string;
  status: { label: string; tone: "live" | "done" | "proto" };
  image: string;
  fallbackIcon: string;
  fallbackGradient: string; // tailwind gradient classes
  github: string;
  demo: string;
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    title: "Smart Farming Simulation Game",
    description:
      "A Unity-based smart agriculture simulation set in an oil-palm nursery — featuring IoT soil monitoring, drone scouting, and AI disease detection as interactive gameplay.",
    tech: ["Unity", "C#", "IoT", "AI", "Simulation"],
    contribution:
      "Designing the simulation systems, sensor-driven gameplay loop, and interactive learning mechanics.",
    status: { label: "In Development", tone: "live" },
    image: "/project-smart-farming.png",
    fallbackIcon: "🌴",
    fallbackGradient: "from-emerald-800/50 via-lime-900/30 to-teal-900/50",
    github: "#",
    demo: "#",
    featured: true,
  },
  {
    title: "Library Management System",
    description:
      "A full-featured library management system with CRUD operations, user authentication, and a persistent relational database.",
    tech: ["C++", "MySQL", "OOP"],
    contribution:
      "Architected the relational schema and built the CRUD interface with OOP principles and session handling.",
    status: { label: "Completed", tone: "done" },
    image: "/project-library.png",
    fallbackIcon: "📚",
    fallbackGradient: "from-cyan-800/50 via-sky-900/30 to-blue-900/50",
    github: "#",
    demo: "#",
  },
  {
    title: "Rabbit Invasion Racing",
    description:
      "A 3D racing game built with OpenGL featuring custom GLSL shaders, real-time physics, and dynamic obstacle spawning.",
    tech: ["OpenGL", "C++", "GLSL", "Physics"],
    contribution:
      "Wrote custom vertex & fragment shaders and implemented real-time collision and procedural obstacles.",
    status: { label: "Completed", tone: "done" },
    image: "/project-rabbit-racing.png",
    fallbackIcon: "🐇",
    fallbackGradient: "from-amber-800/50 via-orange-900/30 to-red-900/50",
    github: "#",
    demo: "#",
  },
  {
    title: "2D Platformer Game",
    description:
      "A polished 2D platformer with hand-crafted level design, fluid character animation, and progressive difficulty.",
    tech: ["GDevelop", "Game Design", "Level Design", "Animation"],
    contribution:
      "Designed 10+ escalating levels, character animation states, and tuned physics for satisfying game feel.",
    status: { label: "Completed", tone: "done" },
    image: "/project-platformer.png",
    fallbackIcon: "🕹️",
    fallbackGradient: "from-violet-800/50 via-fuchsia-900/30 to-pink-900/50",
    github: "#",
    demo: "#",
  },
];

// ─── Skills (grouped) ──────────────────────────────────────────────────────

export type SkillGroup = { category: string; accent: string; skills: string[] };

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Game Development",
    accent: "emerald",
    skills: ["Unity", "C#", "C++"],
  },
  {
    category: "Creative Tools",
    accent: "lime",
    skills: ["Blender", "UI/UX"],
  },
  {
    category: "AI Tools",
    accent: "cyan",
    skills: ["Nano Banana", "Veo", "AI Visual Prototyping"],
  },
  {
    category: "Development",
    accent: "sky",
    skills: ["Git", "GitHub", "MySQL"],
  },
];

// ─── Achievements (timeline) ─────────────────────────────────────────────────

export type Achievement = {
  year: string;
  title: string;
  description: string;
  icon: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    year: "2023 – 2024",
    title: "Dean's List — Semester 1, 2 & 3",
    description:
      "Recognised on the Dean's List across three consecutive semesters for sustained academic excellence.",
    icon: "🏆",
  },
  {
    year: "2022",
    title: "National Football Participation",
    description:
      "Selected to compete at the national level in football — demonstrating teamwork, discipline, and resilience.",
    icon: "⚽",
  },
  {
    year: "2020",
    title: "3rd Place — Sabah COVID-19 Infographic Competition",
    description:
      "Awarded 3rd Place for outstanding visual communication and creative design under a public-health brief.",
    icon: "🥉",
  },
];

// ─── Contact ──────────────────────────────────────────────────────────────

export const CONTACT_INTRO =
  "Open to internship opportunities, junior developer roles, and collaboration. Let's build something interactive together.";

export type ContactLink = {
  label: string;
  display: string;
  href: string;
  icon: string;
};

export const CONTACTS: ContactLink[] = [
  {
    label: "Email",
    display: "riswanjunior98@gmail.com",
    href: "mailto:riswanjunior98@gmail.com",
    icon: "✉️",
  },
  {
    label: "GitHub",
    display: "github.com/riswan-hamua",
    href: "https://github.com/riswan-hamua",
    icon: "🐙",
  },
  {
    label: "LinkedIn",
    display: "linkedin.com/in/riswan-hamua",
    href: "https://linkedin.com/in/riswan-hamua",
    icon: "💼",
  },
];
