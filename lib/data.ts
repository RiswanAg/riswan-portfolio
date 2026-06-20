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
  image: "/profile.jpg",
  imageFallback: "/profile.svg",
  cv: "/cv.pdf",
};

export const NAV_LINKS = [
  { id: "building", label: "Building" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
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
  { label: "Dean's List", value: 6, suffix: " Semesters" },
  { label: "Projects", value: 6, suffix: "+" },
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

export type MediaItem = {
  type: "image" | "video" | "youtube";
  src: string; // for youtube: the video ID (e.g. "dQw4w9WgXcQ")
  caption?: string;
};

export type Project = {
  title: string;
  description: string;
  tech: string[];
  contribution: string;
  status: { label: string; tone: "live" | "done" | "proto" };
  image: string;
  fallbackIcon: string;
  fallbackGradient: string;
  github: string;
  demo: string;
  featured?: boolean;
  previewVideo?: string;
  gallery?: MediaItem[];
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
    image: "/projects/smart-farming/thumbnail.png",
    previewVideo: "/projects/smart-farming/preview.mp4",
    gallery: [
      { type: "image", src: "/projects/smart-farming/thumbnail.png" },
    ],
    fallbackIcon: "🌴",
    fallbackGradient: "from-emerald-800/50 via-lime-900/30 to-teal-900/50",
    github: "https://github.com/RiswanAg",
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
    image: "/projects/library/thumbnail.png",
    previewVideo: "/projects/library/preview.mp4",
    gallery: [
      { type: "image", src: "/projects/library/thumbnail.png" },
    ],
    fallbackIcon: "📚",
    fallbackGradient: "from-cyan-800/50 via-sky-900/30 to-blue-900/50",
    github: "https://github.com/RiswanAg",
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
    image: "/projects/rabbit-racing/thumbnail.png",
    previewVideo: "/projects/rabbit-racing/preview.mp4",
    gallery: [
      { type: "image", src: "/projects/rabbit-racing/thumbnail.png" },
    ],
    fallbackIcon: "🐇",
    fallbackGradient: "from-amber-800/50 via-orange-900/30 to-red-900/50",
    github: "https://github.com/RiswanAg",
    demo: "#",
  },
  {
    title: "Sneak Out",
    description:
      "An online multiplayer game rooted in Malaysian school residential (Asrama Sekolah) culture. Players take on the role of students sneaking out of the dormitory at night, outwitting prefects and wardens in a cat-and-mouse chase built around shared cultural memory. Winner of 2nd Place at the FTMK Innovation Competition.",
    tech: ["Unity", "C#", "Netcode", "Multiplayer", "Game Design"],
    contribution:
      "Led the full game design and development, including real-time multiplayer networking, role-based gameplay mechanics, and cultural level design that captures the Asrama Sekolah experience.",
    status: { label: "Completed", tone: "done" },
    image: "/projects/sneak-out/thumbnail.png",
    previewVideo: "/projects/sneak-out/preview.mp4",
    gallery: [
      { type: "image", src: "/projects/sneak-out/thumbnail.png" },
      { type: "youtube", src: "QZSrrUhhF-s", caption: "Sneak Out gameplay trailer" },
    ],
    fallbackIcon: "🏫",
    fallbackGradient: "from-indigo-800/50 via-purple-900/30 to-violet-900/50",
    github: "https://github.com/RiswanAg",
    demo: "#",
  },
  {
    title: "SafetyFirst 3D",
    description:
      "A web-based 3D educational game that transforms mandatory construction safety training for TVET students into an engaging, interactive experience. Built with Three.js, it runs directly in the browser with no installation required. Three gameplay modes cover real-time PPE selection, a 3D hazard hunt, and a fast-paced obstacle runner, all grounded in Malaysian DOSH and OSHA compliance standards.",
    tech: ["Three.js", "JavaScript", "Web GL", "Game Design", "OSHA"],
    contribution:
      "Designed and developed the full game including all three gameplay modes, real-time regulatory feedback system that references DOSH and OSHA standards on incorrect choices, and cross-browser responsive optimization.",
    status: { label: "Completed", tone: "done" },
    image: "/projects/safety-first/thumbnail.png",
    previewVideo: "/projects/safety-first/preview.mp4",
    gallery: [
      { type: "image", src: "/projects/safety-first/thumbnail.png" },
    ],
    fallbackIcon: "🦺",
    fallbackGradient: "from-yellow-800/50 via-orange-900/30 to-amber-900/50",
    github: "https://github.com/RiswanAg",
    demo: "#",
  },
];

// ─── Skills (grouped) ──────────────────────────────────────────────────────

export type Skill = { name: string; logo: string };
export type SkillGroup = { category: string; accent: string; skills: Skill[] };

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Game Development",
    accent: "emerald",
    skills: [
      { name: "Unity", logo: "/skills/unity.png" },
      { name: "Unreal Engine", logo: "/skills/unreal.png" },
      { name: "Godot", logo: "/skills/godot.png" },
      { name: "C#", logo: "/skills/csharp.png" },
      { name: "C++", logo: "/skills/cpp.png" },
    ],
  },
  {
    category: "Creative Tools",
    accent: "lime",
    skills: [
      { name: "Blender", logo: "/skills/blender.png" },
      { name: "After Effects", logo: "/skills/aftereffects.png" },
      { name: "Photoshop", logo: "/skills/photoshop.png" },
      { name: "CapCut", logo: "/skills/capcut.png" },
    ],
  },
  {
    category: "AI Tools",
    accent: "cyan",
    skills: [
      { name: "Claude Code", logo: "/skills/claudecode.png" },
      { name: "Codex", logo: "/skills/codex.png" },
      { name: "NotebookLM", logo: "/skills/notebooklm.png" },
      { name: "Higgsfield", logo: "/skills/higgsfield.png" },
      { name: "Nano Banana", logo: "/skills/nanobanana-color.png" },
    ],
  },
  {
    category: "Development",
    accent: "sky",
    skills: [
      { name: "Git", logo: "/skills/git.png" },
      { name: "GitHub", logo: "/skills/github.png" },
      { name: "MySQL", logo: "/skills/mysql.png" },
      { name: "Python", logo: "/skills/phyton.png" },
    ],
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
    year: "2026",
    title: "Silver Award — ITEX 2026",
    description:
      "Contributed to a Silver Award-winning exhibit at the International Invention, Innovation & Technology Exhibition (ITEX 2026) — collaborating directly with a supervisor to engineer AI behaviour systems for a holographic game built on the Tilt 5 platform.",
    icon: "🥈",
  },
  {
    year: "2025",
    title: "2nd Place — FTMK Innovation Competition",
    description:
      "Secured 2nd Place at Workshop 2 of the FTMK Innovation Competition by designing and developing an online multiplayer game rooted in Malaysian school residential (Asrama Sekolah) culture — blending real-time networking, game design, and local storytelling.",
    icon: "🏅",
  },
  {
    year: "2024 – 2025",
    title: "Multiple Game Jam Awards — Game Designer & Developer",
    description:
      "Recognised across several game jams as both Game Designer and Developer — consistently delivering creative, polished game concepts under tight time constraints and competitive judging.",
    icon: "🎮",
  },
  {
    year: "2023 – 2026",
    title: "Dean's List — All 6 Semesters",
    description:
      "Placed on the Dean's List every semester from Semester 1 through Semester 6 — a full-degree record of academic excellence maintained without interruption.",
    icon: "🏆",
  },
  {
    year: "2022",
    title: "National Football Participation",
    description:
      "Selected to compete at the national level in football — demonstrating the same teamwork, discipline, and composure under pressure that drives my work in collaborative development.",
    icon: "⚽",
  },
  {
    year: "2020",
    title: "3rd Place — Sabah COVID-19 Infographic Competition",
    description:
      "Awarded 3rd Place for outstanding visual communication and creative design under a public-health brief — an early signal of the design sensibility that now shapes my game and UI work.",
    icon: "🥉",
  },
];

// ─── Experience ──────────────────────────────────────────────────────────────

export type Experience = {
  period: string;
  role: string;
  organisation: string;
  description: string;
  tags: string[];
};

export const EXPERIENCES: Experience[] = [
  {
    period: "2026",
    role: "Research Collaborator",
    organisation: "UTeM / FTMK",
    description:
      "Collaborated with a supervising lecturer to design and implement AI behaviour systems for a Tilt 5 holographic game, exhibited at the International Invention, Innovation and Technology Exhibition (ITEX) 2026. The project earned a Silver Award in international competition.",
    tags: ["Unity", "Tilt 5", "AI Behaviour", "Research"],
  },
  {
    period: "2025",
    role: "Facilitator",
    organisation: "Next Gen Digital Ninja 2025",
    description:
      "Mentored high school students in game development as part of the Next Gen Digital Ninja 2025 programme. Led hands-on sessions covering GDevelop for 2D game creation and Unity on the Tilt 5 holographic platform, making spatial and immersive development accessible to young learners.",
    tags: ["GDevelop", "Unity", "Tilt 5", "Mentoring"],
  },
  {
    period: "2024 – 2025",
    role: "Game Designer and Developer",
    organisation: "Various Game Jams",
    description:
      "Competed in multiple game jams filling both the designer and developer roles. Produced complete, polished game experiences under tight deadlines and earned awards at several events, demonstrating creative problem-solving and the ability to ship under pressure.",
    tags: ["Game Design", "Unity", "GDevelop", "Rapid Prototyping"],
  },
];

// ─── Education ───────────────────────────────────────────────────────────────

export type Education = {
  period: string;
  institution: string;
  qualification: string;
  grade?: string;
  description: string;
};

export const EDUCATION: Education[] = [
  {
    period: "2023 – Present",
    institution: "Universiti Teknikal Malaysia Melaka (UTeM)",
    qualification:
      "Bachelor of Information Technology (Game Technology) with Honours, FTMK",
    grade: "CGPA 3.80",
    description:
      "Currently pursuing a degree in Game Technology at the Faculty of Information and Communication Technology. Dean's List recognition across all six semesters reflects consistent academic performance alongside active involvement in research, international exhibitions, and game development competitions.",
  },
  {
    period: "2022 – 2023",
    institution: "Kolej Matrikulasi Kejuruteraan Johor (KMKJ)",
    qualification: "Matriculation, Engineering Track",
    grade: "CGPA 3.67",
    description:
      "Completed an engineering-track matriculation programme with a CGPA of 3.67. The rigorous curriculum in calculus, physics, and engineering principles sharpened analytical thinking and built the academic discipline carried forward into university.",
  },
  {
    period: "Until 2021",
    institution: "SMK Madai",
    qualification: "Sijil Pelajaran Malaysia (SPM), Science Stream",
    grade: "6A 2B 1C",
    description:
      "Completed secondary education in the Science stream with a strong SPM result of 6A 2B 1C. Built a solid foundation in mathematics and the sciences that continues to inform a systems-thinking approach to development.",
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
