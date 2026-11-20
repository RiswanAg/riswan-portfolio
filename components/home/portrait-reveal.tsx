"use client";

import { useRef, type PointerEvent } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Cut-out portrait with a cursor-follow spotlight: a second photo shows
 * through a soft circular mask wherever the pointer is. Both images are
 * pre-aligned on the same 800×1000 canvas (heads at the same point), so the
 * reveal reads as an outfit swap rather than two different pictures.
 * Touch: tap or drag sideways on the photo (vertical swipes still scroll).
 */
export function PortraitReveal({
  base,
  reveal,
  alt,
  className,
}: {
  base: string;
  reveal: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const spring = reduce ? { stiffness: 2000, damping: 120 } : { stiffness: 260, damping: 28 };
  const x = useSpring(useMotionValue(50), spring);
  const y = useSpring(useMotionValue(32), spring);
  const radius = useSpring(0, reduce ? spring : { stiffness: 180, damping: 20 });

  const mask = useMotionTemplate`radial-gradient(circle ${radius}px at ${x}% ${y}%, #000 0, #000 62%, transparent 100%)`;
  const ringLeft = useMotionTemplate`${x}%`;
  const ringTop = useMotionTemplate`${y}%`;
  const ringSize = useMotionTemplate`calc(${radius}px * 2)`;

  function track(event: PointerEvent<HTMLDivElement>) {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    x.set(((event.clientX - box.left) / box.width) * 100);
    y.set(((event.clientY - box.top) / box.height) * 100);
    radius.set(Math.max(70, Math.min(130, box.width * 0.24)));
  }

  return (
    <div
      ref={ref}
      onPointerMove={track}
      onPointerDown={track}
      onPointerLeave={() => radius.set(0)}
      className={cn("group/portrait relative aspect-[4/5] w-full touch-pan-y select-none", className)}
    >
      {/* soft floor glow behind the cut-out */}
      <div aria-hidden className="absolute inset-x-[12%] bottom-[8%] top-[30%] rounded-full bg-accent/25 blur-3xl" />
      <Image
        src={base}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 26rem, 80vw"
        className="object-contain object-bottom"
        draggable={false}
      />
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{ WebkitMaskImage: mask, maskImage: mask }}
      >
        <Image src={reveal} alt="" fill sizes="(min-width: 1024px) 26rem, 80vw" className="object-contain object-bottom" draggable={false} />
      </motion.div>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber/60 shadow-[0_0_40px_6px_rgb(255_183_3/0.25),inset_0_0_30px_rgb(255_183_3/0.15)]"
        style={{ left: ringLeft, top: ringTop, width: ringSize, height: ringSize }}
      />
      <p className="absolute inset-x-0 -bottom-2 text-center text-xs font-medium text-dim">
        <span className="[@media(hover:none)]:hidden">Hover over the photo</span>
        <span className="hidden [@media(hover:none)]:inline">Tap the photo</span>
      </p>
    </div>
  );
}
