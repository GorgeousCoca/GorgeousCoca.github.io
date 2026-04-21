"use client";

import { motion } from "framer-motion";

import styles from "./avantgarde-home.module.scss";

type ManifestItem = {
  title: string;
  text: string;
};

type ManifestoProps = {
  items: ManifestItem[];
};

export function Manifesto({ items }: ManifestoProps) {
  return (
    <section className={styles.section}>
      <div className={styles.manifestoGrid}>
        <motion.article
          className={`${styles.glassCard} ${styles.manifestoQuote}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6 }}
        >
          Мы не продаем камень.
          <br />
          <em>Мы создаем пространство, которое хочется трогать.</em>
        </motion.article>

        <motion.div
          className={`${styles.glassCard} ${styles.manifestoList}`}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              className={styles.manifestoItem}
              initial={{ opacity: 0, x: 22 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
