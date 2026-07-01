import Image from "next/image";
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
    <footer className="relative z-10 border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <span className="bg-gradient-to-r from-[#DF2531] to-[#FFFFFF] bg-clip-text text-lg font-black text-transparent">
          Riswan Hamua
        </span>

        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="group flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.04] transition-all duration-200 hover:border-[#DF2531]/30 hover:bg-[#DF2531]/10"
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

        <p className="font-mono text-xs text-[#A3A3A3]/60">
          © 2026 Riswan Hamua · Game Technology
        </p>
      </div>
    </footer>
  );
}
