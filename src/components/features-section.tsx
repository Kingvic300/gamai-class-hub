import { FeatureCard } from "@/components/feature-card";
import { 
  Calendar, 
  FileText, 
  Award, 
  Bell, 
  Users, 
  BookOpen,
  Target,
  Shield,
  BarChart3
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Calendar,
      title: "Smart Class Management",
      description: "Streamlined class scheduling with automated notifications and seamless booking system for optimal learning experiences.",
      variant: "default" as const
    },
    {
      icon: FileText,
      title: "Resource Library",
      description: "Centralized material management with intelligent organization, version control, and instant access across all devices.",
      variant: "accent" as const
    },
    {
      icon: Award,
      title: "Assessment Tools",
      description: "Comprehensive evaluation system with real-time feedback, detailed analytics, and customizable grading rubrics.",
      variant: "secondary" as const
    },
    {
      icon: BookOpen,
      title: "Curriculum Planning",
      description: "Structured learning pathways with progress tracking, milestone management, and adaptive content delivery.",
      variant: "default" as const
    },
    {
      icon: Bell,
      title: "Communication Hub",
      description: "Unified messaging system connecting all stakeholders with priority alerts and scheduled announcements.",
      variant: "accent" as const
    },
    {
      icon: Users,
      title: "Role-Based Access",
      description: "Secure permission system tailored for administrators, teachers, students, and parents with granular controls.",
      variant: "secondary" as const
    },
    {
      icon: Target,
      title: "Performance Analytics",
      description: "Data-driven insights with comprehensive reporting, trend analysis, and actionable recommendations.",
      variant: "default" as const
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with encrypted data transmission, secure authentication, and compliance standards.",
      variant: "accent" as const
    },
    {
      icon: BarChart3,
      title: "Smart Insights",
      description: "Advanced analytics engine providing personalized learning recommendations and predictive performance metrics.",
      variant: "secondary" as const
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            <span className="text-gradient">Comprehensive Features</span>
            <br />
            <span className="text-slate-900 dark:text-slate-100">for Modern Education</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Everything you need to create engaging, effective, and efficient learning experiences 
            for your entire educational community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              variant={feature.variant}
            />
          ))}
        </div>
      </div>
    </section>
  );
}