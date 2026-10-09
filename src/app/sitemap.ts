import type { MetadataRoute } from "next";
import { departments } from "@/config/content";
import { siteConfig } from "@/config/site";

/**
 * Priorities reflect conversion value, not page count: the appointment page and
 * the two department pages are what local search should surface first.
 *
 * No `lastModified` is emitted: a build-time `new Date()` would stamp every
 * URL as "changed" on every deploy, which teaches crawlers to ignore the
 * signal. Reintroduce per-URL dates only if they are tied to real content
 * edits (e.g. a content-updated timestamp per route).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteConfig.url).toString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "monthly", priority: 1 },
    { url: url("/appointment"), changeFrequency: "monthly", priority: 0.95 },
    { url: url("/departments"), changeFrequency: "monthly", priority: 0.85 },
    { url: url("/doctors"), changeFrequency: "monthly", priority: 0.85 },
    { url: url("/services"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/contact"), changeFrequency: "yearly", priority: 0.75 },
    { url: url("/about"), changeFrequency: "yearly", priority: 0.7 },
  ];

  const departmentRoutes: MetadataRoute.Sitemap = departments.map((dept) => ({
    url: url(`/departments/${dept.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...departmentRoutes];
}
