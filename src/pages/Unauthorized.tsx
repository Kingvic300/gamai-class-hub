import { Link } from "react-router-dom";
import { Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md gradient-card border-0 shadow-primary">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">Access Denied</CardTitle>
          <p className="text-muted-foreground">
            You don't have permission to access this page.
          </p>
        </CardHeader>
        <CardContent className="text-center">
          <Button asChild className="gradient-primary text-white shadow-primary hover:shadow-glow transition-bounce">
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}