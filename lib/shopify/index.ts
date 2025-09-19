import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { TAGS } from "./constants";
import {
  getCollections as getShopifyCollections,
  getProducts as getShopifyProducts,
  getCollectionProducts as getShopifyCollectionProducts,
  getProduct as getShopifyProduct,
  getProductRecommendations as getShopifyProductRecommendations,
  createCart,
  addCartLines,
  updateCartLines,
  removeCartLines,
} from "./shopify";
import { thumbhashToDataURL } from "./utils";
import type {
  ShopifyProduct,
  ShopifyCollection,
  Product,
  Collection,
  Cart,
  ProductOption,
  ProductVariant,
  Money,
  ProductCollectionSortKey,
  ProductSortKey,
} from "./types";
import { FEATURED_PRODUCTS_LENGTH } from "./constants";

// Utility function to extract the first sentence from a description
function getFirstSentence(text: string): string {
  if (!text) return "";

  const cleaned = text.trim();
  const match = cleaned.match(/^[^.!?]*[.!?]/);

  if (match) {
    return match[0].trim();
  }

  if (cleaned.length > 100) {
    return cleaned.substring(0, 100).trim() + "...";
  }

  return cleaned;
}

// Helper functions for consistent data transformation

function transformShopifyMoney(
  shopifyMoney: { amount: string; currencyCode: string } | undefined
): Money {
  return {
    amount: shopifyMoney?.amount || "0",
    currencyCode: shopifyMoney?.currencyCode || "USD",
  };
}

function transformShopifyOptions(
  shopifyOptions: Array<{ id?: string; name: string; values: string[] }>
): ProductOption[] {
  return shopifyOptions.map((option) => ({
    id: option.id || option.name.toLowerCase().replace(/\s+/g, "-"),
    name: option.name,
    values: option.values.map((value) => ({
      id: value.toLowerCase().replace(/\s+/g, "-"),
      name: value,
    })),
  }));
}

function transformShopifyVariants(
  shopifyVariants: { edges: Array<{ node: any }> } | undefined
): ProductVariant[] {
  if (!Array.isArray(shopifyVariants?.edges)) return [];

  return shopifyVariants.edges.map((edge) => ({
    id: edge.node.id,
    title: edge.node.title || "",
    availableForSale: edge.node.availableForSale !== false,
    price: transformShopifyMoney(edge.node.price),
    selectedOptions: edge.node.selectedOptions || [],
  }));
}

// Main adapter functions
function adaptShopifyCollection(
  shopifyCollection: ShopifyCollection
): Collection {
  return {
    ...shopifyCollection,
    seo: {
      title: shopifyCollection.title,
      description: shopifyCollection.description || "",
    },
    parentCategoryTree: [],
    updatedAt: new Date().toISOString(),
    path: `/shop/${shopifyCollection.handle}`,
  };
}

function adaptShopifyProduct(shopifyProduct: ShopifyProduct): Product {
  const firstImage = shopifyProduct.images?.edges?.[0]?.node;
  const description = getFirstSentence(shopifyProduct.description || "");

  return {
    ...shopifyProduct,
    description,
    categoryId: shopifyProduct.productType || shopifyProduct.category?.name,
    productType: shopifyProduct.productType,
    tags: [],
    availableForSale: true,
    currencyCode:
      shopifyProduct.priceRange?.minVariantPrice?.currencyCode || "USD",
    featuredImage: firstImage
      ? {
          ...firstImage,
          altText: firstImage.altText || shopifyProduct.title || "",
          height: 600,
          width: 600,
          thumbhash: firstImage.thumbhash
            ? thumbhashToDataURL(firstImage.thumbhash)
            : undefined,
        }
      : { url: "", altText: "", height: 0, width: 0 },
    seo: {
      title: shopifyProduct.title || "",
      description,
    },
    priceRange: {
      minVariantPrice: transformShopifyMoney(
        shopifyProduct.priceRange?.minVariantPrice
      ),
      maxVariantPrice: transformShopifyMoney(
        shopifyProduct.priceRange?.minVariantPrice
      ),
    },
    compareAtPrice:
      shopifyProduct.compareAtPriceRange?.minVariantPrice &&
      Number.parseFloat(
        shopifyProduct.compareAtPriceRange.minVariantPrice.amount
      ) >
        Number.parseFloat(
          shopifyProduct.priceRange?.minVariantPrice?.amount || "0"
        )
        ? transformShopifyMoney(
            shopifyProduct.compareAtPriceRange.minVariantPrice
          )
        : undefined,
    images:
      shopifyProduct.images?.edges?.map((edge) => ({
        ...edge.node,
        altText: edge.node.altText || shopifyProduct.title || "",
        height: 600,
        width: 600,
        thumbhash: edge.node.thumbhash
          ? thumbhashToDataURL(edge.node.thumbhash)
          : undefined,
      })) || [],
    options: transformShopifyOptions(shopifyProduct.options || []),
    variants: transformShopifyVariants(shopifyProduct.variants),
  };
}

// Cart adapting happens in server actions to avoid cyclic deps

// Public API functions
export async function getCollections(): Promise<Collection[]> {
  "use cache";
  cacheTag(TAGS.collections);
  cacheLife("minutes");

  try {
    const shopifyCollections = await getShopifyCollections();
    const adaptShopify = shopifyCollections.map(adaptShopifyCollection);
    return adaptShopify;
  } catch (error) {
    console.error("Error fetching collections:", error);
    return [];
  }
}

export async function getCollection(
  handle: string
): Promise<Collection | null> {
  "use cache";
  cacheTag(TAGS.collections);
  cacheLife("minutes");

  try {
    const collections = await getShopifyCollections();
    const collection = collections.find(
      (collection) => collection.handle === handle
    );
    return collection ? adaptShopifyCollection(collection) : null;
  } catch (error) {
    console.error("Error fetching collection:", error);
    return null;
  }
}

export async function getProduct(handle: string): Promise<Product | null> {
  "use cache";
  cacheTag(TAGS.products);
  cacheLife("minutes");

  try {
    const shopifyProduct = await getShopifyProduct(handle);
    return shopifyProduct ? adaptShopifyProduct(shopifyProduct) : null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function getProducts(params: {
  limit?: number;
  sortKey?: ProductSortKey;
  reverse?: boolean;
  query?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<Product[]> {
  "use cache";
  cacheTag(TAGS.products);
  cacheLife("minutes");

  try {
    const shopifyProducts = await getShopifyProducts(params);
    return shopifyProducts.map(adaptShopifyProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getCollectionProducts(params: {
  collection: string;
  limit?: number;
  sortKey?: ProductCollectionSortKey;
  reverse?: boolean;
  query?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<Product[]> {
  "use cache";
  cacheTag(TAGS.collectionProducts);
  cacheLife("minutes");

  try {
    const shopifyProducts = await getShopifyCollectionProducts({
      collection: params.collection,
      limit: params.limit,
      sortKey: params.sortKey,
      reverse: params.reverse,
    });
    return shopifyProducts.map(adaptShopifyProduct);
  } catch (error) {
    console.error("Error fetching collection products:", error);
    return [];
  }
}

export async function getCart(): Promise<Cart | null> {
  try {
    const { getCart: getCartAction } = await import(
      "@/components/cart/actions"
    );
    return await getCartAction();
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
}

export async function getProductRecommendations(
  productId: string
): Promise<Product[]> {
  "use cache";
  cacheTag(TAGS.productRecommendations);
  cacheLife("minutes");

  try {
    const shopifyProducts = await getShopifyProductRecommendations(productId);
    return shopifyProducts.map(adaptShopifyProduct);
  } catch (error) {
    console.error("Error fetching product recommendations:", error);
    return [];
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  "use cache";
  cacheTag(TAGS.featuredProducts);
  cacheLife("minutes");

  try {
    const shopifyProducts = await getShopifyProducts({
      first: FEATURED_PRODUCTS_LENGTH ?? 8,
    });

    const adaptedProducts = shopifyProducts.map(adaptShopifyProduct);
    return adaptedProducts;
  } catch (error) {
    console.error(
      "Error fetching products:",
      error instanceof Error ? error.stack : error
    );
    return [];
  }
}

// Re-export cart mutation functions (these are properly typed in shopify.ts)
export { createCart, addCartLines, updateCartLines, removeCartLines };
