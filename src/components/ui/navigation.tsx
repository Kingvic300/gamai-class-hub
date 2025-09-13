import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Home, 
  BookOpen, 
  Calendar, 
  FileText, 
  Award, 
  Bell, 
  Users, 
  Settings,
  Menu,
  X
} from "lucide-react";
import gamaiLogo from "@/assets/gamai-logo.png";

// Mock user role - in real app this would come from auth context
const useUserRole = () => {
  return { role: "student" as "admin" | "teacher" | "student" | "parent" };
};

const navigationItems = {
  admin: [
    { name: "Dashboard", href: "/admin", icon: Home },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Analytics", href: "/admin/analytics", icon: Award },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ],
  teacher: [
    { name: "Dashboard", href: "/teacher", icon: Home },
    { name: "Classes", href: "/classes", icon: Calendar },
    { name: "Materials", href: "/materials", icon: FileText },
    { name: "Assessments", href: "/assessments", icon: Award },
    { name: "Curriculum", href: "/curriculum", icon: BookOpen },
  ],
  student: [
    { name: "Dashboard", href: "/student", icon: Home },
    { name: "Classes", href: "/classes", icon: Calendar },
    { name: "Materials", href: "/materials", icon: FileText },
    { name: "Assessments", href: "/assessments", icon: Award },
    { name: "Curriculum", href: "/curriculum", icon: BookOpen },
  ],
  parent: [
    { name: "Dashboard", href: "/parent", icon: Home },
    { name: "Child's Classes", href: "/classes", icon: Calendar },
    { name: "Progress", href: "/progress", icon: Award },
    { name: "Notifications", href: "/notifications", icon: Bell },
  ],
};

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { role } = useUserRole();
  const location = useLocation();
  const items = navigationItems[role] || navigationItems.student;

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={gamaiLogo} alt="Gamai" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <Button variant="ghost" size="sm" className="ml-2">
              <Bell className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <div className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-muted-foreground">
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}