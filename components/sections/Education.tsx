import { EDUCATION } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";

function InstitutionLogo({ logo, initials }: { logo: string; initials: string }) {
  return (
    <div className="relative h-16 w-16 shrink-0 transition-transform duration-300 group-hover:scale-110">
      <SmartImage
        src={logo}
        alt={initials}
        sizes="64px"
        className="object-contain"
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono text-xs font-bold uppercase tracking-wide text-slate-500">
              {initials}
            </span>
          </div>
        }
      />
    </div>
  );
}

export function Education() {
  return (
    <section id="education" className="relative px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <SectionHeading eyebrow="Academic Path" title="Education" />

        <div className="flex flex-col gap-6">
          {EDUCATION.map((e, i) => (
            <Reveal key={e.institution} delay={i * 100}>
              <div className="group rounded-2xl border border-white/8 bg-[#111111] p-6 transition-all duration-300 hover:border-[#DF2531]/25">
                <div className="flex flex-wrap items-start gap-5">
                  <InstitutionLogo logo={e.logo} initials={e.logoInitials} />

                  <div className="flex flex-1 flex-wrap items-start justify-between gap-3">
                    <div className="flex-1">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#DF2531]">
                        {e.period}
                      </span>
                      <h3 className="mt-1.5 text-base font-bold text-white transition-all duration-300 group-hover:text-lg group-hover:text-[#DF2531]">
                        {e.institution}
                      </h3>
                      <p className="mt-0.5 text-sm font-medium text-slate-400">
                        {e.qualification}
                      </p>
                    </div>

                    {e.grade && (
                      <span className="shrink-0 rounded-full border border-[#DF2531]/20 bg-[#DF2531]/5 px-3 py-1 font-mono text-xs text-[#DF2531]">
                        {e.grade}
                      </span>
                    )}
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-500">
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
