import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    // Automatically logout when component mounts
    logout();
    navigate('/');
  }, [logout, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Logging out...</p>
      </div>
    </div>
  );
} 