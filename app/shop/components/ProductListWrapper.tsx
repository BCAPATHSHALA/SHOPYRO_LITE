"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCategoryFilter } from "../hooks/use-category-filter";
import { usePriceFilter } from "../hooks/use-price-filter";

export default function ProductListWrapper({
  collection,
}: {
  collection: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { selectedCategory } = useCategoryFilter();
  const { priceRange } = usePriceFilter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedCategory) {
      params.set("category", selectedCategory);
    } else {
      params.delete("category");
    }

    if (priceRange.min !== null) {
      params.set("minPrice", priceRange.min.toString());
    } else {
      params.delete("minPrice");
    }

    if (priceRange.max !== null) {
      params.set("maxPrice", priceRange.max.toString());
    } else {
      params.delete("maxPrice");
    }

    router.replace(`?${params.toString()}`);
  }, [selectedCategory, priceRange, searchParams, router]);

  return null; // we only update URL, the server component will re-render
}
