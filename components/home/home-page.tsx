import { Journey } from "@/components/sections/Journey";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { About } from "./about";
import { Certificates } from "./certificates";
import { Contact } from "./contact";
import { Education } from "./education";
import { FeaturedWork } from "./featured-work";
import { Hero } from "./hero";
import { Stats } from "./stats";

export function HomePage() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <SiteNav />
      <main id="main" className="flex-1">
        <Hero />
        <Stats />
        <FeaturedWork />
        <About />
        <Journey />
        <Certificates />
        <Education />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
