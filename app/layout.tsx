import type { Metadata } from "next";
import { Geist, Geist_Mono, Anton, Share_Tech_Mono, Roboto } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Coolvetica isn't on Google Fonts (foundry-only license) — Anton is the
// closest free, redistributable condensed-impact alternative.
const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

// Monofonto isn't on Google Fonts either — Share Tech Mono is a similar
// geometric/technical monospace, and matches the site's existing HUD look.
const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech-mono",
  weight: "400",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const BASE_URL = "https://riswanhamua.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Riswan Hamua | Game & Immersive Tech Developer",
  description:
    "Portfolio of Riswan Hamua, Game Technology student building games, VR and AR simulations, and interactive tools in Unity, Unreal and the browser.",
  keywords: [
    "Riswan Hamua",
    "Game Developer",
    "Unity Developer",
    "Unreal Engine Developer",
    "VR Developer",
    "AR Developer",
    "Game Technology",
    "Interactive Simulation",
    "C# Developer",
    "Portfolio",
  ],
  authors: [{ name: "Riswan Hamua", url: BASE_URL }],
  creator: "Riswan Hamua",
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Riswan Hamua Portfolio",
    title: "Riswan Hamua | Game & Immersive Tech Developer",
    description:
      "Portfolio of Riswan Hamua, Game Technology student building games, VR and AR simulations, and interactive tools in Unity, Unreal and the browser.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Riswan Hamua Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Riswan Hamua | Game & Immersive Tech Developer",
    description:
      "Portfolio of Riswan Hamua, Game Technology student building games, VR and AR simulations, and interactive tools in Unity, Unreal and the browser.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Riswan Hamua",
  url: BASE_URL,
  jobTitle: "Game & Immersive Tech Developer",
  alumniOf: "Universiti Teknikal Malaysia Melaka (UTeM)",
  sameAs: [
    "https://github.com/riswan-hamua",
    "https://linkedin.com/in/riswan-hamua",
  ],
  knowsAbout: ["Unity", "C#", "C++", "Game Development", "Interactive Simulation"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${shareTechMono.variable} ${roboto.variable} h-full antialiased`}
    >
      <head>
        {/* No-flash theme init — site is light by default; apply .dark only if
            the visitor previously opted in. Runs before paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{if(localStorage.getItem('theme')==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-grain min-h-full flex flex-col bg-canvas">
        {children}
      </body>
    </html>
  );
}
