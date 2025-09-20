import { PageLayout } from "@/components/layout/page-layout";
import { HeroSection } from "@/components/static-pages/organisms/hero-section";
import { ContactMethod } from "@/components/static-pages/molecules/contact-method";
import { ContactForm } from "@/components/static-pages/organisms/contact-form";
import { CONTACT_PAGE_CONTENT } from "@/siteconfig/static-pages.config";
import { Mail, Phone, MapPin } from "lucide-react";
import { PAGE_METADATA } from "@/siteconfig/seo.config";

export const metadata = PAGE_METADATA.contact

const iconMap = {
  Mail,
  Phone,
  MapPin,
};

export default function ContactPage() {
  const { hero, contactMethods, hours } = CONTACT_PAGE_CONTENT;

  return (
    <PageLayout>
      <div className="min-h-screen">
        <HeroSection
          title={hero.title}
          subtitle={hero.subtitle}
          description={hero.description}
        />

        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Methods */}
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6">
                  {contactMethods.map((method, index) => (
                    <ContactMethod
                      key={index}
                      title={method.title}
                      description={method.description}
                      value={method.value}
                      icon={iconMap[method.icon as keyof typeof iconMap]}
                      href={
                        method.icon === "Mail"
                          ? `mailto:${method.value}`
                          : method.icon === "Phone"
                          ? `tel:${method.value}`
                          : undefined
                      }
                    />
                  ))}
                </div>

                {/* Business Hours */}
                <div className="bg-muted/30 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">{hours.title}</h3>
                  <div className="space-y-2">
                    {hours.schedule.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-muted-foreground">
                          {item.day}
                        </span>
                        <span className="font-medium">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
