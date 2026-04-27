import Link from "next/link";
import { notFound } from "next/navigation";

import { MediaCard, PageHero } from "@/components/ui/content";
import { productTypeLabels } from "@/lib/filters/catalog";
import { buildMetadata } from "@/lib/seo/metadata";
import { getProducts, getProductsByType } from "@/lib/site";
import { formatPrice } from "@/lib/utils";
import type { ProductType } from "@/types/content";

type PageProps = {
  params: Promise<{ category: ProductType }>;
};

type CategoryLandingContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow?: string;
  heroTitle: string;
  heroDescription: string;
  heroPromo?: string;
  heroPriceFrom?: string;
  showHeroBadges?: boolean;
  heroImageSrc?: string;
  heroImageAlt?: string;
  introTitle: string;
  introText: string[];
  featureTitle: string;
  featureIntro: string;
  sellingPoints: string[];
  quickLinks?: { label: string; href: string }[];
  pricingTitle: string;
  pricingText: string[];
  colorsTitle: string;
  colorsText: string[];
  popularColors: string[];
  showcaseTitle: string;
  showcaseText: string;
  showcaseExamples: { title: string; details: string[]; price: string }[];
  trustTitle: string;
  trustCards: { title: string; text: string }[];
  whyCards: { title: string; text: string }[];
  processTitle: string;
  processSteps: { step: string; text: string }[];
  finalTitle: string;
  finalText: string;
  showPopularColors?: boolean;
};

const landingByCategory: Partial<Record<ProductType, CategoryLandingContent>> = {
  countertops: {
    metaTitle: "Столешницы из искусственного камня на заказ",
    metaDescription:
      "Столешницы из кварцевого агломерата под заказ в Санкт-Петербурге: замер, изготовление, доставка и монтаж под ключ.",
    eyebrow: "Столешницы на заказ",
    heroTitle: "Столешницы из искусственного камня в Санкт-Петербурге",
    heroDescription:
      "Изготавливаем столешницы на кухню и в ванную под ваш проект: от подбора материала и замера до монтажа под ключ. Работаем с кварцевым агломератом и акриловым камнем, учитываем геометрию помещения, технику, фартук и все примыкания.",
    heroPromo: "Гарантия низкой цены",
    heroPriceFrom: "от 7 670 ₽/м² за материал",
    introTitle: "Столешница из искусственного камня - лучшее решение для интерьера",
    introText: [
      "Столешницы из искусственного камня популярны за счет сочетания эстетики и практичности. Поверхность выглядит аккуратно, легко вписывается в современный интерьер и выдерживает ежедневную нагрузку.",
      "Вы получаете широкий выбор цветов, текстур и форм: от спокойных однотонных решений до выразительных мраморных декоров. Это позволяет реализовать как сдержанный классический стиль, так и более смелые современные проекты."
    ],
    featureTitle: "Почему это удобно в реальной эксплуатации",
    featureIntro:
      "Каменная столешница - это не только внешний вид, но и функциональность. Материал стабилен, практичен в уходе и хорошо работает в помещениях с влажностью и активным использованием.",
    sellingPoints: [
      "Долговечность и высокая прочность поверхности",
      "Устойчивость к царапинам, пятнам и бытовой химии",
      "Большой выбор оттенков и фактур под любой интерьер",
      "Гигиеничность и легкость в повседневном уходе"
    ],
    quickLinks: [
      { label: "Столешницы из кварца", href: "/catalog-kamnya" },
      { label: "Столешницы из акрила", href: "/catalog-kamnya" },
      { label: "Столешницы на кухню", href: "/catalog/countertops" },
      { label: "Столешницы в ванную", href: "/catalog/countertops" }
    ],
    pricingTitle: "Как узнать стоимость столешницы из камня",
    pricingText: [
      "Вы можете оставить заявку и получить консультацию специалиста, чтобы быстро сориентироваться по бюджету и срокам.",
      "Если нужен более точный ориентир, удобнее всего использовать калькулятор и затем подтвердить расчет после замера."
    ],
    colorsTitle: "Цвет столешницы - отражение вашего вкуса и стиля жизни",
    colorsText: [
      "Цвет задает характер всей кухни или ванной зоны: может быть акцентным, нейтральным или поддерживать общий тон интерьера.",
      "При выборе важно учитывать фасады, освещение, кромку и фактуру, чтобы итоговое изделие выглядело цельно."
    ],
    popularColors: ["Avant Quartz 7030", "Avarus R-541", "Grandex M-717", "Radianz UG-950", "Primax 884"],
    showcaseTitle: "Примеры реализованных столешниц и ориентиры по стоимости",
    showcaseText:
      "Ниже - типовые форматы изделий, которые чаще всего заказывают для кухонь и ванных. Финальная цена зависит от размера, конфигурации, кромки, фартука и сложности монтажа.",
    showcaseExamples: [
      {
        title: "Столешница прямая с низким фартуком",
        details: ["Кварцевый агломерат", "Avarus R-541 Снега Сибири"],
        price: "от 78 000 ₽ под ключ"
      },
      {
        title: "Столешница угловая с фартуком",
        details: ["Кварцевый агломерат", "Radianz AL450 Alluring"],
        price: "от 183 000 ₽ под ключ"
      },
      {
        title: "Столешница П-образная с подоконником",
        details: ["Кварцевый агломерат", "Avant Quartz 7020 Амбуаз"],
        price: "от 279 000 ₽ под ключ"
      }
    ],
    trustTitle: "Почему клиенты выбирают нас",
    trustCards: [
      {
        title: "Гарантия качества",
        text: "Используем проверенные материалы и даем гарантию на изделие и монтажные работы."
      },
      {
        title: "Без срывов сроков",
        text: "Фиксируем этапы и придерживаемся согласованного графика от замера до установки."
      },
      {
        title: "Полный цикл под ключ",
        text: "Берем на себя замер, проектирование, изготовление, доставку и аккуратный монтаж."
      }
    ],
    whyCards: [
      {
        title: "Практичность на каждый день",
        text: "Кварцевая поверхность устойчива к влаге, пятнам и бытовой нагрузке."
      },
      {
        title: "Эстетика без компромиссов",
        text: "Доступны однотонные и мраморные декоры для современного интерьера."
      },
      {
        title: "Индивидуальная геометрия",
        text: "Реализуем прямые, П-образные, угловые решения и острова любой сложности."
      }
    ],
    processTitle: "Как проходит заказ столешницы из искусственного камня",
    processSteps: [
      {
        step: "01. Заявка",
        text: "Связываетесь с нами любым удобным способом и описываете задачу по изделию."
      },
      {
        step: "02. Замер",
        text: "Специалист выезжает на объект, выполняет точные размеры и согласует технические детали."
      },
      {
        step: "03. Производство",
        text: "Изготавливаем изделие по утвержденным параметрам и контролируем качество на каждом этапе."
      },
      {
        step: "04. Доставка и монтаж",
        text: "Привозим в согласованное время и устанавливаем аккуратно, с проверкой примыканий."
      },
      {
        step: "05. Гарантия",
        text: "Передаем готовый результат и гарантийные обязательства."
      }
    ],
    finalTitle: "Нужен расчет столешницы под ваш проект?",
    finalText:
      "Отправьте размеры и фото помещения. Подготовим ориентир по стоимости и срокам, а после замера дадим точное коммерческое предложение."
  },
  "window-sills": {
    metaTitle: "Подоконники из искусственного камня на заказ",
    metaDescription:
      "Подоконники из искусственного камня на заказ в Санкт-Петербурге: от замера до монтажа, с подбором декора под интерьер.",
    eyebrow: undefined,
    heroTitle: "Подоконники из искусственного камня ручной работы в Санкт-Петербурге",
    heroDescription:
      "Производим подоконники из искусственного камня по индивидуальным размерам. Выполняем весь цикл работ под ключ.",
    heroPromo: "Изготовление на заказ в Санкт-Петербурге",
    heroPriceFrom: "от 11 760 ₽/м² за материал",
    showHeroBadges: false,
    heroImageSrc: "/images/portfolio-brands/Avarus-01.jpg",
    heroImageAlt: "Подоконник из искусственного камня Avarus в реализованном проекте",
    introTitle: "Подоконники из камня - практичное решение для интерьера",
    introText: [
      "Подоконник должен быть не только аккуратным визуально, но и устойчивым к ежедневной эксплуатации. Искусственный камень хорошо справляется с влагой, температурными перепадами и бытовыми нагрузками.",
      "Мы подбираем формат под ваш интерьер: от классических решений до эркерных и рабочих подоконников с расширенной функциональностью."
    ],
    featureTitle: "Преимущества подоконников из искусственного камня",
    featureIntro:
      "Материал сочетает красоту натурального камня и современную технологичность, поэтому подоконник сохраняет внешний вид долгие годы.",
    sellingPoints: [
      "Долговечность и прочность в ежедневной эксплуатации",
      "Устойчивость к царапинам, пятнам и бытовой влаге",
      "Разнообразие цветовых решений и фактур",
      "Гигиеничность и простой уход за поверхностью"
    ],
    quickLinks: [],
    pricingTitle: "Как купить подоконники из искусственного камня недорого",
    pricingText: [
      "Оставьте заявку и получите консультацию менеджера по формату изделия, материалу и ориентиру по бюджету.",
      "Для точного расчета используйте калькулятор, после замера мы подтверждаем стоимость и сроки по вашему проекту."
    ],
    colorsTitle: "Цвет подоконника - часть общего образа интерьера",
    colorsText: [
      "Цвет и текстура подоконника должны сочетаться с оконными рамами, откосами и отделкой помещения.",
      "Подбираем материалы с учетом освещения, площади и стилистики, чтобы изделие выглядело органично."
    ],
    popularColors: [],
    showPopularColors: false,
    showcaseTitle: "Примеры подоконников и ориентиры по стоимости",
    showcaseText:
      "Ниже примеры востребованных форматов. Финальная стоимость зависит от длины, глубины, геометрии, материала и сложности монтажа.",
    showcaseExamples: [
      {
        title: "Серый подоконник из искусственного камня",
        details: ["Кварцевый агломерат", "VicoStone BQ-9470 Azul Aran"],
        price: "от 14 000 ₽ под ключ"
      },
      {
        title: "Эркерный бесшовный подоконник",
        details: ["Акриловый камень", "Primax S-5040 Pure White"],
        price: "от 55 000 ₽ под ключ"
      },
      {
        title: "Черный подоконник",
        details: ["Кварцевый агломерат", "Smart Quartz Negro Imperial"],
        price: "от 13 000 ₽ под ключ"
      }
    ],
    trustTitle: "Почему клиенты выбирают нас",
    trustCards: [
      {
        title: "Гарантируем качество",
        text: "Тщательно контролируем производство и монтаж, чтобы подоконник служил долго и выглядел аккуратно."
      },
      {
        title: "Соблюдаем сроки",
        text: "Планируем каждый этап заранее и держим связь с клиентом по статусу заказа."
      },
      {
        title: "Индивидуальный подход",
        text: "Подбираем материал и конструкцию под конкретный проем, интерьер и сценарий использования."
      }
    ],
    whyCards: [
      {
        title: "Долговечность",
        text: "Кварц устойчив к влаге, перепадам температуры и механическим воздействиям."
      },
      {
        title: "Легкий уход",
        text: "Непористая структура не впитывает загрязнения и запахи."
      },
      {
        title: "Гибкость в дизайне",
        text: "Подбираем оттенок и фактуру под окна, стены и общий стиль интерьера."
      }
    ],
    processTitle: "Как проходит заказ подоконников из искусственного камня",
    processSteps: [
      {
        step: "01. Заявка",
        text: "Обсуждаем задачу, размеры и желаемый стиль будущего подоконника."
      },
      {
        step: "02. Замер",
        text: "Выезжаем на объект, снимаем точные размеры и проверяем узлы примыкания."
      },
      {
        step: "03. Производство",
        text: "Изготавливаем изделие по согласованной конфигурации на собственном производстве."
      },
      {
        step: "04. Доставка и монтаж",
        text: "Доставляем и монтируем подоконник с контролем качества финишных работ."
      },
      {
        step: "05. Гарантия",
        text: "Фиксируем гарантийные обязательства на материал и монтаж."
      }
    ],
    finalTitle: "Хотите рассчитать подоконник в вашем проекте?",
    finalText:
      "Присылайте размеры и фото оконных зон. Подскажем оптимальное решение и рассчитаем стоимость под ключ."
  }
};

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params;
  const label = productTypeLabels[category];
  const landing = landingByCategory[category];

  if (!label) {
    return {};
  }

  return buildMetadata({
    title: landing?.metaTitle ?? `${label} из искусственного камня`,
    description: landing?.metaDescription ?? `${label} под заказ в Санкт-Петербурге с замером, изготовлением и монтажом.`,
    path: `/catalog/${category}`
  });
}

export async function generateStaticParams() {
  const products = await getProducts();
  const categories = [...new Set(products.map((item) => item.type))];
  return categories.map((category) => ({ category }));
}

export default async function CatalogCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const label = productTypeLabels[category];
  const landing = landingByCategory[category];

  if (!label) {
    notFound();
  }

  const products = await getProductsByType(category);
  const minPrice = products.length ? Math.min(...products.map((product) => product.basePrice)) : null;

  return (
    <>
      <PageHero
        eyebrow={landing ? landing.eyebrow : "Категория изделий"}
        title={landing?.heroTitle ?? `${label} из искусственного камня`}
        titleClassName="catalog-category-hero-title"
        visualImageSrc={landing?.heroImageSrc}
        visualImageAlt={landing?.heroImageAlt}
        description={
          landing?.heroDescription ??
          `Расширенная посадочная страница по направлению "${label}". Здесь собраны решения, примеры исполнения и переходы к карточкам изделий.`
        }
        actions={
          <>
            {landing?.showHeroBadges !== false && landing?.heroPriceFrom ? <span className="pill">{landing.heroPriceFrom}</span> : null}
            <Link className="button" href="/calculator">
              Рассчитать стоимость
            </Link>
            <Link className="button-secondary" href="/catalog-kamnya">
              Смотреть каталог камня
            </Link>
          </>
        }
      />

      {landing ? (
        <>
          <section className="section">
            <div className="container grid grid-2">
              <article className="card stack">
                <h2>{landing.introTitle}</h2>
                <div className="stack">
                  {landing.introText.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <h3>{landing.featureTitle}</h3>
                <p>{landing.featureIntro}</p>
                <div className="stack product-list">
                  {landing.sellingPoints.map((point) => (
                    <span key={point}>{point}</span>
                  ))}
                </div>
                {landing.quickLinks?.length ? (
                  <div className="btn-row">
                    {landing.quickLinks.map((item) => (
                      <Link key={item.label} className="button-ghost" href={item.href}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </article>
              <article className="card stack">
                <h2>{landing.pricingTitle}</h2>
                <div className="stack">
                  {landing.pricingText.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="btn-row">
                  <Link className="button" href="/contacts">
                    Узнать стоимость изделий
                  </Link>
                  <Link className="button-secondary" href="/calculator">
                    Рассчитать самостоятельно
                  </Link>
                </div>
                <h3>{landing.colorsTitle}</h3>
                <div className="stack">
                  {landing.colorsText.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {landing.showPopularColors !== false && landing.popularColors.length ? (
                  <div className="pill-list">
                    {landing.popularColors.map((item) => (
                      <span key={item} className="pill">
                        {item}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            </div>
          </section>

          <section className="section">
            <div className="container grid grid-3">
              <article className="card stack" style={{ gridColumn: "1 / -1" }}>
                <h2>{landing.showcaseTitle}</h2>
                <p>{landing.showcaseText}</p>
              </article>
              {landing.showcaseExamples.map((item) => (
                <article key={item.title} className="card stack">
                  <h3>{item.title}</h3>
                  <div className="stack product-list">
                    {item.details.map((detail) => (
                      <span key={detail}>{detail}</span>
                    ))}
                  </div>
                  <span className="pill">{item.price}</span>
                </article>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="container grid grid-3">
              <article className="card stack" style={{ gridColumn: "1 / -1" }}>
                <h2>{landing.trustTitle}</h2>
              </article>
              {landing.trustCards.map((item) => (
                <article key={item.title} className="card stack">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
              {landing.whyCards.map((item) => (
                <article key={item.title} className="card stack">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </section>
        </>
      ) : null}

      <section className="section">
        <div className="container grid grid-3">
          {products.map((product) => (
            <MediaCard
              key={product.id}
              href={`/catalog/${category}/${product.slug}`}
              title={product.title}
              description={product.summary}
              price={product.basePrice}
              meta={`${product.material} · ${product.thickness}`}
            />
          ))}
        </div>
      </section>

      {landing ? (
        <section className="section">
          <div className="container">
            <article className="card stack">
              <h2>{landing.processTitle}</h2>
              <div className="stack">
                {landing.processSteps.map((step) => (
                  <p key={step.step}>
                    <strong>{step.step}</strong> - {step.text}
                  </p>
                ))}
              </div>
            </article>
          </div>
        </section>
      ) : null}

      {landing ? (
        <section className="section">
          <div className="container">
            <article className="card stack">
              <h2>{landing.finalTitle}</h2>
              <p>{landing.finalText}</p>
              <div className="btn-row">
                <Link className="button" href="/contacts">
                  Оставить заявку
                </Link>
                <Link className="button-ghost" href="/calculator">
                  Перейти в калькулятор
                </Link>
              </div>
            </article>
          </div>
        </section>
      ) : null}
    </>
  );
}
