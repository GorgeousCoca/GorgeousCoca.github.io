"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import styles from "./brand-carousels.module.scss";

type BrandGroup = {
  brand: string;
  images: { src: string; alt: string }[];
};

const brandGroups: BrandGroup[] = [
  {
    brand: "Avant",
    images: [
      { src: "/images/portfolio-brands/avant-01.png", alt: "Avant: реализованный проект 1" },
      { src: "/images/portfolio-brands/avant-02.png", alt: "Avant: реализованный проект 2" },
      { src: "/images/portfolio-brands/avant-03.png", alt: "Avant: реализованный проект 3" }
    ]
  },
  {
    brand: "Avarus",
    images: [
      { src: "/images/portfolio-brands/avarus-01.png", alt: "Avarus: реализованный проект 1" },
      { src: "/images/portfolio-brands/avarus-02.png", alt: "Avarus: реализованный проект 2" }
    ]
  },
  {
    brand: "Nobel",
    images: [
      { src: "/images/portfolio-brands/nobel-01.png", alt: "Nobel: реализованный проект 1" },
      { src: "/images/portfolio-brands/nobel-02.png", alt: "Nobel: реализованный проект 2" },
      { src: "/images/portfolio-brands/nobel-03.png", alt: "Nobel: реализованный проект 3" }
    ]
  }
];

export function BrandCarousels() {
  const [indices, setIndices] = useState<Record<string, number>>(
    () => Object.fromEntries(brandGroups.map((group) => [group.brand, 0])) as Record<string, number>
  );

  function shift(brand: string, total: number, direction: -1 | 1) {
    setIndices((current) => {
      const active = current[brand] ?? 0;
      const next = (active + direction + total) % total;
      return { ...current, [brand]: next };
    });
  }

  return (
    <section className={styles.section}>
      <div className={styles.head}>
        <h2>Реальные проекты с наших площадок</h2>
        <div className={styles.headMeta}>
          <p>Фото выполненных работ из нашей группы в VK от реальных клиентов</p>
          <Link
            href="https://vk.com/club230045850?ysclid=mo5ny4mikt343003951"
            target="_blank"
            rel="noreferrer"
            className={styles.vkLink}
            aria-label="Перейти в группу VK"
          >
            <Image src="/images/vk-logo.svg" alt="VK" width={26} height={26} />
          </Link>
        </div>
      </div>
      <div className={styles.grid}>
        {brandGroups.map((group) => {
          const active = indices[group.brand] ?? 0;
          const item = group.images[active];
          return (
            <article key={group.brand} className={styles.card}>
              <div className={styles.cardHead}>
                <strong>{group.brand}</strong>
                <span>
                  {active + 1} / {group.images.length}
                </span>
              </div>
              <div className={styles.visualWrap}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 900px) 100vw, 33vw"
                  className={styles.image}
                />
              </div>
              <div className={styles.actions}>
                <button type="button" onClick={() => shift(group.brand, group.images.length, -1)}>
                  Назад
                </button>
                <button type="button" onClick={() => shift(group.brand, group.images.length, 1)}>
                  Вперед
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
