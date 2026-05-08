"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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

  const visualRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  /** Блок в зоне видимости — дальше ждём задержку перед загрузкой ролика. */
  const [heroVisualVisible, setHeroVisualVisible] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const [videoRevealed, setVideoRevealed] = useState(false);

  useEffect(() => {
    const root = visualRef.current;
    if (!root) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHeroVisualVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px 0px", threshold: 0.01 }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!heroVisualVisible) {
      return;
    }
    const delayTimer = window.setTimeout(() => {
      setLoadVideo(true);
    }, 1500);
    return () => clearTimeout(delayTimer);
  }, [heroVisualVisible]);

  useEffect(() => {
    if (!loadVideo) {
      return;
    }
    const video = videoRef.current;
    if (!video) {
      return;
    }

    let revealed = false;
    const reveal = () => {
      if (revealed) {
        return;
      }
      revealed = true;
      void video.play().catch(() => {});
      requestAnimationFrame(() => setVideoRevealed(true));
    };

    let fallbackTimer: number | undefined;
    const onLoadedData = () => {
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer);
      }
      reveal();
    };

    video.load();
    video.addEventListener("loadeddata", onLoadedData, { once: true });
    fallbackTimer = window.setTimeout(reveal, 2800);

    return () => {
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer);
      }
      video.removeEventListener("loadeddata", onLoadedData);
    };
  }, [loadVideo]);

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
            </div>
            <aside ref={visualRef} className={styles.heroVisual} aria-label="Видео производства">
              <video
                ref={videoRef}
                className={`${styles.heroVideo} ${videoRevealed ? styles.heroVideoVisible : ""}`.trim()}
                loop
                muted
                playsInline
                preload="none"
                poster="/images/Производство.webp"
              >
                {loadVideo ? <source src="/images/Видио-производства.mp4" type="video/mp4" /> : null}
              </video>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
