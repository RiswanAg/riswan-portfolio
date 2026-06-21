"use client";

import { useState } from "react";
import Image from "next/image";
import { EXPERIENCES } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const active = hoveredIndex !== null ? EXPERIENCES[hoveredIndex] : null;

  return (
    <section id="experience" className="relative px-6 py-28">
      {/* Full-viewport background image overlay — triggered by card hover */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {EXPERIENCES.map((e, i) =>
          e.bgImages ? (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700"
              style={{ opacity: hoveredIndex === i ? 1 : 0 }}
            >
              {/* Left image */}
              <div className="absolute inset-y-0 left-0 w-1/2">
                <Image
                  src={e.bgImages.left}
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover opacity-50"
                  priority={i === 0}
                />
                {/* Fade toward center */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#07152e]" />
              </div>
              {/* Right image */}
              <div className="absolute inset-y-0 right-0 w-1/2">
                <Image
                  src={e.bgImages.right}
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover opacity-50"
                />
                {/* Fade toward center */}
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#07152e]" />
              </div>
            </div>
          ) : null
        )}
      </div>

      <div className="relative mx-auto max-w-3xl">
        <SectionHeading eyebrow="What I Have Done" title="Experience" />

        <div className="flex flex-col gap-6">
          {EXPERIENCES.map((e, i) => (
            <Reveal key={e.role + e.organisation} delay={i * 100}>
              <div
                className="rounded-2xl border border-white/8 bg-[#0F2854]/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[#4988C4]/25"
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#4988C4]">
                      {e.period}
                    </span>
                    <h3 className="mt-1.5 font-bold text-white">{e.role}</h3>
                    <p className="mt-0.5 text-sm font-medium text-slate-400">
                      {e.organisation}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                  {e.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {e.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/8 bg-white/4 px-3 py-1 text-[11px] font-medium text-slate-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
