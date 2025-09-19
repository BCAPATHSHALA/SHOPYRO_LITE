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
  links: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
    { label: "Return Policy", href: "/return-policy" },
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Sitemap", href: "/sitemap.xml" },
  ],
} as const;

// Footer configuration (easy to customize)
export type SimpleLink = { label: string; href: string };
export const CONTACT_LINKS: SimpleLink[] = [
  { label: "Mobile", href: "9149494949" },
  { label: "Email", href: "hello@websyro.com" },
  { label: "Location", href: "Uttar Pradesh, India" },
];
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
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Quick Links",
    links: [
      { label: "Shop", href: "/shop" },
      { label: "Return Policy", href: "/return-policy" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-conditions" },
    ],
  },
];
