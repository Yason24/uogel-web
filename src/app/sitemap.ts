import type { MetadataRoute } from "next";
import { pergolas } from "@/data/pergolas";
import { options } from "@/data/options";
import { projects } from "@/data/projects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://uogel-russia.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/catalog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.95 },
    { url: `${siteUrl}/pergolas`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/options`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/calculate`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/contacts`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/how-to-order`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/delivery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.75 },
  ];

  const pergolaRoutes: MetadataRoute.Sitemap = pergolas.map((p) => ({
    url: `${siteUrl}/pergolas/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const optionRoutes: MetadataRoute.Sitemap = options.map((o) => ({
    url: `${siteUrl}/options/${o.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [...staticRoutes, ...pergolaRoutes, ...optionRoutes, ...projectRoutes];
}
