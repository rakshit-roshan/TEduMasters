import React from 'react';
import { ThemeProvider } from './ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { CourseProvider } from './components/CourseService';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Logout from './components/Logout';
import PrivateRoute from './components/PrivateRoute';
import BrowseCourses from './components/BrowseCourses';
import CourseDetail from './components/CourseDetail';
import MainLayout from './components/MainLayout'; 
import Dashboard from './components/Dashboard';
import ContactPage from './components/ContactsPage';
import AboutPage from './components/AboutPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CourseProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
              <Route path="/logout" element={<Logout />} />
              <Route path="/courses" element={<BrowseCourses />} />
              <Route path="/courses/:courseId" element={<CourseDetail />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </CourseProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}