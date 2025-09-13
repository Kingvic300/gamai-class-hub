import { useState } from "react";
import { Navigation } from "@/components/ui/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Download, 
  Search,
  Plus,
  Filter,
  Calendar,
  User,
  Eye,
  Folder
} from "lucide-react";

const mockMaterials = [
  {
    id: 1,
    title: "Advanced Calculus - Chapter 5",
    filename: "calculus_chapter5.pdf",
    teacher: "Dr. Sarah Smith",
    subject: "Mathematics",
    uploadDate: "2025-01-14",
    size: "2.4 MB",
    downloads: 156,
    description: "Comprehensive guide to integration techniques and applications"
  },
  {
    id: 2,
    title: "Quantum Mechanics Lab Manual",
    filename: "quantum_lab_manual.pdf", 
    teacher: "Prof. Michael Johnson",
    subject: "Physics",
    uploadDate: "2025-01-13",
    size: "5.8 MB",
    downloads: 89,
    description: "Step-by-step laboratory procedures and safety guidelines"
  },
  {
    id: 3,
    title: "Modern Poetry Analysis",
    filename: "poetry_analysis_guide.pdf",
    teacher: "Dr. Emily Chen",
    subject: "Literature",
    uploadDate: "2025-01-12",
    size: "1.9 MB", 
    downloads: 124,
    description: "Framework for analyzing contemporary poetic works"
  },
  {
    id: 4,
    title: "Machine Learning Algorithms",
    filename: "ml_algorithms_handbook.pdf",
    teacher: "Dr. David Lee", 
    subject: "Computer Science",
    uploadDate: "2025-01-11",
    size: "8.2 MB",
    downloads: 203,
    description: "Complete reference for supervised and unsupervised learning"
  },
  {
    id: 5,
    title: "Organic Chemistry Reactions",
    filename: "organic_reactions_summary.pdf",
    teacher: "Dr. Lisa Wang",
    subject: "Chemistry", 
    uploadDate: "2025-01-10",
    size: "3.6 MB",
    downloads: 167,
    description: "Key organic reactions with mechanisms and examples"
  },
  {
    id: 6,
    title: "European History Timeline",
    filename: "european_history_timeline.pdf",
    teacher: "Prof. James Brown",
    subject: "History",
    uploadDate: "2025-01-09", 
    size: "4.1 MB",
    downloads: 98,
    description: "Chronological overview of major European historical events"
  }
];

const subjects = ["All", "Mathematics", "Physics", "Literature", "Computer Science", "Chemistry", "History"];

export default function Materials() {
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");

  const filteredMaterials = mockMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = subjectFilter === "All" || material.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  const handleDownload = (material: typeof mockMaterials[0]) => {
    // In a real app, this would trigger the actual download
    console.log("Downloading:", material.filename);
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = material.filename;
    link.click();
  };

  const handlePreview = (material: typeof mockMaterials[0]) => {
    // In a real app, this would open a PDF viewer
    console.log("Previewing:", material.filename);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Course Materials</h1>
            <p className="text-muted-foreground">
              Access and download educational resources uploaded by teachers
            </p>
          </div>
          <Button className="mt-4 md:mt-0 gradient-primary text-white shadow-primary hover:shadow-glow transition-bounce">
            <Plus className="h-4 w-4 mr-2" />
            Upload Material
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search materials, teachers, or subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {subjects.map((subject) => (
              <Button
                key={subject}
                variant={subjectFilter === subject ? "default" : "outline"}
                size="sm"
                onClick={() => setSubjectFilter(subject)}
                className="text-xs"
              >
                <Filter className="h-3 w-3 mr-1" />
                {subject}
              </Button>
            ))}
          </div>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMaterials.map((material) => (
            <Card key={material.id} className="gradient-card border-0 hover:shadow-primary transition-smooth animate-fade-in group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                      <FileText className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <Badge variant="outline" className="text-xs mb-2">
                        {material.subject}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{material.title}</CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {material.description}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{material.teacher}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{material.size}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{material.uploadDate}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{material.downloads} downloads</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => handlePreview(material)}
                    variant="outline"
                    size="sm"
                    className="flex-1 hover:bg-accent/10 hover:text-accent hover:border-accent/30"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button 
                    onClick={() => handleDownload(material)}
                    size="sm"
                    className="flex-1 gradient-primary text-white shadow-primary hover:shadow-glow transition-bounce"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>

                <div className="bg-muted/30 rounded-lg p-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Folder className="h-4 w-4" />
                    <span className="font-mono text-xs">{material.filename}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No materials found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}