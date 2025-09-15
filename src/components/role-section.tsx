import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Heart,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

export function RoleSection() {
  const roles = [
    {
      icon: Users,
      title: "For Administrators",
      description: "Complete oversight and management of your educational institution with powerful administrative tools",
      features: [
        "User management and approval workflows",
        "Comprehensive analytics and reporting",
        "System-wide configuration controls",
        "Multi-institution support capabilities"
      ],
      color: "bg-primary/10 text-primary",
      buttonStyle: "bg-primary hover:bg-primary/90 text-white shadow-elegant"
    },
    {
      icon: GraduationCap,
      title: "For Teachers",
      description: "Enhance your teaching effectiveness with intelligent tools and comprehensive student insights",
      features: [
        "Streamlined class creation and management",
        "Advanced material organization system",
        "Sophisticated assessment creation tools",
        "Detailed student progress analytics"
      ],
      color: "bg-accent/10 text-accent",
      buttonStyle: "bg-accent hover:bg-accent/90 text-white shadow-elegant"
    },
    {
      icon: BookOpen,
      title: "For Students",
      description: "Engage with your learning journey through intuitive tools designed for academic success",
      features: [
        "One-click class joining and participation",
        "Centralized access to all course materials",
        "Interactive assessment experiences",
        "Personal progress tracking dashboard"
      ],
      color: "bg-secondary/10 text-secondary",
      buttonStyle: "bg-secondary hover:bg-secondary/90 text-white shadow-elegant"
    },
    {
      icon: Heart,
      title: "For Parents",
      description: "Stay actively involved in your child's educational journey with comprehensive monitoring tools",
      features: [
        "Real-time class attendance monitoring",
        "Detailed progress reports and insights",
        "Important notification management",
        "Direct teacher communication channels"
      ],
      color: "bg-success/10 text-success",
      buttonStyle: "bg-success hover:bg-success/90 text-white shadow-elegant"
    }
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            <span className="text-slate-900 dark:text-slate-100">Designed for</span>
            <br />
            <span className="text-gradient">Every Educational Role</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Tailored experiences and specialized tools designed specifically for each member 
            of your educational community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <Card key={index} className="group relative overflow-hidden transition-smooth hover:shadow-elegant hover:-translate-y-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center transition-smooth group-hover:scale-110 ${role.color}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-slate-100 group-hover:text-primary transition-smooth">
                    {role.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
                    {role.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {role.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                        <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    asChild 
                    className={`w-full transition-smooth ${role.buttonStyle}`}
                  >
                    <Link to="/register">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}