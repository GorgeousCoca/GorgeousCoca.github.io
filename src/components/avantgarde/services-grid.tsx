"use client";

import Link from "next/link";
import type { ComponentType } from "react";
import {
  Drill,
  Gem,
  Palette,
  Ruler,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench
} from "lucide-react";
import { motion } from "framer-motion";

import type { Service } from "@/types/content";

import styles from "./avantgarde-home.module.scss";

type ServiceCard = {
  title: string;
  description: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

const catalogItems: ServiceCard[] = [
  {
    title: "Столешницы",
    description: "Кухни, острова, ванные и коммерческие поверхности из кварцевого агломерата.",
    href: "/catalog/countertops",
    icon: Gem
  },
  {
    title: "Подоконники",
    description: "Классические и расширенные решения под интерьер и рабочие сценарии.",
    href: "/catalog/window-sills",
    icon: Ruler
  },
  {
    title: "Мойки",
    description: "Интегрированные варианты с чистой геометрией и аккуратными швами.",
    href: "/catalog/sinks",
    icon: Sparkles
  },
  {
    title: "Профили",
    description: "Кромки, фаски и выразительные конструктивные акценты под задачу.",
    href: "/catalog/profiles",
    icon: Drill
  }
];

const serviceIcons: Record<string, ComponentType<{ className?: string }>> = {
  zamer: Ruler,
  "dizayn-proekt": Palette,
  izgotovlenie: Wrench,
  dostavka: Truck,
  montazh: ShieldCheck
};

type ServicesGridProps = {
  services: Service[];
};

export function ServicesGrid({ services }: ServicesGridProps) {
  const items: ServiceCard[] = [
    ...catalogItems,
    ...services.slice(0, 5).map((service) => ({
      title: service.title,
      description: service.shortDescription,
      href: `/services/${service.slug}`,
      icon: serviceIcons[service.slug] ?? Sparkles
    }))
  ];

  return (
    <section className={styles.section}>
      <div className={styles.servicesHead}>
        <h2>Каталог и услуги / в новой геометрии</h2>
        <p>Асимметричная система карточек сохраняет коммерческий смысл и делает подачу музейно-точной.</p>
      </div>
      <div className={styles.servicesGrid}>
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={`${item.title}-${index}`}
              className={`${styles.glassCard} ${styles.serviceCard}`}
              whileHover={{ y: -8, scale: 1.01, rotateX: 2 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
            >
              <Icon className={styles.serviceIcon} />
              <div>
                <div className={styles.serviceTitle}>{item.title}</div>
                <motion.p className={styles.serviceReveal} initial={{ opacity: 0.62 }} whileHover={{ opacity: 1 }}>
                  {item.description}
                </motion.p>
              </div>
              <Link className={styles.btnGhost} href={item.href}>
                Открыть
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
