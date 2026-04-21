"use client";

import { useSearchParams } from "next/navigation";

import { EmptyState, MediaCard, Pagination } from "@/components/ui/content";
import { filterProducts, paginate, productTypeLabels } from "@/lib/filters/catalog";
import type { Product } from "@/types/content";

type CatalogListClientProps = {
  products: Product[];
};

const productImages: Record<Product["type"], string> = {
  countertops: "/images/quartz-project-composition.svg",
  "window-sills": "/images/quartz-surface-light.svg",
  sinks: "/images/quartz-hero-editorial.svg",
  profiles: "/images/quartz-surface-light.svg"
};

function asNumber(value: string | null, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function CatalogListClient({ products }: CatalogListClientProps) {
  const searchParams = useSearchParams();

  const filtered = filterProducts(products, {
    type: searchParams.get("type") ?? undefined,
    material: searchParams.get("material") ?? undefined,
    color: searchParams.get("color") ?? undefined,
    sort: searchParams.get("sort") ?? undefined,
    page: searchParams.get("page") ?? undefined
  });
  const page = asNumber(searchParams.get("page"), 1);
  const pagination = paginate(filtered, page, 6);

  return (
    <>
      {pagination.items.length ? (
        <div className="grid grid-3">
          {pagination.items.map((product) => (
            <MediaCard
              key={product.id}
              href={`/catalog/${product.type}/${product.slug}`}
              title={product.title}
              description={product.summary}
              label={productTypeLabels[product.type]}
              price={product.basePrice}
              meta={`${product.material} · ${product.color}`}
              imageUrl={productImages[product.type]}
            />
          ))}
        </div>
      ) : (
        <EmptyState title="Ничего не найдено" description="Попробуйте сбросить фильтры или выбрать другой тип изделия." />
      )}

      <Pagination
        page={pagination.page}
        totalPages={pagination.totalPages}
        makeHref={(nextPage) => {
          const next = new URLSearchParams(searchParams.toString());
          next.set("page", String(nextPage));
          return `/catalog?${next.toString()}`;
        }}
      />
    </>
  );
}
