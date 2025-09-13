import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import gamaiLogo from "@/assets/gamai-logo.png";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-5" />
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-pulse delay-300" />
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-secondary/10 rounded-full blur-xl animate-pulse delay-700" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src={gamaiLogo} alt="Gamai" className="h-20 w-auto drop-shadow-lg" />
          </div>

          {/* Hero headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="text-gradient">Transform Education</span>
            <br />
            <span className="text-foreground">with AI-Powered Learning</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Gamai connects teachers, students, and parents in a seamless educational ecosystem 
            powered by artificial intelligence and modern learning tools.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Users className="h-5 w-5 text-primary" />
              <span className="font-semibold text-foreground">Multi-Role Platform</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <BookOpen className="h-5 w-5 text-accent" />
              <span className="font-semibold text-foreground">Smart Curriculum</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Sparkles className="h-5 w-5 text-secondary" />
              <span className="font-semibold text-foreground">AI-Enhanced Learning</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              className="gradient-primary text-white border-0 shadow-primary hover:shadow-glow transition-bounce px-8 py-3 text-lg font-semibold"
            >
              <Link to="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 px-8 py-3 text-lg font-semibold transition-smooth"
            >
              <Link to="/login">
                Sign In
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-4">Trusted by educators worldwide</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-2xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground">Schools</div>
              <div className="w-px h-8 bg-border" />
              <div className="text-2xl font-bold text-accent">50K+</div>
              <div className="text-sm text-muted-foreground">Students</div>
              <div className="w-px h-8 bg-border" />
              <div className="text-2xl font-bold text-secondary">10K+</div>
              <div className="text-sm text-muted-foreground">Teachers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}