import type { MetadataRoute } from "next";
import { ROBOTS_CONFIG } from "@/siteconfig/seo.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: ROBOTS_CONFIG.rules,
    sitemap: ROBOTS_CONFIG.sitemap,
    host: ROBOTS_CONFIG.host,
  };
}
