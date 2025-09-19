import { FeatureCard } from "@/components/static-pages/molecules/feature-card";
import { ABOUT_PAGE_CONTENT } from "@/siteconfig/static-pages.config";
import { Shield, Leaf, Heart, Lightbulb } from "lucide-react";

const iconMap = {
  Shield,
  Leaf,
  Heart,
  Lightbulb,
};

export function OurValues() {
  const { values } = ABOUT_PAGE_CONTENT;

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <FeatureCard
              key={index}
              title={value.title}
              description={value.description}
              icon={iconMap[value.icon as keyof typeof iconMap]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
