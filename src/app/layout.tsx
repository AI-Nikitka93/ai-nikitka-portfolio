import type { Metadata } from "next";
import { Playfair_Display, Outfit, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "AI NIKITKA93 | Музыкальный Каталог & Цифровая Выставка",
  description: "Цифровая выставка музыкального каталога продюсера AI NIKITKA93. 8 вселенных, 8 голосов, 1 продюсер. В стиле Terra Brutalism и Grounded Realism.",
  openGraph: {
    title: "AI NIKITKA93 | Музыкальный Каталог",
    description: "Цифровая выставка музыкального каталога продюсера AI NIKITKA93. 8 вселенных, 8 голосов, 1 продюсер.",
    url: "https://ai-nikitka93.github.io/ai-nikitka-portfolio/",
    siteName: "AI NIKITKA93",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI NIKITKA93 | Музыкальный Каталог",
    description: "Цифровая выставка музыкального каталога продюсера AI NIKITKA93. 8 вселенных, 8 голосов, 1 продюсер.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${playfair.variable} ${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#09090b] text-[#ffffff] selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
