"use client";

import { motion } from "framer-motion";
import { Code2, Award, Star, GraduationCap, Quote, Download, FolderKanban } from "lucide-react";
import { PROFILE, ABOUT_HOME, ABOUT_STATS } from "@/lib/data";
import { SmartImage } from "@/components/ui/SmartImage";

const STAT_ICONS = { code: Code2, award: Award, star: Star, cgpa: GraduationCap };

export function About() {
  return (
    <section id="about-home" className="relative z-10 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-[#FFFFFF] via-[#DF2531] to-[#7A1018] bg-clip-text text-transparent">
              {ABOUT_HOME.heading}
            </span>
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <p className="mb-1 text-3xl font-semibold text-[#DF2531]/80 sm:text-4xl">
              {ABOUT_HOME.greeting}
            </p>
            <h3 className="mb-5 text-4xl font-black text-white sm:text-5xl">
              {PROFILE.name}
            </h3>
            <p className="mb-6 font-[family-name:var(--font-share-tech-mono)] text-base leading-relaxed text-[#A3A3A3] sm:text-lg">
              {ABOUT_HOME.bio}
            </p>

            <motion.div
              className="mb-8 flex items-start gap-3 rounded-2xl border border-[#DF2531]/20 bg-white/[0.03] px-5 py-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
            >
              <Quote size={20} className="mt-0.5 flex-shrink-0 text-[#DF2531]" />
              <p className="font-[family-name:var(--font-share-tech-mono)] text-sm italic leading-relaxed text-slate-300 sm:text-base">
                {ABOUT_HOME.quote}
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-4">
              <motion.a
                href={PROFILE.cv}
                download
                whileHover={{
                  scale: 1.03,
                  backgroundPosition: "100% 0%",
                }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#DF2531] to-[#7A1018] bg-[length:160%_100%] bg-[0%_0%] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#DF2531]/20 transition-[background-position]"
              >
                <Download size={16} />
                Download CV
              </motion.a>
              <motion.a
                href="/projects"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.02] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-[#DF2531]/50 hover:bg-white/[0.05]"
              >
                <FolderKanban size={16} />
                View Projects
              </motion.a>
            </div>
          </motion.div>

          {/* Right: photo */}
          <motion.div
            className="flex justify-center md:justify-end"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative aspect-[3/4] w-full max-w-sm">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#DF2531]/40 via-[#7A1018]/30 to-transparent blur-2xl" />
              <div className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10">
                <SmartImage
                  src={PROFILE.image}
                  alt={PROFILE.name}
                  eager
                  sizes="(min-width: 640px) 384px, 100vw"
                  fallback={
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#111111] to-[#050608] text-6xl font-black text-white/10">
                      RH
                    </div>
                  }
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {ABOUT_STATS.map((stat, i) => {
            const Icon = STAT_ICONS[stat.icon];
            const content = (
              <>
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#DF2531]/30 bg-[#DF2531]/10">
                  <Icon size={20} className="text-[#DF2531]" />
                </div>
                <div className="mb-1 text-3xl font-black text-white">
                  {stat.value}
                </div>
                <div className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-200">
                  {stat.label}
                </div>
                <p className="font-[family-name:var(--font-share-tech-mono)] text-xs text-[#A3A3A3]">
                  {stat.detail}
                </p>
              </>
            );

            const cardClassName =
              "rounded-2xl border border-white/15 bg-white/[0.07] p-6 text-center" +
              (stat.href
                ? " cursor-pointer transition-colors hover:border-[#DF2531]/50 hover:bg-white/[0.05]"
                : "");

            return stat.href ? (
              <motion.a
                key={stat.label}
                href={stat.href}
                className={cardClassName}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 * i }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                {content}
              </motion.a>
            ) : (
              <motion.div
                key={stat.label}
                className={cardClassName}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 * i }}
              >
                {content}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
