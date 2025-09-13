import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  FileText, 
  Award, 
  Bell, 
  Users, 
  BookOpen,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// Mock data - in real app this would come from your backend
const mockData = {
  student: {
    name: "Alex Johnson",
    upcomingClasses: [
      { id: 1, title: "Mathematics 101", teacher: "Dr. Smith", time: "10:00 AM", date: "Today" },
      { id: 2, title: "Physics Lab", teacher: "Prof. Wilson", time: "2:00 PM", date: "Tomorrow" }
    ],
    recentMaterials: [
      { id: 1, title: "Algebra Basics.pdf", subject: "Mathematics", uploadedBy: "Dr. Smith" },
      { id: 2, title: "Newton's Laws Presentation", subject: "Physics", uploadedBy: "Prof. Wilson" }
    ],
    pendingAssessments: [
      { id: 1, title: "Math Quiz Chapter 5", dueDate: "Due in 2 days", subject: "Mathematics" },
      { id: 2, title: "Physics Lab Report", dueDate: "Due in 5 days", subject: "Physics" }
    ],
    stats: {
      completedAssignments: 24,
      attendanceRate: 96,
      averageGrade: 87
    }
  }
};

export default function Dashboard() {
  // Mock role detection - in real app this would come from auth context
  const userRole = "student";
  const userData = mockData[userRole as keyof typeof mockData];

  const StatCard = ({ icon: Icon, title, value, trend, color }: any) => (
    <Card className="gradient-card border-0 hover:shadow-primary transition-smooth">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {trend && (
              <p className={`text-xs flex items-center mt-1 ${trend > 0 ? 'text-success' : 'text-destructive'}`}>
                <TrendingUp className="h-3 w-3 mr-1" />
                {trend > 0 ? '+' : ''}{trend}%
              </p>
            )}
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {userData.name}! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your learning journey today.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={CheckCircle}
            title="Completed Assignments"
            value={userData.stats.completedAssignments}
            trend={12}
            color="bg-success/10 text-success"
          />
          <StatCard
            icon={Calendar}
            title="Attendance Rate"
            value={`${userData.stats.attendanceRate}%`}
            trend={4}
            color="bg-primary/10 text-primary"
          />
          <StatCard
            icon={Award}
            title="Average Grade"
            value={`${userData.stats.averageGrade}%`}
            trend={8}
            color="bg-secondary/10 text-secondary"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Classes */}
          <Card className="gradient-card border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Upcoming Classes</span>
              </CardTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {userData.upcomingClasses.map((classItem) => (
                <div key={classItem.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth">
                  <div>
                    <h4 className="font-semibold text-foreground">{classItem.title}</h4>
                    <p className="text-sm text-muted-foreground">{classItem.teacher}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">{classItem.time}</p>
                    <p className="text-xs text-muted-foreground">{classItem.date}</p>
                  </div>
                </div>
              ))}
              <Button className="w-full mt-4 bg-primary/5 text-primary border border-primary/20 hover:bg-primary/10">
                <Calendar className="h-4 w-4 mr-2" />
                Join Next Class
              </Button>
            </CardContent>
          </Card>

          {/* Pending Assessments */}
          <Card className="gradient-card border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-accent" />
                <span>Pending Assessments</span>
              </CardTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {userData.pendingAssessments.map((assessment) => (
                <div key={assessment.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <div>
                      <h4 className="font-semibold text-foreground">{assessment.title}</h4>
                      <p className="text-sm text-muted-foreground">{assessment.subject}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{assessment.dueDate}</span>
                  </div>
                </div>
              ))}
              <Button className="w-full mt-4 bg-accent/5 text-accent border border-accent/20 hover:bg-accent/10">
                <Award className="h-4 w-4 mr-2" />
                Start Assessment
              </Button>
            </CardContent>
          </Card>

          {/* Recent Materials */}
          <Card className="gradient-card border-0">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-secondary" />
                <span>Recent Materials</span>
              </CardTitle>
              <Button variant="ghost" size="sm">View All</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {userData.recentMaterials.map((material) => (
                <div key={material.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-smooth cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{material.title}</h4>
                      <p className="text-sm text-muted-foreground">by {material.uploadedBy}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">Download</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="gradient-card border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-primary" />
                <span>Quick Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button className="h-20 flex-col space-y-2 bg-primary/5 text-primary border border-primary/20 hover:bg-primary/10">
                <Calendar className="h-6 w-6" />
                <span className="text-sm">Join Class</span>
              </Button>
              <Button className="h-20 flex-col space-y-2 bg-accent/5 text-accent border border-accent/20 hover:bg-accent/10">
                <FileText className="h-6 w-6" />
                <span className="text-sm">Browse Materials</span>
              </Button>
              <Button className="h-20 flex-col space-y-2 bg-secondary/5 text-secondary border border-secondary/20 hover:bg-secondary/10">
                <Award className="h-6 w-6" />
                <span className="text-sm">Take Quiz</span>
              </Button>
              <Button className="h-20 flex-col space-y-2 bg-success/5 text-success border border-success/20 hover:bg-success/10">
                <Bell className="h-6 w-6" />
                <span className="text-sm">Notifications</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}