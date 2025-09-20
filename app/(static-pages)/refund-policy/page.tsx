import { PageLayout } from "@/components/layout/page-layout";
import { HeroSection } from "@/components/static-pages/organisms/hero-section";
import { PolicySection } from "@/components/static-pages/molecules/policy-section";
import { REFUND_POLICY_CONTENT } from "@/siteconfig/static-pages.config";
import { PAGE_METADATA } from "@/siteconfig/seo.config";

export const metadata = PAGE_METADATA.refundPolicy;

export default function RefundPolicyPage() {
  const { hero, sections } = REFUND_POLICY_CONTENT;

  return (
    <PageLayout>
      <div className="min-h-screen">
        <HeroSection
          title={hero.title}
          subtitle={hero.subtitle}
          description={hero.description}
        />

        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4">
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
