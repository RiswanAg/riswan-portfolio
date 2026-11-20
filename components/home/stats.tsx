import { Award, Code2, GraduationCap, Star, type LucideIcon } from "lucide-react";
import { ABOUT_STATS, type AboutStat } from "@/lib/data";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/site/section-header";

const ICONS: Record<AboutStat["icon"], LucideIcon> = {
  cgpa: GraduationCap,
  code: Code2,
  award: Award,
  star: Star,
};

export function Stats() {
  return (
    <section id="stats" aria-label="At a glance" className="relative">
      <Container>
        <Reveal
          className="grid overflow-hidden rounded-3xl border border-line bg-surface/70 backdrop-blur"
          style={{ gridTemplateColumns: `repeat(${ABOUT_STATS.length}, minmax(0, 1fr))` }}
        >
          {ABOUT_STATS.map((stat, index) => {
            const Icon = ICONS[stat.icon];
            const body = (
              <>
                <div className="hidden items-center justify-between sm:flex">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/12 text-accent-strong">
                    <Icon size={18} aria-hidden />
                  </span>
                  <span className="font-mono text-xs text-dim">0{index + 1}</span>
                </div>
                <p className="text-3xl font-semibold tracking-tighter text-ink sm:mt-6 sm:text-5xl">
                  <NumberTicker value={stat.value} />
                </p>
                <p className="mt-1.5 text-xs font-semibold text-ink sm:mt-2 sm:text-sm">{stat.label}</p>
                <p className="mt-1 hidden text-sm leading-relaxed text-dim sm:block">{stat.detail}</p>
              </>
            );
            const cell = "block border-line p-4 sm:p-8 [&:not(:last-child)]:border-r";
            return stat.href ? (
              <a key={stat.label} href={stat.href} className={`${cell} transition-colors hover:bg-surface-2/50`}>
                {body}
              </a>
            ) : (
              <div key={stat.label} className={cell}>
                {body}
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}
