import Link from "next/link";

import { formatPrice } from "@/lib/utils";
import type { StoneSample } from "@/types/content";

import styles from "./stone-brands.module.scss";

type BrandStonesGridProps = {
  stones: StoneSample[];
};

const tones = [
  "linear-gradient(140deg, #f0f0f0, #d4d8dd)",
  "linear-gradient(140deg, #d3d6d9, #b9bdbf)",
  "linear-gradient(140deg, #dad4c6, #c2b8a3)",
  "linear-gradient(140deg, #1d1f24, #050608)",
  "linear-gradient(140deg, #efe8dc, #d2c6b7)",
  "linear-gradient(140deg, #cfd4da, #b2bbc4)"
];

function tone(stone: StoneSample, index: number) {
  if (stone.title.toLowerCase().includes("black") || stone.color.toLowerCase().includes("чер")) {
    return "linear-gradient(140deg, #1b1d22, #030406)";
  }
  return tones[index % tones.length];
}

export function BrandStonesGrid({ stones }: BrandStonesGridProps) {
  return (
    <div className={styles.swatchesGrid}>
      {stones.map((stone, index) => (
        <article key={stone.id} className={styles.swatchCard} style={{ background: tone(stone, index) }}>
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
  );
}
