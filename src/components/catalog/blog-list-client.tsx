"use client";

import { useSearchParams } from "next/navigation";

import { MediaCard } from "@/components/ui/content";
import type { BlogCategory, BlogPost } from "@/types/content";

type BlogListClientProps = {
  posts: BlogPost[];
  categories: BlogCategory[];
};

export function BlogListClient({ posts, categories }: BlogListClientProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const filtered = category ? posts.filter((post) => post.categoryId === category) : posts;

  return (
    <div className="grid grid-3">
      {filtered.map((post) => {
        const categoryItem = categories.find((item) => item.id === post.categoryId);

        return (
          <MediaCard
            key={post.id}
            href={`/blog/${post.slug}`}
            title={post.title}
            description={post.excerpt}
            label={categoryItem?.title}
            meta={new Date(post.publishedAt).toLocaleDateString("ru-RU")}
            imageUrl="/images/quartz-surface-light.svg"
          />
        );
      })}
    </div>
  );
}
