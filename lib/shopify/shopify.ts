import {
  ProductCollectionSortKey,
  ProductSortKey,
  ShopifyCart,
  ShopifyCollection,
  ShopifyProduct,
} from "./types";

import { parseShopifyDomain } from "./parse-shopify-domain";
import {
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_KEY,
  fallbackStoreDomain,
  rawStoreDomain,
  STOREFRONT_ACCESS_TOKEN,
} from "./constants";

const SHOPIFY_STORE_DOMAIN = rawStoreDomain
  ? parseShopifyDomain(rawStoreDomain)
  : fallbackStoreDomain;
const IS_SHOPIFY_CONFIGURED = Boolean(rawStoreDomain);

const SHOPIFY_STOREFRONT_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2025-07/graphql.json`;

// Tokenless Shopify API request
async function shopifyFetch<T>({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<{ data: T; errors?: any[] }> {
  try {
    const response = await fetch(SHOPIFY_STOREFRONT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(STOREFRONT_ACCESS_TOKEN
          ? { "X-Shopify-Storefront-Access-Token": STOREFRONT_ACCESS_TOKEN }
          : {}),
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      cache: "no-store", // Ensure fresh data for cart operations
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(
        `Shopify API HTTP error! Status: ${response.status}, Body: ${errorBody}`
      );
    }

    const json = await response.json();

    if (json.errors) {
      console.error("Shopify API errors:", json.errors);
      throw new Error(`Shopify GraphQL errors: ${JSON.stringify(json.errors)}`);
    }

    return json;
  } catch (error) {
    console.error("Shopify fetch error:", error);
    throw error;
  }
}

// Get all products
export async function getProducts({
  first = DEFAULT_PAGE_SIZE,
  sortKey = DEFAULT_SORT_KEY,
  reverse = false,
  query: searchQuery,
  minPrice,
  maxPrice,
}: {
  first?: number;
  sortKey?: ProductSortKey;
  reverse?: boolean;
  query?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<ShopifyProduct[]> {
  if (!IS_SHOPIFY_CONFIGURED) {
    return [];
  }
  // Build query string with price filters
  let queryString = searchQuery || "";
  if (minPrice !== undefined || maxPrice !== undefined) {
    const priceFilters = [];
    if (minPrice !== undefined && minPrice > 0) {
      priceFilters.push(`variants.price:>=${minPrice}`);
    }
    if (maxPrice !== undefined && maxPrice > 0) {
      priceFilters.push(`variants.price:<=${maxPrice}`);
    }
    if (priceFilters.length > 0) {
      const priceQuery = priceFilters.join(" AND ");
      queryString = queryString
        ? `${queryString} AND ${priceQuery}`
        : priceQuery;
    }
  }

  const query = /* gql */ `
    query getProducts($first: Int!, $sortKey: ProductSortKeys!, $reverse: Boolean, $query: String) {
      products(first: $first, sortKey: $sortKey, reverse: $reverse, query: $query) {
        edges {
          node {
            id
            title
            description
            descriptionHtml
            handle
            productType
            options {
              id
              name
              values
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                  thumbhash
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  availableForSale
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const { data } = await shopifyFetch<{
    products: {
      edges: Array<{ node: ShopifyProduct }>;
    };
  }>({
    query,
    variables: { first, sortKey, reverse, query: queryString },
  });

  return data.products.edges.map((edge) => edge.node);
}

// Get single product by handle
export async function getProduct(
  handle: string
): Promise<ShopifyProduct | null> {
  if (!IS_SHOPIFY_CONFIGURED) {
    return null;
  }
  const query = /* gql */ `
    query getProduct($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        descriptionHtml
        handle
        productType
        category {
          id
          name
        }
        options {
          id
          name
          values
        }
        images(first: 10) {
          edges {
            node {
              url
              altText
              thumbhash
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;

  const { data } = await shopifyFetch<{
    product: ShopifyProduct | null;
  }>({
    query,
    variables: { handle },
  });

  return data.product;
}

// Get collections
export async function getCollections(first = 10): Promise<ShopifyCollection[]> {
  if (!IS_SHOPIFY_CONFIGURED) {
    return [];
  }
  const query = /* gql */ `
    query getCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            image {
              url
              altText
              thumbhash
            }
          }
        }
      }
    }
  `;

  const { data } = await shopifyFetch<{
    collections: {
      edges: Array<{ node: ShopifyCollection }>;
    };
  }>({
    query,
    variables: { first },
  });

  return data.collections.edges.map((edge) => edge.node);
}

// Get products from a specific collection (simplified - no server-side filtering)
export async function getCollectionProducts({
  collection,
  limit = DEFAULT_PAGE_SIZE,
  sortKey = DEFAULT_SORT_KEY,
  query: searchQuery,
  reverse = false,
  minPrice,
  maxPrice,
}: {
  collection: string;
  limit?: number;
  sortKey?: ProductCollectionSortKey;
  query?: string;
  reverse?: boolean;
  minPrice?: number;
  maxPrice?: number;
}): Promise<ShopifyProduct[]> {
  if (!IS_SHOPIFY_CONFIGURED) {
    return [];
  }

  // Build query string with price filters
  let queryString = searchQuery || "";
  if (minPrice !== undefined || maxPrice !== undefined) {
    const priceFilters = [];
    if (minPrice !== undefined && minPrice > 0) {
      priceFilters.push(`variants.price:>=${minPrice}`);
    }
    if (maxPrice !== undefined && maxPrice > 0) {
      priceFilters.push(`variants.price:<=${maxPrice}`);
    }
    if (priceFilters.length > 0) {
      const priceQuery = priceFilters.join(" AND ");
      queryString = queryString
        ? `${queryString} AND ${priceQuery}`
        : priceQuery;
    }
  }

  const query = /* gql */ `
    query getCollectionProducts($handle: String!, $first: Int!, $sortKey: ProductCollectionSortKeys!, $reverse: Boolean, $query: String) {
      collection(handle: $handle) {
        products(first: $first, sortKey: $sortKey, reverse: $reverse, query: $query) {
          edges {
            node {
              id
              title
              description
              descriptionHtml
              handle
              productType
              category {
                id
                name
              }
              options {
                id
                name
                values
              }
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                    thumbhash
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              compareAtPriceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    availableForSale
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  // Debug logging
  if (queryString) {
    console.log("Collection price filter query string:", queryString);
  }

  const { data } = await shopifyFetch<{
    collection: {
      products: {
        edges: Array<{ node: ShopifyProduct }>;
      };
    } | null;
  }>({
    query,
    variables: {
      handle: collection,
      first: limit,
      sortKey,
      query: queryString,
      reverse,
    },
  });

  if (!data.collection) {
    return [];
  }

  return data.collection.products.edges.map((edge) => edge.node);
}

// Create cart
export async function createCart(): Promise<ShopifyCart> {
  const query = /* gql */ `
    mutation cartCreate {
      cartCreate {
        cart {
          id
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                            thumbhash
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const { data } = await shopifyFetch<{
    cartCreate: {
      cart: ShopifyCart;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>({ query });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors[0].message);
  }

  return data.cartCreate.cart;
}

// Add items to cart
export async function addCartLines(
  cartId: string,
  lines: Array<{ merchandiseId: string; quantity: number }>
): Promise<ShopifyCart> {
  const query = /* gql */ `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                            thumbhash
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const { data } = await shopifyFetch<{
    cartLinesAdd: {
      cart: ShopifyCart;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>({
    query,
    variables: {
      cartId,
      lines,
    },
  });

  if (data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(data.cartLinesAdd.userErrors[0].message);
  }

  return data.cartLinesAdd.cart;
}

// Update items in cart
export async function updateCartLines(
  cartId: string,
  lines: Array<{ id: string; quantity: number }>
): Promise<ShopifyCart> {
  const query = /* gql */ `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                            thumbhash
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const { data } = await shopifyFetch<{
    cartLinesUpdate: {
      cart: ShopifyCart;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>({
    query,
    variables: {
      cartId,
      lines,
    },
  });

  if (data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(data.cartLinesUpdate.userErrors[0].message);
  }

  return data.cartLinesUpdate.cart;
}

// Remove items from cart
export async function removeCartLines(
  cartId: string,
  lineIds: string[]
): Promise<ShopifyCart> {
  const query = /* gql */ `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      title
                      images(first: 1) {
                        edges {
                          node {
                            url
                            altText
                            thumbhash
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const { data } = await shopifyFetch<{
    cartLinesRemove: {
      cart: ShopifyCart;
      userErrors: Array<{ field: string; message: string }>;
    };
  }>({
    query,
    variables: {
      cartId,
      lineIds,
    },
  });

  if (data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(data.cartLinesRemove.userErrors[0].message);
  }

  return data.cartLinesRemove.cart;
}

// Get cart
export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  if (!IS_SHOPIFY_CONFIGURED) {
    return null;
  }
  const query = /* gql */ `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  selectedOptions {
                    name
                    value
                  }
                  product {
                    title
                    handle
                    images(first: 10) {
                      edges {
                        node {
                          url
                          altText
                          thumbhash
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
          totalTaxAmount {
            amount
            currencyCode
          }
        }
        checkoutUrl
      }
    }
  `;

  const { data } = await shopifyFetch<{
    cart: ShopifyCart | null;
  }>({
    query,
    variables: { cartId },
  });

  return data.cart;
}

// Get product recommendations
export async function getProductRecommendations(
  productId: string
): Promise<ShopifyProduct[]> {
  if (!IS_SHOPIFY_CONFIGURED) {
    return [];
  }

  const query = /* gql */ `
    query getProductRecommendations($productId: ID!) {
      productRecommendations(productId: $productId, intent: RELATED) {
        id
        title
        description
        handle
        productType
        options {
          id
          name
          values
        }
        images(first: 5) {
          edges {
            node {
              url
              altText
              thumbhash
            }
          }
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        compareAtPriceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 5) {
          edges {
            node {
              id
              title
              price {
                amount
                currencyCode
              }
              availableForSale
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;

  const { data } = await shopifyFetch<{
    productRecommendations: ShopifyProduct[];
  }>({
    query,
    variables: { productId },
  });

  return data.productRecommendations || [];
}
