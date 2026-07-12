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
    <footer className="relative z-10 border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="flex flex-col items-center gap-1 md:items-start">
          <span className="text-lg font-black text-white">
            Riswan Hamua<span className="text-[#2EE6C6]">.</span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#93A2B8]/70">
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
              className="group flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.04] transition-[border-color,background-color,transform] duration-200 hover:border-[#2EE6C6]/30 hover:bg-[#2EE6C6]/10 active:scale-[0.95]"
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
          <p className="font-mono text-xs text-[#93A2B8]">
            © 2026 Riswan Hamua · Game Technology
          </p>
          <a
            href="#hero"
            aria-label="Back to top"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/[0.04] text-[#93A2B8] transition-[border-color,background-color,color,transform] duration-200 hover:border-[#2EE6C6]/40 hover:bg-[#2EE6C6]/10 hover:text-white active:scale-[0.95]"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
