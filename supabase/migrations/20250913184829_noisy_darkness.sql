/*
  # Gamai Educational Platform Database Schema

  1. New Tables
    - `users` - User profiles with role-based access
    - `classes` - Class/booking management
    - `class_enrollments` - Student enrollment in classes
    - `materials` - Course materials and documents
    - `assessments` - Quizzes and assignments
    - `assessment_submissions` - Student assessment submissions
    - `notifications` - User notifications system
    - `curriculum_schedule` - Curriculum scheduling

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Secure file storage for materials

  3. Features
    - Role-based permissions (admin, teacher, student, parent)
    - Class booking and enrollment system
    - Materials upload and management
    - Assessment creation and submission
    - Notification system
    - Curriculum scheduling
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table with role-based access
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'teacher', 'student', 'parent')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('active', 'pending', 'inactive')),
  profile_data jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Classes/Bookings table
CREATE TABLE IF NOT EXISTS classes (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  teacher_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject text NOT NULL,
  date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  location text,
  max_students integer DEFAULT 30,
  status text NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'live', 'completed', 'cancelled')),
  zoom_link text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Class enrollments (many-to-many relationship)
CREATE TABLE IF NOT EXISTS class_enrollments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id uuid NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  enrolled_at timestamptz DEFAULT now(),
  attendance_status text CHECK (attendance_status IN ('present', 'absent', 'late')),
  UNIQUE(class_id, student_id)
);

-- Course materials
CREATE TABLE IF NOT EXISTS materials (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  file_url text NOT NULL,
  file_name text NOT NULL,
  file_size bigint NOT NULL,
  file_type text NOT NULL,
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  teacher_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subject text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Assessments
CREATE TABLE IF NOT EXISTS assessments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  teacher_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  class_id uuid REFERENCES classes(id) ON DELETE CASCADE,
  subject text NOT NULL,
  questions jsonb NOT NULL DEFAULT '[]',
  time_limit integer DEFAULT 60, -- in minutes
  max_attempts integer DEFAULT 1,
  due_date timestamptz,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'closed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Assessment submissions
CREATE TABLE IF NOT EXISTS assessment_submissions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id uuid NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  student_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  answers jsonb NOT NULL DEFAULT '{}',
  score numeric(5,2) DEFAULT 0,
  max_score numeric(5,2) NOT NULL,
  submitted_at timestamptz DEFAULT now(),
  graded_at timestamptz,
  feedback text,
  UNIQUE(assessment_id, student_id)
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL CHECK (type IN ('class', 'assessment', 'material', 'system', 'announcement')),
  recipient_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  read boolean DEFAULT false,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Curriculum schedule
CREATE TABLE IF NOT EXISTS curriculum_schedule (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id uuid NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
  date date NOT NULL,
  week_day integer NOT NULL CHECK (week_day >= 0 AND week_day <= 6),
  recurring boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create storage bucket for materials
INSERT INTO storage.buckets (id, name, public) 
VALUES ('materials', 'materials', true)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE curriculum_schedule ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can read own profile" ON users
  FOR SELECT TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all users" ON users
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can update any user" ON users
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Classes policies
CREATE POLICY "Everyone can read published classes" ON classes
  FOR SELECT TO authenticated
  USING (status != 'cancelled');

CREATE POLICY "Teachers can manage own classes" ON classes
  FOR ALL TO authenticated
  USING (
    teacher_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('admin')
    )
  );

-- Class enrollments policies
CREATE POLICY "Students can read own enrollments" ON class_enrollments
  FOR SELECT TO authenticated
  USING (
    student_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM classes c 
      WHERE c.id = class_id AND c.teacher_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Students can enroll in classes" ON class_enrollments
  FOR INSERT TO authenticated
  WITH CHECK (
    student_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'student'
    )
  );

-- Materials policies
CREATE POLICY "Everyone can read materials" ON materials
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Teachers can manage materials" ON materials
  FOR ALL TO authenticated
  USING (
    teacher_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Assessments policies
CREATE POLICY "Students can read published assessments" ON assessments
  FOR SELECT TO authenticated
  USING (
    status = 'published' OR
    teacher_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Teachers can manage assessments" ON assessments
  FOR ALL TO authenticated
  USING (
    teacher_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Assessment submissions policies
CREATE POLICY "Students can read own submissions" ON assessment_submissions
  FOR SELECT TO authenticated
  USING (
    student_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM assessments a 
      WHERE a.id = assessment_id AND a.teacher_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Students can submit assessments" ON assessment_submissions
  FOR INSERT TO authenticated
  WITH CHECK (
    student_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'student'
    )
  );

-- Notifications policies
CREATE POLICY "Users can read own notifications" ON notifications
  FOR SELECT TO authenticated
  USING (recipient_id = auth.uid());

CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE TO authenticated
  USING (recipient_id = auth.uid());

CREATE POLICY "Teachers and admins can send notifications" ON notifications
  FOR INSERT TO authenticated
  WITH CHECK (
    sender_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('teacher', 'admin')
    )
  );

-- Curriculum schedule policies
CREATE POLICY "Everyone can read curriculum schedule" ON curriculum_schedule
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Teachers can manage curriculum schedule" ON curriculum_schedule
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM classes c 
      WHERE c.id = class_id AND c.teacher_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Storage policies
CREATE POLICY "Authenticated users can upload materials" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'materials');

CREATE POLICY "Everyone can read materials" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'materials');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_classes_teacher_id ON classes(teacher_id);
CREATE INDEX IF NOT EXISTS idx_classes_date ON classes(date);
CREATE INDEX IF NOT EXISTS idx_classes_status ON classes(status);
CREATE INDEX IF NOT EXISTS idx_class_enrollments_student_id ON class_enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_materials_teacher_id ON materials(teacher_id);
CREATE INDEX IF NOT EXISTS idx_materials_class_id ON materials(class_id);
CREATE INDEX IF NOT EXISTS idx_assessments_teacher_id ON assessments(teacher_id);
CREATE INDEX IF NOT EXISTS idx_assessment_submissions_student_id ON assessment_submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient_id ON notifications(recipient_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON classes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_materials_updated_at BEFORE UPDATE ON materials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assessments_updated_at BEFORE UPDATE ON assessments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();