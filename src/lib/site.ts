import { cache } from "react";

import { listCollection, getBySlug, getCompanySettings, readStore } from "@/lib/cms/store";
import type { ProductType, StoneType } from "@/types/content";

export const getProducts = cache(async () => listCollection("products"));
export const getStoneSamples = cache(async () => listCollection("stoneSamples"));
export const getProjects = cache(async () => listCollection("projects"));
export const getServices = cache(async () => listCollection("services"));
export const getBlogPosts = cache(async () => listCollection("blogPosts"));
export const getBlogCategories = cache(async () => listCollection("blogCategories"));
export const getTestimonials = cache(async () => listCollection("testimonials"));
export const getTeamMembers = cache(async () => listCollection("teamMembers"));
export const getCertificates = cache(async () => listCollection("certificates"));
export const getContactRequests = cache(async () => listCollection("contactRequests"));
export const getSettings = cache(async () => getCompanySettings());

export const getProductBySlug = cache(async (slug: string) => getBySlug("products", slug));
export const getStoneBySlug = cache(async (slug: string) => getBySlug("stoneSamples", slug));
export const getProjectBySlug = cache(async (slug: string) => getBySlug("projects", slug));
export const getServiceBySlug = cache(async (slug: string) => getBySlug("services", slug));
export const getBlogPostBySlug = cache(async (slug: string) => getBySlug("blogPosts", slug));

export async function getFeaturedData() {
  const store = await readStore();

  return {
    featuredProducts: store.products.filter((item) => item.isFeatured).slice(0, 4),
    featuredStones: store.stoneSamples.filter((item) => item.isFeatured).slice(0, 4),
    featuredProjects: store.projects.slice(0, 3),
    testimonials: store.testimonials.slice(0, 4)
  };
}

export async function getProductsByType(type: ProductType) {
  const products = await getProducts();
  return products.filter((item) => item.type === type);
}

export async function getStoneByType(type: StoneType) {
  const stones = await getStoneSamples();
  return stones.filter((item) => item.stoneType === type);
}
