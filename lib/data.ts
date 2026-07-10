// ─── Portfolio content ──────────────────────────────────────────────────────
// All page copy + data lives here so sections stay presentational.

export const PROFILE = {
  name: "Riswan Hamua",
  roles: [
    "Game Developer",
    "Unity Programmer",
    "Immersive Tech Builder",
    "Systems Thinker",
  ],
  tagline:
    "I don't just imagine things. I build them. Mostly games, sometimes something else entirely.",
  availability: "Open to Internship Opportunities",
  image: "/profile.png",
  imageFallback: "/profile.svg",
  cv: "/cv.pdf",
};

/** Proof points shown directly in the hero — instant recruiter credibility. */
export const HERO_HIGHLIGHTS = [
  "CGPA 3.80 · Dean's List ×6",
  "Silver Award — ITEX 2026",
  "10 Shipped Projects",
];

// ─── Home "About Me" section ────────────────────────────────────────────────

export const ABOUT_HOME = {
  heading: "About Me",
  greeting: "Hello, I'm",
  bio:
    "I'm a Game Technology student at UTeM who enjoys turning ideas into things people can play, feel, and remember. I build games, prototypes, and creative projects by experimenting, testing, breaking, fixing, and improving them until they become something interesting.",
  quote: "Leveraging AI as a professional tool, not a replacement.",
};

export type AboutStat = {
  icon: "code" | "award" | "star" | "cgpa";
  value: string;
  label: string;
  detail: string;
  href?: string;
};

export const ABOUT_STATS: AboutStat[] = [
  {
    icon: "cgpa",
    value: "3.80",
    label: "Current CGPA",
    detail: "Bachelor of IT (Game Technology), UTeM",
  },
  {
    icon: "code",
    value: "11",
    label: "Total Projects",
    detail: "Games, video production & more",
    href: "#portfolio-showcase",
  },
  {
    icon: "award",
    value: "2",
    label: "Certificate",
    detail: "Silver Award ITEX 2026, Silver Award FTMK Innovation",
  },
];

// ─── Certificates ───────────────────────────────────────────────────────────

export type Certificate = {
  name: string;
  org: string;
  date?: string;
  /** Certificate image in /public/certificates. Omit for PDF-only certificates. */
  image?: string;
  /** How the thumbnail fills its 4:3 frame. Use "contain" for portrait/A4 certificates so nothing gets cropped off. Defaults to "cover". */
  imageFit?: "cover" | "contain";
  /** PDF certificate in /public/certificates, shown as a document card when there's no image. */
  pdf?: string;
  /** Public verification URL — proves authenticity. For PDF-only certs, this can be the PDF itself. */
  url: string;
};

export const CERTIFICATES: Certificate[] = [
  {
    name: "Complete C# Unity 3D Game Development",
    org: "Udemy · GameDev.tv Team, Rick Davidson & Stephen Hubbard",
    image: "/certificates/complete-csharp-unity-3d.jpg",
    url: "https://www.udemy.com/certificate/UC-54b6e164-c3e0-4c12-9ee9-d0435edfc345/",
  },
  {
    name: "Learn To Create An Online Multiplayer Game In Unity",
    org: "Udemy · James Doyle",
    image: "/certificates/online-multiplayer-unity.jpg",
    url: "https://www.udemy.com/certificate/UC-b24cd80e-2b67-466f-9bf7-692831e2e6f7/",
  },
  {
    name: "1st Place — Play Next, D'FTMK Technity 2026",
    org: "Universiti Teknikal Malaysia Melaka · Faculty of Information & Communication Technology",
    date: "2026",
    image: "/certificates/play-next-game-jam.jpg",
    imageFit: "contain",
    pdf: "/certificates/play-next-game-jam.pdf",
    url: "/certificates/play-next-game-jam.pdf",
  },
  {
    name: "MYVERSE — Malaysia Creative Technology Competition 2026",
    org: "TechVerse Production · Supported by MDEC",
    date: "2026",
    image: "/certificates/myverse-2026.jpg",
    imageFit: "contain",
    pdf: "/certificates/myverse-2026.pdf",
    url: "/certificates/myverse-2026.pdf",
  },
];

export type NavLink = { id: string; label: string; href?: string };

export const NAV_LINKS: NavLink[] = [
  { id: "hero", label: "Home" },
  { id: "about-home", label: "About" },
  { id: "portfolio-showcase", label: "Portfolio" },
  { id: "experience", label: "Journey" },
  { id: "education", label: "Education" },
];

// ─── Featured projects ──────────────────────────────────────────────────────

export type MediaItem = {
  type: "image" | "video" | "youtube";
  src: string; // for youtube: the video ID (e.g. "dQw4w9WgXcQ")
  caption?: string;
};

export type ProjectKind = "game" | "video" | "other";

export type Project = {
  slug: string;
  title: string;
  /** One short scannable line shown on the card face (e.g. "Solo Dev · Multiplayer"). */
  role: string;
  kind: ProjectKind;
  description: string;
  tech: string[];
  contribution: string;
  status: { label: string; tone: "live" | "done" | "proto" };
  image: string;
  /** How the card thumbnail fills its 16:9 frame. Defaults to "cover" (crops). Use "contain" to show the full image with no crop. */
  imageFit?: "cover" | "contain";
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
    slug: "smart-farming",
    title: "Agrileap",
    role: "Final Year Project · Simulation & AI systems",
    kind: "game",
    description:
      "A cozy smart-farming sim set in an oil-palm nursery — grow smart, farm better, live green. Features IoT soil monitoring, drone scouting, AI disease detection, and a hands-on harvest loop as interactive gameplay.",
    tech: ["Hologram", "Smart Farming", "Unity", "C#", "IoT", "AI", "Simulation"],
    contribution:
      "Designing the simulation systems, sensor-driven gameplay loop, and interactive learning mechanics.",
    status: { label: "In Development", tone: "live" },
    image: "/projects/smart-farming/thumbnail.png",
    previewVideo: "/projects/smart-farming/preview.mp4",
    gallery: [
      { type: "image", src: "/projects/smart-farming/thumbnail.png" },
    ],
    fallbackIcon: "sprout",
    fallbackGradient: "from-[#1C4D8D]/50 via-[#0F2854]/30 to-[#0c2248]/50",
    github: "https://github.com/RiswanAg",
    demo: "#",
    featured: true,
  },
  {
    slug: "sneak-out",
    title: "Sneak Out",
    role: "Lead Dev · Multiplayer · 🏆 Silver Award",
    kind: "game",
    description:
      "An online multiplayer game rooted in Malaysian school residential (Asrama Sekolah) culture. Players take on the role of students sneaking out of the dormitory at night, outwitting prefects and wardens in a cat-and-mouse chase built around shared cultural memory. Winner of a Silver Award at the FTMK Workshop 2 Innovation Competition.",
    tech: ["Online Multiplayer", "Unity", "C#", "Netcode", "Game Design"],
    contribution:
      "Led the full game design and development, including real-time multiplayer networking, role-based gameplay mechanics, and cultural level design that captures the Asrama Sekolah experience.",
    status: { label: "Completed", tone: "done" },
    image: "/projects/sneak-out/thumbnail.png",
    previewVideo: "/projects/sneak-out/preview.mp4",
    gallery: [
      { type: "image", src: "/projects/sneak-out/thumbnail.png" },
      { type: "youtube", src: "QZSrrUhhF-s", caption: "Sneak Out gameplay trailer" },
    ],
    fallbackIcon: "school",
    fallbackGradient: "from-indigo-800/50 via-purple-900/30 to-violet-900/50",
    github: "https://github.com/RiswanAg/Sneak-Out",
    demo: "#",
  },
  {
    slug: "overtime",
    title: "Overtime",
    role: "🏆 1st Place · Play Next Game Jam",
    kind: "game",
    description:
      "A fast, chaotic co-op game inspired by Overcooked — but set in the pressure-cooker of an IT company instead of a kitchen. Built for the Play Next Game Jam, where it took 1st place. Playable in the browser on itch.io.",
    tech: ["Unity", "C#", "Co-op", "Game Design", "Level Design"],
    contribution:
      "Developed the core gameplay mechanics and handled the majority of the programming in Unity, building the co-op systems under jam time pressure for the team's 1st-place entry.",
    status: { label: "Released", tone: "done" },
    image: "/projects/overtime/thumbnail.png",
    imageFit: "contain",
    gallery: [
      { type: "youtube", src: "L5u_-nXka_4", caption: "Overtime — official trailer" },
      { type: "youtube", src: "jB-o6vJV1kM", caption: "Overtime — full gameplay" },
      { type: "image", src: "/projects/overtime/thumbnail.png", caption: "Overtime cover art" },
    ],
    fallbackIcon: "gamepad",
    fallbackGradient: "from-[#F0682E]/40 via-[#7C5CFF]/30 to-[#1C4D8D]/40",
    github: "#",
    demo: "https://symocolon.itch.io/overtime",
  },
  {
    slug: "cave-runner",
    title: "Cave Runner",
    role: "Solo Dev · Multiplatform (PC & Mobile)",
    kind: "game",
    description:
      "An endless cave-runner built solo in Unreal Engine 5. Its highlight is true multiplatform play — the same game runs on desktop/PC and mobile, with controls and performance tuned for both. Playable in the browser on itch.io.",
    tech: ["Unreal Engine 5", "Blueprints", "Multiplatform", "Mobile", "Game Design"],
    contribution:
      "Built the entire game solo — core runner gameplay, level generation, and cross-platform input and optimization so it plays smoothly on both PC and mobile.",
    status: { label: "Released", tone: "done" },
    image: "/projects/cave-runner/thumbnail.png",
    gallery: [
      { type: "youtube", src: "VN3mTIw-K8c", caption: "Cave Runner — gameplay" },
      { type: "image", src: "/projects/cave-runner/thumbnail.png", caption: "Cave Runner cover art" },
    ],
    fallbackIcon: "gamepad",
    fallbackGradient: "from-[#1C4D8D]/50 via-[#0F2854]/40 to-[#7C5CFF]/30",
    github: "#",
    demo: "https://riswanag.itch.io/cave-runner",
  },
  {
    slug: "safety-first",
    title: "SafetyFirst 3D",
    role: "Solo Dev · WebGL · 3 game modes",
    kind: "game",
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
    fallbackIcon: "shield-check",
    fallbackGradient: "from-[#BDE8F5]/20 via-[#4988C4]/30 to-[#1C4D8D]/50",
    github: "https://github.com/RiswanAg",
    demo: "#",
  },
  {
    slug: "rabbit-racing",
    title: "Rabbit Invasion Racing",
    role: "Solo Dev · Graphics & physics",
    kind: "game",
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
    fallbackIcon: "rabbit",
    fallbackGradient: "from-[#0F2854]/60 via-[#1C4D8D]/40 to-[#4988C4]/30",
    github: "https://github.com/RiswanAg",
    demo: "#",
  },
  {
    slug: "reyclash",
    title: "Reyclash",
    role: "Programmer · Team of 4",
    kind: "game",
    description:
      "A game developed for the MYVERSE Competition — Malaysia Creative Tech Competition 2026. Reyclash teaches children how to sort and use recycling bins correctly through fast-paced, interactive gameplay.",
    tech: ["Unity", "C#", "Game Design", "Education"],
    contribution:
      "Programmer in a team of 4 — built the core gameplay systems and recycling mechanics.",
    status: { label: "Completed", tone: "done" },
    image: "/projects/reyclash/thumbnail.png",
    gallery: [
      { type: "image", src: "/projects/reyclash/thumbnail.png" },
    ],
    fallbackIcon: "recycle",
    fallbackGradient: "from-[#4988C4]/40 via-[#0F2854]/50 to-[#1C4D8D]/40",
    github: "https://github.com/RiswanAg",
    demo: "#",
  },
  {
    slug: "library-management",
    title: "Library Management System",
    role: "Solo · Backend & database design",
    kind: "other",
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
    fallbackIcon: "book-open",
    fallbackGradient: "from-[#4988C4]/50 via-[#1C4D8D]/30 to-[#0F2854]/50",
    github: "https://github.com/RiswanAg",
    demo: "#",
  },
  {
    slug: "mission-delivered",
    title: "Mission: Delivered",
    role: "Director · Editor · Cameraman",
    kind: "video",
    description:
      "A 5-minute cinematic ad for Shopee, produced as a motion-graphics project. I directed the piece, ran the camera, and handled almost all of the editing — blending live footage with motion graphics and AI-generated video (Higgsfield) into one polished spot. The project I'm proudest of, and where I fell in love with editing all over again.",
    tech: ["Directing", "Video Editing", "Motion Graphics", "AI Video", "Higgsfield", "Cinematography"],
    contribution:
      "Directed the full production and led editing end to end — shot planning, cinematography, motion graphics, AI-generated sequences with Higgsfield, colour, and the final edit.",
    status: { label: "Released", tone: "done" },
    image: "/projects/mission-delivered/thumbnail.jpg",
    gallery: [
      { type: "youtube", src: "8B_SRydN_ME", caption: "Mission: Delivered — Shopee ad (full video)" },
    ],
    fallbackIcon: "video",
    fallbackGradient: "from-[#7C5CFF]/40 via-[#F0682E]/30 to-[#2EE6C6]/30",
    github: "#",
    demo: "https://youtu.be/8B_SRydN_ME",
  },
  {
    slug: "kinetic-typography",
    title: "Kinetic Typography",
    role: "Motion Designer · Intro & Closing",
    kind: "video",
    description:
      "A kinetic-typography motion piece built entirely in After Effects, made with a team of four to introduce ourselves. I animated the opening introduction, my own segment, and the closing, and chose the track that ties it all together.",
    tech: ["After Effects", "Kinetic Typography", "Motion Graphics", "Sound Design"],
    contribution:
      "Designed and animated the intro, my personal segment, and the closing sequence in After Effects, and selected the soundtrack that drives the pacing.",
    status: { label: "Released", tone: "done" },
    image: "/projects/motion-intro/thumbnail.jpg",
    gallery: [
      { type: "youtube", src: "17cvcFdY01Q", caption: "Kinetic Typography — After Effects motion piece" },
    ],
    fallbackIcon: "video",
    fallbackGradient: "from-[#2EE6C6]/30 via-[#7C5CFF]/40 to-[#27C7E5]/30",
    github: "#",
    demo: "https://youtu.be/17cvcFdY01Q",
  },
  {
    slug: "inovasi-sosial",
    title: "Projek Inovasi Sosial",
    role: "Video Production · Editor & Cameraman",
    kind: "video",
    description:
      "A group video for a Critical Thinking course pitching a social-innovation idea. I handled the full video production — shooting all the footage as cameraman and editing the whole piece together into a clear, polished final cut.",
    tech: ["Video Editing", "Cinematography", "Video Production", "Storytelling"],
    contribution:
      "Owned the entire video production: ran the camera for all footage and edited the complete video from raw clips to final delivery.",
    status: { label: "Released", tone: "done" },
    image: "/projects/inovasi-sosial/thumbnail.jpg",
    gallery: [
      { type: "youtube", src: "tQFBa98peRI", caption: "Projek Idea Inovasi Sosial — group video" },
    ],
    fallbackIcon: "video",
    fallbackGradient: "from-[#F0682E]/30 via-[#7C5CFF]/40 to-[#2EE6C6]/30",
    github: "#",
    demo: "https://youtu.be/tQFBa98peRI",
  },
];

// ─── Skills (grouped) ──────────────────────────────────────────────────────

// Proficiency tiers, in descending order. Drives the ring fill + label.
export type SkillLevel = "Expert" | "Advanced" | "Proficient" | "Familiar";

/** Ring fill (0–1) per tier — the arc length shown in the proficiency ring. */
export const SKILL_LEVEL_FILL: Record<SkillLevel, number> = {
  Expert: 0.95,
  Advanced: 0.8,
  Proficient: 0.62,
  Familiar: 0.45,
};

export type Skill = { name: string; logo: string; level: SkillLevel };
export type SkillGroup = { category: string; accent: string; skills: Skill[] };

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Game Development",
    accent: "emerald",
    skills: [
      { name: "Unity", logo: "/skills/unity.png", level: "Expert" },
      { name: "Unreal Engine", logo: "/skills/unreal.png", level: "Proficient" },
      { name: "Godot", logo: "/skills/godot.png", level: "Proficient" },
      { name: "C#", logo: "/skills/csharp.png", level: "Expert" },
      { name: "C++", logo: "/skills/cpp.png", level: "Expert" },
    ],
  },
  {
    category: "Creative Tools",
    accent: "lime",
    skills: [
      { name: "Blender", logo: "/skills/blender.png", level: "Familiar" },
      { name: "After Effects", logo: "/skills/aftereffects.png", level: "Familiar" },
      { name: "Photoshop", logo: "/skills/photoshop.png", level: "Proficient" },
      { name: "CapCut", logo: "/skills/capcut.png", level: "Proficient" },
    ],
  },
  {
    category: "AI Tools",
    accent: "cyan",
    skills: [
      { name: "Claude Code", logo: "/skills/claudecode.png", level: "Expert" },
      { name: "Codex", logo: "/skills/codex.png", level: "Advanced" },
      { name: "NotebookLM", logo: "/skills/notebooklm.png", level: "Familiar" },
      { name: "Higgsfield", logo: "/skills/higgsfield.png", level: "Familiar" },
      { name: "Nano Banana", logo: "/skills/nanobanana-color.png", level: "Familiar" },
    ],
  },
  {
    category: "Development",
    accent: "sky",
    skills: [
      { name: "Git", logo: "/skills/git.png", level: "Advanced" },
      { name: "GitHub", logo: "/skills/github.png", level: "Advanced" },
      { name: "MySQL", logo: "/skills/mysql.png", level: "Familiar" },
      { name: "Python", logo: "/skills/phyton.png", level: "Proficient" },
    ],
  },
];

// ─── Achievements (timeline) ─────────────────────────────────────────────────

export type Achievement = {
  year: string;
  title: string;
  /** Punchy one-liner shown by default — the full story lives in `description`. */
  summary: string;
  /** Short outcome badge, e.g. "2nd Place", surfaced prominently. */
  highlight: string;
  description: string;
  icon: string;
  /** Optional linked portfolio project slug (e.g. "sneak-out"). */
  projectSlug?: string;
  /** Optional real photos to use in the Journey gallery instead of the placeholder folder. */
  gallery?: string[];
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    year: "2026",
    title: "Silver Award — ITEX 2026",
    summary: "Coordinated the exhibit for one of only two UTeM projects at ITEX — it won Silver.",
    highlight: "Silver · International",
    description:
      "Our project was one of only two selected to represent UTeM at the International Invention, Innovation & Technology Exhibition (ITEX 2026). I coordinated the exhibition floor — operating and demonstrating the Tilt 5 holographic hardware, and explaining the game's innovation and technical structure to judges and visitors. The exhibit won a Silver Award in international competition.",
    icon: "award",
  },
  {
    year: "2025",
    title: "Silver Award — FTMK Workshop 2 Innovation Competition",
    summary: "Silver for Sneak Out — and the project that let underrated teammates prove themselves.",
    highlight: "Silver Award",
    description:
      "Won a Silver Award at Workshop 2 of the FTMK Innovation Competition with Sneak Out, an online multiplayer game rooted in Malaysian school residential (Asrama Sekolah) culture — blending real-time networking, game design, and local storytelling. Beyond building the game, I worked hard to lift my groupmates, teammates many had underestimated, and this project became the moment they showed their real potential.",
    icon: "trophy",
    projectSlug: "sneak-out",
  },
  {
    year: "2024 – 2025",
    title: "Multiple Game Jam Awards — Game Designer & Developer",
    summary: "Repeated wins as both designer and developer across multiple game jams.",
    highlight: "Multiple Wins",
    description:
      "Recognised across several game jams as both Game Designer and Developer — consistently delivering creative, polished game concepts under tight time constraints and competitive judging.",
    icon: "gamepad",
  },
  {
    year: "2023 – 2026",
    title: "Dean's List — All 6 Semesters",
    summary: "A perfect academic streak — Dean's List in every single semester.",
    highlight: "6 / 6 Semesters",
    description:
      "Placed on the Dean's List every semester from Semester 1 through Semester 6 — a full-degree record of academic excellence maintained without interruption.",
    icon: "star",
  },
  {
    year: "2022",
    title: "National Football Participation",
    summary: "Represented at national level — teamwork and composure under real pressure.",
    highlight: "National",
    description:
      "Selected to compete at the national level in football — demonstrating the same teamwork, discipline, and composure under pressure that drives my work in collaborative development.",
    icon: "zap",
  },
  {
    year: "2020",
    title: "3rd Place — Sabah COVID-19 Infographic Competition",
    summary: "Third place for public-health visual design under a state brief.",
    highlight: "3rd Place",
    description:
      "Awarded 3rd Place for outstanding visual communication and creative design under a public-health brief — an early signal of the design sensibility that now shapes my game and UI work.",
    icon: "pen-tool",
  },
];

// ─── Experience ──────────────────────────────────────────────────────────────

export type Experience = {
  period: string;
  role: string;
  organisation: string;
  /** Punchy one-liner shown by default — the full story lives in `description`. */
  summary: string;
  /** Short outcome badge surfaced prominently. */
  highlight: string;
  description: string;
  tags: string[];
  bgImages?: { left: string; right: string };
  /** Optional real photos to use in the Journey gallery instead of the placeholder folder. */
  gallery?: string[];
};

export const EXPERIENCES: Experience[] = [
  {
    period: "2025",
    role: "Facilitator",
    organisation: "Next Gen Digital Ninja 2025",
    summary: "Ran hands-on game-dev sessions for high-schoolers using GDevelop and Unity on Tilt 5.",
    highlight: "Mentor",
    description:
      "Mentored high school students in game development as part of the Next Gen Digital Ninja 2025 programme. Led hands-on sessions covering GDevelop for 2D game creation and Unity on the Tilt 5 holographic platform, making spatial and immersive development accessible to young learners.",
    tags: ["GDevelop", "Unity", "Tilt 5", "Mentoring"],
    gallery: [
      "/journey/experience-1-nextgen-digital-ninja/1.jpg",
      "/journey/experience-1-nextgen-digital-ninja/2.jpg",
    ],
  },
  {
    period: "2024 – 2025",
    role: "Game Designer and Developer",
    organisation: "Various Game Jams",
    summary: "Designed and shipped complete games under game-jam deadlines — several took home awards.",
    highlight: "Award-winning",
    description:
      "Competed in multiple game jams filling both the designer and developer roles. Produced complete, polished game experiences under tight deadlines and earned awards at several events, demonstrating creative problem-solving and the ability to ship under pressure.",
    tags: ["Game Design", "Unity", "GDevelop", "Rapid Prototyping"],
    bgImages: {
      left: "/projects/rabbit-racing/thumbnail.png",
      right: "/projects/reyclash/thumbnail.png",
    },
  },
];

// ─── Education ───────────────────────────────────────────────────────────────

export type Education = {
  period: string;
  institution: string;
  qualification: string;
  grade?: string;
  /** Punchy one-liner shown by default — the full story lives in `description`. */
  summary: string;
  /** Short outcome badge surfaced prominently. */
  highlight: string;
  description: string;
  logo: string;
  logoInitials: string;
};

export const EDUCATION: Education[] = [
  {
    period: "2023 – Present",
    institution: "Universiti Teknikal Malaysia Melaka (UTeM)",
    qualification:
      "Bachelor of Information Technology (Game Technology) with Honours, FTMK",
    grade: "CGPA 3.80",
    summary: "Game Technology degree with Dean's List recognition every single semester.",
    highlight: "Dean's List ×6",
    description:
      "Currently pursuing a degree in Game Technology at the Faculty of Information and Communication Technology. Dean's List recognition across all six semesters reflects consistent academic performance alongside active involvement in research, international exhibitions, and game development competitions.",
    logo: "/education/utem.png",
    logoInitials: "UTeM",
  },
  {
    period: "2022 – 2023",
    institution: "Kolej Matrikulasi Kejuruteraan Johor (KMKJ)",
    qualification: "Matriculation, Engineering Track",
    grade: "CGPA 3.67",
    summary: "Engineering-track matriculation that sharpened the math and physics foundation.",
    highlight: "CGPA 3.67",
    description:
      "Completed an engineering-track matriculation programme with a CGPA of 3.67. The rigorous curriculum in calculus, physics, and engineering principles sharpened analytical thinking and built the academic discipline carried forward into university.",
    logo: "/education/kmkj.png",
    logoInitials: "KMKJ",
  },
  {
    period: "Until 2021",
    institution: "SMK Madai",
    qualification: "Sijil Pelajaran Malaysia (SPM), Science Stream",
    grade: "6A 2B 1C",
    summary: "Science-stream SPM with a strong 6A result and a solid STEM base.",
    highlight: "6A 2B 1C",
    description:
      "Completed secondary education in the Science stream with a strong SPM result of 6A 2B 1C. Built a solid foundation in mathematics and the sciences that continues to inform a systems-thinking approach to development.",
    logo: "/education/smk-madai.png",
    logoInitials: "SMK",
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
  logo?: string;
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
    logo: "/socials/github.png",
  },
  {
    label: "LinkedIn",
    display: "linkedin.com/in/riswan-hamua",
    href: "https://linkedin.com/in/riswan-hamua",
    icon: "💼",
    logo: "/socials/linkedin.png",
  },
  {
    label: "Instagram",
    display: "@_kcng",
    href: "https://www.instagram.com/_kcng/",
    icon: "📸",
    logo: "/socials/instagram.webp",
  },
  {
    label: "YouTube",
    display: "@tutung10",
    href: "https://youtube.com/@tutung10",
    icon: "▶️",
    logo: "/socials/youtube.png",
  },
  {
    label: "TikTok",
    display: "@_hiroyes",
    href: "https://www.tiktok.com/@_hiroyes",
    icon: "🎵",
    logo: "/socials/tiktok.png",
  },
];
