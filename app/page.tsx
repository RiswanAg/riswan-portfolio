import { Backdrop } from "@/components/ui/Backdrop";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { CurrentlyBuilding } from "@/components/sections/CurrentlyBuilding";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Skills } from "@/components/sections/Skills";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-slate-100">
      <Backdrop />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Stats />
        <CurrentlyBuilding />
        <FeaturedProjects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
