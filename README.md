# Gamai - AI-Powered Educational Platform

Gamai is a comprehensive educational platform that connects teachers, students, parents, and administrators in a seamless learning ecosystem powered by modern web technologies.

## 🚀 Features

### Role-Based Access Control (RBAC)
- **Admin Dashboard**: Manage users, approve registrations, view analytics
- **Teacher Dashboard**: Create classes, upload materials, create assessments, send notifications
- **Student Dashboard**: Join classes, access materials, submit assessments, track progress
- **Parent Dashboard**: Monitor child's progress, view classes, receive notifications

### Core Functionality
- **Class Management**: Create and book classes with Zoom integration
- **Course Materials**: Upload and share educational resources
- **Interactive Assessments**: Create quizzes with instant feedback
- **Curriculum Scheduling**: Day-by-day class organization
- **Real-time Notifications**: Keep everyone informed
- **Survey-based Onboarding**: Automatic role assignment

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **React Router** for navigation
- **React Query** for data fetching
- **Axios** for API calls

### Backend (Ready for Integration)
- RESTful API endpoints defined
- JWT authentication structure
- Role-based access control
- File upload handling
- Database schema ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gamai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration:
   ```env
   VITE_API_BASE_URL=http://localhost:8080/api
   VITE_APP_NAME=Gamai
   VITE_APP_VERSION=1.0.0
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── feature-card.tsx
│   ├── hero-section.tsx
│   └── ...
├── contexts/           # React contexts
│   └── AuthContext.tsx
├── lib/               # Utilities and configurations
│   ├── api.ts         # API service layer
│   ├── types.ts       # TypeScript type definitions
│   └── utils.ts       # Utility functions
├── pages/             # Page components
│   ├── Index.tsx      # Landing page
│   ├── Login.tsx      # Authentication
│   ├── Register.tsx   # Registration with survey
│   ├── Dashboard.tsx  # Role-based dashboard
│   ├── Classes.tsx    # Class management
│   ├── Materials.tsx  # Course materials
│   ├── Assessments.tsx # Interactive assessments
│   └── Curriculum.tsx # Schedule management
└── App.tsx           # Main application component
```

## 🔐 Authentication & Authorization

The application implements a comprehensive RBAC system:

### User Roles
- **Admin**: Full system access, user management
- **Teacher**: Class creation, material upload, assessment management
- **Student**: Class enrollment, material access, assessment submission
- **Parent**: Child progress monitoring, notification access

### Protected Routes
All sensitive routes are protected with role-based access control:
```typescript
<ProtectedRoute requiredRoles={['admin']}>
  <AdminDashboard />
</ProtectedRoute>
```

## 📱 Pages & Features

### 1. Landing Page (`/`)
- Platform overview and features
- Call-to-action buttons for registration/login
- Responsive design with modern UI

### 2. Registration (`/register`)
- Multi-step survey (≤5 questions)
- Automatic role assignment based on responses
- Smooth onboarding experience

### 3. Dashboard (`/dashboard`)
- Role-specific content and statistics
- Quick access to main features
- Real-time updates and notifications

### 4. Class Management (`/classes`)
- **Teachers**: Create and manage class bookings
- **Students**: Browse and join available classes
- **Live/Upcoming/Completed** class status
- Zoom integration for virtual classes

### 5. Course Materials (`/materials`)
- **Teachers**: Upload slides, documents, and resources
- **Students**: View and download materials
- File type filtering and search functionality
- Download tracking and analytics

### 6. Assessments (`/assessments`)
- Interactive quiz interface
- Multiple question types (multiple choice, true/false, etc.)
- Real-time feedback and explanations
- Progress tracking and scoring

### 7. Curriculum (`/curriculum`)
- Calendar view of scheduled classes
- Day-by-day class organization
- Integration with class bookings
- Reminder and notification system

## 🎨 Design System

### Color Palette
- **Primary**: Deep purple (`hsl(275, 85%, 35%)`)
- **Secondary**: Warm orange (`hsl(35, 95%, 65%)`)
- **Accent**: Teal (`hsl(185, 85%, 55%)`)
- **Success**: Green (`hsl(145, 65%, 50%)`)

### Typography
- Clean, modern font stack
- Consistent sizing and spacing
- Proper contrast ratios for accessibility

### Components
- Reusable UI components with shadcn/ui
- Consistent styling with Tailwind CSS
- Interactive states and animations
- Mobile-responsive design

## 🔌 API Integration

The frontend is ready for backend integration with a complete API service layer:

### Authentication
```typescript
await apiService.login({ email, password });
await apiService.register(userData);
await apiService.logout();
```

### Data Management
```typescript
await apiService.getClasses(filters);
await apiService.createClass(classData);
await apiService.uploadMaterial(formData);
await apiService.submitAssessment(assessmentId, answers);
```

### Error Handling
- Comprehensive error handling with user-friendly messages
- Automatic token refresh and logout on authentication errors
- Loading states and user feedback

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Environment Configuration
Update environment variables for production:
- `VITE_API_BASE_URL`: Your backend API URL
- `VITE_APP_NAME`: Application name
- Other configuration as needed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with modern React and TypeScript
- UI components from shadcn/ui
- Icons from Lucide React
- Styling with Tailwind CSS
- Powered by RAOATECH innovation

---

**Gamai** - Transforming education with AI-powered learning experiences! 🎓✨