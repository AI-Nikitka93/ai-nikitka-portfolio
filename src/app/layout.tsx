import type { Metadata } from "next";
import type { Viewport } from "next";
import { IBM_Plex_Mono, Space_Grotesk, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SkipLink } from "@/components/skip-link";
import { AvailabilityStatus } from "@/components/availability-status";
import { absoluteUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: siteConfig.title,
    template: "%s | AI_Nikitka93",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/favicon.svg",
  },
  keywords: [
    "AI_Nikitka93",
    "AI Nikitka93",
    "Nikitka AI",
    "Никита Кизевич",
    "Кизевич Никита",
    "AI portfolio",
    "portfolio works",
    "AI video",
    "AI images",
  ],
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    locale: siteConfig.locale,
    siteName: siteConfig.shortName,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [absoluteUrl("/opengraph-image")],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0a0d0c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        >
          <div className="absolute inset-0 bg-background" />
          <div className="site-noise absolute inset-0 opacity-60" />
          <div className="site-grid absolute inset-0 opacity-70" />
          <div className="absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_top,rgba(183,255,60,0.12),transparent_55%)]" />
          <div className="absolute right-[-8rem] top-[18rem] h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(255,106,42,0.12),transparent_70%)] blur-3xl" />
        </div>
        <div className="relative z-10 flex min-h-screen flex-col">
          <SkipLink />
          <SiteHeader />
          {children}
          <SiteFooter />
          <AvailabilityStatus mode="floating" />
        </div>
      </body>
    </html>
  );
}
