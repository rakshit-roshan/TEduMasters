import React, { useState, useEffect } from 'react';
import {
  Code2, Users, Sparkles, Gauge, LayoutDashboard, Video, Trophy, GraduationCap,
  FileText, Languages, BadgeCheck, MessageSquare, MonitorPlay, Star, ArrowRight,
  CheckCircle, Globe, Zap, Target, BookOpen, Award, Cpu, Eye, EyeOff
} from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [typingText, setTypingText] = useState('');

  const codeSnippets = [
    'const magic = useAI("optimize");',
    'function collaborate() { return real_time; }',
    'const progress = trackXP(challenge);',
    'export default LearnWithFun;'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const text = codeSnippets[activeFeature];
    let i = 0;
    setTypingText('');
    const typing = setInterval(() => {
      if (i < text.length) {
        setTypingText(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 100);
    return () => clearInterval(typing);
  }, [activeFeature]);

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case 'name':
        if (!value.trim()) newErrors.name = 'Name is required';
        else if (value.length < 2) newErrors.name = 'Name too short';
        else delete newErrors.name;
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) newErrors.email = 'Email is required';
        else if (!emailRegex.test(value)) newErrors.email = 'Invalid email format';
        else delete newErrors.email;
        break;
      case 'password':
        if (!value) newErrors.password = 'Password is required';
        else if (value.length < 8) newErrors.password = 'Password must be 8+ characters';
        else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          newErrors.password = 'Password needs uppercase, lowercase & number';
        } else delete newErrors.password;
        break;
      case 'confirmPassword':
        if (!value) newErrors.confirmPassword = 'Please confirm password';
        else if (value !== formData.password) newErrors.confirmPassword = 'Passwords don\'t match';
        else delete newErrors.confirmPassword;
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
      alert(`🎉 Welcome to TEduMasters!\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nYour coding journey begins now!`);
    }, 2000);
  };

  const coreFeatures = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Interactive Learning",
      description: "Code in real-time with our integrated editor and get instant feedback on your progress.",
      highlight: "90% faster learning"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of experience in top tech companies.",
      highlight: "1000+ mentors"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Feedback",
      description: "Get personalized suggestions and improvements with our advanced AI learning assistant.",
      highlight: "99.7% accuracy"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Career Support",
      description: "Get job placement assistance and career guidance from our dedicated support team.",
      highlight: "5x job success"
    }
  ];

  const advancedFeatures = [
    { icon: <Video />, title: "Interactive Video Lessons", users: "2.5K+ courses" },
    { icon: <MessageSquare />, title: "Expert Mentorship", users: "1K+ mentors" },
    { icon: <GraduationCap />, title: "Certified Learning Paths", users: "100+ certs" },
    { icon: <MonitorPlay />, title: "Live Coding Sessions", users: "Daily streams" },
    { icon: <FileText />, title: "Project-Based Learning", users: "500+ projects" },
    { icon: <Globe />, title: "Global Community", users: "10K+ students" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements - matching landing page style */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Registration Form */}
        <div className="w-full lg:w-2/5 flex items-start justify-center p-8">
          <div className="w-full max-w-md">
            {/* Logo/Brand - matching landing page */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl mb-4 shadow-lg">
                <Code2 className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">TEduMasters</h1>
              <p className="text-gray-600">Join 10,000+ students worldwide</p>
            </div>

            {/* Registration Form - matching landing page glass effect */}
            <div className="backdrop-blur-sm bg-white/80 rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Create Your Account</h2>
              
              {/* Name Field */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/50 backdrop-blur-sm border ${errors.name ? 'border-red-400' : 'border-gray-200'} rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300`}
                  />
                  {!errors.name && formData.name && (
                    <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/50 backdrop-blur-sm border ${errors.email ? 'border-red-400' : 'border-gray-200'} rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300`}
                  />
                  {!errors.email && formData.email && (
                    <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/50 backdrop-blur-sm border ${errors.password ? 'border-red-400' : 'border-gray-200'} rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 pr-12`}
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

              {/* Confirm Password Field */}
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/50 backdrop-blur-sm border ${errors.confirmPassword ? 'border-red-400' : 'border-gray-200'} rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>

              {/* Submit Button - matching landing page style */}
              <button
                onClick={handleSubmit}
                disabled={loading || Object.keys(errors).length > 0}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  <>
                    Start Learning Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-center text-gray-600 text-sm mt-4">
                Already have an account? <button className="text-indigo-600 hover:text-indigo-700 transition-colors bg-transparent border-none cursor-pointer font-medium">Sign in</button>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Feature Showcase */}
        <div className="hidden lg:flex w-3/5 p-8 flex-col">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Master Programming with <span className="text-indigo-600">Interactive Learning</span>
            </h2>
            <p className="text-xl text-gray-600">Everything you need to learn, practice, and excel in programming</p>
          </div>

          {/* Interactive Code Preview */}
          <div className="bg-gray-900/90 backdrop-blur rounded-2xl p-6 mb-8 border border-gray-200 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-gray-400 text-sm">Live Code Editor</div>
            </div>
            <div className="font-mono text-green-400 text-lg">
              {typingText}<span className="animate-pulse">|</span>
            </div>
          </div>

          {/* Core Features Grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {coreFeatures.map((feature, index) => (
              <div
                key={index}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer ${
                  activeFeature === index ? 'ring-2 ring-indigo-500' : ''
                }`}
                onClick={() => setActiveFeature(index)}
              >
                <div className="flex items-center mb-3">
                  <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mr-3">
                    <div className="text-indigo-600">{feature.icon}</div>
                  </div>
                  <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">{feature.highlight}</span>
                </div>
                <h3 className="text-gray-900 font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Dashboard Preview */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
            <h3 className="text-gray-900 font-semibold mb-4 flex items-center">
              <LayoutDashboard className="w-5 h-5 mr-2 text-indigo-600" />
              Your Learning Dashboard Preview
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg p-3 text-white text-center">
                <div className="text-2xl font-bold">1,247</div>
                <div className="text-xs opacity-90">XP Points</div>
              </div>
              <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-lg p-3 text-white text-center">
                <div className="text-2xl font-bold">23</div>
                <div className="text-xs opacity-90">Certificates</div>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg p-3 text-white text-center">
                <div className="text-2xl font-bold">#47</div>
                <div className="text-xs opacity-90">Global Rank</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {advancedFeatures.map((feature, index) => (
                <div key={index} className="flex items-center bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors">
                  <div className="text-indigo-600 mr-3">{feature.icon}</div>
                  <div>
                    <div className="text-gray-900 text-sm font-medium">{feature.title}</div>
                    <div className="text-gray-600 text-xs">{feature.users}</div>
                  </div>
                </div>
              ))}
            </div>
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