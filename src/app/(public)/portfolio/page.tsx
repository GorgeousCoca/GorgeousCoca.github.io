import { Suspense } from "react";

import { PortfolioListClient } from "@/components/catalog/portfolio-list-client";
import { BrandCarousels } from "@/components/portfolio/brand-carousels";
import { TestimonialsShowcase } from "@/components/portfolio/testimonials-showcase";
import { buildMetadata } from "@/lib/seo/metadata";
import { getProjects, getTestimonials } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Портфолио изделий из искусственного камня",
  description: "Галерея выполненных проектов: кухни, ванные комнаты и коммерческие пространства.",
  path: "/portfolio"
});

export default async function PortfolioPage() {
  const [projects, testimonials] = await Promise.all([getProjects(), getTestimonials()]);

  return (
    <section className="section">
      <div className="container">
        <BrandCarousels />
        <TestimonialsShowcase testimonials={testimonials} />
        <Suspense fallback={<div className="card">Загрузка фильтров...</div>}>
          <PortfolioListClient projects={projects} />
        </Suspense>
      </div>
    </section>
  );
}
