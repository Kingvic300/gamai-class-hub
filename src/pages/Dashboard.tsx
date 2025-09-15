import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar,
  Award,
  Bell,
  TrendingUp,
  Activity
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect admin users to admin dashboard
    if (user?.role === 'admin') {
      navigate('/admin', { replace: true });
    }
  }, [user, navigate]);

  if (!user) {
    return null; // This should be handled by ProtectedRoute, but just in case
  }

  const getDashboardContent = () => {
    switch (user.role) {
      case 'teacher':
        return {
          title: "Teacher Dashboard",
          subtitle: "Manage your classes and track student progress",
          stats: [
            { icon: Users, label: "Active Students", value: "124", color: "text-primary" },
            { icon: BookOpen, label: "Classes This Week", value: "8", color: "text-accent" },
            { icon: Award, label: "Assessments Created", value: "15", color: "text-secondary" },
            { icon: Calendar, label: "Upcoming Classes", value: "3", color: "text-success" }
          ],
          quickActions: [
            { label: "Create Class", href: "/classes", icon: Calendar },
            { label: "Upload Materials", href: "/materials", icon: BookOpen },
            { label: "Create Assessment", href: "/assessments", icon: Award },
            { label: "View Curriculum", href: "/curriculum", icon: GraduationCap }
          ]
        };
      
      case 'student':
        return {
          title: "Student Dashboard",
          subtitle: "Track your learning progress and upcoming classes",
          stats: [
            { icon: BookOpen, label: "Enrolled Classes", value: "6", color: "text-primary" },
            { icon: Calendar, label: "Classes This Week", value: "12", color: "text-accent" },
            { icon: Award, label: "Completed Assessments", value: "8", color: "text-secondary" },
            { icon: TrendingUp, label: "Average Score", value: "87%", color: "text-success" }
          ],
          quickActions: [
            { label: "Join Classes", href: "/classes", icon: Calendar },
            { label: "Access Materials", href: "/materials", icon: BookOpen },
            { label: "Take Assessments", href: "/assessments", icon: Award },
            { label: "View Schedule", href: "/curriculum", icon: GraduationCap }
          ]
        };
      
      case 'parent':
        return {
          title: "Parent Dashboard",
          subtitle: "Monitor your child's educational progress",
          stats: [
            { icon: Users, label: "Children", value: "2", color: "text-primary" },
            { icon: Calendar, label: "Classes This Week", value: "16", color: "text-accent" },
            { icon: Award, label: "Recent Assessments", value: "5", color: "text-secondary" },
            { icon: Activity, label: "Attendance Rate", value: "95%", color: "text-success" }
          ],
          quickActions: [
            { label: "View Classes", href: "/classes", icon: Calendar },
            { label: "Check Materials", href: "/materials", icon: BookOpen },
            { label: "Review Assessments", href: "/assessments", icon: Award },
            { label: "View Schedule", href: "/curriculum", icon: GraduationCap }
          ]
        };
      
      default:
        return {
          title: "Dashboard",
          subtitle: "Welcome to Gamai",
          stats: [],
          quickActions: []
        };
    }
  };

  const dashboardContent = getDashboardContent();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">{dashboardContent.title}</h1>
          <p className="text-muted-foreground">{dashboardContent.subtitle}</p>
          <p className="text-sm text-muted-foreground mt-1">Welcome back, {user.fullName}!</p>
        </div>

        {/* Stats Grid */}
        {dashboardContent.stats.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardContent.stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="gradient-card border-0 hover:shadow-primary transition-smooth">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      </div>
                      <div className={`w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center`}>
                        <Icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Quick Actions */}
        {dashboardContent.quickActions.length > 0 && (
          <Card className="gradient-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {dashboardContent.quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      asChild
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center space-y-2 hover:bg-primary/5 hover:border-primary/30 transition-smooth"
                    >
                      <a href={action.href}>
                        <Icon className="h-6 w-6 text-primary" />
                        <span className="text-sm font-medium">{action.label}</span>
                      </a>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Activity */}
        <Card className="gradient-card border-0 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-accent" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/30">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Welcome to Gamai!</p>
                  <p className="text-xs text-muted-foreground">Your account has been successfully created</p>
                </div>
                <span className="text-xs text-muted-foreground">Just now</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}