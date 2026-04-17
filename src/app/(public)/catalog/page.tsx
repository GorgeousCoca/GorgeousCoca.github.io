import Link from "next/link";
import { Suspense } from "react";

import { CatalogFilters } from "@/components/catalog/catalog-filters";
import { CatalogListClient } from "@/components/catalog/catalog-list-client";
import { PageHero } from "@/components/ui/content";
import { productTypeLabels } from "@/lib/filters/catalog";
import { buildMetadata } from "@/lib/seo/metadata";
import { getProducts } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Каталог изделий из искусственного камня",
  description:
    "Каталог столешниц, подоконников, моек и профилей из кварцевого агломерата и акрилового камня.",
  path: "/catalog"
});

export default async function CatalogPage() {
  const products = await getProducts();

  const typeOptions = Object.entries(productTypeLabels).map(([value, label]) => ({ value, label }));
  const materialOptions = [...new Set(products.map((item) => item.material))].map((value) => ({ value, label: value }));
  const colorOptions = [...new Set(products.map((item) => item.color))].map((value) => ({ value, label: value }));

  return (
    <>
      <PageHero
        eyebrow="Каталог"
        title="Изделия из искусственного камня под задачи клиента"
        description="Подбирайте категории по типу изделия, материалу, цвету и базовой стоимости. Для каждой позиции предусмотрены SEO-страницы и быстрый переход к заявке."
        actions={
          <>
            <Link className="button" href="/contacts">
              Запросить расчет
            </Link>
            <Link className="button-secondary" href="/catalog-kamnya">
              Смотреть каталог камня
            </Link>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <Suspense fallback={<div className="card">Загрузка фильтров...</div>}>
            <CatalogFilters
              fields={[
                { name: "type", label: "Тип изделия", options: typeOptions },
                { name: "material", label: "Материал", options: materialOptions },
                { name: "color", label: "Цвет", options: colorOptions },
                {
                  name: "sort",
                  label: "Сортировка",
                  options: [
                    { value: "popular", label: "По популярности" },
                    { value: "price-asc", label: "Сначала дешевле" },
                    { value: "price-desc", label: "Сначала дороже" },
                    { value: "newest", label: "Новинки" }
                  ]
                }
              ]}
            />
            <CatalogListClient products={products} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
