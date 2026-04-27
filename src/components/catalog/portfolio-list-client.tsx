"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import { MediaCard } from "@/components/ui/content";
import type { Project } from "@/types/content";

export function PortfolioListClient({ projects }: { projects: Project[] }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const filtered = category ? projects.filter((project) => project.category === category) : projects;

  return (
    <div className="portfolio-bento">
      {filtered.map((project, index) => (
        <motion.div
          key={project.id}
          className={`portfolio-bento__wrap ${index === 0 ? "card--featured" : ""}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
        >
          <MediaCard
            className="portfolio-bento__card"
            href={`/portfolio/${project.slug}`}
            title={project.title}
            description={project.summary}
            label={project.category}
            meta={project.location}
            imageUrl="/images/quartz-project-composition.svg"
          />
        </motion.div>
      ))}
    </div>
  );
}
