"use client";

import { motion } from "framer-motion";

import styles from "./avantgarde-home.module.scss";

type ProcessTimelineProps = {
  steps: string[];
};

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <section className={styles.section}>
      <div className={styles.timelineWrap}>
        <div className={styles.servicesHead}>
          <h2>Как проходит работа</h2>
          <p>Каждый этап фиксируется в центре внимания: от первой заявки до аккуратного монтажа.</p>
        </div>
        <div className={styles.timelineTrack}>
          {steps.map((step, index) => (
            <div key={step} className={styles.timelineItem}>
              <span className={styles.timelineDot} />
              <motion.div
                className={`${styles.glassCard} ${styles.timelineBody}`}
                initial={{ opacity: 0.35, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4 }}
              >
                <span className={styles.timelineStep}>Step {String(index + 1).padStart(2, "0")}</span>
                <h3>{step}</h3>
                <p>Клиент получает прозрачный прогресс, дедлайны и контроль качества на каждом этапе.</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
