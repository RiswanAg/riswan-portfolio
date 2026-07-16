import Image from "next/image";
import { CONTACTS, CONTACT_INTRO, PROFILE } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { ArrowRight, Download, Mail } from "lucide-react";

export function Contact() {
  const email = CONTACTS.find((c) => c.label === "Email");
  const socials = CONTACTS.filter((c) => c.label !== "Email" && c.logo);

  return (
    <section id="contact" className="relative px-6 py-28">
      {/* Closing glow */}
      <div
        aria-hidden
        className="aurora left-1/2 top-1/2 h-[34vw] w-[34vw] -translate-x-1/2 -translate-y-1/2 bg-violet/15"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <SectionHeading eyebrow="Let's connect" title="Get in Touch" />

        <Reveal className="mb-12">
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-dim">
            {CONTACT_INTRO}
          </p>
        </Reveal>

        {/* Primary CTA — email is the action that gets an internship */}
        <Reveal className="mb-12">
          <GlowCard className="mx-auto max-w-2xl rounded-3xl border border-accent/20 bg-surface p-8 sm:p-10">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10">
              <Mail size={24} className="text-accent-strong" strokeWidth={1.75} />
            </div>
            <h3 className="text-2xl font-black text-ink sm:text-3xl">
              Have an internship spot open?
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-dim">
              I reply fast. One email and you&apos;ll know exactly what I can
              bring to your team.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              {email && (
                <a
                  href={email.href}
                  className="group inline-flex min-h-[48px] items-center gap-2 rounded-full bg-gradient-to-r from-accent to-cyan px-7 py-3 text-sm font-bold text-on-accent shadow-lg shadow-accent/25 transition-[transform,box-shadow] duration-200 hover:scale-[1.04] hover:shadow-xl hover:shadow-accent/40 active:scale-[0.97]"
                >
                  <Mail size={16} strokeWidth={2.5} />
                  Email Me
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </a>
              )}
              <a
                href={PROFILE.cv}
                download
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-line-2 bg-veil px-7 py-3 text-sm font-semibold text-ink transition-[transform,border-color,background-color] duration-200 hover:scale-[1.04] hover:border-accent/50 hover:bg-veil active:scale-[0.97]"
              >
                <Download size={16} strokeWidth={2} />
                Download CV
              </a>
            </div>
            {email && (
              <p className="mt-5 break-all font-mono text-xs text-dim">
                {email.display}
              </p>
            )}
          </GlowCard>
        </Reveal>

        {/* Social pills — everywhere else you can find me */}
        <Reveal delay={120}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {socials.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-line bg-surface py-2.5 pl-3.5 pr-5 transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent/[0.05] active:translate-y-0 active:scale-[0.98]"
              >
                <Image
                  src={c.logo!}
                  alt=""
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px] object-contain opacity-70 transition-opacity group-hover:opacity-100"
                />
                <span className="text-left">
                  <span className="block font-mono text-[9px] uppercase leading-none tracking-[0.18em] text-dim">
                    {c.label}
                  </span>
                  <span className="block text-sm font-medium leading-tight text-dim transition-colors group-hover:text-ink">
                    {c.display}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
