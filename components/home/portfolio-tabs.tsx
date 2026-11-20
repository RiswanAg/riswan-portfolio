"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight, BadgeCheck, ChevronLeft, ChevronRight, Code2, Trophy, X } from "lucide-react";
import { Container } from "@/components/site/section-header";
import { cn } from "@/lib/utils";
import { PORTFOLIO_TAB_EVENT, type PortfolioTab } from "./portfolio-events";

export type AwardDetail = {
  title: string;
  period: string;
  highlight: string;
  description: string;
  photos: string[];
  link?: { href: string; label: string };
};

export type PortfolioCard = {
  key: string;
  title: string;
  text: string;
  image?: string;
  fit?: "cover" | "contain";
  /** Internal route or external URL; awards open a dialog instead. */
  href?: string;
  cta: string;
  award?: AwardDetail;
};

const TABS: { id: PortfolioTab; label: string; icon: typeof Code2 }[] = [
  { id: "projects", label: "Projects", icon: Code2 },
  { id: "certificates", label: "Certificates", icon: BadgeCheck },
  { id: "awards", label: "Awards", icon: Trophy },
];

export function PortfolioTabs({ cards }: { cards: Record<PortfolioTab, PortfolioCard[]> }) {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<PortfolioTab>("projects");
  const [award, setAward] = useState<AwardDetail | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const onSelect = (event: Event) => setTab((event as CustomEvent<PortfolioTab>).detail);
    window.addEventListener(PORTFOLIO_TAB_EVENT, onSelect);
    return () => window.removeEventListener(PORTFOLIO_TAB_EVENT, onSelect);
  }, []);

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>) {
    const index = TABS.findIndex((t) => t.id === tab);
    const delta = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = TABS[(index + delta + TABS.length) % TABS.length];
    setTab(next.id);
    tabRefs.current[next.id]?.focus();
  }

  return (
    <section id="portfolio-showcase" aria-labelledby="portfolio-title" className="relative scroll-mt-4 pb-16 pt-24 sm:pt-28">
      <div aria-hidden className="contours absolute inset-0 -z-10" />
      <Container>
        <div className="relative text-center">
          <p aria-hidden className="pointer-events-none select-none text-[18vw] font-black leading-none tracking-tight text-ink/[0.06] sm:text-[9rem]">
            Portfolio
          </p>
          <h2 id="portfolio-title" className="sr-only">
            Portfolio
          </h2>

          <LayoutGroup id="portfolio-tabs">
            <div
              role="tablist"
              aria-label="Portfolio collections"
              className="relative mx-auto -mt-[7vw] grid w-full max-w-xl grid-cols-3 gap-1 rounded-2xl border border-line bg-surface p-1.5 shadow-soft sm:-mt-16"
            >
              {TABS.map(({ id, label, icon: Icon }) => {
                const active = tab === id;
                return (
                  <button
                    key={id}
                    ref={(node) => {
                      tabRefs.current[id] = node;
                    }}
                    id={`tab-${id}`}
                    role="tab"
                    type="button"
                    aria-selected={active}
                    aria-controls={`panel-${id}`}
                    tabIndex={active ? 0 : -1}
                    onClick={() => setTab(id)}
                    onKeyDown={onTabKey}
                    className={cn(
                      "relative flex flex-col items-center gap-1 rounded-xl px-2 py-2.5 text-xs font-semibold transition-colors sm:text-sm",
                      active ? "text-on-accent" : "text-dim hover:text-ink",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="portfolio-tab-pill"
                        className="absolute inset-0 rounded-xl bg-accent shadow-[0_10px_24px_-10px_var(--accent)]"
                        transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <Icon size={17} className="relative" aria-hidden />
                    <span className="relative">{label}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>
      </Container>

      <div id={`panel-${tab}`} role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={reduce ? false : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? undefined : { opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Carousel cards={cards[tab]} onAward={setAward} />
          </motion.div>
        </AnimatePresence>
      </div>

      <AwardDialog award={award} onClose={() => setAward(null)} />
    </section>
  );
}

function Carousel({ cards, onAward }: { cards: PortfolioCard[]; onAward: (award: AwardDetail) => void }) {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure]);

  function page(direction: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * step * Math.max(1, Math.floor(el.clientWidth / step)), behavior: "smooth" });
  }

  return (
    <div className="relative">
      <ul
        ref={track}
        onScroll={measure}
        className="no-scrollbar relative flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-[max(1.25rem,calc((100vw-72rem)/2+2rem))] pb-10 pt-2"
      >
        {cards.map((card) => (
          <li key={card.key} className="w-[78vw] max-w-[19.5rem] shrink-0 snap-start scroll-ml-5 sm:w-[19.5rem]">
            <PortfolioCardView card={card} onAward={onAward} />
          </li>
        ))}
      </ul>
      <ArrowButton side="left" disabled={edges.start} onClick={() => page(-1)} />
      <ArrowButton side="right" disabled={edges.end} onClick={() => page(1)} />
    </div>
  );
}

function ArrowButton({ side, disabled, onClick }: { side: "left" | "right"; disabled: boolean; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={side === "left" ? "Previous cards" : "Next cards"}
      className={cn(
        "absolute top-[38%] z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-accent text-on-accent shadow-[0_10px_24px_-8px_var(--accent)] transition-[opacity,transform] hover:scale-105 disabled:pointer-events-none disabled:opacity-0",
        side === "left" ? "left-2 sm:left-5" : "right-2 sm:right-5",
      )}
    >
      <Icon size={20} aria-hidden />
    </button>
  );
}

function PortfolioCardView({ card, onAward }: { card: PortfolioCard; onAward: (award: AwardDetail) => void }) {
  const external = card.href?.startsWith("http") || card.href?.endsWith(".pdf");
  const button =
    "mt-4 inline-flex min-h-9 items-center gap-1.5 self-start rounded-lg bg-accent px-3.5 text-xs font-bold text-on-accent transition-transform hover:-translate-y-0.5 active:scale-[0.97]";
  const ctaIcon = external ? <ArrowUpRight size={14} aria-hidden /> : <ArrowRight size={14} aria-hidden />;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-soft transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        {card.image ? (
          <Image
            src={card.image}
            alt=""
            fill
            sizes="(min-width: 640px) 19.5rem, 78vw"
            className={cn(
              "transition-transform duration-500 group-hover:scale-[1.04]",
              card.fit === "contain" ? "object-contain p-3" : "object-cover",
            )}
          />
        ) : (
          <div className="contours absolute inset-0" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-bold leading-snug text-ink">{card.title}</h3>
        <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-dim">{card.text}</p>
        <div className="mt-auto">
          {card.award ? (
            <button type="button" className={button} onClick={() => onAward(card.award!)}>
              {card.cta} {ctaIcon}
            </button>
          ) : card.href && external ? (
            <a href={card.href} target="_blank" rel="noopener noreferrer" className={button}>
              {card.cta} {ctaIcon}
              <span className="sr-only">: {card.title} (opens in a new tab)</span>
            </a>
          ) : card.href ? (
            <Link href={card.href} className={button}>
              {card.cta} {ctaIcon}
              <span className="sr-only">: {card.title}</span>
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}

/** Native <dialog>: focus is trapped and restored, Escape closes it. */
function AwardDialog({ award, onClose }: { award: AwardDetail | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (award && !dialog.open) dialog.showModal();
    if (!award && dialog.open) dialog.close();
  }, [award]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => event.target === ref.current && ref.current?.close()}
      aria-labelledby="award-dialog-title"
      className="m-auto w-[min(44rem,calc(100vw-2rem))] max-h-[88svh] overflow-y-auto rounded-3xl border border-line bg-surface p-0 text-ink shadow-soft backdrop:bg-[rgb(1_26_41/0.7)] backdrop:backdrop-blur-sm"
    >
      {award && (
        <div className="p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs text-dim">{award.period}</p>
              <h3 id="award-dialog-title" className="mt-1 text-xl font-bold leading-snug sm:text-2xl">
                {award.title}
              </h3>
              <p className="mt-2 inline-flex rounded-md bg-amber/15 px-2 py-0.5 text-xs font-semibold text-amber-strong">
                {award.highlight}
              </p>
            </div>
            <button
              type="button"
              onClick={() => ref.current?.close()}
              aria-label="Close"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line hover:bg-surface-2"
            >
              <X size={18} aria-hidden />
            </button>
          </div>
          {award.photos.length > 0 && (
            <div className="mt-5 grid grid-cols-2 gap-2">
              {award.photos.map((src, i) => (
                <div
                  key={src}
                  className={cn(
                    "relative overflow-hidden rounded-xl bg-surface-2",
                    i === 0 || (i === award.photos.length - 1 && i % 2 === 1) ? "col-span-2 aspect-[16/9]" : "aspect-[4/3]",
                  )}
                >
                  <Image src={src} alt="" fill sizes="(min-width: 640px) 40rem, 90vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}
          <p className="mt-5 text-sm leading-relaxed text-dim sm:text-base">{award.description}</p>
          {award.link && (
            <Link href={award.link.href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent-strong hover:underline">
              {award.link.label} <ArrowUpRight size={14} aria-hidden />
            </Link>
          )}
        </div>
      )}
    </dialog>
  );
}
