import { PageLayout } from "@/components/layout/page-layout";
import { HeroSection } from "@/components/static-pages/organisms/hero-section";
import { PolicySection } from "@/components/static-pages/molecules/policy-section";
import { TERMS_CONDITIONS_CONTENT } from "@/siteconfig/static-pages.config";
import { PAGE_METADATA } from "@/siteconfig/seo.config";

export const metadata = PAGE_METADATA.termsConditions;

export default function TermsConditionsPage() {
  const { lastUpdated, sections } = TERMS_CONDITIONS_CONTENT;

  return (
    <PageLayout>
      <div className="min-h-screen">
        <HeroSection
          title="Terms & Conditions"
          description="Please read these terms and conditions carefully before using our website or purchasing our products."
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
