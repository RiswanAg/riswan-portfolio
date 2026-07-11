"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Code2, Award, Star, GraduationCap, Quote, Download, ArrowRight } from "lucide-react";
import { PROFILE, ABOUT_HOME, ABOUT_STATS, CONTACTS } from "@/lib/data";
import { SmartImage } from "@/components/ui/SmartImage";
import { CountUp } from "@/components/ui/CountUp";
import { CometCard } from "@/components/ui/comet-card";

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
          <h2 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
            {ABOUT_HOME.heading}
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
            <p className="mb-1 text-3xl font-semibold text-[#2EE6C6]/80 sm:text-4xl">
              {ABOUT_HOME.greeting}
            </p>
            <h3 className="mb-5 text-4xl font-black text-white sm:text-5xl">
              {PROFILE.name}
            </h3>
            <p className="mb-6 text-base leading-relaxed text-[#93A2B8] sm:text-lg">
              {ABOUT_HOME.bio}
            </p>

            <motion.div
              className="mb-8 flex items-start gap-3 rounded-2xl border border-[#2EE6C6]/20 bg-white/[0.03] px-5 py-4"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.35 }}
            >
              <Quote size={20} className="mt-0.5 flex-shrink-0 text-[#2EE6C6]" />
              <p className="text-sm italic leading-relaxed text-slate-300 sm:text-base">
                {ABOUT_HOME.quote}
              </p>
            </motion.div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={PROFILE.cv}
                download
                className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-gradient-to-r from-[#2EE6C6] to-[#27C7E5] px-7 py-3 text-sm font-bold text-[#03140F] shadow-lg shadow-[#2EE6C6]/25 transition-all duration-200 hover:scale-[1.04] hover:shadow-xl hover:shadow-[#2EE6C6]/40 active:scale-[0.97]"
              >
                <Download size={16} strokeWidth={2.5} />
                Download CV
              </a>
              <a
                href="#portfolio-showcase"
                className="group inline-flex min-h-[48px] items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.04] hover:border-[#2EE6C6]/50 hover:bg-white/[0.06] active:scale-[0.97]"
              >
                View My Work
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </a>
              <span className="mx-1 hidden h-6 w-px bg-white/10 sm:block" />
              {CONTACTS.filter(
                (c) => (c.label === "GitHub" || c.label === "LinkedIn") && c.logo
              ).map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={c.label}
                  className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.03] transition-all duration-200 hover:scale-110 hover:border-[#2EE6C6]/50"
                >
                  <Image
                    src={c.logo!}
                    alt={c.label}
                    width={18}
                    height={18}
                    className="h-[18px] w-[18px] object-contain opacity-60 transition-opacity group-hover:opacity-100"
                  />
                </a>
              ))}
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
            <div className="relative w-full max-w-sm">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#2EE6C6]/40 via-[#7C5CFF]/30 to-transparent blur-2xl" />
              <CometCard className="relative">
                <div className="flex w-full flex-col items-stretch rounded-2xl border border-white/10 bg-[#0E1626] p-3">
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
                    <SmartImage
                      src={PROFILE.image}
                      alt={PROFILE.name}
                      eager
                      sizes="(min-width: 640px) 384px, 100vw"
                      fallback={
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0E1626] to-[#0A101E] text-6xl font-black text-white/10">
                          RH
                        </div>
                      }
                    />
                  </div>
                  <div className="mt-3 flex flex-shrink-0 items-center justify-between px-2 py-1 font-[family-name:var(--font-share-tech-mono)] text-white">
                    <span className="text-xs tracking-wide text-[#2EE6C6]">
                      {PROFILE.name}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-white/50">
                      <span className="h-2 w-2 rounded-full bg-[#2EE6C6] shadow-[0_0_8px_#2EE6C6]" />
                      Available
                    </span>
                  </div>
                </div>
              </CometCard>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {ABOUT_STATS.map((stat, i) => {
            const Icon = STAT_ICONS[stat.icon];
            const content = (
              <>
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#2EE6C6]/30 bg-[#2EE6C6]/10">
                  <Icon size={20} className="text-[#2EE6C6]" />
                </div>
                <div className="mb-1 text-3xl font-black text-white">
                  <CountUp value={stat.value} />
                </div>
                <div className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-200">
                  {stat.label}
                </div>
                <p className="font-[family-name:var(--font-share-tech-mono)] text-xs text-[#93A2B8]">
                  {stat.detail}
                </p>
              </>
            );

            const cardClassName =
              "rounded-2xl border border-white/15 bg-white/[0.07] p-6 text-center" +
              (stat.href
                ? " cursor-pointer transition-colors hover:border-[#2EE6C6]/50 hover:bg-white/[0.09]"
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
