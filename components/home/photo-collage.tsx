"use client";

import { useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

export type CollagePhoto = { src: string; caption: string };

/** Final resting spots: left/top/width in % of the stage, rotation in degrees. */
type Slot = { x: number; y: number; w: number; r: number };

const DESKTOP_SLOTS: Slot[] = [
  { x: 3, y: 16, w: 16, r: -8 },
  { x: 19, y: 6, w: 14, r: 5 },
  { x: 34, y: 12, w: 17, r: -3 },
  { x: 53, y: 5, w: 15, r: 7 },
  { x: 69, y: 13, w: 17, r: -6 },
  { x: 84, y: 22, w: 13, r: 8 },
  { x: 6, y: 50, w: 17, r: 6 },
  { x: 23, y: 44, w: 15, r: -5 },
  { x: 39, y: 47, w: 18, r: 4 },
  { x: 58, y: 42, w: 16, r: -7 },
  { x: 74, y: 50, w: 17, r: 5 },
  { x: 47, y: 25, w: 13, r: -2 },
];

const PHONE_SLOTS: Slot[] = [
  { x: 4, y: 12, w: 40, r: -7 },
  { x: 50, y: 9, w: 42, r: 6 },
  { x: 24, y: 28, w: 44, r: -3 },
  { x: 2, y: 47, w: 42, r: 5 },
  { x: 52, y: 44, w: 40, r: -6 },
  { x: 27, y: 62, w: 44, r: 4 },
  { x: 3, y: 76, w: 36, r: -5 },
  { x: 58, y: 74, w: 36, r: 7 },
];

const DESKTOP = "(min-width: 768px)";

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onChange);
      return () => list.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/**
 * Event and team photos fly in from the edges as you scroll and settle into
 * a scattered polaroid spread (the section pins while that happens).
 */
export function PhotoCollage({ photos }: { photos: CollagePhoto[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const desktop = useMediaQuery(DESKTOP);
  const slots = desktop ? DESKTOP_SLOTS : PHONE_SLOTS;
  const shown = photos.slice(0, slots.length);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  if (shown.length === 0) return null;

  return (
    <section ref={ref} aria-labelledby="moments-title" className={reduce ? "relative" : "relative h-[230vh]"}>
      <div className={reduce ? "relative h-[110svh] overflow-hidden" : "sticky top-0 h-svh overflow-hidden"}>
        <div aria-hidden className="contours absolute inset-0" />
        <h2
          id="moments-title"
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[17vw] font-black uppercase leading-none tracking-tight text-ink/[0.07] md:text-[11vw]"
        >
          Moments
        </h2>
        <div className="absolute inset-x-0 bottom-0 top-16">
          {shown.map((photo, i) => (
            <Polaroid
              key={photo.src}
              photo={photo}
              slot={slots[i]}
              index={i}
              total={shown.length}
              progress={scrollYProgress}
              still={Boolean(reduce)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Polaroid({
  photo,
  slot,
  index,
  total,
  progress,
  still,
}: {
  photo: CollagePhoto;
  slot: Slot;
  index: number;
  total: number;
  progress: MotionValue<number>;
  still: boolean;
}) {
  // Stagger: each photo gets its own slice of the scroll, ending by ~75%.
  const start = 0.04 + (index / total) * 0.42;
  const end = Math.min(start + 0.3, 0.78);
  const from = index % 3; // 0: left, 1: right, 2: below
  const fromX = from === 0 ? "-70vw" : from === 1 ? "70vw" : `${(index % 2 ? 1 : -1) * 12}vw`;
  const fromY = from === 2 ? "90vh" : `${(index % 2 ? -1 : 1) * 30}vh`;

  const x = useTransform(progress, [start, end], [fromX, "0vw"]);
  const y = useTransform(progress, [start, end], [fromY, "0vh"]);
  const rotate = useTransform(progress, [start, end], [slot.r * 5, slot.r]);
  const scale = useTransform(progress, [start, end], [1.25, 1]);
  const opacity = useTransform(progress, [start, start + 0.06], [0, 1]);

  return (
    <motion.figure
      className="absolute rounded-md bg-white p-1.5 pb-6 shadow-[0_18px_40px_-14px_rgb(1_26_41/0.55)] md:p-2 md:pb-8"
      style={{
        left: `${slot.x}%`,
        top: `${slot.y}%`,
        width: `${slot.w}%`,
        zIndex: index,
        ...(still ? { rotate: slot.r } : { x, y, rotate, scale, opacity }),
      }}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-surface-2">
        <Image src={photo.src} alt={photo.caption} fill sizes="(min-width: 768px) 18vw, 42vw" className="object-cover" />
      </div>
      <figcaption className="absolute inset-x-2 bottom-1 truncate text-center text-[10px] font-medium text-[#334155] md:bottom-2 md:text-xs">
        {photo.caption}
      </figcaption>
    </motion.figure>
  );
}
