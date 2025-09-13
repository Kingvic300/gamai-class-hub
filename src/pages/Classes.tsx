import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  Clock, 
  Video, 
  Users, 
  Search,
  ExternalLink,
  Plus,
  Filter
} from "lucide-react";

const mockClasses = [
  {
    id: 1,
    title: "Advanced Mathematics",
    teacher: "Dr. Sarah Smith",
    date: "2025-01-15",
    time: "10:00 AM - 11:30 AM",
    duration: "90 minutes",
    students: 24,
    maxStudents: 30,
    zoomLink: "https://zoom.us/j/123456789",
    status: "upcoming",
    description: "Advanced calculus and linear algebra concepts"
  },
  {
    id: 2,
    title: "Physics Laboratory",
    teacher: "Prof. Michael Johnson",
    date: "2025-01-15", 
    time: "2:00 PM - 4:00 PM",
    duration: "120 minutes",
    students: 18,
    maxStudents: 20,
    zoomLink: "https://zoom.us/j/987654321",
    status: "live",
    description: "Hands-on experiments with quantum mechanics"
  },
  {
    id: 3,
    title: "Literature Discussion",
    teacher: "Dr. Emily Chen",
    date: "2025-01-16",
    time: "9:00 AM - 10:30 AM", 
    duration: "90 minutes",
    students: 15,
    maxStudents: 25,
    zoomLink: "https://zoom.us/j/456789123",
    status: "upcoming",
    description: "Analyzing modern poetry and prose"
  },
  {
    id: 4,
    title: "Computer Science Seminar",
    teacher: "Dr. David Lee",
    date: "2025-01-14",
    time: "3:00 PM - 4:30 PM",
    duration: "90 minutes", 
    students: 22,
    maxStudents: 25,
    zoomLink: "https://zoom.us/j/789123456",
    status: "completed",
    description: "AI and machine learning fundamentals"
  }
];

export default function Classes() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredClasses = mockClasses.filter(classItem => {
    const matchesSearch = classItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         classItem.teacher.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || classItem.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live": return "bg-success text-success-foreground";
      case "upcoming": return "bg-primary text-primary-foreground";
      case "completed": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleJoinClass = (zoomLink: string) => {
    window.open(zoomLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Classes</h1>
            <p className="text-muted-foreground">
              Join live classes and access recorded sessions
            </p>
          </div>
          <Button className="mt-4 md:mt-0 gradient-primary text-white shadow-primary hover:shadow-glow transition-bounce">
            <Plus className="h-4 w-4 mr-2" />
            Create Class
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search classes or teachers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            {["all", "live", "upcoming", "completed"].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className="capitalize"
              >
                <Filter className="h-3 w-3 mr-1" />
                {status}
              </Button>
            ))}
          </div>
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredClasses.map((classItem) => (
            <Card key={classItem.id} className="gradient-card border-0 hover:shadow-primary transition-smooth animate-fade-in">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{classItem.title}</CardTitle>
                    <p className="text-muted-foreground text-sm mb-2">by {classItem.teacher}</p>
                    <p className="text-sm text-muted-foreground">{classItem.description}</p>
                  </div>
                  <Badge className={getStatusColor(classItem.status)}>
                    {classItem.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{classItem.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-accent" />
                    <span>{classItem.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-secondary" />
                    <span>{classItem.students}/{classItem.maxStudents} students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{classItem.duration}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {classItem.status === "live" && (
                    <Button 
                      onClick={() => handleJoinClass(classItem.zoomLink)}
                      className="flex-1 bg-success text-success-foreground hover:bg-success/90 shadow-accent"
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Join Live Class
                    </Button>
                  )}
                  {classItem.status === "upcoming" && (
                    <Button 
                      onClick={() => handleJoinClass(classItem.zoomLink)}
                      className="flex-1 gradient-primary text-white shadow-primary hover:shadow-glow transition-bounce"
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Join Meeting
                    </Button>
                  )}
                  {classItem.status === "completed" && (
                    <Button 
                      onClick={() => handleJoinClass(classItem.zoomLink)}
                      variant="outline"
                      className="flex-1"
                    >
                      <Video className="h-4 w-4 mr-2" />
                      View Recording
                    </Button>
                  )}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(classItem.zoomLink, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>

                {classItem.status === "live" && (
                  <div className="bg-success/10 border border-success/20 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-success">Class is currently live!</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClasses.length === 0 && (
          <div className="text-center py-12">
            <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No classes found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}