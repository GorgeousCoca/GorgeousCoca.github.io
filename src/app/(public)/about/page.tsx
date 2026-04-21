import Link from "next/link";
import Image from "next/image";

import { PageHero } from "@/components/ui/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { getTeamMembers } from "@/lib/site";

const socialLinks = {
  vk: "https://vk.com/club230045850?ysclid=mo5ny4mikt343003951",
  avito: "https://www.avito.ru/"
};

export const metadata = buildMetadata({
  title: "О компании",
  description: "История компании, производство, команда, сертификаты и гарантии.",
  path: "/about"
});

export default async function AboutPage() {
  const team = await getTeamMembers();

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
            <div className="metrics-grid">
              <div className="metric-card stack">
                <strong>Премиальная детализация</strong>
                <span className="muted">Работаем на точность кромок, стыков и примыканий.</span>
              </div>
              <div className="metric-card stack">
                <strong>Своя команда</strong>
                <span className="muted">Без анонимных подрядчиков на критичных этапах.</span>
              </div>
            </div>
          </div>
          <div className="card media-card">
            <Image
              className="media-image"
              src="/images/quartz-project-composition.svg"
              alt="Производственный подход ArtellRock"
              width={1400}
              height={980}
              style={{ height: 320 }}
            />
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
            {team.map((member, index) => (
              <article key={member.id} className="card media-card">
                <Image
                  className="media-image"
                  src={index === 0 ? "/images/quartz-hero-editorial.svg" : "/images/quartz-surface-light.svg"}
                  alt={member.name}
                  width={1600}
                  height={1000}
                />
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
            <span className="eyebrow">Надежность и отзывы</span>
            <h2 className="section-title">Подтверждение качества материалов и монтажных работ</h2>
          </div>
          <div className="card stack">
            <p>
              Нам можно доверять: у нас есть реальные отзывы клиентов и открытые площадки, где вы
              можете посмотреть качество работ и обратную связь.
            </p>
            <div className="btn-row">
              <Link className="button" href={socialLinks.vk} rel="noreferrer" target="_blank">
                Отзывы в VK
              </Link>
              <Link className="button-secondary" href={socialLinks.avito} rel="noreferrer" target="_blank">
                Отзывы на Avito
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
