import Image from "next/image";
import { Quote } from "lucide-react";
import { ABOUT_HOME, PROFILE, SKILL_GROUPS, type SkillLevel } from "@/lib/data";
import { SpotlightCard } from "@/components/aceternity/spotlight-card";
import { Reveal } from "@/components/motion/reveal";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { Container, Eyebrow, SectionHeader } from "@/components/site/section-header";

const LEVELS: SkillLevel[] = ["Familiar", "Proficient", "Advanced", "Expert"];

function LevelMeter({ level }: { level: SkillLevel }) {
  const filled = LEVELS.indexOf(level) + 1;
  return (
    <span className="flex items-center gap-2" title={level}>
      <span className="sr-only">{level}</span>
      <span aria-hidden className="flex gap-0.5">
        {LEVELS.map((step, index) => (
          <span key={step} className={`h-1.5 w-3 rounded-full ${index < filled ? "bg-accent" : "bg-line-2"}`} />
        ))}
      </span>
    </span>
  );
}

export function About() {
  // Data order is the display order: the bio session curates it in lib/data.ts.
  const groups = SKILL_GROUPS;
  return (
    <section id="about-home" className="border-y border-line bg-surface/40 py-24 sm:py-32">
      <Container>
        <SectionHeader index="02" eyebrow={ABOUT_HOME.heading} title={<>{ABOUT_HOME.greeting} <span className="text-accent-strong">{PROFILE.name.split(" ")[0]}.</span></>} />

        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="space-y-8">
            <p className="text-xl leading-relaxed text-ink sm:text-2xl sm:leading-relaxed">{ABOUT_HOME.bio}</p>
            <figure className="relative rounded-3xl border border-line bg-surface p-6 sm:p-7">
              <Quote size={22} className="text-amber" aria-hidden />
              <blockquote className="mt-3 text-lg font-medium leading-relaxed text-ink">{ABOUT_HOME.quote}</blockquote>
              <figcaption className="mt-4 flex items-center gap-3 text-sm text-dim">
                <span className="relative h-8 w-8 overflow-hidden rounded-full bg-surface-2">
                  <Image src={PROFILE.image} alt="" fill sizes="32px" className="object-cover object-[center_25%]" />
                </span>
                {PROFILE.name}
              </figcaption>
            </figure>
            <div className="flex flex-wrap gap-3">
              <InteractiveHoverButton href="/#contact" variant="ink">
                Work with me
              </InteractiveHoverButton>
              <InteractiveHoverButton href={PROFILE.cv} download variant="outline">
                Download CV
              </InteractiveHoverButton>
            </div>
          </Reveal>

          <div>
            <Eyebrow className="mb-6">Toolkit</Eyebrow>
            <div className="grid gap-4 sm:grid-cols-2">
              {groups.map((group, index) => (
                <Reveal key={group.category} delay={(index % 2) * 0.08}>
                  <SpotlightCard className="h-full rounded-2xl p-5">
                    <h3 className="text-base font-semibold text-ink">{group.category}</h3>
                    <ul className="mt-4 space-y-2.5">
                      {group.skills.map((skill) => (
                        <li key={skill.name} className="flex items-center justify-between gap-3 text-sm">
                          <span className="flex min-w-0 items-center gap-2.5 text-ink">
                            <span className="relative grid h-7 w-7 shrink-0 place-items-center rounded-lg border border-line bg-white p-1">
                              {/* The faint outline keeps white-on-transparent logos (e.g. Unreal) visible on the white tile. */}
                              <Image src={skill.logo} alt="" width={20} height={20} className="h-5 w-5 object-contain [filter:drop-shadow(0_0_0.75px_rgb(2_48_71/0.6))]" />
                            </span>
                            <span className="truncate">{skill.name}</span>
                          </span>
                          <LevelMeter level={skill.level} />
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
            <p className="mt-4 font-mono text-xs text-dim">
              Bars: {LEVELS.map((level, index) => `${index + 1} ${level}`).join(" · ")}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
