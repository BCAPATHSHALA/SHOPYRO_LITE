"use client";

import type React from "react";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

function SearchBarContent({
  className,
  placeholder = "Search products...",
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  // Initialize search query from URL params
  useEffect(() => {
    const searchQuery = searchParams.get("q") || "";
    setQuery(searchQuery);
    setIsExpanded(!!searchQuery);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/shop");
    }
  };

  const handleClear = () => {
    setQuery("");
    setIsExpanded(false);
    router.push("/shop");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    if (!query) {
      setIsExpanded(false);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className={cn("relative flex items-center", className)}
    >
      <div
        className={cn(
          "relative flex items-center transition-all duration-300 ease-in-out",
          isExpanded ? "w-64 md:w-80" : "w-10"
        )}
      >
        <Input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className={cn(
            "transition-all duration-300 ease-in-out border-0 bg-background/10 backdrop-blur-md",
            isExpanded
              ? "w-full pl-10 pr-10 opacity-100"
              : "w-10 pl-10 pr-0 opacity-0 cursor-pointer"
          )}
        />
        <Button
          type="submit"
          size="sm"
          variant="ghost"
          className="absolute left-0 h-full px-3 hover:bg-transparent"
          onClick={!isExpanded ? handleFocus : undefined}
        >
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span>
        </Button>
        {query && isExpanded && (
          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={handleClear}
            className="absolute right-0 h-full px-3 hover:bg-transparent"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
    </form>
  );
}

export function SearchBar(props: SearchBarProps) {
  return (
    <Suspense
      fallback={
        <div className="relative flex items-center w-10">
          <Button
            size="sm"
            variant="ghost"
            className="h-full px-3 hover:bg-transparent"
          >
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      }
    >
      <SearchBarContent {...props} />
    </Suspense>
  );
}
