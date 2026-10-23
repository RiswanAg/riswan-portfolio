import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Download,
  Gamepad2,
  MoveUpRight,
} from "lucide-react";
import {
  PROFILE,
  ABOUT_HOME,
  PROJECTS,
  EDUCATION,
  CONTACTS,
  CONTACT_INTRO,
} from "@/lib/data";
import {
  CinematicHero,
  ScrollManifesto,
  ScrollMarquee,
  ScrollProgress,
  ScrollReveal,
  StackedProjects,
} from "./CinematicSections";
import { Journey } from "@/components/sections/Journey";
import {
  CopyEmail,
  PortfolioNav,
  WorkArchive,
  SectionAnchor,
} from "./PortfolioInteractions";

const featured = ["pencak", "smart-farming", "sneak-out", "overtime"].map(
  (slug) => PROJECTS.find((project) => project.slug === slug)!,
);

export function PortfolioHome() {
  const email = CONTACTS.find((contact) => contact.label === "Email")!;
  return (
    <div className="portfolio-page cinematic-portfolio">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <PortfolioNav />
      <ScrollProgress />
      <main id="main">
        <CinematicHero />
        <ScrollManifesto />

        <section
          id="portfolio-showcase"
          className="portfolio-work portfolio-container"
        >
          <div className="section-label">
            <span className="label-line" />
            The things I make
          </div>
          <ScrollReveal className="section-heading">
            <h2>
              BUILT TO
              <br />
              <span>BE PLAYED.</span>
            </h2>
            <a href="#work-archive" className="portfolio-text-link">
              Browse everything <ArrowDownRight size={17} />
            </a>
          </ScrollReveal>
          <StackedProjects projects={featured} />
          <div id="work-archive">
            <WorkArchive />
          </div>
        </section>

        <ScrollMarquee />
        <section id="about-home" className="portfolio-about">
          <div className="portfolio-container about-grid">
            <ScrollReveal className="about-photo-composition">
              <div className="about-photo">
                <Image
                  src={PROFILE.image}
                  alt="Riswan Hamua, game and immersive technology developer"
                  fill
                  sizes="(min-width: 1024px) 36vw, 90vw"
                  className="object-cover object-[center_30%]"
                />
              </div>
              <div className="about-photo-note">
                <Asterisk size={30} strokeWidth={1.5} />
                <span>
                  Always a player.
                  <br />
                  Now a maker, too.
                </span>
              </div>
            </ScrollReveal>
            <ScrollReveal className="about-copy" delay={0.12}>
              <div className="section-label">
                <span className="label-line" />
                The person behind the pixels
              </div>
              <h2>
                Curious mind.
                <br />
                Hands-on builder.
              </h2>
              <p>{ABOUT_HOME.bio}</p>
              <p>
                I’m drawn to the space where code meets experience: a game that
                gets everyone shouting, a familiar place turned into a level, or
                a tradition you can step into through VR.
              </p>
              <div className="about-disciplines">
                <span>
                  <Gamepad2 size={17} />
                  Game development
                </span>
                <span>
                  <MoveUpRight size={17} />
                  VR &amp; AR experiences
                </span>
                <span>
                  <Asterisk size={17} />
                  Creative experiments
                </span>
              </div>
              <a href={PROFILE.cv} download className="portfolio-text-link">
                Download CV <Download size={16} />
              </a>
            </ScrollReveal>
          </div>
        </section>

        <ScrollReveal className="portfolio-journey portfolio-container">
          <Journey />
        </ScrollReveal>

        <section
          id="education"
          className="portfolio-education portfolio-container"
        >
          <ScrollReveal className="education-intro">
            <div className="section-label">
              <span className="label-line" />
              Education
            </div>
            <h2>
              Learning by
              <br />
              <span>doing.</span>
            </h2>
            <p>
              A foundation in engineering.
              <br />A degree in making things playable.
            </p>
            <Asterisk
              className="education-asterisk"
              size={66}
              strokeWidth={1.2}
              aria-hidden
            />
          </ScrollReveal>
          <div className="education-list">
            {EDUCATION.map((education) => (
              <ScrollReveal key={education.institution}>
                <article>
                  <div className="education-meta">
                    <span>{education.period.replace(/[–—]/g, "-")}</span>
                    <span>{education.grade}</span>
                  </div>
                  <div className="flex items-start gap-5">
                    <div className="education-logo">
                      <Image
                        src={education.logo}
                        alt=""
                        width={46}
                        height={46}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h3>{education.institution}</h3>
                      <p>{education.qualification}</p>
                      <span className="education-highlight">
                        {education.highlight}
                      </span>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section id="contact" className="portfolio-contact">
          <div className="portfolio-container">
            <div className="section-label">
              <span className="label-line" />
              Have something in mind?
            </div>
            <a href={email.href} className="contact-headline">
              <h2>
                Let’s make
                <br />
                something <span>play.</span>
              </h2>
              <span className="contact-arrow">
                <ArrowUpRight strokeWidth={1.2} />
              </span>
            </a>
            <div className="contact-bottom">
              <div>
                <p>{CONTACT_INTRO}</p>
                <a className="contact-email" href={email.href}>
                  {email.display}
                  <ArrowUpRight size={19} />
                </a>
                <CopyEmail email={email.display} />
              </div>
              <div className="contact-socials">
                {CONTACTS.filter((contact) => contact.label !== "Email").map(
                  (contact) => (
                    <a
                      key={contact.label}
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {contact.label}
                      <ArrowUpRight size={16} />
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <PortfolioFooter />
    </div>
  );
}

export function PortfolioFooter() {
  return (
    <footer className="portfolio-footer portfolio-container">
      <Link
        href="/"
        className="portfolio-logo"
        aria-label="RH. Riswan Hamua home"
      >
        RH<span>.</span>
      </Link>
      <p>© {new Date().getFullYear()} Riswan Hamua</p>
      <SectionAnchor section="hero" className="portfolio-text-link">
        Back to top <ArrowRight className="-rotate-90" size={15} />
      </SectionAnchor>
    </footer>
  );
}
