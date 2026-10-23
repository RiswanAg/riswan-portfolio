"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useReducedMotion } from "framer-motion";

export function JourneyAlbum({ photos, title }: { photos: string[]; title: string }) {
  const track = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const currentIndex = useRef(0);
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const reduceMotion = useReducedMotion();

  function select(index: number) {
    const next = Math.max(0, Math.min(photos.length - 1, index));
    setActive(next);
    currentIndex.current = next;
    track.current?.scrollTo({ left: next * track.current.clientWidth, behavior: reduceMotion ? "instant" : "smooth" });
  }

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    // Keep the selected photo aligned after rotation or resizing.
    const observer = new ResizeObserver(() => {
      element.scrollTo({ left: currentIndex.current * element.clientWidth, behavior: "instant" });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const viewer = dialog.current;
    viewer?.showModal();
    return () => {
      viewer?.close();
      document.body.style.overflow = previousOverflow;
      opener.current?.focus({ preventScroll: true });
    };
  }, [expanded]);

  return (
    <div role="region" aria-label={`${title} photo album`} aria-roledescription="carousel">
      <div className="relative bg-surface-2">
        <div
          ref={track}
          className="journey-album-track flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
          onScroll={(event) => {
            const element = event.currentTarget;
            const index = Math.max(0, Math.min(photos.length - 1, Math.round(element.scrollLeft / element.clientWidth)));
            currentIndex.current = index;
            setActive(index);
          }}
        >
          {photos.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              tabIndex={index === active ? 0 : -1}
              aria-label={`Open ${title}, photo ${index + 1} of ${photos.length}`}
              className="relative block aspect-[4/3] w-full shrink-0 snap-center cursor-zoom-in sm:aspect-[16/9]"
              onClick={(event) => { opener.current = event.currentTarget; setExpanded(true); }}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                  event.preventDefault();
                  select(active + (event.key === "ArrowRight" ? 1 : -1));
                }
              }}
            >
              <Image src={src} alt={`${title}, photo ${index + 1}`} fill sizes="(min-width: 1024px) 900px, 100vw" className="select-none object-contain" draggable={false} />
            </button>
          ))}
        </div>
        <span className="pointer-events-none absolute right-4 top-4 flex items-center gap-2 rounded-full bg-black/65 px-3 py-2 text-xs text-white">
          <Expand size={14} aria-hidden /> View full size
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
        <div className="hidden min-w-0 gap-2 overflow-x-auto p-1 sm:flex">
          {photos.map((src, index) => (
            <button key={`${src}-${index}`} type="button" aria-label={`Show photo ${index + 1} of ${photos.length}`} aria-pressed={active === index}
              onClick={() => select(index)}
              className={`relative h-12 w-16 shrink-0 overflow-hidden rounded-md ${active === index ? "ring-2 ring-accent ring-offset-2 ring-offset-surface" : "opacity-55 hover:opacity-100"}`}>
              <Image src={src} alt="" fill sizes="64px" className="object-cover" draggable={false} />
            </button>
          ))}
        </div>
        <span className="text-xs text-dim sm:hidden">Swipe to explore</span>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" aria-label={`Previous photo in ${title}`} disabled={active === 0} onClick={() => select(active - 1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink disabled:opacity-25"><ChevronLeft size={18} /></button>
          <span aria-live="polite" aria-atomic="true" className="min-w-10 text-center font-mono text-xs text-dim">{active + 1} / {photos.length}</span>
          <button type="button" aria-label={`Next photo in ${title}`} disabled={active === photos.length - 1} onClick={() => select(active + 1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink disabled:opacity-25"><ChevronRight size={18} /></button>
        </div>
      </div>

      <dialog ref={dialog} aria-label={`${title}, full-size photos`} onCancel={() => setExpanded(false)} onClose={() => setExpanded(false)}
        onClick={(event) => { if (event.target === event.currentTarget) setExpanded(false); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            select(active + (event.key === "ArrowRight" ? 1 : -1));
          }
        }}
        className="fixed inset-0 m-auto h-[92dvh] max-h-none w-[96vw] max-w-6xl overflow-hidden rounded-xl bg-surface p-0 text-ink backdrop:bg-black/85">
        {expanded && (
          <div className="flex h-full flex-col">
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-line px-4 py-2">
              <p className="min-w-0 truncate text-sm font-semibold">{title}</p>
              <button type="button" autoFocus onClick={() => setExpanded(false)} aria-label="Close photo viewer" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-surface-2"><X size={22} /></button>
            </div>
            <div className="relative min-h-0 flex-1 bg-surface-2">
              <Image src={photos[active]} alt={`${title}, photo ${active + 1}`} fill sizes="100vw" className="object-contain" />
            </div>
            <div className="flex shrink-0 items-center justify-center gap-5 p-2">
              <button type="button" disabled={active === 0} onClick={() => select(active - 1)} aria-label="Previous full-size photo" className="flex h-11 w-11 items-center justify-center disabled:opacity-25"><ChevronLeft /></button>
              <span aria-live="polite" className="font-mono text-sm">{active + 1} / {photos.length}</span>
              <button type="button" disabled={active === photos.length - 1} onClick={() => select(active + 1)} aria-label="Next full-size photo" className="flex h-11 w-11 items-center justify-center disabled:opacity-25"><ChevronRight /></button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
}
