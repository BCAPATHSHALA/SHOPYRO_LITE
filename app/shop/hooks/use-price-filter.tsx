"use client";

import { create } from "zustand";

interface PriceRange {
  min: number | null;
  max: number | null;
}

interface PriceFilterStore {
  priceRange: PriceRange;
  setPriceRange: (range: PriceRange) => void;
  clearPriceFilter: () => void;
}

export const usePriceFilter = create<PriceFilterStore>((set) => ({
  priceRange: { min: null, max: null },
  setPriceRange: (range) => set({ priceRange: range }),
  clearPriceFilter: () => set({ priceRange: { min: null, max: null } }),
}));
