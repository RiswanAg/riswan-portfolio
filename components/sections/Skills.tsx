import { SKILL_GROUPS } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Image from "next/image";

const ACCENT: Record<string, { text: string; bar: string; hover: string }> = {
  emerald: {
    text: "text-[#DF2531]",
    bar: "from-[#DF2531] to-[#FFFFFF]",
    hover: "group-hover:border-[#DF2531]/40 group-hover:bg-[#DF2531]/8",
  },
  lime: {
    text: "text-white",
    bar: "from-[#FFFFFF] to-[#DF2531]",
    hover: "group-hover:border-white/40 group-hover:bg-white/8",
  },
  cyan: {
    text: "text-[#DF2531]",
    bar: "from-[#7A1018] to-[#DF2531]",
    hover: "group-hover:border-[#DF2531]/40 group-hover:bg-[#DF2531]/8",
  },
  sky: {
    text: "text-white",
    bar: "from-[#DF2531] to-[#FFFFFF]",
    hover: "group-hover:border-white/40 group-hover:bg-white/8",
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
                <div className="group/card flex h-full flex-col rounded-3xl border border-white/8 bg-[#111111] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#DF2531]/25 hover:shadow-lg hover:shadow-[#DF2531]/5">
                  <div className={`mb-2 h-1 w-10 rounded-full bg-gradient-to-r ${a.bar} transition-all duration-300 group-hover/card:w-14`} />
                  <h3 className={`mb-6 text-sm font-bold uppercase tracking-wider ${a.text}`}>
                    {group.category}
                  </h3>

                  <div className="flex flex-wrap gap-5">
                    {group.skills.map((s) => (
                      <div key={s.name} className="group flex flex-col items-center gap-1.5">
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03] p-2.5 transition-all duration-200 ${a.hover} group-hover:scale-105`}
                        >
                          <Image
                            src={s.logo}
                            alt={s.name}
                            width={48}
                            height={48}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <span className="whitespace-nowrap text-[10px] font-medium text-[#A3A3A3] transition-colors group-hover:text-white">
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
