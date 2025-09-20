import { storeCatalog } from "@/lib/shopify/constants";
import ProductList from "./components/product-list";
import { Metadata } from "next";
import { SITE_NAME, SITE_TAGLINE } from "@/siteconfig/site.config";
import { Suspense } from "react";
import ResultsControls from "./components/results-controls";
import { ProductGrid } from "./components/product-grid";
import { ProductCardSkeleton } from "./components/product-card-skeleton";
import ProductListWrapper from "./components/ProductListWrapper";
import { PAGE_METADATA } from "@/siteconfig/seo.config";

export const metadata = PAGE_METADATA.shop;

// Enable ISR with 1 minute revalidation
export const revalidate = 60;

export default async function Shop(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  return (
    <>
      <Suspense
        fallback={
          <>
            <ResultsControls
              className="max-md:hidden"
              collections={[]}
              products={[]}
            />
            <ProductGrid>
              {Array.from({ length: 12 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </ProductGrid>
          </>
        }
      >
        {/* client wrapper keeps URL in sync with Zustand */}
        <ProductListWrapper collection={storeCatalog.rootCategoryId} />

        {/* server component fetches using searchParams */}
        <ProductList
          collection={storeCatalog.rootCategoryId}
          searchParams={searchParams}
        />
      </Suspense>
    </>
  );
}
