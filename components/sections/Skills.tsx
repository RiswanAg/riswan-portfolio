import { SKILL_GROUPS } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Image from "next/image";

const ACCENT: Record<string, { text: string; bar: string; hover: string }> = {
  emerald: {
    text: "text-emerald-300",
    bar: "from-emerald-400 to-lime-300",
    hover: "group-hover:border-emerald-400/40 group-hover:bg-emerald-400/8",
  },
  lime: {
    text: "text-lime-300",
    bar: "from-lime-300 to-emerald-400",
    hover: "group-hover:border-lime-400/40 group-hover:bg-lime-400/8",
  },
  cyan: {
    text: "text-cyan-300",
    bar: "from-cyan-400 to-sky-300",
    hover: "group-hover:border-cyan-400/40 group-hover:bg-cyan-400/8",
  },
  sky: {
    text: "text-sky-300",
    bar: "from-sky-400 to-cyan-300",
    hover: "group-hover:border-sky-400/40 group-hover:bg-sky-400/8",
  },
};

export function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="What I work with" title="Skills" />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((group, i) => {
            const a = ACCENT[group.accent] ?? ACCENT.emerald;
            return (
              <Reveal key={group.category} delay={i * 90}>
                <div className="flex h-full flex-col rounded-3xl border border-white/8 bg-[#0b0e14] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/15">
                  <div className={`mb-2 h-1 w-10 rounded-full bg-gradient-to-r ${a.bar}`} />
                  <h3 className={`mb-6 text-sm font-bold uppercase tracking-wider ${a.text}`}>
                    {group.category}
                  </h3>

                  <div className="flex flex-wrap gap-5">
                    {group.skills.map((s) => (
                      <div key={s.name} className="group flex flex-col items-center gap-1.5">
                        <div
                          className={`flex h-16 w-16 items-center justify-center rounded-2xl border border-white/8 bg-white/4 p-3 transition-all duration-200 ${a.hover}`}
                        >
                          <Image
                            src={s.logo}
                            alt={s.name}
                            width={56}
                            height={56}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <span className="whitespace-nowrap text-[10px] font-medium text-slate-400">
                          {s.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
