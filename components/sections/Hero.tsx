"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import { FolderOpen, Download, Mail, ChevronDown } from "lucide-react";

export function Hero() {
  const [imgSrc, setImgSrc] = useState(PROFILE.image);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on the photo cluster — transform only, rAF-throttled.
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (parallaxRef.current) {
          parallaxRef.current.style.transform = `translate3d(0, ${y * 0.06}px, 0)`;
        }
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24"
    >
      {/* Optional ambient hero video — silently absent until /hero-bg.mp4 exists */}
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.18] motion-reduce:hidden"
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col-reverse items-center justify-between gap-12 py-16 md:flex-row">
        {/* Text column */}
        <div className="flex-1 text-center md:text-left">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#DF2531]/30 bg-[#DF2531]/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#DF2531]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#DF2531] pulse-soft" />
            {PROFILE.availability}
          </div>

          <h1 className="mb-6 text-6xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-r from-[#FFFFFF] via-[#DF2531] to-[#7A1018] bg-clip-text text-transparent">
              Riswan
            </span>
            <br />
            <span className="text-white">Hamua</span>
          </h1>

          <p className="mb-5 font-mono text-sm tracking-wide text-[#DF2531]/90 sm:text-base">
            {PROFILE.roles.join("  ·  ")}
          </p>

          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-[#A3A3A3] md:mx-0">
            {PROFILE.tagline}
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
            <button
              onClick={() => go("projects")}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#DF2531] to-[#7A1018] px-7 py-3.5 font-bold text-white transition-all hover:scale-[1.03] hover:shadow-xl hover:shadow-[#DF2531]/30 active:scale-[0.97]"
            >
              <FolderOpen size={16} strokeWidth={2} />
              View Projects
            </button>
            <a
              href={PROFILE.cv}
              download
              className="inline-flex items-center gap-2 rounded-xl border border-[#DF2531]/40 px-7 py-3.5 font-bold text-white transition-all hover:scale-[1.03] hover:border-[#DF2531]/60 hover:bg-[#DF2531]/10 active:scale-[0.97]"
            >
              <Download size={16} strokeWidth={2} />
              Download CV
            </a>
            <button
              onClick={() => go("contact")}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-7 py-3.5 font-bold text-[#A3A3A3] transition-all hover:scale-[1.03] hover:border-white/25 hover:bg-white/5 active:scale-[0.97]"
            >
              <Mail size={16} strokeWidth={2} />
              Contact Me
            </button>
          </div>
        </div>

        {/* Photo column */}
        <div ref={parallaxRef} className="flex flex-shrink-0 justify-center">
          <div className="group relative">
            {/* Rotating gradient glow ring */}
            <div
              className="absolute -inset-1 rounded-[2rem] opacity-70 blur-[6px] transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "conic-gradient(from 0deg, #DF2531, #7A1018, #000000, #DF2531)",
              }}
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#111111] p-[3px]">
              <div className="relative h-72 w-60 overflow-hidden rounded-[1.8rem] bg-[#090909] sm:h-80 sm:w-64 lg:h-96 lg:w-80">
                <Image
                  src={imgSrc}
                  alt="Riswan Hamua"
                  fill
                  sizes="(max-width: 768px) 16rem, 20rem"
                  loading="eager"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={() => setImgSrc(PROFILE.imageFallback)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                {/* HUD corner brackets — game framing */}
                <span className="absolute left-3 top-3 h-4 w-4 border-l-2 border-t-2 border-[#DF2531]/70" />
                <span className="absolute right-3 top-3 h-4 w-4 border-r-2 border-t-2 border-white/70" />
                <span className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-white/70" />
                <span className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-[#DF2531]/70" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-[#A3A3A3]/60">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <ChevronDown size={18} className="scroll-bob text-[#DF2531]/80" strokeWidth={2} />
      </div>
    </section>
  );
}
