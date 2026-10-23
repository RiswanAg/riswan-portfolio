import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Space_Grotesk,
  Caveat,
  Barlow_Condensed,
} from "next/font/google";
import "./globals.css";
import "./portfolio.css";
import "./cinematic.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-handwritten",
  weight: "400",
  subsets: ["latin"],
});

const display = Barlow_Condensed({
  variable: "--font-display",
  weight: ["600", "700"],
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
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Riswan Hamua Portfolio",
      },
    ],
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
    "https://github.com/RiswanAg",
    "https://www.linkedin.com/in/riswanhamua",
  ],
  knowsAbout: [
    "Unity",
    "C#",
    "C++",
    "Game Development",
    "Interactive Simulation",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} ${caveat.variable} ${display.variable} h-full antialiased`}
    >
      <head>
        {/* Apply the saved choice, falling back to system preference before paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var theme=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',theme==='dark'||(!theme&&matchMedia('(prefers-color-scheme: dark)').matches));}catch(e){document.documentElement.classList.toggle('dark',matchMedia('(prefers-color-scheme: dark)').matches);}})();",
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
