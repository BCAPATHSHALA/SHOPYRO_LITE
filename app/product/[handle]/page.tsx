import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  getCollection,
  getProduct,
  getProductRecommendations,
  getProducts,
} from "@/lib/shopify";
import { HIDDEN_PRODUCT_TAG } from "@/lib/constants";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { SidebarLinks } from "@/components/layout/sidebar/product-sidebar-links";
import { AddToCart, AddToCartButton } from "@/components/cart/add-to-cart";
import { storeCatalog } from "@/lib/shopify/constants";
import Prose from "@/components/prose";
import { formatPrice } from "@/lib/shopify/utils";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { PageLayout } from "@/components/layout/page-layout";
import { VariantSelectorSlots } from "./components/variant-selector-slots";
import { MobileGallerySlider } from "./components/mobile-gallery-slider";
import { DesktopGallery } from "./components/desktop-gallery";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ShareButton } from "@/app/shop/components/share-button";

// Generate static params for all products at build time
export async function generateStaticParams() {
  try {
    const products = await getProducts({ limit: 100 }); // Get first 100 products

    return products.map((product) => ({
      handle: product.handle,
    }));
  } catch (error) {
    console.error("Error generating static params for products:", error);
    return [];
  }
}

// Enable ISR with 1 minute revalidation
export const revalidate = 60;

export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);

  return {
    title: product.seo.title || product.title,
    description: product.seo.description || product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt,
            },
          ],
        }
      : null,
  };
}

export default async function ProductPage(props: {
  params: Promise<{ handle: string }>;
}) {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) return notFound();

  const collection = product.categoryId
    ? await getCollection(product.categoryId)
    : null;

  const productRecommendations = await getProductRecommendations(product.id);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      "@type": "AggregateOffer",
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: product.currencyCode,
      highPrice: product.priceRange.maxVariantPrice.amount,
      lowPrice: product.priceRange.minVariantPrice.amount,
    },
  };

  const [rootParentCategory] = collection?.parentCategoryTree.filter(
    (c: any) => c.id !== storeCatalog.rootCategoryId
  ) ?? [undefined];

  const hasVariants = product.variants.length > 1;
  const hasEvenOptions = product.options.length % 2 === 0;

  return (
    <PageLayout className="bg-muted">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />

      <div className="flex flex-col md:grid md:grid-cols-12 md:gap-sides min-h-max">
        {/* Mobile Gallery Slider */}
        <div className="md:hidden col-span-full h-[60vh] min-h-[400px]">
          <Suspense fallback={null}>
            <MobileGallerySlider product={product} />
          </Suspense>
        </div>

        <div className="flex sticky top-0 flex-col col-span-5 2xl:col-span-4 max-md:col-span-full md:h-screen min-h-max max-md:p-sides md:pl-sides md:pt-top-spacing max-md:static">
          <div className="col-span-full">
            <Breadcrumb className="col-span-full mb-4 md:mb-8">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/shop" prefetch>
                      Shop
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {rootParentCategory && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link href={`/shop/${rootParentCategory.id}`} prefetch>
                          {rootParentCategory.name}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </>
                )}
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{product.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex flex-col col-span-full gap-4 md:mb-10 max-md:order-2">
              <div className="flex flex-col grid-cols-2 px-3 py-2 rounded-md bg-popover md:grid md:gap-x-4 md:gap-y-6 place-items-baseline">
                <div className="flex items-center gap-2 max-md:mb-2">
                  {product.availableForSale ? (
                    <Badge variant="secondary">In stock</Badge>
                  ) : (
                    <Badge variant="destructive">Out of stock</Badge>
                  )}
                </div>
                <h1 className="text-lg font-semibold lg:text-xl 2xl:text-2xl text-balance">
                  {product.title}
                </h1>
                <p className="text-sm opacity-70 md:col-span-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between md:col-span-2 w-full">
                  <p className="flex gap-3 items-center text-lg font-semibold lg:text-xl 2xl:text-2xl">
                    {formatPrice(
                      product.priceRange.minVariantPrice.amount,
                      product.priceRange.minVariantPrice.currencyCode
                    )}
                    {product.compareAtPrice && (
                      <span className="line-through opacity-30">
                        {formatPrice(
                          product.compareAtPrice.amount,
                          product.compareAtPrice.currencyCode
                        )}
                      </span>
                    )}
                  </p>
                  <div className="flex items-center gap-2">
                    <ShareButton productTitle={product.title} />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Suspense fallback={<VariantSelectorSlots product={product} />}>
                  <VariantSelectorSlots product={product} />
                </Suspense>

                <Suspense
                  fallback={
                    <AddToCartButton
                      className={cn("w-full", {
                        "col-span-full": !hasVariants || hasEvenOptions,
                      })}
                      product={product}
                      size="lg"
                    />
                  }
                >
                  <AddToCart
                    product={product}
                    size="lg"
                    className={cn("w-full", {
                      "col-span-full": !hasVariants || hasEvenOptions,
                    })}
                  />
                </Suspense>
              </div>
            </div>
          </div>

          <div className="max-md:order-3 max-md:my-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details">
                <AccordionTrigger>Details</AccordionTrigger>
                <AccordionContent>
                  <Prose
                    className="opacity-70"
                    html={product.descriptionHtml}
                  />
                </AccordionContent>
              </AccordionItem>
              {/* <AccordionItem value="shipping">
                <AccordionTrigger>Shipping & Delivery</AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm opacity-80 space-y-2">
                    <p className="flex items-center gap-2"><Truck className="h-4 w-4" /> Free shipping on orders over $100.</p>
                    <p>Standard delivery in 3-7 business days.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="returns">
                <AccordionTrigger>Returns & Warranty</AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm opacity-80 space-y-2">
                    <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> 30-day returns. 1-year limited warranty.</p>
                  </div>
                </AccordionContent>
              </AccordionItem> */}
            </Accordion>
          </div>

          {productRecommendations.length > 0 && (
            <div className="mt-10">
              <h2 className="text-lg font-semibold mb-4">You may also like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {productRecommendations.map((rec) => (
                  <Link
                    key={rec.id}
                    href={`/product/${rec.handle}`}
                    className="block group"
                  >
                    <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                      {rec.featuredImage && (
                        <img
                          src={rec.featuredImage.url}
                          alt={rec.featuredImage.altText || rec.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <h3 className="mt-2 text-sm font-medium">{rec.title}</h3>
                    <p className="text-sm opacity-70">
                      {formatPrice(
                        rec.priceRange.minVariantPrice.amount,
                        rec.priceRange.minVariantPrice.currencyCode
                      )}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <SidebarLinks className="flex-col-reverse max-md:hidden py-sides w-full max-w-[408px] pr-sides max-md:pr-0 max-md:py-0" />
        </div>

        {/* Desktop Gallery */}
        <div className="hidden overflow-y-auto relative col-span-7 col-start-6 w-full md:block">
          <Suspense fallback={null}>
            <DesktopGallery product={product} />
          </Suspense>
        </div>
      </div>
    </PageLayout>
  );
}
