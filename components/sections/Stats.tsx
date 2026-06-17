import { STATS } from "@/lib/data";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

export function Stats() {
  return (
    <section className="relative z-10 border-y border-white/5 bg-white/[0.015] px-6 py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 80}
            className="flex flex-col items-center text-center"
          >
            <div className="bg-gradient-to-r from-lime-300 to-emerald-300 bg-clip-text text-3xl font-black text-transparent md:text-4xl">
              {typeof s.value === "number" ? (
                <Counter value={s.value} suffix={s.suffix} />
              ) : (
                s.display
              )}
            </div>
            <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
              {s.label}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
