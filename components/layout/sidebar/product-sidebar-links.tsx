import { CONTACT_LINKS } from "@/siteconfig/site.config";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const linkVariants = cva(
  "group flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm transition-all duration-300 hover:bg-card/60 hover:border-border hover:shadow-md hover:scale-[1.02] active:scale-[0.98]",
  {
    variants: {
      invert: {
        true: "border-background/20 bg-background/10 hover:bg-background/20 text-background/70 hover:text-background",
        false: "text-muted-foreground hover:text-foreground",
      },
      size: {
        sm: "text-xs 2xl:text-sm p-3",
        base: "text-sm 2xl:text-base p-4",
      },
    },
    defaultVariants: {
      invert: false,
      size: "sm",
    },
  }
);

const getContactIcon = (label: string) => {
  const iconProps = {
    size: 18,
    className:
      "text-primary group-hover:text-primary/80 transition-colors duration-300",
  };

  switch (label.toLowerCase()) {
    case "mobile":
      return <Phone {...iconProps} />;
    case "email":
      return <Mail {...iconProps} />;
    case "location":
      return <MapPin {...iconProps} />;
    default:
      return <Phone {...iconProps} />;
  }
};

const formatContactHref = (label: string, href: string) => {
  switch (label.toLowerCase()) {
    case "mobile":
      return `tel:${href}`;
    case "email":
      return `mailto:${href}`;
    case "location":
      return `https://maps.google.com/?q=${encodeURIComponent(href)}`;
    default:
      return href;
  }
};

interface SidebarLinksProps {
  className?: string;
  invert?: boolean;
  size?: "sm" | "base";
}

export function SidebarLinks({ className, invert, size }: SidebarLinksProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {CONTACT_LINKS.map((link) => (
        <Link
          key={link.href}
          href={formatContactHref(link.label, link.href)}
          target="_blank"
          rel="noopener noreferrer"
          className={linkVariants({ invert, size })}
        >
          <div className="flex-shrink-0">{getContactIcon(link.label)}</div>
          <div className="flex flex-col min-w-0">
            <span className="font-medium text-foreground group-hover:text-foreground/90 transition-colors duration-300">
              {link.label}
            </span>
            <span className="text-xs text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300 truncate">
              {link.href}
            </span>
          </div>
          <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              className="text-muted-foreground"
              fill="currentColor"
            >
              <path
                d="M3.5 3L8.5 3L8.5 8M8.5 3L3.5 8"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </Link>
      ))}
    </div>
  );
}
