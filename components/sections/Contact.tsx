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
        className="aurora left-1/2 top-1/2 h-[34vw] w-[34vw] -translate-x-1/2 -translate-y-1/2 bg-[#7C5CFF]/15"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <SectionHeading eyebrow="Let's connect" title="Get in Touch" />

        <Reveal className="mb-12">
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-[#93A2B8]">
            {CONTACT_INTRO}
          </p>
        </Reveal>

        {/* Primary CTA — email is the action that gets an internship */}
        <Reveal className="mb-12">
          <GlowCard className="mx-auto max-w-2xl rounded-3xl border border-[#2EE6C6]/20 bg-[#0E1626] p-8 sm:p-10">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#2EE6C6]/30 bg-[#2EE6C6]/10">
              <Mail size={24} className="text-[#2EE6C6]" strokeWidth={1.75} />
            </div>
            <h3 className="text-2xl font-black text-white sm:text-3xl">
              Have an internship spot open?
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#93A2B8]">
              I reply fast. One email and you&apos;ll know exactly what I can
              bring to your team.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              {email && (
                <a
                  href={email.href}
                  className="group inline-flex min-h-[48px] items-center gap-2 rounded-full bg-gradient-to-r from-[#2EE6C6] to-[#27C7E5] px-7 py-3 text-sm font-bold text-[#03140F] shadow-lg shadow-[#2EE6C6]/25 transition-[transform,box-shadow] duration-200 hover:scale-[1.04] hover:shadow-xl hover:shadow-[#2EE6C6]/40 active:scale-[0.97]"
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
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3 text-sm font-semibold text-white transition-[transform,border-color,background-color] duration-200 hover:scale-[1.04] hover:border-[#2EE6C6]/50 hover:bg-white/[0.06] active:scale-[0.97]"
              >
                <Download size={16} strokeWidth={2} />
                Download CV
              </a>
            </div>
            {email && (
              <p className="mt-5 break-all font-mono text-xs text-[#93A2B8]">
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
                className="group inline-flex min-h-[44px] items-center gap-2.5 rounded-full border border-white/10 bg-[#0E1626] py-2.5 pl-3.5 pr-5 transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-[#2EE6C6]/40 hover:bg-[#2EE6C6]/[0.05] active:translate-y-0 active:scale-[0.98]"
              >
                <Image
                  src={c.logo!}
                  alt=""
                  width={18}
                  height={18}
                  className="h-[18px] w-[18px] object-contain opacity-70 transition-opacity group-hover:opacity-100"
                />
                <span className="text-left">
                  <span className="block font-mono text-[9px] uppercase leading-none tracking-[0.18em] text-[#93A2B8]">
                    {c.label}
                  </span>
                  <span className="block text-sm font-medium leading-tight text-slate-300 transition-colors group-hover:text-white">
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
