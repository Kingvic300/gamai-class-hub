import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  variant?: "default" | "accent" | "secondary";
  className?: string;
}

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  variant = "default", 
  className 
}: FeatureCardProps) {
  return (
    <Card className={cn(
      "group relative overflow-hidden transition-smooth hover:shadow-primary hover:-translate-y-1 gradient-card border-0",
      variant === "accent" && "hover:shadow-accent",
      variant === "secondary" && "hover:shadow-secondary",
      className
    )}>
      <CardContent className="p-6">
        <div className={cn(
          "w-12 h-12 rounded-xl mb-4 flex items-center justify-center transition-smooth group-hover:scale-110",
          variant === "default" && "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
          variant === "accent" && "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground",
          variant === "secondary" && "bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground"
        )}>
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-smooth">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}