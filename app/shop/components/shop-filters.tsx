"use client";

import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Collection } from "@/lib/shopify/types";
import Link from "next/link";
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
        "grid sticky top-0 grid-cols-3 max-h-screen pl-sides pt-top-spacing pb-4 z-10 bg-background",
        className
      )}
    >
      <div className="flex flex-col col-span-3 xl:col-span-2 gap-5 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/20 hover:scrollbar-thumb-muted-foreground/40 pr-2">
        <div className="flex justify-between items-baseline pl-2 -mb-1">
          <h2 className="text-2xl font-semibold text-foreground">
            Filter{" "}
            {filterCount > 0 && (
              <span className="text-muted-foreground">({filterCount})</span>
            )}
          </h2>
          <Button
            size={"sm"}
            variant="ghost"
            aria-label="Clear all filters"
            className="font-medium text-muted-foreground hover:text-foreground transition-colors"
            onClick={handleClearAll}
          >
            Clear All
          </Button>
        </div>
        <Suspense fallback={null}>
          <CategoryFilter collections={collections} />
          <ColorFilter products={originalProducts} />
          <PriceFilter products={originalProducts} />
        </Suspense>
      </div>

      <div className="col-span-3 self-end">
        <SidebarLinks className="flex-col-reverse py-sides" size="sm" />
      </div>
    </aside>
  );
}
