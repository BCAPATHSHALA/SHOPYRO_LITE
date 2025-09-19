import { PageLayout } from "@/components/layout/page-layout";
import { HeroSection } from "@/components/static-pages/organisms/hero-section";
import { FAQItem } from "@/components/static-pages/molecules/faq-item";
import { Accordion } from "@/components/ui/accordion";
import { FAQ_CONTENT } from "@/siteconfig/static-pages.config";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ - Shopyro",
  description:
    "Find answers to frequently asked questions about Shopyro's furniture, shipping, returns, and more.",
  openGraph: {
    title: "FAQ - Shopyro",
    description:
      "Find answers to frequently asked questions about Shopyro's furniture, shipping, returns, and more.",
  },
};

export default function FAQPage() {
  const { hero, categories } = FAQ_CONTENT;

  return (
    <PageLayout>
      <div className="min-h-screen">
        <HeroSection title={hero.title} subtitle={hero.subtitle} />

        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="space-y-12">
              {categories.map((category, categoryIndex) => (
                <div key={categoryIndex} className="space-y-6">
                  <h2 className="text-2xl md:text-3xl font-bold mt-4">
                    {category.title}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.faqs.map((faq, faqIndex) => (
                      <FAQItem
                        key={faqIndex}
                        question={faq.question}
                        answer={faq.answer}
                        value={`${categoryIndex}-${faqIndex}`}
                      />
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
