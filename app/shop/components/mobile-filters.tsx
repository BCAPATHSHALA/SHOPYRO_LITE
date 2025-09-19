"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import type { Collection } from "@/lib/shopify/types";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CategoryFilter } from "./category-filter";
import { ColorFilter } from "./color-filter";
import { PriceFilter } from "./price-filter";
import { useFilterCount } from "../hooks/use-filter-count";
import { useProducts } from "../providers/products-provider";
import { ResultsCount } from "./results-count";
import { SortDropdown } from "./sort-dropdown";
import { useCategoryFilter } from "../hooks/use-category-filter";
import { usePriceFilter } from "../hooks/use-price-filter";
import { useQueryState, parseAsArrayOf, parseAsString } from "nuqs";
import { useRouter } from "next/navigation";

interface MobileFiltersProps {
  collections: Collection[];
  className?: string;
}

export function MobileFilters({ collections, className }: MobileFiltersProps) {
  const filterCount = useFilterCount();
  const { products, originalProducts } = useProducts();
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
    <div className="pt-top-spacing bg-background md:hidden overflow-x-clip">
      <Drawer>
        {/* 3 main items: Filters, Results count, Sort by */}
        <div className="grid grid-cols-3 items-center px-4 py-3 border-b border-border/50">
          {/* Filters */}
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="justify-self-start text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors"
            >
              Filters{" "}
              {filterCount > 0 && (
                <span className="text-muted-foreground">({filterCount})</span>
              )}
            </Button>
          </DrawerTrigger>

          {/* Results count */}
          <ResultsCount count={products.length} />

          {/* Sort by */}
          <SortDropdown className="justify-self-end" />
        </div>

        {/* Drawer content */}
        <DrawerContent className={cn("h-[85vh] bg-background", className)}>
          <DrawerHeader className="flex justify-between items-center border-b border-border/50 pb-4">
            <DrawerTitle className="text-foreground">
              Filters{" "}
              {filterCount > 0 && (
                <span className="text-muted-foreground">({filterCount})</span>
              )}
            </DrawerTitle>
            <Button
              size="sm"
              variant="ghost"
              className={cn(
                "font-medium text-muted-foreground hover:text-foreground transition-all",
                filterCount === 0 && "opacity-0 pointer-events-none"
              )}
              disabled={filterCount === 0}
              onClick={handleClearAll}
            >
              Clear All
            </Button>
          </DrawerHeader>
          <div className="overflow-y-auto flex-1 px-4 pb-6 space-y-6 custom-scrollbar">
            <CategoryFilter collections={collections} />
            <ColorFilter products={originalProducts} />
            <PriceFilter products={originalProducts} />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
