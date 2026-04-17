import { notFound } from "next/navigation";

import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/ui/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { getServiceBySlug, getServices } from "@/lib/site";
import { formatPrice } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  return buildMetadata({
    title: service.metaTitle ?? service.title,
    description: service.metaDescription ?? service.shortDescription,
    path: `/services/${slug}`
  });
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <PageHero eyebrow="Выделенная услуга" title={service.title} description={service.description} />
      <section className="section">
        <div className="container grid grid-2">
          <div className="card stack">
            <div className="badge">от {formatPrice(service.priceFrom)} руб.</div>
            <h2>Что входит</h2>
            <p>{service.description}</p>
            <p>Срок выполнения: {service.duration}</p>
          </div>
          <ContactForm source={`service:${service.slug}`} />
        </div>
      </section>
    </>
  );
}
