import Image from "next/image";
import { EDUCATION } from "@/lib/data";
import { SpotlightCard } from "@/components/aceternity/spotlight-card";
import { Reveal } from "@/components/motion/reveal";
import { Container, SectionHeader } from "@/components/site/section-header";

export function Education() {
  return (
    <section id="education" className="border-t border-line bg-surface/40 py-24 sm:py-32">
      <Container>
        <SectionHeader
          index="05"
          eyebrow="Education"
          title={
            <>
              Learning by <span className="text-accent-strong">building.</span>
            </>
          }
        />
        <div className="grid gap-5 md:grid-cols-3">
          {EDUCATION.map((education, index) => (
            <Reveal key={education.institution} delay={index * 0.06}>
              <SpotlightCard as="article" className="flex h-full flex-col p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="relative grid h-14 w-14 place-items-center overflow-hidden rounded-2xl border border-line bg-white p-2">
                    <Image src={education.logo} alt="" width={44} height={44} className="h-10 w-10 object-contain" />
                  </span>
                  {education.grade && (
                    <span className="rounded-full bg-amber/15 px-3 py-1 font-mono text-xs font-semibold text-amber-strong">
                      {education.grade}
                    </span>
                  )}
                </div>
                <p className="mt-6 font-mono text-xs text-dim">{education.period}</p>
                <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight text-ink">{education.institution}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dim">{education.qualification}</p>
                <p className="mt-auto pt-6 text-sm font-medium text-accent-strong">{education.highlight}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
