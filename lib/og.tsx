// Shared renderer for the generated Open Graph / Twitter card images.
// Only imported by `opengraph-image.tsx` / `twitter-image.tsx` routes, which
// may also run at request time (e.g. on Cloudflare Workers, which has no
// filesystem), so the font and portrait are embedded via lib/og-assets.ts.

import { ImageResponse } from "next/og";
import { SITE_URL } from "@/lib/site";
import { DISPLAY_FONT_BASE64, PORTRAIT_JPEG_BASE64 } from "@/lib/og-assets";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

// Brand palette (mirrors the dark theme tokens in app/globals.css).
const NAVY = "#023047";
const NAVY_DEEP = "#011E2D";
const INK = "#EAF1F8";
const DIM = "#93AEC2";
const TEAL = "#219EBC";
const SKY = "#8ECAE6";
const AMBER = "#FFB703";
const ORANGE = "#FB8500";

function base64ToArrayBuffer(b64: string): ArrayBuffer {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
}

async function loadAssets() {
  return {
    fonts: [
      {
        name: "Display",
        data: base64ToArrayBuffer(DISPLAY_FONT_BASE64),
        weight: 700 as const,
        style: "normal" as const,
      },
    ],
    portrait: `data:image/jpeg;base64,${PORTRAIT_JPEG_BASE64}`,
  };
}

const host = SITE_URL.replace(/^https?:\/\//, "");

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        color: INK,
        backgroundColor: NAVY,
        backgroundImage: `radial-gradient(circle at 88% 18%, rgba(33,158,188,0.45), transparent 46%), radial-gradient(circle at 8% 100%, rgba(251,133,0,0.28), transparent 42%), linear-gradient(135deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)`,
      }}
    >
      {children}
    </div>
  );
}

function Footer({ portrait }: { portrait: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- satori, not the DOM */}
        <img
          src={portrait}
          width={64}
          height={64}
          alt=""
          style={{ borderRadius: 999, border: `3px solid ${SKY}`, objectFit: "cover" }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 28, color: INK }}>Riswan Hamua</span>
          <span style={{ fontSize: 22, color: DIM }}>Web Developer &amp; AI Engineer</span>
        </div>
      </div>
      <span style={{ fontSize: 24, color: SKY }}>{host}</span>
    </div>
  );
}

function AccentBar() {
  return (
    <div
      style={{
        display: "flex",
        width: 120,
        height: 8,
        borderRadius: 999,
        backgroundImage: `linear-gradient(90deg, ${AMBER}, ${ORANGE})`,
      }}
    />
  );
}

/** Card for the home page and any route without its own image. */
export async function renderSiteCard() {
  const { fonts, portrait } = await loadAssets();
  return new ImageResponse(
    (
      <Frame>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 720 }}>
            <span style={{ fontSize: 26, letterSpacing: 6, color: SKY, textTransform: "uppercase" }}>
              Portfolio
            </span>
            <span
              style={{
                fontFamily: "Display",
                fontSize: 132,
                lineHeight: 0.95,
                marginTop: 16,
                textTransform: "uppercase",
              }}
            >
              Web meets AI.
            </span>
            <span style={{ fontSize: 32, lineHeight: 1.35, color: DIM, marginTop: 28 }}>
              Websites, interactive applications and practical AI tools, from the interface to the
              systems behind it.
            </span>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element -- satori, not the DOM */}
          <img
            src={portrait}
            width={300}
            height={300}
            alt=""
            style={{
              borderRadius: 999,
              border: `6px solid ${TEAL}`,
              objectFit: "cover",
              boxShadow: "0 0 80px rgba(33,158,188,0.55)",
            }}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <AccentBar />
            <span style={{ fontFamily: "Display", fontSize: 44, textTransform: "uppercase" }}>
              Riswan Hamua
            </span>
          </div>
          <span style={{ fontSize: 26, color: SKY }}>{host}</span>
        </div>
      </Frame>
    ),
    { ...OG_SIZE, fonts }
  );
}

/** Card for a project detail page. */
export async function renderProjectCard(project: {
  title: string;
  role: string;
  tech: string[];
  award?: string;
}) {
  const { fonts, portrait } = await loadAssets();
  const titleSize = project.title.length > 28 ? 84 : project.title.length > 16 ? 104 : 128;
  return new ImageResponse(
    (
      <Frame>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <span style={{ fontSize: 26, letterSpacing: 6, color: SKY, textTransform: "uppercase" }}>
              Project
            </span>
            {project.award && (
              <span
                style={{
                  fontSize: 22,
                  color: AMBER,
                  border: `2px solid rgba(255,183,3,0.5)`,
                  borderRadius: 999,
                  padding: "6px 18px",
                }}
              >
                {project.award}
              </span>
            )}
          </div>
          <span
            style={{
              fontFamily: "Display",
              fontSize: titleSize,
              lineHeight: 0.95,
              marginTop: 18,
              textTransform: "uppercase",
              maxWidth: 1050,
            }}
          >
            {project.title}
          </span>
          <span style={{ fontSize: 32, color: DIM, marginTop: 22 }}>{project.role}</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 30 }}>
            {project.tech.slice(0, 5).map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 22,
                  color: INK,
                  backgroundColor: "rgba(142,202,230,0.12)",
                  border: "2px solid rgba(142,202,230,0.35)",
                  borderRadius: 12,
                  padding: "8px 18px",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <Footer portrait={portrait} />
      </Frame>
    ),
    { ...OG_SIZE, fonts }
  );
}
