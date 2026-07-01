"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NAV_LINKS } from "@/lib/data";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSectionLink = (id: string) => {
    if (isHome) {
      scrollTo(id);
    } else {
      router.push(`/#${id}`);
      setMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          aria-label="Riswan Hamua home"
          className="bg-gradient-to-r from-[#DF2531] to-[#FFFFFF] bg-clip-text text-xl font-black tracking-tight text-transparent"
        >
          RH
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) =>
            "href" in l && l.href ? (
              <Link
                key={l.id}
                href={l.href}
                className={`text-sm tracking-wide transition-colors hover:text-white ${
                  pathname.startsWith(l.href)
                    ? "text-white"
                    : "text-[#A3A3A3]"
                }`}
              >
                {l.label}
              </Link>
            ) : (
              <button
                key={l.id}
                onClick={() => handleSectionLink(l.id)}
                className="text-sm tracking-wide text-[#A3A3A3] transition-colors hover:text-white"
              >
                {l.label}
              </button>
            )
          )}
          <button
            onClick={() => handleSectionLink("contact")}
            className="rounded-lg bg-gradient-to-r from-[#DF2531] to-[#7A1018] px-4 py-2 text-sm font-semibold text-white transition-all hover:shadow-lg hover:shadow-[#DF2531]/30 hover:brightness-110"
          >
            Open to Internships
          </button>
        </div>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          className="group flex h-8 w-8 flex-col justify-center gap-[5px] md:hidden"
        >
          <span
            className={`block h-0.5 bg-slate-300 transition-all duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 bg-slate-300 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 bg-slate-300 transition-all duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${menuOpen ? "max-h-72" : "max-h-0"}`}
      >
        <div className="flex flex-col gap-4 border-t border-white/10 bg-black/95 px-6 pb-6 pt-4">
          {NAV_LINKS.map((l) =>
            "href" in l && l.href ? (
              <Link
                key={l.id}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className={`text-left text-sm transition-colors hover:text-white ${
                  pathname.startsWith(l.href) ? "text-white" : "text-[#A3A3A3]"
                }`}
              >
                {l.label}
              </Link>
            ) : (
              <button
                key={l.id}
                onClick={() => handleSectionLink(l.id)}
                className="text-left text-sm text-[#A3A3A3] transition-colors hover:text-white"
              >
                {l.label}
              </button>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
