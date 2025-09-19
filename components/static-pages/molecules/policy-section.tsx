interface PolicySectionProps {
  title: string;
  content: string[];
}

export function PolicySection({ title, content }: PolicySectionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="space-y-3">
        {content.map((paragraph, index) => (
          <p key={index} className="text-muted-foreground leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
