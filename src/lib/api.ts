import { supabase } from './supabase';
import type { 
  User, 
  Class, 
  ClassEnrollment, 
  Material, 
  Assessment, 
  AssessmentSubmission, 
  Notification,
  CurriculumSchedule 
} from './supabase';

class ApiService {
  // User Management APIs
  async getUsers(filters?: { role?: string; status?: string }): Promise<User[]> {
    let query = supabase.from('users').select('*');
    
    if (filters?.role) {
      query = query.eq('role', filters.role);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data || [];
  }

  async approveUser(userId: string): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update({ status: 'active' })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async rejectUser(userId: string): Promise<void> {
    const { error } = await supabase
      .from('users')
      .update({ status: 'inactive' })
      .eq('id', userId);

    if (error) throw new Error(error.message);
  }

  // Class Management APIs
  async getClasses(filters?: { teacher_id?: string; student_id?: string; status?: string }): Promise<Class[]> {
    let query = supabase.from('classes').select(`
      *,
      teacher:users!classes_teacher_id_fkey(full_name),
      enrollments:class_enrollments(count)
    `);

    if (filters?.teacher_id) {
      query = query.eq('teacher_id', filters.teacher_id);
    }
    if (filters?.status) {
      query = query.eq('status', filters.status);
    }
    if (filters?.student_id) {
      query = query.in('id', 
        supabase.from('class_enrollments')
          .select('class_id')
          .eq('student_id', filters.student_id)
      );
    }

    const { data, error } = await query.order('date', { ascending: true });
    
    if (error) throw new Error(error.message);
    return data || [];
  }

  async createClass(classData: Omit<Class, 'id' | 'created_at' | 'updated_at'>): Promise<Class> {
    const { data, error } = await supabase
      .from('classes')
      .insert(classData)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async updateClass(classId: string, updates: Partial<Class>): Promise<Class> {
    const { data, error } = await supabase
      .from('classes')
      .update(updates)
      .eq('id', classId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async enrollInClass(classId: string, studentId: string): Promise<ClassEnrollment> {
    const { data, error } = await supabase
      .from('class_enrollments')
      .insert({
        class_id: classId,
        student_id: studentId
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async getClassEnrollments(classId: string): Promise<ClassEnrollment[]> {
    const { data, error } = await supabase
      .from('class_enrollments')
      .select(`
        *,
        student:users!class_enrollments_student_id_fkey(full_name, email)
      `)
      .eq('class_id', classId);

    if (error) throw new Error(error.message);
    return data || [];
  }

  // Materials Management APIs
  async getMaterials(filters?: { class_id?: string; teacher_id?: string; subject?: string }): Promise<Material[]> {
    let query = supabase.from('materials').select(`
      *,
      teacher:users!materials_teacher_id_fkey(full_name),
      class:classes!materials_class_id_fkey(title)
    `);

    if (filters?.class_id) {
      query = query.eq('class_id', filters.class_id);
    }
    if (filters?.teacher_id) {
      query = query.eq('teacher_id', filters.teacher_id);
    }
    if (filters?.subject) {
      query = query.eq('subject', filters.subject);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data || [];
  }

  async uploadMaterial(materialData: Omit<Material, 'id' | 'created_at' | 'updated_at'>): Promise<Material> {
    const { data, error } = await supabase
      .from('materials')
      .insert(materialData)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async uploadFile(file: File, path: string): Promise<string> {
    const { data, error } = await supabase.storage
      .from('materials')
      .upload(path, file);

    if (error) throw new Error(error.message);

    const { data: { publicUrl } } = supabase.storage
      .from('materials')
      .getPublicUrl(data.path);

    return publicUrl;
  }

  // Assessment Management APIs
  async getAssessments(filters?: { teacher_id?: string; class_id?: string; student_id?: string }): Promise<Assessment[]> {
    let query = supabase.from('assessments').select(`
      *,
      teacher:users!assessments_teacher_id_fkey(full_name),
      class:classes!assessments_class_id_fkey(title)
    `);

    if (filters?.teacher_id) {
      query = query.eq('teacher_id', filters.teacher_id);
    }
    if (filters?.class_id) {
      query = query.eq('class_id', filters.class_id);
    }

    const { data, error } = await query.order('created_at', { ascending: false });
    
    if (error) throw new Error(error.message);
    return data || [];
  }

  async createAssessment(assessmentData: Omit<Assessment, 'id' | 'created_at' | 'updated_at'>): Promise<Assessment> {
    const { data, error } = await supabase
      .from('assessments')
      .insert(assessmentData)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async submitAssessment(submissionData: Omit<AssessmentSubmission, 'id' | 'submitted_at' | 'graded_at'>): Promise<AssessmentSubmission> {
    const { data, error } = await supabase
      .from('assessment_submissions')
      .insert(submissionData)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async getAssessmentSubmissions(assessmentId: string): Promise<AssessmentSubmission[]> {
    const { data, error } = await supabase
      .from('assessment_submissions')
      .select(`
        *,
        student:users!assessment_submissions_student_id_fkey(full_name, email)
      `)
      .eq('assessment_id', assessmentId)
      .order('submitted_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  }

  // Notification APIs
  async getNotifications(userId: string): Promise<Notification[]> {
    const { data, error } = await supabase
      .from('notifications')
      .select(`
        *,
        sender:users!notifications_sender_id_fkey(full_name)
      `)
      .eq('recipient_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  }

  async createNotification(notificationData: Omit<Notification, 'id' | 'created_at'>): Promise<Notification> {
    const { data, error } = await supabase
      .from('notifications')
      .insert(notificationData)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async markNotificationAsRead(notificationId: string): Promise<void> {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true })
      .eq('id', notificationId);

    if (error) throw new Error(error.message);
  }

  // Curriculum APIs
  async getCurriculumSchedule(filters?: { class_id?: string; date?: string }): Promise<CurriculumSchedule[]> {
    let query = supabase.from('curriculum_schedule').select(`
      *,
      class:classes!curriculum_schedule_class_id_fkey(*)
    `);

    if (filters?.class_id) {
      query = query.eq('class_id', filters.class_id);
    }
    if (filters?.date) {
      query = query.eq('date', filters.date);
    }

    const { data, error } = await query.order('date', { ascending: true });
    
    if (error) throw new Error(error.message);
    return data || [];
  }

  async createCurriculumSchedule(scheduleData: Omit<CurriculumSchedule, 'id' | 'created_at'>): Promise<CurriculumSchedule> {
    const { data, error } = await supabase
      .from('curriculum_schedule')
      .insert(scheduleData)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  // Analytics APIs (for admin dashboard)
  async getDashboardStats(): Promise<{
    totalUsers: number;
    activeClasses: number;
    totalSubjects: number;
    pendingApprovals: number;
  }> {
    const [usersCount, classesCount, subjectsCount, pendingCount] = await Promise.all([
      supabase.from('users').select('id', { count: 'exact' }),
      supabase.from('classes').select('id', { count: 'exact' }).eq('status', 'scheduled'),
      supabase.from('classes').select('subject').then(({ data }) => 
        new Set(data?.map(c => c.subject) || []).size
      ),
      supabase.from('users').select('id', { count: 'exact' }).eq('status', 'pending')
    ]);

    return {
      totalUsers: usersCount.count || 0,
      activeClasses: classesCount.count || 0,
      totalSubjects: subjectsCount,
      pendingApprovals: pendingCount.count || 0
    };
  }
}

export const apiService = new ApiService();