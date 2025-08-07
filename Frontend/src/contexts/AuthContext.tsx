import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, authService, authUtils } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = authUtils.getAuthToken();
        if (token) {
          // You can add a verify token endpoint here
          const savedUser = localStorage.getItem('user');
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        authUtils.removeAuthToken();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await authService.login({ username, password });
      
      if (response.error) {
        console.error('Login failed:', response.error);
        return false;
      }

      if (response.data) {
        setUser(response.data);
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
        // In a real app, you'd store the JWT token here
        authUtils.setAuthToken('dummy-token'); // Replace with actual token
        return true;
      }

      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      setLoading(true);
      const response = await authService.register(userData);
      
      if (response.error) {
        console.error('Registration failed:', response.error);
        return false;
      }

      if (response.data) {
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
        authUtils.setAuthToken('dummy-token'); // Replace with actual token
        return true;
      }

      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    authUtils.logout();
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 