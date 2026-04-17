"use client";

import { useSearchParams } from "next/navigation";

import { EmptyState, MediaCard } from "@/components/ui/content";
import { filterStoneSamples, stoneTypeLabels } from "@/lib/filters/catalog";
import type { StoneSample } from "@/types/content";

export function StoneListClient({ stones }: { stones: StoneSample[] }) {
  const searchParams = useSearchParams();

  const filtered = filterStoneSamples(stones, {
    type: searchParams.get("type") ?? undefined,
    color: searchParams.get("color") ?? undefined,
    texture: searchParams.get("texture") ?? undefined,
    manufacturer: searchParams.get("manufacturer") ?? undefined
  });

  return filtered.length ? (
    <div className="grid grid-3">
      {filtered.map((stone) => (
        <MediaCard
          key={stone.id}
          href={`/catalog-kamnya/${stone.stoneType}/${stone.slug}`}
          title={stone.title}
          description={stone.description}
          label={stoneTypeLabels[stone.stoneType]}
          meta={`${stone.manufacturer} · ${stone.thicknesses.join(", ")}`}
        />
      ))}
    </div>
  ) : (
    <EmptyState title="Подходящих образцов не найдено" description="Измените фильтры и попробуйте снова." />
  );
}
