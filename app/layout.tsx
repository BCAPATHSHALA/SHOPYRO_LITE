import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { CartProvider } from "@/components/cart/cart-context";
import { DebugGrid } from "@/components/debug-grid";
import { isDevelopment } from "@/lib/constants";
import { SITE_NAME, SITE_TAGLINE } from "@/siteconfig/site.config";
import { getCollections } from "@/lib/shopify";
import { Header } from "../components/layout/header";
import dynamic from "next/dynamic";
import { WebsyroProvider } from "../lib/context";

import { Geist, Geist_Mono } from "next/font/google";
import { Bangers } from "next/font/google";

const WebsyroSetup = dynamic(() => import("@/components/websyro-setup"));

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
});

const isWebsyro =
  process.env["VERCEL_URL"]?.includes("vusercontent.net") ?? false;

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_TAGLINE,
};

/**
 * Root Layout Component
 *
 * This is the main layout component that wraps the entire application.
 * It provides essential providers and global functionality including:
 * - Shopify e-commerce integration with cart management
 * - Font configuration with Geist Sans, Mono, and Bangers
 * - Toast notifications for user feedback
 * - URL state management with nuqs
 * - Development debugging tools
 * - websyro environment detection and setup
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const collections = await getCollections();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bangers.variable} antialiased min-h-screen font-sans`}
        suppressHydrationWarning
      >
        <WebsyroProvider isWebsyro={isWebsyro}>
          <CartProvider>
            <NuqsAdapter>
              <main data-vaul-drawer-wrapper="true">
                <Header collections={collections} />
                {children}
              </main>
              {isDevelopment && <DebugGrid />}
              <Toaster closeButton position="bottom-right" />
            </NuqsAdapter>
          </CartProvider>
          {isWebsyro && <WebsyroSetup />}
        </WebsyroProvider>
      </body>
    </html>
  );
}
