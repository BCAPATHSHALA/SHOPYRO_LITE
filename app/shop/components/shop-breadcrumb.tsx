"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Collection } from "@/lib/shopify/types";
import { useCategoryFilter } from "../hooks/use-category-filter";

interface ShopBreadcrumbProps {
  collections: Pick<Collection, "handle" | "title">[];
  className?: string;
}

export function ShopBreadcrumb({
  collections,
  className,
}: ShopBreadcrumbProps) {
  const { selectedCategory } = useCategoryFilter();

  const renderCategoryBreadcrumb = () => {
    if (selectedCategory === null) return "All";
    const collection = collections.find((c) => c.handle === selectedCategory);
    return collection?.title;
  };

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        <BreadcrumbItem className="cursor-pointer text-foreground/50 hover:text-foreground/70">
          <BreadcrumbLink href="/shop" className="font-semibold">
            Shop
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbPage className="font-semibold">
          {renderCategoryBreadcrumb()}
        </BreadcrumbPage>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
