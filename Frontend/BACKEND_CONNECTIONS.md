# 🔗 Backend Connections Documentation

This document explains how the frontend connects to the Spring Boot backend and all available API endpoints.

## 📋 Table of Contents
1. [Overview](#overview)
2. [API Service Structure](#api-service-structure)
3. [Authentication Flow](#authentication-flow)
4. [Available Endpoints](#available-endpoints)
5. [Error Handling](#error-handling)
6. [Usage Examples](#usage-examples)
7. [Testing Connections](#testing-connections)

---

## 🎯 Overview

The frontend is now fully connected to the Spring Boot backend with the following features:

- ✅ **Authentication** (Login/Register)
- ✅ **User Management** (Profile, User data)
- ✅ **Course Management** (Browse, Enroll, Course details)
- ✅ **Error Handling** (API errors, network issues)
- ✅ **State Management** (Context providers)
- ✅ **Real-time Connection Testing**

---

## 🏗️ API Service Structure

### Core API Client (`src/services/api.ts`)

```typescript
// Base configuration
const API_BASE_URL = 'http://localhost:8080/api';

// Main API client class
class ApiClient {
  // Handles all HTTP requests with authentication
  private async request<T>(endpoint: string, options: RequestInit = {})
  
  // Authentication methods
  async register(userData: RegisterRequest): Promise<ApiResponse<User>>
  async login(credentials: LoginRequest): Promise<ApiResponse<User>>
  async testConnection(): Promise<ApiResponse<string>>
  
  // User management
  async getCurrentUser(): Promise<ApiResponse<User>>
  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>>
  
  // Course management
  async getCourses(): Promise<ApiResponse<Course[]>>
  async getCourseById(id: number): Promise<ApiResponse<Course>>
  async enrollInCourse(courseId: number): Promise<ApiResponse<Enrollment>>
  async getUserEnrollments(): Promise<ApiResponse<Enrollment[]>>
  
  // Feedback and ratings
  async submitFeedback(feedback: Feedback): Promise<ApiResponse<Feedback>>
  async getCourseFeedback(courseId: number): Promise<ApiResponse<Feedback[]>>
  
  // Dashboard data
  async getDashboardStats(): Promise<ApiResponse<any>>
  async getUserProgress(): Promise<ApiResponse<any>>
}
```

### Convenience Services

```typescript
// Authentication service
export const authService = {
  register: (userData: RegisterRequest) => apiClient.register(userData),
  login: (credentials: LoginRequest) => apiClient.login(credentials),
  testConnection: () => apiClient.testConnection(),
};

// User service
export const userService = {
  getCurrentUser: () => apiClient.getCurrentUser(),
  updateProfile: (userData: Partial<User>) => apiClient.updateProfile(userData),
};

// Course service
export const courseService = {
  getCourses: () => apiClient.getCourses(),
  getCourseById: (id: number) => apiClient.getCourseById(id),
  enrollInCourse: (courseId: number) => apiClient.enrollInCourse(courseId),
  getUserEnrollments: () => apiClient.getUserEnrollments(),
};

// Feedback service
export const feedbackService = {
  submitFeedback: (feedback: Feedback) => apiClient.submitFeedback(feedback),
  getCourseFeedback: (courseId: number) => apiClient.getCourseFeedback(courseId),
};

// Dashboard service
export const dashboardService = {
  getStats: () => apiClient.getDashboardStats(),
  getUserProgress: () => apiClient.getUserProgress(),
};
```

---

## 🔐 Authentication Flow

### 1. Registration Flow

```typescript
// In Register component
const { register } = useAuth();

const handleSubmit = async (e: React.FormEvent) => {
  const userData = {
    username: formData.username,
    email: formData.email,
    passwordHash: formData.password, // Backend will hash this
    fullName: formData.fullName
  };
  
  const success = await register(userData);
  if (success) {
    navigate('/dashboard');
  }
};
```

**Backend Endpoint:** `POST /api/auth/register`

### 2. Login Flow

```typescript
// In Login component
const { login } = useAuth();

const handleSubmit = async (e: React.FormEvent) => {
  const success = await login(formData.username, formData.password);
  if (success) {
    navigate('/dashboard');
  }
};
```

**Backend Endpoint:** `POST /api/auth/login?username=...&password=...`

### 3. Authentication Context

```typescript
// AuthContext provides authentication state
const { user, isAuthenticated, loading, login, register, logout } = useAuth();

// Check if user is authenticated
if (isAuthenticated) {
  // User is logged in
  console.log('User:', user);
} else {
  // User is not logged in
  navigate('/login');
}
```

---

## 🌐 Available Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `POST` | `/api/auth/register` | Register new user | `{username, email, passwordHash, fullName}` | `User` |
| `POST` | `/api/auth/login` | Login user | Query params: `username`, `password` | `User` |
| `GET` | `/api/auth/test` | Test connection | None | `string` |

### User Management Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/api/users/profile` | Get current user | None | `User` |
| `PUT` | `/api/users/profile` | Update user profile | `Partial<User>` | `User` |

### Course Management Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/api/courses` | Get all courses | None | `Course[]` |
| `GET` | `/api/courses/{id}` | Get course by ID | None | `Course` |
| `POST` | `/api/enrollments` | Enroll in course | `{courseId}` | `Enrollment` |
| `GET` | `/api/enrollments/user` | Get user enrollments | None | `Enrollment[]` |

### Feedback Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `POST` | `/api/feedback` | Submit feedback | `{courseId, rating, comment}` | `Feedback` |
| `GET` | `/api/feedback/course/{courseId}` | Get course feedback | None | `Feedback[]` |

### Dashboard Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/api/dashboard/stats` | Get dashboard stats | None | `any` |
| `GET` | `/api/dashboard/progress` | Get user progress | None | `any` |

---

## ❌ Error Handling

### API Response Structure

```typescript
interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
```

### Error Handling in Components

```typescript
// Example: Handling login errors
const handleLogin = async () => {
  try {
    const response = await authService.login(credentials);
    
    if (response.error) {
      // Handle API error
      setApiError(response.error);
      return false;
    }
    
    if (response.data) {
      // Success
      setUser(response.data);
      return true;
    }
  } catch (error) {
    // Handle network error
    setApiError('Network error occurred');
    return false;
  }
};
```

### Common Error Types

1. **API Errors** - Backend returns error response
2. **Network Errors** - Connection issues
3. **Validation Errors** - Frontend form validation
4. **Authentication Errors** - Invalid credentials

---

## 💡 Usage Examples

### 1. Using Authentication Context

```typescript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return (
    <div>
      <h1>Welcome, {user?.fullName}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 2. Using Course Service

```typescript
import { useCourses } from '../components/CourseService';

function CourseList() {
  const { courses, loading, error, fetchCourses } = useCourses();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      {courses.map(course => (
        <div key={course.id}>{course.title}</div>
      ))}
    </div>
  );
}
```

### 3. Direct API Calls

```typescript
import { courseService } from '../services/api';

async function enrollInCourse(courseId: number) {
  const response = await courseService.enrollInCourse(courseId);
  
  if (response.error) {
    console.error('Enrollment failed:', response.error);
    return false;
  }
  
  console.log('Enrolled successfully:', response.data);
  return true;
}
```

---

## 🧪 Testing Connections

### 1. Backend Connection Test Component

The `BackendTest` component automatically tests the connection to the backend:

```typescript
// Located at: src/components/BackendTest.tsx
// Automatically tests: GET /api/auth/test
```

### 2. Manual Testing

```typescript
// Test connection manually
import { authService } from '../services/api';

const testConnection = async () => {
  const response = await authService.testConnection();
  console.log('Connection test:', response);
};
```

### 3. Browser Developer Tools

1. Open browser developer tools (F12)
2. Go to Network tab
3. Perform actions (login, register, etc.)
4. Check API requests and responses

### 4. Common Test Scenarios

```typescript
// Test registration
const testRegistration = async () => {
  const userData = {
    username: 'testuser',
    email: 'test@example.com',
    passwordHash: 'password123',
    fullName: 'Test User'
  };
  
  const response = await authService.register(userData);
  console.log('Registration result:', response);
};

// Test login
const testLogin = async () => {
  const response = await authService.login({
    username: 'testuser',
    password: 'password123'
  });
  console.log('Login result:', response);
};

// Test course fetching
const testCourses = async () => {
  const response = await courseService.getCourses();
  console.log('Courses:', response);
};
```

---

## 🚀 Getting Started

### 1. Start the Backend

```bash
# Navigate to backend directory
cd TEduMasters/Backend

# Start Spring Boot application
./mvnw spring-boot:run
```

### 2. Start the Frontend

```bash
# Navigate to frontend directory
cd TEduMasters/Frontend

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

### 3. Test the Connection

1. Open http://localhost:5173 (or your frontend URL)
2. Look for the "Backend Connection Test" component
3. Verify the connection status

### 4. Try Authentication

1. Click "Get Started" to register
2. Fill in the registration form
3. Try logging in with the created account
4. Check the browser console for API calls

---

## 🔧 Configuration

### API Base URL

The API base URL is configured in `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://localhost:8080/api';
```

To change the backend URL, update this constant.

### CORS Configuration

The backend should have CORS configured to allow requests from the frontend:

```java
@CrossOrigin(origins = "*")
@RestController
public class AuthController {
    // Controller methods
}
```

---

## 📝 Notes

- All API calls include proper error handling
- Authentication state is persisted in localStorage
- Components automatically handle loading and error states
- The connection test component helps verify backend connectivity
- TypeScript interfaces ensure type safety for API responses

For more information, check the individual component files and the API service implementation. 