import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Course, courseService, ApiResponse } from '../services/api';

interface CourseContextType {
  courses: Course[];
  loading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
  getCourseById: (id: number) => Course | undefined;
  enrollInCourse: (courseId: number) => Promise<boolean>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};

interface CourseProviderProps {
  children: ReactNode;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response: ApiResponse<Course[]> = await courseService.getCourses();
      
      if (response.error) {
        setError(response.error);
        return;
      }

      if (response.data) {
        setCourses(response.data);
      }
    } catch (err) {
      setError('Failed to fetch courses');
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCourseById = (id: number): Course | undefined => {
    return courses.find(course => course.id === id);
  };

  const enrollInCourse = async (courseId: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await courseService.enrollInCourse(courseId);
      
      if (response.error) {
        setError(response.error);
        return false;
      }

      return true;
    } catch (err) {
      setError('Failed to enroll in course');
      console.error('Error enrolling in course:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  const value: CourseContextType = {
    courses,
    loading,
    error,
    fetchCourses,
    getCourseById,
    enrollInCourse,
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
}; 