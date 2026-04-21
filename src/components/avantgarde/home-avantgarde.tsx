"use client";

import Link from "next/link";

import { ContactForm } from "@/components/forms/contact-form";
import type { CompanySettings, Product, Project, Service, Testimonial } from "@/types/content";

import styles from "./avantgarde-home.module.scss";
import { Hero } from "./hero";
import { ProcessTimeline } from "./process-timeline";

type HomeAvantgardeProps = {
  settings: CompanySettings;
  services: Service[];
  featuredProducts: Product[];
  featuredProjects: Project[];
  testimonials: Testimonial[];
  manifesto: { title: string; text: string }[];
  workflow: string[];
};

export function HomeAvantgarde({
  settings,
  services: _services,
  featuredProducts,
  featuredProjects: _featuredProjects,
  testimonials,
  manifesto: _manifesto,
  workflow
}: HomeAvantgardeProps) {
  const productGroups = [
    {
      title: "Столешницы",
      points: [
        "Для кухни и островов",
        "Для ванной комнаты",
        "Интегрированные мойки и фартуки",
        "Прямые и сложные формы"
      ],
      href: "/catalog/countertops",
      calcHref: "/calculator"
    },
    {
      title: "Подоконники",
      points: [
        "Классические и эркерные",
        "Подоконник-столешница",
        "Для жилых и коммерческих интерьеров",
        "Монтаж в один цикл"
      ],
      href: "/catalog/window-sills",
      calcHref: "/calculator"
    },
    {
      title: "Другие изделия",
      points: [
        "Столы и барные стойки",
        "Ресепшн и общественные зоны",
        "Стеновые панели и откосы",
        "Индивидуальные решения под проект"
      ],
      href: "/catalog",
      calcHref: "/calculator"
    }
  ];

  const visibleTestimonials = testimonials.slice(0, 6);

  return (
    <div className={styles.home}>
      <div className="container">
        <Hero
          title={settings.heroTitle}
          subtitle={settings.heroSubtitle}
          primaryCta={settings.primaryCta}
        />

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>Выполняем заказы любой сложности</h2>
            <p>По стандартным и индивидуальным размерам.</p>
          </div>
          <div className={styles.productGrid}>
            {productGroups.map((group) => (
              <article key={group.title} className={`${styles.glassCard} ${styles.productCard}`}>
                <h3>{group.title}</h3>
                <ul>
                  {group.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <div className="btn-row">
                  <Link className={styles.btnGhost} href={group.href}>
                    Подробнее
                  </Link>
                  <Link className={styles.btnPrimary} href={group.calcHref}>
                    Рассчитать стоимость
                  </Link>
                </div>
                <p className={styles.productPhone}>Или позвоните: {settings.phone}</p>
              </article>
            ))}
          </div>
        </section>

        <ProcessTimeline steps={workflow} />

        <section className={styles.section}>
          <div className={styles.contactGrid}>
            <article className={`${styles.glassCard} ${styles.contactSide}`}>
              <h2>Рассчитаем проект по вашим размерам</h2>
              <p>
                Оставьте заявку и получите расчет с подбором материала под ваш интерьер и бюджет.
              </p>
              <div className="pill-list">
                {featuredProducts.map((product) => (
                  <span key={product.id} className="pill">
                    {product.title}
                  </span>
                ))}
              </div>
              <div className="btn-row">
                <Link className={styles.btnGhost} href="/catalog">
                  Каталог
                </Link>
                <Link className={styles.btnGhost} href="/contacts">
                  Контакты
                </Link>
              </div>
              <p>Телефон: {settings.phone}</p>
              <p>Email: {settings.email}</p>
              <p>Адрес: {settings.address}</p>
            </article>
            <ContactForm source="home-avantgarde" className={styles.contactFormDark} />
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2>Отзывы клиентов</h2>
            <p>Реальные отклики по реализованным проектам.</p>
          </div>
          <div className={styles.reviewsGrid}>
            {visibleTestimonials.map((item) => (
              <article key={item.id} className={`${styles.glassCard} ${styles.reviewCard}`}>
                <p className={styles.reviewQuote}>&ldquo;{item.quote}&rdquo;</p>
                <p className={styles.reviewMeta}>
                  {item.author} - {item.role}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
