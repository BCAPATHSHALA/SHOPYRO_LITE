import { PageLayout } from "@/components/layout/page-layout";
import { AboutHero } from "./components/about-hero";
import { OurStory } from "./components/our-story";
import { OurValues } from "./components/our-values";
import { OurTeam } from "./components/our-team";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us - Shopyro",
  description:
    "Learn about Shopyro's mission to provide premium, sustainable furniture that transforms your space and enhances your lifestyle.",
  openGraph: {
    title: "About Us - Shopyro",
    description:
      "Learn about Shopyro's mission to provide premium, sustainable furniture that transforms your space and enhances your lifestyle.",
  },
};

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
