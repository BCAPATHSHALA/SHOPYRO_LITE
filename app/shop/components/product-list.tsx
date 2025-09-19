import {
  getCollectionProducts,
  getCollections,
  getProducts,
} from "@/lib/shopify";
import type {
  Product,
  ProductCollectionSortKey,
  ProductSortKey,
} from "@/lib/shopify/types";
import { ProductListContent } from "./product-list-content";
import { mapSortKeys } from "@/lib/shopify/utils";

interface ProductListProps {
  collection: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function ProductList({
  collection,
  searchParams,
}: ProductListProps) {
  const query =
    typeof searchParams?.q === "string" ? searchParams.q : undefined;
  const sort =
    typeof searchParams?.sort === "string" ? searchParams.sort : undefined;
  const minPrice =
    typeof searchParams?.minPrice === "string"
      ? parseFloat(searchParams.minPrice)
      : undefined;
  const maxPrice =
    typeof searchParams?.maxPrice === "string"
      ? parseFloat(searchParams.maxPrice)
      : undefined;
  const category =
    typeof searchParams?.category === "string"
      ? searchParams.category
      : undefined;
  const isRootCollection = collection === "joyco-root" || !collection;

  // console.log("ProductList params:", {
  //   collection,
  //   query,
  //   sort,
  //   minPrice,
  //   maxPrice,
  //   category,
  // });

  const { sortKey, reverse } = isRootCollection
    ? mapSortKeys(sort, "product")
    : mapSortKeys(sort, "collection");

  let products: Product[] = [];

  try {
    if (isRootCollection) {
      products = await getProducts({
        sortKey: sortKey as ProductSortKey,
        query,
        reverse,
        minPrice,
        maxPrice,
      });
    } else {
      products = await getCollectionProducts({
        collection,
        query,
        sortKey: sortKey as ProductCollectionSortKey,
        reverse,
        minPrice,
        maxPrice,
      });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    products = [];
  }

  const collections = await getCollections();

  return <ProductListContent products={products} collections={collections} />;
}
