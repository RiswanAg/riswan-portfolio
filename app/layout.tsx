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
  title: "Riswan Hamua | Game Technology Student & Unity Developer",
  description:
    "Portfolio of Riswan Hamua, Game Technology student specializing in Unity development, interactive simulations, and smart farming technologies.",
  keywords: [
    "Riswan Hamua",
    "Game Developer",
    "Unity Developer",
    "Game Technology",
    "Interactive Simulation",
    "Smart Farming Game",
    "C# Developer",
    "Portfolio",
  ],
  authors: [{ name: "Riswan Hamua", url: BASE_URL }],
  creator: "Riswan Hamua",
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Riswan Hamua Portfolio",
    title: "Riswan Hamua | Game Technology Student & Unity Developer",
    description:
      "Portfolio of Riswan Hamua, Game Technology student specializing in Unity development, interactive simulations, and smart farming technologies.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Riswan Hamua Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Riswan Hamua | Game Technology Student & Unity Developer",
    description:
      "Portfolio of Riswan Hamua, Game Technology student specializing in Unity development, interactive simulations, and smart farming technologies.",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#030712]">{children}</body>
    </html>
  );
}
