"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { NAV_LINKS } from "@/lib/data";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

// Sections tracked by the homepage scrollspy, in document order.
const SCROLL_SECTION_IDS = ["hero", "about-home", "portfolio-showcase", "experience", "education", "contact"];
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
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-b border-line bg-canvas/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          aria-label="Riswan Hamua home"
          className="text-xl font-black tracking-tight text-ink font-[family-name:var(--font-heading)]"
        >
          RH<span className="text-accent-strong">.</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => {
            const active = isActive(l.id, l.href);
            const labelClass = `relative px-3 py-2 text-sm tracking-wide transition-colors ${
              active ? "text-ink" : "text-dim hover:text-ink"
            }`;
            const indicator = active && (
              <motion.span
                layoutId="nav-active-indicator"
                className="absolute inset-x-3 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-accent to-violet"
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
            className="ml-3 rounded-lg bg-gradient-to-r from-accent to-cyan px-4 py-2 text-sm font-bold text-on-accent transition-[box-shadow,filter,transform] duration-200 hover:shadow-lg hover:shadow-accent/30 hover:brightness-110 active:scale-[0.97]"
          >
            Open to Internships
          </button>
          <ThemeToggle className="ml-4" />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="group flex h-8 w-8 flex-col justify-center gap-[5px]"
          >
            <span
              className={`block h-0.5 bg-ink transition-[transform,opacity] duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 bg-ink transition-[transform,opacity] duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 bg-ink transition-[transform,opacity] duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full origin-top transition-[opacity,transform,visibility] duration-200 ease-out md:hidden ${
          menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
        inert={!menuOpen}
      >
        <div className="flex flex-col gap-1 border-t border-line bg-canvas/95 px-6 pb-6 pt-4 backdrop-blur-md">
          {NAV_LINKS.map((l) => {
            const active = isActive(l.id, l.href);
            const rowClass = `flex min-h-[44px] items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
              active ? "bg-accent/10 text-ink" : "text-dim hover:text-ink"
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
