import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService, type AuthUser } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  register: (userData: any) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  hasRole: (roles: string[]) => boolean;
  isAdmin: () => boolean;
  isTeacher: () => boolean;
  isStudent: () => boolean;
  isParent: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { user: authUser, error } = await authService.login({ email, password });
    if (authUser) {
      setUser(authUser);
    }
    return { error };
  };

  const register = async (userData: any) => {
    const { user: authUser, error } = await authService.register(userData);
    if (authUser) {
      setUser(authUser);
    }
    return { error };
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const hasRole = (roles: string[]) => authService.hasRole(user, roles);
  const isAdmin = () => authService.isAdmin(user);
  const isTeacher = () => authService.isTeacher(user);
  const isStudent = () => authService.isStudent(user);
  const isParent = () => authService.isParent(user);

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    hasRole,
    isAdmin,
    isTeacher,
    isStudent,
    isParent,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}