import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.scss";
import { buildMetadata } from "@/lib/seo/metadata";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-sans",
  adjustFontFallback: true
});

export const metadata: Metadata = buildMetadata({
  title: "ArtellRock — изделия из кварцевого агломерата на заказ",
  description:
    "Столешницы, подоконники, мойки и коммерческие поверхности из кварцевого агломерата под заказ в Санкт-Петербурге и Ленинградской области.",
  path: "/"
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
