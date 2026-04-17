import { notFound } from "next/navigation";

import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/ui/content";
import { stoneTypeLabels } from "@/lib/filters/catalog";
import { buildMetadata } from "@/lib/seo/metadata";
import { getStoneBySlug, getStoneSamples } from "@/lib/site";

type PageProps = {
  params: Promise<{ group: string; slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { group, slug } = await params;
  const stone = await getStoneBySlug(slug);

  if (!stone) {
    return {};
  }

  return buildMetadata({
    title: stone.metaTitle ?? stone.title,
    description: stone.metaDescription ?? stone.description,
    path: `/catalog-kamnya/${group}/${slug}`
  });
}

export async function generateStaticParams() {
  const stones = await getStoneSamples();
  return stones.map((stone) => ({
    group: stone.stoneType,
    slug: stone.slug
  }));
}

export default async function StoneDetailPage({ params }: PageProps) {
  const { group, slug } = await params;
  const stone = await getStoneBySlug(slug);

  if (!stone || stone.stoneType !== group) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow={stoneTypeLabels[stone.stoneType]}
        title={stone.title}
        description={stone.description}
      />
      <section className="section">
        <div className="container grid grid-2">
          <div className="card media-card">
            <div className="media-placeholder" style={{ minHeight: 380 }} />
            <div className="media-card__content pill-list">
              <span className="pill">{stone.color}</span>
              <span className="pill">{stone.texture}</span>
              <span className="pill">{stone.finish}</span>
            </div>
          </div>
          <div className="stack">
            <div className="card stack">
              <h2>Характеристики</h2>
              <p>Производитель: {stone.manufacturer}</p>
              <p>Доступные толщины: {stone.thicknesses.join(", ")}</p>
            </div>
            <ContactForm source={`stone:${stone.slug}`} compact />
          </div>
        </div>
      </section>
    </>
  );
}
