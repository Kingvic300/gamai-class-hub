import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl", 
    lg: "text-3xl",
    xl: "text-4xl md:text-5xl lg:text-6xl"
  };

  return (
    <div className={cn("font-bold tracking-tight", sizeClasses[size], className)}>
      <span className="text-gradient">GAM</span>
      <span className="text-accent">AI</span>
    </div>
  );
}