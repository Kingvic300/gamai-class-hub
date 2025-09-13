import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Classes from "./pages/Classes";
import Materials from "./pages/Materials";
import Assessments from "./pages/Assessments";
import Curriculum from "./pages/Curriculum";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student" element={<Dashboard />} />
          <Route path="/teacher" element={<Dashboard />} />
          <Route path="/parent" element={<Dashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/curriculum" element={<Curriculum />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
