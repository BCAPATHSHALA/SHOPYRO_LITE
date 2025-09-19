"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";

export function ShareButton({ productTitle }: { productTitle: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: productTitle,
      text: `Check out this product: ${productTitle}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy link:", err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      aria-label="Share product"
      className="flex items-center gap-2 px-3 py-2 rounded-md border hover:bg-accent transition"
    >
      <Share2 className="h-4 w-4" />
      <span className="text-sm">{copied ? "Link copied!" : "Share"}</span>
    </button>
  );
}
