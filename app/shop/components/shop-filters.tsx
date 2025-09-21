"use client";

import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Collection } from "@/lib/shopify/types";
import { SidebarLinks } from "@/components/layout/sidebar/product-sidebar-links";
import { CategoryFilter } from "./category-filter";
import { ColorFilter } from "./color-filter";
import { PriceFilter } from "./price-filter";
import { useProducts } from "../providers/products-provider";
import { useFilterCount } from "../hooks/use-filter-count";
import { useRouter } from "next/navigation";
import { useCategoryFilter } from "../hooks/use-category-filter";
import { usePriceFilter } from "../hooks/use-price-filter";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";

export function DesktopFilters({
  collections,
  className,
}: {
  collections: Collection[];
  className?: string;
}) {
  const filterCount = useFilterCount();
  const { originalProducts } = useProducts();

  const router = useRouter();

  const { clearCategory } = useCategoryFilter();
  const { clearPriceFilter } = usePriceFilter();
  const [, setColorFilters] = useQueryState(
    "fcolor",
    parseAsArrayOf(parseAsString).withDefault([])
  );

  const handleClearAll = async () => {
    clearCategory();
    clearPriceFilter();
    await setColorFilters([]);
    router.push("/shop");
  };

  return (
    <aside
      className={cn(
        "flex flex-col sticky top-0 max-h-screen bg-background border-r border-border/50",
        "pt-6 pb-4 px-4 z-10 min-w-[280px] max-w-[320px]",
        className
      )}
    >
      <div className="flex justify-between items-center mb-6 pb-3 border-b border-border/30">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          Filter
          {filterCount > 0 && (
            <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium bg-primary text-primary-foreground rounded-full">
              {filterCount}
            </span>
          )}
        </h2>
        <Button
          size="sm"
          variant="ghost"
          aria-label="Clear all filters"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 h-auto"
          onClick={handleClearAll}
        >
          Clear All
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40 pr-2 space-y-6">
        <Suspense fallback={null}>
          <CategoryFilter collections={collections} />
          <ColorFilter products={originalProducts} />
          <PriceFilter products={originalProducts} />
        </Suspense>
      </div>

      <div className="mt-6 pt-4 border-t border-border/30">
        <SidebarLinks className="flex flex-col gap-2" size="sm" />
      </div>
    </aside>
  );
}
