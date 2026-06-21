import type { Metadata } from "next";
import { PROJECTS } from "@/lib/data";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";

export const metadata: Metadata = {
  title: "Projects | Riswan Hamua",
  description:
    "Games, simulations, and tools built by Riswan Hamua — Unity multiplayer, OpenGL racing, smart farming simulation, web-based 3D games, and more.",
  openGraph: {
    title: "Projects | Riswan Hamua",
    description:
      "Games, simulations, and tools built by Riswan Hamua — Unity multiplayer, OpenGL racing, smart farming simulation, web-based 3D games, and more.",
  },
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#07152e]">
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-16 pt-32">
          <div className="aurora absolute -left-32 top-0 h-72 w-72 bg-[#1C4D8D]/15" />
          <div className="aurora absolute -right-24 top-20 h-64 w-64 bg-[#4988C4]/10" />
          <div className="relative mx-auto max-w-6xl">
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-[#4988C4]/70">
              What I&apos;ve built
            </p>
            <div className="flex flex-wrap items-end gap-4">
              <h1 className="text-5xl font-black leading-none text-white md:text-6xl">
                Projects
              </h1>
              <span className="mb-1 rounded-full border border-[#4988C4]/20 bg-[#4988C4]/8 px-3 py-1 font-mono text-sm text-[#BDE8F5]">
                {PROJECTS.length} built
              </span>
            </div>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-400">
              Games, simulations, and tools — from multiplayer networking to
              web-based 3D experiences. Click any project to see the full
              breakdown.
            </p>
          </div>
        </section>

        {/* Grid with filters */}
        <ProjectsGrid projects={PROJECTS} />
      </main>
      <Footer />
    </>
  );
}
