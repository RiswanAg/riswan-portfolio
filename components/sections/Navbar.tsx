"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { NAV_LINKS } from "@/lib/data";

// Sections tracked by the homepage scrollspy, in document order.
const SCROLL_SECTION_IDS = ["hero", "about-home", "portfolio-showcase", "experience", "contact"];
const NAV_OFFSET = 96; // px — accounts for the fixed navbar height

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy: highlight whichever tracked section has most recently
  // crossed the navbar line. Only meaningful on the homepage, where all
  // sections live on one page.
  useEffect(() => {
    if (!isHome) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        let current = SCROLL_SECTION_IDS[0];
        for (const id of SCROLL_SECTION_IDS) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= NAV_OFFSET) {
            current = id;
          }
        }
        setActiveId(current);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isHome]);

  const isActive = (id: string, href?: string) => {
    if (href) return pathname === href || pathname.startsWith(`${href}/`);
    if (!isHome) return id === "portfolio-showcase" && pathname.startsWith("/projects");
    return activeId === id;
  };

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
          className="bg-gradient-to-r from-[#2EE6C6] to-[#FFFFFF] bg-clip-text text-xl font-black tracking-tight text-transparent"
        >
          RH
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => {
            const active = isActive(l.id, l.href);
            const labelClass = `relative px-3 py-2 text-sm tracking-wide transition-colors ${
              active ? "text-white" : "text-[#93A2B8] hover:text-white"
            }`;
            const indicator = active && (
              <motion.span
                layoutId="nav-active-indicator"
                className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-[#2EE6C6] to-[#7C5CFF]"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            );

            return l.href ? (
              <Link key={l.id} href={l.href} className={labelClass}>
                {l.label}
                {indicator}
              </Link>
            ) : (
              <button key={l.id} onClick={() => handleSectionLink(l.id)} className={labelClass}>
                {l.label}
                {indicator}
              </button>
            );
          })}
          <button
            onClick={() => handleSectionLink("contact")}
            className="ml-3 rounded-lg bg-gradient-to-r from-[#2EE6C6] to-[#27C7E5] px-4 py-2 text-sm font-bold text-[#03140F] transition-all hover:shadow-lg hover:shadow-[#2EE6C6]/30 hover:brightness-110"
          >
            Open to Internships
          </button>
        </div>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
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
        id="mobile-menu"
        className={`overflow-hidden transition-all duration-300 md:hidden ${menuOpen ? "max-h-72" : "invisible max-h-0"}`}
        inert={!menuOpen}
      >
        <div className="flex flex-col gap-1 border-t border-white/10 bg-black/95 px-6 pb-6 pt-4">
          {NAV_LINKS.map((l) => {
            const active = isActive(l.id, l.href);
            const rowClass = `flex min-h-[44px] items-center gap-3 rounded-lg py-2.5 pl-3 text-left text-sm transition-colors ${
              active ? "border-l-2 border-[#2EE6C6] text-white" : "border-l-2 border-transparent text-[#93A2B8] hover:text-white"
            }`;

            return l.href ? (
              <Link key={l.id} href={l.href} onClick={() => setMenuOpen(false)} className={rowClass}>
                {l.label}
              </Link>
            ) : (
              <button key={l.id} onClick={() => handleSectionLink(l.id)} className={rowClass}>
                {l.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
