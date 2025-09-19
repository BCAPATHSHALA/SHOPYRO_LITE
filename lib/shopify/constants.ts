// Store catalog constants
export const storeCatalog = {
  ids: "lamps,miscellaneous,pillows,rugs,seats,featured,mens,womens,top-seller",
  rootCategoryId: "joyco-root",
};

export const sortOptions = [
  { label: "Price-Low", value: "price-asc" },
  { label: "Price-High", value: "price-desc" },
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

// Chaching tags
export const TAGS = {
  mode: "mode",
  collections: "collections",
  products: "products",
  featuredProducts: "featured-products",
  collectionProducts: "collection-products",
  productRecommendations: "product-recommendations",
  cart: "cart",
};

export const DEFAULT_PAGE_SIZE = 15;
export const DEFAULT_SORT_KEY = "RELEVANCE";
export const FEATURED_PRODUCTS_LENGTH = 8;

// Shopify Storefront API Configuration
export const rawStoreDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
export const fallbackStoreDomain = "websyro-template.myshopify.com";

// Optional token support for production-grade usage
export const STOREFRONT_ACCESS_TOKEN =
  process.env.NEXT_PUBLIC_STOREFRONT_ACCESS_TOKEN ||
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
