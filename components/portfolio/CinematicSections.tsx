"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowUpRight,
  Asterisk,
  Gamepad2,
  MoveUpRight,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { PROFILE, PROJECTS, type Project } from "@/lib/data";

const EASE = [0.22, 1, 0.36, 1] as const;

export function CinematicHero() {
  const section = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const sceneScale = useTransform(smooth, [0, 1], [1.04, 1.24]);
  const titleY = useTransform(smooth, [0, 1], [0, -140]);
  const deckY = useTransform(smooth, [0, 1], [0, 120]);
  const deckRotate = useTransform(smooth, [0, 1], [-7, 5]);
  return (
    <section id="hero" className="cinematic-hero" ref={section}>
      <div className="cinematic-hero-scene">
        <motion.div
          className="cinematic-hero-background"
          style={reduce ? undefined : { scale: sceneScale }}
        >
          <Image
            src="/projects/sneak-out/thumbnail.png"
            alt=""
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className="object-cover"
          />
        </motion.div>
        <div className="cinematic-hero-shade" aria-hidden />
        <div className="cinematic-hero-content portfolio-container">
          <motion.div
            className="cinematic-hero-copy"
            style={reduce ? undefined : { y: titleY }}
          >
            <motion.p
              className="cinematic-intro"
              initial={false}
              animate={{ opacity: 1 }}
            >
              <span className="cinematic-avatar">
                <Image
                  src={PROFILE.image}
                  alt=""
                  fill
                  sizes="44px"
                  className="object-cover"
                />
              </span>
              <span>
                Riswan Hamua<span>Game &amp; Immersive Tech Developer</span>
              </span>
            </motion.p>
            <h1 aria-label="Beyond the screen.">
              <span className="hero-line">
                <motion.span
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE }}
                >
                  BEYOND
                </motion.span>
              </span>
              <span className="hero-line hero-line-accent">
                <motion.span
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease: EASE }}
                >
                  THE SCREEN<span className="hero-period">.</span>
                </motion.span>
              </span>
            </h1>
            <p className="cinematic-hero-description">
              I build games you can play.
              <br />
              And worlds you can step into.
            </p>
            <div className="cinematic-hero-actions">
              <InteractiveHoverButton
                href="#portfolio-showcase"
                className="button-hot"
              >
                Explore my work
              </InteractiveHoverButton>
              <InteractiveHoverButton
                href={PROFILE.cv}
                download
                className="button-clear"
              >
                Download CV
              </InteractiveHoverButton>
            </div>
          </motion.div>
          <motion.div
            className="hero-game-deck"
            style={reduce ? undefined : { y: deckY }}
          >
            <motion.div
              className="hero-deck-back"
              style={reduce ? undefined : { rotate: deckRotate }}
            >
              <Image
                src="/projects/pencak/thumbnail.png"
                alt="PENCAK virtual reality Silat project"
                fill
                sizes="(min-width: 768px) 400px, 70vw"
                className="object-cover"
              />
            </motion.div>
            <CardContainer
              className="hero-3d-card"
              containerClassName="hero-3d-container"
            >
              <CardBody>
                <div className="hero-card-top">
                  <Gamepad2 size={17} />
                  <span>Made by me. Ready for you.</span>
                  <span className="hero-card-cross" aria-hidden>
                    +
                  </span>
                </div>
                <CardItem translateZ={45} className="hero-deck-image">
                  <Link
                    href="/projects/smart-farming"
                    aria-label="Explore AgriLeap"
                  >
                    <Image
                      src="/projects/smart-farming/thumbnail.png"
                      alt="AgriLeap, a holographic smart-farming game"
                      fill
                      sizes="(min-width: 1024px) 420px, (min-width: 768px) 320px, 85vw"
                      className="object-cover"
                    />
                  </Link>
                </CardItem>
                <CardItem translateZ={25} className="hero-card-footer">
                  <div>
                    <span>Holographic simulation</span>
                    <strong>AgriLeap</strong>
                  </div>
                  <Link
                    href="/projects/smart-farming"
                    aria-label="View AgriLeap project"
                    className="hero-card-link"
                  >
                    <ArrowUpRight size={24} />
                  </Link>
                </CardItem>
              </CardBody>
            </CardContainer>
            <span className="hero-deck-caption">
              A few of the worlds I’m building <ArrowUpRight size={19} />
            </span>
          </motion.div>
        </div>
        <div className="cinematic-hero-bottom portfolio-container">
          <span>Code is the medium. Experience is the point.</span>
          <a href="#portfolio-showcase" aria-label="Explore projects below">
            <ArrowDownRight size={23} />
          </a>
        </div>
      </div>
    </section>
  );
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduce ? undefined : { y: [28, 0], opacity: [0.45, 1] }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function ScrollManifesto() {
  const target = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start .9", "end .3"],
  });
  const words =
    "A good game starts with curiosity. A great one makes you forget the screen.".split(
      " ",
    );
  return (
    <section className="scroll-manifesto portfolio-container" ref={target}>
      <div className="manifesto-symbol">
        <Asterisk size={52} strokeWidth={1.3} />
      </div>
      <p>
        <span className="sr-only">{words.join(" ")}</span>
        {words.map((word, index) => (
          <ManifestoWord
            key={`${word}-${index}`}
            word={word}
            progress={scrollYProgress}
            start={index / words.length}
            end={(index + 1) / words.length}
            reduce={!!reduce}
          />
        ))}
      </p>
      <div className="manifesto-proof">
        <span>
          <strong>{PROJECTS.length}</strong> projects &amp; experiments
        </span>
        <span>
          <strong>3.80</strong> CGPA at UTeM
        </span>
        <span>
          <strong>6/6</strong> Dean’s List semesters
        </span>
      </div>
    </section>
  );
}

function ManifestoWord({
  word,
  progress,
  start,
  end,
  reduce,
}: {
  word: string;
  progress: MotionValue<number>;
  start: number;
  end: number;
  reduce: boolean;
}) {
  const opacity = useTransform(progress, [start, end], [0.6, 1]);
  return (
    <motion.span aria-hidden style={reduce ? undefined : { opacity }}>
      {word}{" "}
    </motion.span>
  );
}

const PROJECT_DETAILS: Record<
  string,
  { label: string; summary: string; accent: string; image?: string }
> = {
  pencak: {
    label: "Virtual reality / Cultural heritage",
    summary:
      "Silat is more than what your hands do. A full-body VR trainer that brings stance, footwork, and a virtual Guru into the experience.",
    accent: "#eb633d",
  },
  "smart-farming": {
    label: "Holographic AR / Serious game",
    summary:
      "Grow a smarter world. A hands-on farming simulation with IoT monitoring, drone scouting, and AI disease detection.",
    accent: "#becf8a",
    image: "/projects/smart-farming/iot-monitoring.jpg",
  },
  "sneak-out": {
    label: "Multiplayer / Malaysian stories",
    summary:
      "The dormitory lights are out. The wardens are not. An online multiplayer escape built around the Asrama Sekolah experience.",
    accent: "#a8c6e3",
  },
  overtime: {
    label: "Co-op / Game jam winner",
    summary:
      "Deadlines, teammates, and a very chaotic IT office. Our co-op game took first place at the Play Next Game Jam.",
    accent: "#c6b3e4",
  },
};

export function StackedProjects({ projects }: { projects: Project[] }) {
  const stack = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stack,
    offset: ["start start", "end end"],
  });
  return (
    <div className="project-scroll-stack" ref={stack}>
      {projects.map((project, index) => (
        <StackedProject
          key={project.slug}
          project={project}
          index={index}
          total={projects.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function StackedProject({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const scale = useTransform(
    progress,
    [index / total, Math.min(1, (index + 1.3) / total)],
    [1, 0.94],
  );
  const details = PROJECT_DETAILS[project.slug];
  return (
    <article
      className="project-stack-panel"
      style={{
        top: `calc(var(--stack-top) + ${index * 9}px)`,
        zIndex: index + 1,
      }}
    >
      <motion.div
        className="project-stack-motion"
        style={reduce || index === total - 1 ? undefined : { scale }}
      >
        <CardContainer
          containerClassName="stack-3d-container"
          className="stack-3d-body"
        >
          <CardBody className="project-stack-content">
            <div className="project-stack-copy">
              <div className="project-discipline">
                <span style={{ background: details.accent }} />
                <span>{details.label}</span>
              </div>
              <CardItem translateZ={35}>
                <h3>{project.title}</h3>
              </CardItem>
              <p>{details.summary}</p>
              <div className="project-stack-tools">
                {project.tech.slice(0, 3).map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
              {project.award && (
                <p className="project-stack-award">
                  <Asterisk size={16} />
                  {project.award.replace(/ · /g, " / ")}
                </p>
              )}
              <CardItem translateZ={25} className="project-stack-action">
                <InteractiveHoverButton
                  href={`/projects/${project.slug}`}
                  className="button-hot"
                >
                  Explore project
                </InteractiveHoverButton>
              </CardItem>
            </div>
            <CardItem
              translateZ={45}
              className={`project-stack-art project-art-${project.slug}`}
            >
              <Link
                href={`/projects/${project.slug}`}
                prefetch={false}
                aria-label={`Explore ${project.title}`}
              >
                <Image
                  src={details.image ?? project.image}
                  alt={project.title}
                  fill
                  sizes="(min-width: 1440px) 760px, (min-width: 768px) 57vw, calc(100vw - 48px)"
                  className={
                    project.imageFit === "contain"
                      ? "object-contain"
                      : "object-cover"
                  }
                />
              </Link>
              <span className="project-stack-open" aria-hidden>
                <MoveUpRight size={30} />
              </span>
            </CardItem>
          </CardBody>
        </CardContainer>
      </motion.div>
    </article>
  );
}

export function ScrollMarquee() {
  const target = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-23%"]);
  return (
    <div className="discipline-marquee" ref={target}>
      <span className="sr-only">
        Game development, immersive worlds, creative experiments
      </span>
      <motion.div style={reduce ? undefined : { x }} aria-hidden>
        {[0, 1].map((index) => (
          <span className="marquee-group" key={index}>
            <span>GAME DEVELOPMENT</span>
            <Asterisk />
            <span>IMMERSIVE WORLDS</span>
            <Asterisk />
            <span>CREATIVE EXPERIMENTS</span>
            <Asterisk />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      aria-hidden
      className="cinematic-scroll-progress"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
