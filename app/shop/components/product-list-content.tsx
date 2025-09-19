"use client";

import { useEffect, useMemo } from "react";
import type { Product, Collection } from "@/lib/shopify/types";
import { ProductCard } from "./product-card";
import ResultsControls from "./results-controls";
import { useProducts } from "../providers/products-provider";
import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";
import { ProductGrid } from "./product-grid";
import { usePriceFilter } from "../hooks/use-price-filter";
import { useCategoryFilter } from "../hooks/use-category-filter";
import { useRouter } from "next/navigation";

interface ProductListContentProps {
  products: Product[];
  collections: Collection[];
}

// Client-side color filtering function
function filterProductsByColors(
  products: Product[],
  colors: string[]
): Product[] {
  if (!colors || colors.length === 0) {
    return products;
  }

  const filteredProducts = products.filter((product) => {
    // Check if product has any variants with the selected colors
    // Note: variants is now a simple array after adaptShopifyProduct transformation
    const hasMatchingColor = product.variants?.some((variant: any) => {
      if (!variant.selectedOptions) return false;

      // Look for color option in variant
      return variant.selectedOptions.some((option: any) => {
        const isColorOption =
          option.name.toLowerCase().includes("color") ||
          option.name.toLowerCase().includes("colour");

        if (!isColorOption) return false;

        // Check if this variant's color matches any of the selected colors
        const variantColor = option.value.toLowerCase();
        return colors.some(
          (selectedColor) =>
            selectedColor.toLowerCase() === variantColor ||
            variantColor.includes(selectedColor.toLowerCase()) ||
            selectedColor.toLowerCase().includes(variantColor)
        );
      });
    });

    // Also check product-level options as fallback
    if (!hasMatchingColor && product.options) {
      const colorOption = product.options.find(
        (opt: any) =>
          opt.name.toLowerCase().includes("color") ||
          opt.name.toLowerCase().includes("colour")
      );

      if (colorOption && colorOption.values) {
        return colorOption.values.some((value: any) => {
          // Handle both string values and object values with .name property
          const colorValue =
            typeof value === "string" ? value : value.name || value.id;
          const optionColor = colorValue.toLowerCase();
          return colors.some(
            (selectedColor) =>
              selectedColor.toLowerCase() === optionColor ||
              optionColor.includes(selectedColor.toLowerCase()) ||
              selectedColor.toLowerCase().includes(optionColor)
          );
        });
      }
    }

    return hasMatchingColor;
  });

  return filteredProducts;
}

function filterProductsByPrice(
  products: Product[],
  minPrice: number | null,
  maxPrice: number | null
): Product[] {
  if (minPrice === null && maxPrice === null) {
    return products;
  }

  return products.filter((product) => {
    const price = Number.parseFloat(product.priceRange.minVariantPrice.amount);

    if (minPrice !== null && price < minPrice) {
      return false;
    }

    if (maxPrice !== null && price > maxPrice) {
      return false;
    }

    return true;
  });
}

function filterProductsByCategory(
  products: Product[],
  collections: Collection[],
  selectedCategory: string | null
): Product[] {
  if (!selectedCategory) {
    return products;
  }

  // Find the collection by handle
  const collection = collections.find((c) => c.handle === selectedCategory);
  if (!collection) {
    return products;
  }

  // Filter products that belong to this collection
  // This is a simplified approach - in a real app you might need to check product collections
  // For now, we'll filter by product type or other criteria
  return products.filter((product) => {
    // You can customize this logic based on how your products are categorized
    // For example, you might check product.productType, product.tags, or other fields
    return (
      product.productType
        ?.toLowerCase()
        .includes(collection.title.toLowerCase()) ||
      product.title.toLowerCase().includes(collection.title.toLowerCase())
    );
  });
}

export function ProductListContent({
  products,
  collections,
}: ProductListContentProps) {
  const { setProducts, setOriginalProducts } = useProducts();
  const router = useRouter();
  const { clearCategory } = useCategoryFilter();

  // Get current color filters from URL
  const [colorFilters] = useQueryState(
    "fcolor",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const { priceRange } = usePriceFilter();
  const { selectedCategory } = useCategoryFilter();

  // Apply client-side filtering whenever products, color filters, price filters, or category changes
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Apply category filter (from Zustand)
    if (selectedCategory) {
      filtered = filterProductsByCategory(
        filtered,
        collections,
        selectedCategory
      );
    }

    // Apply color filtering
    if (colorFilters && colorFilters.length > 0) {
      filtered = filterProductsByColors(filtered, colorFilters);
    }

    // Apply price filtering
    if (priceRange.min !== null || priceRange.max !== null) {
      filtered = filterProductsByPrice(
        filtered,
        priceRange.min,
        priceRange.max
      );
    }

    return filtered;
  }, [products, collections, selectedCategory, colorFilters, priceRange]);

  // Set both original and filtered products in the provider whenever they change
  useEffect(() => {
    setOriginalProducts(products);
    setProducts(filteredProducts);
  }, [products, filteredProducts, setProducts, setOriginalProducts]);

  const handleClearAll = () => {
    clearCategory();
    router.push("/shop");
  };
  return (
    <>
      <ResultsControls
        className="max-md:hidden"
        collections={collections}
        products={filteredProducts}
      />

      {filteredProducts.length > 0 ? (
        <ProductGrid>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-8 text-center min-h-[400px]">
          <div className="w-24 h-24 mb-6 rounded-full bg-muted flex items-center justify-center">
            <svg
              className="w-12 h-12 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-foreground">
            No Products Found
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
            We couldn't find any products matching your current filters. Try
            adjusting your search criteria or browse our full collection.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleClearAll}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              Clear All Filters
            </button>
            <button
              onClick={() => router.push("/")}
              className="px-6 py-2 border border-border rounded-md font-medium hover:bg-muted transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </>
  );
}
