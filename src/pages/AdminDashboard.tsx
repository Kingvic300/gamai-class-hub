import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  TrendingUp,
  Settings,
  Shield,
  Search,
  Filter,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  Activity
} from "lucide-react";

const mockUsers = [
  {
    id: 1,
    name: "Dr. Sarah Smith",
    email: "sarah.smith@university.edu",
    role: "teacher",
    status: "active",
    joinDate: "2024-09-15",
    lastActive: "2025-01-14"
  },
  {
    id: 2,
    name: "Alex Johnson", 
    email: "alex.johnson@student.edu",
    role: "student",
    status: "pending",
    joinDate: "2025-01-10",
    lastActive: "2025-01-14"
  },
  {
    id: 3,
    name: "Prof. Michael Johnson",
    email: "m.johnson@university.edu", 
    role: "teacher",
    status: "active",
    joinDate: "2024-08-22",
    lastActive: "2025-01-13"
  },
  {
    id: 4,
    name: "Emily Chen",
    email: "emily.chen@parent.com",
    role: "parent",
    status: "active", 
    joinDate: "2024-11-05",
    lastActive: "2025-01-12"
  }
];

const mockStats = {
  totalUsers: 1247,
  activeClasses: 45,
  totalSubjects: 12,
  systemUptime: "99.9%",
  weeklyGrowth: 12,
  pendingApprovals: 8
};

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleApproveUser = (userId: number) => {
    console.log("Approving user:", userId);
    // In real app, this would call an API
  };

  const handleRejectUser = (userId: number) => {
    console.log("Rejecting user:", userId);
    // In real app, this would call an API
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "active": return "bg-success text-success-foreground";
      case "pending": return "bg-secondary text-secondary-foreground";
      case "inactive": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getRoleColor = (role: string) => {
    switch(role) {
      case "admin": return "bg-destructive/10 text-destructive";
      case "teacher": return "bg-primary/10 text-primary";
      case "student": return "bg-accent/10 text-accent";
      case "parent": return "bg-secondary/10 text-secondary";
      default: return "bg-muted/10 text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage users, monitor system performance, and oversee platform operations
            </p>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button className="gradient-primary text-white shadow-primary hover:shadow-glow transition-bounce">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="gradient-card border-0 hover:shadow-primary transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Users</p>
                  <p className="text-2xl font-bold text-foreground">{mockStats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-success flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{mockStats.weeklyGrowth}% this week
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 hover:shadow-accent transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Classes</p>
                  <p className="text-2xl font-bold text-foreground">{mockStats.activeClasses}</p>
                  <p className="text-xs text-accent flex items-center mt-1">
                    <Activity className="h-3 w-3 mr-1" />
                    Live sessions
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                  <GraduationCap className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 hover:shadow-secondary transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Subjects</p>
                  <p className="text-2xl font-bold text-foreground">{mockStats.totalSubjects}</p>
                  <p className="text-xs text-secondary flex items-center mt-1">
                    <BookOpen className="h-3 w-3 mr-1" />
                    Curriculum areas
                  </p>
                </div>
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="gradient-card border-0 hover:shadow-success transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">System Uptime</p>
                  <p className="text-2xl font-bold text-foreground">{mockStats.systemUptime}</p>
                  <p className="text-xs text-success flex items-center mt-1">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Excellent
                  </p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pending Approvals Alert */}
        {mockStats.pendingApprovals > 0 && (
          <Card className="mb-8 border-secondary/20 bg-secondary/5">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Pending User Approvals</h3>
                  <p className="text-sm text-muted-foreground">
                    {mockStats.pendingApprovals} users are waiting for approval to access the platform.
                  </p>
                </div>
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  Review Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* User Management */}
        <Card className="gradient-card border-0">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle className="text-xl">User Management</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={statusFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter("all")}
                  >
                    All Status
                  </Button>
                  <Button
                    variant={statusFilter === "pending" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter("pending")}
                  >
                    Pending
                  </Button>
                  <Button
                    variant={roleFilter === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRoleFilter("all")}
                  >
                    All Roles
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-smooth">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{user.name}</h4>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge className={getRoleColor(user.role)}>
                          {user.role}
                        </Badge>
                        <Badge className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Last active: {user.lastActive}
                      </p>
                    </div>
                    
                    {user.status === "pending" ? (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleApproveUser(user.id)}
                          className="bg-success text-success-foreground hover:bg-success/90"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRejectUser(user.id)}
                          className="border-destructive/20 text-destructive hover:bg-destructive/10"
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No users found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}