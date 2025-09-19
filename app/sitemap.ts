import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/shopify";
import { SEO_CONFIG, STATIC_ROUTES } from "@/siteconfig/seo.config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SEO_CONFIG.siteUrl;

  // Static routes from configuration
  const staticRoutes = STATIC_ROUTES.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFreq,
    priority: route.priority,
  }));

  // Dynamic product routes
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getProducts({});
    productRoutes = products.map((product) => ({
      url: `${baseUrl}/product/${product.handle}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error fetching products for sitemap:", error);
  }

  return [...staticRoutes, ...productRoutes];
}
