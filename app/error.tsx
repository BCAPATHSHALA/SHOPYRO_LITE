"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { SiShopify } from "react-icons/si";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto mb-6 mt-top-spacing flex max-w-lg flex-col items-center justify-center rounded-2xl border border-border bg-white p-10 shadow-sm transition hover:shadow-md md:p-14">
      {/* Shopify icon */}
      <div className="flex items-center gap-2 text-green-600">
        <SiShopify className="h-8 w-8" />
        <h1 className="text-2xl font-semibold">Shopify Storefront</h1>
      </div>

      {/* Error section */}
      <div className="mt-6 flex flex-col items-center text-center">
        <AlertTriangle className="h-10 w-10 text-red-500" />
        <h2 className="mt-3 text-xl font-bold">Something went wrong</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          There was an issue with our storefront. This might be temporary —
          please try again in a moment.
        </p>
      </div>

      {/* Retry button */}
      <Button
        size="lg"
        className="mt-6 w-full md:w-auto"
        onClick={() => reset()}
      >
        Try Again
      </Button>
    </div>
  );
}
