import { CERTIFICATES, PROJECTS } from "@/lib/data";
import { Journey, MILESTONES } from "@/components/sections/Journey";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { existingPublicFiles, publicFileExists, publicImagesIn } from "@/lib/public-assets";
import { AboutIntro } from "./about-intro";
import { Contact } from "./contact";
import { FolderCards, type Folder } from "./folder-cards";
import { HeroIntro } from "./hero-intro";
import { PhotoCollage, type CollagePhoto } from "./photo-collage";
import type { PortfolioTab } from "./portfolio-events";
import { PortfolioTabs, type PortfolioCard } from "./portfolio-tabs";
import { PortfolioTransition } from "./portfolio-transition";
import { Toolkit } from "./toolkit";

/** Drop a wide photo at public/hero.jpg and the hero picks it up on the next build. */
const HERO_PHOTO = "/hero.jpg";

function portfolioCards(): Record<PortfolioTab, PortfolioCard[]> {
  const projects: PortfolioCard[] = PROJECTS.map((project) => ({
    key: project.slug,
    title: project.title,
    text: project.description,
    image: publicFileExists(project.image) ? project.image : undefined,
    fit: project.imageFit,
    href: `/projects/${project.slug}`,
    cta: "Details",
  }));

  const certificates: PortfolioCard[] = CERTIFICATES.map((certificate) => ({
    key: certificate.name,
    title: certificate.name,
    text: [certificate.org, certificate.date].filter(Boolean).join(" · "),
    image: certificate.image && publicFileExists(certificate.image) ? certificate.image : undefined,
    fit: certificate.imageFit,
    href: certificate.url,
    cta: "View certificate",
  }));

  const awards: PortfolioCard[] = MILESTONES.filter((m) => m.kind === "award").map((m) => ({
    key: m.key,
    title: m.title,
    text: m.summary,
    image: m.gallery[0],
    cta: "Details",
    award: {
      title: m.title,
      period: m.period,
      highlight: m.highlight,
      description: m.description,
      photos: m.gallery,
      link: m.link,
    },
  }));

  return { projects, certificates, awards };
}

/** Every real event/team photo under /public/journey, captioned by milestone. */
function collagePhotos(): CollagePhoto[] {
  const seen = new Set<string>();
  const photos: CollagePhoto[] = [];
  const byFolder = MILESTONES.map((m) => ({
    caption: m.subtitle || m.title,
    photos: [...m.gallery.filter((src) => src.startsWith("/journey/")), ...publicImagesIn(`journey/${m.key}`)],
  }));
  // Round-robin across milestones so neighbouring polaroids differ.
  const longest = Math.max(0, ...byFolder.map((f) => f.photos.length));
  for (let i = 0; i < longest; i++) {
    for (const folder of byFolder) {
      const src = folder.photos[i];
      if (src && !seen.has(src)) {
        seen.add(src);
        photos.push({ src, caption: folder.caption.split("·")[0].trim() });
      }
    }
  }
  return photos;
}

export function HomePage() {
  const cards = portfolioCards();
  const thumbs = (list: PortfolioCard[]) => existingPublicFiles(list.flatMap((card) => (card.image ? [card.image] : []))).slice(0, 3);
  const folders: Folder[] = [
    { id: "projects", label: "Projects", count: cards.projects.length, thumbs: thumbs(cards.projects) },
    { id: "certificates", label: "Certificates", count: cards.certificates.length, thumbs: thumbs(cards.certificates) },
    { id: "awards", label: "Awards", count: cards.awards.length, thumbs: thumbs(cards.awards) },
  ];

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteNav />
      <main id="main" className="flex-1">
        {/* Cinematic dark half: always navy, whatever the site theme. */}
        <div data-nav="dark" className="dark relative bg-canvas text-ink">
          <HeroIntro photo={publicFileExists(HERO_PHOTO) ? HERO_PHOTO : null} />
          <div id="about-home" className="relative isolate">
            <div aria-hidden className="contours absolute inset-0 -z-10" />
            <AboutIntro />
            <Toolkit />
            <Journey />
            <FolderCards folders={folders} />
          </div>
        </div>

        <PortfolioTransition />

        {/* Light half: follows the site theme (light grey in light mode). */}
        <div className="relative isolate">
          <PortfolioTabs cards={cards} />
          <PhotoCollage photos={collagePhotos()} />
          <Contact />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
