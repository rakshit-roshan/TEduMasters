import React from 'react';
import Navigation from './Navigation';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navigation />
      <div>
        <Outlet />
      </div>
    </div>
  );
} 