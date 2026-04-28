import Link from "next/link";

import { ProcessTimeline } from "@/components/avantgarde/process-timeline";
import { PageHero } from "@/components/ui/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { getSettings } from "@/lib/site";

const workflow = [
  "Обсуждаем задачу, изделие и желаемый бюджет.",
  "Выезжаем на точный замер и согласуем техническое решение.",
  "Подбираем материал, профиль и комплект дополнительных опций.",
  "Изготавливаем изделие на производстве с контролем качества.",
  "Доставляем и монтируем в согласованное время."
];

export const metadata = buildMetadata({
  title: "Изделия из искусственного камня",
  description:
    "Изделия из кварцевого агломерата на заказ: столешницы, подоконники и другие решения под ваш проект.",
  path: "/catalog"
});

export default async function CatalogPage() {
  const settings = await getSettings();

  return (
    <>
      <PageHero
        eyebrow={undefined}
        title="Изделия из искусственного камня любой сложности"
        titleClassName="catalog-category-hero-title"
        visualImageSrc="/images/portfolio-brands/Avarus-01.jpg"
        visualImageAlt="Изделия из искусственного камня в реализованном проекте"
        visualBadgeText="Пример реализованного проекта ArtellRock"
        description="Работаем по стандартным и индивидуальным размерам. Выберите направление и сразу переходите к расчету."
        actions={
          <>
            <Link className="button" href="/contacts">
              Рассчитать стоимость
            </Link>
            <Link className="button-secondary" href="/catalog-kamnya">
              Смотреть каталог камня
            </Link>
          </>
        }
      />

      <section className="section">
        <div className="container">
          <div className="grid grid-3 product-groups">
            <article className="card card--glass stack">
              <h3>Столешницы</h3>
              <div className="stack product-list">
                <span>Столешницы из кварца</span>
                <span>Столешницы на кухню</span>
                <span>Столешницы в ванную</span>
                <span>Столешницы с мойкой</span>
                <span>Над стиральной машиной</span>
              </div>
              <div className="btn-row">
                <Link className="button-ghost" href="/catalog/countertops">
                  Подробнее
                </Link>
                <Link className="button" href="/calculator">
                  Рассчитать стоимость
                </Link>
              </div>
              <p className="product-call">Или позвоните: {settings.phone}</p>
            </article>

            <article className="card card--glass stack">
              <h3>Подоконники</h3>
              <div className="stack product-list">
                <span>Подоконники из кварца</span>
                <span>Подоконники под мрамор</span>
                <span>Подоконник-столешница</span>
                <span>Эркерные подоконники</span>
                <span>Решения по индивидуальным размерам</span>
              </div>
              <div className="btn-row">
                <Link className="button-ghost" href="/catalog/window-sills">
                  Подробнее
                </Link>
                <Link className="button" href="/calculator">
                  Рассчитать стоимость
                </Link>
              </div>
              <p className="product-call">Или позвоните: {settings.phone}</p>
            </article>

            <article className="card card--glass stack">
              <h3>Другие изделия</h3>
              <div className="stack product-list">
                <span>Мойки и раковины</span>
                <span>Остров и ресепшн</span>
                <span>Стеновые панели</span>
                <span>Столы и ступени</span>
                <span>Профили и кромки</span>
              </div>
              <div className="btn-row">
                <Link className="button-ghost" href="/catalog/sinks">
                  Подробнее
                </Link>
                <Link className="button" href="/calculator">
                  Рассчитать стоимость
                </Link>
              </div>
              <p className="product-call">Или позвоните: {settings.phone}</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <article className="card card--glass stack">
            <h2>Изделия из кварцевого агломерата на заказ от ArtellRock</h2>
            <p>
              Кварцевый агломерат сочетает прочность, устойчивость к влаге и аккуратный внешний вид.
              Мы изготавливаем изделия под реальный сценарий использования: кухня, ванная, подоконники,
              коммерческие зоны и нестандартные проекты.
            </p>
            <div className="btn-row">
              <Link className="button" href="/contacts">
                Оставить заявку
              </Link>
              <Link className="button-ghost" href="/catalog-kamnya">
                Выбрать камень по бренду
              </Link>
            </div>
          </article>
        </div>
      </section>

      <ProcessTimeline steps={workflow} />
    </>
  );
}
