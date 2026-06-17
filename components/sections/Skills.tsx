import { SKILL_GROUPS } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Static class map — Tailwind only ships classes it can see at build time.
const ACCENT: Record<string, { text: string; chip: string; bar: string }> = {
  emerald: {
    text: "text-emerald-300",
    chip: "border-emerald-400/25 bg-emerald-400/10 text-emerald-200",
    bar: "from-emerald-400 to-lime-300",
  },
  lime: {
    text: "text-lime-300",
    chip: "border-lime-400/25 bg-lime-400/10 text-lime-200",
    bar: "from-lime-300 to-emerald-400",
  },
  cyan: {
    text: "text-cyan-300",
    chip: "border-cyan-400/25 bg-cyan-400/10 text-cyan-200",
    bar: "from-cyan-400 to-sky-300",
  },
  sky: {
    text: "text-sky-300",
    chip: "border-sky-400/25 bg-sky-400/10 text-sky-200",
    bar: "from-sky-400 to-cyan-300",
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
                  <h3 className={`mb-5 text-sm font-bold uppercase tracking-wider ${a.text}`}>
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((s) => (
                      <span
                        key={s}
                        className={`rounded-lg border px-3 py-1.5 text-sm font-medium ${a.chip}`}
                      >
                        {s}
                      </span>
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
