/*
 * SEO Configuration for Static and Dynamic Routes
 * This file contains all SEO-related configurations for sitemap and robots.txt
 */

export const SEO_CONFIG = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  defaultLocale: "en",
  locales: ["en"],
};

// Static routes for sitemap
export const STATIC_ROUTES = [
  {
    url: "/",
    changeFreq: "daily" as const,
    priority: 1.0,
    lastModified: new Date().toISOString(),
  },
  {
    url: "/shop",
    changeFreq: "daily" as const,
    priority: 0.9,
    lastModified: new Date().toISOString(),
  },
  {
    url: "/about",
    changeFreq: "monthly" as const,
    priority: 0.8,
    lastModified: new Date().toISOString(),
  },
  {
    url: "/contact",
    changeFreq: "monthly" as const,
    priority: 0.7,
    lastModified: new Date().toISOString(),
  },
  {
    url: "/faq",
    changeFreq: "monthly" as const,
    priority: 0.6,
    lastModified: new Date().toISOString(),
  },
  {
    url: "/privacy-policy",
    changeFreq: "yearly" as const,
    priority: 0.3,
    lastModified: new Date().toISOString(),
  },
  {
    url: "/terms-conditions",
    changeFreq: "yearly" as const,
    priority: 0.3,
    lastModified: new Date().toISOString(),
  },
  {
    url: "/return-policy",
    changeFreq: "yearly" as const,
    priority: 0.4,
    lastModified: new Date().toISOString(),
  },
  {
    url: "/refund-policy",
    changeFreq: "yearly" as const,
    priority: 0.4,
    lastModified: new Date().toISOString(),
  },
];

// Robots.txt configuration
export const ROBOTS_CONFIG = {
  rules: [
    {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/admin/", "/_next/", "/cart"],
    },
  ],
  sitemap: `${SEO_CONFIG.siteUrl}/sitemap.xml`,
  host: SEO_CONFIG.siteUrl,
};
