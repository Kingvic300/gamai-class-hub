// User Types
export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  status: 'active' | 'pending' | 'inactive';
  profileData: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}

// Class Types
export interface Class {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  maxStudents: number;
  enrolledCount: number;
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  zoomLink?: string;
  createdAt: string;
  updatedAt: string;
}

// Material Types
export interface Material {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  classId: string;
  className: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
}

// Assessment Types
export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'short_answer' | 'essay';
  options?: string[];
  correctAnswer: string | number;
  points: number;
  explanation?: string;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  teacherName: string;
  classId: string;
  className: string;
  subject: string;
  questions: AssessmentQuestion[];
  timeLimit: number;
  maxAttempts: number;
  dueDate: string;
  status: 'draft' | 'published' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentSubmission {
  id: string;
  assessmentId: string;
  studentId: string;
  studentName: string;
  answers: Record<string, any>;
  score: number;
  maxScore: number;
  percentage: number;
  submittedAt: string;
  gradedAt?: string;
  feedback?: string;
  status: 'submitted' | 'graded' | 'returned';
}

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'class' | 'assessment' | 'material' | 'system' | 'announcement';
  recipientId: string;
  senderId: string;
  senderName: string;
  read: boolean;
  createdAt: string;
  metadata?: Record<string, any>;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form Types
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  role: 'admin' | 'teacher' | 'student' | 'parent';
  surveyAnswers: Record<string, string>;
}

export interface SurveyQuestion {
  id: string;
  question: string;
  options: Array<{
    value: string;
    label: string;
    icon?: React.ComponentType;
    role?: 'admin' | 'teacher' | 'student' | 'parent';
  }>;
}

// Dashboard Stats
export interface DashboardStats {
  totalUsers: number;
  activeClasses: number;
  totalSubjects: number;
  pendingApprovals: number;
  completedAssignments?: number;
  attendanceRate?: number;
  averageGrade?: number;
}