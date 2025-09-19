"use client";

import { ColorPicker } from "@/components/ui/color-picker";
import { ColorSwatchSkeleton } from "@/components/ui/color-swatch-skeleton";
import type { Product } from "@/lib/shopify/types";
import { cn } from "@/lib/utils";
import { useAvailableColors } from "../hooks/use-available-colors";
import { useColorFilterCount } from "../hooks/use-filter-count";
import { AnimatePresence, motion } from "motion/react";

interface ColorFilterProps {
  products?: Product[];
  className?: string;
}

export function ColorFilter({ products = [], className }: ColorFilterProps) {
  const { availableColors, selectedColors, toggleColor } =
    useAvailableColors(products);
  const colorCount = useColorFilterCount();

  const isLoading = products.length === 0;

  const atLeastOneColor = availableColors.length > 0;

  return (
    <AnimatePresence initial={false}>
      {(atLeastOneColor || isLoading) && (
        <motion.div
          layoutId="color-filter"
          layout="size"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "px-4 py-5 rounded-xl bg-muted/50 border border-border/50 transition-all hover:bg-muted/70",
            className
          )}
        >
          <h3 className="mb-4 font-semibold text-foreground">
            Color{" "}
            {colorCount > 0 && (
              <span className="text-muted-foreground">({colorCount})</span>
            )}
          </h3>
          {isLoading ? (
            <ColorSwatchSkeleton count={4} />
          ) : (
            <ColorPicker
              colors={availableColors}
              selectedColors={selectedColors}
              onColorChange={toggleColor}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
