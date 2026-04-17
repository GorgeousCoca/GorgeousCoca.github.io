import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, Gem, Handshake, ShieldCheck, Wrench } from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { MediaCard, SectionIntro } from "@/components/ui/content";
import { TestimonialsSlider } from "@/components/ui/testimonials-slider";
import { getFeaturedData, getServices, getSettings } from "@/lib/site";

const advantages = [
  {
    icon: Wrench,
    title: "Работа под ключ",
    text: "От первого замера до финального монтажа и сдачи результата."
  },
  {
    icon: ShieldCheck,
    title: "Гарантия на изделия",
    text: "Закрепляем гарантийные обязательства и понятные условия обслуживания."
  },
  {
    icon: Clock3,
    title: "Точные сроки",
    text: "Планируем производство без размытых обещаний и лишних переносов."
  },
  {
    icon: Gem,
    title: "Мастерство обработки",
    text: "Работаем со сложными кромками, мойками и нестандартной геометрией."
  },
  {
    icon: CheckCircle2,
    title: "Опыт в частных и коммерческих проектах",
    text: "Реализуем кухни, ванные, офисы, стойки reception и общественные зоны."
  },
  {
    icon: Handshake,
    title: "Клиентоориентированный подход",
    text: "Подбираем решение не под каталог, а под задачу и интерьер клиента."
  }
];

const workflow = [
  "Обсуждаем задачу, изделие и желаемый бюджет.",
  "Выезжаем на точный замер и согласуем техническое решение.",
  "Подбираем материал, профиль и комплект дополнительных опций.",
  "Изготавливаем изделие на производстве с контролем качества.",
  "Доставляем и монтируем в согласованное время."
];

export default async function HomePage() {
  const [settings, featured, services] = await Promise.all([getSettings(), getFeaturedData(), getServices()]);

  return (
    <>
      <section className="hero">
        <div className="container hero__grid">
          <div className="card hero__content stack">
            <span className="eyebrow">Премиальные изделия из искусственного камня</span>
            <h1 className="hero__title">{settings.heroTitle}</h1>
            <p>{settings.heroSubtitle}</p>
            <div className="btn-row">
              <Link className="button" href="/calculator">
                {settings.primaryCta}
              </Link>
              <Link className="button-secondary" href="/portfolio">
                Смотреть работы
              </Link>
            </div>
            <div className="stats">
              <div className="stat stack">
                <strong>10+ лет</strong>
                <span className="muted">в производстве и монтаже</span>
              </div>
              <div className="stat stack">
                <strong>5-10 дней</strong>
                <span className="muted">средний срок изготовления</span>
              </div>
              <div className="stat stack">
                <strong>100%</strong>
                <span className="muted">замер и монтаж своими мастерами</span>
              </div>
            </div>
          </div>
          <div className="hero__visual" aria-hidden="true" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionIntro
            eyebrow="Преимущества"
            title="Почему нам доверяют частные клиенты, дизайнеры и подрядчики"
            description="Сайт и процессы выстроены вокруг клиентского результата: предсказуемость, качество и комфортная коммуникация."
          />
          <div className="grid grid-3">
            {advantages.map(({ icon: Icon, title, text }) => (
              <article key={title} className="card stack">
                <Icon size={28} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionIntro
            eyebrow="Каталог продукции"
            title="Ключевые направления каталога"
            description="Основные категории собраны так, чтобы клиент быстро нашел нужный тип изделия и перешел к деталям."
          />
          <div className="grid grid-4">
            <MediaCard href="/catalog/countertops" title="Столешницы" description="Кухни, острова, ванные, коммерческие зоны." />
            <MediaCard href="/catalog/window-sills" title="Подоконники" description="Классические и расширенные решения под интерьер." />
            <MediaCard href="/catalog/sinks" title="Мойки и раковины" description="Бесшовные акриловые и интегрированные решения." />
            <MediaCard href="/catalog/profiles" title="Профили" description="Фаски, кромки и конструктивные решения для изделий." />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionIntro
            eyebrow="Наши работы"
            title="Реальные проекты в кварцевом агломерате и акриловом камне"
            description="Портфолио помогает оценить качество посадки, обработку кромок и стиль готовых решений."
          />
          <div className="grid grid-3">
            {featured.featuredProjects.map((project) => (
              <MediaCard
                key={project.id}
                href={`/portfolio/${project.slug}`}
                title={project.title}
                description={project.summary}
                label={project.category}
                meta={project.location}
              />
            ))}
          </div>
          <div className="btn-row" style={{ marginTop: 20 }}>
            <Link className="button-secondary" href="/portfolio">
              Перейти в портфолио
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-2">
          <div className="card stack">
            <SectionIntro
              eyebrow="Калькулятор стоимости"
              title="Узнайте примерную стоимость за пару минут"
              description="Быстрый предварительный расчет помогает понять бюджет и перейти к точной смете."
            />
            <div className="btn-row">
              <Link className="button" href="/calculator">
                Перейти к калькулятору
              </Link>
              <Link className="button-ghost" href="/contacts">
                Запросить точный расчет
              </Link>
            </div>
          </div>
          <div className="card stack workflow">
            <span className="eyebrow">Как мы работаем</span>
            {workflow.map((item) => (
              <div key={item} className="workflow-item">
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-2">
          <div>
            <SectionIntro
              eyebrow="Отзывы"
              title="Что говорят о нас после монтажа"
              description="Отзывы помогают снять тревожность перед заказом и показывают качество сервиса в реальных проектах."
            />
            <TestimonialsSlider items={featured.testimonials} />
          </div>
          <div className="stack">
            <SectionIntro
              eyebrow="Услуги"
              title="Полный цикл работ"
              description="Каждый этап можно заказать как часть комплексной услуги или как отдельную задачу."
            />
            <div className="grid">
              {services.slice(0, 3).map((service) => (
                <MediaCard
                  key={service.id}
                  href={`/services/${service.slug}`}
                  title={service.title}
                  description={service.shortDescription}
                  price={service.priceFrom}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid grid-2">
          <div className="card stack">
            <SectionIntro
              eyebrow="Контакты и карта"
              title="Покажите задачу, а мы предложим решение"
              description="Для предварительного расчета достаточно размеров, фото и пожеланий по материалу."
            />
            <div className="stack">
              <span>{settings.phone}</span>
              <span>{settings.email}</span>
              <span>
                {settings.address}, м. {settings.metro}
              </span>
            </div>
            <div className="map-wrap">
              <iframe src={settings.mapEmbedUrl} loading="lazy" title="Карта проезда" />
            </div>
          </div>
          <ContactForm source="home" />
        </div>
      </section>
    </>
  );
}
