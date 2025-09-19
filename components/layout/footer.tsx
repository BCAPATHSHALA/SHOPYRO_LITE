import Link from "next/link";
import {
  FOOTER_LINKS,
  SITE_NAME,
  SITE_SETTINGS,
  SITE_TAGLINE,
  SOCIAL_LINKS,
} from "@/siteconfig/site.config";

export function Footer() {
  return (
    <footer className="p-sides relative z-20 bg-card text-card-foreground">
      <div className="w-full rounded-xl border">
        {/* Top section */}
        <div className="p-sides py-12 grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block" prefetch>
              <span className="block font-bangers font-extrabold text-2xl md:text-4xl lg:text-6xl xl:text-8xl uppercase tracking-wider">
                {SITE_NAME}
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground max-w-[46ch]">
              {SITE_TAGLINE}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-row gap-6">
            {FOOTER_LINKS.map((section) => (
              <div key={section.title} className="flex flex-col gap-2">
                <h4 className="font-semibold text-sm uppercase tracking-wide text-foreground/80">
                  {section.title}
                </h4>
                {section.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    prefetch
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wide text-foreground/80 mb-2">
              Follow Us
            </h4>
            <div className="flex flex-col md:flex-row gap-4">
              {SOCIAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  prefetch
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t">
          <div className="p-sides py-5 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground gap-3">
            <p>
              © {2025} {SITE_NAME}, powered by Websyro. All rights reserved.
            </p>
            <div className="flex gap-4">
              {SITE_SETTINGS.links.map((item) => {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="hover:underline underline-offset-4"
                    prefetch
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
