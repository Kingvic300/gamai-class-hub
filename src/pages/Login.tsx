import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Logo } from "@/components/logo";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleInputChange = (field: string, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await login(credentials);
      if (result.error) {
        setError(result.error);
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-elegant">
        <CardHeader className="text-center pb-2">
          <Logo className="mx-auto mb-4" />
          <CardTitle className="text-2xl font-bold text-gradient">Welcome Back</CardTitle>
          <p className="text-slate-600 dark:text-slate-300">
            Sign in to your Gamai account
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={credentials.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter your email"
                required
                disabled={isLoading}
                className="border-slate-200 dark:border-slate-600 focus:border-primary focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                  className="border-slate-200 dark:border-slate-600 focus:border-primary focus:ring-primary pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button 
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white shadow-elegant transition-smooth"
              disabled={isLoading || !credentials.email || !credentials.password}
            >
              {isLoading ? "Signing In..." : "Sign In"}
              {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>

          <div className="text-center">
            <Link to="/" className="text-sm text-slate-500 hover:text-primary transition-smooth">
              ← Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}