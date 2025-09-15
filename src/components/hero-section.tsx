import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/logo";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <Logo size="xl" className="drop-shadow-sm" />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
            <span className="text-gradient">Transform Education</span>
            <br />
            <span className="text-slate-900 dark:text-slate-100">with Smart Learning</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Connect teachers, students, and parents in a comprehensive educational platform 
            designed for modern learning environments.
          </p>

          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium">Multi-Role Platform</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-accent" />
              </div>
              <span className="font-medium">Smart Curriculum</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-secondary" />
              </div>
              <span className="font-medium">Enhanced Learning</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white shadow-elegant px-8 py-3 text-lg font-semibold rounded-lg transition-smooth"
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
              className="border-2 border-slate-200 hover:border-primary/40 hover:bg-primary/5 px-8 py-3 text-lg font-semibold transition-smooth rounded-lg"
            >
              <Link to="/login">
                Sign In
              </Link>
            </Button>
          </div>

          <div className="mt-16 text-center">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Trusted by educational institutions worldwide</p>
            <div className="flex justify-center items-center space-x-12 opacity-70">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">1,000+</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Schools</div>
              </div>
              <div className="w-px h-12 bg-slate-200 dark:bg-slate-700" />
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-1">50K+</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Students</div>
              </div>
              <div className="w-px h-12 bg-slate-200 dark:bg-slate-700" />
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-1">10K+</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Teachers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}