import { HeroSection } from "@/components/static-pages/organisms/hero-section";
import { ABOUT_PAGE_CONTENT } from "@/siteconfig/static-pages.config";

export function AboutHero() {
  return (
    <HeroSection
      title={ABOUT_PAGE_CONTENT.hero.title}
      subtitle={ABOUT_PAGE_CONTENT.hero.subtitle}
      description={ABOUT_PAGE_CONTENT.hero.description}
    />
  );
}
