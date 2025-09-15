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
      "group relative overflow-hidden transition-smooth hover:shadow-elegant hover:-translate-y-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700",
      className
    )}>
      <CardContent className="p-8">
        <div className={cn(
          "w-14 h-14 rounded-xl mb-6 flex items-center justify-center transition-smooth group-hover:scale-110",
          variant === "default" && "bg-primary/10 text-primary",
          variant === "accent" && "bg-accent/10 text-accent",
          variant === "secondary" && "bg-secondary/10 text-secondary"
        )}>
          <Icon className="h-7 w-7" />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100 group-hover:text-primary transition-smooth">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}