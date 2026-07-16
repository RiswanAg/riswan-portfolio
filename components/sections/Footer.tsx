import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { CONTACTS } from "@/lib/data";

const FOOTER_SOCIALS = [
  "GitHub",
  "LinkedIn",
  "Instagram",
  "YouTube",
  "TikTok",
] as const;

export function Footer() {
  const socials = CONTACTS.filter(
    (c) => FOOTER_SOCIALS.includes(c.label as (typeof FOOTER_SOCIALS)[number]) && c.logo
  );

  return (
    <footer className="relative z-10 border-t border-line px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="text-lg font-black text-ink">
            Riswan Hamua<span className="text-accent-strong">.</span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dim/70">
            Build · Break · Fix · Ship
          </span>
        </div>

        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="group flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-veil transition-[border-color,background-color,transform] duration-200 hover:border-accent/30 hover:bg-accent/10 active:scale-[0.95]"
            >
              <Image
                src={s.logo!}
                alt={s.label}
                width={18}
                height={18}
                className="h-[18px] w-[18px] object-contain opacity-60 transition-opacity group-hover:opacity-100"
              />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <p className="font-mono text-xs text-dim">
            © 2026 Riswan Hamua · Game Technology
          </p>
          <a
            href="#hero"
            aria-label="Back to top"
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-veil text-dim transition-[border-color,background-color,color,transform] duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-ink active:scale-[0.95]"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
