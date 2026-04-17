import { PageHero } from "@/components/ui/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { getCertificates, getTeamMembers } from "@/lib/site";

export const metadata = buildMetadata({
  title: "О компании",
  description: "История компании, производство, команда, сертификаты и гарантии.",
  path: "/about"
});

export default async function AboutPage() {
  const [team, certificates] = await Promise.all([getTeamMembers(), getCertificates()]);

  return (
    <>
      <PageHero
        eyebrow="О компании"
        title="Производство, команда и подход к качеству"
        description="Эта страница отвечает на ключевой вопрос клиента: кто будет делать изделие, насколько надежен подрядчик и как устроен контроль качества."
      />

      <section className="section">
        <div className="container grid grid-2">
          <div className="card stack">
            <h2>История и философия</h2>
            <p>
              Мы специализируемся на изготовлении изделий из искусственного камня на заказ в
              Санкт-Петербурге. Основной принцип компании — сочетать точную технологию с понятным
              клиентским сервисом.
            </p>
          </div>
          <div className="card media-card">
            <div className="media-placeholder" style={{ minHeight: 320 }} />
            <div className="media-card__content">
              <strong>Производство</strong>
              <p>Собственный участок обработки и сборки изделий.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Команда</span>
            <h2 className="section-title">Люди, с которыми клиент взаимодействует лично</h2>
            <p>Страница команды — одна из самых важных в процессе принятия решения.</p>
          </div>
          <div className="grid grid-3">
            {team.map((member) => (
              <article key={member.id} className="card media-card">
                <div className="media-placeholder" />
                <div className="media-card__content stack">
                  <h3>{member.name}</h3>
                  <span className="muted">{member.role}</span>
                  <p>{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Сертификаты и гарантии</span>
            <h2 className="section-title">Подтверждение качества материалов и монтажных работ</h2>
          </div>
          <div className="grid grid-2">
            {certificates.map((certificate) => (
              <article key={certificate.id} className="card media-card">
                <div className="media-placeholder" />
                <div className="media-card__content stack">
                  <h3>{certificate.title}</h3>
                  <p>Документ доступен в медиахранилище админки и может обновляться без правки кода.</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
