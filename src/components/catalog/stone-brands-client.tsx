"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { formatPrice } from "@/lib/utils";
import type { StoneBrand } from "@/lib/stone/brands";
import type { StoneSample } from "@/types/content";

import styles from "./stone-brands.module.scss";

type StoneBrandsClientProps = {
  stones: StoneSample[];
  brands: StoneBrand[];
};

const swatchBackgrounds = [
  "linear-gradient(140deg, #0f2c27, #051310)",
  "linear-gradient(140deg, #11322c, #071913)",
  "linear-gradient(140deg, #0e2924, #04110f)",
  "linear-gradient(140deg, #1b1d22, #050608)",
  "linear-gradient(140deg, #143730, #071b17)",
  "linear-gradient(140deg, #0b2420, #040f0d)"
];

function cardTone(stone: StoneSample, index: number) {
  if (stone.title.toLowerCase().includes("black") || stone.color.toLowerCase().includes("чер")) {
    return "linear-gradient(140deg, #1b1d22, #030406)";
  }
  if (stone.finish.toLowerCase().includes("мат") || stone.color.toLowerCase().includes("white")) {
    return "linear-gradient(140deg, #22413b, #0b211d)";
  }
  return swatchBackgrounds[index % swatchBackgrounds.length];
}

export function StoneBrandsClient({ stones, brands }: StoneBrandsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeBrand = searchParams.get("brand");
  const [brandQuery, setBrandQuery] = useState("");

  function applyBrandFilter(nextBrand: string | null) {
    const next = new URLSearchParams(searchParams.toString());
    if (nextBrand) {
      next.set("brand", nextBrand);
    } else {
      next.delete("brand");
    }
    const query = next.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  const visibleBrands = useMemo(() => {
    const query = brandQuery.trim().toLowerCase();
    if (!query) {
      return brands;
    }
    return brands.filter((brand) => brand.name.toLowerCase().includes(query));
  }, [brandQuery, brands]);
  const hintedBrands = visibleBrands.slice(0, 8);

  const filtered = useMemo(() => {
    if (!activeBrand) {
      return stones.filter((stone) => stone.isFeatured).slice(0, 24);
    }
    const activeBrandName = brands.find((item) => item.slug === activeBrand)?.name;
    return activeBrandName ? stones.filter((stone) => stone.manufacturer === activeBrandName) : stones;
  }, [activeBrand, brands, stones]);

  return (
    <section className={styles.catalogSurface}>
      <div className={styles.brandFilterRow}>
        <div className={`card ${styles.brandFilterCard}`}>
          <div className={styles.unifiedHead}>
            <span className="eyebrow">Каталог кварца по брендам</span>
            <h1>Кварцевый агломерат - каталог цветов</h1>
            <p>
              Выберите бренд через поиск или селект. Ниже появятся декоры с ценами и переходом в карточку
              материала.
            </p>
          </div>

          <div className={styles.filterGrid}>
            <label className="stack">
              <span>Название бренда</span>
              <input
                className="field"
                placeholder="Например: Caesarstone, Avant, Belenco"
                value={brandQuery}
                onChange={(event) => setBrandQuery(event.target.value)}
              />
            </label>
            <label className="stack">
              <span>Выбранный бренд</span>
              <select
                className="select"
                value={activeBrand ?? ""}
                onChange={(event) => {
                  applyBrandFilter(event.target.value || null);
                }}
              >
                <option value="">Все бренды</option>
                {visibleBrands.map((brand) => (
                  <option key={brand.slug} value={brand.slug}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {brandQuery ? (
            <div className={styles.hintsWrap}>
              {hintedBrands.length ? (
                hintedBrands.map((brand) => (
                  <button
                    key={brand.slug}
                    className={styles.hintChip}
                    type="button"
                    onClick={() => {
                      setBrandQuery(brand.name);
                      applyBrandFilter(brand.slug);
                    }}
                  >
                    {brand.name}
                    <span className={styles.brandCount}>{brand.count}</span>
                  </button>
                ))
              ) : (
                <span className={styles.emptyHint}>Ничего не найдено. Уточните название бренда.</span>
              )}
            </div>
          ) : null}

          {activeBrand ? (
            <button className="button-ghost" type="button" onClick={() => applyBrandFilter(null)}>
              Сбросить бренд
            </button>
          ) : null}
        </div>
      </div>

      <div className={styles.benefitsGrid}>
        <article className={styles.benefitCard}>
          <strong>Высокая прочность</strong>
          <span>Кварцевый агломерат устойчив к механическим нагрузкам, потертостям и царапинам.</span>
        </article>
        <article className={styles.benefitCard}>
          <strong>Отсутствие пор</strong>
          <span>Однородная структура не впитывает запахи и жидкости, поверхность легко поддерживать в чистоте.</span>
        </article>
        <article className={styles.benefitCard}>
          <strong>Стойкость к химии</strong>
          <span>Материал стабилен при контакте с бытовыми кислотами и щелочами в рамках повседневного использования.</span>
        </article>
        <article className={styles.benefitCard}>
          <strong>Температурная стойкость</strong>
          <span>Поверхность устойчива к горячей посуде, не теряет геометрию и внешний вид.</span>
        </article>
      </div>

      <div className={styles.stonesHead}>
        <strong>{activeBrand ? "Материалы выбранного бренда" : "Витрина популярных декоров"}</strong>
        <span>{filtered.length} позиций</span>
      </div>

      <div className={styles.swatchesGrid}>
        {filtered.map((stone, index) => (
          <article key={stone.id} className={styles.swatchCard} style={{ background: cardTone(stone, index) }}>
            <div className={styles.swatchInner}>
              <span className={styles.swatchTitle}>{stone.title}</span>
              <span className={styles.swatchMeta}>
                {stone.priceFrom ? `от ${formatPrice(stone.priceFrom)} ₽/м²` : "от — ₽/м²"}
              </span>
              <Link className={styles.swatchAction} href={`/catalog-kamnya/${stone.stoneType}/${stone.slug}`} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
