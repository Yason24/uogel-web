import type { MetadataRoute } from "next";
import { pergolas } from "@/data/pergolas";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://uogel-russia.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/pergolas`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/calculate`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/contacts`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/options`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/how-to-order`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/delivery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/gallery`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const pergolaRoutes: MetadataRoute.Sitemap = pergolas.map((pergola) => ({
    url: `${siteUrl}/pergolas/${pergola.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...pergolaRoutes];
}
