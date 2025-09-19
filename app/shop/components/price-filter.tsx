"use client";

import type { Product } from "@/lib/shopify/types";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from "react";
import { usePriceFilterCount } from "../hooks/use-filter-count";
import { Input } from "@/components/ui/input";
import { usePriceFilter } from "../hooks/use-price-filter";

interface PriceFilterProps {
  products?: Product[];
  className?: string;
}

export function PriceFilter({ products = [], className }: PriceFilterProps) {
  const { priceRange, setPriceRange, clearPriceFilter } = usePriceFilter();
  const priceCount = usePriceFilterCount();

  // Get price range from products
  const availablePriceRange = useMemo(() => {
    if (products.length === 0) return { min: 0, max: 10000 };

    const prices = products
      .map((product) =>
        Number.parseFloat(product.priceRange.minVariantPrice.amount)
      )
      .filter((price) => !isNaN(price) && price >= 0);

    if (prices.length === 0) return { min: 0, max: 10000 };

    const min = 0; // Always start from 0
    const max = Math.ceil(Math.max(...prices));

    return {
      min: 0,
      max: Math.max(1000, max), // Set a reasonable minimum max value
    };
  }, [products]);

  // Initialize slider values
  const [sliderValues, setSliderValues] = useState<number[]>([
    priceRange.min ?? availablePriceRange.min,
    priceRange.max ?? availablePriceRange.max,
  ]);

  // Update slider values when price range changes or available range changes
  useEffect(() => {
    const newMin = priceRange.min ?? availablePriceRange.min;
    const newMax = priceRange.max ?? availablePriceRange.max;
    setSliderValues([newMin, newMax]);
  }, [priceRange.min, priceRange.max, availablePriceRange]);

  const handleSliderChange = (values: number[]) => {
    setSliderValues(values);
  };

  const handleSliderCommit = (values: number[]) => {
    const [newMin, newMax] = values;

    // Only update if values are different from available range
    if (
      newMin !== availablePriceRange.min ||
      newMax !== availablePriceRange.max
    ) {
      setPriceRange({
        min: newMin === availablePriceRange.min ? null : newMin,
        max: newMax === availablePriceRange.max ? null : newMax,
      });
    } else {
      setPriceRange({ min: null, max: null });
    }
  };

  const handleInputChange = (index: 0 | 1, value: string) => {
    const numValue = Number.parseFloat(value);
    if (isNaN(numValue)) return;

    const newValues = [...sliderValues];
    newValues[index] = Math.max(
      availablePriceRange.min,
      Math.min(availablePriceRange.max, numValue)
    );

    // Ensure min <= max
    if (index === 0) {
      newValues[1] = Math.max(newValues[1], newValues[0]);
    } else {
      newValues[0] = Math.min(newValues[0], newValues[1]);
    }

    setSliderValues(newValues);
  };

  const handleInputBlur = () => {
    handleSliderCommit(sliderValues);
  };

  const handleClearFilter = () => {
    setSliderValues([availablePriceRange.min, availablePriceRange.max]);
    clearPriceFilter();
  };

  const hasActiveFilter = priceRange.min !== null || priceRange.max !== null;
  const isLoading = products.length === 0;

  if (isLoading) {
    return (
      <div
        className={cn(
          "px-4 py-5 rounded-xl bg-muted/50 border border-border/50",
          className
        )}
      >
        <h3 className="mb-4 font-semibold text-foreground">Price Range</h3>
        <div className="space-y-4">
          <div className="h-2 bg-muted-foreground/20 rounded-full animate-pulse" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Loading...</span>
            <span>Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "px-4 py-5 rounded-xl bg-muted/50 border border-border/50 transition-all hover:bg-muted/70",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm sm:text-base text-foreground">
          Price Range{" "}
          {priceCount > 0 && (
            <span className="text-muted-foreground">({priceCount})</span>
          )}
        </h3>
        {hasActiveFilter && (
          <Button
            size="sm"
            variant="ghost"
            onClick={handleClearFilter}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-5">
        {/* Price Range Display */}
        <div className="text-center">
          <div className="text-base sm:text-lg font-semibold text-foreground">
            ${sliderValues[0]} -{" "}
            {sliderValues[1] >= availablePriceRange.max
              ? "No limit"
              : `$${sliderValues[1]}`}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Available range: ${availablePriceRange.min} - $
            {availablePriceRange.max === 10000
              ? "No limit"
              : availablePriceRange.max}
          </div>
        </div>

        {/* Slider */}
        <div className="px-2">
          <Slider
            value={sliderValues}
            onValueChange={handleSliderChange}
            onValueCommit={handleSliderCommit}
            min={availablePriceRange.min}
            max={availablePriceRange.max}
            step={1}
            className="w-full"
          />
        </div>

        {/* Input Fields */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label
              htmlFor="min-price"
              className="text-xs text-muted-foreground mb-2 block font-medium"
            >
              Min Price
            </label>
            <Input
              id="min-price"
              type="number"
              min={availablePriceRange.min}
              max={availablePriceRange.max}
              value={sliderValues[0]}
              onChange={(e) => handleInputChange(0, e.target.value)}
              onBlur={handleInputBlur}
              className="h-9 text-sm w-full border-border/50 focus:border-primary transition-colors"
              placeholder="0"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="max-price"
              className="text-xs text-muted-foreground mb-2 block font-medium"
            >
              Max Price
            </label>
            <Input
              id="max-price"
              type="number"
              min={availablePriceRange.min}
              max={availablePriceRange.max}
              value={
                sliderValues[1] >= availablePriceRange.max
                  ? ""
                  : sliderValues[1]
              }
              onChange={(e) => handleInputChange(1, e.target.value)}
              onBlur={handleInputBlur}
              className="h-9 text-sm w-full border-border/50 focus:border-primary transition-colors"
              placeholder="No limit"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
