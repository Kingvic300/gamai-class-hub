import { supabase } from './supabase';
import type { User } from './supabase';

export interface AuthUser extends User {
  session?: any;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  surveyAnswers: Record<string, string>;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (data.user) {
        // Fetch user profile from our users table
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          return { user: null, error: 'Failed to fetch user profile' };
        }

        return {
          user: { ...profile, session: data.session },
          error: null
        };
      }

      return { user: null, error: 'Login failed' };
    } catch (error) {
      return { user: null, error: 'An unexpected error occurred' };
    }
  }

  async register(userData: RegisterData): Promise<{ user: AuthUser | null; error: string | null }> {
    try {
      // Create auth user
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (error) {
        return { user: null, error: error.message };
      }

      if (data.user) {
        // Create user profile
        const { data: profile, error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: userData.email,
            full_name: userData.fullName,
            role: userData.role,
            status: userData.role === 'admin' ? 'active' : 'pending',
            profile_data: {
              survey_answers: userData.surveyAnswers,
              onboarding_completed: true
            }
          })
          .select()
          .single();

        if (profileError) {
          // Clean up auth user if profile creation fails
          await supabase.auth.admin.deleteUser(data.user.id);
          return { user: null, error: 'Failed to create user profile' };
        }

        return {
          user: { ...profile, session: data.session },
          error: null
        };
      }

      return { user: null, error: 'Registration failed' };
    } catch (error) {
      return { user: null, error: 'An unexpected error occurred' };
    }
  }

  async logout(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut();
      return { error: error?.message || null };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return null;

      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      return profile;
    } catch (error) {
      return null;
    }
  }

  async updateProfile(userId: string, updates: Partial<User>): Promise<{ user: User | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) {
        return { user: null, error: error.message };
      }

      return { user: data, error: null };
    } catch (error) {
      return { user: null, error: 'An unexpected error occurred' };
    }
  }

  // Role-based access control helpers
  hasRole(user: AuthUser | null, roles: string[]): boolean {
    return user ? roles.includes(user.role) : false;
  }

  isAdmin(user: AuthUser | null): boolean {
    return this.hasRole(user, ['admin']);
  }

  isTeacher(user: AuthUser | null): boolean {
    return this.hasRole(user, ['teacher']);
  }

  isStudent(user: AuthUser | null): boolean {
    return this.hasRole(user, ['student']);
  }

  isParent(user: AuthUser | null): boolean {
    return this.hasRole(user, ['parent']);
  }

  canManageUsers(user: AuthUser | null): boolean {
    return this.isAdmin(user);
  }

  canCreateClasses(user: AuthUser | null): boolean {
    return this.hasRole(user, ['admin', 'teacher']);
  }

  canUploadMaterials(user: AuthUser | null): boolean {
    return this.hasRole(user, ['admin', 'teacher']);
  }

  canCreateAssessments(user: AuthUser | null): boolean {
    return this.hasRole(user, ['admin', 'teacher']);
  }
}

export const authService = new AuthService();