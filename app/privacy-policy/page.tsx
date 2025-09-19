import { PageLayout } from "@/components/layout/page-layout";
import { HeroSection } from "@/components/static-pages/organisms/hero-section";
import { PolicySection } from "@/components/static-pages/molecules/policy-section";
import { PRIVACY_POLICY_CONTENT } from "@/siteconfig/static-pages.config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - Shopyro",
  description:
    "Read Shopyro's privacy policy to understand how we collect, use, and protect your personal information.",
  openGraph: {
    title: "Privacy Policy - Shopyro",
    description:
      "Read Shopyro's privacy policy to understand how we collect, use, and protect your personal information.",
  },
};

export default function PrivacyPolicyPage() {
  const { lastUpdated, sections } = PRIVACY_POLICY_CONTENT;

  return (
    <PageLayout>
      <div className="min-h-screen">
        <HeroSection
          title="Privacy Policy"
          description="Your privacy is important to us. This policy explains how we collect, use, and protect your information."
        />

        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="mb-8">
              <p className="text-sm text-muted-foreground">
                Last updated: {lastUpdated}
              </p>
            </div>

            <div className="space-y-12">
              {sections.map((section, index) => (
                <PolicySection
                  key={index}
                  title={section.title}
                  content={section.content}
                />
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
