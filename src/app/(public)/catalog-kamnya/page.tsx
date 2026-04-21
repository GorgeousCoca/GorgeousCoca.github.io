import { Suspense } from "react";

import { StoneBrandsClient } from "@/components/catalog/stone-brands-client";
import styles from "@/components/catalog/stone-brands.module.scss";
import { buildMetadata } from "@/lib/seo/metadata";
import { getStoneBrands } from "@/lib/stone/brands";
import { getStoneSamples } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Каталог камня",
  description: "Каталог кварцевого агломерата по брендам, цветам, фактурам и толщине.",
  path: "/catalog-kamnya"
});

export default async function StoneCatalogPage() {
  const stones = await getStoneSamples();
  const brands = getStoneBrands(stones);

  return (
    <section className={`section ${styles.catalogPageTheme}`}>
      <div className="container">
        <Suspense fallback={<div className="card">Загрузка фильтров...</div>}>
          <StoneBrandsClient stones={stones} brands={brands} />
        </Suspense>
      </div>
    </section>
  );
}
