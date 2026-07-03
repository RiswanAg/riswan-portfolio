import { Backdrop } from "@/components/ui/Backdrop";
import { HomeIntro } from "@/components/ui/HomeIntro";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { PortfolioShowcase } from "@/components/sections/PortfolioShowcase";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-slate-100">
      <Backdrop />
      <HomeIntro />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <div className="border-y border-white/5 bg-white/[0.015]">
          <About />
        </div>
        <PortfolioShowcase />
        <Experience />
        <div className="border-y border-white/5 bg-white/[0.015]">
          <Education />
        </div>
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
