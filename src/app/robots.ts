import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Next.js internals — no value in crawl budget being spent here.
        disallow: ["/_next/", "/api/"],
      },
      // AI search crawler (ChatGPT search / Atlas). Allowed so the hospital's
      // verified NAP, hours and services stay answerable in AI search.
      // This permits search retrieval only, not model training (that is GPTBot,
      // which remains governed by the wildcard rule above).
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: ["/_next/", "/api/"],
      },
    ],
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
    host: siteConfig.url,
  };
}
