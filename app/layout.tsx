import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://riswanhamua.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Riswan Hamua | Web Developer & AI Engineer",
  description:
    "Riswan Hamua's portfolio: web development, AI engineering, computer vision and interactive applications. Explore selected projects and get in touch.",
  keywords: [
    "Riswan Hamua",
    "Web Developer",
    "AI Engineer",
    "Web Development",
    "Machine Learning",
    "Computer Vision",
    "Python Developer",
    "Interactive Applications",
    "Portfolio",
  ],
  authors: [{ name: "Riswan Hamua", url: BASE_URL }],
  creator: "Riswan Hamua",
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Riswan Hamua Portfolio",
    title: "Riswan Hamua | Web Developer & AI Engineer",
    description:
      "Web development, AI engineering and interactive applications by Riswan Hamua. Explore selected projects and get in touch.",
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
    title: "Riswan Hamua | Web Developer & AI Engineer",
    description:
      "Web development, AI engineering and interactive applications by Riswan Hamua. Explore selected projects and get in touch.",
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
  jobTitle: "Web Developer & AI Engineer",
  alumniOf: "Universiti Teknikal Malaysia Melaka (UTeM)",
  sameAs: [
    "https://github.com/RiswanAg",
    "https://www.linkedin.com/in/riswanhamua",
  ],
  knowsAbout: [
    "Web Development",
    "AI Engineering",
    "Python",
    "Machine Learning",
    "Computer Vision",
    "Interactive Applications",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
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
      <body className="flex min-h-full flex-col bg-canvas">
        {children}
      </body>
    </html>
  );
}
