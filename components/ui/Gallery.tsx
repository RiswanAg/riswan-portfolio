"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { Project, MediaItem } from "@/lib/data";

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
      <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-line bg-surface-2">
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
            type="button"
            aria-label="Previous media"
            onClick={() => setActiveIndex((i) => i - 1)}
            className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/75"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        {hasNext && (
          <button
            type="button"
            aria-label="Next media"
            onClick={() => setActiveIndex((i) => i + 1)}
            className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-black/75"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {active.caption && (
        <p aria-live="polite" className="text-center text-sm text-dim">{active.caption}</p>
      )}

      {/* Thumbnail strip */}
      {media.length > 1 && (
        <div className="no-scrollbar flex gap-2 overflow-x-auto p-1">
          {media.map((m, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show ${m.caption ?? `media ${i + 1}`}`}
              aria-pressed={i === activeIndex}
              onClick={() => setActiveIndex(i)}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl transition-all ${
                i === activeIndex
                  ? "ring-2 ring-accent ring-offset-2 ring-offset-canvas"
                  : "opacity-50 hover:opacity-90"
              }`}
            >
              {m.type === "youtube" ? (
                <div className="flex h-full w-full items-center justify-center bg-ink text-canvas">
                  <Play size={18} aria-hidden />
                </div>
              ) : m.type === "video" ? (
                <div className="flex h-full w-full items-center justify-center bg-ink text-canvas">
                  <Play size={18} aria-hidden />
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
