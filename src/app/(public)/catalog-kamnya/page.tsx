import { Suspense } from "react";

import { CatalogFilters } from "@/components/catalog/catalog-filters";
import { StoneListClient } from "@/components/catalog/stone-list-client";
import { PageHero } from "@/components/ui/content";
import { stoneTypeLabels } from "@/lib/filters/catalog";
import { buildMetadata } from "@/lib/seo/metadata";
import { getStoneSamples } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Каталог камня",
  description: "Каталог кварца, акрилового камня, мрамора и гранита с фильтрацией по цвету, фактуре и производителю.",
  path: "/catalog-kamnya"
});

export default async function StoneCatalogPage() {
  const stones = await getStoneSamples();

  return (
    <>
      <PageHero
        eyebrow="Каталог камня"
        title="Подбор декоров и материалов под конкретную задачу"
        description="Фильтруйте образцы по типу камня, цвету, фактуре и производителю, чтобы быстрее перейти к согласованию."
      />

      <section className="section">
        <div className="container">
          <Suspense fallback={<div className="card">Загрузка фильтров...</div>}>
            <CatalogFilters
              fields={[
                {
                  name: "type",
                  label: "Тип камня",
                  options: Object.entries(stoneTypeLabels).map(([value, label]) => ({ value, label }))
                },
                {
                  name: "color",
                  label: "Цвет",
                  options: [...new Set(stones.map((item) => item.color))].map((value) => ({ value, label: value }))
                },
                {
                  name: "texture",
                  label: "Текстура",
                  options: [...new Set(stones.map((item) => item.texture))].map((value) => ({ value, label: value }))
                },
                {
                  name: "manufacturer",
                  label: "Производитель",
                  options: [...new Set(stones.map((item) => item.manufacturer))].map((value) => ({
                    value,
                    label: value
                  }))
                }
              ]}
            />
            <StoneListClient stones={stones} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
