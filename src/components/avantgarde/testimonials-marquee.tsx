"use client";

import Link from "next/link";

import type { Testimonial } from "@/types/content";

import styles from "./avantgarde-home.module.scss";

type TestimonialsMarqueeProps = {
  testimonials: Testimonial[];
};

export function TestimonialsMarquee({ testimonials }: TestimonialsMarqueeProps) {
  const repeated = [...testimonials, ...testimonials];

  return (
    <section className={styles.section}>
      <div className={styles.calcReviews}>
        <article className={`${styles.glassCard} ${styles.calcCard}`}>
          <h3>Калькулятор / минималистичный вход в сделку</h3>
          <p>Быстрый расчет по размерам и сценарию использования без сложного интерфейса на первом шаге.</p>
          <div className={styles.calcMiniForm}>
            <input placeholder="Длина, мм" readOnly value="2400" />
            <input placeholder="Ширина, мм" readOnly value="600" />
            <input placeholder="Материал" readOnly value="Кварцевый агломерат" />
          </div>
          <Link className={styles.btnPrimary} href="/calculator">
            Открыть калькулятор
          </Link>
        </article>

        <article className={`${styles.glassCard} ${styles.reviewsCard}`}>
          <div className={styles.marquee}>
            {repeated.map((item, index) => (
              <span key={`${item.id}-${index}`} className={styles.reviewChip}>
                {item.quote}
                <span className={styles.reviewAuthor}>— {item.author}</span>
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
