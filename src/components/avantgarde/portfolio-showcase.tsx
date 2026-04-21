"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import type { Project } from "@/types/content";

import styles from "./avantgarde-home.module.scss";

type PortfolioShowcaseProps = {
  projects: Project[];
};

export function PortfolioShowcase({ projects }: PortfolioShowcaseProps) {
  return (
    <section className={styles.section}>
      <div className={styles.portfolioWrap}>
        <div className={styles.servicesHead}>
          <h2>Работы / полноэкранная лента</h2>
          <p>Каждый кейс масштабируется как отдельная сцена, но остается привязан к заявке и продаже.</p>
        </div>
        <div className={styles.portfolioRail}>
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className={`${styles.glassCard} ${styles.portfolioCard}`}
              whileHover={{ scale: 1.015, y: -4 }}
              initial={{ opacity: 0, x: 22 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
            >
              <span>{project.category}</span>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <p>{project.location}</p>
              <div>
                <Link className={styles.btnPrimary} href={`/portfolio/${project.slug}`}>
                  Смотреть проект
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
