"use client";

import type { Collection } from "@/lib/shopify/types";
import { cn } from "@/lib/utils";
import { useCategoryFilter } from "../hooks/use-category-filter";
import { useCategoryFilterCount } from "../hooks/use-filter-count";

interface CategoryFilterProps {
  collections: Collection[];
  className?: string;
}

export function CategoryFilter({
  collections,
  className,
}: CategoryFilterProps) {
  const { selectedCategory, setSelectedCategory, clearCategory } =
    useCategoryFilter();
  const categoryCount = useCategoryFilterCount();

  const handleCategoryClick = (collectionHandle: string) => {
    if (selectedCategory === collectionHandle) {
      clearCategory();
    } else {
      setSelectedCategory(collectionHandle);
    }
  };

  return (
    <div
      className={cn(
        "px-4 py-5 rounded-xl bg-muted/50 border border-border/50 transition-all hover:bg-muted/70",
        className
      )}
    >
      <h3 className="mb-4 font-semibold text-foreground">
        Categories{" "}
        {categoryCount > 0 && (
          <span className="text-muted-foreground">({categoryCount})</span>
        )}
      </h3>
      <div className="max-h-64 overflow-y-auto custom-scrollbar">
        <ul className="flex flex-col gap-2 pr-2">
          <li>
            <button
              className={cn(
                "flex w-full text-left transition-all transform cursor-pointer text-sm font-medium py-2 px-3 rounded-lg hover:bg-background/50",
                !selectedCategory
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "text-foreground hover:text-primary"
              )}
              onClick={() => clearCategory()}
              aria-pressed={!selectedCategory}
              aria-label="Show all categories"
            >
              All Categories
            </button>
          </li>
          {collections.map((collection, index) => {
            const isSelected = selectedCategory === collection.handle;
            return (
              <li key={`${collection.handle}-${index}`}>
                <button
                  className={cn(
                    "flex w-full text-left transition-all transform cursor-pointer text-sm font-medium py-2 px-3 rounded-lg hover:bg-background/50",
                    isSelected
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : selectedCategory
                        ? "text-muted-foreground hover:text-foreground"
                        : "text-foreground hover:text-primary"
                  )}
                  onClick={() => handleCategoryClick(collection.handle)}
                  aria-pressed={isSelected}
                  aria-label={`Filter by category: ${collection.title}`}
                >
                  {collection.title}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
