"use client";

import { useSearchParams } from "next/navigation";

import { MediaCard } from "@/components/ui/content";
import type { Project } from "@/types/content";

export function PortfolioListClient({ projects }: { projects: Project[] }) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const filtered = category ? projects.filter((project) => project.category === category) : projects;

  return (
    <div className="grid grid-3">
      {filtered.map((project) => (
        <MediaCard
          key={project.id}
          href={`/portfolio/${project.slug}`}
          title={project.title}
          description={project.summary}
          label={project.category}
          meta={project.location}
        />
      ))}
    </div>
  );
}
