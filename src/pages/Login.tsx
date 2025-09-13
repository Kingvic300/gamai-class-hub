import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Mail, Lock } from "lucide-react";
import { Logo } from "@/components/logo";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';
  const handleInputChange = (field: string, value: string | boolean) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { error } = await login(credentials.email, credentials.password);
      
      if (error) {
        toast.error("Login Failed", {
          description: error
        });
      } else {
        toast.success("Welcome back!", {
          description: "You have been successfully logged in."
        });
        
        // Redirect to intended page or dashboard based on role
        if (from === '/') {
          // Redirect to role-specific dashboard
          navigate('/student'); // This will be handled by auth context
        } else {
          navigate(from, { replace: true });
        }
      }
    } catch (error) {
      toast.error("Login Failed", {
        description: "An unexpected error occurred. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="gradient-card border-0 shadow-primary">
          <CardHeader className="text-center pb-6">
            <Logo size="lg" className="mx-auto mb-6" />
            <CardTitle className="text-3xl font-bold text-gradient mb-2">Welcome Back</CardTitle>
            <p className="text-muted-foreground">
              Sign in to continue your learning journey
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={credentials.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email"
                    className="pl-10 transition-smooth focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={credentials.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="Enter your password"
                    className="pl-10 transition-smooth focus:ring-2 focus:ring-primary/20"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="rememberMe"
                    checked={credentials.rememberMe}
                    onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                  />
                  <Label htmlFor="rememberMe" className="text-sm text-muted-foreground cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-primary hover:underline transition-smooth"
                >
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit"
                className="w-full gradient-primary text-white shadow-primary hover:shadow-glow transition-bounce py-6 text-lg font-semibold"
                disabled={isLoading || !credentials.email || !credentials.password}
              >
                {isLoading ? "Signing In..." : "Sign In"}
                {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline font-medium transition-smooth">
                  Sign up for free
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Trust indicators */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-4">Trusted by educators worldwide</p>
          <div className="flex justify-center items-center space-x-6 opacity-60">
            <div className="text-sm">
              <span className="font-bold text-primary">1000+</span> Schools
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="text-sm">
              <span className="font-bold text-accent">50K+</span> Students
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="text-sm">
              <span className="font-bold text-secondary">10K+</span> Teachers
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}