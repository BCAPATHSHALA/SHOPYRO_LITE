import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  className,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={cn("space-y-4", centered && "text-center", className)}>
      {subtitle && (
        <p className="text-sm font-medium text-primary uppercase tracking-wider">
          {subtitle}
        </p>
      )}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
        {title}
      </h1>
      {description && (
        <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
