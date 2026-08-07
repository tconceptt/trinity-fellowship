import type { MetadataRoute } from "next";
import { siteConfig } from "@/app/lib/site-config";

const routes = [
  "",
  "/about",
  "/pastors",
  "/beliefs",
  "/membership",
  "/children",
  "/college",
  "/visit",
  "/visit/what-to-expect",
  "/give",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
