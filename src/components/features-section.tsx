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
  Zap
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: Calendar,
      title: "Smart Class Booking",
      description: "Teachers create and manage classes with AI-optimized scheduling. Students join seamlessly with real-time availability.",
      variant: "default" as const
    },
    {
      icon: FileText,
      title: "Materials Management",
      description: "Upload, organize, and share course materials with intelligent categorization and easy access for all participants.",
      variant: "accent" as const
    },
    {
      icon: Award,
      title: "Interactive Assessments",
      description: "Create engaging quizzes and assignments with instant feedback and detailed analytics on student performance.",
      variant: "secondary" as const
    },
    {
      icon: BookOpen,
      title: "Dynamic Curriculum",
      description: "Adaptive curriculum that adjusts to student progress with AI-powered recommendations and learning paths.",
      variant: "default" as const
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Real-time alerts for classes, assignments, and important updates delivered across all platforms.",
      variant: "accent" as const
    },
    {
      icon: Users,
      title: "Multi-Role Access",
      description: "Tailored experiences for admins, teachers, students, and parents with role-based permissions and features.",
      variant: "secondary" as const
    },
    {
      icon: Target,
      title: "Progress Tracking",
      description: "Comprehensive analytics and reporting tools to monitor student progress and identify improvement areas.",
      variant: "default" as const
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Enterprise-grade security with data protection, privacy controls, and compliance with educational standards.",
      variant: "accent" as const
    },
    {
      icon: Zap,
      title: "AI-Powered Insights",
      description: "Leverage artificial intelligence for personalized learning recommendations and predictive analytics.",
      variant: "secondary" as const
    }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-gradient">Powerful Features</span>
            <br />
            <span className="text-foreground">for Modern Education</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Everything you need to create engaging, effective, and efficient learning experiences 
            for everyone in your educational community.
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