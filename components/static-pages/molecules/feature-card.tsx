import { Card, CardContent } from "@/components/ui/card";
import { IconWrapper } from "../atoms/icon-wrapper";
import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  className,
}: FeatureCardProps) {
  return (
    <Card className={className}>
      <CardContent className="p-6 text-center space-y-4">
        <IconWrapper icon={icon} variant="primary" className="mx-auto" />
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
