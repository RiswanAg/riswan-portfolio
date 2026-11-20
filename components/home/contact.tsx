import Image from "next/image";
import { ArrowUpRight, Mail } from "lucide-react";
import { CONTACT_INTRO, CONTACTS } from "@/lib/data";
import { Spotlight } from "@/components/aceternity/spotlight";
import { Reveal } from "@/components/motion/reveal";
import { Container, Eyebrow } from "@/components/site/section-header";
import { CopyEmail } from "./copy-email";

export function Contact() {
  const email = CONTACTS.find((contact) => contact.label === "Email");
  const socials = CONTACTS.filter((contact) => contact.label !== "Email");
  return (
    <section id="contact" className="py-24 sm:py-32">
      <Container>
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-canvas sm:rounded-[2.5rem] sm:px-12 sm:py-20 dark:border dark:border-line dark:bg-surface dark:text-ink">
          <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-40 [--grid-line:rgb(142_202_230/0.12)]" />
          <Spotlight className="-top-32 left-10 text-cyan" />
          <div aria-hidden className="absolute -bottom-24 -right-16 -z-10 h-72 w-72 rounded-full bg-amber/25 blur-3xl" />

          <Eyebrow index="06" className="text-cyan dark:text-accent-strong">
            Contact
          </Eyebrow>
          <h2 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            Let’s build something <span className="text-amber">useful.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-canvas/75 dark:text-dim">{CONTACT_INTRO}</p>

          {email && (
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={email.href}
                className="group inline-flex min-h-13 max-w-full items-center gap-2.5 whitespace-nowrap rounded-full bg-amber px-5 text-sm font-semibold text-on-accent transition-transform [overflow-wrap:normal] active:scale-[0.97] sm:gap-3 sm:px-6 sm:text-base"
              >
                <Mail size={18} aria-hidden />
                {email.display}
                <ArrowUpRight size={18} className="transition-transform group-hover:rotate-45" aria-hidden />
              </a>
              <CopyEmail email={email.display} />
            </div>
          )}

          {socials.length > 0 && (
            <ul className="mt-12 grid gap-3 border-t border-canvas/15 pt-8 sm:grid-cols-2 lg:grid-cols-4 dark:border-line">
              {socials.map((contact) => (
                <li key={contact.label}>
                  <a
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-2xl border border-canvas/15 p-3 transition-colors hover:bg-canvas/10 dark:border-line dark:hover:bg-surface-2"
                  >
                    {contact.logo && (
                      <span className="relative grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-white p-2">
                        <Image src={contact.logo} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
                      </span>
                    )}
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold">{contact.label}</span>
                      <span className="block truncate text-xs text-canvas/65 dark:text-dim">{contact.display}</span>
                    </span>
                    <ArrowUpRight size={16} className="shrink-0 opacity-60 transition-transform group-hover:rotate-45" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
