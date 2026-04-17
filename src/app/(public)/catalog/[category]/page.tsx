import { notFound } from "next/navigation";

import { MediaCard, PageHero } from "@/components/ui/content";
import { productTypeLabels } from "@/lib/filters/catalog";
import { buildMetadata } from "@/lib/seo/metadata";
import { getProducts, getProductsByType } from "@/lib/site";
import type { ProductType } from "@/types/content";

type PageProps = {
  params: Promise<{ category: ProductType }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const title = productTypeLabels[category];

  if (!title) {
    return {};
  }

  return buildMetadata({
    title: `${title} из искусственного камня`,
    description: `${title} под заказ в Санкт-Петербурге с замером, изготовлением и монтажом.`,
    path: `/catalog/${category}`
  });
}

export async function generateStaticParams() {
  const products = await getProducts();
  const categories = [...new Set(products.map((item) => item.type))];
  return categories.map((category) => ({ category }));
}

export default async function CatalogCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const label = productTypeLabels[category];

  if (!label) {
    notFound();
  }

  const products = await getProductsByType(category);

  return (
    <>
      <PageHero
        eyebrow="Pillar page"
        title={`${label} из искусственного камня`}
        description={`Расширенная посадочная страница по направлению "${label}". Здесь собраны решения, примеры исполнения и переходы к карточкам изделий.`}
      />

      <section className="section">
        <div className="container grid grid-3">
          {products.map((product) => (
            <MediaCard
              key={product.id}
              href={`/catalog/${category}/${product.slug}`}
              title={product.title}
              description={product.summary}
              price={product.basePrice}
              meta={`${product.material} · ${product.thickness}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}
