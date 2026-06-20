import { EXPERIENCES } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience() {
  return (
    <section id="experience" className="relative px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="What I Have Done" title="Experience" />

        <div className="flex flex-col gap-6">
          {EXPERIENCES.map((e, i) => (
            <Reveal key={e.role + e.organisation} delay={i * 100}>
              <div className="rounded-2xl border border-white/8 bg-[#0b0e14] p-6 transition-all duration-300 hover:border-emerald-400/25">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-400">
                      {e.period}
                    </span>
                    <h3 className="mt-1.5 font-bold text-white">{e.role}</h3>
                    <p className="mt-0.5 text-sm font-medium text-slate-400">
                      {e.organisation}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {e.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {e.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/8 bg-white/4 px-3 py-1 text-[11px] font-medium text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
