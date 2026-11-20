"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { MoreHorizontal } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Container } from "@/components/site/section-header";
import { selectPortfolioTab, type PortfolioTab } from "./portfolio-events";

export type Folder = { id: PortfolioTab; label: string; count: number; thumbs: string[] };

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Three dark 3D folders. Hover or focus opens the front flap and fans the
 * folder's first thumbnails up out of it; clicking jumps to that tab of the
 * portfolio. The thumbnails peek out at rest so touch users see contents.
 */
export function FolderCards({ folders }: { folders: Folder[] }) {
  return (
    <section aria-label="Collections" className="pb-24 pt-6 sm:pb-32">
      <Container className="grid grid-cols-3 gap-3 sm:gap-8 lg:gap-14">
        {folders.map((folder, index) => (
          <Reveal key={folder.id} delay={index * 0.1}>
            <FolderCard folder={folder} />
          </Reveal>
        ))}
      </Container>
    </section>
  );
}

function FolderCard({ folder }: { folder: Folder }) {
  const reduce = useReducedMotion();
  const thumbs = folder.thumbs.slice(0, 3);

  const flap: Variants = {
    rest: { rotateX: 0 },
    open: { rotateX: reduce ? 0 : -32 },
  };
  const thumb = (i: number): Variants => {
    const spread = i - (thumbs.length - 1) / 2;
    return {
      rest: { y: `${18 + i * 5}%`, x: `${spread * 6}%`, rotate: spread * 4, scale: 0.92 },
      open: reduce
        ? { y: `${4 + i * 5}%`, x: `${spread * 6}%`, rotate: spread * 4, scale: 0.92 }
        : { y: `${-34 + Math.abs(spread) * 6}%`, x: `${spread * 30}%`, rotate: spread * 13, scale: 1 },
    };
  };

  return (
    <motion.button
      type="button"
      onClick={() => selectPortfolioTab(folder.id)}
      aria-label={`Open ${folder.label} (${folder.count})`}
      initial="rest"
      animate="rest"
      whileHover="open"
      whileFocus="open"
      className="group relative block aspect-square w-full rounded-2xl sm:aspect-[5/4] text-left [perspective:900px]"
    >
      {/* back panel with tab */}
      <span aria-hidden className="absolute left-0 top-0 h-[16%] w-[42%] rounded-t-xl bg-surface-2 [clip-path:polygon(0_0,82%_0,100%_100%,0_100%)]" />
      <span aria-hidden className="absolute inset-x-0 bottom-0 top-[12%] rounded-2xl rounded-tl-none border border-white/8 bg-gradient-to-b from-surface-2 to-surface" />

      {/* papers */}
      <span aria-hidden className="absolute inset-x-[9%] bottom-[22%] top-[16%]">
        {thumbs.map((src, i) => (
          <motion.span
            key={src}
            variants={thumb(i)}
            transition={{ duration: 0.55, ease: EASE, delay: i * 0.03 }}
            className="absolute inset-0 overflow-hidden rounded-lg border-[3px] border-white bg-white shadow-[0_10px_30px_-8px_rgb(0_0_0/0.6)]"
            style={{ zIndex: i }}
          >
            <Image src={src} alt="" fill sizes="(min-width: 1024px) 18rem, 30vw" className="object-cover" />
          </motion.span>
        ))}
      </span>

      {/* front flap */}
      <motion.span
        aria-hidden
        variants={flap}
        transition={{ duration: 0.5, ease: EASE }}
        style={{ transformOrigin: "50% 100%", transformStyle: "preserve-3d" }}
        className="absolute inset-x-0 bottom-0 z-10 flex h-[66%] flex-col justify-end rounded-2xl border border-white/12 bg-gradient-to-b from-[#123d55] to-[#06263a] p-3 shadow-[0_-12px_30px_-12px_rgb(0_0_0/0.7)] sm:p-5"
      >
        <span className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <span className="flex items-end justify-between gap-2">
          <span>
            <span className="block text-2xl font-black leading-none text-white sm:text-4xl">{folder.count}</span>
            <span className="mt-1 block text-[11px] font-semibold text-white/70 sm:text-sm">{folder.label}</span>
          </span>
          <span className="hidden h-7 w-9 place-items-center rounded-full border border-white/15 text-white/60 sm:grid">
            <MoreHorizontal size={16} />
          </span>
        </span>
      </motion.span>
    </motion.button>
  );
}
