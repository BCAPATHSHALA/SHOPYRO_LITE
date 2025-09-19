import { SectionHeader } from "../atoms/section-header"; 
interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export function HeroSection({
  title,
  subtitle,
  description,
  className,
}: HeroSectionProps) {
  return (
    <section
      className={`py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background ${className}`}
    >
      <div className="max-w-4xl mx-auto px-4">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          description={description}
        />
      </div>
    </section>
  );
}
