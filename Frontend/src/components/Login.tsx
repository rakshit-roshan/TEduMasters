import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Code2, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, 
  Users, Trophy, Target, BookOpen
} from 'lucide-react';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [statsIndex, setStatsIndex] = useState(0);

  const welcomeMessages = [
    'Welcome back to TEduMasters!',
    'Ready to continue learning?',
    'Your coding journey awaits...',
    'Let\'s master programming together!'
  ];

  const platformStats = [
    { label: 'Active Students', value: '10K+', icon: <Users className="w-5 h-5" /> },
    { label: 'Course Completions', value: '25K+', icon: <Trophy className="w-5 h-5" /> },
    { label: 'Interactive Lessons', value: '2.5K+', icon: <BookOpen className="w-5 h-5" /> },
    { label: 'Learning Hours', value: '1M+', icon: <Target className="w-5 h-5" /> }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStatsIndex((prev) => (prev + 1) % platformStats.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setWelcomeMessage(welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)]);
  }, []);

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) newErrors.email = 'Email is required';
        else if (!emailRegex.test(value)) newErrors.email = 'Invalid email format';
        else delete newErrors.email;
        break;
      case 'password':
        if (!value) newErrors.password = 'Password is required';
        else if (value.length < 6) newErrors.password = 'Password must be at least 6 characters';
        else delete newErrors.password;
        break;
    }
    
    setErrors(newErrors);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    // Validate all fields
    Object.keys(formData).forEach(key => {
      validateField(key, formData[key]);
    });
    
    if (Object.keys(errors).length > 0) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`🎉 Welcome back to TEduMasters!\n\nEmail: ${formData.email}\n\nLet's continue your learning journey!`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements - matching landing page style */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Login Form */}
        <div className="w-full lg:w-2/5 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Logo/Brand - matching landing page */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
                <Code2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">TEduMasters</h1>
              <p className="text-gray-600">{welcomeMessage}</p>
            </div>

            {/* Login Form - matching landing page glass effect */}
            <div className="backdrop-blur-sm bg-white/80 rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In to Continue</h2>
              
              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-10 py-3 bg-white/50 backdrop-blur-sm border ${errors.email ? 'border-red-400' : 'border-gray-200'} rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300`}
                  />
                  {!errors.email && formData.email && (
                    <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 bg-white/50 backdrop-blur-sm border ${errors.password ? 'border-red-400' : 'border-gray-200'} rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-colors" 
                  />
                  <span className="ml-2 text-gray-700 text-sm">Remember me</span>
                </label>
                <button className="text-indigo-600 hover:text-indigo-700 text-sm transition-colors bg-transparent border-none cursor-pointer font-medium">
                  Forgot password?
                </button>
              </div>

              {/* Submit Button - matching landing page style */}
              <button
                onClick={handleSubmit}
                disabled={loading || Object.keys(errors).length > 0}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center mb-4 shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-center text-gray-600 text-sm">
                Don't have an account? <Link to="/register" className="text-indigo-600 hover:text-indigo-700 transition-colors bg-transparent border-none cursor-pointer font-medium">Create account</Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Simplified Stats Display */}
        <div className="hidden lg:flex w-3/5 p-8 flex-col items-center justify-center">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Continue Your <span className="text-indigo-600">Coding Journey</span>
            </h2>
            <p className="text-xl text-gray-600">Pick up where you left off and keep mastering new skills</p>
          </div>

          {/* Platform Stats - Grid matching landing page style */}
          <div className="grid grid-cols-2 gap-6 max-w-lg">
            {platformStats.map((stat, index) => (
              <div
                key={index}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg transition-all duration-500 text-center hover:shadow-xl ${
                  statsIndex === index ? 'ring-2 ring-indigo-500 scale-105' : ''
                }`}
              >
                <div className="flex justify-center mb-3">
                  <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center">
                    <div className="text-indigo-600">{stat.icon}</div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}