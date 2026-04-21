"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

import styles from "./avantgarde-home.module.scss";

type HeroProps = {
  title: string;
  subtitle: string;
  primaryCta: string;
};

export function Hero({ title, subtitle, primaryCta }: HeroProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 58, damping: 18, mass: 0.72 });
  const smoothY = useSpring(mouseY, { stiffness: 58, damping: 18, mass: 0.72 });
  const titleX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const titleY = useTransform(smoothY, [-0.5, 0.5], [-4, 4]);
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
      <div
        className={styles.heroWrap}
        onMouseMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5;
          const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5;
          mouseX.set(relativeX);
          mouseY.set(relativeY);
        }}
      >
        <motion.div 
          className={styles.heroBackground}
          style={{ x: useTransform(smoothX, [-0.5, 0.5], [-14, 14]), y: useTransform(smoothY, [-0.5, 0.5], [-8, 8]) }}
        />
        <div className={styles.heroInner}>
          <div className={styles.heroLayout}>
            <div className={styles.heroMain}>
              <motion.div style={{ x: titleX, y: titleY }} className={styles.heroTitle}>
                Создаем поверхности, которые <span className={styles.heroStrike}>«просто продаются»</span>{" "}
                вдохновляют.
              </motion.div>
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
