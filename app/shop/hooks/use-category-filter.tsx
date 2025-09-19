import { create } from "zustand";

interface CategoryFilterState {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  clearCategory: () => void;
}

export const useCategoryFilter = create<CategoryFilterState>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  clearCategory: () => set({ selectedCategory: null }),
}));
