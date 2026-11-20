// Twitter/X uses the same card as Open Graph. The config is restated here
// because route segment exports must be declared in the route file itself.
import { OG_CONTENT_TYPE, OG_SIZE, renderSiteCard } from "@/lib/og";

export const alt = "Riswan Hamua, Web Developer & AI Engineer: portfolio";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return renderSiteCard();
}
