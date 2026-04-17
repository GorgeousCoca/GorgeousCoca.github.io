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
        description="Оставьте заявку через форму, позвоните напрямую или приезжайте по адресу производства и офиса."
      />
      <section className="section">
        <div className="container grid grid-2">
          <div className="card stack">
            <h2>Контактная информация</h2>
            <p>{settings.phone}</p>
            <p>{settings.email}</p>
            <p>{settings.address}</p>
            <p>Метро: {settings.metro}</p>
            <h3>Реквизиты</h3>
            <p>{settings.legalName}</p>
            <p>ИНН {settings.inn}</p>
            <p>ОГРН {settings.ogrn}</p>
            <div className="map-wrap">
              <iframe src={settings.mapEmbedUrl} loading="lazy" title="Карта офиса" />
            </div>
          </div>

          <div className="stack">
            <Suspense fallback={null}>
              <ContactMessageDraft />
            </Suspense>
            <ContactForm source="contacts" />
          </div>
        </div>
      </section>
    </>
  );
}
