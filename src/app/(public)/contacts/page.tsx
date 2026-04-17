import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/ui/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { getSettings } from "@/lib/site";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function asString(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export const metadata = buildMetadata({
  title: "Контакты",
  description: "Контакты, схема проезда, форма обратной связи и реквизиты компании.",
  path: "/contacts"
});

export default async function ContactsPage({ searchParams }: PageProps) {
  const settings = await getSettings();
  const params = await searchParams;
  const message = asString(params.message);

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
            {message ? (
              <div className="card stack">
                <span className="eyebrow">Черновик из калькулятора</span>
                <p>{message}</p>
              </div>
            ) : null}
            <ContactForm source="contacts" />
          </div>
        </div>
      </section>
    </>
  );
}
