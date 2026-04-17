import type { MetadataRoute } from "next";

import { getBlogPosts, getProducts, getProjects, getServices, getStoneSamples } from "@/lib/site";
import { absoluteUrl } from "@/lib/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, stones, projects, services, posts] = await Promise.all([
    getProducts(),
    getStoneSamples(),
    getProjects(),
    getServices(),
    getBlogPosts()
  ]);

  const staticRoutes = [
    "/",
    "/catalog",
    "/catalog-kamnya",
    "/portfolio",
    "/calculator",
    "/services",
    "/about",
    "/contacts",
    "/blog",
    "/privacy"
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route),
      changeFrequency: "weekly" as const,
      priority: route === "/" ? 1 : 0.8
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/catalog/${product.type}/${product.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.8
    })),
    ...stones.map((stone) => ({
      url: absoluteUrl(`/catalog-kamnya/${stone.stoneType}/${stone.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.75
    })),
    ...projects.map((project) => ({
      url: absoluteUrl(`/portfolio/${project.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7
    })),
    ...services.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.75
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.7
    }))
  ];
}
