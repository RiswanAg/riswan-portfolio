import type { Metadata } from "next";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Achievements } from "@/components/sections/Achievements";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About | Riswan Hamua",
  description:
    "Experience, education, and achievements of Riswan Hamua — Game Technology student, Unity developer, and Silver Award winner at ITEX 2026.",
  openGraph: {
    title: "About | Riswan Hamua",
    description:
      "Experience, education, and achievements of Riswan Hamua — Game Technology student, Unity developer, and Silver Award winner at ITEX 2026.",
  },
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#050608]">
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-4 pt-32">
          <div className="aurora absolute -left-32 top-0 h-72 w-72 bg-cyan-500/10" />
          <div className="aurora absolute -right-24 top-20 h-64 w-64 bg-emerald-400/8" />
          <div className="relative mx-auto max-w-3xl">
            <Reveal>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-emerald-400/70">
                The full story
              </p>
              <h1 className="text-5xl font-black leading-none text-white md:text-6xl">
                About
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400">
                Game Technology student at UTeM, Dean&apos;s List all six semesters,
                Silver Award at ITEX 2026. Here&apos;s where I&apos;ve been and what
                I&apos;ve done.
              </p>
            </Reveal>
          </div>
        </section>

        <Experience />
        <Education />
        <Achievements />
      </main>
      <Footer />
    </>
  );
}
