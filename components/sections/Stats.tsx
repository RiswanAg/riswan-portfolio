import { STATS } from "@/lib/data";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

export function Stats() {
  return (
    <section className="relative z-10 border-y border-white/5 bg-white/[0.015] px-6 py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 80}
            className="group flex flex-col items-center gap-3 px-6 py-6 text-center"
          >
            <div className="relative">
              <div className="bg-gradient-to-r from-[#FFFFFF] to-[#DF2531] bg-clip-text text-3xl font-black text-transparent md:text-4xl">
                {typeof s.value === "number" ? (
                  <Counter value={s.value} suffix={s.suffix} />
                ) : (
                  s.display
                )}
              </div>
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 transition-colors group-hover:text-[#A3A3A3]">
              {s.label}
            </div>
            <div className="h-px w-6 bg-gradient-to-r from-transparent via-[#DF2531]/40 to-transparent transition-all duration-300 group-hover:w-10 group-hover:via-[#DF2531]/70" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
