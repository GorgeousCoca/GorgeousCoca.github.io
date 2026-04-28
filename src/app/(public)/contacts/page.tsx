import Link from "next/link";
import { Suspense } from "react";

import { ContactMessageDraft } from "@/components/forms/contact-message-draft";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/ui/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { getSettings } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Контакты",
  description: "Контакты, схема проезда, форма обратной связи и реквизиты компании.",
  path: "/contacts"
});

export default async function ContactsPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHero
        eyebrow="Контакты"
        title="Свяжитесь с нами удобным способом"
        titleClassName="catalog-category-hero-title"
        visualImageSrc="/images/Avarus-Primer.jpg"
        visualImageAlt="Контактная страница ArtellRock"
        visualBadgeText="Контакты. Замер. Монтаж."
        description="Оставьте заявку через форму, позвоните напрямую или приезжайте по адресу производства и офиса."
        actions={
          <>
            <a className="button" href={`tel:${settings.phone.replace(/\D/g, "")}`}>
              Позвонить
            </a>
            <Link className="button-secondary" href="/calculator">
              Быстрый расчет
            </Link>
          </>
        }
      />
      <div className="contacts-page">
        <section className="section">
          <div className="container grid grid-2">
            <div className="card card--glass stack">
              <h2>Контактная информация</h2>
              <div className="info-list">
                <div className="info-list__item">{settings.phone}</div>
                <div className="info-list__item">{settings.email}</div>
                <div className="info-list__item">{settings.address}</div>
                <div className="info-list__item">{settings.metro}</div>
              </div>
              <div className="contact-strip">
                <div className="contact-strip__content stack" style={{ gap: 6 }}>
                  <strong>Покажите размеры и фото объекта</strong>
                  <span>Подскажем по материалу, срокам и ориентиру по стоимости.</span>
                </div>
              </div>
              <div className="map-wrap">
                <iframe src={settings.mapEmbedUrl} loading="lazy" title="Карта офиса" />
              </div>
            </div>

            <div className="stack">
              <Suspense fallback={null}>
                <ContactMessageDraft />
              </Suspense>
              <ContactForm source="contacts" className="card--glass" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
