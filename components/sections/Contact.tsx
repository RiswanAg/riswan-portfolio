import Image from "next/image";
import { CONTACTS, CONTACT_INTRO, PROFILE } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contact() {
  return (
    <section id="contact" className="relative px-6 py-28">
      {/* Closing glow */}
      <div
        aria-hidden
        className="aurora left-1/2 top-1/2 h-[34vw] w-[34vw] -translate-x-1/2 -translate-y-1/2 bg-[#1C4D8D]/12"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <SectionHeading eyebrow="Let's connect" title="Get in Touch" />

        <Reveal className="mb-12">
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-slate-400">
            {CONTACT_INTRO}
          </p>
        </Reveal>

        <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CONTACTS.map((c, i) => (
            <Reveal key={c.label} delay={i * 100}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="group flex h-full flex-col items-center gap-3 rounded-2xl border border-white/8 bg-[#0F2854] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#4988C4]/30 hover:bg-[#4988C4]/[0.04]"
              >
                {c.logo ? (
                  <div className="relative h-8 w-8 transition-transform duration-300 group-hover:scale-110">
                    <Image
                      src={c.logo}
                      alt={c.label}
                      fill
                      sizes="32px"
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <span className="text-3xl transition-transform duration-300 group-hover:scale-110 inline-block">
                    {c.icon}
                  </span>
                )}
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">
                  {c.label}
                </span>
                <span className="break-all text-sm font-medium text-slate-300 transition-colors group-hover:text-[#BDE8F5]">
                  {c.display}
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <a
            href={PROFILE.cv}
            download
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#4988C4] to-[#BDE8F5] px-8 py-4 font-bold text-[#0F2854] transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-[#4988C4]/25 active:scale-[0.97]"
          >
            ↓ Download CV
          </a>
        </Reveal>
      </div>
    </section>
  );
}
