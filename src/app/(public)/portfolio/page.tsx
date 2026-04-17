import { Suspense } from "react";

import { CatalogFilters } from "@/components/catalog/catalog-filters";
import { PortfolioListClient } from "@/components/catalog/portfolio-list-client";
import { PageHero } from "@/components/ui/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { getProjects } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Портфолио изделий из искусственного камня",
  description: "Галерея выполненных проектов: кухни, ванные комнаты и коммерческие пространства.",
  path: "/portfolio"
});

export default async function PortfolioPage() {
  const projects = await getProjects();
  const categories = [...new Set(projects.map((project) => project.category))];

  return (
    <>
      <PageHero
        eyebrow="Портфолио"
        title="Проекты, которые помогают принять решение"
        description="На странице собраны реальные кухни, ванные и офисные пространства. Каждая карточка ведет на детальную страницу с описанием, отзывом и фото до/после."
      />
      <section className="section">
        <div className="container">
          <Suspense fallback={<div className="card">Загрузка фильтров...</div>}>
            <CatalogFilters
              fields={[
                {
                  name: "category",
                  label: "Тип проекта",
                  options: categories.map((value) => ({ value, label: value }))
                }
              ]}
            />

            <PortfolioListClient projects={projects} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
