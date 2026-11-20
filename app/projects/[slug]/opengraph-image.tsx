import { PROJECTS } from "@/lib/data";
import { OG_CONTENT_TYPE, OG_SIZE, renderProjectCard, renderSiteCard } from "@/lib/og";

export const alt = "Project by Riswan Hamua";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  return project ? renderProjectCard(project) : renderSiteCard();
}
