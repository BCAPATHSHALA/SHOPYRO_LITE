import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface IconWrapperProps {
  icon: LucideIcon;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "primary" | "secondary";
}

export function IconWrapper({
  icon: Icon,
  className,
  size = "md",
  variant = "default",
}: IconWrapperProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
  };

  const variantClasses = {
    default: "bg-muted text-muted-foreground",
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary text-secondary-foreground",
  };

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <Icon className={iconSizes[size]} />
    </div>
  );
}
