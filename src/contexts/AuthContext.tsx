import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiService } from '@/lib/api';
import type { User, LoginCredentials, RegisterData } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<{ error: string | null }>;
  register: (userData: RegisterData) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  hasRole: (roles: string[]) => boolean;
  isAdmin: () => boolean;
  isTeacher: () => boolean;
  isStudent: () => boolean;
  isParent: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token and user
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        
        // Verify token is still valid
        apiService.getCurrentUser().then(response => {
          if (response.success && response.data) {
            setUser(response.data);
            localStorage.setItem('user', JSON.stringify(response.data));
          } else {
            // Token is invalid, clear storage
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            setUser(null);
          }
          setLoading(false);
        });
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setUser(null);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await apiService.login(credentials);
    
    if (response.success && response.data) {
      const { user: authUser, token } = response.data;
      setUser(authUser);
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(authUser));
      return { error: null };
    }
    
    return { error: response.error || 'Login failed' };
  };

  const register = async (userData: RegisterData) => {
    const response = await apiService.register(userData);
    
    if (response.success && response.data) {
      const { user: authUser, token } = response.data;
      setUser(authUser);
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(authUser));
      return { error: null };
    }
    
    return { error: response.error || 'Registration failed' };
  };

  const logout = async () => {
    await apiService.logout();
    setUser(null);
  };

  const hasRole = (roles: string[]) => {
    return user ? roles.includes(user.role) : false;
  };

  const isAdmin = () => hasRole(['admin']);
  const isTeacher = () => hasRole(['teacher']);
  const isStudent = () => hasRole(['student']);
  const isParent = () => hasRole(['parent']);

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