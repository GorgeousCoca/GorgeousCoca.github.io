import type { Metadata } from "next";

import "@/app/globals.scss";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Изделия из искусственного камня на заказ в Санкт-Петербурге",
  description:
    "Столешницы, подоконники, мойки и проекты из кварцевого агломерата и акрилового камня под заказ в Санкт-Петербурге.",
  path: "/"
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
