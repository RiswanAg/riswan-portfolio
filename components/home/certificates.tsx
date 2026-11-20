import Image from "next/image";
import { ArrowUpRight, FileText } from "lucide-react";
import { CERTIFICATES } from "@/lib/data";
import { Marquee } from "@/components/magicui/marquee";
import { Container, SectionHeader } from "@/components/site/section-header";

export function Certificates() {
  if (CERTIFICATES.length === 0) return null;
  return (
    <section id="certificates" className="py-24 sm:py-32">
      <Container>
        <SectionHeader
          index="04"
          eyebrow="Certificates"
          title={
            <>
              Courses finished, <span className="text-accent-strong">competitions entered.</span>
            </>
          }
        />
      </Container>
      <Marquee duration="60s" gap="1.25rem" className="py-2">
        {CERTIFICATES.map((certificate) => (
          <a
            key={certificate.name}
            href={certificate.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-72 shrink-0 flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors hover:border-line-2 sm:w-80"
          >
            <span className="relative block aspect-[4/3] bg-surface-2">
              {certificate.image ? (
                <Image
                  src={certificate.image}
                  alt=""
                  fill
                  sizes="320px"
                  className={certificate.imageFit === "contain" ? "object-contain p-3" : "object-cover"}
                />
              ) : (
                <span className="grid h-full place-items-center text-dim">
                  <FileText size={36} aria-hidden />
                </span>
              )}
            </span>
            <span className="flex flex-1 flex-col gap-1 p-4">
              <span className="flex items-start justify-between gap-3">
                <span className="line-clamp-2 text-sm font-semibold text-ink">{certificate.name}</span>
                <ArrowUpRight size={16} className="mt-0.5 shrink-0 text-dim transition-transform group-hover:rotate-45 group-hover:text-accent-strong" aria-hidden />
              </span>
              <span className="line-clamp-1 text-xs text-dim">{certificate.org}</span>
              {certificate.date && <span className="font-mono text-xs text-dim">{certificate.date}</span>}
            </span>
          </a>
        ))}
      </Marquee>
    </section>
  );
}
