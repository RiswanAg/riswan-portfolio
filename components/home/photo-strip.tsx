"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

/**
 * Compact photo row with a native <dialog> viewer: Escape closes, arrow keys
 * page through, focus returns to the thumbnail that opened it.
 */
export function PhotoStrip({ photos, title }: { photos: string[]; title: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const viewer = dialog.current;
    if (viewer && !viewer.open) viewer.showModal();
  }, [active]);

  function close() {
    dialog.current?.close();
    setActive(null);
    opener.current?.focus({ preventScroll: true });
  }

  function step(delta: number) {
    setActive((index) => (index === null ? index : (index + delta + photos.length) % photos.length));
  }

  if (photos.length === 0) return null;

  return (
    <>
      <ul className="mt-5 grid grid-cols-3 gap-2 sm:gap-3">
        {photos.slice(0, 3).map((src, index) => (
          <li key={`${src}-${index}`}>
            <button
              type="button"
              onClick={(event) => {
                opener.current = event.currentTarget;
                setActive(index);
              }}
              aria-label={`Open photo ${index + 1} of ${photos.length}: ${title}`}
              className="group relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-xl border border-line bg-surface-2"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 1024px) 220px, 30vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
              />
              {index === 0 && (
                <span className="absolute bottom-1.5 right-1.5 grid h-7 w-7 place-items-center rounded-full bg-black/60 text-white">
                  <Expand size={13} aria-hidden />
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={`${title}, photos`}
        onCancel={(event) => {
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        className="fixed inset-0 m-auto h-[90dvh] max-h-none w-[95vw] max-w-5xl overflow-hidden rounded-3xl border border-line bg-surface p-0 text-ink backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        {active !== null && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-2">
              <p className="min-w-0 truncate text-sm font-semibold">{title}</p>
              <button
                type="button"
                autoFocus
                onClick={close}
                aria-label="Close photo viewer"
                className="grid h-11 w-11 place-items-center rounded-full hover:bg-surface-2"
              >
                <X size={20} />
              </button>
            </div>
            <div className="relative min-h-0 flex-1 bg-surface-2">
              <Image
                src={photos[active]}
                alt={`${title}, photo ${active + 1} of ${photos.length}`}
                fill
                sizes="95vw"
                className="object-contain"
              />
            </div>
            {photos.length > 1 && (
              <div className="flex items-center justify-center gap-5 p-2">
                <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="grid h-11 w-11 place-items-center rounded-full hover:bg-surface-2">
                  <ChevronLeft size={20} />
                </button>
                <span aria-live="polite" className="min-w-12 text-center font-mono text-sm text-dim">
                  {active + 1} / {photos.length}
                </span>
                <button type="button" onClick={() => step(1)} aria-label="Next photo" className="grid h-11 w-11 place-items-center rounded-full hover:bg-surface-2">
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
