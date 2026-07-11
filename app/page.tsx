import { Backdrop } from "@/components/ui/Backdrop";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { PortfolioShowcase } from "@/components/sections/PortfolioShowcase";
import { Journey } from "@/components/sections/Journey";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-slate-100">
      <a href="#hero" className="skip-link">
        Skip to content
      </a>
      <Backdrop />
      <ScrollProgress />
      <Navbar />
      <main id="main" className="relative z-10">
        <Hero />
        <div className="border-y border-white/5 bg-white/[0.015]">
          <About />
        </div>
        <PortfolioShowcase />
        <Journey />
        <div className="border-y border-white/5 bg-white/[0.015]">
          <Education />
        </div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
