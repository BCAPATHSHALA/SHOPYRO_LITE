import { Card, CardContent } from "@/components/ui/card";
import { IconWrapper } from "../atoms/icon-wrapper";
import type { LucideIcon } from "lucide-react";

interface ContactMethodProps {
  title: string;
  description: string;
  value: string;
  icon: LucideIcon;
  href?: string;
}

export function ContactMethod({
  title,
  description,
  value,
  icon,
  href,
}: ContactMethodProps) {
  const content = (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardContent className="p-6 space-y-4">
        <IconWrapper icon={icon} variant="primary" />
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className="font-medium text-primary">{value}</p>
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    );
  }

  return content;
}
