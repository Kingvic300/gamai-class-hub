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
      description: "Complete control and oversight of your educational institution",
      features: [
        "User management and approvals",
        "Comprehensive analytics dashboard",
        "System-wide configurations",
        "Multi-school support"
      ],
      color: "bg-primary/10 text-primary",
      buttonStyle: "gradient-primary text-white shadow-primary hover:shadow-glow"
    },
    {
      icon: GraduationCap,
      title: "For Teachers",
      description: "Empower your teaching with intelligent tools and insights",
      features: [
        "Easy class creation and booking",
        "Material upload and organization",
        "Assessment creation tools",
        "Student progress tracking"
      ],
      color: "bg-accent/10 text-accent",
      buttonStyle: "bg-accent text-accent-foreground shadow-accent hover:bg-accent/90"
    },
    {
      icon: BookOpen,
      title: "For Students",
      description: "Engage with your learning journey like never before",
      features: [
        "Join classes with one click",
        "Access all course materials",
        "Interactive assessments",
        "Track your progress"
      ],
      color: "bg-secondary/10 text-secondary",
      buttonStyle: "bg-secondary text-secondary-foreground shadow-secondary hover:bg-secondary/90"
    },
    {
      icon: Heart,
      title: "For Parents",
      description: "Stay connected with your child's educational progress",
      features: [
        "Monitor child's classes",
        "View progress reports",
        "Receive important notifications",
        "Communicate with teachers"
      ],
      color: "bg-success/10 text-success",
      buttonStyle: "bg-success text-success-foreground hover:bg-success/90"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-foreground">Built for</span>
            <br />
            <span className="text-gradient">Every Educational Role</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Gamai provides tailored experiences designed specifically for each member 
            of your educational community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {roles.map((role, index) => {
            const Icon = role.icon;
            return (
              <Card key={index} className="group relative overflow-hidden transition-smooth hover:shadow-primary hover:-translate-y-1 gradient-card border-0">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center transition-smooth group-hover:scale-110 ${role.color}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-smooth">
                    {role.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {role.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {role.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    asChild 
                    className={`w-full transition-bounce ${role.buttonStyle}`}
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