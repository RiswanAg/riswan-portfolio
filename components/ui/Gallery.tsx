"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import type { Project, MediaItem } from "@/lib/data";

function PlayIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {dir === "left" ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
    </svg>
  );
}

export function Gallery({ project, media }: { project: Project; media: MediaItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const active = media[activeIndex];
  const hasPrev = activeIndex > 0;
  const hasNext = activeIndex < media.length - 1;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && hasNext) setActiveIndex((i) => i + 1);
      if (e.key === "ArrowLeft" && hasPrev) setActiveIndex((i) => i - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [hasPrev, hasNext]);

  useEffect(() => {
    if (active.type === "video" && videoRef.current) videoRef.current.load();
  }, [activeIndex, active.type]);

  return (
    <div className="flex flex-col gap-3">
      {/* Main viewer */}
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/8 bg-black">
        {active.type === "youtube" ? (
          <iframe
            key={active.src}
            src={`https://www.youtube.com/embed/${active.src}?autoplay=1`}
            title={active.caption ?? project.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        ) : active.type === "video" ? (
          <video
            ref={videoRef}
            src={active.src}
            controls
            autoPlay
            playsInline
            className="h-full w-full object-contain"
          />
        ) : (
          <Image
            src={active.src}
            alt={active.caption ?? project.title}
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 65vw"
          />
        )}

        {hasPrev && (
          <button
            onClick={() => setActiveIndex((i) => i - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/60 p-2 text-white backdrop-blur-sm transition-all hover:border-white/40"
          >
            <ChevronIcon dir="left" />
          </button>
        )}
        {hasNext && (
          <button
            onClick={() => setActiveIndex((i) => i + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/60 p-2 text-white backdrop-blur-sm transition-all hover:border-white/40"
          >
            <ChevronIcon dir="right" />
          </button>
        )}
      </div>

      {active.caption && (
        <p className="text-center text-xs text-slate-500">{active.caption}</p>
      )}

      {/* Thumbnail strip */}
      {media.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {media.map((m, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                i === activeIndex
                  ? "border-[#DF2531]"
                  : "border-white/10 opacity-40 hover:opacity-70"
              }`}
            >
              {m.type === "youtube" ? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-red-950/60 text-slate-300">
                  <PlayIcon />
                  <span className="text-[8px] font-bold uppercase tracking-widest text-red-400">YT</span>
                </div>
              ) : m.type === "video" ? (
                <div className="flex h-full w-full items-center justify-center bg-black/60 text-slate-300">
                  <PlayIcon />
                </div>
              ) : (
                <Image src={m.src} alt="" fill className="object-cover" sizes="80px" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
