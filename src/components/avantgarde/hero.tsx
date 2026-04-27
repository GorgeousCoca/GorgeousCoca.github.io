"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import styles from "./avantgarde-home.module.scss";

type HeroProps = {
  title: string;
  subtitle: string;
  primaryCta: string;
};

export function Hero({ title, subtitle, primaryCta }: HeroProps) {
  const heroBenefits = [
    {
      title: "Собственное производство",
      text: "Контроль заказа на всех этапах: от заявки до установки."
    },
    {
      title: "Точный подбор декора",
      text: "Подберем оптимальный оттенок и фактуру кварцевого агломерата."
    },
    {
      title: "Гарантия качества",
      text: "Фиксируем сроки и отвечаем за результат монтажа."
    }
  ];

  return (
    <section className={`${styles.section} ${styles.heroSection}`}>
      <div className={styles.heroWrap}>
        <div className={styles.heroInner}>
          <div className={styles.heroLayout}>
            <div className={styles.heroMain}>
              <div className={styles.heroTitle}>
                Создаем поверхности, которые <span className={styles.heroStrike}>«просто продаются»</span>{" "}
                вдохновляют.
              </div>
              <p className={styles.heroSub}>
                {title}. {subtitle}
              </p>
              <div className={styles.heroBenefits}>
                {heroBenefits.map((item) => (
                  <article key={item.title} className={styles.heroBenefit}>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
              <div className={styles.heroActions}>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                  <Link className={styles.btnPrimary} href="/calculator">
                    {primaryCta}
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                  <Link className={styles.btnGhost} href="/portfolio">
                    Портфолио проектов
                  </Link>
                </motion.div>
              </div>
              <div className={styles.heroCoords}>
                <span>59.9343° N, 30.3351° E</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
