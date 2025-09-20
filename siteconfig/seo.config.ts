/*
 * SEO Configuration for Static and Dynamic Routes
 * This file contains all SEO-related configurations for sitemap and robots.txt
 */

import type { Metadata } from "next";

export const SEO_CONFIG = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  defaultLocale: "en",
  locales: ["en"],
  siteName: "Shopyro",
  creator: "Shopyro Team",
  publisher: "Websyro Agency",
  twitterHandle: "@joinwebsyro",
};

// Base metadata configuration
const createBaseMetadata = (
  title: string,
  description: string,
  path = "/",
  type: "website" | "article" = "website",
  keywords: string[] = []
): Metadata => ({
  title,
  description,
  keywords: [
    "shopify",
    "nextjs",
    "headless commerce",
    "ecommerce",
    "react",
    "typescript",
    "tailwindcss",
    ...keywords,
  ],
  authors: [{ name: SEO_CONFIG.creator, url: SEO_CONFIG.siteUrl }],
  creator: SEO_CONFIG.creator,
  publisher: SEO_CONFIG.publisher,
  metadataBase: new URL(SEO_CONFIG.siteUrl),
  alternates: {
    canonical: `${SEO_CONFIG.siteUrl}${path}`,
  },
  openGraph: {
    title,
    description,
    url: `${SEO_CONFIG.siteUrl}${path}`,
    siteName: SEO_CONFIG.siteName,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${title} - ${SEO_CONFIG.siteName}`,
      },
    ],
    locale: "en_US",
    type,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description:
      description.length > 160
        ? description.substring(0, 157) + "..."
        : description,
    images: ["/og-image.png"],
    creator: SEO_CONFIG.twitterHandle,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
});

// Page-specific metadata configurations
export const PAGE_METADATA = {
  home: createBaseMetadata(
    "Shopyro - Next.js Shopify Headless Commerce Template",
    "Build lightning-fast e-commerce stores with our Next.js 15 and Shopify headless commerce template. Features modern design, TypeScript, and production-ready components.",
    "/",
    "website",
    [
      "shopify template",
      "headless commerce",
      "nextjs ecommerce",
      "react storefront",
    ]
  ),

  shop: createBaseMetadata(
    "Shop - Premium Products | Shopyro",
    "Discover our curated collection of premium products. Fast shipping, secure checkout, and exceptional customer service guaranteed.",
    "/shop",
    "website",
    ["online shop", "products", "buy online", "ecommerce store"]
  ),

  about: createBaseMetadata(
    "About Us - Our Story | Shopyro",
    "Learn about Shopyro's mission to revolutionize e-commerce with cutting-edge headless commerce solutions and exceptional developer experience.",
    "/about",
    "website",
    ["about us", "company story", "mission", "team"]
  ),

  contact: createBaseMetadata(
    "Contact Us - Get in Touch | Shopyro",
    "Have questions? Get in touch with our team. We're here to help with your e-commerce needs and provide exceptional support.",
    "/contact",
    "website",
    ["contact", "support", "help", "get in touch"]
  ),

  faq: createBaseMetadata(
    "FAQ - Frequently Asked Questions | Shopyro",
    "Find answers to common questions about our headless commerce template, setup process, customization options, and support services.",
    "/faq",
    "website",
    ["faq", "questions", "help", "support", "answers"]
  ),

  privacyPolicy: createBaseMetadata(
    "Privacy Policy | Shopyro",
    "Learn how Shopyro protects your privacy and handles your personal information. Our commitment to data security and transparency.",
    "/privacy-policy",
    "website",
    ["privacy policy", "data protection", "privacy", "gdpr"]
  ),

  termsConditions: createBaseMetadata(
    "Terms & Conditions | Shopyro",
    "Read our terms and conditions for using Shopyro template and services. Important legal information for users and customers.",
    "/terms-conditions",
    "website",
    ["terms", "conditions", "legal", "agreement"]
  ),

  returnPolicy: createBaseMetadata(
    "Return Policy | Shopyro",
    "Our hassle-free return policy ensures customer satisfaction. Learn about our return process, timeframes, and conditions.",
    "/return-policy",
    "website",
    ["return policy", "returns", "refunds", "customer service"]
  ),

  refundPolicy: createBaseMetadata(
    "Refund Policy | Shopyro",
    "Understand our refund policy and process. We're committed to ensuring customer satisfaction with clear refund guidelines.",
    "/refund-policy",
    "website",
    ["refund policy", "refunds", "money back", "customer service"]
  ),
} as const;

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
