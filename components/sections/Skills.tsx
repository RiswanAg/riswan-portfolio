import { SKILL_GROUPS } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Image from "next/image";

const ACCENT: Record<string, { text: string; bar: string; hover: string }> = {
  emerald: {
    text: "text-[#4988C4]",
    bar: "from-[#4988C4] to-[#BDE8F5]",
    hover: "group-hover:border-[#4988C4]/40 group-hover:bg-[#4988C4]/8",
  },
  lime: {
    text: "text-[#BDE8F5]",
    bar: "from-[#BDE8F5] to-[#4988C4]",
    hover: "group-hover:border-[#BDE8F5]/40 group-hover:bg-[#BDE8F5]/8",
  },
  cyan: {
    text: "text-[#4988C4]",
    bar: "from-[#1C4D8D] to-[#4988C4]",
    hover: "group-hover:border-[#4988C4]/40 group-hover:bg-[#4988C4]/8",
  },
  sky: {
    text: "text-[#BDE8F5]",
    bar: "from-[#4988C4] to-[#BDE8F5]",
    hover: "group-hover:border-[#BDE8F5]/40 group-hover:bg-[#BDE8F5]/8",
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
                <div className="flex h-full flex-col rounded-3xl border border-white/8 bg-[#0F2854] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/15">
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
