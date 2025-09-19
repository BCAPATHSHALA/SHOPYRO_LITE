"use client";

import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";
import { useCategoryFilter } from "./use-category-filter";

export function useFilterCount() {
  const { selectedCategory } = useCategoryFilter();
  const [color] = useQueryState(
    "fcolor",
    parseAsArrayOf(parseAsString).withDefault([])
  );
  const [minPrice] = useQueryState("minPrice", parseAsString);
  const [maxPrice] = useQueryState("maxPrice", parseAsString);

  // Count active filters
  let count = 0;

  // Count color filters
  if (color.length > 0) {
    count += color.length;
  }

  // Count collection filter (if not on "all" products)
  if (selectedCategory && selectedCategory !== undefined) {
    count += 1;
  }

  // Count price filters
  if (minPrice) count += 1;
  if (maxPrice) count += 1;

  return count;
}

export function useCategoryFilterCount() {
  const { selectedCategory } = useCategoryFilter();

  // Return 1 if a category is selected, 0 if not
  return selectedCategory && selectedCategory !== undefined ? 1 : 0;
}

export function useColorFilterCount() {
  const [color] = useQueryState(
    "fcolor",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  // Return the number of selected color filters
  return color.length;
}

export function usePriceFilterCount() {
  const [minPrice] = useQueryState("minPrice", parseAsString);
  const [maxPrice] = useQueryState("maxPrice", parseAsString);

  // Return the number of active price filters
  let count = 0;
  if (minPrice) count += 1;
  if (maxPrice) count += 1;
  return count;
}
