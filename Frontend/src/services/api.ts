// API Service for TEduMasters Frontend
// Handles all backend connections

const API_BASE_URL = 'http://localhost:8080/api';

// Types for API responses
export interface User {
  id?: number;
  username: string;
  email: string;
  fullName?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  passwordHash: string;
  fullName?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface Course {
  id?: number;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  imageUrl?: string;
  category: string;
  rating?: number;
  enrolledStudents?: number;
}

export interface Enrollment {
  id?: number;
  userId: number;
  courseId: number;
  enrolledAt: string;
  progress: number;
  completed: boolean;
}

export interface Feedback {
  id?: number;
  userId: number;
  courseId: number;
  rating: number;
  comment: string;
  createdAt: string;
}

// API Client with error handling and authentication
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseURL}${endpoint}`;
      const token = localStorage.getItem('authToken');
      
      const config: RequestInit = {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
          ...options.headers,
        },
        ...options,
      };

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        return {
          error: data.error || `HTTP ${response.status}: ${response.statusText}`,
        };
      }

      return { data };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        error: error instanceof Error ? error.message : 'Network error occurred',
      };
    }
  }

  // Authentication endpoints
  async register(userData: RegisterRequest): Promise<ApiResponse<User>> {
    return this.request<User>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials: LoginRequest): Promise<ApiResponse<User>> {
    const params = new URLSearchParams({
      username: credentials.username,
      password: credentials.password,
    });

    return this.request<User>(`/auth/login?${params}`, {
      method: 'POST',
    });
  }

  async testConnection(): Promise<ApiResponse<string>> {
    return this.request<string>('/auth/test');
  }

  // User management
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request<User>('/users/profile');
  }

  async updateProfile(userData: Partial<User>): Promise<ApiResponse<User>> {
    return this.request<User>('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  // Course management
  async getCourses(): Promise<ApiResponse<Course[]>> {
    return this.request<Course[]>('/courses');
  }

  async getCourseById(id: number): Promise<ApiResponse<Course>> {
    return this.request<Course>(`/courses/${id}`);
  }

  async enrollInCourse(courseId: number): Promise<ApiResponse<Enrollment>> {
    return this.request<Enrollment>('/enrollments', {
      method: 'POST',
      body: JSON.stringify({ courseId }),
    });
  }

  async getUserEnrollments(): Promise<ApiResponse<Enrollment[]>> {
    return this.request<Enrollment[]>('/enrollments/user');
  }

  // Feedback and ratings
  async submitFeedback(feedback: Omit<Feedback, 'id' | 'createdAt'>): Promise<ApiResponse<Feedback>> {
    return this.request<Feedback>('/feedback', {
      method: 'POST',
      body: JSON.stringify(feedback),
    });
  }

  async getCourseFeedback(courseId: number): Promise<ApiResponse<Feedback[]>> {
    return this.request<Feedback[]>(`/feedback/course/${courseId}`);
  }

  // Dashboard data
  async getDashboardStats(): Promise<ApiResponse<any>> {
    return this.request<any>('/dashboard/stats');
  }

  async getUserProgress(): Promise<ApiResponse<any>> {
    return this.request<any>('/dashboard/progress');
  }
}

// Create and export the API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Convenience functions for common operations
export const authService = {
  register: (userData: RegisterRequest) => apiClient.register(userData),
  login: (credentials: LoginRequest) => apiClient.login(credentials),
  testConnection: () => apiClient.testConnection(),
};

export const userService = {
  getCurrentUser: () => apiClient.getCurrentUser(),
  updateProfile: (userData: Partial<User>) => apiClient.updateProfile(userData),
};

export const courseService = {
  getCourses: () => apiClient.getCourses(),
  getCourseById: (id: number) => apiClient.getCourseById(id),
  enrollInCourse: (courseId: number) => apiClient.enrollInCourse(courseId),
  getUserEnrollments: () => apiClient.getUserEnrollments(),
};

export const feedbackService = {
  submitFeedback: (feedback: Omit<Feedback, 'id' | 'createdAt'>) => 
    apiClient.submitFeedback(feedback),
  getCourseFeedback: (courseId: number) => apiClient.getCourseFeedback(courseId),
};

export const dashboardService = {
  getStats: () => apiClient.getDashboardStats(),
  getUserProgress: () => apiClient.getUserProgress(),
};

// Authentication utilities
export const authUtils = {
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken');
  },

  getAuthToken: (): string | null => {
    return localStorage.getItem('authToken');
  },

  setAuthToken: (token: string): void => {
    localStorage.setItem('authToken', token);
  },

  removeAuthToken: (): void => {
    localStorage.removeItem('authToken');
  },

  logout: (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  },
};

export default apiClient; 