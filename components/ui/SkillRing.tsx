"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SKILL_LEVEL_FILL, type Skill } from "@/lib/data";

/**
 * A skill shown as a proficiency ring: the logo sits inside a circular track
 * whose accent arc draws to the skill's tier fill when it scrolls into view
 * (once). Two sizes — `featured` for signature skills, `compact` for the rest.
 * Respects prefers-reduced-motion by rendering the final arc instantly.
 */
export function SkillRing({
  skill,
  variant = "compact",
}: {
  skill: Skill;
  variant?: "featured" | "compact";
}) {
  const reduceMotion = useReducedMotion();
  const fill = SKILL_LEVEL_FILL[skill.level];

  const featured = variant === "featured";
  const size = featured ? 132 : 96;
  const stroke = featured ? 6 : 5;
  const logo = featured ? 60 : 42;
  const r = (size - stroke) / 2;
  const c = size / 2;

  return (
    <div className="group flex flex-col items-center gap-3 text-center">
      <div
        className="relative"
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="block"
        >
          {/* track */}
          <circle
            cx={c}
            cy={c}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={stroke}
          />
          {/* proficiency arc */}
          <motion.circle
            cx={c}
            cy={c}
            r={r}
            fill="none"
            stroke="url(#skill-arc)"
            strokeWidth={stroke}
            strokeLinecap="round"
            initial={{ pathLength: reduceMotion ? fill : 0 }}
            whileInView={{ pathLength: fill }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ rotate: -90, transformOrigin: "50% 50%" }}
          />
          <defs>
            <linearGradient id="skill-arc" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7C5CFF" />
              <stop offset="100%" stopColor="#2EE6C6" />
            </linearGradient>
          </defs>
        </svg>

        {/* logo */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:scale-110"
          style={{ width: logo, height: logo }}
        >
          <Image
            src={skill.logo}
            alt={skill.name}
            fill
            sizes={`${logo}px`}
            className="object-contain"
          />
        </div>
      </div>

      <div>
        <p
          className={`font-bold text-white ${featured ? "text-base" : "text-sm"}`}
        >
          {skill.name}
        </p>
        <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#2EE6C6]">
          {skill.level}
        </p>
      </div>
    </div>
  );
}
