"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

/** Seeded PRNG so the SSR and client markup match exactly. */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 1600;
const H = 600;

/**
 * A mountain ridge as an SVG path: layered 1D value noise (big peaks plus
 * smaller crags), sampled every 10px across a 1600×600 box.
 */
function ridge(seed: number, base: number, amp: number, peaks: number, rough = 0.35) {
  const rand = mulberry32(seed);
  const octave = (count: number) => {
    const knots = Array.from({ length: count + 2 }, () => rand());
    return (x: number) => {
      const f = (x / W) * count;
      const i = Math.floor(f);
      const t = f - i;
      const s = t * t * (3 - 2 * t);
      return knots[i] * (1 - s) + knots[i + 1] * s;
    };
  };
  const big = octave(peaks);
  const mid = octave(peaks * 3);
  const fine = octave(peaks * 9);
  let d = `M0 ${H}`;
  for (let x = 0; x <= W; x += 10) {
    const n = big(x) * (1 - rough) + mid(x) * rough * 0.7 + fine(x) * rough * 0.3;
    d += ` L${x} ${(base - n * amp).toFixed(1)}`;
  }
  return `${d} L${W} ${H} Z`;
}

const RIDGES = [
  { d: ridge(19, 430, 380, 6, 0.3), fill: "#3a7a8e", depth: 0.02 },
  { d: ridge(23, 460, 280, 4, 0.32), fill: "#14485f", depth: 0.05 },
  { d: ridge(37, 520, 220, 5, 0.38), fill: "#082e45", depth: 0.09 },
  { d: ridge(51, 585, 150, 7, 0.45), fill: "#011a29", depth: 0.14 },
];

const STARS = (() => {
  const rand = mulberry32(7);
  return Array.from({ length: 140 }, () => ({
    x: +(rand() * 100).toFixed(2),
    y: +(Math.pow(rand(), 1.6) * 62).toFixed(2), // denser near the top
    r: +(0.4 + Math.pow(rand(), 3) * 1.6).toFixed(2),
    t: +(2.5 + rand() * 5).toFixed(2),
    d: +(-rand() * 6).toFixed(2),
  }));
})();

/**
 * Hero backdrop used until a real photo is supplied: a night sky with
 * twinkling stars, an aurora ribbon, a warm dawn glow on the horizon and four
 * ridges of mountains that drift at different depths as the hero scrolls.
 */
export function NightScene({ progress, still }: { progress: MotionValue<number>; still: boolean }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(to_bottom,#010b14_0%,#03243b_26%,#0b4c64_40%,#3f8394_49%,#c9a26a_57%,#f1b865_66%,#f1b865_100%)]">
      {/* stars */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {STARS.map((s, i) => (
          <circle
            key={i}
            className="bd-point"
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.r}
            fill="#eaf6ff"
            style={{ ["--t" as string]: `${s.t}s`, ["--d" as string]: `${s.d}s` }}
          />
        ))}
      </svg>

      {/* aurora ribbon */}
      <div className="sky-aurora absolute inset-x-[-10%] top-[8%] h-[38%] bg-[radial-gradient(60%_50%_at_30%_50%,rgb(43_179_211/0.45),transparent_70%),radial-gradient(45%_45%_at_70%_40%,rgb(142_202_230/0.3),transparent_70%),radial-gradient(30%_35%_at_55%_70%,rgb(110_231_183/0.18),transparent_70%)] blur-2xl" />

      {/* dawn glow behind the ridges */}
      <div className="absolute inset-x-0 bottom-[34%] h-[46%] bg-[radial-gradient(45%_60%_at_50%_100%,rgb(255_200_110/0.6),rgb(251_133_0/0.16)_45%,transparent_75%)]" />

      {/* contour lines faintly over the sky, like a survey overlay */}
      <div className="contours absolute inset-0 opacity-50 [--contour:rgb(142_202_230/0.12)]" />

      {RIDGES.map((ridgeLayer, i) => (
        <Ridge key={i} {...ridgeLayer} index={i} progress={progress} still={still} />
      ))}

      {/* low mist between the nearest ridges */}
      <div className="absolute inset-x-0 bottom-[10%] h-[26%] bg-[linear-gradient(to_top,transparent,rgb(142_202_230/0.16)_50%,transparent)] blur-lg" />
    </div>
  );
}

function Ridge({
  d,
  fill,
  depth,
  index,
  progress,
  still,
}: {
  d: string;
  fill: string;
  depth: number;
  index: number;
  progress: MotionValue<number>;
  still: boolean;
}) {
  // nearer ridges sink faster, so the far ones appear to rise behind them
  const y = useTransform(progress, [0, 1], ["0%", `${depth * 160}%`]);
  return (
    <motion.svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="absolute inset-x-0 bottom-0 h-[68%] w-full"
      style={still ? undefined : { y }}
    >
      {index === 0 && (
        <defs>
          <linearGradient id="ridge-rim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffd28a" stopOpacity="0.45" />
            <stop offset="0.08" stopColor="#8ecae6" stopOpacity="0" />
          </linearGradient>
        </defs>
      )}
      <path d={d} fill={fill} />
      {/* thin moonlit rim on each ridge */}
      <path d={d} fill="url(#ridge-rim)" opacity={0.9 - index * 0.2} />
    </motion.svg>
  );
}
