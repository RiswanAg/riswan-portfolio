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
    "I don't just imagine things. I build them especially games, VR and AR simulations, and whatever else the problem actually calls for.",
  status: "Currently Building in Unity & Unreal",
  image: "/profile.png",
  imageFallback: "/profile.svg",
  cv: "/cv.pdf",
};

/** Proof points shown directly in the hero — instant recruiter credibility. */
export const HERO_HIGHLIGHTS = [
  "CGPA 3.80 · Dean's List ×6",
  "Silver Award, ITEX 2026",
  "12 Shipped Projects",
];

// ─── Home "About Me" section ────────────────────────────────────────────────

export const ABOUT_HOME = {
  heading: "About Me",
  greeting: "Hello, I'm",
  bio:
    "I'm a Game Technology student at UTeM who turns ideas into things people can play, feel, and remember. I build games, VR and AR simulations, and interactive tools by experimenting, breaking things, and fixing them until they click.",
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
    value: "15",
    label: "Total Projects",
    detail: "Games, VR/AR simulation, video & tools",
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
    name: "Unreal Engine 5 Blueprint Game Development (Updated to 5.6)",
    org: "Udemy · Ben Tristem, GameDev.tv Team, Mitch Theriault",
    date: "2026",
    image: "/certificates/unreal-engine-5-blueprint.jpg",
    pdf: "/certificates/unreal-engine-5-blueprint.pdf",
    url: "https://www.udemy.com/certificate/UC-19d74267-4c8f-4d85-aa9b-6f95f38fa199/",
  },
  {
    name: "1st Place, Play Next, D'FTMK Technity 2026",
    org: "Universiti Teknikal Malaysia Melaka · Faculty of Information & Communication Technology",
    date: "2026",
    image: "/certificates/play-next-game-jam.jpg",
    imageFit: "contain",
    pdf: "/certificates/play-next-game-jam.pdf",
    url: "/certificates/play-next-game-jam.pdf",
  },
  {
    name: "MYVERSE, Malaysia Creative Technology Competition 2026",
    org: "TechVerse Production · Supported by MDEC",
    date: "2026",
    image: "/certificates/myverse-2026.jpg",
    imageFit: "contain",
    pdf: "/certificates/myverse-2026.pdf",
    url: "/certificates/myverse-2026.pdf",
  },
  {
    name: "Participation, Digital Creative Camp, DICE 4.0 2026",
    org: "Universiti Sultan Zainal Abidin · Ministry of Higher Education Malaysia",
    date: "2026",
    image: "/certificates/dice-4-0-2026.jpg",
    imageFit: "contain",
    pdf: "/certificates/dice-4-0-2026.pdf",
    url: "/certificates/dice-4-0-2026.pdf",
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
  /** Optional documentation link. "#" (or omitted) hides the button. */
  docs?: string;
  featured?: boolean;
  /** Competition/award proof shown as a badge on the card (e.g. "Silver · ITEX 2026"). */
  award?: string;
  previewVideo?: string;
  gallery?: MediaItem[];
  /** Scannable feature list, shown as a checklist on the detail page. */
  highlights?: string[];
  /** Development timeline / roadmap, rendered as a progress bar + checklist. */
  milestones?: { label: string; done: boolean }[];
  /** Key results/metrics, shown as stat cards (e.g. model accuracy). */
  achievements?: { label: string; value: string }[];
  /** Longer technical write-up, shown in an expandable "Technical Details" panel. */
  technicalDetails?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "pencak",
    title: "PENCAK",
    role: "Lead Programmer · Full-body VR tracking",
    award: "UTeM Representative · DICE 4.0",
    kind: "game",
    description:
      "A living archive of Silat Seni Gayong: a full-body VR trainer built in Unity for Meta Quest 3. Existing VR martial arts apps track only arms and hands, which breaks down for Silat, where evasion is entirely footwork — so PENCAK pairs the headset with HTC Vive trackers to read stance, stepping and foot position, and validates placement live on a grid mat.",
    tech: ["Unity", "C#", "Meta Quest 3", "HTC Vive Trackers", "Convai", "VR"],
    contribution:
      "Leading the programming for Team IMMERSA: extending Quest 3 with Vive trackers for below-the-waist coverage, building the grid-mat system that validates foot placement in real time, and integrating Convai to turn onboarding into a conversation with a virtual Guru instead of a setup form.",
    status: { label: "In Development", tone: "live" },
    image: "/projects/pencak/thumbnail.png",
    // Pitch-deck boards, not in-engine captures — captions say so.
    gallery: [
      {
        type: "image",
        src: "/projects/pencak/thumbnail.png",
        caption: "PENCAK — a living archive of Silat Seni Gayong",
      },
      {
        type: "image",
        src: "/projects/pencak/problem-oral-tradition.png",
        caption:
          "The problem: Silat lives in bodies, not in books — when a master dies, whatever he never taught in person goes with him",
      },
      {
        type: "image",
        src: "/projects/pencak/solution-key-features.png",
        caption:
          "The solution: full-body interaction, a virtual Guru, and action-based learning",
      },
      {
        type: "image",
        src: "/projects/pencak/full-body-tracking.png",
        caption:
          "Vive trackers extend Quest 3 below the waist to read stance, stepping and foot position",
      },
      {
        type: "image",
        src: "/projects/pencak/virtual-guru-convai.png",
        caption:
          "Convai powers a virtual Guru players can ask for guidance, replacing manual setup with conversation",
      },
      {
        type: "image",
        src: "/projects/pencak/game-flow.png",
        caption: "Game flow: Explore → Converse → Learn → Practise → Apply",
      },
    ],
    fallbackIcon: "footprints",
    fallbackGradient: "from-[#219EBC]/40 via-[#0F2854]/30 to-[#1C4D8D]/50",
    github: "https://github.com/RiswanAg",
    demo: "#",
    featured: true,
    highlights: [
      "Lower-body tracking via HTC Vive trackers on Meta Quest 3",
      "Grid mat that validates stance and foot placement in real time",
      "Next step shown as a yellow footprint, turning green when landed",
      "Conversational AI Guru built on Convai for voice onboarding",
      "Guru answers questions and repeats demonstrations mid-session",
      "Spoken name, age and height drive body calibration and difficulty",
      "Three modules: Asas Serangan, Asas Elakkan, Elak & Serang",
      "Scoring across hand movement, footwork, stance, timing and accuracy",
    ],
    technicalDetails:
      "Silat Seni Gayong lives in muscle memory — its forms were never meaningfully written down, and correction only happens when a teacher is watching from the right angle at the right moment, so a student can drill a wrong stance a thousand times and never know. Benchmarking the closest VR reference points exposed two fatal gaps for this discipline: KungFu VR teaches through movement but tracks the upper body only, and FitXR's virtual instructor demonstrates without ever being able to answer a question. Both are disqualifying here, because evasion is footwork and correction has to be conversational. The build answers each directly: Vive trackers extend Quest 3 below the waist to supply real stance and stepping data, feeding a grid mat that marks the player's position, projects the next step as a yellow footprint, and turns it green once landed — so a wrong placement flags immediately instead of being silently reinforced. Convai powers a virtual Guru who gathers the player's details by voice, then stays available through the session. The two halves have to agree: the Guru's correction is only credible if the tracking underneath is genuinely reading the stance right, so calibration and feedback logic can't be developed independently — a false positive on foot placement turns the Guru into a liar, which is worse than giving no feedback at all.",
  },
  {
    slug: "smart-farming",
    title: "Agrileap",
    role: "Final Year Project · Simulation & AI systems",
    kind: "game",
    description:
      "A cozy smart-farming sim set in an oil-palm nursery: grow smart, farm better, live green. Features IoT soil monitoring, drone scouting, AI disease detection, and a hands-on harvest loop as interactive gameplay.",
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
    role: "Lead Dev · Online Multiplayer",
    award: "Silver · FTMK Innovation Competition",
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
    featured: true,
  },
  {
    slug: "overtime",
    title: "Overtime",
    role: "Programmer · Co-op systems",
    award: "1st Place · Play Next Game Jam",
    kind: "game",
    description:
      "A fast, chaotic co-op game inspired by Overcooked, but set in the pressure-cooker of an IT company instead of a kitchen. Built for the Play Next Game Jam, where it took 1st place. Playable in the browser on itch.io.",
    tech: ["Unity", "C#", "Co-op", "Game Design", "Level Design"],
    contribution:
      "Developed the core gameplay mechanics and handled the majority of the programming in Unity, building the co-op systems under jam time pressure for the team's 1st-place entry.",
    status: { label: "Released", tone: "done" },
    image: "/projects/overtime/thumbnail.png",
    imageFit: "contain",
    gallery: [
      { type: "youtube", src: "L5u_-nXka_4", caption: "Overtime, official trailer" },
      { type: "youtube", src: "jB-o6vJV1kM", caption: "Overtime, full gameplay" },
      { type: "image", src: "/projects/overtime/thumbnail.png", caption: "Overtime cover art" },
    ],
    fallbackIcon: "gamepad",
    fallbackGradient: "from-[#FB8500]/40 via-[#FFB703]/30 to-[#1C4D8D]/40",
    github: "#",
    demo: "https://symocolon.itch.io/overtime",
    featured: true,
  },
  {
    slug: "cave-runner",
    title: "Cave Runner",
    role: "Solo Dev · Multiplatform (PC & Mobile)",
    kind: "game",
    description:
      "An endless cave-runner built solo in Unreal Engine 5. Its highlight is true multiplatform play: the same game runs on desktop/PC and mobile, with controls and performance tuned for both. Playable in the browser on itch.io.",
    tech: ["Unreal Engine 5", "Blueprints", "Multiplatform", "Mobile", "Game Design"],
    contribution:
      "Built the entire game solo, including core runner gameplay, level generation, and cross-platform input and optimization so it plays smoothly on both PC and mobile.",
    status: { label: "Released", tone: "done" },
    image: "/projects/cave-runner/thumbnail.png",
    gallery: [
      { type: "youtube", src: "VN3mTIw-K8c", caption: "Cave Runner, gameplay" },
      { type: "image", src: "/projects/cave-runner/thumbnail.png", caption: "Cave Runner cover art" },
    ],
    fallbackIcon: "gamepad",
    fallbackGradient: "from-[#1C4D8D]/50 via-[#0F2854]/40 to-[#FFB703]/30",
    github: "#",
    demo: "https://riswanag.itch.io/cave-runner",
  },
  {
    slug: "royal-run",
    title: "Royal Run",
    role: "Solo Dev · Unity",
    kind: "game",
    description:
      "A king in a cape, sprinting down a stone road that keeps crumbling into existence just ahead of his feet. Royal Run is a 3D endless-runner I built in Unity 6 to push past my first \"hello world\" project, weaving between obstacles, grabbing coins and apples, and outrunning a clock that never lets up.",
    tech: ["Unity 6", "C#", "URP", "Cinemachine", "Input System", "TextMesh Pro"],
    contribution:
      "Built it solo, start to finish: a road that generates and recycles itself as the king runs, a hand-scripted jump that feels weighty instead of floaty, a difficulty curve that quietly turns up the pressure the longer you survive, and camera work that zooms and shakes to sell the speed.",
    status: { label: "Completed", tone: "done" },
    image: "/projects/royal-run/thumbnail.png",
    gallery: [
      { type: "youtube", src: "_QjLt1Op2fU", caption: "Royal Run, gameplay" },
      { type: "image", src: "/projects/royal-run/thumbnail.png", caption: "Dashing down the procedurally-generated road" },
      { type: "image", src: "/projects/royal-run/game-over.png", caption: "Game over screen with final score and restart" },
    ],
    highlights: [
      "Procedural level generation — road built and recycled from chunk prefabs in real time",
      "Periodic checkpoints that add survival time and ramp up difficulty",
      "Lane-based movement + custom scripted jump on a kinematic Rigidbody",
      "Dynamic difficulty: obstacle spawn rate and world speed scale up over a run",
      "Cinemachine speed-based FOV zoom and impact screen shake on collisions",
      "Full game loop: score, countdown timer, pickup juice, game-over screen, one-click restart",
    ],
    fallbackIcon: "gamepad",
    fallbackGradient: "from-[#FB8500]/40 via-[#1C4D8D]/30 to-[#FFB703]/30",
    github: "https://github.com/RiswanAg/royal-run",
    demo: "https://youtu.be/_QjLt1Op2fU",
  },
  {
    slug: "marblerun",
    title: "MarbleRun",
    role: "Solo Dev · Unreal Engine",
    kind: "game",
    description:
      "A small arena adrift in space, where you tilt the whole level to roll a marble past bumper pegs and through laser-wall gates toward a glowing goal. MarbleRun is a physics-based tilt-maze built solo in Unreal Engine Blueprints, where momentum and timing matter more than speed.",
    tech: ["Unreal Engine 5", "Blueprints", "Physics", "Level Design"],
    contribution:
      "Designed and built the tilt-maze mechanics, hazard and pickup blueprints (laser walls, bumper pegs, goal trigger), and the level layout entirely in Unreal Engine Blueprints.",
    status: { label: "Completed", tone: "done" },
    image: "https://img.youtube.com/vi/4VF7QWHaGkc/maxresdefault.jpg",
    gallery: [
      { type: "youtube", src: "4VF7QWHaGkc", caption: "MarbleRun, gameplay" },
      { type: "image", src: "https://img.youtube.com/vi/4VF7QWHaGkc/maxresdefault.jpg" },
    ],
    fallbackIcon: "gamepad",
    fallbackGradient: "from-[#FFB703]/40 via-[#1C4D8D]/40 to-[#03140F]/60",
    github: "#",
    demo: "https://youtu.be/4VF7QWHaGkc",
  },
  {
    slug: "raylib-platformer",
    title: "Raylib Platformer",
    role: "Programmer · Team of 4",
    kind: "game",
    description:
      "A 2D platformer built for the Game Engine II course, featuring patrol/chase enemies, a shooting mechanic, hazard tiles, and a built-in campaign system with multiple levels. Developed as a 4-person team project.",
    tech: ["C++", "Raylib", "Level Editor", "Game Design"],
    contribution:
      "Programmer in a team of 4, built the player movement/physics system and the in-game level editor with level save/load (campaign + custom levels).",
    status: { label: "Completed", tone: "done" },
    image: "/projects/raylib-platformer/thumbnail.png",
    gallery: [
      { type: "youtube", src: "r5CQDQhmfm4", caption: "Raylib Platformer, gameplay & level editor" },
      { type: "image", src: "/projects/raylib-platformer/thumbnail.png" },
    ],
    fallbackIcon: "gamepad",
    fallbackGradient: "from-[#1C4D8D]/50 via-[#0F2854]/40 to-[#FFB703]/30",
    github: "https://github.com/RiswanAg/raylib-platformer",
    demo: "https://youtu.be/r5CQDQhmfm4",
  },
  {
    slug: "safety-first",
    title: "SafetyFirst 3D",
    role: "Lead Programmer & Game Designer · Team of 4",
    kind: "game",
    description:
      "Construction accidents in Malaysia are still a huge problem, and a lot of it comes down to workers never really internalising their safety training. We built SafetyFirst 3D to fix that: a browser game where you play a site safety officer across three levels, picking the right PPE, hunting for hidden hazards in a 3D construction scene, and racing an obstacle course while answering DOSH safety questions. Every rule in the game is pulled straight from real Malaysian regulations (OSHA 1994, the Factories and Machinery Act, DOSH's HIRARC guidelines), so it lines up with what TVET students are actually meant to learn.",
    tech: ["Three.js", "JavaScript", "HTML5 Canvas", "Game Design", "DOSH/OSHA Compliance"],
    contribution:
      "Lead programmer and game designer in a team of 4. Designed the three-level progression and scoring systems, built the Three.js hazard-identification and obstacle-runner levels, and led the performance pass that cut Level 3's load time from 8 to 15 seconds down to under 2 seconds.",
    status: { label: "Completed", tone: "done" },
    image: "/projects/safety-first/thumbnail.png",
    imageFit: "contain",
    gallery: [
      { type: "youtube", src: "9-36LglMajU", caption: "SafetyFirst 3D, gameplay walkthrough" },
      { type: "image", src: "/projects/safety-first/thumbnail.png", caption: "Main menu, three training levels" },
      { type: "image", src: "/projects/safety-first/hazard-identification.png", caption: "Level 2, Hazard Identification in an interactive 3D scene" },
    ],
    highlights: [
      "Three progressive levels: PPE Selection, Hazard Identification, Obstacle Course Runner",
      "3D hazard-hunting scene built with Three.js",
      "Content aligned to OSHA 1994, DOSH HIRARC and the Factories and Machinery Act 1967",
      "Load time optimised from 8 to 15 seconds down to under 2 seconds",
      "Runs at 30+ FPS with no install, straight in the browser",
      "Responsive layout with touch controls for tablets",
    ],
    achievements: [
      { label: "Levels", value: "3" },
      { label: "Load Time", value: "<2s" },
      { label: "Frame Rate", value: "30+ FPS" },
    ],
    technicalDetails:
      "Level 3 was originally taking 8 to 15 seconds to load with an inconsistent frame rate, caused by over 150 objects in the scene graph, expensive shadow calculations, and heavy MeshStandardMaterial lighting. I led the optimisation pass that disabled shadows entirely, switched materials to flat-shaded MeshBasicMaterial, and trimmed the scene down to about 30 essential objects, bringing load time under 2 seconds while keeping full gameplay intact. We also replaced emoji-based icons with CSS-drawn shapes after testing showed they rendered inconsistently across browsers and operating systems.",
    fallbackIcon: "shield-check",
    fallbackGradient: "from-[#BDE8F5]/20 via-[#4988C4]/30 to-[#1C4D8D]/50",
    github: "https://github.com/RiswanAg",
    docs: "/projects/safety-first/report.pdf",
    demo: "https://youtu.be/9-36LglMajU",
  },
  {
    slug: "mars-marine",
    title: "Mars Marine",
    role: "Solo Dev · Unreal Engine 5 (Blueprints only)",
    kind: "game",
    description:
      "A wave-based survival shooter built in Unreal Engine 5.8. A lone marine holds a position on the surface of Mars against escalating waves of alien creatures, fighting them off with a hitscan assault rifle while staying inside the mission area as the fight grows harder wave after wave.",
    tech: ["Unreal Engine 5.8", "Blueprints", "Enhanced Input", "Niagara", "UMG"],
    contribution:
      "Built entirely solo with zero C++, all gameplay logic in Blueprints: the wave/spawn director, alien AI, hitscan weapon with Niagara muzzle/impact/trail VFX, a mission-area boundary volume with a grace-period warning, health pickups, and the UMG HUD and game-over/restart loop.",
    status: { label: "Completed", tone: "done" },
    image: "https://img.youtube.com/vi/Ye5zCM1XKKg/maxresdefault.jpg",
    gallery: [
      { type: "youtube", src: "Ye5zCM1XKKg", caption: "Mars Marine, gameplay" },
      { type: "image", src: "https://img.youtube.com/vi/Ye5zCM1XKKg/maxresdefault.jpg" },
    ],
    highlights: [
      "Wave-based survival combat with a capped difficulty ramp so late waves stay tough but winnable",
      "Hitscan assault rifle with Niagara-driven muzzle flash, impact, and trail VFX",
      "Mission-area boundary volume: leaving the play area triggers a warning and grace-period timer before damage",
      "Health pickups to sustain the marine between engagements",
      "Game-over summary (wave reached, kill count) that auto-restarts into a fresh run",
      "Built entirely in Blueprints using Enhanced Input for movement, aiming, and firing",
    ],
    fallbackIcon: "gamepad",
    fallbackGradient: "from-[#C1442B]/50 via-[#7A2E1B]/35 to-[#150A06]/60",
    github: "https://github.com/RiswanAg/MarsMarine",
    demo: "https://youtu.be/Ye5zCM1XKKg",
  },
  {
    slug: "library-management",
    title: "Library Management System",
    role: "Solo · Backend & database design",
    kind: "other",
    description:
      "I built this as a Workshop 1 project after noticing how much librarians still do by hand: writing down who borrowed what, chasing overdue books, and calculating late fines on paper. My goal was to take all of that off their plate. It's a console app written in C++ with a MySQL database underneath, and it gives Admins, Staff, and Students their own dedicated portal so each person only sees what's relevant to them.",
    tech: ["C++", "MySQL", "OOP"],
    contribution:
      "Designed the ERD and relational schema, then built the full CLI application solo, including role-based login for Admin, Staff and Student, book and member CRUD, borrow and return transactions with automatic fine calculation, and report generation, all with input validation and error handling throughout.",
    status: { label: "Completed", tone: "done" },
    image: "/projects/library/thumbnail.png",
    imageFit: "contain",
    gallery: [
      { type: "image", src: "/projects/library/thumbnail.png", caption: "Book catalog with live search, sort and paging" },
      { type: "image", src: "/projects/library/main-menu.png", caption: "Main menu, choose your role" },
      { type: "image", src: "/projects/library/admin-menu.png", caption: "Admin dashboard" },
      { type: "image", src: "/projects/library/add-book.png", caption: "Adding a new book with full call-number metadata" },
      { type: "image", src: "/projects/library/confirm-borrowing.png", caption: "Borrowing a book, with an automatic 14-day due date" },
      { type: "image", src: "/projects/library/reports.png", caption: "Reports & analytics module" },
      { type: "image", src: "/projects/library/student-portal.png", caption: "Student portal, borrowed books, limits and fines" },
    ],
    highlights: [
      "Role-based portals for Admin, Staff and Student",
      "Full book catalog with search, sort and paging",
      "Borrow & return flow with automatic due dates",
      "Automatic overdue fine calculation",
      "Staff and student record management (CRUD)",
      "Borrowing statistics, overdue and top-borrower reports",
      "Password strength meter and forced reset on first login",
      "Input validation and error handling throughout",
    ],
    fallbackIcon: "book-open",
    fallbackGradient: "from-[#4988C4]/50 via-[#1C4D8D]/30 to-[#0F2854]/50",
    github: "https://github.com/RiswanAg",
    demo: "#",
    docs: "/projects/library/report.pdf",
  },
  {
    slug: "signspeak-bim",
    title: "SignSpeak BIM",
    role: "Solo Dev · Computer Vision & ML pipeline",
    kind: "other",
    description:
      "A real-time computer vision application that recognizes custom hand signs through a webcam using MediaPipe and classical machine learning. The project includes a complete ML pipeline from dataset collection to live recognition, and is being developed incrementally with a milestone-driven approach.",
    tech: ["Python", "OpenCV", "MediaPipe", "scikit-learn", "NumPy", "Joblib"],
    contribution:
      "Designed the full project architecture and computer vision workflow, then built the dataset recording system and landmark preprocessing pipeline, the machine learning training pipeline comparing multiple classifiers, and automatic best-model selection with evaluation and metadata generation, all in a modular, unit-tested Python codebase.",
    status: { label: "In Development", tone: "live" },
    image: "/projects/signspeak-bim/thumbnail.png",
    fallbackIcon: "hand",
    fallbackGradient: "from-[#219EBC]/30 via-[#0F2854]/40 to-[#1C4D8D]/50",
    github: "https://github.com/RiswanAg",
    demo: "#",
    docs: "#",
    highlights: [
      "Real-time hand tracking using MediaPipe",
      "Custom landmark dataset recorder",
      "Automatic dataset validation",
      "Landmark normalization",
      "Trained and compared Random Forest, SVM and KNN",
      "Automatic best-model selection",
      "Live model loading",
      "Modular project architecture",
      "Unit-tested training pipeline",
    ],
    milestones: [
      { label: "Webcam capture, real-time hand tracking & two-hand detection", done: true },
      { label: "Dataset recorder, landmark preprocessing & CSV session storage", done: true },
      { label: "ML training pipeline: Random Forest, SVM, KNN + automatic model selection", done: true },
      { label: "Real-time prediction & sentence builder", done: false },
      { label: "ElevenLabs speech synthesis", done: false },
      { label: "UI polish & performance optimization", done: false },
    ],
    achievements: [
      { label: "Best Model", value: "SVM" },
      { label: "Accuracy", value: "98.59%" },
      { label: "F1 Score", value: "98.55%" },
    ],
    technicalDetails:
      "The pipeline is fully modular: a MediaPipe Hands recognizer streams 21 landmarks per hand in real time, which are normalized for translation and scale invariance before being logged into session-based CSVs by a custom dataset recorder with automatic validation. The training pipeline benchmarks Random Forest, SVM, and KNN classifiers side by side, automatically selecting and persisting the best-performing model via Joblib, currently an SVM at 98.59% accuracy and 98.55% F1. The codebase is unit-tested end to end, from landmark preprocessing through model persistence, so the pipeline stays reliable as new milestones (real-time prediction, sentence building, speech synthesis) are added.",
  },
  {
    slug: "mission-delivered",
    title: "Mission: Delivered",
    role: "Director · Editor · Cameraman",
    kind: "video",
    description:
      "A 5-minute cinematic ad for Shopee, produced as a motion-graphics project. I directed the piece, ran the camera, and handled almost all of the editing, blending live footage with motion graphics and AI-generated video (Higgsfield) into one polished spot. The project I'm proudest of, and where I fell in love with editing all over again.",
    tech: ["Directing", "Video Editing", "Motion Graphics", "AI Video", "Higgsfield", "Cinematography"],
    contribution:
      "Directed the full production and led editing end to end: shot planning, cinematography, motion graphics, AI-generated sequences with Higgsfield, colour, and the final edit.",
    status: { label: "Released", tone: "done" },
    image: "/projects/mission-delivered/thumbnail.jpg",
    gallery: [
      { type: "youtube", src: "8B_SRydN_ME", caption: "Mission: Delivered, Shopee ad (full video)" },
    ],
    fallbackIcon: "video",
    fallbackGradient: "from-[#FFB703]/40 via-[#FB8500]/30 to-[#219EBC]/30",
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
      { type: "youtube", src: "17cvcFdY01Q", caption: "Kinetic Typography, After Effects motion piece" },
    ],
    fallbackIcon: "video",
    fallbackGradient: "from-[#219EBC]/30 via-[#FFB703]/40 to-[#8ECAE6]/30",
    github: "#",
    demo: "https://youtu.be/17cvcFdY01Q",
  },
  {
    slug: "inovasi-sosial",
    title: "Projek Inovasi Sosial",
    role: "Video Production · Editor & Cameraman",
    kind: "video",
    description:
      "A group video for a Critical Thinking course pitching a social-innovation idea. I handled the full video production, shooting all the footage as cameraman and editing the whole piece together into a clear, polished final cut.",
    tech: ["Video Editing", "Cinematography", "Video Production", "Storytelling"],
    contribution:
      "Owned the entire video production: ran the camera for all footage and edited the complete video from raw clips to final delivery.",
    status: { label: "Released", tone: "done" },
    image: "/projects/inovasi-sosial/thumbnail.jpg",
    gallery: [
      { type: "youtube", src: "tQFBa98peRI", caption: "Projek Idea Inovasi Sosial, group video" },
    ],
    fallbackIcon: "video",
    fallbackGradient: "from-[#FB8500]/30 via-[#FFB703]/40 to-[#219EBC]/30",
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
    title: "Silver Award, ITEX 2026",
    summary: "Coordinated the exhibit for one of only two UTeM projects at ITEX, and it won Silver.",
    highlight: "Silver · International",
    description:
      "Our project was one of only two selected to represent UTeM at the International Invention, Innovation & Technology Exhibition (ITEX 2026). I coordinated the exhibition floor, operating and demonstrating the Tilt 5 holographic hardware, and explaining the game's innovation and technical structure to judges and visitors. The exhibit won a Silver Award in international competition.",
    icon: "award",
  },
  {
    year: "2025",
    title: "Silver Award, FTMK Workshop 2 Innovation Competition",
    summary: "Silver for Sneak Out, and the project that let underrated teammates prove themselves.",
    highlight: "Silver Award",
    description:
      "Won a Silver Award at Workshop 2 of the FTMK Innovation Competition with Sneak Out, an online multiplayer game rooted in Malaysian school residential (Asrama Sekolah) culture, blending real-time networking, game design, and local storytelling. Beyond building the game, I worked hard to lift my groupmates, teammates many had underestimated, and this project became the moment they showed their real potential.",
    icon: "trophy",
    projectSlug: "sneak-out",
  },
  {
    year: "2024 – 2025",
    title: "Multiple Game Jam Awards, Game Designer & Developer",
    summary: "Repeated wins as both designer and developer across multiple game jams.",
    highlight: "Multiple Wins",
    description:
      "Recognised across several game jams as both Game Designer and Developer, consistently delivering creative, polished game concepts under tight time constraints and competitive judging.",
    icon: "gamepad",
  },
  {
    year: "2023 – 2026",
    title: "Dean's List, All 6 Semesters",
    summary: "A perfect academic streak: Dean's List in every single semester.",
    highlight: "6 / 6 Semesters",
    description:
      "Placed on the Dean's List every semester from Semester 1 through Semester 6, a full-degree record of academic excellence maintained without interruption.",
    icon: "star",
  },
  {
    year: "2022",
    title: "National Football Participation",
    summary: "Represented at national level, teamwork and composure under real pressure.",
    highlight: "National",
    description:
      "Selected to compete at the national level in football, demonstrating the same teamwork, discipline, and composure under pressure that drives my work in collaborative development.",
    icon: "zap",
  },
  {
    year: "2020",
    title: "3rd Place, Sabah COVID-19 Infographic Competition",
    summary: "Third place for public-health visual design under a state brief.",
    highlight: "3rd Place",
    description:
      "Awarded 3rd Place for outstanding visual communication and creative design under a public-health brief, an early signal of the design sensibility that now shapes my game and UI work.",
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
  /** Optional linked portfolio project slug (e.g. "pencak"). */
  projectSlug?: string;
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
      "/journey/experience-1-nextgen-digital-ninja/3.jpg",
    ],
  },
  {
    period: "2024 – 2025",
    role: "Game Designer and Developer",
    organisation: "Various Game Jams",
    summary: "Designed and shipped complete games under game-jam deadlines, and several took home awards.",
    highlight: "Award-winning",
    description:
      "Competed in multiple game jams filling both the designer and developer roles. Produced complete, polished game experiences under tight deadlines and earned awards at several events, demonstrating creative problem-solving and the ability to ship under pressure.",
    tags: ["Game Design", "Unity", "GDevelop", "Rapid Prototyping"],
    bgImages: {
      left: "/projects/rabbit-racing/thumbnail.png",
      right: "/projects/reyclash/thumbnail.png",
    },
  },
  {
    period: "2026",
    role: "Lead Programmer",
    organisation: "PENCAK · Team IMMERSA, DICE 4.0",
    summary:
      "Building a full-body VR Silat trainer that tracks the one thing other martial arts apps ignore: your feet.",
    highlight: "UTeM Representative",
    description:
      "PENCAK is a VR trainer for Silat Seni Gayong, built in Unity for Meta Quest 3 by Team IMMERSA. Existing VR martial arts apps track only arms and hands, which breaks down for Silat, where evasion is entirely footwork — so I pair the headset with HTC Vive trackers to read stance, stepping and foot position, and validate placement live on a grid mat that marks the next step and confirms it once the player lands it. Onboarding runs through a conversational AI Guru built on Convai instead of a setup form, gathering the details that drive body calibration and difficulty, then staying available mid-session to repeat a demonstration or answer a question. The pitch was approved at the UniSZA startup bootcamp, and our four-person team was selected to represent UTeM at DICE 4.0 (Digital Innovation Creativepreneur), the Ministry of Higher Education's national competition for student digital startups, held at UniSZA from 31 July to 3 August 2026.",
    tags: ["Unity", "Meta Quest 3", "Vive Trackers", "Convai", "VR"],
    projectSlug: "pencak",
    gallery: [
      "/journey/experience-3-pencak-dice/1.jpg",
      "/journey/experience-3-pencak-dice/2.jpg",
    ],
  },
  {
    period: "August 2026",
    role: "Exhibitor",
    organisation: "Minggu Sains Negara (MSN) 2026 · Dewan Canselor UTeM",
    summary:
      "Represented UTeM at national science week, demoing AgriLeap on Tilt 5 to the public across two days.",
    highlight: "National Exhibition",
    description:
      "Selected to represent UTeM at Minggu Sains Negara 2026, the national science week exhibition held at Dewan Canselor UTeM. Over two days I demoed AgriLeap — a holographic serious game built in Unity for the Tilt 5 tabletop AR platform, raising awareness of smart palm oil farming among Malaysian youth — running the booth and handling the live hardware setup. Engagement ran strongest with younger visitors, who picked up the two-player asymmetric gameplay with no instruction at all.",
    tags: ["AR", "Unity", "Tilt 5", "Serious Games", "Exhibition"],
    projectSlug: "smart-farming",
    gallery: [
      "/journey/experience-4-msn-agrileap/1.jpg",
      "/journey/experience-4-msn-agrileap/2.jpg",
      "/journey/experience-4-msn-agrileap/3.jpg",
    ],
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
  "Interested in game development roles and collaborations on interactive projects. If you're building something worth playing, I'd like to hear about it.";

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
    display: "riswanhamua10@gmail.com",
    href: "mailto:riswanhamua10@gmail.com",
    icon: "✉️",
  },
  {
    label: "GitHub",
    display: "github.com/RiswanAg",
    href: "https://github.com/RiswanAg",
    icon: "🐙",
    logo: "/socials/github.png",
  },
  {
    label: "LinkedIn",
    display: "linkedin.com/in/riswanhamua",
    href: "https://www.linkedin.com/in/riswanhamua",
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
