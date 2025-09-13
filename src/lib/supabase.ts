import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  status: 'active' | 'pending' | 'inactive';
  profile_data: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface Class {
  id: string;
  title: string;
  description: string;
  teacher_id: string;
  subject: string;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  max_students: number;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  zoom_link?: string;
  created_at: string;
  updated_at: string;
}

export interface ClassEnrollment {
  id: string;
  class_id: string;
  student_id: string;
  enrolled_at: string;
  attendance_status: 'present' | 'absent' | 'late' | null;
}

export interface Material {
  id: string;
  title: string;
  description: string;
  file_url: string;
  file_name: string;
  file_size: number;
  file_type: string;
  class_id: string;
  teacher_id: string;
  subject: string;
  created_at: string;
  updated_at: string;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  teacher_id: string;
  class_id: string;
  subject: string;
  questions: AssessmentQuestion[];
  time_limit: number;
  max_attempts: number;
  due_date: string;
  status: 'draft' | 'published' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';
  options?: string[];
  correct_answer: string | number;
  points: number;
  explanation?: string;
}

export interface AssessmentSubmission {
  id: string;
  assessment_id: string;
  student_id: string;
  answers: Record<string, any>;
  score: number;
  max_score: number;
  submitted_at: string;
  graded_at?: string;
  feedback?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'class' | 'assessment' | 'material' | 'system' | 'announcement';
  recipient_id: string;
  sender_id: string;
  read: boolean;
  created_at: string;
  metadata?: Record<string, any>;
}

export interface CurriculumSchedule {
  id: string;
  class_id: string;
  date: string;
  week_day: number;
  recurring: boolean;
  created_at: string;
}