import React from 'react';
import { useTheme } from '../ThemeContext';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">  
          <div className="flex-shrink-0 flex items-center">
            <Link to="/">
              <h1 className="text-2xl font-bold text-indigo-600 font-mono">
                <span className="text-gray-700">{'</>'}</span> DevPlatform
              </h1>
            </Link>
          </div>
          <div className="hidden md:block ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/courses" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Courses</Link>
              <Link to="/about" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Contact</Link>
              <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Dahboard</Link>
          </div>
          <div className="flex items-center space-x-4 relative">
            <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Get Started
            </Link>
            <Link to="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Login
            </Link>   
          </div>
          {/* Theme Toggle Button - rightmost */}
          <button className="theme-toggle-btn ml-2" onClick={toggleTheme} aria-label="Toggle dark mode">
            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div> 
      </div>
    </nav>
  );
} 