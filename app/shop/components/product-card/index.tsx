import React, { Suspense } from "react";
import Link from "next/link";
import { Product } from "@/lib/shopify/types";
import { AddToCart, AddToCartButton } from "@/components/cart/add-to-cart";
import { formatPrice } from "@/lib/shopify/utils";
import { VariantSelector } from "../variant-selector";
import { ProductImage } from "./product-image";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export const ProductCard = ({ product }: { product: Product }) => {
  const hasNoOptions = product.options.length === 0;
  const hasOneOptionWithOneValue =
    product.options.length === 1 && product.options[0].values.length === 1;
  const justHasColorOption =
    product.options.length === 1 &&
    product.options[0].name.toLowerCase() === "color";

  const renderInCardAddToCart =
    hasNoOptions || hasOneOptionWithOneValue || justHasColorOption;

  return (
    <div className="flex flex-col rounded-xl border bg-card shadow-sm overflow-hidden group">
      {/* Product Image */}
      <Link
        href={`/product/${product.handle}`}
        className="block relative aspect-[3/4] w-full bg-muted"
        aria-label={`View details for ${product.title}`}
        prefetch
      >
        <Suspense fallback={null}>
          <ProductImage product={product} />
        </Suspense>
      </Link>

      {/* Product Details */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <h3 className="text-base font-semibold line-clamp-2 group-hover:text-primary transition">
          {product.title}
        </h3>

        <div className="flex items-center gap-2 text-sm font-medium">
          {formatPrice(
            product.priceRange.minVariantPrice.amount,
            product.priceRange.minVariantPrice.currencyCode
          )}
          {product.compareAtPrice && (
            <span className="line-through text-muted-foreground text-xs">
              {formatPrice(
                product.compareAtPrice.amount,
                product.compareAtPrice.currencyCode
              )}
            </span>
          )}
        </div>

        {/* Action Area */}
        <div className="mt-auto">
          {renderInCardAddToCart ? (
            <>
              <Suspense fallback={null}>
                <VariantSelector product={product} />
              </Suspense>
              <Suspense
                fallback={
                  <AddToCartButton
                    className="w-full mt-2"
                    product={product}
                    size="sm"
                  />
                }
              >
                <AddToCart
                  className="w-full mt-2"
                  size="sm"
                  product={product}
                />
              </Suspense>
            </>
          ) : (
            <Button className="w-full mt-2" size="sm" asChild>
              <Link href={`/product/${product.handle}`}>
                <span className="flex items-center justify-center gap-2">
                  View Product <ArrowRightIcon className="w-4 h-4" />
                </span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
