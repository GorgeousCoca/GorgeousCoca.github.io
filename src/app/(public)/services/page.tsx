import Link from "next/link";

import { ContactForm } from "@/components/forms/contact-form";
import { MediaCard, PageHero } from "@/components/ui/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { getServices } from "@/lib/site";
import { formatPrice } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Услуги и цены",
  description: "Замер, дизайн-проект, изготовление, доставка и монтаж изделий из искусственного камня.",
  path: "/services"
});

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        eyebrow="Услуги и цены"
        title="Полный цикл работ от замера до монтажа"
        description="Каждая услуга вынесена в отдельную SEO-страницу и может быть заказана самостоятельно или в составе проекта под ключ."
      />

      <section className="section">
        <div className="container grid grid-3">
          {services.map((service) => (
            <MediaCard
              key={service.id}
              href={`/services/${service.slug}`}
              title={service.title}
              description={service.shortDescription}
              price={service.priceFrom}
              meta={service.duration}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-2">
          <div className="card stack">
            <h2>Базовые цены</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Услуга</th>
                  <th>Срок</th>
                  <th>Цена от</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id}>
                    <td>
                      <Link href={`/services/${service.slug}`}>{service.title}</Link>
                    </td>
                    <td>{service.duration}</td>
                    <td>{formatPrice(service.priceFrom)} руб.</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="stack">
            <div className="card stack">
              <h2>Индивидуальный расчет</h2>
              <p>Если проект нестандартный, пришлите размеры, фото и пожелания по материалу. Подготовим точную смету.</p>
            </div>
            <ContactForm source="services" />
          </div>
        </div>
      </section>
    </>
  );
}
