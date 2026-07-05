import { ACHIEVEMENTS } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import {
  Award,
  Trophy,
  Gamepad2,
  Star,
  Zap,
  PenTool,
  LucideIcon,
} from "lucide-react";

const ACHIEVEMENT_ICONS: Record<string, LucideIcon> = {
  award: Award,
  trophy: Trophy,
  gamepad: Gamepad2,
  star: Star,
  zap: Zap,
  "pen-tool": PenTool,
};

export function Achievements() {
  return (
    <section id="achievements" className="relative px-6 py-28">
      {/* Section identity glow */}
      <div
        aria-hidden
        className="aurora left-1/2 top-0 h-[30vw] w-[30vw] -translate-x-1/2 bg-[#7C5CFF]/12"
      />

      <div className="relative mx-auto max-w-3xl">
        <SectionHeading eyebrow="Recognition" title="Achievements" />

        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-[#2EE6C6]/60 via-[#7C5CFF]/30 to-transparent md:left-1/2" />

          <div className="flex flex-col gap-10">
            {ACHIEVEMENTS.map((a, i) => (
              <Reveal key={a.title} delay={i * 110}>
                <div
                  className={`relative flex items-start gap-6 md:w-1/2 ${
                    i % 2 === 0
                      ? "md:ml-auto md:flex-row md:pl-10"
                      : "md:mr-auto md:flex-row-reverse md:pr-10 md:text-right"
                  }`}
                >
                  {/* Node */}
                  {(() => {
                    const Icon = ACHIEVEMENT_ICONS[a.icon] ?? Award;
                    return (
                      <div
                        className={`absolute top-1 z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#2EE6C6]/40 bg-[#0E1626] text-[#2EE6C6] shadow-lg shadow-black/50 ${
                          i % 2 === 0
                            ? "left-0 md:-left-4"
                            : "left-0 md:-right-4 md:left-auto"
                        }`}
                      >
                        <Icon size={14} strokeWidth={2} />
                      </div>
                    );
                  })()}

                  <GlowCard className="ml-12 rounded-2xl border border-white/8 bg-[#0E1626] p-6 transition-all duration-300 hover:border-[#2EE6C6]/25 md:ml-0">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#2EE6C6]">
                      {a.year}
                    </span>
                    <h3 className="mt-1.5 font-bold text-white">{a.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {a.description}
                    </p>
                  </GlowCard>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
