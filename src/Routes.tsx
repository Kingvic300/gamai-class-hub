import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Import pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Classes from "@/pages/Classes";
import Materials from "@/pages/Materials";
import Assessments from "@/pages/Assessments";
import Curriculum from "@/pages/Curriculum";
import AdminDashboard from "@/pages/AdminDashboard";
import NotFound from "@/pages/NotFound";
import Unauthorized from "@/pages/Unauthorized";

export function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected routes - General dashboard (role-based redirect) */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* Admin-only routes */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />

        {/* Teacher and Student routes */}
        <Route 
          path="/classes" 
          element={
            <ProtectedRoute requiredRoles={['teacher', 'student']}>
              <Classes />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/materials" 
          element={
            <ProtectedRoute requiredRoles={['teacher', 'student']}>
              <Materials />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/assessments" 
          element={
            <ProtectedRoute requiredRoles={['teacher', 'student']}>
              <Assessments />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/curriculum" 
          element={
            <ProtectedRoute requiredRoles={['teacher', 'student', 'parent']}>
              <Curriculum />
            </ProtectedRoute>
          } 
        />

        {/* Legacy redirects for role-specific dashboards */}
        <Route path="/admin-dashboard" element={<Navigate to="/admin" replace />} />
        <Route path="/teacher" element={<Navigate to="/dashboard" replace />} />
        <Route path="/student" element={<Navigate to="/dashboard" replace />} />
        <Route path="/parent" element={<Navigate to="/dashboard" replace />} />

        {/* Catch all route - 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}