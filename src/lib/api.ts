import axios from 'axios';
import type { 
  User, 
  Class, 
  Material, 
  Assessment, 
  AssessmentSubmission, 
  Notification,
  ApiResponse,
  PaginatedResponse,
  LoginCredentials,
  RegisterData,
  DashboardStats
} from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

class ApiService {
  // Authentication APIs
  async login(credentials: LoginCredentials): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      };
    }
  }

  async register(userData: RegisterData): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      };
    }
  }

  async logout(): Promise<ApiResponse<void>> {
    try {
      await api.post('/auth/logout');
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Logout failed'
      };
    }
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to get user'
      };
    }
  }

  // User Management APIs
  async getUsers(filters?: { role?: string; status?: string; page?: number; limit?: number }): Promise<ApiResponse<PaginatedResponse<User>>> {
    try {
      const response = await api.get('/users', { params: filters });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch users'
      };
    }
  }

  async approveUser(userId: string): Promise<ApiResponse<User>> {
    try {
      const response = await api.put(`/users/${userId}/approve`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to approve user'
      };
    }
  }

  async rejectUser(userId: string): Promise<ApiResponse<void>> {
    try {
      const response = await api.put(`/users/${userId}/reject`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to reject user'
      };
    }
  }

  // Class Management APIs
  async getClasses(filters?: { teacherId?: string; studentId?: string; status?: string; page?: number; limit?: number }): Promise<ApiResponse<PaginatedResponse<Class>>> {
    try {
      const response = await api.get('/classes', { params: filters });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch classes'
      };
    }
  }

  async createClass(classData: Omit<Class, 'id' | 'createdAt' | 'updatedAt' | 'teacherName' | 'enrolledCount'>): Promise<ApiResponse<Class>> {
    try {
      const response = await api.post('/classes', classData);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create class'
      };
    }
  }

  async updateClass(classId: string, updates: Partial<Class>): Promise<ApiResponse<Class>> {
    try {
      const response = await api.put(`/classes/${classId}`, updates);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update class'
      };
    }
  }

  async enrollInClass(classId: string): Promise<ApiResponse<void>> {
    try {
      const response = await api.post(`/classes/${classId}/enroll`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to enroll in class'
      };
    }
  }

  // Materials Management APIs
  async getMaterials(filters?: { classId?: string; teacherId?: string; subject?: string; page?: number; limit?: number }): Promise<ApiResponse<PaginatedResponse<Material>>> {
    try {
      const response = await api.get('/materials', { params: filters });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch materials'
      };
    }
  }

  async uploadMaterial(formData: FormData): Promise<ApiResponse<Material>> {
    try {
      const response = await api.post('/materials', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to upload material'
      };
    }
  }

  async downloadMaterial(materialId: string): Promise<void> {
    try {
      const response = await api.get(`/materials/${materialId}/download`, {
        responseType: 'blob',
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', response.headers['content-disposition']?.split('filename=')[1] || 'download');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  }

  // Assessment Management APIs
  async getAssessments(filters?: { teacherId?: string; classId?: string; studentId?: string; page?: number; limit?: number }): Promise<ApiResponse<PaginatedResponse<Assessment>>> {
    try {
      const response = await api.get('/assessments', { params: filters });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch assessments'
      };
    }
  }

  async createAssessment(assessmentData: Omit<Assessment, 'id' | 'createdAt' | 'updatedAt' | 'teacherName' | 'className'>): Promise<ApiResponse<Assessment>> {
    try {
      const response = await api.post('/assessments', assessmentData);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create assessment'
      };
    }
  }

  async submitAssessment(assessmentId: string, answers: Record<string, any>): Promise<ApiResponse<AssessmentSubmission>> {
    try {
      const response = await api.post(`/assessments/${assessmentId}/submit`, { answers });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to submit assessment'
      };
    }
  }

  async getAssessmentSubmissions(assessmentId: string): Promise<ApiResponse<AssessmentSubmission[]>> {
    try {
      const response = await api.get(`/assessments/${assessmentId}/submissions`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch submissions'
      };
    }
  }

  // Notification APIs
  async getNotifications(page?: number, limit?: number): Promise<ApiResponse<PaginatedResponse<Notification>>> {
    try {
      const response = await api.get('/notifications', { params: { page, limit } });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch notifications'
      };
    }
  }

  async markNotificationAsRead(notificationId: string): Promise<ApiResponse<void>> {
    try {
      const response = await api.put(`/notifications/${notificationId}/read`);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to mark notification as read'
      };
    }
  }

  async createNotification(notificationData: Omit<Notification, 'id' | 'createdAt' | 'senderName' | 'read'>): Promise<ApiResponse<Notification>> {
    try {
      const response = await api.post('/notifications', notificationData);
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create notification'
      };
    }
  }

  // Dashboard APIs
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    try {
      const response = await api.get('/dashboard/stats');
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch dashboard stats'
      };
    }
  }

  // Curriculum APIs
  async getCurriculumSchedule(filters?: { classId?: string; date?: string }): Promise<ApiResponse<any[]>> {
    try {
      const response = await api.get('/curriculum/schedule', { params: filters });
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch curriculum schedule'
      };
    }
  }
}

export const apiService = new ApiService();