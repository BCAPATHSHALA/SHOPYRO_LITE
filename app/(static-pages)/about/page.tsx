import { PageLayout } from "@/components/layout/page-layout";
import { AboutHero } from "./components/about-hero";
import { OurStory } from "./components/our-story";
import { OurValues } from "./components/our-values";
import { OurTeam } from "./components/our-team";
import { PAGE_METADATA } from "@/siteconfig/seo.config";

export const metadata = PAGE_METADATA.about;

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="min-h-screen">
        <AboutHero />
        <OurStory />
        <OurValues />
        <OurTeam />
      </div>
    </PageLayout>
  );
}
