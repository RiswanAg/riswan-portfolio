import { ArrowUp } from "lucide-react";
import { CONTACTS, NAV_LINKS, PROFILE } from "@/lib/data";
import { Container } from "./section-header";
import { Logo } from "./site-nav";

export function SiteFooter() {
  const socials = CONTACTS.filter((contact) => contact.label !== "Email");
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-10 py-12 sm:py-14">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-3 text-sm leading-relaxed text-dim">{PROFILE.tagline}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm sm:grid-cols-3">
            <nav aria-label="Footer" className="contents">
              {NAV_LINKS.map((link) => (
                <a key={link.id} href={link.href ?? `/#${link.id}`} className="text-dim transition-colors hover:text-ink">
                  {link.label}
                </a>
              ))}
            </nav>
            {socials.map((contact) => (
              <a
                key={contact.label}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-dim transition-colors hover:text-ink"
              >
                {contact.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-line pt-6 text-sm text-dim">
          <p>
            © {new Date().getFullYear()} {PROFILE.name}
          </p>
          <a href="#main" className="inline-flex items-center gap-2 transition-colors hover:text-ink">
            Back to top <ArrowUp size={15} aria-hidden />
          </a>
        </div>
      </Container>
    </footer>
  );
}
