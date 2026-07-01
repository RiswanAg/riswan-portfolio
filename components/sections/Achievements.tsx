import { ACHIEVEMENTS } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Achievements() {
  return (
    <section id="achievements" className="relative px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Recognition" title="Achievements" />

        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-gradient-to-b from-[#DF2531]/60 via-[#7A1018]/30 to-transparent md:left-1/2" />

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
                  <div
                    className={`absolute top-1 z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#DF2531]/40 bg-[#111111] text-sm shadow-lg shadow-black/50 ${
                      i % 2 === 0
                        ? "left-0 md:-left-4"
                        : "left-0 md:-right-4 md:left-auto"
                    }`}
                  >
                    {a.icon}
                  </div>

                  <div className="ml-12 rounded-2xl border border-white/8 bg-[#111111] p-6 transition-all duration-300 hover:border-[#DF2531]/25 md:ml-0">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#DF2531]">
                      {a.year}
                    </span>
                    <h3 className="mt-1.5 font-bold text-white">{a.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {a.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
