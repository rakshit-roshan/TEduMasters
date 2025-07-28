import React from 'react';
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
  
export default function App() {
  return ( 
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
      </Route>
    </Routes>
  );
}