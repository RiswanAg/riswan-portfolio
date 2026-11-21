import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { CONTACT_INTRO, CONTACTS, PROFILE } from "@/lib/data";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/site/section-header";
import { ContactForm } from "./contact-form";
import { CopyEmail } from "./copy-email";
import { Guestbook } from "./guestbook";

export function Contact() {
  const email = CONTACTS.find((contact) => contact.label === "Email");
  const socials = CONTACTS.filter((contact) => contact.label !== "Email");

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-4 pb-24 pt-20 sm:pb-32">
      <Container>
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-strong">Contact</p>
          <h2 id="contact-title" className="mt-4 text-4xl font-black leading-[1.02] tracking-tight text-ink sm:text-6xl">
            Let’s build something <span className="text-accent">useful.</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-dim sm:text-lg">{CONTACT_INTRO}</p>
        </Reveal>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div className="flex flex-col gap-6">
            {email && (
              <Reveal>
                <ContactForm to={email.display} />
              </Reveal>
            )}

            <Reveal delay={0.06} className="rounded-3xl border border-line bg-surface p-5 shadow-soft sm:p-7">
              <h3 className="text-xl font-bold tracking-tight text-ink">Find me</h3>
              <ul className="mt-4 space-y-2">
                {socials.map((contact) => (
                  <li key={contact.label}>
                    <a
                      href={contact.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-surface-2"
                    >
                      {contact.logo ? (
                        <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-white p-2 shadow-sm">
                          <Image src={contact.logo} alt="" width={24} height={24} className="h-6 w-6 object-contain" />
                        </span>
                      ) : (
                        <span aria-hidden className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-2">
                          {contact.icon}
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-semibold text-ink">{contact.label}</span>
                        <span className="block truncate text-xs text-dim">{contact.display}</span>
                      </span>
                      <ArrowUpRight size={16} className="shrink-0 text-dim transition-transform group-hover:rotate-45" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
              {email && (
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-line pt-4 text-sm">
                  <a href={email.href} className="min-w-0 truncate font-semibold text-accent-strong hover:underline">
                    {email.display}
                  </a>
                  <CopyEmail email={email.display} />
                </div>
              )}
              <div className="relative mt-5 aspect-[4/3] overflow-hidden rounded-2xl bg-surface-2">
                <Image
                  src="/profile.png"
                  alt={`${PROFILE.name}`}
                  fill
                  sizes="(min-width: 1024px) 26rem, 90vw"
                  className="object-cover object-[50%_22%]"
                />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <Guestbook />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
