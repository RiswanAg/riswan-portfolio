import { BUILDING } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import {
  Gamepad2,
  Sprout,
  RadioTower,
  ScanEye,
  Microscope,
  GraduationCap,
  LucideIcon,
} from "lucide-react";

const FEATURE_ICONS: Record<string, LucideIcon> = {
  gamepad: Gamepad2,
  sprout: Sprout,
  "radio-tower": RadioTower,
  "scan-eye": ScanEye,
  microscope: Microscope,
  "graduation-cap": GraduationCap,
};

export function CurrentlyBuilding() {
  return (
    <section id="building" className="relative px-6 py-28">
      {/* Section identity glow */}
      <div
        aria-hidden
        className="aurora left-1/2 top-1/3 h-[36vw] w-[36vw] -translate-x-1/2 bg-[#7A1018]/18"
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Sticky showcase visual ── */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-[#DF2531]/20 bg-black">
                <SmartImage
                  src={BUILDING.image}
                  alt="Smart Farming Simulation showcase"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  fallback={
                    <div className="relative h-full w-full bg-gradient-to-br from-[#7A1018]/60 via-black to-[#111111]/50">
                      <div className="absolute inset-0 bg-grid-tight opacity-60" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sprout size={80} className="text-[#DF2531]/60 drop-shadow-[0_0_30px_rgba(223,37,49,0.4)]" strokeWidth={1} />
                      </div>
                      <p className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em] text-[#DF2531]/70">
                        Key art — generate with Nano Banana
                      </p>
                    </div>
                  }
                />

                {/* Faux in-game HUD overlay */}
                <div className="pointer-events-none absolute inset-0">
                  <span className="absolute left-4 top-4 h-5 w-5 border-l-2 border-t-2 border-[#DF2531]/70" />
                  <span className="absolute right-4 top-4 h-5 w-5 border-r-2 border-t-2 border-white/70" />
                  <span className="absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 border-white/70" />
                  <span className="absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 border-[#DF2531]/70" />
                  <div className="absolute right-4 top-4 flex flex-col items-end gap-1.5">
                    {BUILDING.hud.map((h) => (
                      <span
                        key={h}
                        className="rounded bg-black/60 px-2 py-0.5 font-mono text-[9px] tracking-wider text-white/90 backdrop-blur-sm"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Scrolling detail column ── */}
          <div className="flex flex-col">
            <Reveal>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-[#DF2531]">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#DF2531] opacity-75 pulse-soft" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#DF2531]" />
                  </span>
                  {BUILDING.kicker}
                </span>
                <span className="rounded-full border border-[#DF2531]/25 bg-[#DF2531]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white">
                  {BUILDING.version} · {BUILDING.status}
                </span>
              </div>

              <h2 className="mb-4 text-4xl font-black leading-tight text-white md:text-5xl">
                {BUILDING.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="bg-gradient-to-r from-[#DF2531] to-[#FFFFFF] bg-clip-text text-transparent">
                  {BUILDING.title.split(" ").slice(-1)}
                </span>
              </h2>

              <p className="mb-10 max-w-lg leading-relaxed text-[#A3A3A3]">
                {BUILDING.pitch}
              </p>
            </Reveal>

            <div className="flex flex-col gap-3">
              {BUILDING.features.map((f, i) => {
                const Icon = FEATURE_ICONS[f.icon] ?? Sprout;
                return (
                  <Reveal key={f.label} delay={i * 70}>
                    <div className="group flex items-start gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition-all duration-300 hover:border-[#DF2531]/30 hover:bg-[#DF2531]/[0.04]">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#DF2531]/20 bg-[#DF2531]/10 text-[#DF2531] transition-colors group-hover:border-[#DF2531]/40 group-hover:bg-[#DF2531]/20">
                        <Icon size={16} strokeWidth={2} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white transition-colors group-hover:text-[#DF2531]">
                          {f.label}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-[#A3A3A3]/70">
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
