"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { EDUCATION } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { GlowCard } from "@/components/ui/GlowCard";
import { CountUp } from "@/components/ui/CountUp";

const VIOLET = "#7C5CFF";

function InstitutionLogo({ logo, initials }: { logo: string; initials: string }) {
  return (
    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl border border-line bg-veil transition-transform duration-300 group-hover/glow:scale-105">
      <SmartImage
        src={logo}
        alt={initials}
        sizes="64px"
        className="object-contain p-2.5"
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-xs font-bold uppercase tracking-wide text-dim">
              {initials}
            </span>
          </div>
        }
      />
    </div>
  );
}

export function Education() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="education" className="relative px-6 py-28">
      <div aria-hidden className="aurora -right-20 top-4 h-64 w-64 bg-violet/16" />
      <div aria-hidden className="aurora -left-16 bottom-8 h-56 w-56 bg-violet/10" />

      <div className="relative mx-auto max-w-3xl">
        <SectionHeading eyebrow="Academic Path" title="Education" />
        <p className="mx-auto -mt-8 mb-12 max-w-xl text-center text-sm leading-relaxed text-dim">
          The climb from secondary school to a Game Technology degree, one grade at a time.
        </p>

        {/* Progression rail */}
        <div className="relative">
          <div className="absolute bottom-6 left-[31px] top-6 w-px bg-gradient-to-b from-violet/60 via-violet/25 to-transparent sm:left-[39px]" />

          <div className="flex flex-col gap-5">
            {EDUCATION.map((e, i) => (
              <motion.div
                key={e.institution}
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              >
                <GlowCard className="group/glow rounded-2xl border border-line bg-surface p-5 transition-colors duration-300 hover:border-violet/35 sm:p-6">
                  <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-5">
                    <InstitutionLogo logo={e.logo} initials={e.logoInitials} />

                    <div className="min-w-0 flex-1">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-violet-strong">
                        {e.period}
                      </span>
                      <h3 className="mt-1 text-base font-bold leading-snug text-ink">
                        {e.institution}
                      </h3>
                      <p className="mt-0.5 text-sm font-medium text-dim">
                        {e.qualification}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-dim">
                        {e.summary}
                      </p>
                    </div>

                    {/* Grade — the hero credential */}
                    {e.grade && (
                      <div
                        className="col-span-2 flex min-h-11 w-full items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-left sm:col-span-1 sm:w-auto sm:min-w-24 sm:flex-col sm:justify-center sm:rounded-2xl sm:px-5 sm:py-3 sm:text-center"
                        style={{
                          background: `${VIOLET}12`,
                          boxShadow: `inset 0 0 0 1px ${VIOLET}40`,
                        }}
                      >
                        <span className="flex items-center gap-2 text-xs font-semibold text-dim sm:flex-col sm:gap-1">
                          <GraduationCap size={16} style={{ color: VIOLET }} />
                          Grade
                        </span>
                        <span className="text-lg font-black tracking-tight text-ink sm:mt-1">
                          <CountUp value={e.grade} />
                        </span>
                      </div>
                    )}
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
