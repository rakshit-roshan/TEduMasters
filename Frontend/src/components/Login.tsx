import React, { useState, useEffect } from 'react';
import {
  Code2, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle, 
  Users, Trophy, Target
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
    'Welcome back, Developer!',
    'Ready to code something amazing?',
    'Your coding journey continues...',
    'Let\'s build the future together!'
  ];

  const platformStats = [
    { label: 'Active Developers', value: '500K+', icon: <Users className="w-5 h-5" /> },
    { label: 'Code Challenges', value: '10K+', icon: <Trophy className="w-5 h-5" /> },
    { label: 'Projects Built', value: '2M+', icon: <Code2 className="w-5 h-5" /> },
    { label: 'Learning Hours', value: '50M+', icon: <Target className="w-5 h-5" /> }
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
      alert(`🎉 Welcome back to DevPlatform!\n\nEmail: ${formData.email}\n\nLet's continue your coding journey!`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Login Form */}
        <div className="w-full lg:w-2/5 flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Logo/Brand */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
                <Code2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">DevPlatform</h1>
              <p className="text-purple-200">{welcomeMessage}</p>
            </div>

            {/* Login Form */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Sign In to Continue</h2>
              
              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-white/80 text-sm font-medium mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/40" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-10 py-3 bg-white/10 border ${errors.email ? 'border-red-400' : 'border-white/30'} rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                  />
                  {!errors.email && formData.email && (
                    <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-400" />
                  )}
                </div>
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label className="block text-white/80 text-sm font-medium mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/40" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-12 py-3 bg-white/10 border ${errors.password ? 'border-red-400' : 'border-white/30'} rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center">
                  <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-500 bg-white/10 border-white/30 rounded focus:ring-purple-500" />
                  <span className="ml-2 text-white/80 text-sm">Remember me</span>
                </label>
                <button className="text-purple-300 hover:text-purple-200 text-sm transition-colors bg-transparent border-none cursor-pointer">
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading || Object.keys(errors).length > 0}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-3 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center mb-4"
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

              <p className="text-center text-white/60 text-sm">
                Don't have an account? <button className="text-purple-300 hover:text-purple-200 transition-colors bg-transparent border-none cursor-pointer">Sign up</button>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Simplified Stats Display */}
        <div className="hidden lg:flex w-3/5 p-8 flex-col items-center justify-center">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-white mb-4">
              Continue Your <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Coding Journey</span>
            </h2>
            <p className="text-xl text-purple-200">Pick up where you left off and keep building amazing things</p>
          </div>

          {/* Platform Stats - Simplified Grid */}
          <div className="grid grid-cols-2 gap-6 max-w-lg">
            {platformStats.map((stat, index) => (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20 transition-all duration-500 text-center ${
                  statsIndex === index ? 'ring-2 ring-purple-500 scale-105' : ''
                }`}
              >
                <div className="flex justify-center mb-3">
                  <div className="text-purple-400">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <p className="text-white/70 text-sm">{stat.label}</p>
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