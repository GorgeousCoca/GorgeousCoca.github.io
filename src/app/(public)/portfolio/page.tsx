import { Suspense } from "react";

import { PortfolioListClient } from "@/components/catalog/portfolio-list-client";
import { BrandCarousels } from "@/components/portfolio/brand-carousels";
import { buildMetadata } from "@/lib/seo/metadata";
import { getProjects } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Портфолио изделий из искусственного камня",
  description: "Галерея выполненных проектов: кухни, ванные комнаты и коммерческие пространства.",
  path: "/portfolio"
});

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <section className="section">
      <div className="container">
        <BrandCarousels />
        <Suspense fallback={<div className="card">Загрузка фильтров...</div>}>
          <PortfolioListClient projects={projects} />
        </Suspense>
      </div>
    </section>
  );
}
