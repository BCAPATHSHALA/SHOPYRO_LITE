import { NavItem } from "./types";

export const CONTACT_LINKS: NavItem[] = [
  { label: "Mobile", href: "https://x.com" },
  { label: "Location", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
];

export const HIDDEN_PRODUCT_TAG = "nextjs-frontend-hidden";
export const DEFAULT_OPTION = "Default Title";

export const isDevelopment = process.env.NODE_ENV === "development";

// Site-wide branding
export const SITE_NAME = "Shopyro";
export const SITE_TAGLINE = `${SITE_NAME}, your one-stop shop for all your needs.`;

// One-stop site settings for selling/customization purposes
export const SITE_SETTINGS = {
  name: SITE_NAME,
  tagline: SITE_TAGLINE,
  logoAlt: `${SITE_NAME} logo`,
  companyEmail: "hello@websyro.app",
  companyPhone: "+91-9191-9191-91",
  copyrightName: SITE_NAME,
  links: {
    terms: "/terms",
    privacy: "/privacy",
    contact: "/contact",
    about: "/about",
    sitemap: "/sitemap.xml",
  },
} as const;

// Footer configuration (easy to customize)
export type SimpleLink = { label: string; href: string };
export const SOCIAL_LINKS: SimpleLink[] = [
  { label: "Twitter", href: "https://x.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
];

export const FOOTER_LINKS: { title: string; links: SimpleLink[] }[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Quick Links",
    links: [{ label: "Shop", href: "/shop" }],
  },
];

// Internal color mapping for common color names to hex values
export const COLOR_MAP: Record<string, string> = {
  // Basic colors
  red: "#ef4444",
  blue: "#3b82f6",
  green: "#22c55e",
  yellow: "#eab308",
  orange: "#f97316",
  purple: "#a855f7",
  pink: "#ec4899",
  black: "#000000",
  white: "#ffffff",
  gray: "#6b7280",
  grey: "#6b7280",
  brown: "#92400e",
  navy: "#1e3a8a",
  teal: "#14b8a6",
  cyan: "#06b6d4",
  indigo: "#6366f1",
  violet: "#8b5cf6",
  lime: "#84cc16",
  emerald: "#10b981",
  rose: "#f43f5e",
  fuchsia: "#d946ef",
  slate: "#64748b",
  neutral: "#737373",
  stone: "#78716c",
  zinc: "#71717a",

  // Additional common variations
  "light-blue": "#38bdf8",
  "dark-blue": "#1e40af",
  "light-green": "#4ade80",
  "dark-green": "#232E23",
  "light-gray": "#d1d5db",
  "dark-gray": "#374151",
  "light-grey": "#d1d5db",
  "dark-grey": "#374151",
  "dark-brown": "#6b4a1b",
  beige: "#f5f5dc",
  maroon: "#800000",
  olive: "#808000",
  aqua: "#00ffff",
  silver: "#c0c0c0",
  gold: "#ffd700",
  coral: "#ff7f50",
  salmon: "#fa8072",
  khaki: "#f0e68c",
  sand: "#e7d3b7",
  plum: "#dda0dd",
  tan: "#d2b48c",
  crimson: "#dc143c",
  turquoise: "#40e0d0",
  lavender: "#e6e6fa",
  ivory: "#fffff0",
  mint: "#98fb98",
  peach: "#ffcba4",
  pistachio: "#93c572",
  cream: "#edd0ae",
  "army-green": "#4b5320",
  "navy-blue": "#000080",
  wood: "#8d6e63",
};
