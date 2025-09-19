import { PageLayout } from "@/components/layout/page-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, Truck, Shield, Headphones } from "lucide-react";

import { getFeaturedProducts } from "@/lib/shopify";
import { ProductCard } from "./shop/components/product-card";

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  return (
    <PageLayout>
      <div className="min-h-screen">
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/5" />
          <Image
            src="/modern-furniture-showroom.webp"
            alt="Hero background"
            fill
            className="object-cover -z-10 opacity-55 blur-xs"
            priority
          />
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <Badge
              variant="outline"
              className="mb-6 bg-background/80 backdrop-blur-sm"
            >
              New Collection Available
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6">
              Transform Your Space with{" "}
              <span className="text-primary">Premium Furniture</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Discover our curated collection of modern, sustainable furniture
              designed to elevate your home and lifestyle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/shop">
                  Shop Collection <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-transparent"
              >
                <Link href="/shop">View Catalog</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  On orders over $299
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Quality Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  Premium materials only
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Headphones className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">24/7 Support</h3>
                <p className="text-sm text-muted-foreground">
                  Expert customer service
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">5-Star Rated</h3>
                <p className="text-sm text-muted-foreground">
                  Trusted by thousands
                </p>
              </div>
            </div>
          </div>
        </section>

        {featuredProducts && (
          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Featured Products
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Hand-picked favorites from our latest collection.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="text-center mt-12">
                <Button size="lg" asChild>
                  <Link href="/shop">
                    View Full Collection <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        <section className="relative py-24 bg-gradient-to-r from-primary/80 to-primary/60 text-primary-foreground overflow-hidden">
          {/* Decorative background shapes */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/2 w-[400px] h-[400px] bg-secondary/20 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            <div className="absolute bottom-0 right-1/3 w-[300px] h-[300px] bg-accent/20 rounded-full translate-x-1/2 translate-y-1/2 animate-pulse"></div>
          </div>

          <div className="max-w-3xl mx-auto text-center px-6">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
              Ready to Transform Your Space?
            </h2>
            <p className="text-lg md:text-xl mb-10 text-primary-foreground/90 leading-relaxed">
              Join thousands of satisfied customers who have elevated their
              homes with our premium furniture collection. Make your space
              reflect your style.
            </p>
            <Button
              size="lg"
              className="text-lg px-10 py-4 transition-transform hover:scale-105"
              asChild
            >
              <Link
                href="/shop"
                className="flex items-center justify-center gap-2"
              >
                Start Shopping <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
