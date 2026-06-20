import { EDUCATION } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Education() {
  return (
    <section id="education" className="relative px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Academic Path" title="Education" />

        <div className="flex flex-col gap-6">
          {EDUCATION.map((e, i) => (
            <Reveal key={e.institution} delay={i * 100}>
              <div className="rounded-2xl border border-white/8 bg-[#0b0e14] p-6 transition-all duration-300 hover:border-emerald-400/25">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-400">
                      {e.period}
                    </span>
                    <h3 className="mt-1.5 font-bold text-white">
                      {e.institution}
                    </h3>
                    <p className="mt-0.5 text-sm font-medium text-slate-400">
                      {e.qualification}
                    </p>
                  </div>

                  {e.grade && (
                    <span className="shrink-0 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 font-mono text-xs text-emerald-400">
                      {e.grade}
                    </span>
                  )}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {e.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
